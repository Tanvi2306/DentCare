import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartData = [
  { day: "Mon", appointments: 12, completed: 10 },
  { day: "Tue", appointments: 15, completed: 14 },
  { day: "Wed", appointments: 18, completed: 16 },
  { day: "Thu", appointments: 14, completed: 13 },
  { day: "Fri", appointments: 20, completed: 18 },
  { day: "Sat", appointments: 8, completed: 7 },
  { day: "Sun", appointments: 5, completed: 5 },
];

const chartConfig = {
  appointments: {
    label: "Total Appointments",
    color: "hsl(var(--primary))",
  },
  completed: {
    label: "Completed",
    color: "hsl(var(--accent))",
  },
};

export const AppointmentsTrendChart = () => {
  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-foreground">Weekly Appointments Trend</CardTitle>
        <CardDescription className="text-muted-foreground">
          Scheduled vs Completed appointments this week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorAppointments" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
            <XAxis 
              dataKey="day" 
              className="text-xs text-muted-foreground"
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              className="text-xs text-muted-foreground"
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="appointments"
              stroke="hsl(var(--primary))"
              fillOpacity={1}
              fill="url(#colorAppointments)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="completed"
              stroke="hsl(var(--accent))"
              fillOpacity={1}
              fill="url(#colorCompleted)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
