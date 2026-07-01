// =============================================================================
// WEATHER API CONFIGURATION
// =============================================================================
// To plug in a real API, replace the functions in this file with real fetch calls.
//
// Supported services:
//   - OpenWeatherMap: https://openweathermap.org/api
//   - WeatherAPI:     https://www.weatherapi.com/
//
// Steps to connect a real API:
//   1. Sign up and get an API key from your chosen provider
//   2. Store it securely (e.g. in an .env file as VITE_WEATHER_API_KEY)
//   3. Replace `fetchWeather` and `fetchForecast` below with real fetch calls
//
// Example for OpenWeatherMap:
//   const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
//   const BASE_URL = "https://api.openweathermap.org/data/2.5";
//
//   export async function fetchWeather(city: string): Promise<WeatherData> {
//     const res = await fetch(`${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`);
//     if (!res.ok) throw new Error("City not found");
//     const data = await res.json();
//     return mapOpenWeatherMapResponse(data);
//   }
// =============================================================================

export type WeatherCondition =
  | "sunny"
  | "partly-cloudy"
  | "cloudy"
  | "rainy"
  | "stormy"
  | "snowy"
  | "foggy"
  | "windy"
  | "night-clear"
  | "night-cloudy";

export interface WeatherData {
  city: string;
  country: string;
  tempC: number;
  feelsLikeC: number;
  condition: WeatherCondition;
  conditionLabel: string;
  humidity: number;
  windSpeedKph: number;
  visibilityKm: number;
  pressureHpa: number;
  sunriseTime: string;
  sunsetTime: string;
  uvIndex: number;
  updatedAt: Date;
}

export interface ForecastDay {
  date: Date;
  condition: WeatherCondition;
  conditionLabel: string;
  maxTempC: number;
  minTempC: number;
  precipChance: number;
}

// ------- Placeholder data -------

const PLACEHOLDER_WEATHER: WeatherData = {
  city: "San Francisco",
  country: "US",
  tempC: 18,
  feelsLikeC: 16,
  condition: "partly-cloudy",
  conditionLabel: "Partly Cloudy",
  humidity: 72,
  windSpeedKph: 19,
  visibilityKm: 14,
  pressureHpa: 1013,
  sunriseTime: "6:21 AM",
  sunsetTime: "7:48 PM",
  uvIndex: 5,
  updatedAt: new Date(),
};

const PLACEHOLDER_FORECAST: ForecastDay[] = [
  { date: addDays(new Date(), 1), condition: "sunny",         conditionLabel: "Sunny",         maxTempC: 22, minTempC: 14, precipChance: 5  },
  { date: addDays(new Date(), 2), condition: "cloudy",        conditionLabel: "Cloudy",         maxTempC: 17, minTempC: 12, precipChance: 30 },
  { date: addDays(new Date(), 3), condition: "rainy",         conditionLabel: "Light Rain",     maxTempC: 14, minTempC: 10, precipChance: 80 },
  { date: addDays(new Date(), 4), condition: "partly-cloudy", conditionLabel: "Partly Cloudy",  maxTempC: 19, minTempC: 13, precipChance: 15 },
  { date: addDays(new Date(), 5), condition: "sunny",         conditionLabel: "Sunny",          maxTempC: 24, minTempC: 15, precipChance: 2  },
];

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

