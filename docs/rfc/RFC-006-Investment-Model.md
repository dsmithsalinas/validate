# RFC-006: Investment Model

Status: Draft
Version: 0.1
Owner: Dustin, Founder
Reviewer: Chief Skeptic
Last Updated: 2026-07-05
Confidence: 78/100

## Purpose

The Investment Model defines how Validate scores a product investment opportunity.

RFC-005 defines how Validate chooses Build, Validate, Pause, or Reject.

RFC-006 defines how Validate thinks about the four scores that influence that recommendation:

- Investment Score
- Confidence
- Decision Debt Risk
- Potential

This document exists because CASE-001 showed that the recommendation logic was useful, but the exact score values still felt too subjective.

## Core Principle

Scores should clarify judgment, not replace it.

Validate should never present a score as more precise than the evidence allows.

The score is a communication tool.

The reasoning is the product.

## Score Set

Validate uses four independent scores:

| Score | Question Answered |
| --- | --- |
| Investment Score | If this is true, how worthwhile is the investment? |
| Confidence | How much should we trust the recommendation? |
| Decision Debt Risk | What future cost are we creating if we decide now? |
| Potential | If this works, how meaningful could it become? |

These scores must not be collapsed into one overall grade.

Validate should preserve the tension between opportunity, certainty, risk, and upside.

## Why Scores Are Separate

A strong investment decision requires more than one dimension.

Examples:

| Investment Score | Confidence | Meaning |
| --- | --- | --- |
| High | High | Strong opportunity with strong evidence. Build may be justified. |
| High | Low | Attractive opportunity with weak evidence. Validate first. |
| Low | High | Strong evidence that this is not worth building. Reject may be justified. |
| Low | Low | Unclear idea with weak evidence. Pause or gather basic evidence. |

Potential and Decision Debt Risk add two more important dimensions:

- Potential prevents Validate from rejecting novel ideas too early.
- Decision Debt Risk prevents Validate from recommending expensive work too early.

## Score Bands

All scores use a 0 to 100 scale.

Validate should also display a descriptive band so users do not over-trust the number.

| Range | Band |
| --- | --- |
| 80 to 100 | High |
| 60 to 79 | Medium |
| 40 to 59 | Low |
| 0 to 39 | Very Low |

For Decision Debt Risk, the language is:

| Range | Band |
| --- | --- |
| 80 to 100 | Severe |
| 60 to 79 | High |
| 40 to 59 | Moderate |
| 0 to 39 | Low |

## Scoring Method

The first version of Validate should use a rubric-based scoring model.

It should not use fake mathematical precision.

For each score, Validate should:

1. Evaluate 4 to 6 dimensions.
2. Assign a rough score to each dimension.
3. Explain the most important drivers.
4. Adjust for known risks or missing evidence.
5. Present the final score as approximate.

The output should make clear that a score like 68 means:

> roughly medium attractiveness, not precisely 68.000.

## Investment Score

Investment Score measures opportunity attractiveness.

It asks:

> If this is true, how worthwhile is the investment?

### Investment Score Dimensions

| Dimension | Question |
| --- | --- |
| Customer Pain | How painful is the problem for the affected users? |
| Frequency | How often does the problem occur? |
| Business Value | Does solving this affect revenue, retention, cost, growth, or risk? |
| Strategic Fit | Does this support the product or company strategy? |
| Solution Fit | Is the proposed solution plausibly connected to the problem? |
| Effort Fit | Is the expected effort reasonable compared with the value? |

### Investment Score Rubric

High score drivers:

- Pain is severe.
- Problem happens frequently.
- A meaningful customer segment is affected.
- Business impact is clear.
- Strategic fit is strong.
- Proposed solution plausibly addresses the problem.
- Effort seems reasonable relative to value.

Low score drivers:

- Pain is mild.
- Problem is rare.
- Affected segment is small or low-value.
- Business impact is unclear.
- Strategic fit is weak.
- Proposed solution is disconnected from the problem.
- Effort seems high relative to value.

### Investment Score Guardrail

Investment Score can be medium or high even when Confidence is low.

Validate should not lower Investment Score only because evidence is weak.

Weak evidence belongs mainly in Confidence.

## Confidence

Confidence measures trust in the recommendation.

It asks:

> How much should we trust this recommendation?

### Confidence Dimensions

| Dimension | Question |
| --- | --- |
| Evidence Quality | Are the sources strong and relevant? |
| Evidence Volume | Is there enough evidence? |
| Evidence Consistency | Do multiple sources point in the same direction? |
| Evidence Freshness | Is the evidence recent enough? |
| Assumption Load | How much of the case depends on unproven assumptions? |
| Contradiction Risk | Are there unresolved contradictions? |

### Confidence Rubric

High score drivers:

- Direct customer evidence exists.
- Behavioral evidence exists.
- Business evidence exists.
- Multiple sources agree.
- Evidence is recent.
- Critical assumptions are tested.
- Few major contradictions exist.

Low score drivers:

- Evidence is mostly internal opinion.
- Evidence is secondhand.
- Only one weak source exists.
- Direct customer evidence is missing.
- Behavioral evidence is missing.
- Important assumptions are untested.
- Evidence is old, biased, or contradictory.

### Confidence Guardrail

Confidence should be capped when key evidence is missing.

Suggested caps:

- No evidence: maximum Confidence 20
- Only opinion evidence: maximum Confidence 30
- Only one weak evidence source: maximum Confidence 40
- No customer or behavioral evidence: maximum Confidence 50
- Major unresolved contradiction: maximum Confidence 60

These caps are draft guidance and should be tested against real cases.

## Decision Debt Risk

