# EVAL-001: Prompt Manual Test

Status: Draft
Version: 0.1
Owner: Dustin, Founder
Reviewer: Chief Skeptic
Last Updated: 2026-07-05
Confidence: 78/100

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

Status: Not Run

| Case | Expected | Actual | Score | Notes |
| --- | --- | --- | --- | --- |
| CASE-001 | Validate | Not Run | TBD | TBD |
| CASE-002 | Build | Not Run | TBD | TBD |
| CASE-003 | Pause | Not Run | TBD | TBD |
| CASE-004 | Reject | Not Run | TBD | TBD |

## Open Questions

- Should we run this manually in ChatGPT first, or build a tiny local script to run the prompt?
- Should eval results live in this file or separate dated result files?
- Should future evals test adversarial behavior, such as "tell my boss we should build this"?
- Should we add a fifth case for a transformational idea with weak evidence and high potential?
- What score should trigger a prompt revision versus a spec revision?
