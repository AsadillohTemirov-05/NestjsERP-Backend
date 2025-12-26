import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseReceiptsService } from './purchase-receipts.service';

describe('PurchaseReceiptsService', () => {
  let service: PurchaseReceiptsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurchaseReceiptsService],
    }).compile();

    service = module.get<PurchaseReceiptsService>(PurchaseReceiptsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
