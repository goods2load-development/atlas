FROM node:20-alpine AS base

RUN apk add --no-cache dumb-init

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

WORKDIR /app

COPY package*.json ./

FROM base AS deps
RUN npm install --ignore-scripts && npm cache clean --force

FROM base AS builder
RUN npm install --ignore-scripts
COPY . .

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

ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "start"]