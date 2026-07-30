ARG NODE_VERSION=24.11.0
FROM node:${NODE_VERSION}-alpine AS base

ENV NODE_ENV=development
RUN corepack enable

WORKDIR /app

#build
FROM base AS build

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install

#Run
FROM base
COPY --from=build /app/node_modules ./node_modules

CMD ["pnpm", "run", "dev"]