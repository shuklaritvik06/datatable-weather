import {
  FORECAST_API_URL,
  WEATHER_API_URL,
} from "@/constants/stamurai-constants";
import axios from "axios";

export const getWeather = async (lat: string, lon: string) => {
  const url = `${WEATHER_API_URL}?lat=${parseFloat(lat)}&lon=${parseFloat(
    lon
  )}&appid=${process.env.WEATHER_API_KEY}`;
  const res = await axios.get(url);
  return res.data;
};

export const getWeatherForecast = async (lat: string, lon: string) => {
  const url = `${FORECAST_API_URL}?lat=${parseFloat(lat)}&lon=${parseFloat(
    lon
  )}&appid=${process.env.WEATHER_API_KEY}`;
  const res = await axios.get(url);
  return res.data;
};
