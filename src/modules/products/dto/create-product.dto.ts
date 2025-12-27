import {
  IsString,
  IsEnum,
  IsOptional,
  IsBoolean,
  IsObject,
} from 'class-validator';
import { ProductTrackingType } from 'src/common/constants/tracking-type.enum';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  sku: string;

  @IsString()
  unit_of_measure: string;

  @IsEnum(ProductTrackingType)
  tracking_type: ProductTrackingType;

  @IsBoolean()
  @IsOptional()
  is_variant_parent?: boolean;

  @IsString()
  @IsOptional()
  parent_product_id?: string;

  @IsObject()
  @IsOptional()
  variant_attributes?: Record<string, string>;
}
