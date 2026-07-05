import { useMemo, useState } from "react";
import { ArrowRight, Check, Circle, Loader2, Sparkles } from "lucide-react";
import { base44 } from "@/api/base44Client";

const decisionTypes = [
  "Should we build a feature?",
  "Should we solve a customer problem?",
  "Should we prioritize this now?",
  "Should we investigate further?",
  "Something else",
];

const questionFields = [
  {
    key: "customerProblem",
    label: "What customer or user problem does this solve?",
    placeholder: "Example: Admins struggle to find settings and policy docs in a complex console.",
  },
  {
    key: "evidence",
    label: "What evidence do you have?",
    placeholder: "Example: 3 customer success managers mentioned it, but we have not checked support tickets yet.",
  },
  {
    key: "users",
    label: "Who is affected, and how often?",
    placeholder: "Example: Larger enterprise admins, probably during onboarding and account changes.",
  },
  {
    key: "businessGoal",
    label: "Why does this matter to the business now?",
    placeholder: "Example: Enterprise expansion is a priority this quarter.",
  },
  {
    key: "alternatives",
    label: "What do people use instead today?",
    placeholder: "Example: Support, customer success, docs, search, or manual workarounds.",
  },
  {
    key: "risks",
    label: "What risks or concerns should Validate consider?",
    placeholder: "Example: Trust, privacy, hallucinations, unreliable data, or roadmap distraction.",
  },
  {
    key: "validationTest",
    label: "What is the smallest test that would increase confidence?",
    placeholder: "Example: Interview 5 admins and prototype the top 3 workflows.",
  },
  {
    key: "costOfDelay",
    label: "What happens if you wait 30 to 90 days?",
    placeholder: "Example: Support load may continue, but no known deals are blocked.",
  },
];

export default function App() {
  const [idea, setIdea] = useState("");
  const [started, setStarted] = useState(false);
  const [decisionType, setDecisionType] = useState(decisionTypes[0]);
  const [answers, setAnswers] = useState({});
  const [decision, setDecision] = useState(null);
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState("");

  const displayIdea = useMemo(() => {
    return idea.trim() || "We're considering building AI search for enterprise admins.";
  }, [idea]);

  const startConversation = (event) => {
    event.preventDefault();
    setStarted(true);
    setDecision(null);
    setError("");
  };

  const updateAnswer = (key, value) => {
    setAnswers((current) => ({ ...current, [key]: value }));
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

      setDecision(result.decision);
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
              <div className="mb-5">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">
                  Current idea
                </p>
                <p className="mt-2 text-lg font-medium text-black">{displayIdea}</p>
              </div>

              <div className="grid gap-5 md:grid-cols-[0.85fr_1.15fr]">
                <div>
                  <p className="text-sm font-medium text-black">
                    Which best describes what you are trying to decide?
                  </p>
                  <div className="mt-3 space-y-2">
                    {decisionTypes.map((type) => {
                      const selected = type === decisionType;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setDecisionType(type)}
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
                </div>

                <div>
                  <p className="text-sm font-medium text-black">
                    Answer what you know. It is okay if some evidence is weak.
                  </p>
                  <div className="mt-3 space-y-4">
                    {questionFields.map((field) => (
                      <label key={field.key} className="block">
                        <span className="text-xs font-medium uppercase tracking-[0.12em] text-neutral-500">
                          {field.label}
                        </span>
                        <textarea
                          value={answers[field.key] || ""}
                          onChange={(event) => updateAnswer(field.key, event.target.value)}
                          placeholder={field.placeholder}
                          className="mt-2 min-h-20 w-full resize-none rounded-3xl border border-neutral-200 bg-white p-4 text-sm leading-6 text-black outline-none placeholder:text-neutral-400 focus:border-black"
                        />
                      </label>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={makeDecision}
                    disabled={isThinking}
                    className="mt-3 inline-flex h-11 items-center gap-2 rounded-full bg-black px-5 text-sm font-medium text-white transition hover:bg-neutral-800"
                  >
                    {isThinking ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="h-4 w-4" />
                    )}
                    {isThinking ? "Thinking..." : "Make recommendation"}
                  </button>
                  {error && <p className="mt-3 text-sm leading-6 text-red-600">{error}</p>}
                </div>
              </div>
            </div>
          )}
        </div>

        {decision && (
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
        )}
      </section>
    </main>
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