// Cities with hand-crafted placeholder data for a realistic demo experience
const CITY_DATA: Record<string, { weather: WeatherData; forecast: ForecastDay[] }> = {
  "london": {
    weather: { city: "London", country: "GB", tempC: 12, feelsLikeC: 9, condition: "rainy", conditionLabel: "Light Rain", humidity: 88, windSpeedKph: 24, visibilityKm: 8, pressureHpa: 1008, sunriseTime: "5:47 AM", sunsetTime: "8:52 PM", uvIndex: 2, updatedAt: new Date() },
    forecast: [
      { date: addDays(new Date(), 1), condition: "cloudy",        conditionLabel: "Overcast",      maxTempC: 13, minTempC: 8,  precipChance: 60 },
      { date: addDays(new Date(), 2), condition: "rainy",         conditionLabel: "Heavy Rain",    maxTempC: 10, minTempC: 7,  precipChance: 90 },
      { date: addDays(new Date(), 3), condition: "partly-cloudy", conditionLabel: "Partly Cloudy", maxTempC: 15, minTempC: 9,  precipChance: 20 },
      { date: addDays(new Date(), 4), condition: "sunny",         conditionLabel: "Sunny",         maxTempC: 18, minTempC: 10, precipChance: 5  },
      { date: addDays(new Date(), 5), condition: "cloudy",        conditionLabel: "Cloudy",        maxTempC: 14, minTempC: 9,  precipChance: 40 },
    ],
  },
  "tokyo": {
    weather: { city: "Tokyo", country: "JP", tempC: 26, feelsLikeC: 29, condition: "sunny", conditionLabel: "Sunny", humidity: 65, windSpeedKph: 11, visibilityKm: 20, pressureHpa: 1018, sunriseTime: "4:28 AM", sunsetTime: "6:55 PM", uvIndex: 8, updatedAt: new Date() },
    forecast: [
      { date: addDays(new Date(), 1), condition: "sunny",         conditionLabel: "Clear",         maxTempC: 28, minTempC: 20, precipChance: 3  },
      { date: addDays(new Date(), 2), condition: "partly-cloudy", conditionLabel: "Partly Cloudy", maxTempC: 25, minTempC: 18, precipChance: 15 },
      { date: addDays(new Date(), 3), condition: "rainy",         conditionLabel: "Thunderstorm",  maxTempC: 22, minTempC: 17, precipChance: 85 },
      { date: addDays(new Date(), 4), condition: "cloudy",        conditionLabel: "Cloudy",        maxTempC: 24, minTempC: 19, precipChance: 35 },
      { date: addDays(new Date(), 5), condition: "sunny",         conditionLabel: "Sunny",         maxTempC: 27, minTempC: 20, precipChance: 5  },
    ],
  },
  "dubai": {
    weather: { city: "Dubai", country: "AE", tempC: 39, feelsLikeC: 44, condition: "sunny", conditionLabel: "Hot & Sunny", humidity: 40, windSpeedKph: 15, visibilityKm: 25, pressureHpa: 1001, sunriseTime: "5:30 AM", sunsetTime: "6:45 PM", uvIndex: 11, updatedAt: new Date() },
    forecast: [
      { date: addDays(new Date(), 1), condition: "sunny", conditionLabel: "Sunny", maxTempC: 40, minTempC: 30, precipChance: 0 },
      { date: addDays(new Date(), 2), condition: "sunny", conditionLabel: "Sunny", maxTempC: 41, minTempC: 31, precipChance: 0 },
      { date: addDays(new Date(), 3), condition: "sunny", conditionLabel: "Sunny", maxTempC: 39, minTempC: 29, precipChance: 0 },
      { date: addDays(new Date(), 4), condition: "sunny", conditionLabel: "Sunny", maxTempC: 38, minTempC: 28, precipChance: 2 },
      { date: addDays(new Date(), 5), condition: "sunny", conditionLabel: "Sunny", maxTempC: 40, minTempC: 30, precipChance: 0 },
    ],
  },
  "new york": {
    weather: { city: "New York", country: "US", tempC: 20, feelsLikeC: 19, condition: "partly-cloudy", conditionLabel: "Partly Cloudy", humidity: 55, windSpeedKph: 22, visibilityKm: 16, pressureHpa: 1015, sunriseTime: "5:32 AM", sunsetTime: "8:19 PM", uvIndex: 6, updatedAt: new Date() },
    forecast: [
      { date: addDays(new Date(), 1), condition: "cloudy",        conditionLabel: "Cloudy",        maxTempC: 18, minTempC: 14, precipChance: 45 },
      { date: addDays(new Date(), 2), condition: "rainy",         conditionLabel: "Rain",          maxTempC: 15, minTempC: 11, precipChance: 75 },
      { date: addDays(new Date(), 3), condition: "partly-cloudy", conditionLabel: "Partly Cloudy", maxTempC: 21, minTempC: 13, precipChance: 20 },
      { date: addDays(new Date(), 4), condition: "sunny",         conditionLabel: "Clear",         maxTempC: 24, minTempC: 15, precipChance: 5  },
      { date: addDays(new Date(), 5), condition: "sunny",         conditionLabel: "Sunny",         maxTempC: 26, minTempC: 16, precipChance: 3  },
    ],
  },
  "sydney": {
    weather: { city: "Sydney", country: "AU", tempC: 15, feelsLikeC: 13, condition: "cloudy", conditionLabel: "Cloudy", humidity: 68, windSpeedKph: 18, visibilityKm: 12, pressureHpa: 1020, sunriseTime: "6:55 AM", sunsetTime: "5:01 PM", uvIndex: 3, updatedAt: new Date() },
    forecast: [
      { date: addDays(new Date(), 1), condition: "partly-cloudy", conditionLabel: "Partly Cloudy", maxTempC: 17, minTempC: 11, precipChance: 20 },
      { date: addDays(new Date(), 2), condition: "sunny",         conditionLabel: "Sunny",         maxTempC: 20, minTempC: 12, precipChance: 5  },
      { date: addDays(new Date(), 3), condition: "sunny",         conditionLabel: "Clear",         maxTempC: 22, minTempC: 13, precipChance: 3  },
      { date: addDays(new Date(), 4), condition: "cloudy",        conditionLabel: "Cloudy",        maxTempC: 16, minTempC: 10, precipChance: 35 },
      { date: addDays(new Date(), 5), condition: "rainy",         conditionLabel: "Showers",       maxTempC: 14, minTempC: 9,  precipChance: 70 },
    ],
  },
  "moscow": {
    weather: { city: "Moscow", country: "RU", tempC: -2, feelsLikeC: -8, condition: "snowy", conditionLabel: "Light Snow", humidity: 78, windSpeedKph: 14, visibilityKm: 5, pressureHpa: 1024, sunriseTime: "8:55 AM", sunsetTime: "4:07 PM", uvIndex: 1, updatedAt: new Date() },
    forecast: [
      { date: addDays(new Date(), 1), condition: "snowy",         conditionLabel: "Snow",          maxTempC: 0,  minTempC: -5,  precipChance: 80 },
      { date: addDays(new Date(), 2), condition: "cloudy",        conditionLabel: "Overcast",      maxTempC: 2,  minTempC: -3,  precipChance: 30 },
      { date: addDays(new Date(), 3), condition: "partly-cloudy", conditionLabel: "Partly Cloudy", maxTempC: 4,  minTempC: -1,  precipChance: 15 },
      { date: addDays(new Date(), 4), condition: "snowy",         conditionLabel: "Snow Showers",  maxTempC: -1, minTempC: -6,  precipChance: 65 },
      { date: addDays(new Date(), 5), condition: "cloudy",        conditionLabel: "Cloudy",        maxTempC: 1,  minTempC: -4,  precipChance: 40 },
    ],
  },
};

