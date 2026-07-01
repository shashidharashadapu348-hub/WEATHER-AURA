import { Thermometer, RefreshCw } from "lucide-react";
import { WeatherIcon } from "@/components/WeatherIcon";
import type { WeatherData, BgTheme } from "@/lib/weatherData";
import { cToF } from "@/lib/weatherData";

interface CurrentWeatherCardProps {
  data: WeatherData;
  unit: "C" | "F";
  onToggleUnit: () => void;
  theme: BgTheme;
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function CurrentWeatherCard({ data, unit, onToggleUnit, theme }: CurrentWeatherCardProps) {
  const displayTemp = unit === "C" ? data.tempC : cToF(data.tempC);
  const feelsLike = unit === "C" ? data.feelsLikeC : cToF(data.feelsLikeC);

  return (
    <div className="glass-card rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
      {/* Weather icon */}
      <div className="shrink-0 flex items-center justify-center">
        <WeatherIcon
          condition={data.condition}
          size={96}
          color={theme.iconColor}
          animated
        />
      </div>

      {/* Main info */}
      <div className="flex-1 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
          <span className="text-2xl md:text-3xl font-bold text-white">{data.city}</span>
          <span className="text-white/40 text-lg">{data.country}</span>
        </div>
        <p className={`text-sm font-medium mb-4 ${theme.accent}`}>{data.conditionLabel}</p>

        {/* Temperature */}
        <div className="flex items-end justify-center md:justify-start gap-4">
          <span className="text-7xl md:text-8xl font-thin text-white leading-none">
            {displayTemp}
          </span>
          <div className="flex flex-col items-start pb-2 gap-2">
            {/* Unit toggle */}
            <button
              onClick={onToggleUnit}
              className="flex items-center gap-1 bg-white/10 hover:bg-white/20 transition-colors rounded-xl px-3 py-1.5"
            >
              <span className={`text-sm font-semibold transition-colors ${unit === "C" ? "text-white" : "text-white/40"}`}>°C</span>
              <span className="text-white/20 text-sm">|</span>
              <span className={`text-sm font-semibold transition-colors ${unit === "F" ? "text-white" : "text-white/40"}`}>°F</span>
            </button>
            <span className="text-white/40 text-xs flex items-center gap-1">
              <Thermometer size={12} />
              Feels {feelsLike}°{unit}
            </span>
          </div>
        </div>
      </div>

      {/* Updated time */}
      <div className="shrink-0 text-right self-start mt-0 md:mt-0">
        <div className="flex items-center gap-1.5 text-white/30 text-xs">
          <RefreshCw size={11} />
          <span>Updated {formatTime(data.updatedAt)}</span>
        </div>
        <div className={`text-xs font-medium mt-1 ${theme.accent}`}>UV Index {data.uvIndex}</div>
      </div>
    </div>
  );
}
