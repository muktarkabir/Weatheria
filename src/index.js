import "./reset.css";
import "./global-styles.css";
import "./styles/main.css";
import "./styles/loader.css";
import { fetchWeatherData } from "./modules/weather-service.js";
import { displayWeatherInformation } from "./modules/display-weather-data.js";

let mockData = await import("./data.json");
console.log(mockData);
let latitude = null;
let longitude = null;

const geoLocationButton = document.querySelector(".geolocation-logo");
geoLocationButton.addEventListener("click", () => {
  if (!latitude && !longitude) getCurrentPosition();
});

const form = document.querySelector("form");
const locationInput = form.querySelector("input");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  displayWeatherInformation(
    await fetchWeatherData({ location: locationInput.value }),
  );
});
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      displayWeatherInformation(
        await fetchWeatherData({ latitude, longitude }),
      );
    },
    (onEror) => {
      console.log(onEror);
    },
  );
}
