/**
 * EloCalculator: interactive ELO update for one vote. Pure client-side maths, no network.
 */
export const EloCalculator = ({ ratingA = 1050, ratingB = 980, k = 32 }) => {
  const [ra, setRa] = useState(ratingA);
  const [rb, setRb] = useState(ratingB);
  const [kf, setKf] = useState(k);
  const [outcome, setOutcome] = useState("a");

  const expectedA = 1 / (1 + Math.pow(10, (rb - ra) / 400));
  const expectedB = 1 - expectedA;
  const scoreA = outcome === "a" ? 1 : outcome === "tie" ? 0.5 : 0;
  const scoreB = 1 - scoreA;
  const deltaA = Math.round(kf * (scoreA - expectedA));
  const deltaB = Math.round(kf * (scoreB - expectedB));
  const fmt = (d) => (d > 0 ? `+${d}` : `${d}`);
  const cls = (d) => (d > 0 ? "dm-up" : d < 0 ? "dm-down" : "dm-muted");
  const clamp = (v) => Math.max(400, Math.min(2400, Number(v) || 0));

  const outcomes = [
    ["a", "A wins"],
    ["tie", "Tie"],
    ["b", "B wins"],
  ];

  return (
    <div className="dm-widget not-prose" role="group" aria-label="ELO calculator">
      <div className="dm-widget-head">
        <div>
          <span className="dm-label">Try it</span>
          <p className="dm-widget-title">ELO calculator</p>
        </div>
        <div style={{ display: "flex", gap: "0.4rem" }} role="radiogroup" aria-label="Vote outcome">
          {outcomes.map(([id, text]) => (
            <button
              key={id}
              type="button"
              className="dm-ctl"
              role="radio"
              aria-checked={outcome === id}
              onClick={() => setOutcome(id)}
            >
              {text}
            </button>
          ))}
        </div>
      </div>

      <div className="dm-grid-2">
        {[
          ["A", ra, setRa, expectedA, deltaA],
          ["B", rb, setRb, expectedB, deltaB],
        ].map(([name, rating, set, expected, delta]) => (
          <div key={name} className="dm-stat">
            <label className="dm-label" htmlFor={`dm-elo-${name}`}>
              Model {name} rating
            </label>
            <input
              id={`dm-elo-${name}`}
              type="number"
              min={400}
              max={2400}
              step={5}
              value={rating}
              onChange={(e) => set(clamp(e.target.value))}
              className="dm-ctl"
              style={{ display: "block", width: "100%", marginTop: "0.4rem", cursor: "text" }}
            />
            <div aria-live="polite">
              <span className="dm-stat-value">
                {rating + delta} <span className={cls(delta)} style={{ fontSize: "1rem" }}>({fmt(delta)})</span>
              </span>
              <span className="dm-muted" style={{ fontSize: "0.8rem" }}>
                Expected score {(expected * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.6rem", marginTop: "1rem" }}>
        <label className="dm-label" htmlFor="dm-elo-k">
          K-factor
        </label>
        <select id="dm-elo-k" className="dm-ctl" value={kf} onChange={(e) => setKf(Number(e.target.value))}>
          {[16, 24, 32, 40].map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
        <span className="dm-muted" style={{ fontSize: "0.8rem" }}>
          Higher K moves ratings faster. An upset (the lower-rated model winning) moves the most points.
        </span>
      </div>
    </div>
  );
};
