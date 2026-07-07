// 1. Select the elements we need from the HTML page
const cityInput = document.querySelector('#city-input');
const searchButton = document.querySelector('#search-btn');
const cityNameDisplay = document.querySelector('#city-name');
const tempDisplay = document.querySelector('#temperature');
const descDisplay = document.querySelector('#description');

// 2. Add an event listener to the button
// 2. Add an event listener to the button
searchButton.addEventListener('click', () => {
    const typedCity = cityInput.value;

    if (typedCity.trim() === "") {
        alert("Please enter a city name!");
        return;
    }

    // Call our new API function instead of the dummy function
    getWeatherData(typedCity);

    // Clear the input box
    cityInput.value = "";
});

// // 3. Create a function to update the DOM elements
// function updateWeatherWithDummyData(city) {
//     // Dynamically change the text content of our HTML elements
//     cityNameDisplay.textContent = `Searching: ${city}...`;
//     tempDisplay.textContent = "--°C";
//     descDisplay.textContent = "Fetching live data...";

//     // Clear the input box so the user can type again
//     cityInput.value = "";
// }

// Paste your actual API key from OpenWeatherMap inside the quotes below

// 3. Create an Asynchronous function to fetch live data from the API
// 3. Create an Asynchronous function to fetch live data from the API
async function getWeatherData(city) {
    // Construct the URL pointing to the OpenWeatherMap server
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);

        // If the city wasn't found (like a typo), throw an error
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        // Update our floating card UI with real data!
        cityNameDisplay.textContent = data.name;
        tempDisplay.textContent = `${Math.round(data.main.temp)}°C`;
        descDisplay.textContent = data.weather[0].description;

    } catch (error) {
        // Handle errors gracefully if something goes wrong
        cityNameDisplay.textContent = "Error";
        tempDisplay.textContent = "--°C";
        descDisplay.textContent = error.message;
    }
}