# Wekeza — Frontend

Wekeza is a personal finance and expense-tracking app. This is its React frontend, built to work with the Wekeza Django REST API: record income and expenses, see your balance, and understand where your money goes.

## Features

- Register, sign in, and sign out (JWT, with automatic token refresh)
- Dashboard: current balance, total income, total expenses, transaction count
- Recent transactions and spending-by-category / income-vs-expenses charts
- Add, edit, and delete transactions with validation and confirmation
- Transactions page with search, type / category / date-range filters, and pagination
- Responsive layout: sidebar on desktop, bottom tab bar with a central add button on mobile
- Skeleton loading states, friendly empty states, specific error messages, toast notifications
- Accessible modals (focus trap, Escape to close), visible focus states, reduced-motion support

All figures come from the backend. Nothing is hardcoded or mocked.

## Tech stack

- React 18 + Vite
- Tailwind CSS 3
- React Router 6
- Axios
- No chart library: breakdowns are plain CSS bars to keep the bundle small

## Installation

```bash
npm install
cp .env.example .env     # then edit if your backend is not on 127.0.0.1:8000
npm run dev
```

The app runs at **http://localhost:3000**.

## Environment variables

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Base URL of the Wekeza API, including `/api`, no trailing slash. Required. | `http://127.0.0.1:8000/api` |
| `VITE_CURRENCY` | ISO 4217 currency code used to display amounts. Optional, defaults to `KES`. | `USD` |

Vite only exposes variables prefixed with `VITE_`, and they are embedded in the built bundle. Never put secrets in them.

## Backend API configuration

Start the Django backend first (see its README), then:

1. Make sure `VITE_API_URL` points at it (default `http://127.0.0.1:8000/api`).
2. The backend must allow this app's origin. The dev server is pinned to port **3000**, which matches the backend's default `CORS_ALLOWED_ORIGINS`. If you serve the frontend elsewhere, add that origin to `CORS_ALLOWED_ORIGINS` in the backend `.env`.

Endpoints used: `/auth/register/`, `/auth/login/`, `/auth/refresh/`, `/auth/me/`, `/transactions/` (list, create, update, delete, `?type`, `?category`, `?date_from`, `?date_to`, `?search`, `?page`), `/transactions/recent/`, `/categories/`, `/dashboard/summary/`.

Authentication: tokens are stored in `localStorage`. An expired access token is refreshed automatically; if the refresh fails the user is signed out and sent to the login page.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server on port 3000 |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |

## Project structure

```text
src/
├── App.jsx                 # routes
├── main.jsx                # providers + entry
├── components/
│   ├── ui/                 # Button, Input, Select, Modal, Card, Skeleton, Toaster, ...
│   ├── dashboard/          # stat cards, spending breakdown
│   └── transactions/       # form, row, filters, add/edit and delete modals
├── context/                # AuthContext, ToastContext, TransactionActionsContext
├── hooks/                  # useAuth, useToast, useCategories, useDebounce, ...
├── layouts/                # AppLayout (sidebar / tab bar), AuthLayout, PageContainer
├── pages/                  # Login, Register, Dashboard, Transactions, NotFound
├── routes/                 # ProtectedRoute, PublicOnlyRoute
├── services/               # api.js (axios + refresh), auth.js, transactions.js
└── utils/                  # formatting and validation helpers
```

Adding, editing, and deleting go through one shared provider (`TransactionActionsContext`). It owns the modals and a `version` counter; pages refetch when it changes, so the dashboard and transactions list always reflect the latest data.

## Design notes

- Palette: pine (brand), emerald (income), clay (expenses), on a quiet off-white.
- Type: Space Grotesk for headings, Inter for UI, IBM Plex Mono for every money amount so digits align like a ledger.
# wekeza
