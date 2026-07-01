import {
  Sun, Cloud, CloudRain, CloudSnow, CloudLightning,
  Wind, Eye, Cloudy, Moon, CloudMoon,
} from "lucide-react";
import type { WeatherCondition } from "@/lib/weatherData";

interface WeatherIconProps {
  condition: WeatherCondition;
  size?: number;
  color?: string;
  className?: string;
  animated?: boolean;
}

export function WeatherIcon({ condition, size = 48, color, className = "", animated = false }: WeatherIconProps) {
  const props = { size, color, className: `${className} ${animated ? getAnimation(condition) : ""}`.trim() };

  switch (condition) {
    case "sunny":        return <Sun {...props} />;
    case "partly-cloudy": return <Cloudy {...props} />;
    case "cloudy":       return <Cloud {...props} />;
    case "rainy":        return <CloudRain {...props} />;
    case "stormy":       return <CloudLightning {...props} />;
    case "snowy":        return <CloudSnow {...props} />;
    case "foggy":        return <Eye {...props} />;
    case "windy":        return <Wind {...props} />;
    case "night-clear":  return <Moon {...props} />;
    case "night-cloudy": return <CloudMoon {...props} />;
    default:             return <Sun {...props} />;
  }
}

function getAnimation(condition: WeatherCondition): string {
  switch (condition) {
    case "sunny":        return "animate-spin-slow";
    case "partly-cloudy": return "animate-float";
    case "rainy":        return "animate-pulse-slow";
    case "snowy":        return "animate-pulse-slow";
    case "stormy":       return "animate-pulse";
    default:             return "animate-float";
  }
}
