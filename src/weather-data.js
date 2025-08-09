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
    this.source = data.source;
    this.temp = data.temp;
    this.tempInFaherenheit = Number.parseInt(data.temp) * (9 / 5) * 32;
    this.tempMax = data.tempmax;
    this.tempMin = data.tempmin;
    this.uvIndex = data.uvindex;
    this.visibility = data.visibility;
    this.windDir = data.winddir;
    this.windGust = data.windgust;
    this.windSpeed = data.windspeed;
  }
}
