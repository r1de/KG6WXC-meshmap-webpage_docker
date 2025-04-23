FROM caddy:alpine AS webserver

WORKDIR /app
COPY . .

RUN rm -rf /app/data && ln -s /var/www/html/meshmap/data /app/data

RUN addgroup --system caddy && \
adduser caddy --system -G caddy && \
chown -R caddy:caddy /app

USER caddy:caddy

CMD ["caddy", "run", "--config", "/app/Caddyfile"]

EXPOSE 8080
