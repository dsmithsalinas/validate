# RFC-007: Decision Debt Model

**Status:** Draft
**Version:** 0.1
**Owner:** Dustin, Founder
**Reviewer:** Chief Skeptic
**Last Updated:** 2026-07-05
**Confidence:** 84/100

---

## Purpose

This RFC defines **Decision Debt Risk** for Validate.

Decision Debt Risk is one of Validate's four core recommendation dimensions:

1. Investment Score
2. Confidence
3. Decision Debt Risk
4. Potential

This document exists because early evaluation showed that Validate could select the correct recommendation type while still under-calibrating Decision Debt Risk.

Recommendation selection is not enough. Validate must also explain the cost of acting too early.

---

## Summary

**Decision Debt Risk is the future cost created by committing to a product direction before the evidence justifies that commitment.**

It is not the same as engineering effort. It is not the same as technical complexity. It is not the same as low confidence.

Decision Debt measures the risk that today's premature decision creates future rework, trust loss, strategic distraction, policy burden, customer expectation debt, or maintenance burden.

---

## Core Definition

Decision Debt is created when a team makes a product investment before it has sufficiently understood:

- the customer problem
- the evidence supporting the problem
- the correct solution path
- the trust, security, policy, or data risks
- the opportunity cost
- the future obligations created by the decision

Decision Debt increases when a team acts with more commitment than the evidence supports.

---

## What Decision Debt Is

Decision Debt asks:

> If we commit to this direction today and we are wrong, how much future cost could this decision create?

That future cost may include:

- Rework
- Customer trust damage
- Poor solution fit
- Policy or legal review
- Security review
- Customer-facing data quality issues
- Distraction from higher-priority work
- Maintenance burden
- Internal attention cost
- Customer expectation management
- Strategic drift

---

## What Decision Debt Is Not

Decision Debt is not simply development effort.

A large project can have low Decision Debt if the problem is well understood, the evidence is strong, and the solution path is clear.

A small project can have moderate or high Decision Debt if it creates distraction, policy review, customer expectations, trust risk, or strategic drift.

Examples:

- Rebuilding authentication may be high effort but low Decision Debt if the need is proven and the path is clear.
- Adding AI-generated avatars may be low effort but moderate Decision Debt if it creates policy review, brand risk, distraction, and no validated customer value.
- Launching customer-facing analytics on inconsistent instrumentation may be moderate effort but high Decision Debt because incorrect data can damage customer trust.

---

## Relationship To Other Validate Scores

### Investment Score

Investment Score measures whether the opportunity is attractive.

Decision Debt measures the cost of acting too early.

These scores should be evaluated independently.

### Confidence

Confidence measures how certain Validate is in its assessment.

Decision Debt measures the future cost if the team commits prematurely.

Low confidence often increases Decision Debt, but they are not the same.

### Potential

Potential measures upside if the idea works.

Decision Debt measures downside if the team commits too soon.

High Potential does not cancel out high Decision Debt. It often means the correct recommendation is **Validate**, not **Build**.

---

## Decision Debt Components

Decision Debt Risk should be scored by evaluating five component risks.

Each component is scored from 0 to 100.

The overall Decision Debt Risk is a weighted composite of these components.

---

## 1. Implementation & Rework Risk

Risk that the team will build the wrong implementation, architecture, workflow, or interaction model because the solution path is not yet sufficiently understood.

Decision Debt rises when:

- The solution could be complex.
- The team may need to rebuild after learning more.
- The idea touches foundational architecture.
- The feature requires substantial design or technical exploration.
- The implementation path depends on unresolved assumptions.
- The solution could be expensive even if the underlying problem is plausible.

Examples:

High:
- AI search across enterprise permissions and sensitive data.
- Workflow automation with unclear edge cases.
- Analytics dashboards built on inconsistent data models.

Low:
- Small, scoped UI fix with clear evidence and low rework risk.
- Well-understood bulk action with proven customer need.

---

## 2. Problem / Solution-Fit Risk

Risk that the team is solving the wrong problem or choosing the wrong solution before understanding the real customer need.

Decision Debt rises when:

- The user presents a solution rather than a problem.
- Customer requests are interpreted too literally.
- There is evidence of pain but not evidence for the proposed solution.
- The proposed feature may address a symptom rather than the root problem.
- The team has not explored cheaper or simpler alternatives.

Examples:

High:
- Customers ask for "AI search," but the real problem may be navigation, taxonomy, permissions, or reporting.
- Customers ask for dashboards, but the real need may be exports, alerts, or trusted source-of-record data.

Low:
- Customers consistently describe the same problem and the proposed solution directly removes the friction.

---

## 3. Trust, Data & Governance Risk

Risk that the decision could damage customer trust, create security concerns, introduce legal or policy review, expose unreliable data, or create governance burden.

This is the component most likely to be under-scored by generic models.

Decision Debt rises when the feature touches:

