import { displayWeatherInformation } from "./display-weather-data.js";
import { fetchWeatherData } from "./weather-service.js";

export function showWeatherDataForCurrentPosition() {
  let latitude = null;
  let longitude = null;
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      toggleLoader(true);
      const weatherForecast = await fetchWeatherData({ latitude, longitude });
      toggleLoader(false);
      document.querySelector("main").style.display = "grid";
      displayWeatherInformation(weatherForecast);
    },
    (error) => {
      showErrorScreen(error);
    },
  );
}

export function toggleLoader(show = true) {
  const loader = document.querySelector(".loader-container");
  if (show) {
    loader.style.display = "flex";
  } else {
    loader.style.display = "none";
  }
}

export function hideErrorScreen() {
  const errorScreen = document.querySelector(".error-screen");
  errorScreen.querySelector("h3").textContent = "";
  errorScreen.style.transform = "translateY(-200%)";
}

export function showErrorScreen(error) {
  toggleLoader(false);
  const errorScreen = document.querySelector(".error-screen");
  errorScreen.querySelector("h3").textContent = error;
  errorScreen.style.transform = "translateY(0%)";
}

export async function showWeatherData(location) {
  try {
    toggleLoader(true);
    const weatherForecast = await fetchWeatherData({ location });
    toggleLoader(false);
    document.querySelector("main").style.display = "grid";
    displayWeatherInformation(weatherForecast);
  } catch (error) {
    showErrorScreen(error);
  }
}
