function getWeather() {
    const apiKey = "55fca189f3344d17b2b145518250901"; 
    const city = document.getElementById("city").value;

    if (!city) {
        alert("Please enter a city name");
        return;
    }

    const currentWeatherUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
    const forecastUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=no&alerts=no`;

    // Fetch current weather
    fetch(currentWeatherUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error fetching current weather data");
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(error => {
            console.error(error);
            alert("Error fetching current weather data. Please try again.");
        });

    // Fetch hourly forecast
    fetch(forecastUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error fetching hourly forecast data");
            }
            return response.json();
        })
        .then(data => displayHourlyForecast(data.forecast.forecastday[0].hour))
        .catch(error => {
            console.error(error);
            alert("Error fetching hourly forecast data. Please try again.");
        });
}

function displayWeather(data) {
    const tempDivInfo = document.getElementById("temp-div");
    const weatherInfoDiv = document.getElementById("weather-info");
    const weatherIcon = document.getElementById("weather-icon");

    tempDivInfo.innerHTML = "";
    weatherInfoDiv.innerHTML = "";

    if (!data.location || !data.current) {
        weatherInfoDiv.innerHTML = `<p>Unable to retrieve weather data.</p>`;
        return;
    }

    const cityName = data.location.name;
    const temperature = data.current.temp_c;
    const description = data.current.condition.text;
    const iconUrl = data.current.condition.icon;

    tempDivInfo.innerHTML = `<p>${temperature}°C</p>`;
    weatherInfoDiv.innerHTML = `<p>${cityName}</p><p>${description}</p>`;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = description;
    weatherIcon.style.display = "block";
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById("hourly-forecast");
    hourlyForecastDiv.innerHTML = "";

    if (!hourlyData || hourlyData.length === 0) {
        hourlyForecastDiv.innerHTML = `<p>No hourly forecast available.</p>`;
        return;
    }

    hourlyData.slice(0, 8).forEach(hour => {
        const dateTime = new Date(hour.time_epoch * 1000);
        const hourLabel = dateTime.getHours();
        const temperature = hour.temp_c;
        const iconUrl = hour.condition.icon;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hourLabel}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;
        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block'; 
}