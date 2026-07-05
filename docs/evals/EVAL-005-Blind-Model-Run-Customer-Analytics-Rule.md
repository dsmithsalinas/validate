# EVAL-005: Blind Model Run With Customer-Facing Analytics Rule

Status: Complete
Date: 2026-07-05
Prompt Tested: PROMPT-002-Validate-System-Instructions.md
Model: gpt-4.1-mini
Run Type: Blind model run
Runner: work/run-eval-003.mjs

## Purpose

This eval tests two calibration updates:

1. Customer-facing analytics built on inconsistent or untrusted data should usually trigger High Trust, Data & Governance Risk and High aggregate Decision Debt Risk.
2. High-potential, weak-evidence ideas should usually become Validate, not premature Build or reflexive Reject.

## Prompt Change Tested

PROMPT-002 now includes a hard Decision Debt scoring check:

> If the feature is customer-facing analytics, reporting, metrics, dashboards, forecasts, recommendations, or source-of-truth data, and the underlying data quality, instrumentation, definitions, or permissions are inconsistent or untrusted, the final Decision Debt Risk must not be below 65 unless a valid exception is explicitly identified.

It also includes a high-potential weak-evidence check:

> If an AI strategy or AI judgment product has high Potential but weak customer evidence, no behavioral evidence, unclear willingness to pay, unclear workflow fit, and meaningful trust or implementation risk, the final Decision Debt Risk should usually be at least 55.

## Results

| Case | Expected | Actual | Pass | Investment | Confidence | Decision Debt | Potential |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: |
| CASE-001: AI Search For Enterprise Admins | Validate | Validate | Yes | 55 | 40 | 70 | 75 |
| CASE-002: Bulk Invite For Enterprise Admins | Build | Build | Yes | 80 | 75 | 30 | 70 |
| CASE-003: Customer Analytics Dashboard | Pause | Pause | Yes | 50 | 55 | 70 | 65 |
| CASE-004: AI-Generated Admin Avatars | Reject | Reject | Yes | 25 | 75 | 45 | 30 |
| CASE-005: AI Strategy Assistant For Founders | Validate | Validate | Yes | 65 | 40 | 60 | 85 |

Recommendation accuracy:

> 5/5

## Key Findings

### CASE-003 Improved

Before the hard scoring check, the model correctly recommended Pause but underweighted Decision Debt:

- EVAL-003 / PROMPT-001: 40
- EVAL-004 / PROMPT-002: 50
- First EVAL-005 attempt: 55
- Final EVAL-005 run: 70

The hard scoring check was necessary. A general caution rule was not enough to make the final score match the trust risk.

### CASE-005 Behaved Correctly

The model recommended Validate for the AI Strategy Assistant for Founders.

This is the desired behavior:

- Not Build, because evidence is weak.
- Not Reject, because Potential is high and the assumptions are learnable.
- Validate, because the next move should be interviews, concierge tests, and willingness-to-pay validation.

The score profile was also directionally correct:

- Potential: 85, High
- Confidence: 40, Low
- Decision Debt Risk: 60, Moderate to High

## Interpretation

PROMPT-002 is now better calibrated for two important edge cases:

- Customer-facing truth surfaces with unreliable data.
- Big early ideas that deserve learning before judgment.

The most important lesson is that soft guidance may not be enough for model calibration. When Validate needs a specific risk posture, the prompt should include a hard scoring check and an exception rule.

## Follow-Up

Future evals should test whether the hard scoring floor creates false positives.

Useful future cases:

- Internal-only analytics with inconsistent instrumentation.
- Customer-facing beta analytics clearly labeled non-authoritative.
- Strong-evidence analytics with trusted instrumentation.
- High-potential AI idea with no clear learning path, expected Pause.
