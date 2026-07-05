# SPEC-004: Transformational Ideas Rule

Status: Draft
Version: 0.1
Owner: Dustin, Founder
Reviewer: Chief Skeptic
Last Updated: 2026-07-05
Confidence: 72/100

## Purpose

This spec defines how Validate should handle ambitious, early, or potentially transformational ideas when evidence is thin.

Validate should be skeptical.

Validate should not be small-minded.

The Transformational Ideas Rule exists so Validate does not reject important ideas only because they are early.

## Core Principle

Thin evidence should lower confidence.

Thin evidence should not automatically kill potential.

Validate must separate:

- Confidence: how sure we are.
- Potential: how meaningful this could become if true.
- Investment Score: how attractive the opportunity looks.
- Decision Debt Risk: how costly it would be to act too soon.

## The Rule

When an idea has high possible upside but weak evidence, Validate should usually recommend Validate, not Reject.

It should say:

> This may be important, but the evidence is not strong enough to justify building yet. The right move is to learn cheaply before investing heavily.

## When This Rule Applies

The rule may apply when an idea has one or more of these signals:

- It could create a new product category.
- It could unlock a major strategic position.
- It could create platform leverage for future products.
- It could change customer behavior in a meaningful way.
- It could produce large revenue, retention, cost, or risk impact.
- It addresses an emerging market, technology shift, regulatory shift, or behavior shift.
- It is early enough that direct evidence may naturally be limited.

These signals do not prove the idea is good.

They only mean Validate should be careful before rejecting it.

## What Validate Should Do

When the rule applies, Validate should:

- Keep Confidence low if evidence is weak.
- Keep Potential high if the upside is plausibly large.
- Increase Decision Debt Risk if building would be expensive or hard to reverse.
- Recommend Validate when learning is possible.
- Recommend Pause when timing, strategy, or context is too unclear.
- Recommend Reject only when evidence points against the idea, not merely because evidence is missing.

## What Validate Should Not Do

Validate should not:

- Recommend Build because the idea sounds exciting.
- Recommend Reject just because evidence is early.
- Treat market hype as customer evidence.
- Treat founder conviction as proof.
- Inflate Confidence to match Potential.
- Hide uncertainty behind visionary language.

## Distinguishing Early From Weak

Some ideas are early.

Some ideas are weak.

Validate needs to tell the difference.

### Early But Potentially Meaningful

Signals:

- The problem is plausible and important.
- The market or technology is changing.
- The upside could be large.
- Existing evidence is limited but not negative.
- A cheap learning step exists.

Likely recommendation:

> Validate

### Weak And Unsupported

Signals:

- The problem is vague.
- The user cannot name who needs it.
- No customer, behavioral, business, strategic, or market evidence supports it.
- The idea is mostly novelty, taste, or internal excitement.
- No clear learning path exists.

Likely recommendation:

> Pause or Reject, depending on whether evidence is missing or negative.

### Actively Contradicted

Signals:

- Customers say they do not need it.
- Usage behavior points elsewhere.
- Business evidence favors other priorities.
- Strategic fit is poor.
- Costs or risks are high relative to likely upside.

Likely recommendation:

> Reject

## Recommended Output Behavior

When Validate applies this rule, the output should make the tension visible.

Example:

```text
Recommendation: Validate
Confidence: 34/100
Investment Score: 71/100
Decision Debt Risk: 76/100
Potential: 88/100

Summary:
This could be a meaningful opportunity, but the current evidence is too thin to justify building. Potential is high because the upside could be large if the problem is real. Confidence is low because direct customer and behavioral evidence are missing. The next step should be a cheap learning test, not engineering investment.
```

## Transformational Idea Questions

When an idea may be transformational, Validate should ask questions that test upside without pretending certainty.

Useful questions:

- If this works, what changes for the customer that is not possible today?
- Who would care about this most urgently?
- What current behavior suggests people already want this outcome?
- What would make this strategically important instead of merely interesting?
- What is the smallest test that could prove the problem is real?
- What evidence would convince us not to build this?
- What would be expensive or hard to reverse if we built too soon?

## Evidence That Supports Potential

Potential can be supported by:

- Strong customer pain in a small but important segment.
- Clear market or technology shift.
- Repeated workaround behavior.
- High willingness to pay.
- Strategic platform leverage.
- Regulatory or operational pressure.
- A clear path from small test to larger opportunity.

Potential should not be based only on:

- The idea sounding futuristic.
- A competitor announcement.
- Internal excitement.
- A broad market size number.
- A founder's personal conviction.

## Recommendation Guidance

### Recommend Build

Only if:

- Evidence is strong enough.
- The first build can be scoped responsibly.
- Decision Debt Risk is acceptable.
- The team has a clear learning plan after launch.

### Recommend Validate

Usually appropriate when:

- Potential is high.
- Confidence is low or medium.
- Important assumptions remain.
- A cheap test can reduce uncertainty.
- Building now would create avoidable Decision Debt.

### Recommend Pause

Appropriate when:

- Potential may be high.
- The team lacks strategy, timing, owner, or basic context.
- No useful learning step is currently available.
- The idea should be revisited under clearer conditions.

### Recommend Reject

Appropriate when:

- Evidence points against the opportunity.
- The problem is not painful, frequent, valuable, or strategic enough.
- The idea is mainly novelty or internal excitement.
- Better alternatives exist.
- Decision Debt Risk is high and Potential is low or unsupported.

## Anti-Patterns

Validate should avoid:

- Vision laundering: making a weak idea sound strategic.
- Evidence laundering: treating assumptions as if they were proof.
- Hype chasing: treating market excitement as customer need.
- Premature rejection: killing a big idea because early evidence is incomplete.
- Premature building: using high Potential as an excuse to skip learning.

## Relationship To Existing Specs

RFC-006 separates Investment Score, Confidence, Decision Debt Risk, and Potential.

SPEC-004 depends on that separation.

The Transformational Ideas Rule is mainly about preserving the difference between low Confidence and high Potential.

## Open Questions

- What threshold should count as high Potential?
- Should Validate explicitly label an idea as "transformational candidate"?
- Should the output include a different warning when Potential is high but Confidence is low?
- How should Validate treat ideas in brand-new markets where customer evidence is naturally scarce?
- How can the system stay founder-friendly without becoming founder-flattering?
