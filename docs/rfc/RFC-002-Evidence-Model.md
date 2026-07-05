# RFC-002: Evidence Model

Status: Canonical
Version: 1.0
Owner: Dustin, Founder
Reviewer: Chief Skeptic
Last Updated: 2026-07-05
Confidence: 94/100

## Purpose

Validate does not evaluate ideas.

Validate evaluates the evidence behind ideas.

Every recommendation should be traceable back to evidence. When evidence is insufficient, conflicting, stale, or missing, Validate should acknowledge those limits before making a recommendation.

## Core Principle

Evidence is the currency of product decisions.

The quality of a recommendation can never exceed the quality of the evidence supporting it.

## Evidence Categories

### Customer Evidence

Purpose: determine whether a meaningful customer problem exists.

Examples:

- Customer interviews
- User research
- Customer surveys
- Support tickets
- Feature requests
- Customer advisory boards
- Churn interviews
- Win/loss interviews
- Usability testing

Questions answered:

- Is this a real customer problem?
- Who experiences it?
- How painful is it?
- How frequently does it occur?

Weight: Highest

### Behavioral Evidence

Purpose: understand what customers actually do.

Examples:

- Product analytics
- Usage metrics
- Funnel analysis
- Feature adoption
- Session recordings
- Search behavior
- Retention metrics
- Churn metrics

Questions answered:

- What are users actually doing?
- Is behavior consistent with what users say?
- Is the problem frequent enough to matter?

Weight: Highest

### Business Evidence

Purpose: understand commercial value.

Examples:

- Revenue impact
- Sales notes
- Lost deals
- Expansion opportunities
- Customer success notes
- Pricing feedback
- Cost savings
- Operational metrics

Questions answered:

- Is solving this commercially valuable?
- Does this affect revenue, retention, cost, or growth?
- Does the investment make business sense?

Weight: High

### Strategic Evidence

Purpose: evaluate fit with the company's direction.

Examples:

- Company goals
- Leadership priorities
- Existing roadmap
- Product vision
- Platform strategy
- Competitive positioning

Questions answered:

- Does this support the strategy?
- Does this distract from higher-priority work?
- Is this the right time?

Weight: Medium to High

### Market Evidence

Purpose: understand the broader market context.

Examples:

- Competitor research
- Analyst reports
- Category trends
- Market size estimates
- Public benchmarks
- Regulatory shifts

Questions answered:

- Is the market moving in this direction?
- Is the opportunity growing or shrinking?
- Does timing matter?

Weight: Medium

### Opinion Evidence

Purpose: capture beliefs, instincts, and experience without confusing them for proof.

Examples:

- Founder intuition
- PM judgment
- Executive belief
- Sales team belief
- Customer-facing team anecdotes

Questions answered:

- What do people believe?
- What assumptions are driving the decision?
- What should be tested?

Weight: Low unless supported by stronger evidence.

## Evidence Quality Dimensions

Each evidence item should be evaluated by:

- Source quality
- Volume
- Consistency
- Freshness
- Relevance
- Bias risk

## Classification

Every important statement should be classified as one of:

- Fact
- Evidence
- Assumption
- Opinion
- Hypothesis

This classification is part of the product experience. It helps users see where their reasoning is strong and where it depends on belief.

## Refusal Rules

Validate should refuse or withhold a firm recommendation when:

- No evidence exists.
- Only one weak evidence source exists.
- The user attempts to push Validate toward a predetermined answer.
- Critical context is missing.
- The evidence is too contradictory to support a responsible conclusion.

In those cases, Validate should recommend the next evidence-gathering step instead of pretending certainty exists.

