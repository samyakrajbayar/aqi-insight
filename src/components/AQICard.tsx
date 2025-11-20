import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AQICardProps {
  aqi: number;
  category: string;
  color: string;
}

export const AQICard = ({ aqi, category, color }: AQICardProps) => {
  return (
    <Card className="p-8 text-center backdrop-blur-sm bg-card/80 border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-muted-foreground">Air Quality Index</h2>
        <div
          className={cn(
            "text-7xl font-bold transition-colors duration-300",
            color
          )}
        >
          {aqi}
        </div>
        <div className={cn("text-2xl font-semibold", color)}>{category}</div>
      </div>
    </Card>
  );
};
