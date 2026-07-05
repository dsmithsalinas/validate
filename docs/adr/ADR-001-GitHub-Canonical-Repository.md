# ADR-001: GitHub As Canonical Repository

Status: Accepted
Date: 2026-07-05
Decision Owner: Dustin
Reviewer: Chief Skeptic
Confidence: 96/100

## Context

During the founding Validate conversation, Notion was initially proposed as the source of truth because it is strong for product documentation and fast iteration.

That recommendation was based on an assumption:

> If the Notion connector exists, it will behave reliably enough to become the source of truth.

That assumption was not supported by the evidence gathered in the session.

The workflow required reliable AI read/write access to the canonical repository. The Notion workflow worked inconsistently. That made it unsuitable as the primary source of truth for this project.

## Decision

Use GitHub as Validate's canonical repository.

## Requirements

The repository must:

- Be readable by Dustin and Codex.
- Be editable by Dustin and Codex.
- Work reliably across sessions.
- Support version history.
- Store documentation and code together.
- Scale from portfolio project to real product.
- Become part of Dustin's professional portfolio.

## Considered Options

### Notion

Strengths:

- Excellent writing experience.
- Great organization.
- Useful databases.
- Strong human UX.

Weaknesses:

- AI write access was not reliable in the founding workflow.
- Documentation would be separated from implementation.
- The project would depend on connector availability.

Recommendation: reject as canonical repository for now.

### GitHub

Strengths:

- Reliable version control.
- Native Markdown support.
- Documentation and code can live together.
- Commit history records evolution.
- Works well for RFCs, ADRs, issues, pull requests, and releases.
- Strong portfolio value.

Weaknesses:

- Less polished than Notion for casual note-taking.
- Slightly steeper learning curve for non-technical documentation.

Recommendation: accept as canonical repository.

## Consequences

All canonical Validate artifacts should live in GitHub.

Scratch notes may exist elsewhere, but they are not canonical until committed here.

Future changes to canonical documents should be versioned, reviewed, and recorded in the Decision Log.

## Evidence That Would Change This Decision

This decision should be revisited if:

- Notion or another tool provides reliable AI read/write access every session.
- GitHub becomes too high-friction for the work.
- Validate needs a richer non-code knowledge system that cannot be represented well in Markdown.

