export async function fetchWeatherData({
  location,
  longitude,
  latitude,
  unit = "metric",
}) {
  let baseUrl;

  if (location) {
    baseUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?`;
  } else if (latitude && longitude) {
    baseUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?`;
  }
  const params = new URLSearchParams({
    unitGroup: unit,
    key: "8QETMS2AHLKTBC5XTQRN8HK7G",
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
    console.log(responseData);

    const jsonData = await responseData.json();
    console.log(jsonData);
  } catch (error) {
    console.error(error);
  }
}
