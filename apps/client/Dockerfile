FROM node:20-alpine

RUN corepack enable

WORKDIR /app/apps/client

COPY apps/client/package.json ./

COPY .yarnrc.yml ./

RUN yarn install

COPY apps/client .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]

