import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { AuditFieldsSchema } from 'src/common/schemas/audit-fields.schema';
import  type { AuditFields } from 'src/common/interfaces/audit-fields.interface';

export type InventoryDocument = Inventory & Document;

@Schema({ versionKey: false })
export class Inventory {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Warehouses', required: true })
  warehouse_id: Types.ObjectId;

  @Prop({ default: 0 })
  quantity: number;

@Prop({ type: AuditFieldsSchema, required: true })
audit: AuditFields;


  // Tracking details
  @Prop({ default: [] })
  serial_numbers?: string[];

  @Prop({ default: [] })
  lot_codes?: string[];

  @Prop({ default: [] })
  expiration_dates?: Date[];
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);
