FROM node:18-alpine AS base

WORKDIR /app
COPY ./src/ .
RUN npm install --location=global npm@latest

EXPOSE 4000

CMD npm install && npm run start