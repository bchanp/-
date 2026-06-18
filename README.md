# Booking System

Online appointment booking system built with React, Node.js, Express, Prisma, and MySQL.

## Project Structure

```txt
booking-system
├── backend
└── frontend
```

## Requirements

- Node.js
- npm
- MySQL 8

On this Windows machine, use `npm.cmd` if PowerShell blocks `npm`.

## Backend

```bash
cd backend
npm.cmd install --cache .\.npm-cache
copy .env.example .env
npx.cmd prisma generate
npm.cmd run dev
```

Before running migrations, update `backend/.env` with your MySQL username and password, then create the database:

```sql
CREATE DATABASE booking_system CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Then run:

```bash
npx.cmd prisma migrate dev
npm.cmd run seed
```

Local test accounts:

```txt
Admin email: admin@example.com
Admin password: admin123
```

## Frontend

```bash
cd frontend
npm.cmd install --cache .\.npm-cache
npm.cmd run dev
```

If Vite dev server is blocked by local Windows permission checks, use the preview server:

```bash
npm.cmd run build
npm.cmd run preview
```

Open:

```txt
Frontend: http://127.0.0.1:5173
Backend health: http://127.0.0.1:3000/api/health
```

## Online Demo Build

This project is set up so the backend can serve the built frontend in production.

1. Build the frontend.
2. Copy `frontend/dist` into `backend/public`.
3. Start the backend.

Root commands:

```bash
npm.cmd run install:all
npm.cmd run build
npm.cmd run demo
```

## Docker

Build:

```bash
docker build -t booking-system-demo .
```

Run:

```bash
docker run -p 3000:3000 --env-file backend/.env.production booking-system-demo
```

Set `DATABASE_URL` to your hosted MySQL instance before deploying.
