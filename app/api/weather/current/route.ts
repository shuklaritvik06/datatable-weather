import { getWeather } from "@/lib/weather-api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
  const params = new URL(request.url).searchParams;
  const latitude = params.get("lat");
  const longitude = params.get("lon");
  if (latitude === null || longitude === null) {
    return NextResponse.json({
      error: "Invalid latitude or longitude",
    });
  }
  const result = await getWeather(latitude, longitude);
  return NextResponse.json({
    data: result,
  });
}