Decision Debt Risk measures the future cost of making a product investment before sufficient evidence exists.

It asks:

> What future cost are we creating if we decide now?

For the canonical definition and interpretation rules, see SPEC-005: Decision Debt Definition and RFC-007: Decision Debt Model.

### Decision Debt Risk Dimensions

| Dimension | Question |
| --- | --- |
| Engineering Effort | How expensive is the likely build? |
| Throwaway Work Risk | How likely is the work to be discarded or heavily reworked? |
| Reversibility | How easy is it to undo or change the decision later? |
| Dependency Risk | Does this create technical, operational, or organizational dependencies? |
| Opportunity Cost | What higher-value work might be delayed? |
| Evidence Gap | How weak is the evidence relative to the investment? |

SPEC-005 expands this list to include attention cost, strategy distraction, maintenance burden, trust risk, and policy or compliance review.

### Decision Debt Risk Rubric

High risk drivers:

- Build is large or complex.
- Confidence is low.
- Evidence is weak.
- Solution direction is unproven.
- Work creates platform or architecture commitments.
- Mistake would create rework, maintenance, or customer trust issues.
- Work delays more important initiatives.

Low risk drivers:

- Build is small or reversible.
- Confidence is high.
- Evidence is strong.
- Solution direction is well supported.
- Work can be tested with a narrow pilot.
- Mistake would be cheap to correct.

### Decision Debt Risk Guardrail

High Decision Debt Risk with low Confidence should block Build.

In that situation, Validate should usually recommend Validate or Pause.

## Potential

Potential measures the upside if the opportunity is real.

It asks:

> If this works, how meaningful could it become?

### Potential Dimensions

| Dimension | Question |
| --- | --- |
| Customer Impact | Could this meaningfully improve the user's workflow or outcome? |
| Business Upside | Could this affect growth, retention, revenue, cost, or risk? |
| Strategic Leverage | Could this strengthen the product's long-term position? |
| Platform Leverage | Could this unlock future capabilities? |
| Differentiation | Could this make the product meaningfully different? |
| Repeatability | Could this value apply across customers, segments, or use cases? |

### Potential Rubric

High score drivers:

- A large or valuable user segment may be affected.
- The problem connects to strategic goals.
- Solving it could create durable differentiation.
- It may unlock future products or workflows.
- The value could repeat across many customers.
- The market timing appears favorable.

Low score drivers:

- Upside is narrow.
- Value is limited to one customer or edge case.
- It does not strengthen strategic position.
- It creates little leverage for future work.
- It is easy for competitors to copy.
- It does not connect to meaningful business outcomes.

### Potential Guardrail

High Potential should not override weak evidence into Build.

High Potential with low Confidence should usually produce Validate.

## Suggested First-Pass Calculation

The first product version can calculate scores using simple averages plus guardrails.

Example:

```text
Investment Score =
average(Customer Pain, Frequency, Business Value, Strategic Fit, Solution Fit, Effort Fit)

Confidence =
average(Evidence Quality, Evidence Volume, Evidence Consistency, Evidence Freshness, Assumption Load, Contradiction Risk)
then apply confidence caps

Decision Debt Risk =
average(Engineering Effort, Throwaway Work Risk, Reversibility Risk, Dependency Risk, Opportunity Cost, Evidence Gap)

Potential =
average(Customer Impact, Business Upside, Strategic Leverage, Platform Leverage, Differentiation, Repeatability)
```

This model is intentionally simple.

It should be easy for a user to understand why a score moved.

## Applying The Model To CASE-001

CASE-001: AI Search For Enterprise Admins produced:

- Investment Score: 68
- Confidence: 34
- Decision Debt Risk: 74
- Potential: 76

Under this Investment Model, those scores can be explained as:

### Investment Score: 68

Medium attractiveness.

Drivers:

- Enterprise admins may be valuable users.
- Admin usability may affect enterprise expansion.
- The problem is plausible.
- But pain, frequency, and solution fit are not yet proven.

### Confidence: 34

Very low to low confidence.

Drivers:

- Evidence is secondhand.
- No direct customer interviews.
- No product analytics.
- No support ticket analysis.
- Several high-risk assumptions remain.

### Decision Debt Risk: 74

High risk.

Drivers:

- AI search may be expensive.
- The team may build the wrong solution if the real issue is navigation, documentation, or permissions.
- Trust and accuracy risks are meaningful in admin workflows.

### Potential: 76

Medium to high potential.

Drivers:

- If the problem is real, admin discovery could improve enterprise usability.
- It may reduce support load.
- It may support enterprise expansion.
- It may create differentiation if executed safely.

## Output Requirements

Validate should show:

- The numeric score
- The descriptive band
- The top 2 to 4 drivers
- The largest uncertainty

Example:

```text
Confidence: 34/100, Low

Why:
- Evidence is secondhand.
- No behavioral data has been reviewed.
- Direct customer interviews are missing.

Largest uncertainty:
We do not yet know whether enterprise admins experience this problem frequently.
```

## Anti-Patterns

Validate should avoid:

- Treating scores as objective truth.
- Hiding weak evidence behind a precise number.
- Averaging everything into one overall grade.
- Letting high Potential create a Build recommendation without evidence.
- Letting low Confidence automatically create a Reject recommendation.
- Making scoring too complex to explain.

## Open Questions

- Should the MVP expose dimension-level scores or only final scores?
- Should users be able to adjust score inputs manually?
- Should Validate ask follow-up questions when one score is unusually uncertain?
- Should score bands be 4 levels or 5 levels?
- Should Confidence caps be strict rules or guidance?
- Should Decision Debt Risk include estimated engineering hours once users provide them?
