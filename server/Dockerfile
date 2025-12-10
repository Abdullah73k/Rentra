# Using node version 24.11.1 because it is the current LTS version
# Using Debian slim as the base OS for container since Alpine uses Musl instead of
# GLIBC which can cause some native module issues. I'm no pro yet, so Debian 
# which is used a lot will do
FROM node:24.11.1-slim

WORKDIR /usr/src/app

# Only non-secret ENV vars go here as Dockerfile is pushed to Github and shared with others
# You inject secret ENV vars at runtime when running 'docker container run ... -e envvar=...'

# ENV PORT=5000

RUN npm install pnpm -g

EXPOSE 4000 5000

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

CMD [ "pnpm", "run", "dev" ]