// Simulate network delay
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchWeather(city: string): Promise<WeatherData> {
  await delay(800 + Math.random() * 400);

  const key = city.trim().toLowerCase();
  const data = CITY_DATA[key];

  if (data) return { ...data.weather, updatedAt: new Date() };

  // Generate plausible random data for unknown cities
  const conditions: WeatherCondition[] = ["sunny", "partly-cloudy", "cloudy", "rainy"];
  const conditionLabels: Record<WeatherCondition, string> = {
    sunny: "Sunny", "partly-cloudy": "Partly Cloudy", cloudy: "Cloudy",
    rainy: "Light Rain", stormy: "Thunderstorm", snowy: "Snow", foggy: "Foggy",
    windy: "Windy", "night-clear": "Clear Night", "night-cloudy": "Cloudy Night",
  };
  const cond = conditions[Math.floor(Math.random() * conditions.length)];
  const tempC = Math.round(10 + Math.random() * 20);

  return {
    city: city.trim().split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" "),
    country: "—",
    tempC,
    feelsLikeC: tempC - Math.round(Math.random() * 4),
    condition: cond,
    conditionLabel: conditionLabels[cond],
    humidity: Math.round(40 + Math.random() * 50),
    windSpeedKph: Math.round(5 + Math.random() * 30),
    visibilityKm: Math.round(8 + Math.random() * 20),
    pressureHpa: Math.round(1000 + Math.random() * 30),
    sunriseTime: "6:15 AM",
    sunsetTime: "7:30 PM",
    uvIndex: Math.round(1 + Math.random() * 8),
    updatedAt: new Date(),
  };
}

