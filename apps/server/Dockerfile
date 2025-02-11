FROM node:20-alpine

RUN corepack enable

WORKDIR /app/apps/server

COPY apps/server/package.json ./

RUN yarn install

COPY apps/server .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]

