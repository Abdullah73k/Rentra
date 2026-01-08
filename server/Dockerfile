FROM node:24.11.1-slim AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN corepack enable && corepack enable npm && pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build


# Using node version 24.11.1 because it is the current LTS version
# Using Debian slim as the base OS for container since Alpine uses Musl instead of
# GLIBC which can cause some native module issues. I'm no pro yet, so Debian 
# which is used a lot will do
FROM node:24.11.1-slim

WORKDIR /app

# Only non-secret ENV vars go here as Dockerfile is pushed to Github and shared with others
# You inject secret ENV vars at runtime when running 'docker container run ... -e envvar=...'

ENV NODE_ENV=production

EXPOSE 4000

COPY package.json pnpm-lock.yaml ./

RUN corepack enable && corepack enable npm && pnpm install --frozen-lockfile --prod

COPY --from=builder /app/dist ./dist

USER node

CMD [ "node", "dist/index.js" ]
