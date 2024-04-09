import CityTable from "@/components/city-table";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Weather Forecasting App",
  description: "weather forecasting app",
};

const HomePage = () => {
  return (
    <main className="h-screen w-screen bg-stamuraibg flex justify-center items-center">
      <CityTable />
    </main>
  );
};

export default HomePage;
