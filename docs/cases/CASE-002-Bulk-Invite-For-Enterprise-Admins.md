# CASE-002: Bulk Invite For Enterprise Admins

Status: Manual Test
Date: 2026-07-05
Frameworks Tested: RFC-004 Conversation Framework, RFC-005 Decision Engine, RFC-006 Investment Model
Evaluator: Chief Skeptic

## Purpose

This case tests whether Validate can recommend Build when the evidence is strong enough to justify scoped engineering investment.

CASE-001 tested a high-potential idea with weak evidence.

CASE-002 tests a clearer customer problem with multiple evidence sources.

## Starting Input

User:

> We're considering building bulk invite and CSV import for enterprise admins.

## Step 1: Clarify Decision Intent

Validate:

> Let's clarify the decision before we evaluate it.
>
> Which best describes what you're trying to decide?
>
> - Should we build a feature?
> - Should we solve a customer problem?
> - Should we prioritize this now?
> - Should we investigate further?
> - Something else

Assumed user answer for this test:

> Should we build a feature?

## Step 2: Ask Clarifying Questions

Following RFC-004, Validate should ask at least 5 questions and usually 6 to 10.

### Question 1

What customer or user problem do you believe bulk invite solves for enterprise admins?

Assumed answer:

> Enterprise admins need to onboard dozens or hundreds of users during rollout. Today they have to invite users one at a time, which is slow and error-prone.

### Question 2

What evidence do you have that this problem exists?

Assumed answer:

> We interviewed 8 enterprise admins. 7 mentioned bulk onboarding as painful. We also found 43 support tickets in the last quarter related to bulk user setup, invite failures, or admin onboarding workarounds.

### Question 3

Do you have behavioral data showing this is frequent or painful?

Assumed answer:

> Yes. Analytics show that accounts with more than 50 seats take a median of 9 days to invite 80% of their users. Smaller accounts take 2 days. Admins in larger accounts also revisit the invite screen repeatedly during the first week.

### Question 4

What is the business impact?

Assumed answer:

> Customer success says this slows enterprise onboarding. Two expansion deals were delayed because the customer wanted easier user provisioning. Sales says lack of bulk invite comes up in late-stage enterprise procurement.

### Question 5

Why does this matter now?

Assumed answer:

> Enterprise expansion is the company's top priority this quarter, and we have three large pilots starting in the next 60 days.

### Question 6

What assumptions are still unproven?

Assumed answer:

> We still need to confirm whether CSV import is enough for v1 or whether customers expect SCIM immediately. We also need to test error handling for invalid emails and duplicate users.

### Question 7

What would a scoped first version look like?

Assumed answer:

> CSV upload with email, name, and role columns. Admins can preview rows, fix errors, and send invites in one batch. No SCIM in v1.

### Question 8

What is the estimated build cost?

Assumed answer:

> Engineering estimates 2 to 3 weeks for a scoped CSV import with preview, validation, and invite sending.

## Step 3: Classify Inputs

| Statement | Classification | Notes |
| --- | --- | --- |
| Enterprise admins invite users one at a time today. | Fact | Assumed current product behavior. |
| One-at-a-time invites are slow and error-prone for large accounts. | Customer Evidence | Supported by 7 of 8 admin interviews. |
| 43 support tickets mention bulk setup, invite failures, or onboarding workarounds. | Customer Evidence | Stronger because volume is quantified. |
| Large accounts take a median of 9 days to invite 80% of users. | Behavioral Evidence | Strong signal of onboarding friction. |
| Smaller accounts take a median of 2 days. | Behavioral Evidence | Useful comparison baseline. |
| Two expansion deals were delayed. | Business Evidence | Meaningful, but should be validated against CRM notes. |
| Enterprise expansion is top company priority this quarter. | Strategic Evidence | Strong if backed by leadership goals. |
| CSV import is enough for v1. | Assumption | Still needs validation against SCIM expectations. |
| Build cost is 2 to 3 weeks. | Assumption | Engineering estimate, not final commitment. |

## Step 4: Evidence Assessment

### Customer Evidence

Current strength: Strong

Reason:

The case includes 8 direct admin interviews, with 7 reporting the problem as painful. It also includes 43 related support tickets from the last quarter.

### Behavioral Evidence

Current strength: Strong

Reason:

Analytics show a clear difference between large and small accounts in time to invite 80% of users. Repeated visits to the invite screen suggest workflow friction.

### Business Evidence

Current strength: Medium to Strong

Reason:

Customer success and sales both report enterprise impact. Two delayed expansion deals provide a concrete business signal, though the exact revenue impact should be verified.

### Strategic Evidence

Current strength: Strong

Reason:

Enterprise expansion is the company's top priority this quarter, and large pilots are starting within 60 days.

### Opinion Evidence

Current strength: Supporting

Reason:

