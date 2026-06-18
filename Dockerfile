FROM node:24-alpine AS build

WORKDIR /app

COPY package.json ./
COPY backend/package*.json backend/
COPY frontend/package*.json frontend/

RUN npm --prefix backend ci
RUN npm --prefix frontend ci

COPY backend backend
COPY frontend frontend
COPY scripts scripts

RUN npm --prefix backend run prisma:generate
RUN npm run build

FROM node:24-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY backend/package*.json backend/
RUN npm --prefix backend ci --omit=dev

COPY --from=build /app/backend/src backend/src
COPY --from=build /app/backend/prisma backend/prisma
COPY --from=build /app/backend/public backend/public
COPY --from=build /app/backend/node_modules/.prisma backend/node_modules/.prisma

WORKDIR /app/backend

EXPOSE 3000

CMD ["node", "src/server.js"]

