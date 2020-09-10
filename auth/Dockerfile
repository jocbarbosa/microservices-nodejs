FROM node:lts-alpine

RUN mkdir -p /home/node/auth/node_modules && chown -R node:node /home/node/auth

WORKDIR /home/node/auth

COPY --chown=node:node package.json yarn.* ./

USER node

RUN yarn

COPY --chown=node:node . .

EXPOSE 3333

ENTRYPOINT [ "yarn", "start" ]
