# CASE-003: Customer Analytics Dashboard

Status: Manual Test
Date: 2026-07-05
Frameworks Tested: RFC-004 Conversation Framework, RFC-005 Decision Engine, RFC-006 Investment Model
Evaluator: Chief Skeptic

## Purpose

This case tests whether Validate can recommend Pause when an idea may be reasonable, but the decision is not ready or not timely.

Pause should not mean:

- The idea is bad.
- The evidence is worthless.
- The team should forget it forever.

Pause means:

> Do not make this investment decision now. Clarify the conditions that would make it worth reopening.

## Starting Input

User:

> We're considering building a customer-facing analytics dashboard.

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

> Should we prioritize this now?

## Step 2: Ask Clarifying Questions

Following RFC-004, Validate should ask at least 5 questions and usually 6 to 10.

### Question 1

What customer or user problem do you believe a customer-facing analytics dashboard solves?

Assumed answer:

> Customers want more visibility into usage, adoption, and account health so admins can report progress internally.

### Question 2

What evidence do you have that this problem exists?

Assumed answer:

> Three customer success managers say customers ask for reporting during business reviews. Two customers asked for exports in the last month.

### Question 3

Do you have direct customer interviews, support tickets, or behavioral data showing this is frequent or painful?

Assumed answer:

> Not yet. We have not interviewed customers specifically about analytics. We have a few notes from QBRs and some export requests.

### Question 4

How does this connect to current company strategy?

Assumed answer:

> The company is currently focused on enterprise onboarding and activation. Analytics might help later, but it is not part of the current quarterly strategy.

### Question 5

What else is competing for engineering time?

Assumed answer:

> Bulk invite, onboarding reliability, and admin role improvements are all competing for the same team.

### Question 6

What data would power the dashboard, and is it reliable enough today?

Assumed answer:

> Some events exist, but instrumentation is inconsistent. We would need to clean up tracking before showing customer-facing metrics.

### Question 7

What happens if you do nothing for 30 to 90 days?

Assumed answer:

> Customer success will keep sending manual reports for some accounts. It is annoying, but not currently blocking deals or pilots.

### Question 8

What condition would make this worth reopening?

Assumed answer:

> If enterprise customers repeatedly ask for reporting during pilots, or if manual reporting becomes a measurable customer success burden.

## Step 3: Classify Inputs

| Statement | Classification | Notes |
| --- | --- | --- |
| Customers want more visibility into usage and adoption. | Assumption | Plausible, but direct evidence is limited. |
| Three customer success managers report customer requests during business reviews. | Weak Evidence | Internal and secondhand. |
| Two customers asked for exports in the last month. | Customer Evidence | Real signal, but small volume. |
| No customer interviews focused on analytics exist. | Fact | Important evidence gap. |
| Current strategy is enterprise onboarding and activation. | Strategic Evidence | Suggests poor timing for this investment. |
| Bulk invite, onboarding reliability, and admin roles compete for the same team. | Fact | Creates opportunity cost. |
| Instrumentation is inconsistent. | Fact | Raises implementation and trust risk. |
| Manual reporting is annoying but not blocking deals. | Business Evidence | Suggests pain exists but urgency is low. |

## Step 4: Evidence Assessment

### Customer Evidence

Current strength: Weak to Medium

Reason:

There are two direct export requests, but no focused customer interviews and no broader evidence that the dashboard is a high-priority customer need.

### Behavioral Evidence

Current strength: Missing

Reason:

No product behavior shows customers trying and failing to get analytics. Instrumentation is also inconsistent, which weakens confidence in the proposed dashboard.

### Business Evidence

Current strength: Weak

Reason:

Manual reporting creates some customer success burden, but there is no evidence that the lack of a dashboard is blocking deals, pilots, activation, retention, or expansion.

### Strategic Evidence

Current strength: Mixed

Reason:

The idea could support enterprise maturity later, but it is not aligned with the current quarterly priority of onboarding and activation.

### Opinion Evidence

Current strength: Medium

Reason:

Customer success believes this may matter, but internal belief is not enough to prioritize the work now.

## Step 5: Assumptions

Major assumptions:

- Customers need a dashboard, not exports or improved QBR reporting.
- Usage and adoption metrics are the right customer-facing data.
- The current event data is trustworthy enough to expose externally.
- This work is more urgent than onboarding reliability and admin improvements.
- Manual reporting burden will grow enough to justify product investment.

