import { Droplets } from "lucide-react";
import { WeatherIcon } from "@/components/WeatherIcon";
import type { ForecastDay, BgTheme } from "@/lib/weatherData";
import { cToF } from "@/lib/weatherData";

interface ForecastListProps {
  forecast: ForecastDay[];
  unit: "C" | "F";
  theme: BgTheme;
}

function getDayName(date: Date): string {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

function getDateLabel(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function ForecastList({ forecast, unit, theme }: ForecastListProps) {
  return (
    <div className="glass-card rounded-3xl p-5 md:p-6">
      <h2 className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-4">5-Day Forecast</h2>
      <div className="space-y-1">
        {forecast.map((day, i) => {
          const maxT = unit === "C" ? day.maxTempC : cToF(day.maxTempC);
          const minT = unit === "C" ? day.minTempC : cToF(day.minTempC);
          const isFirst = i === 0;

          return (
            <div
              key={i}
              className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-colors ${isFirst ? "bg-white/06" : "hover:bg-white/04"}`}
            >
              {/* Day name */}
              <div className="w-20 shrink-0">
                <p className={`text-sm font-semibold ${isFirst ? "text-white" : "text-white/70"}`}>{getDayName(day.date)}</p>
                <p className="text-white/30 text-xs">{getDateLabel(day.date)}</p>
              </div>

              {/* Weather icon */}
              <WeatherIcon
                condition={day.condition}
                size={22}
                color={theme.iconColor}
                className="shrink-0"
              />

              {/* Condition label */}
              <span className="flex-1 text-white/50 text-sm hidden sm:block truncate">{day.conditionLabel}</span>

              {/* Precip chance */}
              <div className="flex items-center gap-1 text-blue-400 text-xs w-12 justify-end shrink-0">
                <Droplets size={12} />
                <span>{day.precipChance}%</span>
              </div>

              {/* Temp range */}
              <div className="flex items-center gap-2 shrink-0 ml-2">
                <span className="text-white/35 text-sm w-10 text-right">{minT}°</span>

                {/* Temp range bar */}
                <div className="w-16 md:w-24 h-1.5 bg-white/10 rounded-full overflow-hidden hidden md:block">
                  <div
                    className="h-full rounded-full"
                    style={{
                      marginLeft: `${Math.max(0, ((minT - (unit === "C" ? -10 : 14)) / (unit === "C" ? 50 : 90)) * 100)}%`,
                      width: `${Math.max(10, ((maxT - minT) / (unit === "C" ? 50 : 90)) * 100)}%`,
                      background: `linear-gradient(to right, ${theme.iconColor}60, ${theme.iconColor})`,
                    }}
                  />
                </div>

                <span className="text-white text-sm font-semibold w-10">{maxT}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
