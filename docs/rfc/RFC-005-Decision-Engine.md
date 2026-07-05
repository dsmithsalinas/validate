# RFC-005: Decision Engine

Status: Draft
Version: 0.1
Owner: Dustin, Founder
Reviewer: Chief Skeptic
Last Updated: 2026-07-05
Confidence: 84/100

## Purpose

The Decision Engine defines how Validate turns evidence, assumptions, risk, and reasoning into one of four recommendations:

- Build
- Validate
- Pause
- Reject

This document is the bridge between the Reasoning Framework and the eventual product experience.

The Conversation Framework defines how Validate gathers context.

The Decision Engine defines how Validate decides what to recommend.

## Core Principle

Validate should recommend the next best investment action, not the answer the user wants.

The recommendation must be grounded in evidence, confidence, risk, and potential.

## Decision Inputs

Before making a recommendation, Validate should consider:

- Decision intent
- Problem clarity
- Evidence strength
- Evidence type
- Evidence consistency
- Assumptions
- Business impact
- Strategic fit
- Urgency
- Development cost
- Opportunity cost
- Decision debt risk
- Potential upside

Validate does not need perfect information.

It needs enough information to make a responsible recommendation and explain uncertainty.

## Primary Scores

The Decision Engine uses four primary scores.

### Investment Score

Investment Score measures the attractiveness of the opportunity.

It answers:

> If this is true, how worthwhile is the investment?

Inputs:

- Customer pain
- User frequency
- Business value
- Strategic alignment
- Market timing
- Potential upside
- Development cost
- Opportunity cost

High Investment Score does not automatically mean Build.

An idea can have high upside and still need validation.

### Confidence

Confidence measures how sure Validate is in the recommendation.

It answers:

> How much should we trust this recommendation?

Inputs:

- Evidence quality
- Evidence volume
- Evidence consistency
- Evidence freshness
- Assumption risk
- Contradictions
- Missing context

Confidence is separate from Investment Score.

Example:

Investment Score: 85

Confidence: 35

Meaning:

The opportunity may be attractive, but the evidence is not strong enough to justify building yet.

### Decision Debt Risk

Decision Debt Risk measures the future cost of making the wrong investment decision now.

It answers:

> What future cost are we creating if we invest before enough evidence exists?

Inputs:

- Development effort
- Throwaway work risk
- Rework risk
- Team distraction
- Opportunity cost
- Integration complexity
- Long-term maintenance
- Strategic lock-in

Decision Debt Risk rises when engineering investment is large and evidence is weak.

### Potential

Potential measures the upside if the opportunity is real.

It answers:

> If this works, how meaningful could it become?

Inputs:

- Size of user/customer problem
- Revenue or retention upside
- Strategic leverage
- Platform leverage
- Differentiation
- Market timing
- Repeatability

Potential protects Validate from rejecting novel ideas only because evidence is early.

High Potential with low Confidence should usually lead to Validate, not Reject.

## Recommendation Set

Validate can recommend only one of:

- Build
- Validate
- Pause
- Reject

Each recommendation must include:

- Recommendation
- Confidence
- Investment Score
- Decision Debt Risk
- Potential
- Evidence summary
- Key assumptions
- Reasoning
- Next best action

## Recommendation Rules

### Build

Recommend Build when:

- Investment Score is high.
- Confidence is medium to high.
- Evidence includes strong customer, behavioral, or business support.
- The problem is clear.
- The solution direction is reasonably supported.
- Decision Debt Risk is acceptable relative to upside.
- The timing is strategically justified.

Build does not mean "build everything."

Build means the opportunity is justified enough to invest in implementation.

The next best action may still be a scoped MVP, limited release, pilot, or staged rollout.

### Validate

Recommend Validate when:

- Investment Score or Potential is meaningful.
- Confidence is low to medium.
- Evidence is promising but incomplete.
- Important assumptions remain.
- The cost of learning is lower than the cost of building.
- The idea may be valuable, but building now would create avoidable decision debt.

Validate is not a soft yes.

Validate means:

> Do not invest heavily yet. Learn enough to make a better decision.

The next best action should be a specific evidence-gathering step.

Examples:

- Interview 5 customers.
- Review support tickets.
- Run a concierge test.
- Prototype with design partners.
- Analyze usage data.
- Estimate engineering cost.

### Pause

Recommend Pause when:

- The decision is not urgent.
- The problem is unclear.
- Strategic fit is weak or unresolved.
- The team lacks required context.
- The timing is poor.
- The opportunity may be worth revisiting later.

Pause is not a rejection.

Pause means the decision should not be made now.

The next best action should clarify what condition would make the decision worth reopening.

### Reject

Recommend Reject when:

- Investment Score is low.
- Confidence is medium to high that the opportunity is weak.
- Evidence shows the problem is not painful, frequent, valuable, or strategic enough.
- Better alternatives exist.
- Decision Debt Risk is high relative to potential.
- The opportunity is misaligned with the product or company strategy.

Reject should be used carefully.

Validate should not reject an idea simply because evidence is missing.

Missing evidence usually means Validate or Pause.

Reject is appropriate when the available evidence points against investment.

## Refusal Rules

Validate should refuse to make a firm recommendation when:

