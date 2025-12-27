import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProductTrackingType } from 'src/common/constants/tracking-type.enum';
import { AuditFieldsSchema } from 'src/common/schemas/audit-fields.schema';
import type { AuditFields } from 'src/common/interfaces/audit-fields.interface';

export type ProductDocument = Product & Document;

@Schema({ versionKey: false })
export class Product {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, trim: true })
  sku: string;

  @Prop({ required: true })
  unit_of_measure: string;

  @Prop({
    required: true,
    enum: ProductTrackingType,
  })
  tracking_type: ProductTrackingType;

  // Variant logic
  @Prop({ default: false })
  is_variant_parent: boolean;

  @Prop({ type: String, default: null })
  parent_product_id?: string | null;

  @Prop({ type: Object })
  variant_attributes?: Record<string, string>;

  // Business fields
  @Prop({ default: true })
  is_active: boolean;

  @Prop({ default: false })
  is_deleted: boolean;

  @Prop({ type: AuditFieldsSchema, required: true })
  audit: AuditFields;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
