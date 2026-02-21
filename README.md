# nudge.
![Nudge Logo](./logo.png)

**Configure your business by just chatting.**

Nudge is an AI-powered conversational onboarding platform. Instead of filling out forms, business owners configure their entire setup by chatting with an AI assistant on WhatsApp or Telegram.

## How it works

1. **A SaaS platform (like YaTurno) triggers a nudge** — sends a request with the user's phone number
2. **Nudge contacts the user via WhatsApp** — starts a friendly conversation
3. **The AI collects all the configuration** — business name, services, hours, pricing, etc.
4. **Nudge sends the structured data back** — via webhook to the SaaS platform
5. **The business is configured** — the user gets a link to their new setup

## Architecture
```
SaaS Platform (YaTurno)
│
├── POST /api/nudge (trigger onboarding)
│
▼
Nudge Backend (Hono + TypeScript)
├── WhatsApp (Baileys)
├── Telegram (grammY)
├── Claude Haiku (AI conversation)
├── SQLite/Turso (state)
│
├── POST /webhook → SaaS Platform
│   (sends collected data back)
│
▼
Nudge Dashboard (Next.js)
└── Monitor conversations, connect WhatsApp, settings
```

## Key Features

- **AI-first data collection** — understands natural language ("we're open 9 to 6 weekdays")
- **Multi-channel** — WhatsApp and Telegram, same conversation engine
- **Configurable** — JSON definitions describe what data to collect, AI adapts automatically
- **Generic** — works for any SaaS, not just appointment scheduling
- **Webhook integration** — sends structured data to any endpoint on completion

## Tech Stack

**Backend (nudge/)**
- Hono (HTTP framework)
- TypeScript
- Claude Haiku (Anthropic API)
- Baileys (WhatsApp)
- grammY (Telegram)
- Drizzle ORM + Turso (SQLite)

**Dashboard (nudge-dashboard/)**
- Next.js 14
- Tailwind CSS + shadcn/ui
- Deployed on Vercel

**Infrastructure**
- Backend: Railway
- Database: Turso
- Dashboard: Vercel

## Project Structure
```
├── nudge/              # Backend API + WhatsApp/Telegram bots
├── nudge-dashboard/    # Admin dashboard (Next.js)
└── README.md
```

## Demo

Built at Platan.us Build Night — Buenos Aires 🇦🇷

## Setup

### Backend
```bash
cd nudge
pnpm install
cp .env.example .env  # fill in API keys
pnpm db:push
pnpm dev
```

### Dashboard
```bash
cd nudge-dashboard
pnpm install
pnpm dev
```
