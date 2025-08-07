import "./reset.css";
import "./global-styles.css";
import { fetchWeatherData } from "./modules/weather-service.js";

let rigachikunData = await fetchWeatherData({ location: "rigachikun" });
console.log(rigachikunData);
