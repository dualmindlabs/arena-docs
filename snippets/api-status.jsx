/**
 * ApiStatus: live health check for the public DualMind API.
 * Read-only: GET https://api.dualmindlab.tech/health (public, CORS-enabled).
 */
export const ApiStatus = ({ endpoint = "https://api.dualmindlab.tech/health", title = "DualMind API" }) => {
  const [state, setState] = useState({ status: "checking" });

  const check = useCallback(async () => {
    setState((s) => ({ ...s, status: "checking" }));
    const started = performance.now();
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 10000);
    try {
      const res = await fetch(endpoint, { signal: ctrl.signal, cache: "no-store" });
      const ms = Math.round(performance.now() - started);
      const body = await res.json().catch(() => ({}));
      const healthy = res.ok && body.status === "healthy";
      setState({
        status: healthy ? "up" : "degraded",
        ms,
        code: res.status,
        version: body.version,
        instance: typeof body.instanceId === "string" ? body.instanceId.slice(0, 8) : undefined,
        checkedAt: new Date(),
      });
    } catch (err) {
      setState({ status: "down", checkedAt: new Date() });
    } finally {
      clearTimeout(timer);
    }
  }, [endpoint]);

  useEffect(() => {
    check();
  }, [check]);

  const label = {
    checking: "Checking…",
    up: "Operational",
    degraded: "Degraded",
    down: "Unreachable",
  }[state.status];
  const dot = { checking: "", up: "dm-dot-up", degraded: "dm-dot-warn", down: "dm-dot-down" }[state.status];

  return (
    <div className="dm-widget not-prose" role="group" aria-label={`${title} status`}>
      <div className="dm-widget-head">
        <div>
          <span className="dm-label">Live status</span>
          <p className="dm-widget-title">{title}</p>
        </div>
        <button type="button" className="dm-ctl" onClick={check} disabled={state.status === "checking"}>
          Check again
        </button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", alignItems: "center" }} aria-live="polite">
        <span className="dm-pill">
          <span className={`dm-dot ${dot}`} aria-hidden="true" />
          {label}
        </span>
        {state.ms !== undefined && <span className="dm-pill">{state.ms} ms round trip</span>}
        {state.version && <span className="dm-pill">v{state.version}</span>}
        {state.instance && <span className="dm-pill dm-hide-sm">instance {state.instance}</span>}
      </div>
      <p className="dm-muted" style={{ margin: "0.85rem 0 0", fontSize: "0.8rem" }}>
        {state.checkedAt
          ? `Checked from your browser at ${state.checkedAt.toLocaleTimeString()} with GET ${endpoint.replace("https://", "")}.`
          : `Calling GET ${endpoint.replace("https://", "")} from your browser…`}
      </p>
    </div>
  );
};
