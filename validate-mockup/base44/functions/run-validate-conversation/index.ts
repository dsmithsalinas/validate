import { createClientFromRequest } from "npm:@base44/sdk";

const conversationSystemPrompt = `
You are Validate, a skeptical product decision interviewer.

Your job is to help founders and product teams decide whether to Build, Validate, Pause, or Reject a product investment.

You are not a generic supportive chatbot.
You evaluate evidence, not enthusiasm.
You ask sharp product questions.
You push back when the user is making a leap.
You do not give the answer the user wants just because they want it.

Conversation behavior:
- Ask one question at a time.
- Adapt the next question to the user's actual answer.
- Ask follow-up questions when answers are vague, weak, biased, or missing customer evidence.
- Sound calm, direct, and product-minded.
- Always respond in clear English only.
- Never switch languages unless the user explicitly asks to translate.
- Never repeat the same phrase or question.
- Keep questions under 35 words.
- Keep pushback under 45 words.
- Keep readiness under 35 words.
- Do not say "great idea."
- Do not recommend Build unless evidence is strong enough.
- Do not recommend Reject just because an idea is early if it has plausible high potential and learnable assumptions.
- Usually ask at least 5 substantive questions before making a recommendation.
- Usually stop before 12 substantive questions unless the evidence is contradictory.
- Make a recommendation only when there is enough evidence and reasoning to produce a reasonable recommendation and confidence level.

Readiness rules:
- If the conversation has fewer than 5 user answers after the initial idea, continue asking questions.
- If customer problem, evidence, affected users, business goal, alternatives, risks, and cost of delay are mostly unknown, continue asking.
- If evidence is weak but the opportunity may have potential, ask questions that reveal whether the assumptions are learnable.
- If the user asks you to justify a predetermined answer, push back and explain that Validate only guides based on evidence.

Recommendation meanings:
- Build: evidence is strong enough, confidence is medium to high, Decision Debt is acceptable, and timing is justified.
- Validate: potential or investment value is meaningful, but important assumptions need testing before heavy investment.
- Pause: timing, strategy, or context is not ready; revisit later.
- Reject: evidence suggests the opportunity is not worth investing in.

Scoring rules:
- Scores must be whole numbers from 0 to 100.
- Potential and Confidence are separate.
- Decision Debt is premature-commitment risk, not engineering effort.
- Weak evidence should lower Confidence.
- High Potential does not justify Build without enough evidence.
- Customer-facing analytics or source-of-truth data on untrusted data should usually have High Decision Debt.
- AI search over enterprise admin workflows should usually have High Decision Debt when evidence is weak.
- Novelty, polish, personalization, or internal excitement should not raise Investment Score unless tied to customer pain, adoption, retention, revenue, support reduction, or strategy.

Return JSON only using the requested schema.
`;

const responseSchema = {
  type: "object",
  properties: {
    mode: {
      type: "string",
      enum: ["question", "decision"],
    },
    question: {
      type: "string",
      description: "The next single question to ask when mode is question.",
    },
    pushback: {
      type: "string",
      description: "Short skeptical product pushback, if needed. Empty string if not needed.",
    },
    readiness: {
      type: "string",
      description: "Why Validate is or is not ready to recommend.",
    },
    missingEvidence: {
      type: "array",
      items: { type: "string" },
    },
    recommendation: {
      type: "string",
      enum: ["Build", "Validate", "Pause", "Reject", ""],
    },
    confidence: {
      type: "integer",
      minimum: 0,
      maximum: 100,
    },
    investment: {
      type: "integer",
      minimum: 0,
      maximum: 100,
    },
    decisionDebt: {
      type: "integer",
      minimum: 0,
      maximum: 100,
    },
    potential: {
      type: "integer",
      minimum: 0,
      maximum: 100,
    },
    summary: {
      type: "string",
    },
    strongestEvidence: {
      type: "array",
      items: { type: "string" },
    },
    evidenceGaps: {
      type: "array",
      items: { type: "string" },
    },
    keyAssumptions: {
      type: "array",
      items: { type: "string" },
    },
    decisionRisks: {
      type: "array",
      items: { type: "string" },
    },
    nextBestAction: {
      type: "string",
    },
  },
  required: [
    "mode",
    "question",
    "pushback",
    "readiness",
    "missingEvidence",
    "recommendation",
    "confidence",
    "investment",
    "decisionDebt",
    "potential",
    "summary",
    "strongestEvidence",
    "evidenceGaps",
    "keyAssumptions",
    "decisionRisks",
    "nextBestAction",
  ],
};

type Message = {
  role?: string;
  content?: string;
};

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function cleanMessages(value: unknown): Message[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((message) => {
      if (!message || typeof message !== "object") return null;
      const role = cleanText((message as Message).role);
      const content = cleanText((message as Message).content);
      if (!role || !content) return null;
      return { role, content };
    })
    .filter(Boolean) as Message[];
}

function normalizeScore(value: unknown) {
  if (typeof value !== "number" || Number.isNaN(value)) return 0;

  let normalized = value;
  if (normalized > 0 && normalized <= 1) {
    normalized = normalized * 100;
  } else if (normalized > 1 && normalized <= 10) {
    normalized = normalized * 10;
  }

  return Math.max(0, Math.min(100, Math.round(normalized)));
}

function normalizeArray(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.map(cleanText).filter(Boolean);
}

function hasNonEnglishCharacters(value: string) {
  return /[\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af\u0400-\u04ff\u0590-\u05ff\u0600-\u06ff]/u.test(
    value,
  );
}

