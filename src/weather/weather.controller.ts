import { Controller, Get, Query, Param } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  // Endpoint for getting current weather by city name.
  @Get('current')
  async getCurrentWeather(@Query('city') city: string) {
    return this.weatherService.getCurrentWeather(city);
  }

  // Endpoint for getting weather forecast by city name
  @Get('forecast')
  async getForecast(@Query('city') city: string) {
    return this.weatherService.getForecast(city);
  }

  // Endpoint for getting weather by coordinates (lat, lon)
  @Get('coordinates/:lat/:lon')
  async getWeatherByCoordinates(
    @Param('lat') lat: number,
    @Param('lon') lon: number
  ) {
    return this.weatherService.getWeatherByCoordinates(lat, lon);
  }
}
