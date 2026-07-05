# CASE-001: AI Search For Enterprise Admins

Status: Manual Test
Date: 2026-07-05
Frameworks Tested: RFC-004 Conversation Framework, RFC-005 Decision Engine
Evaluator: Chief Skeptic

## Purpose

This case tests whether Validate can handle a product idea with weak evidence without becoming either too supportive or too dismissive.

The goal is not to prove the idea is good.

The goal is to test whether the framework produces a useful next decision.

## Starting Input

User:

> We're considering building AI search for enterprise admins.

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

What customer or user problem do you believe AI search solves for enterprise admins?

Assumed answer:

> Admins have trouble finding settings, policy documentation, audit information, and user management actions across a complex admin console.

### Question 2

What evidence do you have that this problem exists?

Assumed answer:

> We have heard it from a few customer success managers and one enterprise prospect mentioned it during a sales call.

### Question 3

Do you have customer evidence, usage metrics, support tickets, or product analytics showing this is frequent or painful?

Assumed answer:

> Not yet. We have not pulled support tickets or product analytics.

### Question 4

How many customers or admins are affected?

Assumed answer:

> We do not know. We suspect larger enterprise accounts are more affected.

### Question 5

What happens if you do nothing for 30 to 90 days?

Assumed answer:

> Admins may continue to rely on support or customer success. It might slow onboarding for larger accounts, but we do not have quantified impact.

### Question 6

Why does this matter to the business or strategy right now?

Assumed answer:

> Enterprise expansion is a priority, and admin usability is becoming more important as accounts get larger.

### Question 7

What assumptions are you making that are not yet proven?

Assumed answer:

> We are assuming search is the right solution, that AI is better than better navigation, and that admins would trust AI-generated answers for admin tasks.

### Question 8

What is the smallest test that would increase confidence?

Assumed answer:

> Review support tickets, interview 5 enterprise admins, and prototype a command/search bar with a few common admin tasks.

## Step 3: Classify Inputs

| Statement | Classification | Notes |
| --- | --- | --- |
| Enterprise admins work in a complex admin console. | Assumption | Plausible, but not proven in this case. |
| Admins have trouble finding settings and policy information. | Assumption | Based on secondhand reports, not direct evidence yet. |
| Customer success managers have heard complaints. | Weak Evidence | Internal, secondhand, and unquantified. |
| One enterprise prospect mentioned search during a sales call. | Weak Evidence | Single source and sales-context bias. |
| Enterprise expansion is a priority. | Strategic Evidence | Stronger if backed by company goals. |
| Support tickets and analytics have not been reviewed. | Fact | Important evidence gap. |
| AI search is better than navigation improvements. | Assumption | Needs testing. |
| Admins would trust AI-generated answers. | Assumption | High-risk assumption. |

## Step 4: Evidence Assessment

### Customer Evidence

Current strength: Weak

Reason:

No direct customer interviews are available in this case. The strongest signal is secondhand customer success feedback and one prospect mention.

### Behavioral Evidence

Current strength: Missing

Reason:

No usage analytics, search logs, click paths, task completion data, or admin console behavior has been reviewed.

### Business Evidence

Current strength: Weak

Reason:

Enterprise expansion is strategically important, but the business impact of admin search has not been quantified.

### Strategic Evidence

Current strength: Medium

Reason:

Enterprise expansion makes admin usability relevant, but strategic relevance alone does not justify building AI search.

### Opinion Evidence

Current strength: Medium

Reason:

Internal teams believe this may matter. That is useful as a hypothesis source, not as proof.

## Step 5: Assumptions

Major assumptions:

- Enterprise admins experience search/navigation pain frequently.
- This pain affects expansion, onboarding, retention, or support cost.
- AI search is the right solution.
- Better navigation, documentation, or task shortcuts would not solve the problem more cheaply.
- Admins would trust AI answers for sensitive administrative tasks.
- The team can implement AI search safely and accurately.

