// 1. Select the elements we need from the HTML page
const cityInput = document.querySelector('#city-input');
const searchButton = document.querySelector('#search-btn');
const cityNameDisplay = document.querySelector('#city-name');
const tempDisplay = document.querySelector('#temperature');
const descDisplay = document.querySelector('#description');
const tempEmoji = document.querySelector('#temp-emoji');
const feelsLike = document.querySelector('#feels-like');
const humidity = document.querySelector('#humidity');
const windSpeed = document.querySelector('#wind-speed');
const visibility = document.querySelector('#visibility');
const weatherContent = document.querySelector('#weather-content');
const loader = document.querySelector('#loader');
const errorState = document.querySelector('#error-state');
const errorTitle = document.querySelector('#error-title');
const errorMessage = document.querySelector('#error-message');

// 2. Temperature-to-Emoji mapping function
function getTemperatureEmoji(temp) {
    if (temp <= -10) return '🥶';      // Freezing cold
    if (temp <= 0)   return '❄️';      // Below zero
    if (temp <= 10)  return '🧣';      // Cold, wrap up
    if (temp <= 18)  return '🌤️';     // Cool & pleasant
    if (temp <= 25)  return '😊';      // Comfortable
    if (temp <= 32)  return '☀️';      // Warm
    if (temp <= 40)  return '🔥';      // Hot
    return '🌋';                        // Extreme heat
}

// 3. Weather condition to emoji mapping (bonus feature)
function getWeatherConditionEmoji(conditionCode) {
    // OpenWeatherMap condition codes: https://openweathermap.org/weather-conditions
    if (conditionCode >= 200 && conditionCode < 300) return '⛈️';  // Thunderstorm
    if (conditionCode >= 300 && conditionCode < 400) return '🌧️';  // Drizzle
    if (conditionCode >= 500 && conditionCode < 600) return '🌧️';  // Rain
    if (conditionCode >= 600 && conditionCode < 700) return '🌨️';  // Snow
    if (conditionCode >= 700 && conditionCode < 800) return '🌫️';  // Atmosphere (fog, mist)
    if (conditionCode === 800)                       return '☀️';   // Clear sky
    if (conditionCode > 800 && conditionCode < 810)  return '☁️';   // Clouds
    return '🌡️';
}

// 4. Helper to show/hide states
function showLoader() {
    loader.classList.add('visible');
    weatherContent.classList.remove('visible');
    errorState.classList.remove('visible');
}

function showContent() {
    loader.classList.remove('visible');
    weatherContent.classList.remove('visible');
    errorState.classList.remove('visible');
    // Small delay for smooth transition
    requestAnimationFrame(() => {
        weatherContent.classList.add('visible');
    });
}

function showError(title, message) {
    loader.classList.remove('visible');
    weatherContent.classList.remove('visible');
    errorState.classList.remove('visible');
    errorTitle.textContent = title;
    errorMessage.textContent = message;
    requestAnimationFrame(() => {
        errorState.classList.add('visible');
    });
}

// 5. Add event listeners
searchButton.addEventListener('click', () => {
    const typedCity = cityInput.value;
    if (typedCity.trim() === "") {
        showError("No City Entered", "Please type a city name to search.");
        return;
    }
    getWeatherData(typedCity);
    cityInput.value = "";
});

// Also trigger search on Enter key
cityInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        searchButton.click();
    }
});

// 6. Asynchronous function to fetch live data from the API
async function getWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    showLoader();

    try {
        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("City not found. Check the spelling and try again.");
            }
            throw new Error("Unable to fetch weather data. Please try later.");
        }

        const data = await response.json();

        const temp = Math.round(data.main.temp);
        const feelsLikeTemp = Math.round(data.main.feels_like);
        const conditionCode = data.weather[0].id;
        const windSpeedMs = data.wind.speed;
        const visibilityM = data.visibility;

        // Update the main display
        cityNameDisplay.textContent = data.name;
        tempDisplay.textContent = `${temp}°C`;
        descDisplay.textContent = data.weather[0].description;

        // Set emoji based on temperature
        tempEmoji.textContent = getTemperatureEmoji(temp);
        // Re-trigger the entrance animation
        tempEmoji.style.animation = 'none';
        tempEmoji.offsetHeight; // Force reflow
        tempEmoji.style.animation = '';

        // Update detail cards
        feelsLike.textContent = `${feelsLikeTemp}°C`;
        humidity.textContent = `${data.main.humidity}%`;
        windSpeed.textContent = `${(windSpeedMs * 3.6).toFixed(1)} km/h`;
        visibility.textContent = `${(visibilityM / 1000).toFixed(1)} km`;

        showContent();

    } catch (error) {
        showError("Oops!", error.message);
    }
}

// 7. Show default hint on initial load
(function initDefaultState() {
    // Show a default hint card on load
    const card = document.querySelector('#weather-card');
    const defaultHint = document.createElement('div');
    defaultHint.classList.add('default-hint');
    defaultHint.id = 'default-hint';
    defaultHint.innerHTML = `
        <div class="hint-icon">🔍</div>
        <p>Type a city name above and hit search<br>to see the weather!</p>
    `;
    card.appendChild(defaultHint);

    // Remove the hint on first successful search
    const originalShowContent = showContent;
    const originalShowError = showError;

    showContent = function () {
        const hint = document.querySelector('#default-hint');
        if (hint) hint.remove();
        originalShowContent();
    };

    showError = function (title, message) {
        const hint = document.querySelector('#default-hint');
        if (hint) hint.remove();
        originalShowError(title, message);
    };
})();