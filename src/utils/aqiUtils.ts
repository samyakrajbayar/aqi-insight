export interface AQIData {
  aqi: number;
  category: string;
  color: string;
  components: {
    co: number;
    no: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    nh3: number;
  };
}

export const getAQICategory = (aqi: number): { category: string; color: string } => {
  if (aqi === 1) return { category: "Good", color: "text-aqi-good" };
  if (aqi === 2) return { category: "Fair", color: "text-aqi-moderate" };
  if (aqi === 3) return { category: "Moderate", color: "text-aqi-unhealthySensitive" };
  if (aqi === 4) return { category: "Poor", color: "text-aqi-unhealthy" };
  if (aqi === 5) return { category: "Very Poor", color: "text-aqi-veryUnhealthy" };
  return { category: "Unknown", color: "text-foreground" };
};

export const fetchAQIData = async (
  city: string,
  apiKey: string
): Promise<AQIData> => {
  // First, get coordinates for the city
  const geoResponse = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
      city
    )}&limit=1&appid=${apiKey}`
  );

  if (!geoResponse.ok) {
    throw new Error("City not found");
  }

  const geoData = await geoResponse.json();

  if (!geoData || geoData.length === 0) {
    throw new Error("City not found");
  }

  const { lat, lon } = geoData[0];

  // Get air pollution data
  const aqiResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
  );

  if (!aqiResponse.ok) {
    throw new Error("Failed to fetch AQI data");
  }

  const aqiData = await aqiResponse.json();
  const airQuality = aqiData.list[0];
  const aqi = airQuality.main.aqi;
  const { category, color } = getAQICategory(aqi);

  return {
    aqi,
    category,
    color,
    components: airQuality.components,
  };
};
