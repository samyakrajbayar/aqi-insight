import { Card } from "@/components/ui/card";

interface PollutantCardProps {
  name: string;
  value: number;
  unit: string;
}

export const PollutantCard = ({ name, value, unit }: PollutantCardProps) => {
  return (
    <Card className="p-6 backdrop-blur-sm bg-card/80 border transition-all duration-300 hover:scale-105 hover:shadow-lg">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">{name}</h3>
        <div className="text-3xl font-bold text-foreground">
          {value.toFixed(2)}
        </div>
        <div className="text-xs text-muted-foreground">{unit}</div>
      </div>
    </Card>
  );
};
