import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseReceiptsController } from './purchase-receipts.controller';
import { PurchaseReceiptsService } from './purchase-receipts.service';

describe('PurchaseReceiptsController', () => {
  let controller: PurchaseReceiptsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseReceiptsController],
      providers: [PurchaseReceiptsService],
    }).compile();

    controller = module.get<PurchaseReceiptsController>(PurchaseReceiptsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
