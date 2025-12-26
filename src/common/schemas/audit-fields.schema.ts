import { Schema } from 'mongoose';

export const AuditFieldsSchema = new Schema(
  {
    created_by: { type: String, required: true },
    created_at: { type: Date, required: true },
    updated_by: String,
    updated_at: Date,
    confirmed_by: String,
    confirmed_at: Date,
    cancelled_by: String,
    cancelled_at: Date,
    cancellation_reason: String,

    deleted_by: String,
    deleted_at: Date,
    is_deleted: { type: Boolean, default: false },
  },
  { _id: false },
);
