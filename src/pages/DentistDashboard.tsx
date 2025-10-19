import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { TodaysAppointments } from "@/components/dashboard/TodaysAppointments";
import { ActivePatientsOverview } from "@/components/dashboard/ActivePatientsOverview";
import { QuickReminders } from "@/components/dashboard/QuickReminders";
import { PerformanceSummary } from "@/components/dashboard/PerformanceSummary";
import { QuickActions } from "@/components/dashboard/QuickActions";

const DentistDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/dentist/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-background to-teal-50">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Dentist Dashboard</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Welcome, Doctor!</h2>
          <p className="text-muted-foreground">Here's your daily overview</p>
        </div>

        {/* Active Patients Overview */}
        <div className="mb-8">
          <ActivePatientsOverview />
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Today's Appointments - Takes 2 columns */}
          <div className="lg:col-span-2">
            <TodaysAppointments />
          </div>

          {/* Quick Reminders - Takes 1 column */}
          <div className="lg:col-span-1">
            <QuickReminders />
          </div>
        </div>

        {/* Performance Summary */}
        <div className="mb-8">
          <PerformanceSummary />
        </div>

        {/* Quick Actions */}
        <div>
          <QuickActions />
        </div>
      </main>
    </div>
  );
};

export default DentistDashboard;
