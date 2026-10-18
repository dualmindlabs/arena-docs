# Security policy

## Scope

This repository is the source of the public DualMind Arena documentation at
[docs.dualmindlab.tech](https://docs.dualmindlab.tech). It contains documentation only, no
platform code.

Report security problems in any of these through the channels below:

| What | Where it runs |
|---|---|
| This documentation site and repository | [docs.dualmindlab.tech](https://docs.dualmindlab.tech) |
| DualMind Arena | [arena.dualmindlab.tech](https://arena.dualmindlab.tech) |
| DualMind API | [api.dualmindlab.tech](https://api.dualmindlab.tech/health) |

Only what is live in production is supported. Old commits and preview deployments are not.

## Reporting a vulnerability

> [!CAUTION]
> Please do **not** report security problems in a public issue, pull request or discussion.

**Preferred: GitHub private vulnerability reporting.** Open a private report at
[Security → Report a vulnerability](https://github.com/dualmindlabs/arena-docs/security/advisories/new).
Only the maintainers can see it.

**Or by email:** write to [support@dualmindlab.tech](mailto:support@dualmindlab.tech) with the
subject line `Security: <short summary>`.

Please include:

- What you found and where (URL, page, endpoint or file)
- Steps to reproduce it
- The impact you expect
- Your name or handle, if you would like credit

Examples of what we want to hear about: documentation that exposes a secret, token or private
endpoint, a page that leaks data it should not, or a vulnerability in the Arena or the API.

## What happens next

| When | What |
|---|---|
| Within 3 working days | We confirm we received your report |
| Within 10 working days | We share our assessment and a plan |
| After the fix ships | We tell you, and credit you if you want |

Please give us a reasonable chance to fix the problem before you discuss it publicly.

## For contributors

- **Never commit secrets.** API keys, tokens, JWTs and connection strings must never appear in
  docs, examples or screenshots. Use obvious placeholders such as `YOUR_TOKEN`.
- **Keep internal details out.** Admin-only routes, infrastructure details and internal URLs
  belong in the private developer docs, not in this public repository.
- **If a secret is committed by mistake,** treat it as leaked: revoke and replace it first, then
  remove it. Deleting the line is not enough, because it stays in git history.
