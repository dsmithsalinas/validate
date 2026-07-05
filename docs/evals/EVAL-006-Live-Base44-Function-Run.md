# EVAL-006: Live Base44 Function Run

Status: Complete
Date: 2026-07-05
Target: validate-mockup Base44 function
Function URL: https://validate-mockup-51c4e7bb.base44.app/functions/run-validate-decision
Runner: scripts/run-live-base44-eval.mjs

## Purpose

This eval tests whether the deployed Base44 prototype behaves like the frozen EVAL-005 baseline.

The important difference:

- EVAL-005 tested PROMPT-002 directly through the OpenAI eval runner.
- EVAL-006 tests the live Base44 function used by the web app.

This matters because the live app uses Base44 `Core.InvokeLLM`, so its reasoning may differ from the frozen OpenAI baseline.

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
| CASE-001: AI Search For Enterprise Admins | Validate | Validate | Yes | 60 | 25 | 75 | 80 |
| CASE-002: Bulk Invite For Enterprise Admins | Build | Validate | No | 90 | 70 | 40 | 90 |
| CASE-003: Customer Analytics Dashboard | Pause | Pause | Yes | 50 | 25 | 85 | 65 |
| CASE-004: AI-Generated Admin Avatars | Reject | Reject | Yes | 15 | 100 | 80 | 15 |
| CASE-005: AI Strategy Assistant For Founders | Validate | Validate | Yes | 85 | 20 | 80 | 85 |

Recommendation accuracy:

> 4/5

## Key Finding

The live Base44 function mostly preserves Validate behavior, but it regressed on CASE-002.

CASE-002 should be Build because the evidence is strong, the scope is narrow, Confidence is high enough, and Decision Debt is acceptable.

The live function returned Validate even though its scores were Build-shaped:

- Investment Score: 90
- Confidence: 70
- Decision Debt Risk: 40
- Potential: 90

The model treated the scoped CSV import as a validation test rather than a buildable v1.

## Interpretation

The live function needs clearer guidance that:

- Build does not mean all uncertainty is gone.
- Build can mean a scoped v1 when evidence is strong and remaining assumptions are implementation details.
- Validate should not be used when the decision is already supported enough to build a narrow, reversible first version.

## Next Calibration Target

Tighten the Base44 backend prompt for Build decisions.

The likely fix is a Build calibration rule:

> If customer evidence, behavioral evidence, and business evidence are strong, the problem is clear, the v1 scope is narrow, and Decision Debt is low to moderate, recommend Build even when implementation details still need testing.

This should be applied carefully so Validate does not become too eager to Build.
