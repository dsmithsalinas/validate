# Decision Log

Status: Canonical
Version: 1.0
Last Updated: 2026-07-05

The Decision Log is Validate's memory.

Every meaningful product, architecture, positioning, or workflow decision should be recorded with evidence, confidence, assumptions, and review criteria.

| ID | Date | Decision | Type | Status | Confidence |
| --- | --- | --- | --- | --- | --- |
| D-001 | 2026-07-05 | Validate evaluates evidence, not ideas. | Principle | Canonical | 99/100 |
| D-002 | 2026-07-05 | Separate Investment Score from Confidence. | Product | Canonical | 97/100 |
| D-003 | 2026-07-05 | Validate improves product judgment, not document generation. | Product | Canonical | 98/100 |
| D-004 | 2026-07-05 | Use GitHub as Validate's canonical repository. | Architecture | Accepted | 96/100 |
| D-005 | 2026-07-05 | First audience is startup founders and small product teams. | Market | Draft | 45/100 |
| D-006 | 2026-07-05 | Build the reasoning engine before optimizing the UI. | Product Architecture | Accepted | 90/100 |
| D-007 | 2026-07-05 | Validate asks before it answers. | Conversation | Draft | 88/100 |
| D-008 | 2026-07-05 | Validate recommends the next best investment action. | Decision Engine | Draft | 84/100 |
| D-009 | 2026-07-05 | Validate keeps investment scores separate and explainable. | Investment Model | Draft | 78/100 |

## D-001: Validate Evaluates Evidence, Not Ideas

Status: Canonical

Why it matters:

This single decision differentiates Validate from document-generation AI tools. Every future feature should reinforce this principle.

Evidence:

- The strongest founding insight was the shift from PRD generation to product investment reasoning.
- Evidence-first reasoning explains why Validate asks questions, can disagree with users, and sometimes refuses to recommend building.

Assumptions:

- Users will value evidence-based challenge more than agreeable output.

What would change this decision:

- Strong evidence that the target user primarily wants artifact generation rather than decision support.

## D-002: Separate Investment Score From Confidence

Status: Canonical

Why it matters:

Opportunity attractiveness and certainty are different concepts.

An idea can have high potential and low confidence. Another can have low potential and high confidence. Validate must communicate both independently.

Evidence:

- The founding conversation repeatedly identified this as a key differentiator.
- The matrix of Investment Score and Confidence creates more honest recommendations than a single score.

Assumptions:

- Users will understand and value the distinction.

What would change this decision:

- User testing shows the distinction confuses users or reduces decision quality.

## D-003: Validate Improves Product Judgment, Not Document Generation

Status: Canonical

Why it matters:

PRDs, user stories, roadmaps, and rollout plans are outputs. Better decisions are the product.

Evidence:

- The product became stronger when it moved away from "AI PRD generator" and toward "investment reasoning engine."
- This principle helps prevent product drift.

Assumptions:

- The market has enough pain around deciding what to build, not just documenting what to build.

What would change this decision:

- Customer discovery shows the strongest value is artifact production, with decision support as a secondary need.

## D-004: Use GitHub As Canonical Repository

Status: Accepted

Why it matters:

Validate needs a durable source of truth that Codex can read, edit, version, and publish reliably.

Evidence:

- Notion was considered and tested, but the AI editing workflow was inconsistent.
- GitHub supports Markdown, version history, commits, pull requests, issues, and code.

Assumptions:

- GitHub will remain accessible from Codex.
- Markdown is sufficient for early canonical documentation.

What would change this decision:

- GitHub write workflow fails repeatedly.
- A better source-of-truth workflow becomes reliable every session.

## D-005: First Audience Is Startup Founders And Small Product Teams

Status: Draft

Why it matters:

Validate needs a focused first user.

Evidence:

- Dustin selected startup founders as the initial audience in the founding conversation.

Assumptions:

- Founders feel acute pain around whether something is worth building.
- Small teams lack experienced product leadership.

What would change this decision:

- Interviews show stronger demand from enterprise PMs, product ops teams, VCs, or internal platform teams.

## D-006: Build The Reasoning Engine Before Optimizing The UI

Status: Accepted

Why it matters:

The product is the reasoning engine. The UI is only one interface.

Evidence:

- The founding conversation established that Validate may eventually run as a web app, API, or enterprise AI skill.
- A UI-first build risks recreating Product Strategy Copilot instead of Validate.

Assumptions:

- The reasoning framework can be tested before a polished app exists.

What would change this decision:

- User testing shows the reasoning cannot be meaningfully evaluated without a more complete interface.

## D-007: Validate Asks Before It Answers

Status: Draft

Why it matters:

Validate's first interface is the conversation. If it answers too quickly, it becomes a generic AI assistant that produces product-flavored output instead of improving investment decisions.

Evidence:

- The founding framework says Validate should ask questions before recommendations.
- Dustin defined the opening question as: "What product decision are you trying to make today?"
- Dustin set the expected question range as at least 5, normally 6 to 10, and no more than 20.

Assumptions:

- Users will tolerate a questioning flow because it increases decision quality.
- Adaptive skepticism will feel useful instead of obstructive.

What would change this decision:

- User testing shows founders abandon the flow before receiving value.
- Strong evidence shows users need a faster lightweight mode before a full evaluation.

## D-008: Validate Recommends The Next Best Investment Action

Status: Draft

Why it matters:

Validate should not simply score ideas or produce documents. It must turn evidence and reasoning into a clear recommendation: Build, Validate, Pause, or Reject.

Evidence:

- RFC-003 defines the four recommendation outcomes.
- RFC-004 defines when Validate should stop asking questions and recommend.
- The founding philosophy frames engineering time as an investment decision.

Assumptions:

- The four recommendation outcomes are expressive enough for early users.
- Users will understand that Validate is not a soft yes and Pause is not the same as Reject.
- Numeric scores will improve clarity instead of creating false precision.

What would change this decision:

- Manual test cases require additional recommendation types.
- Users misunderstand score-based recommendations or over-trust the numbers.
- The MVP needs descriptive ratings before numeric scoring.

## D-009: Validate Keeps Investment Scores Separate And Explainable

Status: Draft

Why it matters:

Validate's scores should clarify judgment without pretending to be more precise than the evidence allows. Investment Score, Confidence, Decision Debt Risk, and Potential must remain separate because they answer different questions.

Evidence:

- RFC-005 established four independent scores.
- CASE-001 showed the recommendation was useful but score values still felt judgment-based.
- The founding philosophy requires uncertainty to be visible rather than hidden.

Assumptions:

- A rubric-based scoring model will be easier to trust than opaque math.
- Users will understand separate scores if each score includes plain-language drivers.
- Numeric scores plus descriptive bands will be clearer than either format alone.

What would change this decision:

- User testing shows numeric scores create false precision.
- Manual cases show the model needs fewer or different scoring dimensions.
- Users prefer qualitative ratings until the scoring model is better validated.
