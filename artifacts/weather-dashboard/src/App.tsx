import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WeatherDashboard from "@/pages/WeatherDashboard";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WeatherDashboard />
    </QueryClientProvider>
  );
}

export default App;
