import { Injectable } from '@nestjs/common';
import axios from 'axios';
import redis from 'src/redis'; // Adjust the import path as necessary

@Injectable()
export class CryptoService {
  // private readonly CACHE_KEY = 'crypto_prices';
  // private readonly CACHE_EXPIRATION = 60; // Cache expiration time in seconds

  async getCryptoPrices() {
    // Check if data is in cache
    // const cachedData = await redis.get(this.CACHE_KEY);
    // if (cachedData) {
    //   console.log('Fetching data from cache');
    //   return JSON.parse(cachedData); // Return cached data
    // }

    // If not in cache, fetch from API
    console.log('Fetching data from API');
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd',
    );
    const data = response.data;

    // Store the fetched data in cache
    // await redis.set(
    //   this.CACHE_KEY,
    //   JSON.stringify(data),
    //   'EX',
    //   this.CACHE_EXPIRATION,
    // );

    return data; // Return fetched data
  }
}
