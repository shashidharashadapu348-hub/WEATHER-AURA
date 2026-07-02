# Weather-Aura — Modern Weather Dashboard

[![Build](https://img.shields.io/badge/build-pnpm-yellow)](https://pnpm.io/)

Weather-Aura is a polished weather experience built with React, Vite, TypeScript, and Tailwind CSS. The app presents current conditions, key weather metrics, and multi-day forecasts in a modern dashboard interface, with a workspace setup for an API server, shared client code, and database tooling.

## Features

- **Interactive Weather Dashboard**: Search cities and view current weather, humidity, wind, visibility, pressure, and sunrise/sunset details.
- **Forecast Overview**: Browse a multi-day forecast with dynamic weather conditions and precipitation hints.
- **Unit Switching**: Toggle quickly between Celsius and Fahrenheit.
- **Responsive UI**: Clean, animated cards and gradients designed for desktop and mobile screens.
- **Workspace Architecture**: Includes a frontend app, API server, shared API client, and database package in a pnpm monorepo.
- **Extensible Data Layer**: The current dashboard uses demo data, and the code is structured to connect to a real weather API with an environment variable.

## Quick Start

### Prerequisites

- Node.js 20+
- pnpm

### Install

```bash
pnpm install
```

### Run the dashboard

```bash
pnpm --filter @workspace/weather-dashboard run dev
```

Then open http://localhost:5173/ in your browser.

### Run the API server

```bash
pnpm --filter @workspace/api-server run dev
```

### Build all packages

```bash
pnpm run build
```

### Typecheck

```bash
pnpm run typecheck
```

## Environment Variables

Create a `.env` file in the project root if you want to connect the app to a real weather provider.

Common variables:

- `VITE_WEATHER_API_KEY` — API key for a real weather provider such as OpenWeatherMap or WeatherAPI
- `DATABASE_URL` — Postgres connection string for the API server and database package

Do not commit secrets to source control.

## Project Structure

- `artifacts/weather-dashboard/` — React + Vite frontend app and weather UI components
- `artifacts/api-server/` — Express-based API server package
- `lib/api-client-react/` — Shared React API client layer
- `lib/api-spec/` — OpenAPI contract and code generation setup
- `lib/db/` — Drizzle ORM schema and database package
- `scripts/` — Workspace helper scripts

## Deployment

The frontend app can be built and deployed as a static site.

- Build command: `pnpm --filter @workspace/weather-dashboard run build`
- Output directory: `artifacts/weather-dashboard/dist`

The API server can be deployed separately as a Node.js service.

## Contributing

1. Fork or clone the repository.
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Make your changes and run `pnpm run typecheck`.
4. Commit and push your branch.
5. Open a pull request.

## Troubleshooting

- If `pnpm` is not available, enable it with `corepack enable`.
- If the dashboard shows placeholder data, connect a real weather API by adding `VITE_WEATHER_API_KEY` and updating the data layer in the weather dashboard package.
- If a dependency is missing, run `pnpm install` again.

## License

This project is licensed under the MIT License.

## Contact

- Repository: https://github.com/shashidharashadapu348-hub/WEATHER-AURA
