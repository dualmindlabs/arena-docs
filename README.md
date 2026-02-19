# DualMind Arena — Public Documentation

> Production documentation for the DualMind Arena platform.
> This repository contains usage and conceptual documentation only.
> The platform source code is proprietary.

Official documentation for **DualMind Arena**, a real-time AI model evaluation platform.

[![Live Platform](https://img.shields.io/badge/Platform-arena.dualmind.ai-teal)](https://arena.dualmind.ai)
[![Documentation](https://img.shields.io/badge/Docs-docs.dualmind.ai-blue)](https://docs.dualmind.ai)

---

## What is DualMind Arena?

DualMind Arena is a **crowdsourced AI model evaluation platform** where users submit prompts to two competing models simultaneously, vote on the better response, and collectively build an unbiased leaderboard of AI model quality.

The core insight: **blind testing removes brand bias**. Knowing a model's name affects how you judge it. DualMind hides model identities until after you vote — so quality determines the ranking, not marketing.

---

## Architecture Philosophy

DualMind Arena is built with a focus on:

- **Fair model comparison** — All models receive the same prompt under identical conditions
- **Transparent latency measurement** — Generation time is reported alongside every response
- **Neutral evaluation environment** — Model identities are concealed until the vote is cast
- **Real-time response synchronization** — Multiple models are evaluated concurrently so users see results together

---

## Documentation Structure

| Section | Description |
| :--- | :--- |
| [Welcome](/welcome) | Platform overview and key features |
| [Quickstart](/quickstart) | Get your first comparison in 2 minutes |
| [Concepts](/concepts/how-dualmind-works) | Blind comparison, ELO scoring, latency measurement |
| [API Reference](/api-reference/introduction) | Full REST API documentation |
| [Roadmap](/roadmap) | Upcoming features |

---

## License

This documentation is provided for reference only.

© 2026 DualMind Labs. All rights reserved.

This platform is proprietary and closed-source. Unauthorized reproduction, distribution, or use of any part of this documentation or platform is prohibited.
