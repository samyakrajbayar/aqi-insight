import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { AQICard } from "@/components/AQICard";
import { PollutantCard } from "@/components/PollutantCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { fetchAQIData, AQIData } from "@/utils/aqiUtils";
import { Wind, Droplets, Eye, AlertCircle } from "lucide-react";

const Index = () => {
  const [apiKey, setApiKey] = useState("");
  const [showApiInput, setShowApiInput] = useState(true);
  const [aqiData, setAqiData] = useState<AQIData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedCity, setSearchedCity] = useState("");

  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      setShowApiInput(false);
      toast.success("API key saved! Now search for a city.");
    } else {
      toast.error("Please enter a valid API key");
    }
  };

  const handleSearch = async (city: string) => {
    if (!apiKey) {
      toast.error("Please enter your OpenWeatherMap API key first");
      setShowApiInput(true);
      return;
    }

    setIsLoading(true);
    setSearchedCity(city);

    try {
      const data = await fetchAQIData(city, apiKey);
      setAqiData(data);
      toast.success(`AQI data loaded for ${city}`);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to fetch AQI data"
      );
      setAqiData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDApLDAsMCwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
        
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="text-center mb-12 space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Wind className="h-12 w-12 text-primary" />
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                AirQuality
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Check real-time air quality index for any city worldwide
            </p>
          </div>

          {/* API Key Input Section */}
          {showApiInput && (
            <Card className="max-w-2xl mx-auto p-6 mb-8 backdrop-blur-sm bg-card/80 border-2">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="space-y-2 flex-1">
                    <h3 className="font-semibold text-foreground">
                      Enter Your OpenWeatherMap API Key
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Get your free API key from{" "}
                      <a
                        href="https://openweathermap.org/api"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        OpenWeatherMap
                      </a>
                      . Your key is stored locally and never sent to our servers.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input
                    type="password"
                    placeholder="Enter your API key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleApiKeySubmit()}
                    className="flex-1"
                  />
                  <Button onClick={handleApiKeySubmit} className="bg-primary hover:bg-primary/90">
                    Save Key
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {!showApiInput && (
            <div className="text-center mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowApiInput(true)}
                className="text-muted-foreground hover:text-foreground"
              >
                Change API Key
              </Button>
            </div>
          )}

          {/* Search Bar */}
          <div className="mb-12">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          </div>

          {/* AQI Data Display */}
          {aqiData && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  {searchedCity}
                </h2>
                <p className="text-muted-foreground">Real-time Air Quality Data</p>
              </div>

              <div className="max-w-md mx-auto">
                <AQICard
                  aqi={aqiData.aqi}
                  category={aqiData.category}
                  color={aqiData.color}
                />
              </div>

              <div className="max-w-5xl mx-auto">
                <h3 className="text-2xl font-bold text-foreground mb-6 text-center flex items-center justify-center gap-2">
                  <Droplets className="h-6 w-6 text-primary" />
                  Pollutant Levels
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <PollutantCard
                    name="PM2.5"
                    value={aqiData.components.pm2_5}
                    unit="µg/m³"
                  />
                  <PollutantCard
                    name="PM10"
                    value={aqiData.components.pm10}
                    unit="µg/m³"
                  />
                  <PollutantCard
                    name="Ozone (O₃)"
                    value={aqiData.components.o3}
                    unit="µg/m³"
                  />
                  <PollutantCard
                    name="NO₂"
                    value={aqiData.components.no2}
                    unit="µg/m³"
                  />
                  <PollutantCard
                    name="SO₂"
                    value={aqiData.components.so2}
                    unit="µg/m³"
                  />
                  <PollutantCard
                    name="CO"
                    value={aqiData.components.co}
                    unit="µg/m³"
                  />
                  <PollutantCard
                    name="NH₃"
                    value={aqiData.components.nh3}
                    unit="µg/m³"
                  />
                  <PollutantCard
                    name="NO"
                    value={aqiData.components.no}
                    unit="µg/m³"
                  />
                </div>
              </div>

              {/* Info Card */}
              <Card className="max-w-3xl mx-auto p-6 backdrop-blur-sm bg-card/80 border">
                <div className="flex items-start gap-3">
                  <Eye className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">
                      Understanding Air Quality Index
                    </h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>
                        <span className="text-aqi-good font-medium">Good (1):</span> Air
                        quality is satisfactory
                      </p>
                      <p>
                        <span className="text-aqi-moderate font-medium">Fair (2):</span>{" "}
                        Acceptable for most people
                      </p>
                      <p>
                        <span className="text-aqi-unhealthySensitive font-medium">
                          Moderate (3):
                        </span>{" "}
                        Sensitive groups may experience effects
                      </p>
                      <p>
                        <span className="text-aqi-unhealthy font-medium">Poor (4):</span>{" "}
                        Everyone may begin to experience effects
                      </p>
                      <p>
                        <span className="text-aqi-veryUnhealthy font-medium">
                          Very Poor (5):
                        </span>{" "}
                        Health warnings of emergency conditions
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Empty State */}
          {!aqiData && !showApiInput && !isLoading && (
            <div className="text-center py-12 space-y-4">
              <div className="mx-auto w-24 h-24 rounded-full bg-secondary/50 flex items-center justify-center">
                <Wind className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground">
                Ready to Check Air Quality
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Enter any city name above to view real-time air quality data and
                pollutant levels
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>
            Data provided by{" "}
            <a
              href="https://openweathermap.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              OpenWeatherMap
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
