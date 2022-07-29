//display the current date and time
let now = new Date();

let currentTime = document.querySelector("p.currentTime");

let hours = now.getHours();
if (hours < 10) {
  hours = "0" + hours;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  hours = "0" + minutes;
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
currentTime.innerHTML =
  day + ", " + date + " " + month + ", " + hours + ":" + minutes;

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
  document.querySelector("h2").innerHTML = response.data.name;
  document.querySelector("#celsius").innerHTML = `${Math.round(
    response.data.main.temp
  )}°`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector(
    "#wind"
  ).innerHTML = `Wind: ${response.data.wind.speed} km/h`;
  document.querySelector(
    "#visibility"
  ).innerHTML = `Visibility: ${response.data.weather[0].description}`;
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