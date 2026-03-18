# The Lounge Booth — Website v2

Marketing website for The Lounge Booth, built with TanStack Start (SSR), Sanity CMS, and deployed on Vercel.

## Tech stack

- **Framework** — [TanStack Start](https://tanstack.com/start) with React 19
- **Routing** — TanStack Router (file-based)
- **CMS** — [Sanity](https://sanity.io) (Studio embedded at `/studio`)
- **Styling** — Tailwind CSS v4
- **Email** — Resend (contact form)
- **Package manager** — Bun
- **Deployment** — Vercel

## Getting started

### 1. Install dependencies

```bash
bun install
```

### 2. Set up environment variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `VITE_SANITY_PROJECT_ID` | Sanity project ID |
| `VITE_SANITY_DATASET` | Sanity dataset (default: `production`) |
| `SANITY_API_TOKEN` | Sanity API token (server-side only) |
| `RESEND_API_KEY` | Resend API key for contact form emails |
| `CONTACT_EMAIL_TO` | Address to receive contact form submissions |
| `CONTACT_EMAIL_FROM` | Sending address (must be a verified Resend domain) |
| `VITE_SITE_URL` | Public site URL |

### 3. Run the dev server

```bash
bun dev
```

### 4. Run the Sanity Studio

```bash
bun studio
```

The Studio is also embedded in the site at `/studio`.

## Project structure

```
app/
  components/   # UI and layout components
  routes/       # File-based routes (TanStack Router)
  hooks/        # Custom React hooks
  styles/       # Global CSS
lib/
  env.ts        # Zod-validated environment variables
sanity/
  schemas/      # Sanity content schemas
  lib/          # Sanity client and GROQ queries
public/         # Static assets
```

## Deployment

The site deploys to Vercel. Add all environment variables from `.env.example` to the Vercel project settings before deploying.

```bash
bun build
```
