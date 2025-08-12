import { WeatherResponse } from "../models/weather-response.js";

export async function fetchWeatherData({
  location,
  longitude,
  latitude,
  unit = "metric",
}) {
  const endPoint =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
  let baseUrl;

  if (location) {
    baseUrl = `${endPoint}/${location}?`;
  } else if (latitude && longitude) {
    baseUrl = `${endPoint}/${latitude},${longitude}?`;
  }
  const params = new URLSearchParams({
    unitGroup: unit,
    key: "8QETMS2AHLKTBC5XTQRN8HK7G",
    iconSet: "icons2",
    contentType: "json",
  });
  const request = new Request(`${baseUrl}${params}`, {
    mode: "cors",
    method: "GET",
  });

  try {
    const responseData = await fetch(request);
    if (responseData.status != 200) {
      if (responseData.status == 429) {
        throw new Error(`${responseData.status} API rate limit exceeded`);
      }
      throw new Error(`${responseData.status}`);
    }
    const jsonData = await responseData.json();
    console.log(jsonData);

    return new WeatherResponse(jsonData);
  } catch (error) {
    throw new Error(error);
  }
}
