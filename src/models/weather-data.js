export class WeatherData {
  constructor(data) {
    this.cloudCover = data.cloudcover;
    this.conditions = data.conditions;
    this.date = data.datetime;
    this.description = data.description;
    this.dew = data.dew;
    this.feelsLike = data.feelslike;
    this.feelsLikeMax = data.feelslikemax;
    this.feelsLikeMin = data.feelslikemin;
    this.humidity = data.humidity;
    this.icon = data.icon;
    this.pressure = data.pressure;
    this.severeRisk = data.severerisk;
    this.snow = data.snow;
    this.snowDepth = data.snowdepth;
    this.temp = data.temp;
    this.tempMax = data.tempmax;
    this.tempMin = data.tempmin;
    this.tempInFaherenheit = Number.parseInt(data.temp) * (9 / 5) * 32;
    this.tempMaxInFaherenheit = Number.parseInt(data.tempmax) * (9 / 5) * 32;
    this.tempMinInFaherenheit = Number.parseInt(data.tempmin) * (9 / 5) * 32;
    this.uvIndex = data.uvindex;
    this.visibility = data.visibility;
    this.windDir = data.winddir;
    this.windGust = data.windgust;
    this.windSpeed = data.windspeed;
    this.hours = data.hours;
    this.precipitation = data.precip;
    this.sunRise = data.sunrise;
    this.sunSet = data.sunset;
  }
}
