<p align="center">
  <a href="" target="blank"><img src="./public/logo.svg" width="320" alt="Vechr Logo" /></a>
</p>

# Edit your `.env` file
```
APP_PORT=3000
NATS_URL=nats://nats-server:4222

EMAIL_ID=support@vechr.com
EMAIL_PASS=Vechr
EMAIL_HOST=mail-dev
EMAIL_PORT=1025

DB_URL="postgresql://Vechr:123@host.docker.internal:5433/notification_db?schema=public&connect_timeout=300"
```

# Notification Service

```bash
yarn install
yarn db:migrate
yarn db:studio
yarn watch
```

# Build Image for Production
```bash
chmod +x ./docker/build.sh
./docker/build.sh
```