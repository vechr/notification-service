<p align="center">
  <a href="" target="blank"><img src="https://svgshare.com/i/fmL.svg" width="320" alt="kreMES Logo" /></a>
</p>

# Edit your `.env` file
```
APP_PORT=3000
NATS_URL=nats://nats-server:4222

EMAIL_ID=support@kremes.com
EMAIL_PASS=kreMES
EMAIL_HOST=mail-dev
EMAIL_PORT=1025

DB_URL="postgresql://kreMES:123@host.docker.internal:5433/notification_db?schema=public&connect_timeout=300"
```

# Notification Service

```bash
yarn install
yarn prisma:sync
yarn db:migrate
yarn db:studio
yarn watch
```

# Build Image for Production
```bash
chmod +x ./docker/build.sh
./docker/build.sh
```