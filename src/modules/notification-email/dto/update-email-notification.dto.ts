import { IsOptional, IsString } from 'class-validator';

export class UpdateNotificationEmailDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  sender: string;

  @IsString()
  @IsOptional()
  recipient: string;
}
