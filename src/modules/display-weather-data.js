import { dayCard } from "./day-card.js";
import Chart from "chart.js/auto";

export const displayWeatherInformation = async (weatherData, index = 0) => {
  const data = weatherData.dataForTheNextFiveDays()[index];
  //First day in the array i.e Today
  const dataForNextFewDays = weatherData.dataForTheNextFiveDays();
  const theIcon = await import(`../assets/icons/${data.icon}.svg`);
  const main = document.querySelector("main");
  const address = main.querySelector("span.address");
  address.textContent = weatherData.resolvedAddress;
  const todaySection = main.querySelector(".today");
  const firstPart = todaySection.querySelector(".first");
  const iconImage = firstPart.querySelector(".icon img");
  iconImage.src = theIcon.default;
  const temperature = firstPart.querySelector(".temperature .degrees span");
  temperature.textContent = Math.round(data.temp);
  const details = firstPart.querySelector(".details");
  const precipitationLevel = details.querySelectorAll("p span")[0];
  precipitationLevel.textContent = data.precipitation;
  const humidityLevel = details.querySelectorAll("p span")[1];
  humidityLevel.textContent = data.humidity;
  const windSpeedLevel = details.querySelectorAll("p span")[2];
  windSpeedLevel.textContent = data.windSpeed;
  const secondPart = todaySection.querySelector(".second");
  const summary = secondPart.querySelector(".summary");
  const day = summary.querySelector("h4");
  day.textContent = new Date(data.date).toLocaleDateString("en-US", {
    weekday: "long",
  });
  //Updating information to reflect the current time, but only for today
  if (index == 0) {
    day.textContent += ` ${weatherData.currentConditions.datetime.slice(0, 5)}`;
    temperature.textContent = Math.round(weatherData.currentConditions.temp);
  }
  const summaryText = summary.querySelector("p");
  summaryText.textContent = data.conditions;

  //When a user searches for a location, the canvas needs to be destroyed to be resued,
  //There isnt an easy way to do that from the way the code is written. This solution makes sure
  //the canvas is fresh everytime the function is called.
  const stats = document.querySelector(".stats");
  stats.innerHTML = null;
  const canvas = document.createElement("canvas");
  canvas.style.height = "100px";
  canvas.style.width = "754px";
  canvas.id = "hours";
  stats.append(canvas);
  //Showing weather data throughout the day using a line graph.
  let myChart = new Chart(canvas, {
    type: "line",
    options: {
      animation: true,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: true,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          grid: {
            display: false,
          },
        },
      },
    },
    data: {
      labels: data.hours.map((hour) => hour.datetime.slice(0, 2)),
      datasets: [
        {
          label: "Temperate in °C",
          data: data.hours.map((hour) => hour.temp),
          fill: true,
          backgroundColor: ["rgb(255, 215, 0,0.4)"],
          borderColor: "gold",
        },
      ],
    },
  });

  const remainaingDays = main.querySelector(".remaining-days");
  remainaingDays.innerHTML = "";
  for (let index = 0; index < dataForNextFewDays.length; index++) {
    const element = dataForNextFewDays[index];
    const { date, icon, tempMax, tempMin } = element;
    const card = await dayCard({
      day: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
      icon: icon,
      index,
      max: tempMax,
      min: tempMin,
      onTap: function () {
        myChart.destroy();
        displayWeatherInformation(weatherData, index);
      },
    });
    remainaingDays.append(card);
  }
  remainaingDays.childNodes[index].classList.add("selected");
};
