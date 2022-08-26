import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SendMailDto {
  @IsString()
  @IsNotEmpty()
  sender: string;

  @IsString()
  @IsNotEmpty()
  recipient: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsString()
  @IsOptional()
  htmlBodyContent: string;
}
