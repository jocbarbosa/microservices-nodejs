FROM node:lts-alpine

RUN mkdir -p /home/node/profiles/node_modules && chown -R node:node /home/node/profiles

WORKDIR /home/node/profiles

COPY --chown=node:node package.json yarn.* ./

USER node

RUN yarn

COPY --chown=node:node . .

EXPOSE 3333

ENTRYPOINT [ "yarn", "start" ]
