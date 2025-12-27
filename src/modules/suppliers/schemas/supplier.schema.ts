import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AuditFieldsSchema } from 'src/common/schemas/audit-fields.schema';
import type { AuditFields } from 'src/common/interfaces/audit-fields.interface';

export type SupplierDocument = Supplier & Document;

@Schema({ versionKey: false })
export class Supplier {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ trim: true })
  email?: string;

  @Prop({ trim: true })
  phone?: string;

  @Prop({ trim: true })
  address?: string;

  @Prop({ default: true })
  is_active: boolean;

  @Prop({ default: false })
  is_deleted: boolean;

  @Prop({ type: AuditFieldsSchema, required: true })
  audit: AuditFields;
}

export const SupplierSchema =
  SchemaFactory.createForClass(Supplier);
