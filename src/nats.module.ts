import { Module } from '@nestjs/common';
import { MailModule } from './modules/mails/mail.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    MailModule,

    // plugins
    PrismaModule,
  ],
})
export class NatsModule {}
