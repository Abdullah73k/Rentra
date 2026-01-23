FROM node:24.11.1-slim AS base

RUN corepack enable && corepack enable npm

FROM base AS dep

WORKDIR /app

COPY package.json pnpm*.yaml ./

RUN pnpm install --frozen-lockfile


FROM base AS dev

WORKDIR /app

CMD [ "sh", "-lc", "[ -f node_modules/.modules.yaml ] && [ -f node_modules/express/package.json ] || pnpm install; pnpm run dev:container" ]


FROM base AS builder

WORKDIR /app

COPY --from=dep /app/node_modules ./node_modules

COPY . .

RUN pnpm run build


# Using node version 24.11.1 because it is the current LTS version
# Using Debian slim as the base OS for container since Alpine uses Musl instead of
# GLIBC which can cause some native module issues.
FROM base AS runner

WORKDIR /app

# Only non-secret ENV vars go here as Dockerfile is pushed to Github and shared with others
# You inject secret ENV vars at runtime when running 'docker container run ... -e envvar=...'
RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 10001 --gid nodejs --shell /bin/false express

RUN chown express:nodejs /app

ENV NODE_ENV=production

COPY package.json pnpm*.yaml ./

RUN pnpm install --frozen-lockfile --prod

COPY --from=builder --chown=express:nodejs /app/dist ./dist

EXPOSE 4000

USER express

CMD [ "node", "dist/index.js" ]
