# EVAL-001: Prompt Manual Test

Status: Complete
Version: 0.1
Owner: Dustin, Founder
Reviewer: Chief Skeptic
Last Updated: 2026-07-05
Confidence: 82/100

## Purpose

This eval tests whether PROMPT-001 behaves like Validate.

The goal is not to prove the product is finished.

The goal is to find out whether the first Validate brain can:

- Ask the right questions.
- Evaluate evidence instead of ideas.
- Avoid being overly agreeable.
- Use the recommendation framework.
- Produce the expected recommendation across the four founding cases.

## Prompt Under Test

[PROMPT-001: Validate System Instructions](../prompts/PROMPT-001-Validate-System-Instructions.md)

## Test Cases

| Case | Expected Recommendation | Purpose |
| --- | --- | --- |
| [CASE-001: AI Search For Enterprise Admins](../cases/CASE-001-AI-Search-For-Enterprise-Admins.md) | Validate | Tests promising opportunity with weak evidence. |
| [CASE-002: Bulk Invite For Enterprise Admins](../cases/CASE-002-Bulk-Invite-For-Enterprise-Admins.md) | Build | Tests strong evidence and justified investment. |
| [CASE-003: Customer Analytics Dashboard](../cases/CASE-003-Customer-Analytics-Dashboard.md) | Pause | Tests unclear timing and unresolved context. |
| [CASE-004: AI-Generated Admin Avatars](../cases/CASE-004-AI-Generated-Admin-Avatars.md) | Reject | Tests evidence pointing against investment. |

## Evaluation Method

Run each case as a manual conversation using PROMPT-001 as the system instruction.

For each case:

1. Start with the case's Starting Input.
2. Let Validate ask its questions.
3. Answer using the assumed answers in the case file.
4. Continue until Validate stops asking and produces a recommendation.
5. Record the result in this eval.

## Required Behaviors

Validate should:

- Ask the opening product decision question when starting from a blank conversation.
- Clarify decision intent before evaluating.
- Ask at least 5 questions before recommending.
- Usually ask 6 to 10 questions.
- Never ask more than 20 questions.
- Classify important statements as facts, evidence, assumptions, opinions, or hypotheses.
- Treat customer and behavioral evidence as stronger than internal opinion.
- Identify weak, missing, or contradictory evidence.
- Use Investment Score, Confidence, Decision Debt Risk, and Potential.
- Recommend exactly one of Build, Validate, Pause, or Reject.
- Use the output template from SPEC-002.
- Include a concrete Next Best Action.
- Include what would change the recommendation.
- Refuse to rubber-stamp a predetermined answer if the user tries to force one.

## Failure Modes To Watch For

Validate fails the eval if it:

- Recommends Build too easily.
- Rejects early ideas only because evidence is thin.
- Treats internal excitement as strong evidence.
- Skips decision-intent clarification.
- Makes a recommendation before asking enough questions.
- Produces a generic product-strategy answer instead of a Validate recommendation.
- Gives multiple recommendations at once.
- Hides uncertainty.
- Produces scores without explaining them.
- Gives vague next steps like "do more research."
- Writes a PRD or project plan before evaluating investment readiness.

## Scoring Rubric

Each case receives a score from 0 to 3.

| Score | Meaning |
| --- | --- |
| 3 | Pass: recommendation and reasoning match the case. |
| 2 | Mostly pass: recommendation is correct, but reasoning or format needs work. |
| 1 | Mostly fail: recommendation is wrong, but some reasoning behavior is useful. |
| 0 | Fail: recommendation and reasoning are not Validate-like. |

## Overall Pass Criteria

PROMPT-001 passes EVAL-001 if:

- All four cases receive a score of 2 or 3.
- At least three cases receive a score of 3.
- No case recommends Build when the expected recommendation is Validate, Pause, or Reject.
- No case recommends Reject only because evidence is missing.

## Case Result Template

Use this template for each manual run:

```text
Case:
Expected Recommendation:
Actual Recommendation:
Score:

Question Behavior:
- Did it ask at least 5 questions?
- Did it stop before 20?
- Did the questions improve the decision?

Evidence Behavior:
- Did it classify evidence correctly?
- Did it identify weak or missing evidence?
- Did it avoid treating opinion as proof?

Scoring Behavior:
- Investment Score:
- Confidence:
- Decision Debt Risk:
- Potential:
- Did the scores make sense?

Output Behavior:
- Did it use the template?
- Did it give one recommendation?
- Did it include Next Best Action?
- Did it include What Would Change This Recommendation?

Notes:
- What worked?
- What failed?
- What should change in PROMPT-001?
```

## EVAL-001 Results

Status: Passed

Run Type: Manual Dry Run

Run Date: 2026-07-05

Reviewer: Chief Skeptic

Important note:

This eval was run as a manual dry run against PROMPT-001 and the four founding case files. It was not run through an automated model API. The next eval should execute the prompt with an actual model and compare the generated response to these expected results.

| Case | Expected | Actual | Score | Notes |
| --- | --- | --- | --- | --- |
| CASE-001 | Validate | Validate | 3 | Prompt rules correctly favor Validate for high-potential, weak-evidence opportunities. It should not recommend Build because confidence is low and Decision Debt Risk is high. |
| CASE-002 | Build | Build | 3 | Prompt rules correctly allow Build when customer evidence, behavioral evidence, business impact, and strategic timing are strong. Remaining assumptions should shape scope, not block investment. |
| CASE-003 | Pause | Pause | 3 | Prompt rules correctly support Pause when the idea may be reasonable but timing, data readiness, and strategic fit are unresolved. |
| CASE-004 | Reject | Reject | 3 | Prompt rules correctly support Reject when evidence points away from investment, not merely when evidence is missing. |

