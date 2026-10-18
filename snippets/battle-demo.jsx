/**
 * BattleDemo: a self-contained walkthrough of one blind battle.
 * No network calls. The answers and model names are made up for the demo.
 */
export const BattleDemo = () => {
  const battle = {
    prompt: "Explain a race condition to a new developer in two sentences.",
    a: {
      text: "A race condition happens when two pieces of code touch the same data at the same time and the result depends on which one finishes first. It's like two people editing one document without talking: whoever saves last silently wins.",
      name: "Alpha 70B",
      rating: 1040,
    },
    b: {
      text: "Race conditions are concurrency bugs involving shared mutable state and non-deterministic scheduling. Use locks, atomics or message passing to serialize access to critical sections.",
      name: "Beta 8B",
      rating: 1000,
    },
  };
  const [vote, setVote] = useState(null);
  const [started] = useState(() => Date.now());
  const [elapsed, setElapsed] = useState(0);

  const choices = [
    ["left", "👈 Left is better"],
    ["tie", "🤝 It's a tie"],
    ["both-bad", "👎 Both are bad"],
    ["right", "👉 Right is better"],
  ];

  const k = 32;
  const expA = 1 / (1 + Math.pow(10, (battle.b.rating - battle.a.rating) / 400));
  const scoreA = vote === "left" ? 1 : vote === "right" ? 0 : 0.5;
  const decisive = vote === "left" || vote === "right";
  const dA = vote && vote !== "both-bad" ? Math.round(k * (scoreA - expA)) : 0;
  const dB = vote && vote !== "both-bad" ? -dA : 0;
  const fmt = (d) => (d > 0 ? `+${d}` : `${d}`);

  const cast = (choice) => {
    setElapsed(Date.now() - started);
    setVote(choice);
  };

  return (
    <div className="dm-widget not-prose" role="group" aria-label="Blind battle demo">
      <div className="dm-widget-head">
        <div>
          <span className="dm-label">Interactive demo</span>
          <p className="dm-widget-title">Try a blind battle</p>
        </div>
        {vote && (
          <button type="button" className="dm-ctl" onClick={() => setVote(null)}>
            Reset
          </button>
        )}
      </div>

      <div className="dm-battle-prompt">
        <span className="dm-label">Prompt</span>
        <div style={{ marginTop: "0.25rem" }}>{battle.prompt}</div>
      </div>

      <div className="dm-grid-2">
        {[
          ["A", battle.a, vote === "left"],
          ["B", battle.b, vote === "right"],
        ].map(([slot, side, won]) => (
          <div key={slot} className="dm-answer" data-winner={won ? "true" : "false"}>
            <span className="dm-label dm-answer-tag">
              {vote ? `${side.name} (demo)` : `Model ${slot}`}
              {won ? " · winner" : ""}
            </span>
            <div>{side.text}</div>
          </div>
        ))}
      </div>

      {!vote && (
        <div className="dm-vote-row" role="group" aria-label="Which response was better?">
          {choices.map(([id, text]) => (
            <button key={id} type="button" className="dm-ctl" onClick={() => cast(id)}>
              {text}
            </button>
          ))}
        </div>
      )}

      <div aria-live="polite">
        {vote && (
          <div className="dm-reveal">
            <strong>Names revealed.</strong>{" "}
            {decisive
              ? `Your vote moves ${Math.abs(dA)} ELO points: ${battle.a.name} ${fmt(dA)}, ${battle.b.name} ${fmt(dB)}.`
              : vote === "tie"
              ? `In ELO a tie counts as half a win each, nudging the ratings together: ${battle.a.name} ${fmt(dA)}, ${battle.b.name} ${fmt(dB)}.`
              : 'A "Both are bad" vote records the battle with no winner.'}
            <div className="dm-muted" style={{ fontSize: "0.8rem", marginTop: "0.4rem" }}>
              Demo answers and model names are made up. In the Arena the answers are live and the names are real.
            </div>
            <pre className="dm-code" aria-label="The vote request the Arena sends">{`POST /api/arena/model-vote
{
  "comparisonId": "3f6c1a2b-9d4e-4f7a-8b1c-0e2d3f4a5b6c",
  "voteChoice": "${vote}",
  "voteDurationMs": ${elapsed}
}`}</pre>
          </div>
        )}
      </div>
    </div>
  );
};
