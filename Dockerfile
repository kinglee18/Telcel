FROM node:12.2.0 as node
VOLUME /data
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY --from=node /app/dist/cac /usr/share/nginx/html
COPY /nginx/nginx.conf /etc/nginx/conf.d/default.conf