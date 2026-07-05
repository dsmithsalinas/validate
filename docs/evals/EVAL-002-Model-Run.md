# EVAL-002: Model Run

Status: Complete
Version: 0.1
Owner: Dustin, Founder
Reviewer: Chief Skeptic
Last Updated: 2026-07-05
Confidence: 74/100

## Purpose

This eval tests PROMPT-001 with an actual OpenAI model call.

EVAL-001 was a manual dry run.

EVAL-002 verifies that a real model can follow PROMPT-001 and produce the expected recommendation for the four founding cases.

## Prompt Under Test

[PROMPT-001: Validate System Instructions](../prompts/PROMPT-001-Validate-System-Instructions.md)

## Model

Model: `gpt-4.1-mini`

Run Date: 2026-07-05

Run Type: API model run

## Method

For each founding case:

1. PROMPT-001 was used as the system instruction.
2. The full case file was provided as the user input.
3. The model was instructed to use the case file's Starting Input and assumed answers as the conversation evidence.
4. The model was instructed not to ask follow-up questions during this eval run.
5. The model produced a final Validate recommendation.
6. The recommendation and scores were compared to the expected case outcome.

## Important Limitation

This was a golden-case model run, not a blind eval.

The case files include the expected recommendation, reasoning, and scores. That makes this eval useful for checking whether the model can follow the prompt and reproduce the framework, but it does not prove the model can independently discover the right recommendation from raw conversation alone.

The next eval should be a blind model run where the model receives only the starting input and simulated user answers, without the expected recommendation or completed reasoning.

## Results

| Case | Expected | Actual | Pass | Investment Score | Confidence | Decision Debt Risk | Potential |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CASE-001 | Validate | Validate | Yes | 68 | 34 | 74 | 76 |
| CASE-002 | Build | Build | Yes | 86 | 82 | 36 | 78 |
| CASE-003 | Pause | Pause | Yes | 57 | 51 | 67 | 63 |
| CASE-004 | Reject | Reject | Yes | 18 | 81 | 58 | 22 |

Overall Result: Pass

Overall Score: 4/4 recommendations correct

## Case Notes

### CASE-001: AI Search For Enterprise Admins

Expected Recommendation: Validate

Actual Recommendation: Validate

Result: Pass

The model preserved the key distinction between high Potential and low Confidence. It recommended learning before building because direct customer evidence and behavioral evidence were missing, while Decision Debt Risk was high.

### CASE-002: Bulk Invite For Enterprise Admins

Expected Recommendation: Build

Actual Recommendation: Build

Result: Pass

The model recognized strong customer evidence, behavioral evidence, business impact, and strategic timing. It recommended Build while keeping the scope narrow.

### CASE-003: Customer Analytics Dashboard

Expected Recommendation: Pause

Actual Recommendation: Pause

Result: Pass

The model recognized that the idea may have future value, but timing, data readiness, strategic fit, and competing priorities make the decision not ready now.

### CASE-004: AI-Generated Admin Avatars

Expected Recommendation: Reject

Actual Recommendation: Reject

Result: Pass

The model distinguished missing evidence from negative evidence. It rejected the idea because customer, business, support, and strategic signals pointed away from investment.

## Observations

- The model followed the recommendation framework correctly across all four outcomes.
- The model used scores that matched the case files exactly.
- The model used the output template structure well enough for this eval.
- The model did not recommend Build too easily.
- The model did not reject high-potential weak evidence in CASE-001.
- The model did reject a low-value idea when evidence pointed against investment in CASE-004.

## Follow-Up Work

Create EVAL-003 as a blind model-run eval.

EVAL-003 should:

- Use PROMPT-001 as the system instruction.
- Provide only starting input and simulated user answers.
- Omit expected recommendations, final scores, and completed reasoning.
- Test whether the model independently lands on Build, Validate, Pause, or Reject.
- Include at least one transformational idea case with high Potential and weak evidence.
