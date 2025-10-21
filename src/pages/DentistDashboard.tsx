import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { TodaysAppointments } from "@/components/dashboard/TodaysAppointments";
import { ActivePatientsOverview } from "@/components/dashboard/ActivePatientsOverview";
import { QuickReminders } from "@/components/dashboard/QuickReminders";
import { PerformanceSummary } from "@/components/dashboard/PerformanceSummary";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { EnhancedStatsCards } from "@/components/dashboard/EnhancedStatsCards";
import { AppointmentsTrendChart } from "@/components/dashboard/AppointmentsTrendChart";
import { TreatmentDistributionChart } from "@/components/dashboard/TreatmentDistributionChart";
import { RevenueChart } from "@/components/dashboard/RevenueChart";

const DentistDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [dentistName, setDentistName] = useState("Doctor");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/dentist/login");
        return;
      }

      // Fetch dentist profile
      const { data: dentistData, error } = await supabase
        .from('dentists')
        .select('full_name')
        .eq('user_id', session.user.id)
        .single();

      if (dentistData) {
        setDentistName(dentistData.full_name);
      }

      setIsLoading(false);
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        navigate("/dentist/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out successfully",
      description: "See you soon!",
    });
    navigate("/dentist/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-background to-teal-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-background to-teal-50">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dentist Dashboard</h1>
            <p className="text-xs text-muted-foreground mt-0.5">Advanced Analytics & Management</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="gap-2 shadow-sm"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-foreground mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Welcome, {dentistName}!
          </h2>
          <p className="text-muted-foreground">Here's your comprehensive overview and analytics</p>
        </div>

        {/* Enhanced Stats Cards */}
        <EnhancedStatsCards />

        {/* Active Patients Overview */}
        <ActivePatientsOverview />

        {/* Charts Grid - Revenue, Appointments Trend, Treatment Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart />
          <TreatmentDistributionChart />
        </div>

        {/* Full Width Appointments Trend */}
        <AppointmentsTrendChart />

        {/* Main Grid Layout - Appointments & Reminders */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
        <PerformanceSummary />

        {/* Quick Actions */}
        <QuickActions />
      </main>
    </div>
  );
};

export default DentistDashboard;