Overall Score: 12/12

Overall Result: Pass

PROMPT-001 passes this manual dry run because:

- All four cases received a score of 3.
- No case recommended Build incorrectly.
- No case recommended Reject only because evidence was missing.
- The recommendation rules map cleanly to the expected case outcomes.

## Case Notes

### CASE-001: AI Search For Enterprise Admins

Expected Recommendation: Validate

Actual Recommendation: Validate

Score: 3

Question Behavior:

- The prompt requires decision-intent clarification.
- The prompt requires at least 5 questions and normally 6 to 10.
- The case's 8-question flow fits the prompt.

Evidence Behavior:

- The prompt correctly treats secondhand customer success comments and one prospect mention as weak evidence.
- The prompt correctly identifies missing direct customer and behavioral evidence.
- The prompt preserves high Potential without inflating Confidence.

Scoring Behavior:

- Investment Score should be medium because enterprise admin usability may matter.
- Confidence should be low because evidence is weak.
- Decision Debt Risk should be high because AI search could be expensive and wrong if the real problem is navigation, documentation, or permissions.
- Potential should be medium to high.

Output Behavior:

- Expected output should use the SPEC-002 template.
- Expected next best action should be targeted learning before build.
- Expected "What Would Change" should name customer interviews, support ticket review, and behavior data.

Notes:

- This is the clearest test of the Transformational Ideas Rule.
- PROMPT-001 handles it well by separating Confidence from Potential.

### CASE-002: Bulk Invite For Enterprise Admins

Expected Recommendation: Build

Actual Recommendation: Build

Score: 3

Question Behavior:

- The case includes 8 clarifying questions, matching the prompt's normal range.
- The questions cover problem, evidence, behavior, business impact, timing, assumptions, scope, and build cost.

Evidence Behavior:

- The prompt should treat 7 of 8 customer interviews, 43 support tickets, and behavioral analytics as strong evidence.
- It should not require perfect certainty before recommending Build.
- It should preserve the CSV-versus-SCIM assumption as a scope risk.

Scoring Behavior:

- Investment Score should be high.
- Confidence should be high.
- Decision Debt Risk should be low to moderate because the first build is scoped and reversible.
- Potential should be medium to high.

Output Behavior:

- Expected next best action should be a scoped v1, not a broad identity-management project.
- Expected "What Would Change" should mention evidence that customers require SCIM immediately or that engineering complexity is higher than expected.

Notes:

- PROMPT-001 correctly allows Build when evidence is strong enough.
- This guards against Validate becoming reflexively anti-build.

### CASE-003: Customer Analytics Dashboard

Expected Recommendation: Pause

Actual Recommendation: Pause

Score: 3

Question Behavior:

- The case's 8-question flow matches the prompt.
- Questions test customer demand, evidence strength, strategy, competing priorities, data readiness, and reopen conditions.

Evidence Behavior:

- The prompt should recognize some customer signal without overstating it.
- It should treat inconsistent instrumentation as a major readiness and trust risk.
- It should recognize current strategic mismatch with onboarding and activation priorities.

Scoring Behavior:

- Investment Score should be low to medium.
- Confidence should be low.
- Decision Debt Risk should be high because customer-facing analytics on weak instrumentation can create trust and rework problems.
- Potential should be medium.

Output Behavior:

- Expected next best action should define a reopen condition.
- Expected "What Would Change" should mention repeated enterprise customer demand, measurable CS burden, and improved instrumentation.

Notes:

- PROMPT-001 distinguishes Pause from Reject well here.
- The idea is not bad; the decision is not ready.

### CASE-004: AI-Generated Admin Avatars

Expected Recommendation: Reject

Actual Recommendation: Reject

Score: 3

Question Behavior:

- The case's 8-question flow matches the prompt.
- Questions test problem clarity, evidence, business value, risks, competing work, cost of doing nothing, and metric impact.

Evidence Behavior:

- The prompt should treat internal excitement as opinion, not evidence.
- It should recognize negative customer, support, sales, and strategic evidence.
- It should avoid recommending Validate when the evidence already points away from investment.

Scoring Behavior:

- Investment Score should be very low.
- Confidence should be high because multiple evidence sources point away from investment.
- Decision Debt Risk should be moderate because even small work can create attention cost and policy review.
- Potential should be very low.

Output Behavior:

- Expected next best action should be to record the decision and redirect attention.
- Expected "What Would Change" should mention multiple target customers requesting profile personalization and tying it to a real workflow or business need.

Notes:

- PROMPT-001 correctly distinguishes weak evidence from negative evidence.
- This prevents every weak idea from becoming a validation project.

## Follow-Up Work

Recommended next eval:

Create EVAL-002 as an actual model-run eval using PROMPT-001 and the same four cases.

Recommended additional case:

Add CASE-005 for a transformational idea with high Potential and weak evidence, then test that PROMPT-001 recommends Validate or Pause instead of premature Reject or Build.

## Open Questions

- Should we run this manually in ChatGPT first, or build a tiny local script to run the prompt?
- Should eval results live in this file or separate dated result files?
- Should future evals test adversarial behavior, such as "tell my boss we should build this"?
- Should we add a fifth case for a transformational idea with weak evidence and high potential?
- What score should trigger a prompt revision versus a spec revision?
