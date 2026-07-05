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
async function getWeatherData(city) {
    // Construct the URL pointing to the OpenWeatherMap server
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // Send a request to the server and wait for it to respond
    const response = await fetch(url);

    // Convert the raw data response into a readable JavaScript Object (JSON)
    const data = await response.json();

    // Log the data to the browser console so we can look inside it
    console.log(data);
}