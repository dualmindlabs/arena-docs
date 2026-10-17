/**
 * LiveLeaderboard: the public Arena leaderboard, filtered client-side.
 * Read-only: GET https://api.dualmindlab.tech/api/arena/model-stats (public, CORS-enabled).
 */
export const LiveLeaderboard = ({ limit = 10, endpoint = "https://api.dualmindlab.tech/api/arena/model-stats" }) => {
  const [items, setItems] = useState(null);
  const [error, setError] = useState(null);
  const [provider, setProvider] = useState("all");
  const [minBattles, setMinBattles] = useState(50);

  const load = useCallback(async () => {
    setError(null);
    setItems(null);
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 15000);
    try {
      const res = await fetch(endpoint, { signal: ctrl.signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const body = await res.json();
      setItems(Array.isArray(body.items) ? body.items : []);
    } catch (err) {
      setError(err && err.name === "AbortError" ? "The request timed out." : "Couldn't reach the API.");
    } finally {
      clearTimeout(timer);
    }
  }, [endpoint]);

  useEffect(() => {
    load();
  }, [load]);

  const providers = { groq: "Groq", google: "Google", cloudflare: "Cloudflare" };

  const rows = useMemo(() => {
    if (!items) return [];
    return items
      .filter((m) => provider === "all" || m.providerName === provider)
      .filter((m) => (m.totalResponses || 0) >= minBattles)
      .sort((a, b) => (b.eloScore || 0) - (a.eloScore || 0))
      .slice(0, limit);
  }, [items, provider, minBattles, limit]);

  const [lo, hi] = useMemo(() => {
    if (!rows.length) return [900, 1200];
    const scores = rows.map((r) => r.eloScore || 0);
    return [Math.min(...scores) - 20, Math.max(...scores)];
  }, [rows]);

  return (
    <div className="dm-widget not-prose" role="group" aria-label="Live leaderboard">
      <div className="dm-widget-head">
        <div>
          <span className="dm-label">Live data</span>
          <p className="dm-widget-title">Arena leaderboard</p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          <select className="dm-ctl" value={provider} onChange={(e) => setProvider(e.target.value)} aria-label="Filter by provider">
              <option value="all">All providers</option>
              <option value="groq">Groq</option>
              <option value="google">Google AI Studio</option>
              <option value="cloudflare">Cloudflare Workers AI</option>
            </select>
          <select className="dm-ctl" value={minBattles} onChange={(e) => setMinBattles(Number(e.target.value))} aria-label="Minimum number of battles">
              <option value={0}>Any battles</option>
              <option value={20}>20+ battles</option>
              <option value={50}>50+ battles</option>
              <option value={100}>100+ battles</option>
            </select>
          <button type="button" className="dm-ctl" onClick={load}>
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <p role="alert" style={{ margin: 0 }}>
          {error} Try again, or call <code>GET /api/arena/model-stats</code> yourself.
        </p>
      )}

      {!error && !items && (
        <div aria-busy="true" aria-label="Loading leaderboard" style={{ display: "grid", gap: "0.7rem" }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="dm-skeleton" style={{ width: `${92 - i * 9}%` }} />
          ))}
        </div>
      )}

      {!error && items && (
        <div className="dm-table-wrap">
          <table className="dm-table">
            <caption className="dm-muted" style={{ fontSize: "0.8rem" }}>
              Top {rows.length} of {items.length} ranked models, by ELO. Rank is the overall rank.
            </caption>
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">Model</th>
                <th scope="col">ELO</th>
                <th scope="col" style={{ textAlign: "right" }}>Win rate</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((m) => (
                <tr key={m.modelId || m.modelName}>
                  <td>#{m.eloRank}</td>
                  <td style={{ maxWidth: "16rem" }}>
                    <span style={{ fontWeight: 600, overflowWrap: "anywhere" }}>{m.displayName || m.modelName}</span>
                    <div className="dm-muted" style={{ fontSize: "0.75rem" }}>
                      {providers[m.providerName] || m.providerName} · {m.totalResponses} battles · {m.totalWins}W {m.totalLosses}L {m.totalTies}T
                    </div>
                  </td>
                  <td style={{ minWidth: "8rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span>{Math.round(m.eloScore)}</span>
                      <div className="dm-bar" aria-hidden="true" style={{ flex: 1 }}>
                        <span style={{ width: `${Math.max(6, ((m.eloScore - lo) / Math.max(1, hi - lo)) * 100)}%` }} />
                      </div>
                    </div>
                  </td>
                  <td style={{ textAlign: "right" }}>{Number(m.winRate || 0).toFixed(1)}%</td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={4} className="dm-muted">
                    No models match these filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
