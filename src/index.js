import "./reset.css";
import "./global-styles.css";
import "./styles/main.css";
import "./styles/loader.css";
import {
  showWeatherData,
  showWeatherDataForCurrentPosition,
  hideErrorScreen,
} from "./modules/utilities.js";

const geoLocationButton = document.querySelector(".geolocation-logo");
const form = document.querySelector("form");
const locationInput = form.querySelector("input");
geoLocationButton.addEventListener("click", () => {
  showWeatherDataForCurrentPosition();
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  showWeatherData(locationInput.value);
});

document
  .querySelector(".error-screen button")
  .addEventListener("click", hideErrorScreen);
