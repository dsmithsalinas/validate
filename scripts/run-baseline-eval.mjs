import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();

const defaults = {
  promptFile: "docs/prompts/PROMPT-002-Validate-System-Instructions.md",
  casesDir: "evals/cases",
  outputDir: "work/eval-baseline",
  model: "gpt-4.1-mini",
};

function resolveFromRoot(filePath) {
  return path.join(root, filePath);
}

function readText(filePath) {
  return fs.readFileSync(resolveFromRoot(filePath), "utf8");
}

function readJson(filePath) {
  return JSON.parse(readText(filePath));
}

function loadEnv(filePath) {
  if (!fs.existsSync(filePath)) return;

  for (const line of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match) continue;

    const [, key, rawValue] = match;
    if (!process.env[key]) {
      process.env[key] = rawValue.replace(/^['"]|['"]$/g, "");
    }
  }
}

function parseRecommendation(output) {
  const match = output.match(/Recommendation:\s*(Build|Validate|Pause|Reject|No Firm Recommendation)/i);
  return match ? match[1].replace(/\b\w/g, (c) => c.toUpperCase()) : "Unclear";
}

function parseScore(output, label) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = output.match(new RegExp(`${escaped}:\\s*([0-9]{1,3})`, "i"));
  return match ? Number(match[1]) : null;
}

function loadCases(casesDir) {
  const absoluteCasesDir = resolveFromRoot(casesDir);
  return fs.readdirSync(absoluteCasesDir)
    .filter((fileName) => fileName.endsWith(".json"))
    .sort()
    .map((fileName) => readJson(path.join(casesDir, fileName)));
}

function validateCaseShape(testCase) {
  const errors = [];

  if (!testCase.id) errors.push("missing id");
  if (!testCase.title) errors.push("missing title");
  if (!testCase.expected) errors.push("missing expected recommendation");
  if (!Array.isArray(testCase.transcript)) errors.push("missing transcript array");

  for (const [index, turn] of (testCase.transcript || []).entries()) {
    if (!Array.isArray(turn) || turn.length !== 2) {
      errors.push(`transcript turn ${index + 1} must be [speaker, text]`);
    }
  }

  if (errors.length > 0) {
    throw new Error(`${testCase.id || "Unknown case"} is invalid: ${errors.join(", ")}`);
  }
}

function buildEvalUserMessage(testCase) {
  const transcript = testCase.transcript
    .map(([speaker, text]) => `${speaker}: ${text}`)
    .join("\n\n");

  return [
    "Run this as a blind Validate model eval.",
    "",
    "You are given a simulated conversation transcript. Do not ask follow-up questions in this eval run.",
    "Do not assume any expected recommendation. Derive the recommendation from the evidence in the transcript only.",
    "Produce the final Validate recommendation using the required output template.",
    "",
    `Case ID: ${testCase.id}`,
    `Case Title: ${testCase.title}`,
    "",
    "Transcript:",
    transcript,
  ].join("\n");
}

function evaluateChecks(testCase, actual, scores) {
  const checks = [
    {
      type: "recommendation",
      pass: actual.toLowerCase() === testCase.expected.toLowerCase(),
      expected: testCase.expected,
      actual,
      reason: "Recommendation should match the frozen baseline expectation.",
    },
  ];

  for (const check of testCase.checks || []) {
    const actualScore = scores[check.score];
    let pass = false;

    if (check.type === "score_min") {
      pass = typeof actualScore === "number" && actualScore >= check.value;
    } else if (check.type === "score_max") {
      pass = typeof actualScore === "number" && actualScore <= check.value;
    } else {
      pass = false;
    }

    checks.push({
      ...check,
      actual: actualScore,
      pass,
    });
  }

  return checks;
}

async function runCase({ testCase, prompt, apiKey, model }) {
  const user = buildEvalUserMessage(testCase);

  let response;
  try {
    response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        input: [
          { role: "system", content: prompt },
          { role: "user", content: user },
        ],
        temperature: 0,
      }),
    });
  } catch (error) {
    return {
      id: testCase.id,
      title: testCase.title,
      expected: testCase.expected,
      ok: false,
      pass: false,
      error: error.message,
    };
  }

  const body = await response.json();
  if (!response.ok) {
    return {
      id: testCase.id,
      title: testCase.title,
      expected: testCase.expected,
      ok: false,
      pass: false,
      error: body.error?.message || JSON.stringify(body),
    };
  }

  const output =
    body.output_text ||
    body.output?.flatMap((item) => item.content || [])
      .map((part) => part.text || "")
      .join("\n") ||
    "";

  const actual = parseRecommendation(output);
  const scores = {
    investment: parseScore(output, "Investment Score"),
    confidence: parseScore(output, "Confidence"),
    decisionDebt: parseScore(output, "Decision Debt Risk"),
    potential: parseScore(output, "Potential"),
  };
  const checks = evaluateChecks(testCase, actual, scores);

  return {
    id: testCase.id,
    title: testCase.title,
    expected: testCase.expected,
    actual,
    scores,
    ok: true,
    pass: checks.every((check) => check.pass),
    checks,
    output,
  };
}

function writeResultFiles({ outputDir, results, summary }) {
  fs.mkdirSync(resolveFromRoot(outputDir), { recursive: true });

  for (const result of results) {
    fs.writeFileSync(
      resolveFromRoot(path.join(outputDir, `${result.id}.json`)),
      JSON.stringify(result, null, 2),
    );

    if (result.ok) {
      fs.writeFileSync(resolveFromRoot(path.join(outputDir, `${result.id}.md`)), result.output);
    }
  }

  fs.writeFileSync(
    resolveFromRoot(path.join(outputDir, "summary.json")),
    JSON.stringify(summary, null, 2),
  );
}

loadEnv(resolveFromRoot(".env.local"));

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error("OPENAI_API_KEY is not available. Add it to .env.local or your shell environment.");
  process.exit(1);
}

const promptFile = process.env.VALIDATE_PROMPT_FILE || defaults.promptFile;
const casesDir = process.env.VALIDATE_EVAL_CASES_DIR || defaults.casesDir;
const outputDir = process.env.VALIDATE_EVAL_OUTPUT_DIR || defaults.outputDir;
const model = process.env.OPENAI_EVAL_MODEL || defaults.model;
const prompt = readText(promptFile);
const cases = loadCases(casesDir);

for (const testCase of cases) {
  validateCaseShape(testCase);
}

const results = [];

for (const testCase of cases) {
  console.error(`Running ${testCase.id}: ${testCase.title}`);
  results.push(await runCase({ testCase, prompt, apiKey, model }));
}

const summary = {
  runDate: new Date().toISOString(),
  model,
  prompt: promptFile,
  casesDir,
  outputDir,
  runType: "baseline_eval",
  pass: results.every((result) => result.pass),
  totals: {
    cases: results.length,
    passed: results.filter((result) => result.pass).length,
    failed: results.filter((result) => !result.pass).length,
  },
  results: results.map(({ id, title, expected, actual, pass, ok, error, scores, checks }) => ({
    id,
    title,
    expected,
    actual: actual || null,
    pass: Boolean(pass),
    ok,
    error: error || null,
    scores: scores || null,
    checks: checks || [],
  })),
};

writeResultFiles({ outputDir, results, summary });

console.log(JSON.stringify(summary, null, 2));

if (!summary.pass) {
  process.exitCode = 1;
}
