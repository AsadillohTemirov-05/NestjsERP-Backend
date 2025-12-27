import { Types } from 'mongoose';

export interface Supplier {
  _id: string | Types.ObjectId;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  is_active: boolean;
  is_deleted: boolean;
  audit: {
    created_by: string;
    created_at: Date;
    updated_by?: string;
    updated_at?: Date;
    deleted_by?: string;
    deleted_at?: Date;
  };
}
