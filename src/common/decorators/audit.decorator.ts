import { SetMetadata } from '@nestjs/common';

export const AUDIT_KEY = 'audit_action';

export interface AuditOptions {
  action: string;
  entity: string;
}

export const Audit = (options: AuditOptions) =>
  SetMetadata(AUDIT_KEY, options);