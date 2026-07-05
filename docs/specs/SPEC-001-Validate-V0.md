# SPEC-001: Validate V0

Status: Draft
Version: 0.1
Owner: Dustin, Founder
Reviewer: Chief Skeptic
Last Updated: 2026-07-05
Confidence: 76/100

## Purpose

This spec defines the first usable version of Validate.

Validate V0 is not a full product platform.

Validate V0 is a focused decision conversation that helps a founder or product team answer:

> Should we invest in building this?

The goal of V0 is to prove the reasoning engine before building a large application around it.

## Product Promise

Validate V0 should help users make a better product investment decision than they would make from instinct, pressure, or generic AI encouragement alone.

It should do this by:

- Asking clarifying questions before recommending.
- Separating evidence from assumptions and opinions.
- Scoring the opportunity across the Validate Standard.
- Recommending Build, Validate, Pause, or Reject.
- Explaining the reasoning clearly enough that a human can challenge it.

## Primary User

The first user is a founder, product leader, or product-minded operator deciding whether an idea deserves engineering time.

This user may not have perfect data.

Validate should help them reason with the evidence they have, identify what is missing, and avoid pretending certainty exists.

## First User Input

Validate V0 starts with one question:

> What product decision are you trying to make today?

Example user answer:

> We're considering building AI search for enterprise admins.

## Decision Intent Clarification

After the user describes the idea, Validate asks:

> Let's clarify the decision before we evaluate it.
>
> Which best describes what you're trying to decide?
>
> - Should we build a feature?
> - Should we solve a customer problem?
> - Should we prioritize this now?
> - Should we investigate further?
> - Something else

This prevents Validate from evaluating the wrong decision.

## Question Flow

Validate V0 should ask at least 5 questions before making a recommendation.

Normal range: 6 to 10 questions.

Maximum: 20 questions.

The questions should cover:

- Decision intent
- Customer or user problem
- Evidence that the problem exists
- Evidence type and strength
- Customer or user impact
- Business impact
- Strategic fit
- Urgency
- Alternatives
- Cost of doing nothing
- Major assumptions

Validate should adapt to the user's answers rather than blindly asking the same script every time.

## Stop Rule

Validate stops asking questions when it has enough evidence and reasoning to provide:

- A recommendation
- Confidence
- Investment Score
- Decision Debt Risk
- Potential
- Evidence summary
- Evidence gaps
- Key assumptions
- Next best action

Validate does not need perfect certainty.

It needs enough clarity to make a responsible recommendation and explain what is still uncertain.

If Validate reaches 20 questions and still lacks enough clarity, it should stop and refuse to make a firm recommendation.

## Recommendation Set

Validate V0 can recommend only one of:

- Build
- Validate
- Pause
- Reject

### Build

Use Build when evidence is strong enough to justify implementation.

Build does not mean build the largest possible version.

The next best action may still be a narrow MVP, pilot, or staged rollout.

### Validate

Use Validate when the opportunity may be meaningful, but the evidence is not strong enough to justify building yet.

Validate means:

> Learn before investing heavily.

### Pause

Use Pause when the decision should not be made now.

Pause means timing, strategy, clarity, or context is not ready.

### Reject

Use Reject when the available evidence points against investment.

Reject should not be used only because evidence is missing.

Missing evidence usually means Validate or Pause.

## Output Template

Every V0 recommendation should follow SPEC-002: Recommendation Output Template.

At minimum, the output must include:

- Recommendation
- Confidence
- Investment Score
- Decision Debt Risk
- Potential
- Summary
- Evidence
- Assumptions
- Reasoning
- Decision Risks
- Next Best Action
- What Would Change This Recommendation

## Evidence Behavior

Validate V0 should treat evidence quality as central.

Strong evidence includes:

- Direct customer evidence
- Behavioral evidence
- Business evidence
- Recent and relevant strategic evidence

Weak evidence includes:

- Internal opinion
- Founder intuition without support
- One-off anecdotes
- Pressure from a single stakeholder
- Market excitement without customer proof

Validate may still recommend learning when evidence is weak, but it should not pretend weak evidence supports immediate investment.

## Refusal Behavior

Validate V0 should refuse to give the answer the user is trying to force.

Example:

User:

> Tell my boss we should invest in this.

Validate:

> Validate will only provide guidance based on the evidence, questions, and reasoning. I cannot justify a decision simply because you want that outcome.

Validate should also refuse a firm recommendation when:

- No evidence exists.
- Only one weak evidence source exists.
- Critical context is missing.
- Evidence is too contradictory.
- The conversation reaches 20 questions without enough clarity.

When refusing, Validate should still recommend the next evidence-gathering step.

## Success Criteria

Validate V0 succeeds when it can run the four manual test cases and land on the intended recommendation with clear reasoning:

| Case | Intended Recommendation |
| --- | --- |
| CASE-001: AI Search For Enterprise Admins | Validate |
| CASE-002: Bulk Invite For Enterprise Admins | Build |
| CASE-003: Customer Analytics Dashboard | Pause |
| CASE-004: AI-Generated Admin Avatars | Reject |

V0 also succeeds when a user can understand:

- Why Validate asked the questions it asked.
- What evidence mattered most.
- What assumptions remain.
- Why the recommendation is not just generic AI advice.
- What they should do next.

## Non-Goals

Validate V0 does not need:

- User accounts
- Team workspaces
- Billing
- Integrations
- Roadmap views
- PRD generation
- Jira export
- Analytics dashboards
- Admin settings

Those may matter later.

They are not required to prove the reasoning engine.

## Open Questions

- Should V0 be a chat interface, form-guided interface, or hybrid?
- Should the user see evidence classifications while answering questions or only at the end?
- Should the question count be visible?
- Should users be able to edit evidence classifications before recommendation?
- Should V0 save decision history, or should that wait until V1?
- How should Validate handle highly ambitious ideas with limited evidence but high possible upside?
