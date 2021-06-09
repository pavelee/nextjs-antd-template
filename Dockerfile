ARG NODE_VERSION=14

FROM node:${NODE_VERSION}-alpine AS pwa_common

EXPOSE 3000

WORKDIR /usr/src/pwa

# disable sending telemtry data to next.js devs :(
ENV NEXT_TELEMETRY_DISABLED 1

COPY package.json yarn.lock ./
RUN yarn

COPY . ./

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

RUN chown -R nextjs:nodejs .

VOLUME /usr/src/pwa/node_modules

USER nextjs

FROM pwa_common AS pwa_dev

CMD ["yarn", "dev"]

FROM pwa_common AS pwa_prod

ENV NODE_ENV production

ARG REACT_APP_API_ENTRYPOINT

#@TODO production build  

CMD ["yarn", "start"]