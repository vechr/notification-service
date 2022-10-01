import { Prisma, NotificationEmail } from '@prisma/client';
import { Expose, Type } from 'class-transformer';
import { IsObject, IsOptional, ValidateNested } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';
import { TListNotificationEmailRequestQuery } from '../requests/list-notification-email.request';
import { BaseQueryValidator, OperatorQuery } from '@/shared/types/query.type';

class ListNotificationEmailQueryField
  implements Prisma.NotificationEmailWhereInput
{
  @Expose()
  @ValidateNested()
  @IsOptional()
  @IsObject()
  @Type(() => OperatorQuery)
  id?: OperatorQuery;

  @Expose()
  @ValidateNested()
  @IsOptional()
  @IsObject()
  @Type(() => OperatorQuery)
  @ApiPropertyOptional({ type: OperatorQuery })
  name?: OperatorQuery;

  @Expose()
  @ValidateNested()
  @IsOptional()
  @IsObject()
  @Type(() => OperatorQuery)
  description?: OperatorQuery;

  @Expose()
  @ValidateNested()
  @IsOptional()
  @IsObject()
  @Type(() => OperatorQuery)
  sender?: OperatorQuery;

  @Expose()
  @ValidateNested()
  @IsOptional()
  @IsObject()
  @Type(() => OperatorQuery)
  recipient?: OperatorQuery;

  @Expose()
  @ValidateNested()
  @IsOptional()
  @IsObject()
  @Type(() => OperatorQuery)
  createdAt?: OperatorQuery;

  @Expose()
  @ValidateNested()
  @IsOptional()
  @IsObject()
  @Type(() => OperatorQuery)
  updatedAt?: OperatorQuery;
}

export class ListNotificationEmailQueryValidator extends BaseQueryValidator<NotificationEmail> {
  @ValidateNested()
  @IsOptional()
  @IsObject()
  @Type(() => ListNotificationEmailQueryField)
  @ApiPropertyOptional({ type: ListNotificationEmailQueryField })
  field?: ListNotificationEmailQueryField;
}

class FilterNotificationEmailQueryValidator
  implements TListNotificationEmailRequestQuery
{
  @ValidateNested()
  @IsOptional()
  @IsObject()
  @Type(() => ListNotificationEmailQueryValidator)
  filters: ListNotificationEmailQueryValidator;
}

export default class ListNotificationEmailValidator {
  @IsObject()
  params: Record<string, any>;

  @ValidateNested()
  @IsObject()
  @Type(() => FilterNotificationEmailQueryValidator)
  query: FilterNotificationEmailQueryValidator;

  @IsObject()
  body: Record<string, any>;
}
