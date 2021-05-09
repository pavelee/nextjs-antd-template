
ARG NODE_VERSION=14

FROM node:${NODE_VERSION}-alpine AS pwa_common

EXPOSE 3000

WORKDIR /usr/src/pwa

ENV NEXT_TELEMETRY_DISABLED 1

COPY package.json yarn.lock ./
RUN yarn

COPY . ./

VOLUME /usr/src/pwa/node_modules

FROM pwa_common AS pwa_dev

# RUN yarn global add @api-platform/client-generator

CMD ["yarn", "dev"]


FROM pwa_common AS pwa_prod

ENV NODE_ENV production
ARG REACT_APP_API_ENTRYPOINT

RUN set -eux; \
	yarn build

CMD ["yarn", "start"]
