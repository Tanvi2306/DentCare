import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Cell, Pie, PieChart, Legend, ResponsiveContainer } from "recharts";

const chartData = [
  { name: "Cleaning", value: 35, color: "hsl(var(--primary))" },
  { name: "Filling", value: 25, color: "hsl(var(--accent))" },
  { name: "Root Canal", value: 15, color: "hsl(var(--secondary))" },
  { name: "Extraction", value: 12, color: "hsl(210, 100%, 60%)" },
  { name: "Crown", value: 13, color: "hsl(280, 100%, 65%)" },
];

const chartConfig = {
  value: {
    label: "Treatments",
  },
};

export const TreatmentDistributionChart = () => {
  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-foreground">Treatment Distribution</CardTitle>
        <CardDescription className="text-muted-foreground">
          Breakdown of treatments this month
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={90}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value, entry: any) => (
                <span className="text-sm text-muted-foreground">
                  {value} ({entry.payload.value})
                </span>
              )}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
