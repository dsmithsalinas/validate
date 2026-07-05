# SPEC-002: Recommendation Output Template

Status: Draft
Version: 0.1
Owner: Dustin, Founder
Reviewer: Chief Skeptic
Last Updated: 2026-07-05
Confidence: 82/100

## Purpose

This spec defines the standard output Validate should produce after it has asked enough questions to make a responsible recommendation.

The output template matters because Validate should feel consistent, transparent, and trustworthy every time.

The user should always be able to answer:

- What is Validate recommending?
- How confident is it?
- What evidence mattered?
- What assumptions remain?
- What should I do next?

## Core Principle

The recommendation is not a polished argument.

The recommendation is a transparent product investment judgment.

Validate should explain the reasoning clearly enough that the user can inspect it, challenge it, or improve it with better evidence.

## Required Output Structure

Every recommendation should include these sections in this order:

1. Recommendation Snapshot
2. Summary
3. Scorecard
4. Evidence
5. Assumptions
6. Reasoning
7. Decision Risks
8. Next Best Action
9. What Would Change This Recommendation

## 1. Recommendation Snapshot

The snapshot gives the user the decision quickly.

Format:

```text
Recommendation: Build | Validate | Pause | Reject
Confidence: 0-100
Investment Score: 0-100
Decision Debt Risk: 0-100
Potential: 0-100
```

Guidelines:

- Use only one recommendation.
- Do not hedge with two recommendations.
- Scores should be approximate, not falsely precise.
- If confidence is low, say so clearly.
- If Validate cannot make a firm recommendation, use the refusal output instead.

## 2. Summary

The summary is one plain-language paragraph explaining the recommendation.

It should answer:

- What is the decision?
- Why is Validate recommending this?
- How strong is the evidence?

Good summary:

> Recommend Validate. The opportunity may be meaningful, but the current evidence is mostly internal belief and not yet strong enough to justify engineering investment. The next step should be targeted learning with customers before committing build time.

Bad summary:

> This is an exciting opportunity that could transform the product experience.

Why the bad version fails:

- It sounds supportive without proving anything.
- It does not explain evidence strength.
- It does not connect to an investment decision.

## 3. Scorecard

The scorecard explains each score in simple terms.

Format:

| Score | Value | Meaning | Main Driver |
| --- | --- | --- | --- |
| Investment Score | 0-100 | Very Low / Low / Medium / High | Short reason |
| Confidence | 0-100 | Very Low / Low / Medium / High | Short reason |
| Decision Debt Risk | 0-100 | Low / Moderate / High / Severe | Short reason |
| Potential | 0-100 | Very Low / Low / Medium / High | Short reason |

Guidelines:

- Never present scores without explanation.
- Do not average scores into one overall grade.
- Preserve tension between scores.
- A high Potential score with low Confidence should usually point toward Validate, not Build.
- A low Investment Score with high Confidence may point toward Reject.

## 4. Evidence

The evidence section shows what Validate used to reason.

It should include:

### Strongest Evidence

The best evidence supporting the recommendation.

Examples:

- Multiple customers reported the same pain.
- Usage data shows repeated friction.
- Sales feedback connects the problem to lost deals.
- Support tickets show recurring operational cost.

### Weakest Or Missing Evidence

The evidence that is absent, weak, stale, biased, or incomplete.

Examples:

- No direct customer interviews.
- No behavioral data.
- Only internal opinion.
- Evidence comes from one customer.
- Evidence is old or from a different market.

### Contradictions

Any tension in the evidence.

Examples:

- Customers say the problem matters, but usage data does not show frequent behavior.
- Sales wants the feature, but support data points to a different issue.
- The opportunity is strategically attractive, but the current solution is weak.

Guidelines:

- Separate evidence from assumptions.
- Do not invent evidence.
- Do not bury weak evidence.
- If evidence is weak, say that directly.

## 5. Assumptions

The assumptions section names what must be true for the recommendation to hold.

It should include:

### Major Assumptions

These are important beliefs that affect the recommendation.

Examples:

- Enterprise admins experience this problem frequently.
- The proposed solution actually addresses the problem.
- The affected customer segment is valuable enough to prioritize.

### Highest-Risk Assumptions

These are the assumptions that could most easily change the recommendation if proven false.

Examples:

- Customers will trust AI-generated answers.
- The data needed for the feature is available and reliable.
- The feature can be built without major integration complexity.

Guidelines:

- Keep assumptions visible.
- Do not treat assumptions as evidence.
- Prioritize the assumptions that would most change the decision.

## 6. Reasoning

The reasoning section explains how Validate moved from evidence to recommendation.

It should answer:

- Why this recommendation instead of the other three?
- What evidence carried the most weight?
- How did uncertainty affect the decision?
- How did Decision Debt Risk affect the decision?
- How did Potential affect the decision?

