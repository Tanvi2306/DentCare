import { Calendar, CheckCircle, Clock } from "lucide-react";

interface PerformanceCard {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

const performanceData: PerformanceCard[] = [
  {
    title: "Appointments This Week",
    value: 42,
    icon: Calendar,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Completed Treatments",
    value: 38,
    icon: CheckCircle,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    title: "Pending Follow-Ups",
    value: 7,
    icon: Clock,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
];

export const PerformanceSummary = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">Performance Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {performanceData.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="bg-card rounded-2xl p-5 shadow-sm border border-border hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div className={`p-3 ${item.bgColor} rounded-xl`}>
                  <Icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground mb-1">{item.value}</p>
                  <p className="text-sm text-muted-foreground">{item.title}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
