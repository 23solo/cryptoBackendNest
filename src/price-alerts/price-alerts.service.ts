import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PriceAlert } from '../db/priceAlert.entity';

@Injectable()
export class PriceAlertService {
  constructor(
    @InjectRepository(PriceAlert)
    private readonly priceAlertRepository: Repository<PriceAlert>,
  ) {}

  async createPriceAlert(
    userId: number,
    cryptoSymbol: string,
    targetPrice: number,
    alertType: 'above' | 'below',
  ) {
    console.log('User id is', userId);

    const priceAlert = this.priceAlertRepository.create({
      user: { id: userId }, // Assuming user ID is passed
      cryptoSymbol,
      targetPrice,
      alertType,
    });
    const id = this.priceAlertRepository.save(priceAlert);
    return { message: `Successfully added the price alert ${id}` }; // Return a success message
  }
}
