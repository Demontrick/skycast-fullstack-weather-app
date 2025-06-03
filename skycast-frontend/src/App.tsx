import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import ParticlesBackground from './ParticlesBackground';
import AnimatedWeatherIcon from './AnimatedWeatherIcon';
import './index.css';

interface Weather {
  name: string;
  sys: { country: string };
  main: { temp: number; humidity: number; pressure: number };
  wind: { speed: number };
  weather: { description: string; icon: string; main: string }[];
}

function App() {
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [weatherResult, setWeatherResult] = useState<Weather | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true); // ✅ Unit toggle

  const getWeather = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWeatherResult(null);
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(
        `https://skycast-backend-qn3a.onrender.com/weather?city=${city}&country=${country}`,
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

  const getBgGradient = (type: string) => {
    switch (type.toLowerCase()) {
      case 'clear':
        return 'from-yellow-200 via-sky-300 to-blue-500';
      case 'clouds':
        return 'from-gray-400 via-slate-500 to-gray-700';
      case 'rain':
        return 'from-slate-700 via-gray-800 to-blue-900';
      case 'snow':
        return 'from-white via-sky-200 to-blue-300';
      case 'thunderstorm':
        return 'from-indigo-800 via-purple-800 to-black';
      default:
        return 'from-blue-950 via-indigo-900 to-slate-900';
    }
  };

  const bgGradient = weatherResult
    ? getBgGradient(weatherResult.weather[0].main)
    : 'from-blue-950 via-indigo-900 to-slate-900';

  return (
    <div className={`relative w-screen h-screen bg-gradient-to-br ${bgGradient} flex items-center justify-center px-4 overflow-hidden`}>
      {weatherResult && (
        <ParticlesBackground condition={weatherResult.weather[0].description} />
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-lg bg-white/10 backdrop-blur-lg text-white rounded-3xl p-6 sm:p-10 shadow-2xl"
      >
        <motion.h1
          animate={{
            textShadow: ['0 0 10px #38bdf8', '0 0 20px #0ea5e9', '0 0 10px #38bdf8'],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-4xl font-bold text-center mb-6 tracking-wide"
        >
          <span role="img" aria-label="weather">🌦️</span> SkyCast <span className="text-sky-300">Weather Forecast</span>
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
            placeholder="🌍 Country Name (e.g., US, Germany)"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            className="w-full rounded-full px-5 py-3 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-shadow shadow-md"
            whileFocus={{ scale: 1.02 }}
          />
          <motion.input
            type="text"
            placeholder="🏙️ City Name (e.g., Lisbon)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="w-full rounded-full px-5 py-3 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-shadow shadow-md"
            whileFocus={{ scale: 1.02 }}
          />
          <motion.button
  type="submit"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="w-full rounded-full bg-sky-500 text-white py-3 font-semibold shadow-md hover:bg-sky-600 transition-colors flex items-center justify-center h-[50px]"
>
  {loading ? <div className="loader" /> : 'Get Weather Forecast'}
</motion.button>
        </motion.form>

        {error && <p className="text-red-400 mt-4">{error}</p>}

        {weatherResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-center"
          >
            <h2 className="text-2xl font-bold mb-2">
              {weatherResult.name}, {weatherResult.sys.country}
            </h2>

            <AnimatedWeatherIcon
              iconCode={weatherResult.weather[0].icon}
              description={weatherResult.weather[0].description}
            />

            <p className="text-lg capitalize">{weatherResult.weather[0].description}</p>

            {/* ✅ Temperature with toggle */}
          <p className="mt-2 text-lg">
  🌡️ Temp:{" "}
  <span className="font-semibold">
    {isCelsius
      ? `${(weatherResult.main.temp - 273.15).toFixed(1)} °C`
      : `${(((weatherResult.main.temp - 273.15) * 9) / 5 + 32).toFixed(1)} °F`}
  </span>
</p>

<button
  type="button"
  onClick={() => setIsCelsius(!isCelsius)}
  className="mt-3 px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition"
>
  Switch to °{isCelsius ? "F" : "C"}
</button>


            <p className="mt-2">💧 Humidity: {weatherResult.main.humidity}%</p>

            <motion.p
              key={weatherResult.wind.speed}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-1"
            >
              🌬️ Wind: {weatherResult.wind.speed} m/s
            </motion.p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default App;
