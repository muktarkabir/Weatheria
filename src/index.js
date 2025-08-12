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
  try {
    toggleLoader(true);
    const weatherForecast = await fetchWeatherData({
      location: locationInput.value,
    });
    toggleLoader(false);
    document.querySelector("main").style.display = "grid";
    displayWeatherInformation(weatherForecast);
  } catch (error) {
    showErrorScreen(error);
  }
});

function showErrorScreen(error) {
  toggleLoader(false);
  const errorScreen = document.querySelector(".error-screen");
  errorScreen.querySelector("h3").textContent = error;
  errorScreen.style.transform = "translateY(0%)";
}

function hideErrorScreen() {
  const errorScreen = document.querySelector(".error-screen");
  errorScreen.querySelector("h3").textContent = "";
  errorScreen.style.transform = "translateY(-200%)";
}

document
  .querySelector(".error-screen button")
  .addEventListener("click", hideErrorScreen);

function toggleLoader(show = true) {
  const loader = document.querySelector(".loader-container");
  if (show) {
    loader.style.display = "flex";
  } else {
    loader.style.display = "none";
  }
}
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
