export interface AuditFields {
  created_by: string;
  created_at: Date;
  updated_by?: string;
  updated_at?: Date;
  confirmed_by?: string;
  confirmed_at?: Date;
  cancelled_by?: string;
  cancelled_at?: Date;
  cancellation_reason?: string;

  // Soft delete property
  deleted_by?: string;
  deleted_at?: Date;
  is_deleted?: boolean;
}
