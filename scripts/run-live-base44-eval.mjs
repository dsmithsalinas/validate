import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();

const defaults = {
  casesDir: "evals/cases",
  outputDir: "work/eval-live-base44",
  functionUrl: "https://validate-mockup-51c4e7bb.base44.app/functions/run-validate-decision",
};

const liveCaseOverrides = {
  "CASE-001": {
    answers: {
      customerProblem:
        "Admins have trouble finding settings, policy documentation, audit information, and user management actions across a complex admin console.",
      evidence:
        "We have heard it from a few customer success managers and one enterprise prospect mentioned it during a sales call. We have not pulled support tickets or product analytics yet.",
      users: "We do not know. We suspect larger enterprise accounts are more affected.",
      businessGoal:
        "Enterprise expansion is a priority, and admin usability is becoming more important as accounts get larger.",
      alternatives: "Support, customer success, documentation, and manual navigation.",
      risks:
        "We are assuming search is the right solution, that AI is better than better navigation, and that admins would trust AI-generated answers for admin tasks.",
      validationTest:
        "Review support tickets, interview 5 enterprise admins, and prototype a command/search bar with a few common admin tasks.",
      costOfDelay:
        "Admins may continue to rely on support or customer success. It might slow onboarding for larger accounts, but we do not have quantified impact.",
    },
  },
  "CASE-002": {
    answers: {
      customerProblem:
        "Enterprise admins need to onboard dozens or hundreds of users during rollout. Today they invite users one at a time, which is slow and error-prone.",
      evidence:
        "We interviewed 8 enterprise admins. 7 mentioned bulk onboarding as painful. We found 43 support tickets last quarter related to bulk setup, invite failures, or onboarding workarounds. Analytics show accounts with more than 50 seats take a median of 9 days to invite 80% of users, versus 2 days for smaller accounts.",
      users: "Enterprise admins at accounts with more than 50 seats, especially during rollout.",
      businessGoal:
        "Customer success says this slows enterprise onboarding. Two expansion deals were delayed because the customer wanted easier user provisioning. Sales says lack of bulk invite comes up in late-stage enterprise procurement. Enterprise expansion is the company's top priority this quarter.",
      alternatives: "Manual one-by-one invites and customer-success workarounds.",
      risks:
        "We still need to confirm whether CSV import is enough for v1 or whether customers expect SCIM immediately. We also need to test error handling for invalid emails and duplicate users.",
      validationTest:
        "Build a scoped CSV upload with email, name, and role columns. Admins can preview rows, fix errors, and send invites in one batch. No SCIM in v1.",
      costOfDelay:
        "Three large pilots start in the next 60 days, and the current invite flow may slow onboarding.",
    },
  },
  "CASE-003": {
    answers: {
      customerProblem:
        "Customers want visibility into usage, adoption, and account health so admins can report progress internally.",
      evidence:
        "Three customer success managers say customers ask for reporting during business reviews. Two customers asked for exports in the last month. We have not interviewed customers specifically about analytics and do not have behavioral data.",
      users: "Enterprise customer admins and customer success teams preparing business reviews.",
      businessGoal:
        "The company is focused on enterprise onboarding and activation. Analytics might help later, but it is not part of the current quarterly strategy.",
      alternatives: "Customer success sends manual reports for some accounts.",
      risks:
        "Some events exist, but instrumentation is inconsistent. We would need to clean up tracking before showing customer-facing metrics.",
      validationTest:
        "Reopen if enterprise customers repeatedly ask for reporting during pilots or manual reporting becomes a measurable customer success burden.",
      costOfDelay:
        "Customer success will keep sending manual reports for some accounts. It is annoying, but not currently blocking deals or pilots.",
    },
  },
  "CASE-004": {
    answers: {
      customerProblem:
        "Admin profiles look plain. We think generated avatars could make the admin experience feel more modern and personalized.",
      evidence:
        "No customer complaints. One designer suggested it during a polish review, and a few people internally thought it sounded fun. Customers have not asked for it.",
      users: "Enterprise admins, but no known customer segment has expressed this need.",
      businessGoal:
        "It might make the product feel more modern, but it does not directly support the current enterprise onboarding strategy.",
      alternatives: "Plain admin profiles or manually uploaded profile images.",
      risks:
        "Some enterprise customers have strict policies around profile imagery and AI-generated content. Legal and security might need to review it.",
      validationTest:
        "There is no evidence this would improve adoption, retention, revenue, support load, or customer satisfaction.",
      costOfDelay:
        "Probably nothing. Admin profiles remain plain, but no known customer workflow is blocked. Higher-priority asks include bulk invite, onboarding reliability, admin roles, and integrations.",
    },
  },
  "CASE-005": {
    answers: {
      customerProblem:
        "Founders struggle to decide what to build, what to prioritize, and whether their product ideas are backed by enough evidence. Reasoning is scattered across docs, calls, customer notes, and metrics.",
      evidence:
        "Mostly anecdotal evidence. We have talked with 3 founders, and we have felt this problem ourselves while building Validate. No paid pilots, no usage data, and no willingness-to-pay test yet.",
      users: "Startup founders making product strategy and prioritization decisions.",
      businessGoal:
        "It could become a core Validate product direction. If founders trust it, it could be a category-defining assistant for product judgment and investment decisions.",
      alternatives:
        "Advisors, ChatGPT, spreadsheets, Notion docs, customer interviews, product consultants, and founder instincts.",
      risks:
        "The assistant could sound overconfident, give bad strategic advice, hallucinate, encourage founders to outsource judgment, or mishandle sensitive business context. Workflow fit is unclear.",
      validationTest:
        "Interview 10 to 15 founders, run concierge strategy-review sessions using the current Validate framework, ask what they would pay for, and compare the output against their existing decision process.",
      costOfDelay:
        "A rough prototype is moderate effort, but a trustworthy product would require strong reasoning, evals, memory, and decision records.",
    },
  },
};

