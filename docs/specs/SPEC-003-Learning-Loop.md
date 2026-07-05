# SPEC-003: Learning Loop

Status: Draft
Version: 0.1
Owner: Dustin, Founder
Reviewer: Chief Skeptic
Last Updated: 2026-07-05
Confidence: 78/100

## Purpose

This spec defines what Validate recommends after it gives a decision.

Validate should not stop at Build, Validate, Pause, or Reject.

Each recommendation should point to a learning action that improves the next decision.

The Learning Loop turns Validate from a one-time opinion engine into a product judgment system.

## Core Principle

Every recommendation should create a better next decision.

Validate should help the user understand:

- What to do now.
- What to learn next.
- What evidence would change the decision.
- When to revisit the decision.

## The Loop

Validate's full loop is:

Question -> Evidence -> Reasoning -> Investment Analysis -> Recommendation -> Learning -> Re-evaluation

Learning is not a separate product mode.

Learning is the natural next step after every recommendation.

## Learning By Recommendation

Each recommendation has a different learning goal.

| Recommendation | Learning Goal |
| --- | --- |
| Build | Learn whether the investment works in the real world. |
| Validate | Learn whether the opportunity deserves investment. |
| Pause | Learn what condition would make the decision worth reopening. |
| Reject | Learn only if new evidence appears that challenges the rejection. |

## Build Learning Loop

Build means the evidence is strong enough to justify implementation.

It does not mean the team should stop learning.

### Goal

Confirm that the investment delivers the expected customer, business, or strategic outcome.

### Recommended Learning Actions

- Define the smallest responsible build.
- Identify the expected behavior or business outcome before building.
- Run a pilot, staged rollout, beta, or limited release when possible.
- Track whether the actual result matches the reasoning.
- Capture surprises, adoption issues, and customer feedback.

### Build Next Best Action Examples

- "Scope a 2-week pilot with three design partners before a full rollout."
- "Define the activation metric this feature should improve before engineering begins."
- "Release to one customer segment first and review usage after 30 days."

### Build Re-evaluation Trigger

Revisit the decision when:

- The pilot fails to produce the expected signal.
- Usage is materially lower than expected.
- Customers use the feature differently than assumed.
- Build cost or complexity is higher than expected.
- New evidence contradicts the original case.

## Validate Learning Loop

Validate means the opportunity may be meaningful, but the evidence is not strong enough to justify building yet.

### Goal

Reduce the biggest uncertainty before committing engineering time.

### Recommended Learning Actions

- Identify the highest-risk assumption.
- Choose the smallest useful evidence-gathering step.
- Prefer direct customer, behavioral, or business evidence.
- Set a clear evidence threshold before learning begins.
- Re-evaluate after the evidence is collected.

### Validate Next Best Action Examples

- "Interview 5 target customers and ask them to describe the problem in their own words."
- "Review the last 90 days of support tickets for repeated evidence of this pain."
- "Run a concierge test with two design partners before building product infrastructure."
- "Prototype the workflow and measure whether users can complete the task faster."

### Validate Re-evaluation Trigger

Revisit the decision when:

- The learning step is complete.
- Evidence confirms or weakens the core assumption.
- Customer evidence and business evidence disagree.
- The user discovers the problem is real but the proposed solution is wrong.

## Pause Learning Loop

Pause means the decision should not be made now.

The problem may still matter, but timing, strategy, ownership, or context is not ready.

### Goal

Define the condition that would make the decision worth reopening.

### Recommended Learning Actions

- Name what is unresolved.
- Define a revisit condition.
- Assign a time-based or evidence-based checkpoint.
- Avoid passive limbo.
- Keep the decision visible without treating it as active work.

### Pause Next Best Action Examples

- "Revisit this after onboarding reliability ships and the team has 30 days of usage data."
- "Pause until the company decides whether enterprise admins are the target segment."
- "Reopen this if three target customers mention the problem during Q3 interviews."

### Pause Re-evaluation Trigger

Revisit the decision when:

- Strategy changes.
- Timing changes.
- Ownership becomes clear.
- Required data becomes available.
- Customers raise the problem again.

## Reject Learning Loop

Reject means the available evidence points against investment.

Reject should protect focus, not punish ideas.

### Goal

Record the reason for rejection and avoid spending more attention unless meaningful new evidence appears.

### Recommended Learning Actions

- Record the decision and the evidence behind it.
- Name what evidence would reopen the decision.
- Redirect attention to higher-value work.
- Avoid repeated re-litigation without new evidence.
- Leave room for revision if the world changes.

### Reject Next Best Action Examples

- "Record the decision and redirect planning time toward the higher-priority onboarding work."
- "Do not schedule discovery unless multiple target customers independently raise this problem."
- "Revisit only if the feature becomes tied to retention, revenue, risk reduction, or a strategic shift."

### Reject Re-evaluation Trigger

Revisit the decision when:

- Multiple target customers independently ask for the capability.
- A strategic shift makes the opportunity newly relevant.
- New behavioral or business evidence appears.
- The cost of testing drops dramatically.
- A competitor or market change creates new urgency.

## Evidence Thresholds

Every learning action should define what outcome would change the decision.

Examples:

- Move from Validate to Build if 5 to 7 target customers describe the same painful problem and connect it to a business outcome.
- Move from Pause to Validate if the strategy becomes clear and the team can run a low-cost learning test.
- Move from Reject to Validate if new customer evidence contradicts the original rejection.
- Keep Reject if new evidence is still mostly internal opinion.

## Anti-Patterns

Validate should avoid:

- Turning every recommendation into more research.
- Treating Build as the end of learning.
- Treating Pause as a hidden backlog.
- Treating Reject as permanent truth.
- Recommending vague actions like "do more research."
- Creating large learning plans when one small test would do.

## Relationship To SPEC-002

SPEC-002 requires a "Next Best Action" and "What Would Change This Recommendation" section.

SPEC-003 defines how those sections should behave after each recommendation type.

## Open Questions

- Should Validate save previous recommendations and compare them during re-evaluation?
- Should V0 include revisit dates, or is that a V1 workflow?
- Should learning actions be generated as checklists?
- How specific should evidence thresholds be before user testing?
- Should Reject decisions have an explicit cooldown period before reopening?
