import { useState, useCallback } from "react";
import { SearchBar } from "@/components/SearchBar";
import { CurrentWeatherCard } from "@/components/CurrentWeatherCard";
import { MetricsGrid } from "@/components/MetricsGrid";
import { ForecastList } from "@/components/ForecastList";
import { ErrorMessage } from "@/components/ErrorMessage";
import { WeatherIcon } from "@/components/WeatherIcon";
import {
  fetchWeather,
  fetchForecast,
  getDefaultWeather,
  getDefaultForecast,
  BG_THEMES,
  type WeatherData,
  type ForecastDay,
} from "@/lib/weatherData";

type Unit = "C" | "F";

export default function WeatherDashboard() {
  const [weather, setWeather] = useState<WeatherData>(getDefaultWeather);
  const [forecast, setForecast] = useState<ForecastDay[]>(getDefaultForecast);
  const [unit, setUnit] = useState<Unit>("C");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastQuery, setLastQuery] = useState<string>("");

  const theme = BG_THEMES[weather.condition];

  const handleSearch = useCallback(async (city: string) => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);
    setLastQuery(city);

    try {
      const [weatherData, forecastData] = await Promise.all([
        fetchWeather(city),
        fetchForecast(city),
      ]);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch {
      setError(`Could not find weather for "${city}". Please check the city name and try again.`);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const handleRetry = useCallback(() => {
    if (lastQuery) handleSearch(lastQuery);
  }, [lastQuery, handleSearch]);

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${theme.gradient} transition-all duration-1000`}
      style={{ backgroundAttachment: "fixed" }}
    >
      {/* Subtle background texture */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.015%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
      </div>

      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="px-4 pt-8 pb-2 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2.5">
              <WeatherIcon condition={weather.condition} size={20} color={theme.iconColor} />
              <span className="text-white font-semibold text-lg tracking-tight">Skycast</span>
            </div>
            <span className="text-white/30 text-xs">
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </span>
          </div>

          {/* Search */}
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </header>

        {/* Main content */}
        <main className="px-4 pb-12 max-w-4xl mx-auto mt-8 space-y-4">
          {/* Loading overlay pulse on current card */}
          <div className={`transition-opacity duration-300 ${isLoading ? "opacity-50 pointer-events-none" : "opacity-100"}`}>
            {error ? (
              <ErrorMessage message={error} onRetry={handleRetry} />
            ) : (
              <>
                <CurrentWeatherCard
                  data={weather}
                  unit={unit}
                  onToggleUnit={() => setUnit(u => u === "C" ? "F" : "C")}
                  theme={theme}
                />

                <div className="grid grid-cols-1 gap-4 mt-4">
                  <MetricsGrid data={weather} unit={unit} theme={theme} />
                  <ForecastList forecast={forecast} unit={unit} theme={theme} />
                </div>
              </>
            )}
          </div>

          {/* Loading skeleton hint */}
          {isLoading && (
            <div className="flex items-center justify-center gap-2 text-white/40 text-sm py-4">
              <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
