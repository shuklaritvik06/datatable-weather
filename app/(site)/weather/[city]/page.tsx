import WeatherForecast from "@/components/weather-forecast";
import React from "react";

export async function generateMetadata({ params }: { params: any }) {
  const { city } = params;
  const titleCaseTitle = city.split("")[0].toUpperCase() + city.slice(1);
  return {
    title: `Weather Forecast for ${titleCaseTitle} City`,
    description: `Weather forecast for the city of ${titleCaseTitle}`,
  };
}

const WeatherPage = () => {
  return (
    <main className="h-screen w-screen flex justify-center items-center">
      <WeatherForecast />
    </main>
  );
};

export default WeatherPage;
