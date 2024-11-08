import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceAlert } from '../db/priceAlert.entity';
import { PriceAlertService } from './price-alerts.service';
import { PriceAlertController } from './price-alerts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PriceAlert])], // Import the PriceAlert entity
  providers: [PriceAlertService],
  controllers: [PriceAlertController],
})
export class PriceAlertModule {}