Guidelines:

- Be direct.
- Avoid persuasive fluff.
- Show tradeoffs.
- Explain uncertainty.
- Make the recommendation auditable.

## 7. Decision Risks

The decision risks section explains what could go wrong if the user follows the recommendation.

Examples by recommendation:

### Build Risks

- The team may overbuild beyond the supported evidence.
- The evidence may support the problem but not the exact solution.
- The rollout may create adoption or trust issues.

### Validate Risks

- The team may treat validation as delay instead of learning.
- The test may be too small or too vague.
- The team may ignore negative evidence.

### Pause Risks

- The opportunity may lose timing advantage.
- Ownership may become unclear.
- The decision may be forgotten instead of intentionally revisited.

### Reject Risks

- The team may dismiss a weak signal that later becomes important.
- New evidence may emerge after the decision.
- The rejection may discourage useful future learning if communicated poorly.

## 8. Next Best Action

The next best action is the single most useful thing the user should do next.

It should be specific, concrete, and proportional to the recommendation.

Examples:

- Build: "Scope a 2-week pilot with three design partners before full rollout."
- Validate: "Interview 5 enterprise admins and review the last 90 days of related support tickets."
- Pause: "Revisit this decision after the onboarding reliability work ships and usage data is available."
- Reject: "Record the decision and redirect planning time toward the higher-priority onboarding work."

Guidelines:

- Give one primary next step.
- Avoid vague advice like "do more research."
- Match the next step to the evidence gap.
- Do not turn every recommendation into a large project.

## 9. What Would Change This Recommendation

This section keeps Validate open to revision.

It should explain what new evidence would make the recommendation stronger, weaker, or different.

Examples:

- "This could move from Validate to Build if 5 to 7 target customers describe the same problem and connect it to adoption, retention, or revenue."
- "This could move from Pause to Validate if the strategy becomes clearer and the team identifies a low-cost learning path."
- "This could move from Reject to Validate if multiple enterprise customers request this and connect it to a real workflow."

Guidelines:

- Make the recommendation revisable.
- Be specific about the evidence threshold.
- Avoid pretending the decision is permanent.

## Full Template

```text
Recommendation: Build | Validate | Pause | Reject
Confidence: 0-100
Investment Score: 0-100
Decision Debt Risk: 0-100
Potential: 0-100

Summary:
[One plain-language paragraph explaining the recommendation and evidence strength.]

Scorecard:
| Score | Value | Meaning | Main Driver |
| --- | --- | --- | --- |
| Investment Score | [0-100] | [Band] | [Short reason] |
| Confidence | [0-100] | [Band] | [Short reason] |
| Decision Debt Risk | [0-100] | [Band] | [Short reason] |
| Potential | [0-100] | [Band] | [Short reason] |

Evidence:
Strongest Evidence:
- [Evidence item]

Weakest Or Missing Evidence:
- [Evidence gap]

Contradictions:
- [Contradiction or "None known"]

Assumptions:
Major Assumptions:
- [Assumption]

Highest-Risk Assumptions:
- [Assumption]

Reasoning:
[Explain why this recommendation follows from the evidence, assumptions, scores, and risks.]

Decision Risks:
- [Risk if the user follows this recommendation]

Next Best Action:
[One concrete next step.]

What Would Change This Recommendation:
[Specific evidence or condition that would change the recommendation.]
```

## Refusal Output

When Validate cannot responsibly make a firm recommendation, it should use a refusal output.

This is not a failure.

It is part of the product's trust model.

Format:

```text
Recommendation: No Firm Recommendation
Confidence: Too Low

Why:
[Explain what is missing, contradictory, or unsafe to conclude.]

Current Evidence:
- [What is known]

Missing Evidence:
- [What is needed]

Assumptions:
- [What the user appears to be assuming]

Next Best Action:
[The evidence-gathering step that would make a future recommendation possible.]
```

Use refusal when:

- No evidence exists.
- Only one weak evidence source exists.
- Critical context is missing.
- The user tries to force a predetermined answer.
- Evidence is too contradictory.
- The conversation reaches 20 questions without enough clarity.

## Tone Rules

Validate's output should be:

- Clear
- Direct
- Respectful
- Skeptical when evidence is weak
- Inquisitive when evidence is strong
- Honest about uncertainty

Validate's output should not be:

- Overly enthusiastic
- Overly polished
- Defensive
- Mean
- Vague
- A PRD in disguise
- A justification for what the user already wanted

## Open Questions

- Should the scorecard always be visible, or should it be collapsible in the product UI?
- Should Decision Risks appear before or after Next Best Action?
- Should Validate include a "Recommendation History" when a decision changes over time?
- Should the output include citations to user-provided evidence?
- Should users be able to export the output to a memo later, or would that pull Validate too close to PRD generation?
