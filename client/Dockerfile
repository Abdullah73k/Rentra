FROM node:24.11.1-slim AS base

RUN corepack enable && corepack enable npm



FROM base AS dep

WORKDIR /app

COPY package.json pnpm*.yaml ./

RUN pnpm install --frozen-lockfile



FROM base AS dev

WORKDIR /app

CMD [ "sh", "-lc", "[ -f node_modules/.modules.yaml ] && [ -f node_modules/react/package.json ] || pnpm install; pnpm run dev" ]



FROM base AS builder

WORKDIR /app

COPY --from=dep /app/node_modules ./node_modules

COPY . .

RUN pnpm run build



FROM base AS runner

RUN groupadd --system --gid 1001 reactjs && \
    useradd --system --uid 1001 --gid reactjs --shell /bin/false -m ts

WORKDIR /app

ENV PNPM_HOME=/pnpm

ENV PATH="${PNPM_HOME}:$PATH"

RUN mkdir -p /pnpm && chown ts:reactjs /pnpm

RUN pnpm add -g serve

ENV NODE_ENV=production

COPY --from=builder --chown=ts:reactjs /app/dist ./dist

EXPOSE 3000

USER ts

CMD [ "npx", "serve", "-s", "dist" ]