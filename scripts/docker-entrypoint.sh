#!/bin/sh
set -e

echo "[entrypoint] Starting audit-rules server..."

# Ensure the data directory exists (Fly volume mount point)
mkdir -p /data

# Copy the Prisma schema to a temp location so db push can find it
# Prisma reads the schema relative to where it's invoked
cd /app/server

# Push schema to the database (creates tables if they don't exist)
echo "[entrypoint] Running Prisma db push..."
npx prisma db push --skip-generate --accept-data-loss 2>&1 || {
  echo "[entrypoint] WARNING: Prisma db push failed, continuing anyway..."
}

echo "[entrypoint] Starting Node.js server on port ${PORT:-8080}..."
exec node /app/server/dist/server.js "$@"
