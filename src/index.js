import "./reset.css";
import "./global-styles.css";
import { fetchWeatherData } from "./modules/weather-service.js";
import { WeatherResponse } from "./weather-data.js";

// console.log(rigachikunData.dataForToday());
// let hereData;
// navigator.geolocation.getCurrentPosition(async (position)=>{
//     console.log(position);

//     hereData = await fetchWeatherData({latitude:position.coords.latitude,longitude:position.coords.longitude});
//     console.log(hereData);

// },(onEror)=>{
//     console.log(onEror);

// });

export const displayWeatherInformation = async (weatherData, index = 0) => {
  const data = weatherData.dataForTheNextFiveDays()[index];
  const dataForNextFewDays = weatherData.dataForTheNextFiveDays();
  const theIcon = await import(`./assets/icons/${data.icon}.svg`);
  const main = document.querySelector("main");
  const address = main.querySelector("span.address");
  address.textContent = weatherData.resolvedAddress;
  const todaySection = main.querySelector(".today");
  const firstPart = todaySection.querySelector(".first");
  const iconImage = firstPart.querySelector(".icon img");
  iconImage.src = theIcon.default;
  const temperature = firstPart.querySelector(".temperature .degrees span");
  temperature.textContent = Math.round(data.temp);
  const details = firstPart.querySelector(".details");
  const precipitationLevel = details.querySelectorAll("p span")[0];
  precipitationLevel.textContent = data.precipitation;
  const humidityLevel = details.querySelectorAll("p span")[1];
  humidityLevel.textContent = data.humidity;
  const windSpeedLevel = details.querySelectorAll("p span")[2];
  windSpeedLevel.textContent = data.windSpeed;
  const secondPart = todaySection.querySelector(".second");
  const summary = secondPart.querySelector(".summary");
  const day = summary.querySelector("h4");
  day.textContent = new Date(data.date).toLocaleDateString("en-US", {
    weekday: "long",
  });
  const summaryText = summary.querySelector("p");
  summaryText.textContent = data.description;

  const remainaingDays = main.querySelector(".remaining-days");
  remainaingDays.innerHTML = "";
  for (let index = 0; index < dataForNextFewDays.length; index++) {
    const element = dataForNextFewDays[index];
    const { date, icon, tempMax, tempMin } = element;
    const card = await dayCard({
      day: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
      icon: icon,
      index,
      max: tempMax,
      min: tempMin,
      onTap: function () {
        displayWeatherInformation(weatherData, index);
      },
    });
    remainaingDays.append(card);
  }
  remainaingDays.childNodes[index].classList.add("selected");
};

export const dayCard = async ({ day, icon, index, max, min, onTap }) => {
  const card = document.createElement("div");
  card.classList.add("day-card");
  card.dataset.index = index;
  const theIcon = await import(`./assets/icons/${icon}.svg`);

  card.innerHTML = `
                    <p>${day}</p>
                    <div class="img">
                    <img src="${theIcon.default}" alt="" />
                    </div>
                    <p class="temps"><span>${Math.round(max)}°</span> <span>${Math.round(min)}°</span></p>`;
  card.addEventListener("click", onTap);
  return card;
};

// let rigachikunData = await fetchWeatherData({ location: "rigachikun" });
let mockData = await import("./data.json");
displayWeatherInformation(new WeatherResponse(mockData));
