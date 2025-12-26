import { Controller } from '@nestjs/common';
import { PurchaseReceiptsService } from './purchase-receipts.service';

@Controller('purchase-receipts')
export class PurchaseReceiptsController {
  constructor(private readonly purchaseReceiptsService: PurchaseReceiptsService) {}
}