export async function fetchForecast(city: string): Promise<ForecastDay[]> {
  await delay(600 + Math.random() * 300);
  const key = city.trim().toLowerCase();
  return CITY_DATA[key]?.forecast ?? PLACEHOLDER_FORECAST;
}

export function getDefaultWeather(): WeatherData {
  return { ...PLACEHOLDER_WEATHER };
}

export function getDefaultForecast(): ForecastDay[] {
  return PLACEHOLDER_FORECAST;
}

// Conversion helpers
export function cToF(c: number): number {
  return Math.round((c * 9) / 5 + 32);
}

export function kphToMph(kph: number): number {
  return Math.round(kph * 0.621371);
}

export function kmToMi(km: number): number {
  return Math.round(km * 0.621371 * 10) / 10;
}

// Dynamic background config based on weather condition
export interface BgTheme {
  gradient: string;
  accent: string;
  iconColor: string;
}

export const BG_THEMES: Record<WeatherCondition, BgTheme> = {
  sunny: {
    gradient: "from-amber-900/60 via-orange-900/40 to-slate-900",
    accent: "text-amber-400",
    iconColor: "#fbbf24",
  },
  "partly-cloudy": {
    gradient: "from-sky-900/60 via-slate-800/50 to-slate-900",
    accent: "text-sky-300",
    iconColor: "#7dd3fc",
  },
  cloudy: {
    gradient: "from-slate-700/60 via-slate-800/50 to-slate-900",
    accent: "text-slate-300",
    iconColor: "#cbd5e1",
  },
  rainy: {
    gradient: "from-blue-900/70 via-indigo-900/50 to-slate-900",
    accent: "text-blue-400",
    iconColor: "#60a5fa",
  },
  stormy: {
    gradient: "from-gray-900/80 via-indigo-950/60 to-slate-900",
    accent: "text-indigo-400",
    iconColor: "#818cf8",
  },
  snowy: {
    gradient: "from-slate-600/50 via-blue-900/40 to-slate-900",
    accent: "text-blue-100",
    iconColor: "#e0f2fe",
  },
  foggy: {
    gradient: "from-gray-700/60 via-gray-800/50 to-slate-900",
    accent: "text-gray-300",
    iconColor: "#9ca3af",
  },
  windy: {
    gradient: "from-teal-900/60 via-cyan-900/40 to-slate-900",
    accent: "text-teal-300",
    iconColor: "#5eead4",
  },
  "night-clear": {
    gradient: "from-indigo-950/80 via-slate-900/80 to-slate-900",
    accent: "text-indigo-200",
    iconColor: "#c7d2fe",
  },
  "night-cloudy": {
    gradient: "from-slate-900/80 via-gray-900/80 to-slate-900",
    accent: "text-slate-300",
    iconColor: "#94a3b8",
  },
};
