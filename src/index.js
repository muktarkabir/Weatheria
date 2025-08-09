import "./reset.css";
import "./global-styles.css";
import { fetchWeatherData } from "./modules/weather-service.js";

// let rigachikunData = await fetchWeatherData({ location: "rigachikun" });
// console.log(rigachikunData.dataForToday());
// let hereData;
// navigator.geolocation.getCurrentPosition(async (position)=>{
//     console.log(position);

//     hereData = await fetchWeatherData({latitude:position.coords.latitude,longitude:position.coords.longitude});
//     console.log(hereData);

// },(onEror)=>{
//     console.log(onEror);

// });

const test = {
  datetime: "2025-08-07",
  datetimeEpoch: 1754521200,
  tempmax: 29,
  tempmin: 21.7,
  temp: 25.2,
  feelslikemax: 33.5,
  feelslikemin: 21.7,
  feelslike: 26.4,
  dew: 23,
  humidity: 88,
  precip: 17.9,
  precipprob: 100,
  precipcover: 83.33,
  preciptype: ["rain"],
  snow: 0,
  snowdepth: 0,
  windgust: 10.8,
  windspeed: 20.5,
  winddir: 315.6,
  pressure: 1012.9,
  cloudcover: 73.7,
  visibility: 9.5,
  solarradiation: 235.5,
  solarenergy: 20.4,
  uvindex: 8,
  severerisk: 30,
  sunrise: "06:21:47",
  sunriseEpoch: 1754544107,
  sunset: "18:50:10",
  sunsetEpoch: 1754589010,
  moonphase: 0.44,
  conditions: "Rain, Partially cloudy",
  description: "Partly cloudy throughout the day with storms possible.",
  icon: "thunder-showers-day",
  stations: ["DNAA", "remote"],
  source: "comb",
};

export const displayWeatherInformation = (weatherData) => {
  const {
    date,
    description,
    temp,
    icon,
    humidity,
    windSpeed,
    tempInFahrenheit,
  } = weatherData.dataForToday();
  const theIcon = import(`./assets/icons/${icon}.svg`).then(
    (module) => module.default,
  );
  const main = document.querySelector("main");
  const address = main.querySelector("span.address");
  const todaySection = main.querySelector(".today");
  const firstPart = todaySection.querySelector(".first");
  const iconImage = firstPart.querySelector(".icon img");
  iconImage.src = theIcon;
  const temperature = firstPart.querySelector(".temperature.degrees span");
  const details = firstPart.querySelector(".details");
  const precipitationLevel = details.querySelectorAll("p span")[0];
  const humidityLevel = details.querySelectorAll("p span")[1];
  const windSpeedLevel = details.querySelectorAll("p span")[2];
  const secondPart = todaySection.querySelector(".second");
  const summary = secondPart.querySelector(".summary");
  const day = summary.querySelector("h4");
  const summaryText = summary.querySelector("p");
  summaryText.textContent = description;
};

export const dayCard = (day, icon, min, max) => {
  const card = document.createElement("div");
  card.classList.add("day-card");
  card.innerHTML = `
                    <p>${day}</p>
                    <div class="img">
                    <img src="${icon}" alt="" />
                    </div>
                    <p class="temps"><span>${max}°</span><span>${min}°</span></p>`;
  return card;
};
