# CASE-004: AI-Generated Admin Avatars

Status: Manual Test
Date: 2026-07-05
Frameworks Tested: RFC-004 Conversation Framework, RFC-005 Decision Engine, RFC-006 Investment Model
Evaluator: Chief Skeptic

## Purpose

This case tests whether Validate can recommend Reject when the available evidence points against investment.

Reject should not mean:

- Evidence is missing.
- The idea is unfamiliar.
- The user did not make a strong enough pitch.

Reject means:

> The available evidence suggests this opportunity is not worth investing in.

## Starting Input

User:

> We're considering building AI-generated profile avatars for enterprise admins.

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

What customer or user problem do you believe AI-generated admin avatars solve?

Assumed answer:

> Admin profiles look plain. We think generated avatars could make the admin experience feel more modern and personalized.

### Question 2

What evidence do you have that this problem exists?

Assumed answer:

> We do not have customer complaints. One designer suggested it during a polish review, and a few people internally thought it sounded fun.

### Question 3

Do you have customer evidence, usage metrics, support tickets, or sales feedback showing this matters?

Assumed answer:

> No. Customers have not asked for it. Support tickets and sales feedback are focused on onboarding, permissions, reporting, and integrations.

### Question 4

What business or strategic goal would this support?

Assumed answer:

> It might make the product feel more modern, but it does not directly support the current enterprise onboarding strategy.

### Question 5

What risks or concerns exist?

Assumed answer:

> Some enterprise customers have strict policies around profile imagery and AI-generated content. Legal and security might need to review it.

### Question 6

What else is competing for engineering time?

Assumed answer:

> Bulk invite, onboarding reliability, admin roles, and integration work are higher-priority enterprise asks.

### Question 7

What happens if you do nothing for 30 to 90 days?

Assumed answer:

> Probably nothing. Admin profiles remain plain, but no known customer workflow is blocked.

### Question 8

Is there evidence this would improve adoption, retention, revenue, support load, or customer satisfaction?

Assumed answer:

> No. We do not have evidence that avatars would improve any product or business metric.

## Step 3: Classify Inputs

| Statement | Classification | Notes |
| --- | --- | --- |
| Admin profiles look plain. | Opinion | Aesthetic judgment, not evidence of customer pain. |
| Generated avatars could make the product feel modern. | Hypothesis | Plausible but unsupported. |
| No customers have asked for this. | Fact | Strong negative signal for prioritization. |
| Support tickets focus on onboarding, permissions, reporting, and integrations. | Customer Evidence | Points toward other priorities. |
| Sales feedback focuses on onboarding and integrations. | Business Evidence | Points away from this investment. |
| Feature does not support current enterprise onboarding strategy. | Strategic Evidence | Weak strategic fit. |
| Some enterprise customers may have profile imagery or AI-content policies. | Risk | Potential compliance and trust concern. |
| No known product or business metric would improve. | Fact | Major weakness. |

## Step 4: Evidence Assessment

### Customer Evidence

Current strength: Negative

Reason:

Customers have not requested this feature. Existing customer evidence points toward other needs: onboarding, permissions, reporting, and integrations.

### Behavioral Evidence

Current strength: Missing

Reason:

No usage behavior suggests admin profiles are a source of friction or that personalization would improve engagement.

### Business Evidence

Current strength: Negative

Reason:

Sales and support feedback point to other priorities. There is no evidence this feature would affect revenue, retention, expansion, support load, or activation.

### Strategic Evidence

Current strength: Negative

Reason:

The feature does not support the current enterprise onboarding strategy and competes with higher-priority work.

### Opinion Evidence

Current strength: Weak

Reason:

The idea is based on internal aesthetic preference and novelty. That may be useful for brainstorming, but it does not justify investment.

## Step 5: Assumptions

Major assumptions:

- Admins care about profile avatars.
- AI-generated avatars would make the product feel meaningfully better.
- Enterprise customers would accept AI-generated profile imagery.
- The feature would improve engagement or satisfaction.
- The work would be small enough not to distract from higher priorities.

Highest-risk assumptions:

