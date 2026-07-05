import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Circle, Loader2, RotateCcw, Send, Sparkles } from "lucide-react";

const decisionTypes = [
  "Should we build a feature?",
  "Should we solve a customer problem?",
  "Should we prioritize this now?",
  "Should we investigate further?",
  "Something else",
];

const storageKey = "validate:last-decision";

export default function App() {
  const [idea, setIdea] = useState("");
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [answer, setAnswer] = useState("");
  const [conversationState, setConversationState] = useState(null);
  const [decision, setDecision] = useState(null);
  const [lastDecision, setLastDecision] = useState(null);
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState("");

  const displayIdea = useMemo(() => {
    return idea.trim() || "We're considering building AI search for enterprise admins.";
  }, [idea]);

  const currentQuestion = conversationState?.mode === "question" ? conversationState.question : "";
  const showDecisionChoices = currentQuestion
    .toLowerCase()
    .includes("which best describes what you are trying to decide");

  useEffect(() => {
    const savedDecision = window.localStorage.getItem(storageKey);
    if (!savedDecision) return;

    try {
      setLastDecision(JSON.parse(savedDecision));
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, []);

  const askValidate = async (nextMessages) => {
    setIsThinking(true);
    setError("");

    try {
      const response = await fetch("/functions/run-validate-conversation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idea: displayIdea,
          messages: nextMessages,
        }),
      });
      const result = await response.json();

      if (!response.ok || !result?.success || !result?.conversation) {
        throw new Error(result?.error || "Validate could not continue the conversation.");
      }

      const nextState = result.conversation;
      setConversationState(nextState);

      if (nextState.mode === "decision" && nextState.decision) {
        const completedDecision = {
          idea: displayIdea,
          decidedAt: new Date().toISOString(),
          decision: nextState.decision,
        };

        setDecision(nextState.decision);
        setLastDecision(completedDecision);
        window.localStorage.setItem(storageKey, JSON.stringify(completedDecision));
      }

      return nextState;
    } catch (caughtError) {
      setError(caughtError?.message || "Something went wrong while asking Validate.");
      return null;
    } finally {
      setIsThinking(false);
    }
  };

  const startConversation = async (event) => {
    event.preventDefault();
    setStarted(true);
    setMessages([]);
    setAnswer("");
    setDecision(null);
    setConversationState(null);
    setError("");
    await askValidate([]);
  };

  const submitAnswer = async (value = answer) => {
    const trimmedAnswer = value.trim();
    if (!trimmedAnswer || isThinking || decision) return;

    const assistantMessage = currentQuestion
      ? { role: "validate", content: currentQuestion }
      : null;
    const userMessage = { role: "user", content: trimmedAnswer };
    const nextMessages = assistantMessage
      ? [...messages, assistantMessage, userMessage]
      : [...messages, userMessage];

    setMessages(nextMessages);
    setAnswer("");
    await askValidate(nextMessages);
  };

  const resetConversation = () => {
    setIdea("");
    setStarted(false);
    setMessages([]);
    setAnswer("");
    setConversationState(null);
    setDecision(null);
    setError("");
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
              disabled={started && !decision}
              placeholder="We're considering building AI search for enterprise admins."
              className="h-14 min-w-0 flex-1 rounded-full border-0 bg-transparent px-5 text-base text-black outline-none placeholder:text-neutral-400 disabled:text-neutral-500"
            />
            <button
              type="submit"
              disabled={isThinking || (started && !decision)}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black text-white transition hover:bg-neutral-800 disabled:bg-neutral-300"
              aria-label="Begin conversation"
            >
              {isThinking && !started ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <ArrowRight className="h-5 w-5" />
              )}
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
                <button
                  type="button"
                  onClick={resetConversation}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 text-black transition hover:border-black"
                  aria-label="Reset conversation"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-6 space-y-5">
                {messages.map((message, index) => (
                  <MessageBubble key={`${message.role}-${index}`} message={message} />
                ))}

                {!decision && conversationState?.pushback && (
                  <div className="border-l-2 border-black pl-4 text-sm leading-6 text-neutral-700">
                    {conversationState.pushback}
                  </div>
                )}

                {currentQuestion && !decision && (
                  <div className="border-t border-neutral-200 pt-5">
                    <div className="flex items-start gap-3">
                      <Sparkles className="mt-1 h-4 w-4 shrink-0 text-black" />
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">
                          Validate asks
                        </p>
                        <p className="mt-2 text-2xl font-semibold leading-tight text-black">
                          {currentQuestion}
                        </p>
                        {conversationState?.readiness && (
                          <p className="mt-3 text-sm leading-6 text-neutral-600">
                            {conversationState.readiness}
                          </p>
                        )}
                      </div>
                    </div>

                    {showDecisionChoices ? (
                      <div className="mt-5 space-y-2">
                        {decisionTypes.map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => submitAnswer(type)}
                            disabled={isThinking}
                            className="flex w-full items-center gap-3 rounded-full border border-neutral-200 px-4 py-3 text-left text-sm transition hover:border-black disabled:cursor-not-allowed disabled:text-neutral-400"
                          >
                            <Circle className="h-4 w-4 shrink-0 text-neutral-300" />
                            <span>{type}</span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <form
                        onSubmit={(event) => {
                          event.preventDefault();
                          submitAnswer();
                        }}
                        className="mt-5 flex items-end gap-2"
                      >
                        <textarea
                          value={answer}
                          onChange={(event) => setAnswer(event.target.value)}
                          placeholder="Answer with what you know. Weak evidence is okay; Validate will account for it."
                          className="min-h-28 flex-1 resize-none rounded-[1.5rem] border border-neutral-200 bg-white p-4 text-base leading-7 text-black outline-none placeholder:text-neutral-400 focus:border-black"
                        />
                        <button
                          type="submit"
                          disabled={isThinking || !answer.trim()}
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300"
                          aria-label="Send answer"
                        >
                          {isThinking ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          ) : (
                            <Send className="h-5 w-5" />
                          )}
                        </button>
                      </form>
                    )}
                  </div>
                )}

                {isThinking && started && (
                  <div className="flex items-center gap-2 text-sm text-neutral-500">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Validate is thinking...
                  </div>
                )}

                {error && <p className="text-sm leading-6 text-red-600">{error}</p>}
              </div>
            </div>
          )}
        </div>

        {decision && <DecisionCard decision={decision} />}

        {!started && lastDecision && (
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

function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={isUser ? "flex justify-end" : "flex justify-start"}>
      <div
        className={`max-w-[88%] rounded-[1.5rem] px-4 py-3 text-sm leading-6 ${
          isUser
            ? "bg-black text-white"
            : "border border-neutral-200 bg-white text-neutral-700"
        }`}
      >
        {message.content}
      </div>
    </div>
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
