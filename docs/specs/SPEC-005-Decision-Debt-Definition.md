# SPEC-005: Decision Debt Definition

Status: Draft
Version: 0.1
Owner: Dustin, Founder
Reviewer: Chief Skeptic
Last Updated: 2026-07-05
Confidence: 80/100

## Purpose

This spec defines Decision Debt for Validate.

Decision Debt is one of Validate's core concepts because product teams rarely pay only the cost of building.

They also pay the future cost of deciding too early, building the wrong thing, distracting the team, and making later decisions harder.

## Plain-English Definition

Decision Debt is the future cost created when a team makes a product investment decision before the evidence is strong enough.

Short version:

> Decision Debt is what you may have to pay later because you decided too soon.

## Product Definition

Decision Debt Risk measures the cost, friction, and future consequences of acting on a product decision with the current level of evidence.

It asks:

> If we make this decision now and we are wrong, how expensive will that mistake become?

## Why It Matters

Most teams think about build cost.

Validate also considers decision cost.

A feature can look small but still create meaningful Decision Debt if it:

- Distracts the team from more important work.
- Creates customer expectations.
- Requires policy, legal, security, or compliance review.
- Adds maintenance burden.
- Pushes the product in the wrong strategic direction.
- Makes future product decisions harder.

## What Decision Debt Is Not

Decision Debt is not:

- The same thing as engineering effort.
- The same thing as technical debt.
- A reason to avoid all risk.
- A punishment for ambitious ideas.
- A precise financial calculation.
- A replacement for human judgment.

Engineering effort is one input.

Decision Debt is broader.

## Relationship To Technical Debt

Technical debt is the future cost of technical choices.

Decision Debt is the future cost of product investment choices.

Example:

- Technical debt: "We built this with a shortcut that will be hard to maintain."
- Decision debt: "We built the wrong feature before we knew whether customers needed it."

Some decisions create both.

## Decision Debt Sources

Validate should consider these sources when estimating Decision Debt Risk.

| Source | Question |
| --- | --- |
| Engineering Effort | How expensive is the likely build? |
| Throwaway Work Risk | How likely is the work to be discarded or heavily reworked? |
| Reversibility | How easy is it to undo the decision later? |
| Dependency Risk | Does this create technical, operational, organizational, or customer dependencies? |
| Maintenance Burden | Will this create ongoing support, QA, design, or operational work? |
| Opportunity Cost | What better work may be delayed? |
| Attention Cost | How much leadership, product, design, or planning attention will this consume? |
| Strategy Distraction | Does this pull the product away from the intended direction? |
| Trust Risk | Could a wrong decision reduce customer, team, or stakeholder trust? |
| Evidence Gap | How weak is the evidence relative to the investment? |

## Score Bands

Decision Debt Risk uses a 0 to 100 scale.

| Range | Band | Meaning |
| --- | --- | --- |
| 0 to 39 | Low | Mistake would likely be cheap, reversible, or contained. |
| 40 to 59 | Moderate | Mistake would create some rework, distraction, or opportunity cost. |
| 60 to 79 | High | Mistake would likely create meaningful rework, distraction, trust risk, or strategic cost. |
| 80 to 100 | Severe | Mistake could create major lock-in, wasted investment, customer trust damage, or strategic damage. |

## Scoring Method

Validate should score Decision Debt Risk with a rubric, not fake precision.

For V0, use these six primary dimensions:

| Dimension | Low Risk | High Risk |
| --- | --- | --- |
| Effort | Small, cheap, reversible | Large, expensive, cross-functional |
| Rework Risk | Easy to throw away | Likely to require major rework |
| Reversibility | Easy to undo | Hard to undo once shipped |
| Dependencies | Few dependencies | Creates technical, customer, or organizational dependencies |
| Opportunity Cost | Does not delay more important work | Pulls time from higher-value work |
| Evidence Gap | Evidence is strong enough for the investment | Evidence is weak relative to the investment |

Then adjust for:

- Attention cost
- Strategy distraction
- Maintenance burden
- Trust risk
- Legal, security, policy, or compliance review

