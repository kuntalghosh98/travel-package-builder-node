# Travel Package Builder API

Node.js REST API for the Travel Package Builder frontend. Data is stored in MongoDB.

## Project structure

```
travel-package-builder-node/
├── data/
│   └── db.json                 # Seed data (imported into MongoDB)
├── scripts/
│   └── seed.js                 # Import db.json into MongoDB
├── src/
│   ├── index.js                # Server entry point
│   ├── app.js                  # Express app setup
│   ├── config/
│   │   ├── index.js            # Port, MongoDB URI, collection names
│   │   └── db.js               # MongoDB connection
│   ├── models/                 # Mongoose models
│   ├── repositories/
│   │   └── mongoRepository.js  # MongoDB CRUD
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   └── utils/
├── .env                        # Local env (not committed)
├── .env.example
└── package.json
```

## Setup

```bash
cd travel-package-builder-node
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run seed
```

## Run

```bash
npm run dev
```

API: `http://localhost:3001`

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

## Environment

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3001` | Server port |
| `MONGODB_URI` | — | MongoDB connection string (required) |
| `SEED_PATH` | `data/db.json` | Path to seed JSON file |

## Frontend

```bash
# Terminal 1 - backend
npm run dev

# Terminal 2 - frontend (from travel-package-builder)
npm run api
npm run dev
```

Vite proxies `/api` → `http://localhost:3001`.
