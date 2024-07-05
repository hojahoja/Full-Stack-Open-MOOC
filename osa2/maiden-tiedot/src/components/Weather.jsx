import weatherService from "../services/weatherService";
import { useEffect, useState } from "react";

const Weather = ({ area }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (area) {
      weatherService
        .getCapitalWeather(area)
        .then((weatherData) => setWeather(weatherData));
    }
  }, [area]);

  if (area == null || weather == null) return null;

  const weatherIcon = () => {
    try {
      return weather.weather[0].icon;
    } catch (error) {
      return "50n";
    }
  };

  return (
    <div>
      <h1>Weather in {weather.name}</h1>
      <p>temperature {weather.main.temp} Celcius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weatherIcon()}@2x.png`}
        alt="icon"
      />
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;
