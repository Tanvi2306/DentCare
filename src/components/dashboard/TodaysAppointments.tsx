import { Clock, Calendar, ArrowRight, Check, X, Edit, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState, useEffect } from "react";

interface Appointment {
  id: string;
  patientName: string;
  time: string;
  date: string;
  treatment: string;
  status: "Confirmed" | "Completed" | "Pending" | "Cancelled";
}

const statusColors = {
  Confirmed: "bg-primary/10 text-primary border-primary/20",
  Completed: "bg-accent/10 text-accent border-accent/20",
  Pending: "bg-urgent-yellow/10 text-urgent-yellow border-urgent-yellow/20",
  Cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

const loadAllAppointments = (): Appointment[] => {
  try {
    const data = localStorage.getItem("appointments");
    if (!data) return [];
    
    const allAppointments = JSON.parse(data);
    
    // Sort by date and time (most recent first)
    return allAppointments.sort((a: Appointment, b: Appointment) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateB.getTime() - dateA.getTime();
    });
  } catch (error) {
    console.error("Error loading appointments:", error);
    return [];
  }
};

const updateAppointmentStatus = (id: string, status: Appointment["status"]) => {
  try {
    const data = localStorage.getItem("appointments");
    if (!data) return;
    
    const appointments = JSON.parse(data);
    const updated = appointments.map((apt: Appointment) => 
      apt.id === id ? { ...apt, status } : apt
    );
    
    localStorage.setItem("appointments", JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("appointmentsUpdated"));
  } catch (error) {
    console.error("Error updating appointment:", error);
  }
};

export const TodaysAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const loadAppointments = () => {
    setAppointments(loadAllAppointments());
  };

  useEffect(() => {
    loadAppointments();

    // Listen for appointment updates
    const handleUpdate = () => loadAppointments();
    window.addEventListener("appointmentsUpdated", handleUpdate);

    return () => {
      window.removeEventListener("appointmentsUpdated", handleUpdate);
    };
  }, []);

  const handleConfirm = (id: string) => {
    updateAppointmentStatus(id, "Confirmed");
  };

  const handleCancel = (id: string) => {
    updateAppointmentStatus(id, "Cancelled");
  };

  const handleComplete = (id: string) => {
    updateAppointmentStatus(id, "Completed");
  };

  const handleEdit = (id: string) => {
    console.log("Edit appointment:", id);
    // TODO: Open edit dialog
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Appointments</h2>
        </div>
        <span className="text-sm text-muted-foreground">
          {appointments.length} Total
        </span>
      </div>

      <div className="space-y-3">
        {appointments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No appointments scheduled</p>
          </div>
        ) : (
          appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors gap-4"
          >
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="flex flex-col gap-1 text-muted-foreground min-w-[120px]">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {new Date(appointment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">{appointment.time}</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground">{appointment.patientName}</p>
                <p className="text-sm text-muted-foreground">{appointment.treatment}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleConfirm(appointment.id)}
                      className="h-8 w-8 text-primary hover:bg-primary/10"
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Confirm</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleCancel(appointment.id)}
                      className="h-8 w-8 text-destructive hover:bg-destructive/10"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Cancel</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleEdit(appointment.id)}
                      className="h-8 w-8 text-muted-foreground hover:bg-muted"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Edit / Reschedule</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleComplete(appointment.id)}
                      className="h-8 w-8 text-accent hover:bg-accent/10"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Mark as Completed</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Badge variant="outline" className={statusColors[appointment.status]}>
                {appointment.status}
              </Badge>
            </div>
          </div>
          ))
        )}
      </div>

      <Button
        variant="ghost"
        className="w-full mt-4 text-primary hover:text-primary hover:bg-primary/5"
      >
        View All Appointments
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};
