FROM node:20-alpine AS build

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn build

FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/package.json /app/yarn.lock ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next/ ./.next
COPY --from=build /app/public/ ./public
COPY --from=build /app/next.config.ts ./
#COPY --from=build /app/.env ./

ENTRYPOINT ["yarn", "start"]