1. Enterprise admins value personalization in this context.
2. AI-generated imagery is acceptable for enterprise admin workflows.
3. The feature is worth any engineering, legal, security, or design attention.

## Step 6: Scores

Investment Score: 18/100, Very Low

Reason:

Customer pain is absent, business value is unproven, strategic fit is weak, and the idea competes with clearly higher-priority enterprise needs.

Confidence: 81/100, High

Reason:

Confidence is high because multiple evidence sources point away from investment. Customer requests, support tickets, sales feedback, and strategy all indicate this is not worth building now.

Decision Debt Risk: 58/100, Moderate

Reason:

The build may not be technically large, but it could create distraction, policy review, design complexity, and opportunity cost. Even small work creates decision debt when it pulls attention from validated enterprise needs.

Potential: 22/100, Very Low

Reason:

The upside appears narrow and mostly aesthetic. It does not clearly improve user outcomes, business outcomes, strategic position, or platform leverage.

## Step 7: Recommendation

Recommendation: Reject

Confidence: 81/100

## Summary

The available evidence does not support investing in AI-generated profile avatars for enterprise admins. The idea is mostly based on internal preference and novelty, while customer, sales, support, and strategic evidence all point toward other priorities.

This is not a case where the idea simply needs more validation. The current evidence suggests the opportunity is low-value, weakly aligned, and not worth product or engineering attention compared with higher-priority enterprise work.

## Evidence

Strongest evidence against investment:

- No customers have asked for the feature.
- Support tickets point to onboarding, permissions, reporting, and integrations instead.
- Sales feedback points to onboarding and integrations instead.
- The feature does not support the current enterprise onboarding strategy.
- No adoption, retention, revenue, support, or satisfaction metric is expected to improve.

Weakest or missing evidence:

- No direct customer interviews about avatars.
- No behavioral data about profile customization.
- No experiment showing personalization improves enterprise admin engagement.

Contradictions:

- Internal teams think it could make the product feel polished, but customer and business evidence point elsewhere.
- The feature may feel modern internally, but enterprise customers may have restrictions around profile imagery or AI-generated content.

## Assumptions

- Admins want personalization in an enterprise admin console.
- AI-generated avatars create meaningful product value.
- Enterprise customers would accept AI-generated imagery.
- This feature would not distract from more important enterprise work.

## Reasoning

RFC-005 says Reject is appropriate when Investment Score is low, Confidence is medium to high that the opportunity is weak, evidence shows the problem is not painful, frequent, valuable, or strategic enough, and better alternatives exist.

This case fits that pattern.

The problem is not validated, the upside is low, strategic fit is weak, and better-supported work exists. The recommendation should be Reject, not Validate, because the available evidence points against investment rather than merely being incomplete.

## Next Best Action

Do not invest product, design, or engineering time in AI-generated admin avatars.

Recommended follow-up:

1. Record the decision in the product decision history.
2. Redirect attention to validated enterprise priorities.
3. Revisit only if multiple enterprise customers explicitly request profile personalization and can connect it to a real workflow or business need.

## What This Case Tests About Validate

This case shows that Validate should:

- Reject ideas when evidence points against investment.
- Avoid treating every weak idea as something to validate.
- Distinguish internal excitement from customer evidence.
- Protect engineering focus from low-value novelty.
- Explain rejection without being dismissive or insulting.

## What Felt Strong

- Reject felt meaningfully different from Validate and Pause.
- High Confidence with low Investment Score was useful.
- The case clarified that negative evidence is different from missing evidence.
- The recommendation protected strategic focus.

## What Felt Fuzzy

- The framework needs clearer guidance on when low-effort work is still not worth doing.
- Decision Debt Risk may need a separate "attention cost" or "strategy distraction" dimension.
- The model should explain when to record and forget an idea versus keep monitoring it.

## Follow-Up Work

- Refine RFC-005 with sharper distinctions between Validate, Pause, and Reject.
- Add guidance for low-effort but low-value ideas.
- Add a short "core cases summary" comparing Build, Validate, Pause, and Reject.

