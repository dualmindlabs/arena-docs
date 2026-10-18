# Changelog

> [!NOTE]
> **Looking for product updates?** The DualMind Arena changelog is published on the docs site
> at [docs.dualmindlab.tech/changelog](https://docs.dualmindlab.tech/changelog). Its source is
> [`changelog.mdx`](changelog.mdx) in this repository.

This file records changes to **this repository** (the documentation source and its tooling),
following [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). The repository is not
versioned, so entries are grouped by date, newest first.

## [Unreleased]

### Added

- `LICENSE` with the DualMind Labs proprietary notice.
- Community health files in `.github/`: Code of Conduct (Contributor Covenant 2.1), security
  policy, support guide, issue forms (docs issue, docs request), pull request template and
  `CODEOWNERS`.
- This `CHANGELOG.md`.

## 2026-02-21

### Changed

- README badges now link to `arena.dualmindlab.tech` and `docs.dualmindlab.tech`.

## 2026-02-20

### Added

- `README.md` and `CONTRIBUTING.md`.
- Concept pages: how DualMind works, model comparison, latency measurement and evaluation
  philosophy.
- Global anchors (Try the Arena, Leaderboard, LinkedIn), a "Try Arena Free" navbar button and
  the contextual menu (copy, view, ChatGPT, Claude, Perplexity).

### Changed

- Rewrote the site as user-facing public documentation. Internal architecture, database,
  frontend, development, deployment and admin API pages were removed.
- Visual redesign: Linden theme, Inter font, new colors and a rewritten welcome page.
- Removed the API reference tab from the navigation and expanded the roadmap.

### Fixed

- Added the required `theme` field to `docs.json`.
- Removed the unsupported `background` key from `colors` in `docs.json`.

## 2026-02-19

### Added

- Initial public documentation for DualMind Arena, built with Mintlify.
