import { IsMongoId, IsInt, Min, IsOptional, IsArray, ValidateNested, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class StockMovementDto {
  @IsMongoId()
  product_id: string;

  @IsMongoId()
  warehouse_id: string;

  @IsInt()
  quantity: number;

  @IsArray()
  @IsOptional()
  serial_numbers?: string[];

  @IsArray()
  @IsOptional()
  lot_codes?: string[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Date)
  expiration_dates?: Date[];
}
