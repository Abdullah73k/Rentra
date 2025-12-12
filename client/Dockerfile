FROM node:24.11.1-slim

WORKDIR /usr/src/app

RUN npm install pnpm -g

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 5173

CMD [ "pnpm", "run", "dev" ]