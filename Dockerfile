# ── Stage 1: Install dependencies ─────────────────────────
FROM node:20-slim AS deps

WORKDIR /app

COPY package.json package-lock.json ./
COPY sdk/packages/node ./sdk/packages/node
RUN npm ci --legacy-peer-deps

COPY server/package.json server/package-lock.json* ./server/
RUN cd server && npm ci

# ── Stage 2: Build frontend + server ─────────────────────
FROM deps AS build

WORKDIR /app

COPY . .

# Build React frontend (prebuild generates static-projects.json)
RUN npm run build

# Build server (esbuild bundles server + shared into dist/server.js)
RUN cd server && npm run build

# Generate Prisma client (DATABASE_URL needed by prisma.config.ts, not actually connected)
RUN cd server && DATABASE_URL=file:./prisma/data/build.db npx prisma generate

# ── Stage 3: Production image ────────────────────────────
FROM node:20-slim AS production

RUN apt-get update && apt-get install -y --no-install-recommends \
    chromium \
    chromium-driver \
    fonts-liberation \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdrm2 \
    libgbm1 \
    libnss3 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libxshmfence1 \
    openssl \
  && rm -rf /var/lib/apt/lists/*

ENV CHROME_BIN=/usr/bin/chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

WORKDIR /app

# Copy built frontend
COPY --from=build /app/build ./build

# Copy compiled server bundle
COPY --from=build /app/server/dist ./server/dist

# Copy full server node_modules (includes Prisma client, engine binaries, and CLI deps)
COPY --from=build /app/server/node_modules ./server/node_modules

# Copy Prisma schema (needed for db push at startup)
COPY --from=build /app/server/prisma ./server/prisma
COPY --from=build /app/server/prisma.config.ts ./server/prisma.config.ts
COPY --from=build /app/server/package.json ./server/package.json

# Copy project configs (needed at runtime by ProjectManager)
COPY --from=build /app/server/projects ./server/projects

# Copy SDK tree (packages + tests) so tests can be executed from the cloud
COPY --from=build /app/sdk ./sdk

# Install Selenium Node test suite dependencies
RUN cd /app/sdk/tests/selenium/node && (npm ci 2>/dev/null || npm install)

# Copy entrypoint
COPY scripts/docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

# Create data directory for SQLite
RUN mkdir -p /data

ENV NODE_ENV=production
ENV PORT=8080
ENV PROJECT_ROOT=/app
ENV DATABASE_URL=file:/data/test-runner.db
ENV BASE_URL=http://localhost:8080
ENV HEADLESS=true

EXPOSE 8080

ENTRYPOINT ["/app/docker-entrypoint.sh"]
