# CASE-005: AI Strategy Assistant For Founders

Status: Manual Test
Date: 2026-07-05
Frameworks Tested: RFC-004 Conversation Framework, RFC-005 Decision Engine, RFC-006 Investment Model, RFC-007 Decision Debt Model, SPEC-004 Transformational Ideas Rule
Evaluator: Chief Skeptic

## Purpose

This case tests whether Validate can handle a high-potential idea with weak evidence.

Validate should not:

- Prematurely recommend Build because the idea is exciting.
- Reflexively recommend Reject because evidence is thin.
- Confuse high Potential with high Confidence.

Expected recommendation:

> Validate

Expected profile:

- High Potential
- Low to moderate Confidence
- Moderate to high Decision Debt Risk

## Starting Input

User:

> We're considering building an AI strategy assistant for startup founders.

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

What customer or user problem do you believe an AI strategy assistant solves for founders?

Assumed answer:

> Founders struggle to decide what to build, what to prioritize, and whether their product ideas are backed by enough evidence. The reasoning is scattered across docs, calls, customer notes, and metrics.

### Question 2

What evidence do you have that this problem exists?

Assumed answer:

> Mostly anecdotal evidence. We have talked with 3 founders, and we have felt this problem ourselves while building Validate. We do not have broad research yet.

### Question 3

Do you have direct customer evidence, behavioral data, paid pilots, or willingness-to-pay evidence?

Assumed answer:

> No paid pilots yet. No usage data yet. We have not tested willingness to pay. A few founders said the concept sounds useful.

### Question 4

What business or strategic goal would this support?

Assumed answer:

> It could become a core Validate product direction. If founders trust it, it could be a category-defining assistant for product judgment and investment decisions.

### Question 5

What alternatives do founders use today?

Assumed answer:

> Advisors, ChatGPT, spreadsheets, Notion docs, customer interviews, product consultants, and their own instincts. None of these create a consistent decision record.

### Question 6

Where would this fit into the founder's workflow?

Assumed answer:

> That is unclear. It might live before roadmap planning, during product discovery, or before investor or team updates. We do not know yet whether founders would use it daily, weekly, or only around major decisions.

### Question 7

What risks or concerns exist?

Assumed answer:

> The assistant could sound overconfident, give bad strategic advice, hallucinate, or encourage founders to outsource judgment. Founders may not trust AI with high-stakes strategy. Privacy could matter if they share sensitive business context.

### Question 8

What is the smallest test that would increase confidence?

Assumed answer:

> Interview 10 to 15 founders, run concierge strategy-review sessions using the current Validate framework, ask what they would pay for, and compare the output against their existing decision process.

### Question 9

What is the estimated build cost?

Assumed answer:

> A rough prototype could be moderate effort because it can start as a guided AI workflow. A trustworthy product would be harder because the reasoning, evals, memory, and decision record would need to be very good.

## Step 3: Classify Inputs

| Statement | Classification | Notes |
| --- | --- | --- |
| Founders struggle with product prioritization and investment decisions. | Hypothesis | Plausible, but not yet proven at scale. |
| Reasoning is scattered across docs, calls, notes, and metrics. | Hypothesis | Likely true for some founders, but needs validation. |
| We have talked with 3 founders. | Customer Evidence | Useful early signal, but small sample. |
| We have felt this problem ourselves. | Opinion Evidence | Strong founder intuition, but biased. |
| No paid pilots or willingness-to-pay evidence exists. | Fact | Major confidence gap. |
| The idea could become a core Validate direction. | Strategic Evidence | Strong strategic upside if true. |
| Workflow fit is unclear. | Fact | Important adoption risk. |
| The assistant could give bad advice or sound overconfident. | Risk | Trust and product judgment risk. |

## Step 4: Evidence Assessment

### Customer Evidence

Current strength: Weak

Reason:

There are only 3 founder conversations and no focused discovery study yet.

### Behavioral Evidence

Current strength: Missing

Reason:

There is no usage data, prototype behavior, retention signal, or repeated workflow evidence.

### Business Evidence

Current strength: Missing

Reason:

There is no willingness-to-pay evidence, paid pilot, conversion data, or sales signal.

### Strategic Evidence

Current strength: Strong

Reason:

If real, the opportunity could become a core Validate product direction and reinforce the mission of improving product judgment.

### Market Evidence

Current strength: Medium

Reason:

Founders already use advisors, consultants, ChatGPT, docs, and spreadsheets for strategy work, which suggests a real category of behavior. It does not yet prove this product should exist.

### Opinion Evidence

Current strength: Medium

Reason:

Founder intuition is relevant because the team is close to the problem, but it should not be treated as validation.

## Step 5: Assumptions

Major assumptions:

- Founders feel enough pain around product strategy decisions to seek a dedicated assistant.
- Founders will trust an AI assistant with high-stakes product judgment.
- The assistant can produce better reasoning than generic ChatGPT.
- The workflow will fit into an existing founder routine.
- Founders will pay for this problem to be solved.
- The product can avoid overconfidence, hallucination, and generic advice.

Highest-risk assumptions:

- Founders will use this repeatedly, not just try it once.
- Founders will pay for it.
- Validate can earn trust in a high-stakes strategic workflow.

## Step 6: Investment Model

### Investment Score: 70

Reason:

The upside is meaningful because the problem could sit close to Validate's core mission. However, the investment score should not be higher until customer demand, workflow fit, and willingness to pay are better understood.

### Confidence: 38

Reason:

Confidence is low because evidence is mostly anecdotal. There is little direct customer evidence, no behavioral evidence, and no willingness-to-pay evidence.

### Decision Debt Risk: 64

Reason:

Decision Debt Risk is moderate to high. Building too soon could create strategy distraction, generic AI product drift, trust risk, and rework if the workflow is wrong. The risk is not severe because a concierge or prototype test can reduce uncertainty before a full build.

### Potential: 88

Reason:

Potential is high because the idea could become a core Validate product direction if founders have the problem and trust the assistant.

## Step 7: Recommendation

Recommendation:

> Validate

Confidence:

> Low to moderate

## Reasoning

This idea has enough potential to deserve investigation, but not enough evidence to justify Build.

The strongest argument for the idea is strategic: it could become central to Validate. The weakest parts are customer evidence, willingness to pay, and workflow fit.

Reject would be too harsh because thin evidence is not the same as negative evidence. Build would be premature because the team does not yet know whether founders will trust, use, or pay for this kind of assistant.

## Next Best Action

Run a focused 2-week validation sprint.

The sprint should include:

- 10 to 15 founder interviews.
- 3 to 5 concierge strategy-review sessions.
- A willingness-to-pay conversation or paid pilot test.
- A comparison against founders' current workflows.
- A clear definition of what would make this worth building.

## What Would Change The Recommendation

Validate could move toward Build if:

- Multiple founders describe the problem unprompted.
- Founders bring real decisions into the workflow.
- Founders say the output is better than their current process.
- At least some founders are willing to pay or commit to a pilot.
- A narrow repeatable workflow emerges.

Validate could move toward Pause or Reject if:

- Founders find the idea interesting but do not bring real decisions.
- The assistant produces generic advice.
- Founders do not trust AI for this workflow.
- Willingness to pay is weak.
- The product overlaps too much with generic ChatGPT.

## Expected Outcome

Validate should recommend:

> Validate

It should explicitly say:

- Potential is high.
- Confidence is low to moderate.
- Evidence is weak.
- Decision Debt Risk is moderate to high.
- The next move is validation, not full product build.
