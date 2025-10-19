import { Users, UserPlus, Clock } from "lucide-react";
import { useState, useEffect } from "react";

interface StatCard {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

const getAppointmentStats = () => {
  try {
    const data = localStorage.getItem("appointments");
    if (!data) return { total: 0, newThisMonth: 0, followUps: 0 };
    
    const appointments = JSON.parse(data);
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    const total = appointments.length;
    const newThisMonth = appointments.filter((apt: any) => {
      const aptDate = new Date(apt.createdAt);
      return aptDate.getMonth() === currentMonth && 
             aptDate.getFullYear() === currentYear;
    }).length;
    
    const followUps = appointments.filter((apt: any) => 
      apt.status === "Pending" || apt.status === "Confirmed"
    ).length;
    
    return { total, newThisMonth, followUps };
  } catch (error) {
    console.error("Error loading stats:", error);
    return { total: 0, newThisMonth: 0, followUps: 0 };
  }
};

export const ActivePatientsOverview = () => {
  const [stats, setStats] = useState(() => {
    const { total, newThisMonth, followUps } = getAppointmentStats();
    return [
      {
        title: "Total Patients",
        value: total,
        icon: Users,
        color: "text-primary",
        bgColor: "bg-primary/10",
      },
      {
        title: "New This Month",
        value: newThisMonth,
        icon: UserPlus,
        color: "text-secondary",
        bgColor: "bg-secondary/10",
      },
      {
        title: "Follow-Ups Due",
        value: followUps,
        icon: Clock,
        color: "text-accent",
        bgColor: "bg-accent/10",
      },
    ];
  });

  useEffect(() => {
    const updateStats = () => {
      const { total, newThisMonth, followUps } = getAppointmentStats();
      setStats([
        {
          title: "Total Patients",
          value: total,
          icon: Users,
          color: "text-primary",
          bgColor: "bg-primary/10",
        },
        {
          title: "New This Month",
          value: newThisMonth,
          icon: UserPlus,
          color: "text-secondary",
          bgColor: "bg-secondary/10",
        },
        {
          title: "Follow-Ups Due",
          value: followUps,
          icon: Clock,
          color: "text-accent",
          bgColor: "bg-accent/10",
        },
      ]);
    };

    // Listen for appointment updates
    window.addEventListener("appointmentsUpdated", updateStats);

    return () => {
      window.removeEventListener("appointmentsUpdated", updateStats);
    };
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">Active Patients</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 ${stat.bgColor} rounded-xl`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
