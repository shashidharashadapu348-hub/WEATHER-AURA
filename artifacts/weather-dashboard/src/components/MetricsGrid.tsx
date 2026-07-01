import { Droplets, Wind, Eye, Gauge, Sunrise, Sunset } from "lucide-react";
import type { WeatherData, BgTheme } from "@/lib/weatherData";
import { kphToMph, kmToMi } from "@/lib/weatherData";

interface MetricsGridProps {
  data: WeatherData;
  unit: "C" | "F";
  theme: BgTheme;
}

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
  barPercent?: number;
  accent: string;
}

function MetricCard({ icon, label, value, subValue, barPercent, accent }: MetricCardProps) {
  return (
    <div className="glass-card glass-card-hover rounded-2xl p-4 md:p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-white/40 text-xs font-medium uppercase tracking-wider">{label}</span>
        <span className={`${accent}`}>{icon}</span>
      </div>
      <div>
        <span className="text-white text-2xl font-semibold leading-tight">{value}</span>
        {subValue && <p className="text-white/40 text-xs mt-0.5">{subValue}</p>}
      </div>
      {barPercent !== undefined && (
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${Math.min(barPercent, 100)}%`, background: accent.includes("amber") ? "#fbbf24" : accent.includes("sky") ? "#38bdf8" : accent.includes("blue") ? "#60a5fa" : "#818cf8" }}
          />
        </div>
      )}
    </div>
  );
}

export function MetricsGrid({ data, unit, theme }: MetricsGridProps) {
  const isImperial = unit === "F";
  const windDisplay = isImperial
    ? `${kphToMph(data.windSpeedKph)} mph`
    : `${data.windSpeedKph} km/h`;
  const visDisplay = isImperial
    ? `${kmToMi(data.visibilityKm)} mi`
    : `${data.visibilityKm} km`;

  const accent = theme.accent;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
      <MetricCard
        icon={<Droplets size={18} />}
        label="Humidity"
        value={`${data.humidity}%`}
        subValue={data.humidity > 70 ? "High moisture" : data.humidity > 40 ? "Comfortable" : "Dry air"}
        barPercent={data.humidity}
        accent={accent}
      />
      <MetricCard
        icon={<Wind size={18} />}
        label="Wind Speed"
        value={windDisplay}
        subValue={data.windSpeedKph < 20 ? "Light breeze" : data.windSpeedKph < 40 ? "Moderate" : "Strong winds"}
        barPercent={(data.windSpeedKph / 80) * 100}
        accent={accent}
      />
      <MetricCard
        icon={<Eye size={18} />}
        label="Visibility"
        value={visDisplay}
        subValue={data.visibilityKm > 10 ? "Excellent" : data.visibilityKm > 5 ? "Good" : "Reduced"}
        barPercent={(data.visibilityKm / 25) * 100}
        accent={accent}
      />
      <MetricCard
        icon={<Gauge size={18} />}
        label="Pressure"
        value={`${data.pressureHpa} hPa`}
        subValue={data.pressureHpa > 1013 ? "High pressure" : "Low pressure"}
        barPercent={((data.pressureHpa - 980) / 60) * 100}
        accent={accent}
      />
      <MetricCard
        icon={<Sunrise size={18} />}
        label="Sunrise"
        value={data.sunriseTime}
        subValue="Local time"
        accent={accent}
      />
      <MetricCard
        icon={<Sunset size={18} />}
        label="Sunset"
        value={data.sunsetTime}
        subValue="Local time"
        accent={accent}
      />
    </div>
  );
}
