import { Test, TestingModule } from '@nestjs/testing';
import { PriceAlertsService } from './price-alerts.service';

describe('PriceAlertsService', () => {
  let service: PriceAlertsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PriceAlertsService],
    }).compile();

    service = module.get<PriceAlertsService>(PriceAlertsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
