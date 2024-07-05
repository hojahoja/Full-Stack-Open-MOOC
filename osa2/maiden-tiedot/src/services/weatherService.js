import axios from "axios";

const api_key = import.meta.env.VITE_API_KEY;
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

const getCapitalWeather = ([latitude, longtitude]) =>
  axios
    .get(
      `${baseUrl}?lat=${latitude}&lon=${longtitude}&appid=${api_key}&units=metric`
    )
    .then((response) => response.data);

export default { getCapitalWeather };
