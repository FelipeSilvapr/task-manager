# Base stage
FROM node:20-alpine AS base
RUN apk add --no-cache gcompat
WORKDIR /app

# Builder stage
FROM base AS builder
WORKDIR /app
COPY src/backend/package*json src/backend/tsconfig.json ./
COPY src/backend ./src/backend
RUN npm ci && \
    npm run build && \
    npm prune --production

# Runner stage
FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 hono
COPY --from=builder --chown=hono:nodejs /app/node_modules /app/node_modules
COPY --from=builder --chown=hono:nodejs /app/dist /app/dist
COPY --from=builder --chown=hono:nodejs /app/package.json /app/package.json
USER hono
EXPOSE 3000
CMD ["node", "/app/dist/infrastructure/api/api.js"]
