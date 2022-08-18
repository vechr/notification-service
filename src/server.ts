import { NestFactory } from '@nestjs/core';
import { HttpModule } from './http.module';
import UnknownExceptionsFilter from './shared/filters/unknown.filter';
import HttpExceptionFilter from './shared/filters/http.filter';
import ContextInterceptor from './shared/interceptors/context.interceptor';
import appConstant from './constants/app.constant';
import log from './shared/utils/log.util';

const httpServer = new Promise(async (resolve, reject) => {
  try {
    const app = await NestFactory.create(HttpModule);
    app.enableCors();
    app.useGlobalFilters(
      new UnknownExceptionsFilter(),
      new HttpExceptionFilter(),
    );
    app.useGlobalInterceptors(new ContextInterceptor());

    await app
      .listen(appConstant.APP_PORT)
      .then(() =>
        log.info(`Http server started at PORT: ${appConstant.APP_PORT}`),
      );

    resolve(true);
  } catch (error) {
    reject(error);
  }
});

(async function () {
  await Promise.all([httpServer]);
})();
