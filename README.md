# Travel Package Builder API

Node.js REST API for the Travel Package Builder frontend. Data is stored in MongoDB.

## Setup

```bash
cd travel-package-builder-node
npm install
cp .env.example .env
# Add your MONGODB_URI to .env
npm run seed
```

## Run

```bash
# Local development
npm run dev

# Production
npm run start
```

## Environment

Env files load in this order (later overrides earlier):

1. `.env.[NODE_ENV].local` (gitignored secrets)
2. `.env.[NODE_ENV]` (committed defaults)
3. `.env.local` (gitignored)
4. `.env` (gitignored — your local secrets)

| File | When used |
|------|-----------|
| `.env.development` | `npm run dev` — local URLs |
| `.env.production` | `npm run start` — live URLs |
| `.env` | Your MongoDB URI and overrides |

| Variable | Dev example | Prod example |
|----------|-------------|--------------|
| `NODE_ENV` | `development` | `production` |
| `PORT` | `3001` | `3001` |
| `BASE_URL` | `http://localhost:3001` | `https://api.yourdomain.com` |
| `FRONTEND_URL` | `http://localhost:5173` | `https://your-frontend.vercel.app` |
| `CLIENT_ORIGIN` | `http://localhost:5173` | `https://your-frontend.vercel.app` |
| `MONGODB_URI` | dev database | prod database |

### Going live

1. Set live values in `.env.production` or your host’s env panel
2. Set frontend `VITE_API_URL` to `BASE_URL + /api`
   - Backend: `BASE_URL=https://api.yourdomain.com`
   - Frontend: `VITE_API_URL=https://api.yourdomain.com/api`
3. Set `CLIENT_ORIGIN` to your deployed frontend URL for CORS

## Endpoints

| Method | Path |
|--------|------|
| GET | `/api/health` |
| GET/POST | `/api/folders` |
| GET/PUT/DELETE | `/api/folders/:id` |
| GET/POST | `/api/templates` |
| GET/PUT/DELETE | `/api/templates/:id` |
| GET/POST | `/api/packages` |
| GET/PUT/DELETE | `/api/packages/:id` |

## Frontend

```bash
# Terminal 1 - backend
npm run dev

# Terminal 2 - frontend
npm run api
npm run dev
```

Vite proxies `/api` → `http://localhost:3001` in development.
