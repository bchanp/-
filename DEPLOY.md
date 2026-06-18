# Online Demo Deployment

This project can run as one Node service:

- Express serves `/api/*`
- Express also serves the built React app from `backend/public`
- MySQL must be provided by a hosted database service

## Environment Variables

Set these on your hosting platform:

```txt
DATABASE_URL=mysql://USER:PASSWORD@HOST:3306/booking_system
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=7d
PORT=3000
FRONTEND_URL=https://your-demo-domain.example
```

## Build Command

```bash
npm run install:all && npm run build
```

## Start Command

```bash
npm run start:prod
```

## Database Setup

The production start command runs migrations and seed data automatically:

```bash
npm run start:prod
```

Demo admin:

```txt
admin@example.com
admin123
```

## Docker

```bash
docker build -t booking-system-demo .
docker run -p 3000:3000 --env-file backend/.env.production booking-system-demo
```
