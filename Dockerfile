FROM caddy:alpine AS webserver

WORKDIR /app
COPY . .

RUN addgroup --system caddy && \
adduser caddy --system -G caddy && \
chown -R caddy:caddy /app

USER caddy:caddy

CMD ["caddy", "run", "--config", "/app/Caddyfile"]

EXPOSE 8080