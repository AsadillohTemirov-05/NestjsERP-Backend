import { Types } from 'mongoose';
import { AuditFields } from 'src/common/interfaces/audit-fields.interface';

export interface Warehouse {
  _id: Types.ObjectId; // ❗ string emas

  name: string;
  code: string;
  address?: string;

  is_active: boolean;
  is_deleted: boolean;

  audit: AuditFields;
}
