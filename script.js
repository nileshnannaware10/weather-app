const apiKey = "8fb7da02af2cffd8be1a1c608d528c74";
const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city");
const locationOutput = document.getElementById("location");
const temperatureOutput = document.getElementById("temperature");
const descriptionOutput = document.getElementById("description");
const windOutput = document.getElementById("wind");
const humidityOutput = document.getElementById("humidity");
const pressureOutput = document.getElementById("pressure");
const visibilityOutput = document.getElementById("visibility");
const lastUpdatedOutput = document.getElementById("last-updated");
const weatherIcon = document.getElementById("weather-icon");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = cityInput.value;
  fetchWeather(city);
});

async function fetchWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&units=metric&appid=${apiKey}`
    );
    const data = await response.json();
    if (data.cod === 200) {
      // Display basic weather info
      locationOutput.textContent = `${data.name}, ${data.sys.country}`;
      temperatureOutput.textContent = `${data.main.temp}°C`;
      descriptionOutput.textContent = data.weather[0].description;
      windOutput.querySelector("span").textContent = `${data.wind.speed} m/s`;
      humidityOutput.querySelector("span").textContent = `${data.main.humidity}%`;
      pressureOutput.querySelector("span").textContent = `${data.main.pressure} hPa`;
      visibilityOutput.querySelector("span").textContent = `${data.visibility / 1000} km`;
      lastUpdatedOutput.textContent = `Last Updated: ${new Date(data.dt * 1000).toLocaleString()}`;

      // Set weather icon
      const iconCode = data.weather[0].icon;
      weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${data.weather[0].description}">`;

      // Change background based on weather condition
      const weatherCondition = data.weather[0].main.toLowerCase();
      updateBackground(weatherCondition);
    } else {
      displayError();
    }
  } catch (error) {
    displayError();
    console.error("Error:", error);
  }
}

function updateBackground(condition) {
  let imageUrl = "default.jpg";
  if (condition.includes("clear")) {
    imageUrl = "clear-sky.jpg";
  } else if (condition.includes("cloud")) {
    imageUrl = "cloudy.jpg";
  } else if (condition.includes("rain")) {
    imageUrl = "rain.jpg";
  } else if (condition.includes("snow")) {
    imageUrl = "snow.jpg";
  }
  document.body.style.backgroundImage = `url('${imageUrl}')`;
}

function displayError() {
  locationOutput.textContent = `City not found. Please try again.`;
  temperatureOutput.textContent = "";
  descriptionOutput.textContent = "";
  windOutput.querySelector("span").textContent = "";
  humidityOutput.querySelector("span").textContent = "";
  pressureOutput.querySelector("span").textContent = "";
  visibilityOutput.querySelector("span").textContent = "";
  lastUpdatedOutput.textContent = "";
  weatherIcon.innerHTML = "";
}
