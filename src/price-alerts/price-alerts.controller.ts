import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { PriceAlertService } from './price-alerts.service';
import { AuthGuard } from '@nestjs/passport'; // Assuming you have an authentication guard

@Controller('price-alerts')
@UseGuards(AuthGuard('jwt')) // Protect the endpoint with authentication
export class PriceAlertController {
  constructor(private readonly priceAlertService: PriceAlertService) {}

  @Post()
  async createPriceAlert(
    @Body()
    body: {
      cryptoSymbol: string;
      targetPrice: number;
      alertType: 'above' | 'below';
    },
    @Request() req,
  ) {
    const userId = req.user.id; // Extract user ID from the request
    return this.priceAlertService.createPriceAlert(
      userId,
      body.cryptoSymbol,
      body.targetPrice,
      body.alertType,
    );
  }
}
