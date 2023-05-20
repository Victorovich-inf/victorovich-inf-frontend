FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY ./build ./
COPY ./.docker/config/default.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]