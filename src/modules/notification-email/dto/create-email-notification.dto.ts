import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNotificationEmailDto {
  @ApiProperty({
    example: 'email to John',
    description: 'Insert your name email notification in Here!',
  })
  @IsString()
  @IsNotEmpty()
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
  @IsNotEmpty()
  sender: string;

  @ApiProperty({
    example: 'john@gmail.com',
    description: 'Insert your john email notification in Here!',
  })
  @IsString()
  @IsNotEmpty()
  recipient: string;
}
