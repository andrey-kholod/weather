const apiKey = '193e37609f47762581d50f38f0d61414',
   apiURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`,
   searchInput = document.querySelector('.search-box input'),
   searchButton = document.querySelector('.search-box button'),
   weatherItem = document.querySelector('.weather-image i'),
   weather = document.querySelector('.weather'),
   error = document.querySelector('.error');

async function checkWeather(city) {
   const response = await fetch(apiURL + city + `&appid=${apiKey}`);
   if (response.status == 404) {
      error.style.display = 'block';
      weather.style.display = 'none';
   }
   const data = await response.json();
   console.log(data, 'data');

   document.querySelector('.city').innerHTML = data.name;
   document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + ' С&deg';
   document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
   document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';
   if (data.weather[0].main == 'Clear') {
      weatherItem.className = 'fa-solid fa-sun';
   } else if (data.weather[0].main == 'Rain') {
      weatherItem.className = 'fa-solid fa-cloud-rain';
   } else if (data.weather[0].main == 'Mist') {
      weatherItem.className = 'fa-solid fa-cloud-mist';
   } else if (data.weather[0].main == 'Drizzle') {
      weatherItem.className = 'fa-solid fa-cloud-drizzle';
   }

   weather.style.display = 'block';
   error.style.display = 'none';
};


searchButton.addEventListener('click', () => {
   checkWeather(searchInput.value);
   searchInput.value = '';
});

searchInput.addEventListener("keydown", (e) => {
   if (e.keyCode === 13) {
      checkWeather(searchInput.value);
      searchInput.value = '';
   }
});
