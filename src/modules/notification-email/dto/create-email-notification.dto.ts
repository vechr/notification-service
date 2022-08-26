import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNotificationEmailDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty()
  sender: string;

  @IsString()
  @IsNotEmpty()
  recipient: string;
}
