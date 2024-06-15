FROM node:20-alpine as build

WORKDIR /app

RUN npm i -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM node:20-alpine

WORKDIR /app

RUN npm i -g pnpm

COPY --from=build /app/dist /app/dist
COPY . .
RUN pnpm install --frozen-lockfile

EXPOSE 5000

CMD ["pnpm", "start"]
