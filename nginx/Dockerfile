from nginx:latest 

#COPY /html /usr/share/nginx/html 

ENV DOCKERIZE_VERSION v0.7.0

RUN apk update --no-cache \
    && apk add --no-cache wget openssl \
    && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin \
    && apk del wget


ENTRYPOINT ["/docker-entrypoint.sh"] 
CMD ["nginx","-g","daemon off;"] 