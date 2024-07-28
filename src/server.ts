import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import HttpExceptionFilter from '@filters/http.filter';
import UnknownExceptionsFilter from '@filters/unknown.filter';
import * as expressWinston from 'express-winston';
import { AppModule } from './app.module';
import otelSDK from './tracing';
import appConfig from './config/app.config';
import log, {
  winstonExpressOptions,
} from './core/base/frameworks/shared/utils/log.util';

const printConfig = () => {
  log.info(`Connected to Grafana Loki: ${appConfig.LOKI_HOST}`);
  log.info(`Connected to Grafana Tempo: ${appConfig.OTLP_HTTP_URL}`);
};

const appServer = new Promise(async (resolve, reject) => {
  try {
    const app = await NestFactory.create(AppModule);

    // Connect to Broker NATS
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.NATS,
      options: {
        servers: [appConfig.NATS_URL],
        maxReconnectAttempts: 10,
        tls: {
          caFile: appConfig.NATS_CA,
          keyFile: appConfig.NATS_KEY,
          certFile: appConfig.NATS_CERT,
        },
      },
    });

    // Enable CORS for security
    app.enableCors({
      credentials: true,
      origin: true,
    });

    // Use Exception Filter
    app.useGlobalFilters(
      new UnknownExceptionsFilter(),
      new HttpExceptionFilter(),
    );

    // Ignore Favicon
    app.use(ignoreFavicon);

    const port = process.env.PORT ?? appConfig.APP_PORT;

    // express-winston logger makes sense BEFORE the router
    app.use(expressWinston.logger(winstonExpressOptions));

    await app
      .startAllMicroservices()
      .then(() => log.info(`Nest app NATS started at :${appConfig.NATS_URL} `));

    await app
      .listen(port)
      .then(() => log.info(`Nest app http started at PORT: ${port}`));

    // print config
    printConfig();

    resolve(true);
  } catch (error) {
    reject(error);
  }
});

(async function () {
  if (appConfig.OTLP_HTTP_URL && appConfig.OTLP_HTTP_URL != '') otelSDK.start();
  await Promise.all([appServer]);
})();

function ignoreFavicon(req: any, res: any, next: any) {
  if (req.originalUrl.includes('favicon.ico')) {
    res.status(204).end();
  }
  next();
}
