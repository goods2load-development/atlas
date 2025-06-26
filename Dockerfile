FROM node:20-alpine AS base

RUN apk add --no-cache dumb-init

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

WORKDIR /app

COPY package*.json ./

FROM base AS deps
ENV HUSKY=0
RUN HUSKY=0 npm install --ignore-scripts && npm cache clean --force

FROM base AS builder
ARG NODE_ENV=production
ARG NEXT_PUBLIC_BASE_URL=https://api.stage.goods2load.com
ARG NEXT_PUBLIC_WEGLOT_API_KEY
ARG NEXT_PUBLIC_KEY_GET_GEOLOCATION
ARG NEXT_PUBLIC_DATALASTIC_API_KEY
ARG NEXT_PUBLIC_AVIATION_EDGE_API_KEY
ARG NEXT_PUBLIC_GOOGLE_API_KEY
ARG NEXT_PUBLIC_GEONAMES_API_KEY
ARG NEXT_PUBLIC_CLIENT_URL=https://api.stage.goods2load.com
ARG NEXT_PUBLIC_OPENWIDGET_ORGANIZATION_ID
ARG NEXT_PUBLIC_GOOGLE_GTAG_SECRET
ARG NEXT_PUBLIC_RAPID_HS_CODES_KEY
ARG NEXT_PUBLIC_TINY_KEY

ENV HUSKY=0
ENV NODE_ENV=$NODE_ENV
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_CLIENT_URL=$NEXT_PUBLIC_CLIENT_URL
ENV NEXTAUTH_URL=$NEXT_PUBLIC_CLIENT_URL
ENV NEXT_PUBLIC_KEY_GET_GEOLOCATION=$NEXT_PUBLIC_KEY_GET_GEOLOCATION
ENV NEXT_PUBLIC_DATALASTIC_API_KEY=$NEXT_PUBLIC_DATALASTIC_API_KEY
ENV NEXT_PUBLIC_AVIATION_EDGE_API_KEY=$NEXT_PUBLIC_AVIATION_EDGE_API_KEY
ENV NEXT_PUBLIC_GOOGLE_API_KEY=$NEXT_PUBLIC_GOOGLE_API_KEY
ENV NEXT_PUBLIC_GEONAMES_API_KEY=$NEXT_PUBLIC_GEONAMES_API_KEY
ENV NEXT_PUBLIC_OPENWIDGET_ORGANIZATION_ID=$NEXT_PUBLIC_OPENWIDGET_ORGANIZATION_ID
ENV NEXT_PUBLIC_WEGLOT_API_KEY=$NEXT_PUBLIC_WEGLOT_API_KEY
ENV NEXT_PUBLIC_GOOGLE_GTAG_SECRET=$NEXT_PUBLIC_GOOGLE_GTAG_SECRET
ENV NEXT_PUBLIC_RAPID_HS_CODES_KEY=$NEXT_PUBLIC_RAPID_HS_CODES_KEY
ENV NEXT_PUBLIC_TINY_KEY=$NEXT_PUBLIC_TINY_KEY

RUN HUSKY=0 npm install --ignore-scripts
COPY . .

RUN npm list @tinymce/tinymce-react || (echo "❌ @tinymce/tinymce-react not found" && exit 1)

RUN npm run build

FROM node:20-alpine AS production

RUN apk add --no-cache dumb-init curl

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

WORKDIR /app

COPY --from=deps --chown=nextjs:nodejs /app/node_modules ./node_modules

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

COPY --from=builder --chown=nextjs:nodejs /app/next.config.* ./

USER nextjs

EXPOSE 3000

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV NEXT_PUBLIC_BASE_URL=https://api.stage.goods2load.com
ENV NEXTAUTH_URL=https://api.stage.goods2load.com

ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "start"]