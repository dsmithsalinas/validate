import { createClientFromRequest } from "npm:@base44/sdk";

const validateSystemPrompt = `
You are Validate, a skeptical product decision engine.

Your job is to help founders and product teams decide whether to Build, Validate, Pause, or Reject a product investment.

Core principles:
- Evaluate evidence, not enthusiasm.
- Do not be overly supportive of every idea.
- Potential and Confidence are separate.
- Decision Debt is premature-commitment risk, not engineering effort.
- High Potential does not justify Build without enough evidence.
- Weak evidence should lower Confidence.
- Missing evidence usually means Validate or Pause, not Build.
- Reject only when available evidence points against investment.

Recommendation meanings:
- Build: evidence is strong enough, confidence is medium to high, decision debt is acceptable, and timing is justified.
- Validate: potential or investment value is meaningful, but important assumptions need testing before heavy investment.
- Pause: timing, strategy, or context is not ready; revisit later.
- Reject: evidence suggests the opportunity is not worth investing in.

Investment Score calibration:
- Low customer value plus poor strategic fit should keep Investment Score low.
- Novelty, polish, personalization, or internal excitement should not raise Investment Score unless tied to customer pain, adoption, retention, revenue, support reduction, or a clear strategy.
- If customers have not asked for it, business impact is unproven, higher-priority customer problems are known, and waiting 30 to 90 days has little cost, Investment Score should usually be 35 or lower.

Build calibration:
- Build does not mean all uncertainty is gone.
- Build can mean building a narrow, reversible, well-scoped v1.
- If customer evidence, behavioral evidence, and business evidence are strong, the problem is clear, the proposed v1 scope is narrow, timing is important, and Decision Debt is low to moderate, recommend Build.
- Do not downgrade Build to Validate just because implementation details still need testing.
- CSV import vs. SCIM, error handling, validation states, duplicate handling, and similar v1 implementation details can be handled inside a scoped Build recommendation when the core problem and business need are already well supported.
- Validate is better when the problem, customer pain, solution direction, willingness to use, or business value is still meaningfully uncertain.

Decision Debt calibration:
- Trust risk can make Decision Debt high even when engineering effort is moderate.
- Customer-facing analytics, reporting, metrics, dashboards, forecasts, recommendations, or source-of-truth data built on inconsistent or untrusted data should usually have High Decision Debt.
- AI search over enterprise admin workflows should usually have High Decision Debt when evidence is weak, because it can create permissions, trust, security, solution-fit, and rework risk.
- High-potential weak-evidence AI strategy ideas should not look low-risk.
- Small work can still create moderate Decision Debt if it creates policy, trust, maintenance, support, or strategic distraction.

Transformational ideas rule:
- Do not kill big early ideas just because evidence is thin.
- High Potential + Low Confidence + learnable assumptions usually means Validate.
- High Potential + Low Confidence + no clear learning path usually means Pause.

Use the user's provided answers only. Do not ask follow-up questions in this prototype run.
Scores MUST be whole numbers from 0 to 100. Do not use decimals. Do not use a 0-1 scale. Do not use a 0-10 scale.
Return a direct recommendation using the requested JSON schema.
`;

const responseSchema = {
  type: "object",
  properties: {
    recommendation: {
      type: "string",
      enum: ["Build", "Validate", "Pause", "Reject"],
    },
    confidence: {
      type: "integer",
      minimum: 0,
      maximum: 100,
      description: "0-100 confidence score. Must be an integer, not a decimal.",
    },
    investment: {
      type: "integer",
      minimum: 0,
      maximum: 100,
      description: "0-100 investment score. Must be an integer, not a decimal.",
    },
    decisionDebt: {
      type: "integer",
      minimum: 0,
      maximum: 100,
      description: "0-100 decision debt risk score. Must be an integer, not a decimal.",
    },
    potential: {
      type: "integer",
      minimum: 0,
      maximum: 100,
      description: "0-100 potential score. Must be an integer, not a decimal.",
    },
    summary: {
      type: "string",
      description: "Plain-language summary of the recommendation.",
    },
    strongestEvidence: {
      type: "array",
      items: { type: "string" },
    },
    evidenceGaps: {
      type: "array",
      items: { type: "string" },
    },
    keyAssumptions: {
      type: "array",
      items: { type: "string" },
    },
    decisionRisks: {
      type: "array",
      items: { type: "string" },
    },
    nextBestAction: {
      type: "string",
      description: "The next concrete action the team should take.",
    },
  },
  required: [
    "recommendation",
    "confidence",
    "investment",
    "decisionDebt",
    "potential",
    "summary",
    "strongestEvidence",
    "evidenceGaps",
    "keyAssumptions",
    "decisionRisks",
    "nextBestAction",
  ],
};

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeScore(value: unknown) {
  if (typeof value !== "number" || Number.isNaN(value)) return null;

  let normalized = value;
  if (normalized > 0 && normalized <= 1) {
    normalized = normalized * 100;
  } else if (normalized > 1 && normalized <= 10) {
    normalized = normalized * 10;
  }

  return Math.max(0, Math.min(100, Math.round(normalized)));
}

function normalizeDecision(result: Record<string, unknown>) {
  return {
    ...result,
    confidence: normalizeScore(result.confidence),
    investment: normalizeScore(result.investment),
    decisionDebt: normalizeScore(result.decisionDebt),
    potential: normalizeScore(result.potential),
  };
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return Response.json({ error: "Use POST" }, { status: 405 });
  }

  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();

    const idea = cleanText(body.idea);
    const decisionType = cleanText(body.decisionType);
    const answers = body.answers && typeof body.answers === "object" ? body.answers : {};

    if (!idea) {
      return Response.json({ error: "Idea is required." }, { status: 400 });
    }

    const userPrompt = `
Evaluate this product decision.

Idea:
${idea}

Decision intent:
${decisionType || "Not specified"}

User answers:
- Customer problem: ${cleanText(answers.customerProblem) || "Not provided"}
- Evidence: ${cleanText(answers.evidence) || "Not provided"}
- Affected users or customers: ${cleanText(answers.users) || "Not provided"}
- Business or strategic goal: ${cleanText(answers.businessGoal) || "Not provided"}
- Alternatives today: ${cleanText(answers.alternatives) || "Not provided"}
- Risks or concerns: ${cleanText(answers.risks) || "Not provided"}
- Smallest useful validation test: ${cleanText(answers.validationTest) || "Not provided"}
- Cost, timing, or what happens if we wait: ${cleanText(answers.costOfDelay) || "Not provided"}

Return JSON only.
`;

    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `${validateSystemPrompt}\n\n${userPrompt}`,
      response_json_schema: responseSchema,
    });

    return Response.json({ success: true, decision: normalizeDecision(result) });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
});
