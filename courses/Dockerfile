FROM node:lts-alpine

RUN mkdir -p /home/node/courses/node_modules && chown -R node:node /home/node/courses

WORKDIR /home/node/courses

COPY --chown=node:node package.json yarn.* ./

USER node

RUN yarn

COPY --chown=node:node . .

EXPOSE 3333
