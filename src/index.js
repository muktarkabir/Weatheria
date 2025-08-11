import "./reset.css";
import "./global-styles.css";
import { fetchWeatherData } from "./modules/weather-service.js";
import { displayWeatherInformation } from "./modules/display-weather-data.js";
// console.log(rigachikunData.dataForToday());
// let hereData;
// navigator.geolocation.getCurrentPosition(async (position)=>{
//     console.log(position);

//     hereData = await fetchWeatherData({latitude:position.coords.latitude,longitude:position.coords.longitude});
//     console.log(hereData);

// },(onEror)=>{
//     console.log(onEror);

// });

// let rigachikunData = await fetchWeatherData({ location: "rigachikun" });
let mockData = await import("./data.json");
console.log(mockData);

let latitude = 10.5178;
let longitude = 7.40474;
// displayWeatherInformation(new WeatherResponse(mockData));
displayWeatherInformation(await fetchWeatherData({ location: "london" }));
