# Reform İnovasyon Yapı — Repo Guide

## Two codebases in one repo

- **Static HTML site** (root) — Bootstrap 5 marketing site. Edit `index.html`, `assets/css/`, `assets/js/`. Open with Live Server (port 5501 preconfigured in `.vscode/settings.json`).
- **Next.js 16.2.9 app** (`frontend/`) — the modern admin panel + marketing pages. Uses App Router.
- **ASP.NET Core 10 API** (`backend/ReformApi/`) — PostgreSQL, JWT auth, EF Core.

## Running locally

```bash
# .NET API (backend)
cd backend/ReformApi
dotnet run    # serves on http://localhost:5000

# Next.js (frontend)
cd frontend
npm run dev   # serves on http://localhost:3000
```

## Key architectural facts

- **DB resets on every backend start**: `EnsureDeleted()` + `EnsureCreated()` + `DbSeeder.Seed()`. All data is lost on restart. Default login: `admin` / `admin123`.
- **Next.js rewrites `/api/*` → `http://localhost:5000/api/*`** (defined in `frontend/next.config.ts`). The frontend calls the API through its own origin.
- **PostgreSQL required**: connection string in `backend/ReformApi/appsettings.json` (`Host=localhost;Database=ReformInovasyon`).
- **Two route groups in the frontend**: `(marketing)` for public pages, `admin/` for authenticated admin panels.
- **Stub admin pages**: `admin/settings/page.tsx` returns `null`.
- **Bizimle Çalışın flow**: Marketing page at `/bizimle-calisin` posts to `POST /api/applications` using existing `Category`/`CategoryGroup` models. Admin sees these applications at `/admin/partners` and manages their categories (work types) at `/admin/partner-categories`.

## Frontend tech stack

- Next.js 16.2.9 (see `frontend/AGENTS.md` for breaking-changes warning), React 19.2.4, Tailwind CSS v4
- shadcn/ui (radix-nova style), lucide-react icons, sonner toasts
- `@/` → `src/` (path alias via tsconfig)

## Commands

```bash
# Frontend
npm run dev       # dev server
npm run build     # production build
npm run lint      # ESLint (eslint-config-next)

# Backend (from backend/ReformApi)
dotnet run        # dev server
```

## Important constraints

- Do not commit credentials. `appsettings.json` has hardcoded Postgres password (non-sensitive dev-only, but keep out of commits).
- No CI/CD workflows exist yet (`.github/workflows/` is empty).
- No tests configured anywhere in the repo.
- The static HTML site has its own separate pages (about.html, contact.html, refbrown.html, etc.) not served by the Next.js app.
