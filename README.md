# Validate

Validate is an AI-powered product investment reasoning engine.

It helps founders and product teams answer one question before they spend engineering time, money, and focus:

> Should we invest in building this?

Validate is not a PRD generator, a Jira ticket writer, or a generic AI copilot. Those may become outputs later. The product is better product judgment.

## Current Status

Status: Recovery Sprint

This repository is the canonical home for Validate going forward.

The first job of this repository is to recover and preserve the product philosophy, reasoning model, and decisions created during the founding ChatGPT conversation on July 4-5, 2026.

## Core Principle

Validate evaluates evidence, not ideas.

Every recommendation should be traceable to evidence. When evidence is missing, weak, stale, contradictory, or biased, Validate should say so before making a recommendation.

## Founding Documents

- [Constitution](CONSTITUTION.md)
- [RFC-001: Manifesto](docs/rfc/RFC-001-Manifesto.md)
- [RFC-002: Evidence Model](docs/rfc/RFC-002-Evidence-Model.md)
- [RFC-003: Reasoning Framework](docs/rfc/RFC-003-Reasoning-Framework.md)
- [RFC-004: Conversation Framework](docs/rfc/RFC-004-Conversation-Framework.md)
- [RFC-005: Decision Engine](docs/rfc/RFC-005-Decision-Engine.md)
- [RFC-006: Investment Model](docs/rfc/RFC-006-Investment-Model.md)
- [RFC-007: Decision Debt Model](docs/rfc/RFC-007-Decision-Debt-Model.md)
- [ADR-001: GitHub as Canonical Repository](docs/adr/ADR-001-GitHub-Canonical-Repository.md)
- [Decision Log](docs/decisions/Decision-Log.md)
- [Things We Believe Today](docs/beliefs/Things-We-Believe-Today.md)
- [Recovery Sprint](docs/recovery/Recovery-Sprint.md)

## Product Specs

- [SPEC-001: Validate V0](docs/specs/SPEC-001-Validate-V0.md)
- [SPEC-002: Recommendation Output Template](docs/specs/SPEC-002-Recommendation-Output-Template.md)
- [SPEC-003: Learning Loop](docs/specs/SPEC-003-Learning-Loop.md)
- [SPEC-004: Transformational Ideas Rule](docs/specs/SPEC-004-Transformational-Ideas-Rule.md)
- [SPEC-005: Decision Debt Definition](docs/specs/SPEC-005-Decision-Debt-Definition.md)

## Prompts

- [PROMPT-001: Validate System Instructions](docs/prompts/PROMPT-001-Validate-System-Instructions.md)
- [PROMPT-002: Validate System Instructions](docs/prompts/PROMPT-002-Validate-System-Instructions.md)

## Evals

Current baseline:

- [Baseline Eval Suite](docs/evals/BASELINE.md)
- [EVAL-005: Frozen Baseline Eval Suite](docs/evals/EVAL-005-Blind-Model-Run-Customer-Analytics-Rule.md)

Previous evals:

- [EVAL-001: Prompt Manual Test](docs/evals/EVAL-001-Prompt-Manual-Test.md)
- [EVAL-002: Model Run](docs/evals/EVAL-002-Model-Run.md)
- [EVAL-003: Blind Model Run](docs/evals/EVAL-003-Blind-Model-Run.md)
- [EVAL-004: Blind Model Run With PROMPT-002](docs/evals/EVAL-004-Blind-Model-Run-Prompt-002.md)
- [EVAL-006: Live Base44 Function Run](docs/evals/EVAL-006-Live-Base44-Function-Run.md)

## Manual Test Cases

- [CASE-001: AI Search For Enterprise Admins](docs/cases/CASE-001-AI-Search-For-Enterprise-Admins.md)
- [CASE-002: Bulk Invite For Enterprise Admins](docs/cases/CASE-002-Bulk-Invite-For-Enterprise-Admins.md)
- [CASE-003: Customer Analytics Dashboard](docs/cases/CASE-003-Customer-Analytics-Dashboard.md)
- [CASE-004: AI-Generated Admin Avatars](docs/cases/CASE-004-AI-Generated-Admin-Avatars.md)
- [CASE-005: AI Strategy Assistant For Founders](docs/cases/CASE-005-AI-Strategy-Assistant-For-Founders.md)

## Important Note

Any files in `outputs/` or `work/` are scratch artifacts from the recovery process. They are intentionally ignored by Git and are not canonical.

## Useful Commands

Run the frozen baseline eval suite:

```sh
npm run eval:baseline
```

Run the live Base44 function eval:

```sh
npm run eval:live-base44
```

Run the Base44 mockup:

```sh
cd validate-mockup
npm run dev
```

Live Base44 mockup:

[https://validate-mockup-51c4e7bb.base44.app](https://validate-mockup-51c4e7bb.base44.app)
