import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateNotificationEmailDto {
  @ApiProperty({
    example: 'email to John',
    description: 'Insert your name email notification in Here!',
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    example: 'This is for sending to John',
    description: 'Insert your description email notification in Here!',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    example: 'jack@gmail.com',
    description: 'Insert your sender email notification in Here!',
  })
  @IsString()
  @IsOptional()
  sender: string;

  @ApiProperty({
    example: 'john@gmail.com',
    description: 'Insert your john email notification in Here!',
  })
  @IsString()
  @IsOptional()
  recipient: string;
}