function hasRepeatedPhrase(value: string) {
  const normalized = value.toLowerCase().replace(/\s+/g, " ").trim();
  if (!normalized) return false;

  const words = normalized.split(" ");
  for (let phraseLength = 3; phraseLength <= 8; phraseLength += 1) {
    const seen = new Map<string, number>();
    for (let index = 0; index <= words.length - phraseLength; index += 1) {
      const phrase = words.slice(index, index + phraseLength).join(" ");
      const count = (seen.get(phrase) || 0) + 1;
      if (count >= 3) return true;
      seen.set(phrase, count);
    }
  }

  return false;
}

function isMalformedText(value: string, maxLength = 700) {
  if (!value) return false;
  return value.length > maxLength || hasNonEnglishCharacters(value) || hasRepeatedPhrase(value);
}

function isMalformedArray(values: string[]) {
  return values.some((value) => isMalformedText(value, 350));
}

function fallbackQuestion(messages: Message[]) {
  const userAnswerCount = messages.filter((message) => message.role === "user").length;

  if (userAnswerCount <= 1) {
    return "What specific customer problem are you trying to solve?";
  }

  if (userAnswerCount === 2) {
    return "What evidence do you have that this problem is real and important?";
  }

  if (userAnswerCount === 3) {
    return "Who is affected by this problem, and how often does it happen?";
  }

  if (userAnswerCount === 4) {
    return "What business outcome would improve if this worked?";
  }

  return "What is the smallest test that would reduce the biggest uncertainty?";
}

function safeQuestionConversation(messages: Message[], readiness?: string) {
  return {
    mode: "question",
    question: fallbackQuestion(messages),
    pushback: "",
    readiness:
      readiness ||
      "Validate needs cleaner evidence before it can make a responsible recommendation.",
    missingEvidence: ["customer evidence", "business impact", "risks"],
    decision: null,
  };
}

function normalizeConversation(result: Record<string, unknown>) {
  const mode = result.mode === "decision" ? "decision" : "question";

  return {
    mode,
    question: mode === "question" ? cleanText(result.question) : "",
    pushback: mode === "question" ? cleanText(result.pushback) : "",
    readiness:
      cleanText(result.readiness) ||
      (mode === "question"
        ? "Validate needs more evidence before it can recommend responsibly."
        : "Validate has enough evidence to make a recommendation."),
    missingEvidence: normalizeArray(result.missingEvidence),
    decision:
      mode === "decision"
        ? {
            recommendation: cleanText(result.recommendation),
            confidence: normalizeScore(result.confidence),
            investment: normalizeScore(result.investment),
            decisionDebt: normalizeScore(result.decisionDebt),
            potential: normalizeScore(result.potential),
            summary: cleanText(result.summary),
            strongestEvidence: normalizeArray(result.strongestEvidence),
            evidenceGaps: normalizeArray(result.evidenceGaps),
            keyAssumptions: normalizeArray(result.keyAssumptions),
            decisionRisks: normalizeArray(result.decisionRisks),
            nextBestAction: cleanText(result.nextBestAction),
          }
        : null,
  };
}

function guardConversation(conversation: ReturnType<typeof normalizeConversation>, messages: Message[]) {
  if (
    conversation.mode === "question" &&
    (isMalformedText(conversation.question, 220) ||
      isMalformedText(conversation.pushback, 350) ||
      isMalformedText(conversation.readiness, 300) ||
      isMalformedArray(conversation.missingEvidence))
  ) {
    return safeQuestionConversation(messages);
  }

  if (conversation.mode === "decision" && conversation.decision) {
    const decision = conversation.decision;
    const malformedDecision =
      isMalformedText(decision.summary, 1200) ||
      isMalformedText(decision.nextBestAction, 700) ||
      isMalformedArray(decision.strongestEvidence) ||
      isMalformedArray(decision.evidenceGaps) ||
      isMalformedArray(decision.keyAssumptions) ||
      isMalformedArray(decision.decisionRisks);

    if (malformedDecision) {
      return safeQuestionConversation(
        messages,
        "Validate detected unstable output and needs one more clean answer before recommending.",
      );
    }
  }

  return conversation;
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return Response.json({ error: "Use POST" }, { status: 405 });
  }

  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();

    const idea = cleanText(body.idea);
    const messages = cleanMessages(body.messages);

    if (!idea) {
      return Response.json({ error: "Idea is required." }, { status: 400 });
    }

    if (messages.length === 0) {
      return Response.json({
        success: true,
        conversation: {
          mode: "question",
          question: "Which best describes what you are trying to decide?",
          pushback: "",
          readiness:
            "Validate needs to understand the decision intent before evaluating evidence.",
          missingEvidence: [
            "decision intent",
            "customer problem",
            "evidence",
            "business goal",
          ],
          decision: null,
        },
      });
    }

    const transcript = messages
      .map((message) => `${message.role.toUpperCase()}: ${message.content}`)
      .join("\n");

    const userPrompt = `
Evaluate the conversation so far and either ask the next best question or make a recommendation.

Idea:
${idea}

Transcript:
${transcript}

Return mode "question" if Validate should keep asking.
Return mode "decision" only if Validate has enough evidence and reasoning to recommend Build, Validate, Pause, or Reject.
`;

    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `${conversationSystemPrompt}\n\n${userPrompt}`,
      response_json_schema: responseSchema,
    });
    const conversation = guardConversation(normalizeConversation(result), messages);

    return Response.json({
      success: true,
      conversation,
    });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
});
