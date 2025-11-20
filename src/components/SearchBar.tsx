import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading?: boolean;
}

export const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Enter city name (e.g., London, Tokyo, New York)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="pl-10 h-12 text-lg bg-card/80 backdrop-blur-sm border-2 focus:border-primary transition-all"
            disabled={isLoading}
          />
        </div>
        <Button
          type="submit"
          size="lg"
          className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all"
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </div>
    </form>
  );
};
