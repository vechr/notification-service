import { NotificationEmail } from '@prisma/client';

export default class ListNotificationEmailResponse
  implements NotificationEmail
{
  id: string;
  name: string;
  description: string | null;
  sender: string;
  recipient: string;
  createdAt: Date;
  updatedAt: Date;
}
