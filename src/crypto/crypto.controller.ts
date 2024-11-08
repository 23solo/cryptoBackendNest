import { Controller, Get, UseGuards } from '@nestjs/common';
import { CryptoService } from './crypto.service'; // Adjust the import path as necessary
import { AuthGuard } from '@nestjs/passport'; // Assuming you have an authentication guard

@Controller('crypto') // Base route for this controller
@UseGuards(AuthGuard('jwt'))
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}
  @Get('prices') // Endpoint to get cryptocurrency prices
  async getPrices() {
    return this.cryptoService.getCryptoPrices();
  }
}