## Interpretation Rules

### Low Decision Debt Risk

Low risk means the team can probably learn by doing without creating much future cost.

This does not automatically mean Build.

It only means the downside of being wrong is contained.

### Moderate Decision Debt Risk

Moderate risk means the decision has real cost, but the cost may be acceptable if Investment Score, Potential, or Confidence is strong enough.

Validate should explain what creates the risk.

### High Decision Debt Risk

High risk means the team should be careful about building before confidence improves.

If Confidence is low and Decision Debt Risk is high, Validate should usually recommend Validate or Pause.

### Severe Decision Debt Risk

Severe risk means a wrong decision could cause major waste, lock-in, trust damage, or strategic drift.

Validate should not recommend Build unless evidence is unusually strong and the upside justifies the risk.

## Recommendation Impact

Decision Debt Risk should influence recommendations this way:

| Situation | Likely Recommendation |
| --- | --- |
| High Confidence, High Investment Score, Low Decision Debt | Build may be justified. |
| Low Confidence, High Potential, High Decision Debt | Validate before building. |
| Low Confidence, Unclear Strategy, High Decision Debt | Pause. |
| Low Investment Score, Medium or High Confidence, High Decision Debt | Reject. |
| Low Decision Debt, Medium Potential, Low Confidence | A small validation test may be enough. |

## Examples

### Low Decision Debt

Example:

> Add a small onboarding copy experiment that can be removed in one release.

Why:

- Low engineering effort.
- Easy to reverse.
- Low customer trust risk.
- Limited opportunity cost.

### Moderate Decision Debt

Example:

> Build a limited dashboard view for a small customer segment.

Why:

- Some engineering and design effort.
- Some maintenance burden.
- Reversible if scoped carefully.
- Risk depends on whether customers rely on it.

### High Decision Debt

Example:

> Build AI search across enterprise admin data without knowing whether search is the actual customer problem.

Why:

- Large engineering effort.
- Data quality and trust risk.
- Integration complexity.
- High rework risk if the real problem is navigation or permissions.

### Severe Decision Debt

Example:

> Re-architect the product around a new enterprise workflow based mostly on one prospect request.

Why:

- Major strategic lock-in.
- High opportunity cost.
- Large engineering and migration effort.
- Weak evidence relative to the investment.
- Hard to undo once customers adopt it.

## How Validate Should Explain It

Validate should explain Decision Debt in plain language.

Good:

> Decision Debt Risk is high because building now would require meaningful engineering work before we know whether the real problem is search, navigation, permissions, or documentation. If that assumption is wrong, the team may throw away work or delay more valuable enterprise improvements.

Bad:

> Decision Debt is 74 because the debt matrix says so.

Why the bad version fails:

- It hides the reasoning.
- It sounds falsely mathematical.
- It does not help the user make a better decision.

## Relationship To Transformational Ideas

High Potential can justify learning.

It does not erase Decision Debt.

For transformational ideas with thin evidence, Validate should usually say:

> Potential may be high, but Decision Debt Risk is also high. Learn cheaply before building heavily.

## Relationship To Learning Loop

Decision Debt should shape the next best action.

Examples:

- If Decision Debt is high, recommend a cheaper learning step.
- If Decision Debt is low, a small build or pilot may be acceptable.
- If Decision Debt is severe, require stronger evidence before implementation.

## Anti-Patterns

Validate should avoid:

- Treating any expensive build as bad.
- Treating any small build as safe.
- Ignoring attention cost.
- Ignoring strategic distraction.
- Using Decision Debt as a fancy way to say "I dislike this idea."
- Letting high Potential cancel out weak evidence.
- Presenting Decision Debt as more precise than the evidence supports.

## Open Questions

- Should attention cost become a formal scoring dimension?
- Should strategy distraction become a formal scoring dimension?
- Should Decision Debt Risk include estimated engineering hours when available?
- Should Validate ask users to estimate reversibility directly?
- How should Decision Debt change after a feature ships and real data appears?
