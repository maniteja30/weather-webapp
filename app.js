// 1. Select the elements we need from the HTML page
const cityInput = document.querySelector('#city-input');
const searchButton = document.querySelector('#search-btn');
const cityNameDisplay = document.querySelector('#city-name');
const tempDisplay = document.querySelector('#temperature');
const descDisplay = document.querySelector('#description');

// 2. Add an event listener to the button
searchButton.addEventListener('click', () => {
    // Get the value the user typed into the input field
    const typedCity = cityInput.value;

    // Check if the user actually typed something
    if (typedCity.trim() === "") {
        alert("Please enter a city name!");
        return;
    }

    // Call a function to update our UI with dummy text for now
    updateWeatherWithDummyData(typedCity);
});

// 3. Create a function to update the DOM elements
function updateWeatherWithDummyData(city) {
    // Dynamically change the text content of our HTML elements
    cityNameDisplay.textContent = `Searching: ${city}...`;
    tempDisplay.textContent = "--°C";
    descDisplay.textContent = "Fetching live data...";

    // Clear the input box so the user can type again
    cityInput.value = "";
}