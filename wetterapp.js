const api = {
    key: "3358af6a45d9071e874274ae512ea89d",
    base: "https://api.openweathermap.org/data/2.5/",
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].description;
      if (weather_el.innerText === "scattered clouds") {
        document.querySelector('.weather').innerHTML = "Leicht bewölkt";
      }
      if (weather_el.innerText === "broken clouds") {
        document.querySelector('.weather').innerHTML = "Bewölkt";
      }
      if (weather_el.innerText === "overcast clouds") {
        document.querySelector('.weather').innerHTML = "Stark bewölkt";
      }
      if (weather_el.innerText === "few clouds") {
        document.querySelector('.weather').innerHTML = "Leicht bewölkt";
      }

      if (weather_el.innerText === "clear sky") {
        document.querySelector('.weather').innerHTML = "Klar";
      }
      if (weather_el.innerText === "mist") {
        document.querySelector('.weather').innerHTML = "Nebel";
      }
      if (weather_el.innerText === "haze") {
        document.querySelector('.weather').innerHTML = "Leichter Nebel";
      }

      if (weather_el.innerText === "light rain") {
        document.querySelector('.weather').innerHTML = "Leichter Regen";
      }


    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
}

function dateBuilder (d) {
    let months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

    let days = ["Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag","Sonntag"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date}. ${month} ${year}`;
}