# DualMind Arena: public documentation

Source for [docs.dualmindlab.tech](https://docs.dualmindlab.tech), the public docs for **DualMind Arena**, the blind, side-by-side AI model evaluation platform at [arena.dualmindlab.tech](https://arena.dualmindlab.tech).

[![Arena](https://img.shields.io/badge/Arena-arena.dualmindlab.tech-0B7FA0)](https://arena.dualmindlab.tech)
[![Docs](https://img.shields.io/badge/Docs-docs.dualmindlab.tech-0B7FA0)](https://docs.dualmindlab.tech)
[![API](https://img.shields.io/badge/API-api.dualmindlab.tech-0B7FA0)](https://api.dualmindlab.tech/health)

This repository contains usage, concept and API documentation only. The platform source code is proprietary.

## Structure

| Path | Contents |
| :--- | :--- |
| `welcome.mdx`, `quickstart.mdx`, `faq.mdx` | Getting started |
| `concepts/` | Arena modes, voting, leaderboard, threads, models and providers, architecture, latency, evaluation philosophy |
| `api-reference/` | API overview, authentication, errors, tutorials and one page per endpoint |
| `api-reference/openapi.json` | OpenAPI 3.1 spec for the public API (rendered by Mintlify) |
| `changelog.mdx`, `roadmap.mdx` | Product updates |
| `docs.json` | Mintlify site config (theme, navigation, branding) |
| `style.css`, `logo/`, `favicon.png`, `images/` | Brand assets |

## Preview locally

Requires Node.js 20.17 or newer.

```bash
npx mint@4.2.989 dev          # http://localhost:3000
npx mint@4.2.989 validate     # strict build check
npx mint@4.2.989 broken-links # internal link check
```

## Updating the API reference

Endpoint pages use `openapi:` frontmatter and render from `api-reference/openapi.json`. When a public route or DTO changes in the backend, update the spec first, then the endpoint page notes. Admin-only routes are documented in the internal developer docs, not here.

## License

© 2026 DualMind Labs. All rights reserved. This documentation is provided for reference only.
