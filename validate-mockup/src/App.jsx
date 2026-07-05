import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Circle,
  Loader2,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { base44 } from "@/api/base44Client";

const decisionTypes = [
  "Should we build a feature?",
  "Should we solve a customer problem?",
  "Should we prioritize this now?",
  "Should we investigate further?",
  "Something else",
];

const conversationSteps = [
  {
    key: "decisionType",
    eyebrow: "Decision intent",
    question: "Which best describes what you are trying to decide?",
    type: "choice",
    options: decisionTypes,
  },
  {
    key: "customerProblem",
    eyebrow: "Customer problem",
    question: "What customer or user problem does this solve?",
    placeholder:
      "Example: Admins struggle to find settings and policy docs in a complex console.",
  },
  {
    key: "evidence",
    eyebrow: "Evidence",
    question: "What evidence do you have?",
    placeholder:
      "Example: 3 customer success managers mentioned it, but we have not checked support tickets yet.",
  },
  {
    key: "users",
    eyebrow: "Users",
    question: "Who is affected, and how often?",
    placeholder:
      "Example: Larger enterprise admins, probably during onboarding and account changes.",
  },
  {
    key: "businessGoal",
    eyebrow: "Business goal",
    question: "Why does this matter to the business now?",
    placeholder: "Example: Enterprise expansion is a priority this quarter.",
  },
  {
    key: "alternatives",
    eyebrow: "Alternatives",
    question: "What do people use instead today?",
    placeholder:
      "Example: Support, customer success, docs, search, or manual workarounds.",
  },
  {
    key: "risks",
    eyebrow: "Risks",
    question: "What risks or concerns should Validate consider?",
    placeholder:
      "Example: Trust, privacy, hallucinations, unreliable data, or roadmap distraction.",
  },
  {
    key: "validationTest",
    eyebrow: "Smallest test",
    question: "What is the smallest test that would increase confidence?",
    placeholder: "Example: Interview 5 admins and prototype the top 3 workflows.",
  },
  {
    key: "costOfDelay",
    eyebrow: "Cost of delay",
    question: "What happens if you wait 30 to 90 days?",
    placeholder: "Example: Support load may continue, but no known deals are blocked.",
  },
];

const firstAnswerStepIndex = 1;
const storageKey = "validate:last-decision";

