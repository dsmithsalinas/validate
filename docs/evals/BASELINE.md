# Baseline Eval Suite

Status: Active
Date Established: 2026-07-05
Baseline Eval: EVAL-005
Prompt: docs/prompts/PROMPT-002-Validate-System-Instructions.md

## Purpose

The baseline eval suite protects the core behavior of Validate while the prompt, product, and implementation evolve.

In plain English: this is the test that tells us whether Validate still thinks like Validate after we change it.

## How To Run

Run:

```sh
npm run eval:baseline
```

The command reads machine-readable cases from:

```text
evals/cases/
```

It writes local run output to:

```text
work/eval-baseline/
```

The `work/` folder is intentionally ignored by Git. It is where local test results live.

## What Passing Means

Passing the baseline means:

- The recommendation matches the expected outcome for every case.
- Decision Debt stays high for customer-facing analytics built on inconsistent instrumentation.
- High-potential, weak-evidence ideas receive Validate rather than Build or Reject.
- Potential and Confidence remain separate.
- Decision Debt behaves like premature-commitment risk, not just engineering effort.

## Current Baseline Cases

| Case | Expected | What It Protects |
| --- | --- | --- |
| CASE-001: AI Search For Enterprise Admins | Validate | Weak evidence plus meaningful upside should become Validate, with high Decision Debt. |
| CASE-002: Bulk Invite For Enterprise Admins | Build | Strong evidence and scoped work should be buildable. |
| CASE-003: Customer Analytics Dashboard | Pause | Customer-facing analytics on inconsistent data should carry High Decision Debt. |
| CASE-004: AI-Generated Admin Avatars | Reject | Low-value novelty should not be over-supported. |
| CASE-005: AI Strategy Assistant For Founders | Validate | High-potential weak-evidence ideas should not be killed too early. |

## Baseline Rule

Every future prompt change should be compared against this baseline before it is treated as an improvement.

A future prompt should not be considered better unless it preserves or improves:

- Recommendation accuracy.
- Decision Debt calibration.
- Separation of Potential and Confidence.
- Moonshot handling.
- Customer-facing analytics risk handling.

## Configuration

The runner uses these defaults:

- Prompt: `docs/prompts/PROMPT-002-Validate-System-Instructions.md`
- Cases: `evals/cases/`
- Output: `work/eval-baseline/`
- Model: `gpt-4.1-mini`

You can override them with environment variables:

```sh
VALIDATE_PROMPT_FILE=docs/prompts/PROMPT-002-Validate-System-Instructions.md npm run eval:baseline
VALIDATE_EVAL_CASES_DIR=evals/cases npm run eval:baseline
VALIDATE_EVAL_OUTPUT_DIR=work/eval-baseline npm run eval:baseline
OPENAI_EVAL_MODEL=gpt-4.1-mini npm run eval:baseline
```