function resolveFromRoot(filePath) {
  return path.join(root, filePath);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(resolveFromRoot(filePath), "utf8"));
}

function loadCases(casesDir) {
  return fs.readdirSync(resolveFromRoot(casesDir))
    .filter((fileName) => fileName.endsWith(".json"))
    .sort()
    .map((fileName) => readJson(path.join(casesDir, fileName)));
}

function userTurns(testCase) {
  return testCase.transcript
    .filter(([speaker]) => speaker === "User")
    .map(([, text]) => text);
}

function requestFromCase(testCase) {
  const turns = userTurns(testCase);
  const override = liveCaseOverrides[testCase.id] || {};

  return {
    idea: turns[0] || "",
    decisionType: turns[1] || "",
    answers: override.answers || {},
  };
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
    }

    checks.push({
      ...check,
      actual: actualScore,
      pass,
    });
  }

  return checks;
}

async function runCase({ testCase, functionUrl }) {
  const requestBody = requestFromCase(testCase);

  let response;
  try {
    response = await fetch(functionUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
  } catch (error) {
    return {
      id: testCase.id,
      title: testCase.title,
      expected: testCase.expected,
      ok: false,
      pass: false,
      error: error.message,
      request: requestBody,
    };
  }

  const body = await response.json();
  if (!response.ok || !body.success || !body.decision) {
    return {
      id: testCase.id,
      title: testCase.title,
      expected: testCase.expected,
      ok: false,
      pass: false,
      error: body.error || JSON.stringify(body),
      request: requestBody,
    };
  }

  const decision = body.decision;
  const actual = decision.recommendation || "Unclear";
  const scores = {
    investment: decision.investment,
    confidence: decision.confidence,
    decisionDebt: decision.decisionDebt,
    potential: decision.potential,
  };
  const checks = evaluateChecks(testCase, actual, scores);

  return {
    id: testCase.id,
    title: testCase.title,
    expected: testCase.expected,
    actual,
    ok: true,
    pass: checks.every((check) => check.pass),
    scores,
    checks,
    request: requestBody,
    decision,
  };
}

function writeResultFiles({ outputDir, results, summary }) {
  fs.mkdirSync(resolveFromRoot(outputDir), { recursive: true });

  for (const result of results) {
    fs.writeFileSync(
      resolveFromRoot(path.join(outputDir, `${result.id}.json`)),
      JSON.stringify(result, null, 2),
    );
  }

  fs.writeFileSync(
    resolveFromRoot(path.join(outputDir, "summary.json")),
    JSON.stringify(summary, null, 2),
  );
}

const casesDir = process.env.VALIDATE_EVAL_CASES_DIR || defaults.casesDir;
const outputDir = process.env.VALIDATE_LIVE_EVAL_OUTPUT_DIR || defaults.outputDir;
const functionUrl = process.env.VALIDATE_LIVE_FUNCTION_URL || defaults.functionUrl;
const cases = loadCases(casesDir);
const results = [];

for (const testCase of cases) {
  console.error(`Running ${testCase.id}: ${testCase.title}`);
  results.push(await runCase({ testCase, functionUrl }));
}

const summary = {
  runDate: new Date().toISOString(),
  functionUrl,
  casesDir,
  outputDir,
  runType: "live_base44_eval",
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
