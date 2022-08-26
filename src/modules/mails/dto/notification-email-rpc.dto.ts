import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class NotificationEmailRPC {
  @IsArray()
  @IsNotEmpty()
  notificationEmailIdList: string[];

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsString()
  @IsOptional()
  htmlBodyContent: string;
}
