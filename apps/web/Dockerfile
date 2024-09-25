FROM node:18-alpine AS base

FROM base AS builder

WORKDIR /app

RUN apk update
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

RUN npm install -g turbo pnpm
COPY . .
RUN turbo prune web --docker
RUN pnpm install

ARG NEXT_PUBLIC_PB_URL_LOCAL
ARG NEXT_PUBLIC_PB_URL_REMOTE
ARG NEXT_PUBLIC_PB_USER_COLLECTION
ARG NEXT_PUBLIC_PB_IG_ACCOUNTS_COLLECTION
ARG NEXT_PUBLIC_PB_SCHEDULED_IG_REELS_COLLECTION
ARG NEXT_PUBLIC_PB_SCHEDULED_IG_REEL_UPLOADS_COLLECTION

ENV NEXT_PUBLIC_PB_URL_LOCAL=${NEXT_PUBLIC_PB_URL_LOCAL}
ENV NEXT_PUBLIC_PB_URL_REMOTE=${NEXT_PUBLIC_PB_URL_REMOTE}
ENV NEXT_PUBLIC_PB_USER_COLLECTION=${NEXT_PUBLIC_PB_USER_COLLECTION}
ENV NEXT_PUBLIC_PB_IG_ACCOUNTS_COLLECTION=${NEXT_PUBLIC_PB_IG_ACCOUNTS_COLLECTION}
ENV NEXT_PUBLIC_PB_SCHEDULED_IG_REELS_COLLECTION=${NEXT_PUBLIC_PB_SCHEDULED_IG_REELS_COLLECTION}
ENV NEXT_PUBLIC_PB_SCHEDULED_IG_REEL_UPLOADS_COLLECTION=${NEXT_PUBLIC_PB_SCHEDULED_IG_REEL_UPLOADS_COLLECTION}

RUN pnpm turbo build --env-mode=loose --filter=web...

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

CMD node apps/web/server.js
