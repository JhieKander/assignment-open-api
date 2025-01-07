import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';

@Injectable()
export class WeatherService {
  private readonly apiKey: string = '6df06ffa3263b89c9223e7852f03afdb'; // Use your actual API key here
  private readonly baseUrl: string = 'http://api.openweathermap.org/data/2.5/';

  constructor() {}

  // 1. Get current weather data for a city.
  async getCurrentWeather(city: string) {
    try {
      const response = await axios.get(`${this.baseUrl}weather`, {
        params: {
          q: city,
          appid: this.apiKey,
          units: 'metric', // Get temperature in Celsius
        },
      });
      return response.data;
    } catch (error) {
      throw new InternalServerErrorException('Unable to fetch weather data');
    }
  }
}
