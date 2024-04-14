"use client";
import {
  ICurrentWeatherData,
  IForecastWeatherData,
} from "@/types/weather.types";
import { convertTemp, getBgColor } from "@/utils/app-utils";
import axios from "axios";
import Image from "next/image";
import { redirect, useParams, useSearchParams } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const WeatherForecast = () => {
  const { city } = useParams();
  const [currentData, setCurrentData] = useState<ICurrentWeatherData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [forecastData, setForecastData] = useState<IForecastWeatherData>();
  const [unit, setUnit] = useState<string>("kelvin");

  const searchParams = useSearchParams();
  const lon = searchParams.get("lon");
  const lat = searchParams.get("lat");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (lat && lon) {
          setLoading(true);
          const [currentResponse, forecastResponse] = await Promise.all([
            axios.get(`/api/weather/current?lat=${lat}&lon=${lon}`),
            axios.get(`/api/weather/forecast?lat=${lat}&lon=${lon}`),
          ]);
          document.querySelectorAll("[class^='bg-']").forEach(element => {
            element.classList.remove(element.className);
          });
          document.body.classList.add(
            getBgColor(currentResponse?.data?.data?.weather?.[0]?.main)
          );
          setCurrentData(currentResponse.data);
          setForecastData(forecastResponse.data);
        }
      } catch (error: any) {
        setLoading(false);
        console.error("Error fetching data:", error);
        throw new Error(error);
      }
    };

    fetchData().then(() => setLoading(false));
  }, [lat, lon]);

  if (lon == null || lat == null) return redirect("/");

  return (
    <Fragment>
      {loading ? (
        <div className="flex justify-center items-center mx-3 w-full h-[300px] rounded md:w-[300px] bg-white md:h-[200px]">
          <ClipLoader size={25} color="black" />
        </div>
      ) : (
        <div className="w-full mx-3">
          <div className="max-w-3xl w-full mx-auto mt-10 bg-white rounded p-8 md:p-9 shadow border">
            <div className="h-1/2 w-full">
              <div className="text-2xl md:text-3xl">
                🌤️ Weather Data for{" "}
                <span className="font-semibold">
                  {decodeURI(
                    (city as string).split("")[0].toUpperCase() + city.slice(1)
                  )}
                </span>
              </div>
              <div className="flex justify-center my-5">
                {!loading && (
                  <Image
                    loader={() =>
                      "https://openweathermap.org/img/w/" +
                      currentData?.data?.weather?.[0]?.icon +
                      ".png"
                    }
                    src={
                      "https://openweathermap.org/img/w/" +
                      currentData?.data?.weather?.[0]?.icon +
                      ".png"
                    }
                    alt=""
                    width={0}
                    height={0}
                    className="w-28 h-28 object-cover"
                  />
                )}
              </div>
              <div className="text-center text-4xl font-bold text-stamuraibg">
                {currentData?.data?.weather?.[0]?.main}
              </div>
              <div className="text-center text-xl text-stamuraibg my-2">
                {currentData?.data?.weather?.[0]?.description
                  .split("")[0]
                  .toUpperCase()! +
                  currentData?.data?.weather?.[0]?.description.slice(1)}
              </div>
              <select
                name="unit"
                title="Select Unit"
                onChange={(e) => setUnit(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="kelvin" className="text-gray-900">
                  Kelvin
                </option>
                <option value="celsius" className="text-gray-900">
                  Celsius
                </option>
                <option value="fahr" className="text-gray-900">
                  Fahrenheit
                </option>
              </select>
              <div className="flex md:flex-row flex-col md:justify-between md:items-center mt-5">
                <div>
                  <div className="text-red-500  text-lg font-semibold mt-3">
                    {`${new Date().getDate()} ${new Date().toLocaleString(
                      "default",
                      {
                        month: "long",
                      }
                    )}, ${new Date().getHours()}:${new Date().getMinutes()} ${
                      new Date().getHours() >= 12 ? "PM" : "AM"
                    }`}
                  </div>
                  <div className="flex gap-2 mt-2 text-gray-700 md:text-lg">
                    <div>Latitude: {lat}</div>
                    <div>|</div>
                    <div>Longitude: {lon}</div>
                  </div>
                  <div className="flex gap-2 mt-2 text-gray-700 text-lg">
                    {currentData?.data?.rain?.["1h"] && (
                      <div>
                        Rain Volume: {currentData?.data?.rain?.["1h"]} mm / 3hr
                      </div>
                    )}
                    {currentData?.data?.rain?.["3h"] && (
                      <div>
                        Rain Volume: {currentData?.data?.rain?.["3h"]} mm / 3hr
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-2xl md:text-3xl font-bold">
                    {convertTemp(currentData?.data?.main?.temp, unit)}
                  </div>
                  <div className="text-sm font-light text-gray-700">
                    Feels like:{" "}
                    {convertTemp(currentData?.data?.main?.feels_like, unit)}
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:justify-between md:items-center md:flex-row gap-2 mt-2 text-gray-700 font-medium">
                <div>
                  Visibility: {currentData?.data?.visibility! / 1000} Km
                </div>
                <div>Timezone: {currentData?.data?.timezone} sec</div>
              </div>
              <div className="flex flex-col md:justify-between md:items-center md:flex-row gap-2 mt-2 text-gray-700 font-medium">
                <div>
                  Sunrise:{" "}
                  {new Date(
                    forecastData?.data?.city?.sunrise!
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </div>
                <div>
                  Sunset:{" "}
                  {new Date(
                    forecastData?.data?.city?.sunset!
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </div>
              </div>
              <div className="flex flex-col md:justify-between md:items-center md:flex-row gap-2 mt-2 text-gray-700 font-medium">
                <div>Humidity: {currentData?.data?.main?.humidity} %</div>
                <div>Pressure: {currentData?.data?.main?.pressure} hPa</div>
              </div>
              <div className="my-5 text-2xl font-bold text-stamuraibg">
                Forecast
              </div>
              <div className="flex gap-3 whitespace-nowrap overflow-x-scroll mt-5 scroll-hide">
                {forecastData &&
                  forecastData.data.list.map((data, index) => (
                    <div
                      key={index}
                      className="rounded-md shadow border p-2 min-w-[180px]"
                    >
                      <div className="flex justify-center">
                        <Image
                          loader={() =>
                            "https://openweathermap.org/img/w/" +
                            data?.weather?.[0]?.icon +
                            ".png"
                          }
                          src={
                            "https://openweathermap.org/img/w/" +
                            data?.weather?.[0]?.icon +
                            ".png"
                          }
                          alt=""
                          width={0}
                          height={0}
                          className="w-14 h-14 object-cover"
                        />
                      </div>
                      <div className="text-lg font-semibold text-stamuraibg my-3 text-center">
                        {data.weather[0].main}
                      </div>
                      <div className="text-base font-light text-stamuraibg/80 my-3 text-center">
                        {data.weather[0].description
                          .split("")[0]
                          .toUpperCase() + data.weather[0].description.slice(1)}
                      </div>
                      <div className="text-sm font-medium text-center">
                        {data.dt_txt}
                      </div>
                      <div className="text-sm font-medium text-center my-2">
                        Temp: <span>{convertTemp(data.main.temp, unit)}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default WeatherForecast;