- AI-generated outputs
- search or retrieval over sensitive information
- customer-facing analytics
- permissions
- security
- privacy
- compliance
- legal review
- policy review
- regulated workflows
- source-of-truth data
- customer trust
- brand trust

Examples:

High:
- AI search that may return incorrect, unauthorized, or low-trust answers.
- Customer-facing analytics built on inconsistent instrumentation.
- AI assistant behavior that could hallucinate or mislead users.

Moderate:
- AI-generated avatars or novelty AI that may trigger brand, policy, or review concerns even if engineering work is small.

Low:
- Internal-only workflow improvement with no customer-facing trust implications.

---

## 4. Strategic & Opportunity Cost Risk

Risk that the decision diverts time, attention, or credibility away from more important validated work.

Decision Debt is not only created by engineering hours. It is also created by organizational attention.

Decision Debt rises when:

- The work distracts from higher-priority validated opportunities.
- The idea is exciting but weakly aligned with strategy.
- The team is reacting to hype, competitor pressure, or executive enthusiasm.
- The decision consumes leadership, design, legal, policy, or GTM attention.
- The work adds noise to the roadmap.
- The feature makes the product feel less focused.

Examples:

High:
- Novelty AI feature with weak customer evidence and high leadership attention.
- Feature created mainly because a competitor launched something similar.

Moderate:
- Small feature with low engineering cost but meaningful review, positioning, or distraction cost.

Low:
- Strongly aligned work with clear customer evidence and limited distraction.

---

## 5. Commitment & Maintenance Risk

Risk that shipping the feature creates future obligations, expectations, support needs, or maintenance burden disproportionate to the validated value.

Decision Debt rises when:

- Customers may expect ongoing expansion.
- The feature creates a new surface area to maintain.
- Support teams will need to explain or troubleshoot it.
- The feature may need future migration or cleanup.
- The team may need to support multiple versions.
- The feature creates a promise the product cannot yet keep.

Examples:

High:
- Customer-facing analytics that customers rely on for reporting or decision-making.
- AI search that customers expect to be complete, accurate, and secure.

Moderate:
- Lightweight AI novelty features that still create policy, support, or brand obligations.

Low:
- Temporary internal experiment with explicit non-production expectations.

---

## Scoring Model

Each component is scored from 0 to 100.

Recommended initial weights:

| Component | Weight |
| --- | ---: |
| Implementation & Rework Risk | 20% |
| Problem / Solution-Fit Risk | 20% |
| Trust, Data & Governance Risk | 25% |
| Strategic & Opportunity Cost Risk | 20% |
| Commitment & Maintenance Risk | 15% |

Trust, Data & Governance Risk receives the highest initial weight because evaluation showed it is easy to under-score and can create disproportionate downstream cost.

---

## Score Bands

### 0 to 20: Minimal Decision Debt

The decision is unlikely to create meaningful future cost if wrong.

### 21 to 40: Low Decision Debt

The decision has some future cost if wrong, but it is likely contained.

### 41 to 60: Moderate Decision Debt

The decision could create meaningful rework, distraction, trust concerns, or maintenance burden.

### 61 to 80: High Decision Debt

The decision could create significant future cost if wrong.

### 81 to 100: Severe Decision Debt

The decision could create major strategic, customer, trust, or operational harm if made prematurely.

---

## Calibration Rules

### Rule 1: Trust risk can make Decision Debt high even when engineering effort is moderate.

Customer-facing AI, search, analytics, permissions, security, privacy, compliance, or source-of-truth data should raise Decision Debt.

### Rule 2: Small work can still create moderate Decision Debt.

Low engineering effort does not mean low Decision Debt.

Small features may still create attention cost, policy review, brand risk, support burden, opportunity cost, or strategic distraction.

### Rule 3: High potential does not reduce Decision Debt.

Potential is upside.

Decision Debt is downside from premature commitment.

### Rule 4: Strong evidence can reduce Decision Debt.

Strong, consistent, fresh evidence reduces the risk of building the wrong thing.

It does not eliminate trust, governance, or maintenance risk.

### Rule 5: Reversibility matters.

If a decision is easy to undo, Decision Debt is lower.

If a decision creates expectations, architecture, customer reliance, or product direction lock-in, Decision Debt is higher.

### Rule 6: Customer-facing data requires special caution.

If customers will use the output to make decisions, report to stakeholders, or trust it as a source of truth, Decision Debt should rise when data quality is uncertain.

### Rule 7: AI features require explicit trust evaluation.

AI features should be evaluated for hallucination risk, explainability, permission boundaries, customer trust, security implications, support burden, failure modes, and policy review.

---

## Calibration Examples

### CASE-001: AI Search for Enterprise Admins

Expected Decision Debt Risk: High

Reason:

- High trust risk
- Possible security and permissions risk
- High solution-fit uncertainty
- Potentially expensive implementation
- High rework risk if the real problem is not search
- Customer expectations around accuracy and completeness

Approximate Decision Debt Risk: 72

### CASE-002: Bulk Invite for Enterprise Admins

