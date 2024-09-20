FROM node:20-alpine AS base

COPY package.json package-lock.json ./
RUN npm install

COPY index.js .
COPY public public


EXPOSE 3000

CMD ["node", "index.js"]