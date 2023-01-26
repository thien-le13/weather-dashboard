const weatherApiRootUrl = "https://api.openweathermap.org";
const weatherApiKey = "d91f911bcf2c0f925fb6535547a5ddc9";

const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");
const weatherDiv = document.querySelector("#weather");

function fetchCoords(city) {
  var apiUrl = `${weatherApiRootUrl}/geo/1.0/direct?q=${city}&limit=5&appid=${weatherApiKey}`;
  fetch(apiUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if (data[0]) {
        fetchForecast(data[0]);
      }
    })
    .catch(function (err) {
      console.error(err);
    });
}

function fetchForecast(data) {
  const forecastUrl = `${weatherApiRootUrl}/data/2.5/forecast?lat=${data.lat}&lon=${data.lon}&appid=${weatherApiKey}`;
  fetch(forecastUrl)
    .then(function (res) {
      return res.json();
    })
    .then((data) => {
      const weather = data.list[0];
      console.log(weather);
      let tempF = document.createElement("p");
      let windMph = document.createElement("p");
      let humidity = document.createElement("p");
      console.log(tempF);
      tempF.innerHTML = `Temp: ${weather.main.temp} °F`;
      windMph.innerHTML = `Wind: ${weather.wind.speed} MPH`;
      humidity.innerHTML = `Humidity: ${weather.main.humidity} %`;

      weatherDiv.append(tempF, windMph, humidity);
    })
    .catch(function (err) {
      console.error(err);
    });
}

function onClick(e) {
  e.preventDefault();
  const city = searchInput.value;
  fetchCoords(city);
}

searchButton.addEventListener("click", onClick);