Expected Decision Debt Risk: Low to Moderate

Reason:

- Strong evidence
- Clear customer problem
- Scoped implementation
- Limited trust risk
- Some implementation and maintenance risk, but contained

Approximate Decision Debt Risk: 27

### CASE-003: Customer Analytics Dashboard

Expected Decision Debt Risk: High

Reason:

- Customer-facing analytics create trust risk
- Inconsistent instrumentation creates rework risk
- Customers may treat the dashboard as a source of truth
- Shipping before data quality is resolved creates future cleanup and credibility risk

Approximate Decision Debt Risk: 67

### CASE-004: AI-Generated Admin Avatars

Expected Decision Debt Risk: Moderate

Reason:

- Low engineering effort does not mean no debt
- Low evidence and low strategic fit
- Policy, brand, and review concerns may exist
- Attention cost and strategic distraction matter
- Future maintenance may be small but nonzero

Approximate Decision Debt Risk: 44

---

## Prompt Implications

System prompts should not ask the model to assign a single vague Decision Debt number.

They should require the model to:

1. Score each component.
2. Explain each component.
3. Compute or estimate the aggregate Decision Debt Risk.
4. Call out which component is driving the score.
5. Explain what would reduce the Decision Debt.

Recommended output shape:

```json
{
  "decision_debt_risk": {
    "overall_score": 72,
    "level": "High",
    "components": {
      "implementation_rework": {
        "score": 75,
        "reason": "Solution path is unclear and may require costly rework."
      },
      "problem_solution_fit": {
        "score": 70,
        "reason": "The user is asking for AI search, but the underlying problem may be navigation or permissions."
      },
      "trust_data_governance": {
        "score": 85,
        "reason": "Search over enterprise data creates trust, security, and permissions risk."
      },
      "strategic_opportunity": {
        "score": 55,
        "reason": "The work could distract from more validated admin workflow improvements."
      },
      "commitment_maintenance": {
        "score": 70,
        "reason": "Shipping search creates expectations around accuracy, coverage, and reliability."
      }
    },
    "primary_drivers": [
      "trust_data_governance",
      "implementation_rework",
      "problem_solution_fit"
    ],
    "what_would_reduce_debt": [
      "Validate the underlying problem with customer interviews.",
      "Prototype search with limited scope.",
      "Confirm permission boundaries.",
      "Assess whether simpler navigation improvements solve the problem."
    ]
  }
}
```

---

## Recommendation Implications

Decision Debt should influence the recommendation.

### Build

Requires strong Investment Score, sufficient Confidence, acceptable Decision Debt, and a clear next implementation path.

High Decision Debt does not always block Build, but it requires explicit mitigation.

### Validate

Likely when Investment Score or Potential is attractive, Confidence is low to moderate, Decision Debt is moderate to high, and the team can reduce debt through experiments.

### Pause

Likely when Decision Debt is high, strategic alignment is weak or timing is poor, evidence is incomplete, or the cost of acting now is greater than the cost of waiting.

### Reject

Likely when Investment Score is low, Potential is low, evidence points away from the idea, and Decision Debt is moderate or high relative to expected value.

---

## How To Reduce Decision Debt

Validate should recommend specific actions to reduce Decision Debt.

### Reduce Implementation & Rework Risk

- Prototype
- Run technical discovery
- Narrow scope
- Validate architecture assumptions
- Test with a concierge workflow

### Reduce Problem / Solution-Fit Risk

- Reframe solution requests into customer problems
- Interview customers
- Compare alternative solutions
- Validate root cause
- Test a lower-cost workaround

### Reduce Trust, Data & Governance Risk

- Review permissions
- Assess security implications
- Validate data quality
- Add monitoring
- Conduct legal, compliance, or policy review
- Limit beta exposure

### Reduce Strategic & Opportunity Cost Risk

- Compare against roadmap priorities
- Clarify strategic alignment
- Estimate attention cost
- Identify what work would be delayed
- Define explicit stop conditions

### Reduce Commitment & Maintenance Risk

- Make it reversible
- Ship as beta
- Limit availability
- Set customer expectations
- Define support ownership
- Define cleanup criteria

---

## Open Questions

- Should component weights vary by product category?
- Should AI features automatically receive a minimum Trust, Data & Governance score?
- Should customer-facing analytics automatically receive a minimum Trust, Data & Governance score when data quality is uncertain?
- Should Decision Debt be shown as a single score, a component breakdown, or both?
- How should Decision Debt change after validation experiments?
- Should organizations customize Decision Debt weights based on their risk tolerance?

---

## Decision

Adopt this Decision Debt Model as the working definition for PROMPT-002 and future evaluation runs.

Do not rely on a single undifferentiated Decision Debt score.

Decision Debt should be decomposed, explained, and calibrated by component.

---

## Confidence

84/100

This model is more precise than the previous working definition and directly addresses observed eval calibration failures.

Confidence should increase after rerunning the blind eval with a revised prompt based on this RFC.
