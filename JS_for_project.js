//display the current date and time
let now = new Date();

let currentTime = document.querySelector("li.currentTime");

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0 ${minutes}`;
}
let date = now.getDate();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
currentTime.innerHTML = `${day}, ${date} ${month}, ${hours}:${minutes}`;

//Add a search engine, when searching for a city
function search(city) {
  let apiKey = `4be40cda2262e1bbda336fc98ac66a97`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}
function searchFor(event) {
  event.preventDefault();
  let city = document.querySelector("#searchForCity").value;
  search(city);
}

let form = document.querySelector("#search");
form.addEventListener("submit", searchFor);

// api
function showTemp(response) {
  console.log(response.data);
  document.querySelector("h2").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = `${Math.round(
    celsiusTemperature
  )}`;
  celsiusTemperature = Math.round(response.data.main.temp);

  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector(
    "#wind"
  ).innerHTML = `Wind: ${response.data.wind.speed} km/h`;
  document.querySelector(
    "#visibility"
  ).innerHTML = `${response.data.weather[0].description}`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function currentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = `4be40cda2262e1bbda336fc98ac66a97`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
  console.log(currentPosition);
}

let locationButton = document.querySelector("#currentLocation");
locationButton.addEventListener("click", getLocation);

//showFahrenheitTemperature
function showFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheitLink");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click", showCelsiusTemperature);
