import "./reset.css";
import "./global-styles.css";
import { fetchWeatherData } from "./modules/weather-service.js";
import { displayWeatherInformation } from "./modules/display-weather-data.js";

let mockData = await import("./data.json");
console.log(mockData);

const geoLocationButton = document.querySelector(".geolocation-logo");
geoLocationButton.addEventListener("click", getCurrentPosition);

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
      displayWeatherInformation(
        await fetchWeatherData({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      );
      geoLocationButton.removeEventListener("click", getCurrentPosition);
    },
    (onEror) => {
      console.log(onEror);
    },
  );
}
