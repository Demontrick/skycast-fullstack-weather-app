import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import './index.css';

interface Weather {
  name: string;
  sys: { country: string };
  main: { temp: number; humidity: number; pressure: number };
  wind: { speed: number };
  weather: { description: string; icon: string }[];
}

function App() {
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [weatherResult, setWeatherResult] = useState<Weather | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getWeather = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWeatherResult(null);
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:8080/weather?city=${city}&country=${country}`,
        { method: 'GET', headers: { 'Cache-Control': 'no-cache' } }
      );
      if (!res.ok) throw new Error('Network error');
      const data: Weather = await res.json();
      setWeatherResult(data);
    } catch {
      setError('❌ Unable to fetch weather. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-blue-950 via-indigo-900 to-slate-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full max-w-lg bg-white/10 backdrop-blur-lg text-white rounded-3xl p-6 sm:p-10 shadow-2xl"
      >
        <motion.h1
          animate={{
            textShadow: ['0 0 10px #38bdf8', '0 0 20px #0ea5e9', '0 0 10px #38bdf8'],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-4xl font-bold text-center mb-6 tracking-wide"
        >
          <span role="img" aria-label="weather">🌦️</span> SkyCast <span className="text-sky-300">Forecast</span>
        </motion.h1>

        <motion.form
          onSubmit={getWeather}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="space-y-4"
        >
          <motion.input
            type="text"
            placeholder="🌍 Enter Country Code (e.g., US, PT)"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            className="w-full rounded-full px-5 py-3 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-shadow shadow-md"
            whileFocus={{ scale: 1.02 }}
          />
          <motion.input
            type="text"
            placeholder="🏙️ Enter City Name (e.g., Lisbon)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="w-full rounded-full px-5 py-3 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-shadow shadow-md"
            whileFocus={{ scale: 1.02 }}
          />
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#0284c7' }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-sky-500 text-white font-bold py-3 rounded-full flex items-center justify-center gap-2 transition duration-200"
          >
            🔍 Get Weather Forecast
          </motion.button>
        </motion.form>

        {loading && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-center mt-4 text-sky-300"
          >
            Fetching weather data...
          </motion.p>
        )}

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-4 text-red-400"
          >
            {error}
          </motion.p>
        )}

        {weatherResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: 1,
              scale: 1,
              boxShadow: [
                '0 0 10px rgba(14,165,233,0.2)',
                '0 0 20px rgba(14,165,233,0.3)',
                '0 0 10px rgba(14,165,233,0.2)',
              ],
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mt-8 bg-white/10 rounded-2xl p-6 text-center shadow-md backdrop-blur-sm"
          >
            <h2 className="text-2xl font-semibold mb-2">
              {weatherResult.name}, {weatherResult.sys.country}
            </h2>
            <p className="text-5xl font-bold text-sky-200 mb-2">
              {(weatherResult.main.temp - 273.15).toFixed(1)}°C
            </p>
            <p className="capitalize text-lg text-slate-200">
              {weatherResult.weather[0].description}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-sky-100">
              <p>💨 Wind Speed: {weatherResult.wind.speed} m/s</p>
              <p>💧 Humidity: {weatherResult.main.humidity}%</p>
              <p>📊 Pressure: {weatherResult.main.pressure} hPa</p>
            </div>
            <motion.img
              className="mx-auto mt-4 w-20 h-20"
              src={`https://openweathermap.org/img/wn/${weatherResult.weather[0].icon}@2x.png`}
              alt="Weather icon"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default App;
