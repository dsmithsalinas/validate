import { useMemo, useState } from "react";
import { ArrowRight, Check, Circle, Sparkles } from "lucide-react";

const decisionTypes = [
  "Should we build a feature?",
  "Should we solve a customer problem?",
  "Should we prioritize this now?",
  "Should we investigate further?",
  "Something else",
];

const evidencePrompts = [
  "Who is asking for this?",
  "What evidence do we have?",
  "What happens if we wait?",
];

export default function App() {
  const [idea, setIdea] = useState("");
  const [started, setStarted] = useState(false);
  const [decisionType, setDecisionType] = useState(decisionTypes[0]);
  const [evidence, setEvidence] = useState("");
  const [decision, setDecision] = useState(null);

  const displayIdea = useMemo(() => {
    return idea.trim() || "We're considering building AI search for enterprise admins.";
  }, [idea]);

  const startConversation = (event) => {
    event.preventDefault();
    setStarted(true);
    setDecision(null);
  };

  const makeDecision = () => {
    setDecision({
      recommendation: "Validate",
      confidence: 42,
      investment: 64,
      decisionDebt: 72,
      potential: 82,
      reason:
        "This sounds strategically meaningful, but the current evidence is still thin. Validate should learn whether the problem is frequent, painful, and worth solving before recommending Build.",
    });
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

              <div className="grid gap-5 md:grid-cols-[1fr_1fr]">
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
                    Add the strongest evidence you have so far.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {evidencePrompts.map((prompt) => (
                      <span
                        key={prompt}
                        className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-500"
                      >
                        {prompt}
                      </span>
                    ))}
                  </div>
                  <textarea
                    value={evidence}
                    onChange={(event) => setEvidence(event.target.value)}
                    placeholder="Example: We heard this from 3 customer success managers, but we do not have product analytics or direct customer interviews yet."
                    className="mt-4 min-h-36 w-full resize-none rounded-3xl border border-neutral-200 bg-white p-4 text-sm leading-6 text-black outline-none placeholder:text-neutral-400 focus:border-black"
                  />
                  <button
                    type="button"
                    onClick={makeDecision}
                    className="mt-3 inline-flex h-11 items-center gap-2 rounded-full bg-black px-5 text-sm font-medium text-white transition hover:bg-neutral-800"
                  >
                    <Sparkles className="h-4 w-4" />
                    Make recommendation
                  </button>
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

            <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-700">{decision.reason}</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <Metric label="Investment" value={decision.investment} />
              <Metric label="Decision Debt" value={decision.decisionDebt} />
              <Metric label="Potential" value={decision.potential} />
            </div>
          </section>
        )}
      </section>
    </main>
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
