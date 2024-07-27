import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from '@/core/base/domain/entities';

export class NotificationEmailRPC {
  @IsArray()
  @IsNotEmpty()
  notificationEmails: NotificationEmail[];

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsString()
  @IsOptional()
  htmlBodyContent: string;
}

export class NotificationEmail extends BaseEntity {
  sender: string;
  recipient: string;
}
