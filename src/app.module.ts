import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { OpenTelemetryModule } from 'nestjs-otel';
import { TerminusModule } from '@nestjs/terminus';
import { WinstonModule } from 'nest-winston';
import HealthModule from './core/base/frameworks/health/health.module';
import { InstrumentMiddleware } from './core/base/frameworks/shared/middlewares/instrument.middleware';
import { winstonModuleOptions } from './core/base/frameworks/shared/utils/log.util';
import { RegistrationModule } from './modules/registration.module';

const OpenTelemetryModuleConfig = OpenTelemetryModule.forRoot({
  metrics: {
    hostMetrics: true,
    apiMetrics: {
      enable: true,
    },
  },
});

const WinstonLoggerModule = WinstonModule.forRootAsync({
  useFactory: () => winstonModuleOptions,
});

@Module({
  imports: [
    // framework
    TerminusModule,
    OpenTelemetryModuleConfig,
    WinstonLoggerModule,
    HealthModule,

    RegistrationModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(InstrumentMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
