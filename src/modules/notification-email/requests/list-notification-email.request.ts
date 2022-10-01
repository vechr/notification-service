import { Prisma, NotificationEmail } from '@prisma/client';
import { IListRequestQuery } from '@/shared/types/query.type';

export type TListNotificationEmailRequestQuery = IListRequestQuery<
  NotificationEmail,
  Prisma.NotificationEmailWhereInput
>;
