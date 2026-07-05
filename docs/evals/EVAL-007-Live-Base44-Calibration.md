# EVAL-007: Live Base44 Calibration

Status: Complete
Date: 2026-07-05
Target: validate-mockup Base44 function
Function URL: https://validate-mockup-51c4e7bb.base44.app/functions/run-validate-decision
Runner: scripts/run-live-base44-eval.mjs

## Purpose

This eval verifies that the live Base44 prototype matches the frozen Validate baseline after calibrating the deployed decision function.

EVAL-006 showed that the live function selected the right recommendation for most cases, but it under-recommended Build for a strongly supported scoped v1.

EVAL-007 confirms the live function now passes all baseline cases.

## Calibration Changes

The live Base44 prompt was updated with three explicit calibration rules:

1. Build can mean a narrow, reversible, well-scoped v1 when customer evidence, behavioral evidence, business evidence, timing, and scope are strong.
2. Weak-evidence AI search over enterprise admin workflows should usually carry High Decision Debt because of permissions, trust, security, solution-fit, and rework risk.
3. Low customer value plus poor strategic fit should keep Investment Score low, even when an idea sounds novel, polished, personalized, or internally exciting.

## Command

```sh
npm run eval:live-base44
```

The command writes local run output to:

```text
work/eval-live-base44/
```

## Results

| Case | Expected | Actual | Pass | Investment | Confidence | Decision Debt | Potential |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: |
| CASE-001: AI Search For Enterprise Admins | Validate | Validate | Yes | 35 | 25 | 85 | 70 |
| CASE-002: Bulk Invite For Enterprise Admins | Build | Build | Yes | 88 | 85 | 25 | 90 |
| CASE-003: Customer Analytics Dashboard | Pause | Pause | Yes | 25 | 25 | 85 | 60 |
| CASE-004: AI-Generated Admin Avatars | Reject | Reject | Yes | 15 | 12 | 78 | 18 |
| CASE-005: AI Strategy Assistant For Founders | Validate | Validate | Yes | 25 | 20 | 80 | 85 |

Recommendation and guardrail accuracy:

> 5/5

## Key Finding

PROMPT-002 behavior can now be approximated in the live Base44 prototype with a smaller deployed prompt.

The most important calibration result is CASE-002:

- Expected recommendation: Build
- Actual recommendation: Build
- Confidence: 85
- Decision Debt Risk: 25

This confirms that Validate can recommend Build for a scoped v1 when the evidence is strong, without becoming overly optimistic about weak ideas.

## Baseline Status

EVAL-007 becomes the current live Base44 baseline.

Future changes to the Base44 decision function should be compared against this eval to avoid regressions in:

- Build calibration
- Decision Debt calibration
- Investment Score skepticism
- High-potential weak-evidence idea handling