export default function App() {
  const [idea, setIdea] = useState("");
  const [started, setStarted] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [decisionType, setDecisionType] = useState(decisionTypes[0]);
  const [answers, setAnswers] = useState({});
  const [draftAnswer, setDraftAnswer] = useState("");
  const [decision, setDecision] = useState(null);
  const [lastDecision, setLastDecision] = useState(null);
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState("");

  const displayIdea = useMemo(() => {
    return idea.trim() || "We're considering building AI search for enterprise admins.";
  }, [idea]);

  const currentStep = conversationSteps[stepIndex];
  const answeredCount = conversationSteps.filter((step) => {
    if (step.key === "decisionType") return Boolean(decisionType);
    return Boolean((answers[step.key] || "").trim());
  }).length;
  const isLastStep = stepIndex === conversationSteps.length - 1;
  const hasEnoughForDecision = answeredCount >= 6;

  useEffect(() => {
    const savedDecision = window.localStorage.getItem(storageKey);
    if (!savedDecision) return;

    try {
      setLastDecision(JSON.parse(savedDecision));
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, []);

  const startConversation = (event) => {
    event.preventDefault();
    setStarted(true);
    setStepIndex(0);
    setDecision(null);
    setError("");
    setDraftAnswer("");
  };

  const selectDecisionType = (type) => {
    setDecisionType(type);
    setError("");
  };

  const updateAnswer = (value) => {
    setDraftAnswer(value);
    setAnswers((current) => ({ ...current, [currentStep.key]: value }));
    setError("");
  };

  const goToStep = (nextIndex) => {
    const nextStep = conversationSteps[nextIndex];
    setStepIndex(nextIndex);
    setDraftAnswer(nextStep.key === "decisionType" ? "" : answers[nextStep.key] || "");
    setError("");
  };

  const goForward = () => {
    if (currentStep.type !== "choice" && !draftAnswer.trim()) {
      setError("Validate needs your best current answer before moving on.");
      return;
    }

    if (!isLastStep) {
      goToStep(stepIndex + 1);
    }
  };

  const goBack = () => {
    if (stepIndex > 0) {
      goToStep(stepIndex - 1);
    }
  };

  const resetConversation = () => {
    setIdea("");
    setStarted(false);
    setStepIndex(0);
    setDecisionType(decisionTypes[0]);
    setAnswers({});
    setDraftAnswer("");
    setDecision(null);
    setError("");
  };

  const makeDecision = async () => {
    setIsThinking(true);
    setError("");
    setDecision(null);

    try {
      const result = await base44.functions.invoke("run-validate-decision", {
        idea: displayIdea,
        decisionType,
        answers,
      });

      if (!result?.success || !result?.decision) {
        throw new Error(result?.error || "Validate could not produce a recommendation.");
      }

      const completedDecision = {
        idea: displayIdea,
        decidedAt: new Date().toISOString(),
        decision: result.decision,
      };

      setDecision(result.decision);
      setLastDecision(completedDecision);
      window.localStorage.setItem(storageKey, JSON.stringify(completedDecision));
    } catch (caughtError) {
      setError(caughtError?.message || "Something went wrong while asking Validate.");
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center justify-center px-5 py-10">
        <div className="w-full text-center">
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
            Validate
          </p>
          <h1 className="mx-auto max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-black sm:text-6xl">
            What product decision are you trying to make today?
          </h1>
        </div>

        <div
          className={`mt-10 w-full max-w-3xl rounded-[2rem] border border-black bg-white transition-all duration-300 ${
            started ? "p-4 shadow-[0_18px_60px_rgba(0,0,0,0.08)]" : "p-2 shadow-none"
          }`}
        >
          <form onSubmit={startConversation} className="flex items-center gap-2">
            <input
              value={idea}
              onChange={(event) => setIdea(event.target.value)}
              placeholder="We're considering building AI search for enterprise admins."
              className="h-14 min-w-0 flex-1 rounded-full border-0 bg-transparent px-5 text-base text-black outline-none placeholder:text-neutral-400"
            />
            <button
              type="submit"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black text-white transition hover:bg-neutral-800"
              aria-label="Begin conversation"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>

          {started && (
            <div className="mt-5 border-t border-neutral-200 px-2 pb-1 pt-5 text-left">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">
                    Current idea
                  </p>
                  <p className="mt-2 text-lg font-medium text-black">{displayIdea}</p>
                </div>
                <div className="rounded-full border border-neutral-200 px-4 py-2 text-sm text-neutral-600">
                  {answeredCount}/{conversationSteps.length}
                </div>
              </div>

              <div className="mt-6">
                <div className="h-1.5 overflow-hidden rounded-full bg-neutral-100">
                  <div
                    className="h-full rounded-full bg-black transition-all duration-300"
                    style={{ width: `${(answeredCount / conversationSteps.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className="mt-7">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">
                  {currentStep.eyebrow}
                </p>
                <h2 className="mt-2 text-2xl font-semibold leading-tight text-black">
                  {currentStep.question}
                </h2>

                {currentStep.type === "choice" ? (
                  <div className="mt-5 space-y-2">
                    {currentStep.options.map((type) => {
                      const selected = type === decisionType;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => selectDecisionType(type)}
                          className="flex w-full items-center gap-3 rounded-full border border-neutral-200 px-4 py-3 text-left text-sm transition hover:border-black"
                        >
                          {selected ? (
                            <Check className="h-4 w-4 shrink-0 text-black" />
                          ) : (
                            <Circle className="h-4 w-4 shrink-0 text-neutral-300" />
                          )}
                          <span className={selected ? "font-medium text-black" : "text-neutral-600"}>
                            {type}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <textarea
                    value={draftAnswer}
                    onChange={(event) => updateAnswer(event.target.value)}
                    placeholder={currentStep.placeholder}
                    className="mt-5 min-h-36 w-full resize-none rounded-[1.5rem] border border-neutral-200 bg-white p-4 text-base leading-7 text-black outline-none placeholder:text-neutral-400 focus:border-black"
                  />
                )}

                {error && <p className="mt-3 text-sm leading-6 text-red-600">{error}</p>}

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={goBack}
                      disabled={stepIndex === 0}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 text-black transition hover:border-black disabled:cursor-not-allowed disabled:text-neutral-300"
                      aria-label="Previous question"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={resetConversation}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 text-black transition hover:border-black"
                      aria-label="Reset conversation"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {!isLastStep && (
                      <button
                        type="button"
                        onClick={goForward}
                        className="inline-flex h-11 items-center gap-2 rounded-full border border-black px-5 text-sm font-medium text-black transition hover:bg-neutral-50"
                      >
                        Next
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={makeDecision}
                      disabled={isThinking || !hasEnoughForDecision}
                      className="inline-flex h-11 items-center gap-2 rounded-full bg-black px-5 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300"
                    >
                      {isThinking ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Sparkles className="h-4 w-4" />
                      )}
                      {isThinking ? "Thinking..." : "Recommend"}
                    </button>
                  </div>
                </div>
              </div>

              {answeredCount > firstAnswerStepIndex && (
                <div className="mt-7 border-t border-neutral-200 pt-5">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">
                    Captured so far
                  </p>
                  <div className="mt-3 space-y-3">
                    {conversationSteps.slice(firstAnswerStepIndex).map((step) => {
                      const value = answers[step.key];
                      if (!value?.trim()) return null;
                      return (
                        <button
                          key={step.key}
                          type="button"
                          onClick={() => goToStep(conversationSteps.findIndex((item) => item.key === step.key))}
                          className="block w-full border-t border-neutral-100 pt-3 text-left"
                        >
                          <span className="text-xs font-medium uppercase tracking-[0.12em] text-neutral-400">
                            {step.eyebrow}
                          </span>
                          <span className="mt-1 block text-sm leading-6 text-neutral-700">{value}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {decision && <DecisionCard decision={decision} />}

        {!decision && lastDecision && (
          <section className="mt-6 w-full max-w-3xl border-t border-neutral-200 pt-5 text-left">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">
              Last decision
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
              <p className="max-w-xl text-sm leading-6 text-neutral-700">{lastDecision.idea}</p>
              <span className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium">
                {lastDecision.decision.recommendation}
              </span>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}

function DecisionCard({ decision }) {
  return (
    <section className="mt-6 w-full max-w-3xl border-t border-black pt-6 text-left">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">
            Recommendation
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-black">{decision.recommendation}</h2>
        </div>
        <div className="rounded-full border border-black px-4 py-2 text-sm font-medium">
          Confidence {decision.confidence}
        </div>
      </div>

      <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-700">{decision.summary}</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Metric label="Investment" value={decision.investment} />
        <Metric label="Decision Debt" value={decision.decisionDebt} />
        <Metric label="Potential" value={decision.potential} />
      </div>

      <div className="mt-7 grid gap-6 md:grid-cols-2">
        <EvidenceList title="Strongest Evidence" items={decision.strongestEvidence} />
        <EvidenceList title="Evidence Gaps" items={decision.evidenceGaps} />
        <EvidenceList title="Key Assumptions" items={decision.keyAssumptions} />
        <EvidenceList title="Decision Risks" items={decision.decisionRisks} />
      </div>

      <div className="mt-7 border-t border-neutral-200 pt-5">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">
          Next Best Action
        </p>
        <p className="mt-2 text-base leading-7 text-black">{decision.nextBestAction}</p>
      </div>
    </section>
  );
}

function EvidenceList({ title, items = [] }) {
  return (
    <div className="border-t border-neutral-200 pt-4">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">{title}</p>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-neutral-700">
        {items.length > 0 ? (
          items.map((item) => <li key={item}>- {item}</li>)
        ) : (
          <li>- None provided.</li>
        )}
      </ul>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="border-t border-neutral-200 pt-3">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-black">{value}</p>
    </div>
  );
}
