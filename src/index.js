import "./reset.css";
import "./global-styles.css";
import { fetchWeatherData } from "./modules/weather-service.js";

fetchWeatherData({ location: "rigachikun" });
