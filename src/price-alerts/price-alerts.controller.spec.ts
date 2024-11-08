import { Test, TestingModule } from '@nestjs/testing';
import { PriceAlertsController } from './price-alerts.controller';

describe('PriceAlertsController', () => {
  let controller: PriceAlertsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PriceAlertsController],
    }).compile();

    controller = module.get<PriceAlertsController>(PriceAlertsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
