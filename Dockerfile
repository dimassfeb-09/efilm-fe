# syntax=docker/dockerfile:1
FROM node:24-alpine AS build
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
ARG VITE_URL_API=https://efilm.140.245.120.205.sslip.io/api/
ARG VITE_FIREBASE_IMAGE_PATH=
ENV VITE_URL_API=${VITE_URL_API}
ENV VITE_FIREBASE_IMAGE_PATH=${VITE_FIREBASE_IMAGE_PATH}

RUN yarn build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
