# ---- Base Node ----
FROM node:21-alpine as base

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["npm", "run", "dev"]

# ---- Production ----
FROM base as production

ENV NODE_ENV=production

RUN npm run build --production

# Prisma generation and final setup
RUN npm install -g prisma

RUN prisma generate

CMD ["npm", "run", "start"]