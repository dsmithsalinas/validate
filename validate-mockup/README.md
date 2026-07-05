# Validate Mockup

A small Base44-hosted prototype for testing the first Validate conversation flow.

The UI asks for a product decision, expands into structured questions, and calls a Base44 backend function to generate a real Build / Validate / Pause / Reject recommendation.

Live app:

[https://validate-mockup-51c4e7bb.base44.app](https://validate-mockup-51c4e7bb.base44.app)

## Structure

```text
base44/
  config.jsonc
  functions/
    run-validate-decision/
      function.jsonc
      index.ts
src/
  App.jsx
  api/base44Client.js
```

## Development

```sh
npm install
npm run dev
```

## Build And Deploy

```sh
npm run build
npx base44 deploy -y
```

## Current Behavior

- The browser collects the product idea, decision intent, and structured answers.
- The backend function calls Base44 `Core.InvokeLLM`.
- The function returns a recommendation, scores, evidence gaps, assumptions, risks, and next best action.
- Scores are normalized to 0-100 before reaching the UI.

This is still a prototype. It does not yet persist decisions, support accounts, or run the full baseline eval suite inside the app.
