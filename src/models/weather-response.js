import { WeatherData } from "./weather-data.js";

export class WeatherResponse {
  constructor(jsonData) {
    this.currentConditions = jsonData.currentConditions;
    this.resolvedAddress = jsonData.resolvedAddress;
    this.address = jsonData.address;
    this.timezone = jsonData.timezone;
    this.description = jsonData.description;
    this.latitude = jsonData.latitude;
    this.longitude = jsonData.longitude;
    this.feelsLike = this.currentConditions.feelslike;
    this.temp = this.currentConditions.temp;
    this.icon = this.currentConditions.icon;
    this.windSpeed = this.currentConditions.windspeed;
    this.days = jsonData.days;
  }

  dataForToday() {
    return new WeatherData(this.days[0]);
  }
  dataForTheNextFiveDays() {
    const nextFiveDays = this.days.slice(0, 7);
    const data = [];
    nextFiveDays.forEach((day) => data.push(new WeatherData(day)));
    return data;
  }
}