Internal teams agree this matters, but the recommendation does not depend only on internal opinion.

## Step 5: Assumptions

Major assumptions:

- CSV import is sufficient for the first version.
- SCIM is not required for the first build.
- Admins can prepare CSV files correctly.
- Error handling can prevent support burden.
- The engineering estimate is realistic.

Highest-risk assumptions:

1. CSV import is enough for v1.
2. The feature can handle role assignment and validation safely.
3. The 2 to 3 week engineering estimate is realistic.

## Step 6: Scores

Investment Score: 86/100, High

Reason:

The customer pain is clear, frequent for large accounts, strategically aligned with enterprise expansion, and tied to measurable onboarding friction. The scoped solution appears directly connected to the problem.

Confidence: 82/100, High

Reason:

The evidence includes direct customer interviews, support ticket volume, behavioral analytics, and business signals. Some assumptions remain, but the core problem is well supported.

Decision Debt Risk: 36/100, Low

Reason:

The proposed first version is scoped, reversible, and directly tied to observed pain. The biggest risk is building CSV import when customers actually expect SCIM, but the limited v1 can be positioned as a near-term onboarding improvement.

Potential: 78/100, Medium

Reason:

The feature could meaningfully improve enterprise onboarding, reduce support load, help sales and customer success, and support expansion. It is valuable but likely not transformational by itself.

## Step 7: Recommendation

Recommendation: Build

Confidence: 82/100

## Summary

The evidence supports building a scoped version of bulk invite and CSV import for enterprise admins. The problem is clearly tied to enterprise onboarding, appears frequently in customer interviews and support tickets, and shows up in behavioral analytics. The business and strategic context also support acting now.

This should not become a broad identity-management project yet. The recommendation is to build a narrow v1 that solves the validated onboarding pain while explicitly deferring SCIM until further evidence justifies it.

## Evidence

Strongest evidence:

- 7 of 8 interviewed enterprise admins described bulk onboarding as painful.
- 43 support tickets in the last quarter relate to bulk setup, invite failures, or onboarding workarounds.
- Large accounts take a median of 9 days to invite 80% of users, compared with 2 days for smaller accounts.
- Repeated invite-screen visits suggest workflow friction.
- Enterprise expansion is the current company priority.

Weakest or missing evidence:

- Revenue impact from delayed deals should be verified.
- Need clearer evidence on CSV import versus SCIM expectations.
- Need engineering validation on edge cases and permission handling.

Contradictions:

- None strong enough to block build.
- The main tension is whether CSV import is sufficient or whether enterprise customers expect SCIM.

## Assumptions

- CSV import will solve enough of the problem for v1.
- Admins can use CSV upload without creating excessive errors.
- The team can safely support role assignment, duplicate handling, invalid emails, and invite failure states.
- SCIM can be deferred without disappointing the target customers for this release.

## Reasoning

RFC-005 says Build is appropriate when Investment Score is high, Confidence is medium to high, strong customer or behavioral evidence exists, the problem is clear, and Decision Debt Risk is acceptable relative to upside.

This case fits that pattern.

The evidence supports investing in a scoped implementation. The remaining uncertainty should shape the scope, not block the decision.

## Next Best Action

Build a scoped v1 of bulk invite and CSV import.

Recommended scope:

1. CSV upload with email, name, and role columns.
2. Preview before sending.
3. Row-level validation for invalid emails, duplicate users, and missing roles.
4. Batch invite sending.
5. Clear success and failure states.
6. Event tracking for upload started, validation failed, invites sent, and invite completion.
7. Limited rollout to the three upcoming enterprise pilots.

Explicitly out of scope for v1:

- SCIM provisioning.
- Full identity provider integration.
- Advanced role mapping.
- Automated group sync.

## What This Case Tests About Validate

This case shows that Validate should:

- Recommend Build when strong evidence supports investment.
- Still constrain the recommendation to a scoped implementation.
- Keep assumptions visible even when confidence is high.
- Avoid turning a validated feature into an oversized platform project.
- Use remaining uncertainty to shape scope and rollout.

## What Felt Strong

- The Build recommendation followed clearly from customer, behavioral, business, and strategic evidence.
- The separate scores helped avoid overclaiming: high confidence, high investment score, low decision debt, medium potential.
- The framework supported a scoped Build rather than an unlimited Build.
- Evidence quality felt meaningfully different from CASE-001.

## What Felt Fuzzy

- The model needs clearer thresholds for when "medium potential" is enough for Build.
- Business evidence should probably require revenue or retention impact verification before scoring high.
- The framework needs guidance for "Build v1, Validate v2" situations.

## Follow-Up Work

- Add guidance to RFC-005 for scoped Build recommendations.
- Write CASE-003 where the correct answer is Pause.
- Write CASE-004 where the correct answer is Reject.
- Use all four cases to refine score thresholds and confidence caps.

