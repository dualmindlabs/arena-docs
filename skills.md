# DualMind Lab - AI Skills & Context

## Project Overview

**DualMind Lab** is a blind AI model comparison platform that allows users to:
- Compare AI models side-by-side in blind "Arena Battle" mode
- Chat with individual AI models (single chat)
- Create and manage persistent conversation threads
- Vote on model responses to build crowd-sourced rankings
- Share conversations publicly via visibility controls
- Track model performance on an ELO-based leaderboard

Built from scratch as a proprietary platform. Enterprise licenses include self-hosting options.

## Architecture

### Backend
- **Framework**: .NET 8 ASP.NET Core Web API
- **Database**: Supabase PostgreSQL (9 tables)
- **Authentication**: JWT (HS256) via Supabase Auth
- **AI Providers**: Groq (primary), Bytez (secondary) with 3-tier fallback
- **Hosting**: Azure App Service
- **API Base URL**: https://api.dualmindlab.tech

### Frontend
- **Type**: Vanilla JavaScript SPA (no framework)
- **Styling**: Custom CSS with responsive design + dark mode
- **Auth**: Supabase JS Client (Google OAuth + email/password)
- **Streaming**: Server-Sent Events (SSE) via ReadableStream
- **Hosting**: Cloudflare Workers

### Admin Panel
- **Type**: Cloudflare Workers dashboard
- **Features**: Full CRUD for users, models, comparisons, votes, threads, providers
- **Proxy**: Worker proxies `/api/*` to backend, serves static HTML

## API Endpoints

### Chat & Arena
- `POST /api/arena/chat` - Single model chat completion
- `POST /api/arena/dualchat` - Dual model arena comparison
- `POST /api/arena/chat/stream` - SSE streaming chat
- `GET /api/arena/test` - API status check
- `GET /api/arena/ping` - Public ping (no auth)

### Threads
- `GET /api/threads` - List user threads (query: limit)
- `POST /api/threads` - Create thread (body: title)
- `GET /api/threads/{id}` - Get thread (supports public sharing)
- `GET /api/threads/{id}/messages` - Get thread messages
- `PATCH /api/threads/{id}` - Update thread title
- `PATCH /api/threads/{id}/visibility` - Update visibility (private/public/unlisted)
- `DELETE /api/threads/{id}` - Delete thread (owner only)

### Voting & Stats
- `POST /api/arena/model-vote` - Submit vote (left/right/tie/both-bad)
- `GET /api/arena/model-stats` - Get model leaderboard statistics

### Models & Users
- `GET /api/models` - List active AI models
- `POST /api/users/sync` - Sync user profile from Supabase Auth

### Utilities
- `GET /health` - Health check
- `GET /api/settings/feature-flag/{key}` - Get feature flag (public)
- `POST /api/speech/generate` - Text-to-speech via Groq

### Admin (all under /api/admin/*)
- Dashboard stats, CRUD for users, models, comparisons, votes, threads, messages, providers

## Database Schema (9 tables)

- `users` - User profiles synced from Supabase Auth (id UUID PK)
- `threads` - Conversation threads (thread_id, user_id FK, title, visibility)
- `thread_messages` - Messages with dual model responses and vote data
- `ai_models` - Model registry (model_name, provider_name, status)
- `providers` - AI provider configuration
- `provider_api_keys` - API keys with rotation support
- `comparisons` - Arena battle records (model1, model2, prompt)
- `model_votes` - User votes on comparisons (winner_model_id, vote_choice)
- `system_settings` - Feature flags and runtime config

## Authentication

All API requests (except health, ping, feature flags, and public threads) require:
```
Authorization: Bearer <jwt_token>
```
JWT issued by Supabase Auth (HS256, sub=user UUID, aud="authenticated").

## Key Technologies

- **.NET 8** - Backend API with async/await
- **Supabase** - Auth + PostgreSQL database
- **Cloudflare Workers** - Frontend + admin hosting with API proxy
- **Azure App Service** - Backend hosting
- **JWT (HS256)** - Authentication tokens
- **SSE** - Real-time streaming via text/event-stream
- **Groq + Bytez** - AI providers with OpenAI-compatible API

## Development

### Local Setup
1. Clone 3 repositories (DualMind_Back, DualMind_UI, DualMind_Admin-UI)
2. Set environment variables (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, JWT_SECRET, GROQ_API_KEY)
3. Run backend: `cd DualMind_Back/src/DualMind.API && dotnet run`
4. Run frontend: `cd DualMind_UI && npm install && npm run dev`

### Key Environment Variables
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key (bypasses RLS)
- `JWT_SECRET` - Supabase JWT secret for HS256 validation
- `GROQ_API_KEY` - Groq API key (primary provider)

## Documentation Structure

```
docs/
├── welcome.mdx              # Landing page with system overview
├── quickstart.mdx           # Getting started in 15 minutes
├── faq.mdx                  # Frequently asked questions
├── changelog.mdx            # Version history (Update timeline)
├── roadmap.mdx              # Product roadmap
├── mcp.mdx                  # MCP server integration
├── skills.md                # AI agent context (this file)
├── llms.txt                 # LLM training context
├── concepts/                # Core concepts
│   ├── overview.mdx
│   ├── chat-modes.mdx
│   ├── model-selection.mdx
│   ├── threads.mdx
│   ├── voting.mdx
│   └── streaming.mdx
├── architecture/            # System architecture
│   ├── overview.mdx         # System diagram + directory trees
│   ├── backend.mdx          # .NET 8 deep dive
│   ├── data-flow.mdx        # 6+ Mermaid sequence/flow diagrams
│   ├── request-lifecycle.mdx
│   ├── authentication.mdx
│   └── ...
├── api-reference/           # Interactive API docs
│   ├── introduction.mdx     # API overview with quick start
│   ├── openapi.json         # OpenAPI 3.0 spec
│   ├── chat/                # Single, dual, streaming endpoints
│   ├── threads/             # Thread CRUD + visibility
│   ├── voting/              # Vote submission + stats
│   ├── models/              # Model listing
│   ├── users/               # User sync
│   ├── utilities/           # Health, feature flags, speech
│   └── admin/               # Admin CRUD endpoints
├── database/                # Database docs
│   ├── schema.mdx           # ER diagram + table definitions
│   └── models.mdx           # C# model classes
├── frontend/                # Frontend guide
│   ├── overview.mdx
│   ├── components.mdx
│   ├── state-management.mdx
│   └── routing.mdx
├── development/             # Development guide
│   ├── setup.mdx
│   ├── workflows.mdx
│   ├── troubleshooting.mdx
│   └── contributing.mdx     # Contribution guidelines
└── deployment/              # Deployment
    ├── production.mdx
    └── checklist.mdx        # Pre/post deployment checklist
```

## Contact

- **GitHub**: https://github.com/HarshBhanushali07
- **Demo**: https://arena.dualmindlab.tech
- **Status**: https://status.dualmindlab.tech
- **API**: https://api.dualmindlab.tech
- **Docs**: Mintlify-hosted documentation