Highest-risk assumptions:

1. The dashboard is more important than current onboarding work.
2. Existing data is reliable enough for customer-facing reporting.
3. Customer demand is broad enough to justify prioritization.

## Step 6: Scores

Investment Score: 57/100, Low

Reason:

The idea has plausible customer value, but pain, frequency, and business impact are not yet strong enough. Strategic fit is future-looking rather than current.

Confidence: 51/100, Low

Reason:

There is some customer signal, but evidence is thin, mostly secondhand, and missing behavioral support. Instrumentation quality is a major uncertainty.

Decision Debt Risk: 67/100, High

Reason:

Building customer-facing analytics on inconsistent instrumentation could create trust issues and rework. It would also compete with higher-priority enterprise onboarding work.

Potential: 63/100, Medium

Reason:

If reporting becomes important to enterprise accounts, a dashboard could improve customer success workflows and product maturity. But current upside is not clearly urgent or transformational.

## Step 7: Recommendation

Recommendation: Pause

Confidence: 51/100

## Summary

The customer-facing analytics dashboard may be a reasonable future investment, but the decision is not ready now. Current evidence suggests some interest, but not enough urgency, strategic alignment, or data readiness to prioritize this work over enterprise onboarding improvements.

The biggest issue is not that the idea is bad. The issue is timing and readiness. The company has higher-priority enterprise onboarding work, the analytics instrumentation is inconsistent, and the customer demand is not yet strong enough to justify pulling engineering focus away from current priorities.

## Evidence

Strongest evidence:

- Two customers asked for exports in the last month.
- Customer success reports analytics requests during business reviews.
- Reporting could eventually support enterprise maturity.

Weakest or missing evidence:

- No focused customer interviews about analytics.
- No usage behavior showing customers trying to access analytics.
- No quantified manual reporting burden.
- No evidence that the lack of dashboard blocks deals, pilots, retention, or expansion.
- Instrumentation is inconsistent.

Contradictions:

- Customer success sees reporting demand, but company strategy is currently focused on onboarding and activation.
- A dashboard requires trustworthy data, but the underlying instrumentation is not yet reliable.

## Assumptions

- Customers need a productized dashboard soon.
- Existing data can support trustworthy reporting.
- The dashboard would be more valuable than current onboarding priorities.
- Export requests indicate dashboard demand rather than a simpler reporting need.

## Reasoning

RFC-005 says Pause is appropriate when the decision is not urgent, the strategic fit is weak or unresolved, the team lacks required context, or the timing is poor.

This case fits that pattern.

The idea is not weak enough to reject. It may become valuable later. But the right decision is to avoid committing engineering effort until demand, timing, and data readiness improve.

## Next Best Action

Pause this investment decision and define reopening criteria.

Recommended reopening criteria:

1. At least 5 enterprise customers request reporting or dashboards during pilots, onboarding, or business reviews.
2. Customer success spends more than 10 hours per month creating manual reports.
3. Lack of analytics is cited as a blocker in at least 2 enterprise deals, renewals, or expansions.
4. Event instrumentation reaches a quality level where customer-facing metrics can be trusted.
5. Current onboarding and admin-priority work is no longer competing for the same team.

Recommended low-cost work while paused:

1. Tag reporting requests in customer notes and support tickets.
2. Track manual reporting time spent by customer success.
3. Audit event instrumentation quality.
4. Collect example reports customers ask for.
5. Revisit after the current enterprise onboarding push.

## What This Case Tests About Validate

This case shows that Validate should:

- Avoid treating every plausible idea as a validation sprint.
- Recognize when timing and strategy make a decision premature.
- Separate future value from current priority.
- Recommend conditions for reopening the decision.
- Treat data readiness as part of investment readiness.

## What Felt Strong

- Pause created a useful distinction from Validate.
- The recommendation preserved the idea without committing engineering effort.
- Reopening criteria made the decision actionable.
- Decision Debt Risk captured both data-trust risk and opportunity cost.

## What Felt Fuzzy

- The boundary between Validate and Pause needs more precision.
- The model needs clearer language for "not now, but keep watching."
- The framework should define whether low-cost tracking work belongs inside Pause or Validate.

## Follow-Up Work

- Add clearer Pause guidance to RFC-005.
- Write CASE-004 where the correct answer is Reject.
- Refine the difference between Validate and Pause after all four core cases exist.