Highest-risk assumptions:

1. AI search is the right solution.
2. The problem is frequent and painful enough to justify engineering investment.
3. Admins would trust AI-generated answers in an enterprise admin context.

## Step 6: Scores

Investment Score: 68/100

Reason:

The opportunity could matter because enterprise admins are valuable users and admin usability may affect expansion. However, the problem and solution are not yet well proven.

Confidence: 34/100

Reason:

Evidence is mostly secondhand and unquantified. Direct customer evidence and behavioral evidence are missing.

Decision Debt Risk: 74/100

Reason:

Building AI search could create significant rework if the real problem is navigation, documentation, permissions, or information architecture. It may also create trust, security, and accuracy risks.

Potential: 76/100

Reason:

If the problem is real and frequent, improving admin discovery could meaningfully improve enterprise usability, onboarding, support load, and differentiation.

## Step 7: Recommendation

Recommendation: Validate

Confidence: 34/100

## Summary

This opportunity has meaningful potential, but the current evidence is too weak to justify building AI search now. The strongest signal is internal and secondhand. There is not yet enough direct customer evidence, behavioral evidence, or quantified business impact to recommend engineering investment.

The idea should not be rejected because the potential enterprise value may be real. But building now would create high decision debt because the team does not yet know whether the problem is search, navigation, documentation, permissions, workflow design, or something else.

## Evidence

Strongest evidence:

- Enterprise expansion is strategically important.
- Customer success managers have heard some related complaints.
- One enterprise prospect mentioned the need during a sales conversation.

Weakest or missing evidence:

- No direct admin interviews.
- No support ticket analysis.
- No product analytics.
- No quantified support burden.
- No evidence that AI search is better than simpler alternatives.

Contradictions:

- None identified yet, but the evidence base is too thin to reveal contradictions.

## Assumptions

- Admins frequently cannot find what they need.
- The problem is painful enough to affect business outcomes.
- AI search is the right solution.
- Admins will trust AI in an administrative workflow.
- The team can build this safely without introducing compliance or permission risks.

## Reasoning

RFC-005 says high Potential with low Confidence should usually lead to Validate, not Reject.

This case fits that pattern.

The opportunity may be valuable, but the evidence does not yet support Build. The right next move is to gather evidence quickly and cheaply before committing engineering time.

## Next Best Action

Run a focused validation sprint before building.

Recommended sprint:

1. Interview 5 enterprise admins.
2. Review support tickets for search, navigation, configuration, permissions, and admin setup issues.
3. Analyze admin console behavior for repeated navigation loops or abandoned tasks.
4. Identify the top 10 admin tasks users struggle to complete.
5. Prototype two alternatives:
   - AI search or command bar
   - Improved navigation or guided task shortcuts
6. Compare which approach helps admins complete real tasks faster and with more trust.

## What This Case Tests About Validate

This case shows that Validate should:

- Avoid saying "great idea" too early.
- Avoid rejecting a high-potential idea only because evidence is weak.
- Clearly separate strategic potential from current evidence.
- Recommend learning before building.
- Name the specific evidence needed to move from Validate to Build.

## What Felt Strong

- The Build/Validate/Pause/Reject model handled the case cleanly.
- Separating Investment Score from Confidence made the recommendation more honest.
- Decision Debt Risk was useful because AI search could be expensive and risky if the real problem is simpler.
- Potential helped prevent premature rejection.

## What Felt Fuzzy

- The score values are still judgment calls.
- "Enough evidence" needs more precise thresholds.
- Decision Debt Risk needs a more concrete calculation method.
- The framework needs examples where Pause and Reject are the correct answer.

## Follow-Up Work

- Write CASE-002 where evidence is strong enough to recommend Build.
- Write CASE-003 where the correct answer is Pause.
- Write CASE-004 where the correct answer is Reject.
- Use those cases to refine RFC-005.

