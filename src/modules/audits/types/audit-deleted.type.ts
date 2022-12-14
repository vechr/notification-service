export type TAuditDeletedPayload = {
  auditable: string;
  auditableId: string;
  previous?: Record<string, any>;
  incoming?: Record<string, any>;
  userId: string;
};
