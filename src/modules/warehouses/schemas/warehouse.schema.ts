import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AuditFieldsSchema } from 'src/common/schemas/audit-fields.schema';

export type WarehouseDocument = Warehouse & Document;

@Schema({ versionKey: false })
export class Warehouse {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, trim: true })
  code: string;

  @Prop({ trim: true })
  address?: string;

  @Prop({ default: true })
  is_active: boolean;

  @Prop({ default: false })
  is_deleted: boolean;

@Prop({ type: AuditFieldsSchema, required: true })
audit: {
  created_by: string;
  created_at: Date;
  updated_by?: string;
  updated_at?: Date;
  deleted_by?: string;
  deleted_at?: Date;
};

}

export const WarehouseSchema =
  SchemaFactory.createForClass(Warehouse);
