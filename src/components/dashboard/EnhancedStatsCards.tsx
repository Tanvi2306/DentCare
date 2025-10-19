import { Card, CardContent } from "@/components/ui/card";
import { Users, Calendar, CheckCircle2, Clock, TrendingUp, AlertCircle } from "lucide-react";

interface StatCard {
  title: string;
  value: string | number;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: React.ElementType;
  color: string;
  bgColor: string;
  description: string;
}

const statsData: StatCard[] = [
  {
    title: "Total Patients",
    value: "1,247",
    change: "+12%",
    changeType: "positive",
    icon: Users,
    color: "text-primary",
    bgColor: "bg-primary/10",
    description: "from last month"
  },
  {
    title: "Today's Appointments",
    value: 8,
    change: "2 pending",
    changeType: "neutral",
    icon: Calendar,
    color: "text-accent",
    bgColor: "bg-accent/10",
    description: "scheduled"
  },
  {
    title: "Completed Today",
    value: 6,
    change: "+25%",
    changeType: "positive",
    icon: CheckCircle2,
    color: "text-green-600",
    bgColor: "bg-green-500/10",
    description: "vs yesterday"
  },
  {
    title: "Avg. Wait Time",
    value: "12 min",
    change: "-3 min",
    changeType: "positive",
    icon: Clock,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    description: "improvement"
  },
  {
    title: "Patient Satisfaction",
    value: "98%",
    change: "+2%",
    changeType: "positive",
    icon: TrendingUp,
    color: "text-violet-600",
    bgColor: "bg-violet-500/10",
    description: "this month"
  },
  {
    title: "Follow-ups Due",
    value: 7,
    change: "3 urgent",
    changeType: "negative",
    icon: AlertCircle,
    color: "text-orange-600",
    bgColor: "bg-orange-500/10",
    description: "require attention"
  },
];

export const EnhancedStatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {statsData.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card 
            key={stat.title}
            className="border-border/50 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 duration-300"
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2.5 ${stat.bgColor} rounded-xl`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  stat.changeType === "positive" 
                    ? "bg-green-500/10 text-green-600" 
                    : stat.changeType === "negative"
                    ? "bg-orange-500/10 text-orange-600"
                    : "bg-blue-500/10 text-blue-600"
                }`}>
                  {stat.change}
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className="text-xs font-medium text-muted-foreground mb-0.5">{stat.title}</p>
                <p className="text-xs text-muted-foreground/70">{stat.description}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
