# EVAL-003: Blind Model Run

Status: Complete
Version: 0.1
Owner: Dustin, Founder
Reviewer: Chief Skeptic
Last Updated: 2026-07-05
Confidence: 82/100

## Purpose

This eval tests whether PROMPT-001 can independently land on the correct recommendation without seeing the completed case reasoning.

EVAL-002 was a golden-case model run.

EVAL-003 is a blind model run.

## Prompt Under Test

[PROMPT-001: Validate System Instructions](../prompts/PROMPT-001-Validate-System-Instructions.md)

## Model

Model: `gpt-4.1-mini`

Run Date: 2026-07-05

Run Type: Blind API model run

## Method

For each founding case:

1. PROMPT-001 was used as the system instruction.
2. The model received only a simulated transcript made from the case's starting input and assumed user answers.
3. The model did not receive the expected recommendation.
4. The model did not receive the completed evidence classification, scoring, reasoning, or final recommendation from the case file.
5. The model was instructed not to ask follow-up questions during the eval run.
6. The model produced a final Validate recommendation.
7. The recommendation and scores were compared to the expected case outcome.

## Results

| Case | Expected | Actual | Pass | Investment Score | Confidence | Decision Debt Risk | Potential |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CASE-001 | Validate | Validate | Yes | 55 | 40 | 30 | 70 |
| CASE-002 | Build | Build | Yes | 80 | 75 | 30 | 70 |
| CASE-003 | Pause | Pause | Yes | 45 | 50 | 40 | 60 |
| CASE-004 | Reject | Reject | Yes | 20 | 75 | 30 | 25 |

Overall Result: Pass

Overall Score: 4/4 recommendations correct

## What Worked

- The model independently selected all four correct recommendation types.
- The model did not recommend Build for the high-potential but weak-evidence AI search case.
- The model correctly recommended Build for the strong-evidence bulk invite case.
- The model correctly distinguished Pause from Reject for the customer analytics dashboard.
- The model correctly rejected the low-value AI avatar idea.

## Key Finding

Recommendation selection passed.

Score calibration needs work.

The model was directionally correct, but it under-scored Decision Debt Risk in several cases:

- CASE-001 expected high Decision Debt Risk because AI search could create rework, trust, security, and solution-fit risk. The blind run scored Decision Debt Risk as 30.
- CASE-003 expected high Decision Debt Risk because customer-facing analytics on inconsistent instrumentation can create trust and rework problems. The blind run scored Decision Debt Risk as 40.
- CASE-004 expected moderate Decision Debt Risk because even small novelty work can create attention cost, policy review, and opportunity cost. The blind run scored Decision Debt Risk as 30.

This suggests PROMPT-001 is strong enough for recommendation selection, but not yet strong enough for consistent Decision Debt scoring.

## Case Notes

### CASE-001: AI Search For Enterprise Admins

Expected Recommendation: Validate

Actual Recommendation: Validate

Result: Pass

The model correctly identified meaningful potential with weak evidence. It recommended validation through support ticket review, customer interviews, and prototyping.

Calibration issue:

Decision Debt Risk was too low. The model treated the risk as mostly contained even though the framework expects higher risk for AI search due to trust, security, implementation cost, and solution-fit uncertainty.

### CASE-002: Bulk Invite For Enterprise Admins

Expected Recommendation: Build

Actual Recommendation: Build

Result: Pass

The model correctly identified strong customer, behavioral, business, and strategic evidence. It recommended a scoped build rather than a broad identity-management project.

Calibration note:

Scores were lower than the golden case but still directionally reasonable.

### CASE-003: Customer Analytics Dashboard

Expected Recommendation: Pause

Actual Recommendation: Pause

Result: Pass

The model correctly recognized limited direct evidence, current strategic mismatch, competing priorities, and instrumentation gaps.

Calibration issue:

Decision Debt Risk was moderate instead of high. The prompt should make customer-facing data trust risk and instrumentation cleanup more prominent in Decision Debt scoring.

### CASE-004: AI-Generated Admin Avatars

Expected Recommendation: Reject

Actual Recommendation: Reject

Result: Pass

The model correctly rejected the idea because the evidence points away from investment rather than merely being missing.

Calibration issue:

Decision Debt Risk was low. The prompt should better explain that small features can still create meaningful Decision Debt through attention cost, policy review, opportunity cost, and strategic distraction.

## Recommended Prompt Changes

PROMPT-001 should be revised to strengthen Decision Debt scoring.

Add clearer guidance that Decision Debt Risk should rise when:

- The solution could be expensive or complex even if the problem is plausible.
- The team may build the wrong solution before understanding the real problem.
- The feature touches trust, security, policy, legal, compliance, or customer-facing data.
- The work could distract from higher-priority validated work.
- The feature creates attention cost even if engineering cost is small.
- The decision could create customer expectations or future maintenance.

## Follow-Up Work

Recommended next step:

Create PROMPT-002 or revise PROMPT-001 with stronger Decision Debt calibration, then rerun EVAL-003.

Recommended additional eval:

Add CASE-005 for a transformational idea with high Potential and weak evidence. This would test whether Validate recommends Validate or Pause instead of premature Build or Reject.
