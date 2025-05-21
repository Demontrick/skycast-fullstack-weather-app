import { useState, FormEvent } from 'react';
import './App.css';

// Define the shape of the weather data based on OpenWeatherMap response
interface Weather {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

function App() {
  const [country, setCountry] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [weatherResult, setWeatherResult] = useState<Weather | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getWeather = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setWeatherResult(null);
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8080/weather?city=${city}&country=${country}`,
        { method: 'GET', headers: { 'Cache-Control': 'no-cache' } }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data: Weather = await response.json();
      setWeatherResult(data);
    } catch (err) {
      setError('❌ Error fetching weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>🌦️ SkyCast Weather</h1>
      <form onSubmit={getWeather} className="weather-form">
        <input
          type="text"
          placeholder="Enter country (e.g., US)"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter city (e.g., New York)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <button type="submit">🔍 Get Weather</button>
      </form>

      {loading && <p className="loading">Loading weather...</p>}
      {error && <p className="error">{error}</p>}

      {weatherResult && (
        <div className="weather-card">
          <h2>
            {weatherResult.name}, {weatherResult.sys.country}
          </h2>
          <p className="temp">{(weatherResult.main.temp - 273.15).toFixed(1)}°C</p>
          <p className="description">{weatherResult.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherResult.weather[0].icon}@2x.png`}
            alt="Weather Icon"
          />
        </div>
      )}
    </div>
  );
}

export default App;
