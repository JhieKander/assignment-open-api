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

  // 2. Get weather forecast for the next 7 days.
  async getForecast(city: string) {
    try {
      const response = await axios.get(`${this.baseUrl}forecast`, {
        params: {
          q: city,
          appid: this.apiKey,
          units: 'metric',
        },
      });
      return response.data;
    } catch (error) {
      throw new InternalServerErrorException('Unable to fetch forecast data');
    }
  }

  // 3. Get weather data by coordinates (latitude and longitude).
  async getWeatherByCoordinates(lat: number, lon: number) {
    try {
      const response = await axios.get(`${this.baseUrl}weather`, {
        params: {
          lat,
          lon,
          appid: this.apiKey,
          units: 'metric',
        },
      });
      return response.data;
    } catch (error) {
      throw new InternalServerErrorException('Unable to fetch weather data by coordinates');
    }
  }
}
