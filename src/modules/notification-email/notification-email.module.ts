import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NotificationEmailController } from './notification-email.controller';
import { NotificationEmailService } from './notification-email.service';
import appConstant from '@/constants/app.constant';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'THINGS_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: [appConstant.NATS_URL],
        },
      },
    ]),
  ],
  controllers: [NotificationEmailController],
  providers: [NotificationEmailService],
  exports: [NotificationEmailService],
})
export class NotificationEmailModule {}
