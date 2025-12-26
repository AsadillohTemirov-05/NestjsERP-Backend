import { IsMongoId, IsInt, Min } from 'class-validator';

export class CheckAvailabilityDto {
  @IsMongoId()
  product_id: string;

  @IsMongoId()
  warehouse_id: string;

  @IsInt()
  @Min(1)
  quantity: number;
}
