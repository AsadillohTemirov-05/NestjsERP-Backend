import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AuditFieldsSchema } from 'src/common/schemas/audit-fields.schema';
import type { AuditFields } from 'src/common/interfaces/audit-fields.interface';

export type CustomerDocument = Customer & Document;

@Schema({
  versionKey: false,
})
export class Customer {

  @Prop({ type: AuditFieldsSchema, required: true })
  audit: AuditFields;

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
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
