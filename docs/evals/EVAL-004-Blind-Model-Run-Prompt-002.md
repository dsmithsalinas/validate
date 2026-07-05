# EVAL-004: Blind Model Run With PROMPT-002

Status: Complete
Version: 0.1
Owner: Dustin, Founder
Reviewer: Chief Skeptic
Last Updated: 2026-07-05
Confidence: 86/100

## Purpose

This eval tests whether PROMPT-002 improves Decision Debt calibration after adding RFC-007: Decision Debt Model.

EVAL-003 showed that PROMPT-001 selected the right recommendation type, but under-scored Decision Debt Risk.

EVAL-004 reruns the same blind model eval with the same model and same simulated transcripts, but uses PROMPT-002.

## Prompt Under Test

[PROMPT-002: Validate System Instructions](../prompts/PROMPT-002-Validate-System-Instructions.md)

## Model

Model: `gpt-4.1-mini`

Run Date: 2026-07-05

Run Type: Blind API model run

## Method

For each founding case:

1. PROMPT-002 was used as the system instruction.
2. The model received only a simulated transcript made from the case's starting input and assumed user answers.
3. The model did not receive the expected recommendation.
4. The model did not receive the completed evidence classification, scoring, reasoning, or final recommendation from the case file.
5. The model was instructed not to ask follow-up questions during the eval run.
6. The model produced a final Validate recommendation.
7. The recommendation and scores were compared to EVAL-003 and the expected case outcome.

## Results

| Case | Expected | Actual | Pass | Investment Score | Confidence | Decision Debt Risk | Potential |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CASE-001 | Validate | Validate | Yes | 60 | 40 | 75 | 80 |
| CASE-002 | Build | Build | Yes | 80 | 75 | 25 | 70 |
| CASE-003 | Pause | Pause | Yes | 45 | 55 | 50 | 60 |
| CASE-004 | Reject | Reject | Yes | 25 | 75 | 45 | 30 |

Overall Result: Pass

Overall Score: 4/4 recommendations correct

## Decision Debt Comparison

| Case | EVAL-003 PROMPT-001 | EVAL-004 PROMPT-002 | Change | Result |
| --- | ---: | ---: | ---: | --- |
| CASE-001 | 30 | 75 | +45 | Much better calibrated |
| CASE-002 | 30 | 25 | -5 | Still appropriate |
| CASE-003 | 40 | 50 | +10 | Better, but may still be low |
| CASE-004 | 30 | 45 | +15 | Better calibrated |

## Key Finding

PROMPT-002 materially improved Decision Debt calibration while preserving recommendation accuracy.

The biggest improvement was CASE-001, where the model now recognizes that AI search creates high Decision Debt because of trust, governance, implementation, and solution-fit risk.

CASE-004 also improved: the model now recognizes that low engineering effort does not mean no Decision Debt.

CASE-003 improved, but may still need stronger calibration. Customer-facing analytics on inconsistent instrumentation likely deserves High Decision Debt, not merely Moderate, because customers may treat the dashboard as a source of truth.

## Case Notes

### CASE-001: AI Search For Enterprise Admins

Expected Recommendation: Validate

Actual Recommendation: Validate

Result: Pass

Decision Debt improved from 30 to 75.

The model explicitly cited AI trust, governance, complexity, and rework risk. This matches RFC-007.

### CASE-002: Bulk Invite For Enterprise Admins

Expected Recommendation: Build

Actual Recommendation: Build

Result: Pass

Decision Debt moved from 30 to 25.

This is acceptable because the case has strong evidence, clear problem-solution fit, scoped implementation, and limited trust risk.

### CASE-003: Customer Analytics Dashboard

Expected Recommendation: Pause

Actual Recommendation: Pause

Result: Pass

Decision Debt improved from 40 to 50.

This is directionally better, but still under the expected high-risk calibration from RFC-007. The prompt may need a stronger minimum-risk rule for customer-facing analytics when instrumentation is inconsistent.

### CASE-004: AI-Generated Admin Avatars

Expected Recommendation: Reject

Actual Recommendation: Reject

Result: Pass

Decision Debt improved from 30 to 45.

The model now treats policy review, brand risk, attention cost, and strategic distraction as real debt even when engineering effort is low.

## Recommendation

Adopt PROMPT-002 as the current working Validate system prompt.

PROMPT-002 is better than PROMPT-001 because it preserves recommendation accuracy while improving Decision Debt calibration.

## Follow-Up Work

Recommended next step:

Add one more Decision Debt calibration rule for customer-facing analytics:

> If customer-facing analytics depend on inconsistent or untrusted instrumentation, Trust, Data & Governance Risk should usually be High unless the dashboard is clearly internal-only, experimental, or not used as a source of truth.

Recommended additional eval:

Add CASE-005 for a transformational idea with high Potential and weak evidence, then test that PROMPT-002 recommends Validate or Pause instead of premature Build or Reject.
