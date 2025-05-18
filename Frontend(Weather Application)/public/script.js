document.addEventListener('DOMContentLoaded', function() {
    window.getWeather = async (event) => {
        event.preventDefault();
        const country = document.getElementById('country').value;
        const city = document.getElementById('city').value;

        try {
            console.log('Form submitted with:', { country, city });
            console.log('Fetching weather data...');
            const response = await fetch(`http://localhost:8080/weather?city=${city}&country=${country}`, {
                method: 'GET',
                headers: {
                    'Cache-Control': 'no-cache'
                }
            });
            console.log('Response status:', response.status);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Weather data:', data);
            displayWeather(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            displayWeather('Error fetching weather data');
        }
    };

    const displayWeather = (weatherResult) => {
        const weatherResultDiv = document.getElementById('weatherResult');
        if (typeof weatherResult === 'string') {
            weatherResultDiv.innerHTML = `<p>${weatherResult}</p>`;
        } else {
            // Convert temperature from Kelvin to Celsius
            const tempCelsius = (weatherResult.main.temp - 273.15).toFixed(2);
            // Use the exact description from backend
            const weatherDescription = weatherResult.weather[0].description;
            weatherResultDiv.innerHTML = `
                <h3>${weatherResult.name}</h3>
                <p>Temperature: ${tempCelsius} °C</p>
                <p>Weather: ${weatherDescription}</p>
            `;
        }
    };
});
