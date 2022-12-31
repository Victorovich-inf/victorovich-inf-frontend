FROM nginx:stable-alpine

RUN apk update && apk upgrade --no-cache

RUN rm -rf /usr/share/nginx/html/*

COPY ./.docker/config/default.conf /etc/nginx/conf.d/default.conf
COPY ./build /usr/share/nginx/html

RUN chown -R nginx:nginx /var/cache/nginx /var/log/nginx /etc/nginx /usr/share/nginx/html

EXPOSE 8080