- No evidence exists.
- Only one weak evidence source exists.
- Critical context is missing.
- The user tries to force a predetermined answer.
- The evidence is too contradictory to support a responsible recommendation.
- The conversation reaches 20 questions without enough clarity.

In these cases, Validate should explain why it cannot responsibly recommend Build, Validate, Pause, or Reject with confidence.

It should then recommend the next evidence-gathering step.

## Suggested Score Bands

These score bands are draft guidance, not final math.

### Investment Score

- 80 to 100: High attractiveness
- 60 to 79: Moderate attractiveness
- 40 to 59: Unclear or mixed attractiveness
- 0 to 39: Low attractiveness

### Confidence

- 80 to 100: High confidence
- 60 to 79: Medium confidence
- 40 to 59: Low confidence
- 0 to 39: Very low confidence

### Decision Debt Risk

- 80 to 100: Severe risk
- 60 to 79: High risk
- 40 to 59: Moderate risk
- 0 to 39: Low risk

### Potential

- 80 to 100: Transformational upside
- 60 to 79: Meaningful upside
- 40 to 59: Limited or unclear upside
- 0 to 39: Low upside

## Decision Matrix

| Investment Score | Confidence | Decision Debt Risk | Potential | Likely Recommendation |
| --- | --- | --- | --- | --- |
| High | High | Low or Moderate | Any | Build |
| High | Low | Any | High | Validate |
| High | Low | High | High | Validate |
| Moderate | Medium | Low or Moderate | Moderate or High | Validate |
| Moderate | Low | High | Moderate | Pause |
| Low | High | Any | Low | Reject |
| Low | Low | Any | Low or unclear | Pause |
| Any | Very low | High | Any | Refuse firm recommendation or Validate |

The matrix is a guide, not a replacement for reasoning.

Validate should explain why it selected a recommendation.

## Override Rules

Some conditions should override normal scoring.

### No Evidence Override

If no evidence exists, Validate should not recommend Build.

Likely recommendation: Refuse firm recommendation, Validate, or Pause.

### Predetermined Answer Override

If the user asks Validate to justify a predetermined answer, Validate should not comply.

Likely behavior: clarify that Validate only provides guidance based on evidence and reasoning.

### High Decision Debt Override

If Decision Debt Risk is high and Confidence is low, Validate should not recommend Build.

Likely recommendation: Validate or Pause.

### Strong Negative Evidence Override

If strong evidence shows the problem is not real, not painful, not frequent, or not valuable, Validate should recommend Reject even if the user likes the idea.

### High Potential Override

If Potential is high but Confidence is low, Validate should avoid premature rejection.

Likely recommendation: Validate.

## Recommendation Template

Every recommendation should use this structure:

```text
Recommendation: Build | Validate | Pause | Reject

Investment Score: 0-100
Confidence: 0-100
Decision Debt Risk: 0-100
Potential: 0-100

Summary:
One plain-language paragraph explaining the decision.

Evidence:
- Strongest supporting evidence
- Weakest or missing evidence
- Contradictions

Assumptions:
- Main unproven assumptions

Reasoning:
Why this recommendation follows from the evidence.

Next Best Action:
The specific next step the user should take.
```

## Example: Build

Recommendation: Build

Investment Score: 86

Confidence: 82

Decision Debt Risk: 38

Potential: 74

Summary:

The evidence supports investing in a scoped implementation. Multiple customer interviews, support tickets, and usage data point to a frequent and painful problem. The business impact is meaningful, and the development cost appears acceptable.

Next Best Action:

Build a limited MVP for the most affected customer segment and monitor adoption, support volume, and task completion.

## Example: Validate

Recommendation: Validate

Investment Score: 84

Confidence: 34

Decision Debt Risk: 72

Potential: 88

Summary:

The opportunity may be attractive, but the current evidence is too weak to justify engineering investment. The idea has high potential, but most support is internal belief rather than customer or behavioral evidence.

Next Best Action:

Interview 5 target users, review support tickets, and run a lightweight prototype test before committing engineering time.

## Example: Pause

Recommendation: Pause

Investment Score: 58

Confidence: 52

Decision Debt Risk: 64

Potential: 55

Summary:

The opportunity is not clearly wrong, but the decision is not ready. The problem is underdefined, the timing is unclear, and there are unresolved strategic questions.

Next Best Action:

Clarify the target customer, define the business reason to act now, and revisit after higher-priority roadmap decisions are resolved.

## Example: Reject

Recommendation: Reject

Investment Score: 28

Confidence: 78

Decision Debt Risk: 66

Potential: 31

Summary:

The available evidence does not support investment. The problem appears infrequent, low-pain, and weakly aligned with strategy. Building now would likely distract the team from higher-value work.

Next Best Action:

Do not invest engineering time. Keep a lightweight note in the decision history and revisit only if new customer or business evidence appears.

## Open Questions

- Should score calculation be human-readable rules, weighted math, or a hybrid?
- What minimum evidence threshold is required before Build can be recommended?
- Should Decision Debt Risk be calculated from estimated engineering effort, confidence, and throwaway-work risk?
- Should Potential be allowed to raise a recommendation from Reject to Validate?
- Should the MVP show scores numerically, descriptively, or both?
- Should Validate ever make a recommendation without showing scores?

