import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import AuditService from '../audits/audit.service';
import { NotificationEmailController } from './notification-email.controller';
import { NotificationEmailService } from './notification-email.service';
import appConstant from '@/constants/app.constant';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: appConstant.NATS_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: [appConstant.NATS_URL],
          maxReconnectAttempts: 10,
          tls: {
            caFile: appConstant.NATS_CA,
            keyFile: appConstant.NATS_KEY,
            certFile: appConstant.NATS_CERT,
          },
        },
      },
    ]),
  ],
  controllers: [NotificationEmailController],
  providers: [NotificationEmailService, AuditService],
  exports: [NotificationEmailService],
})
export class NotificationEmailModule {}
