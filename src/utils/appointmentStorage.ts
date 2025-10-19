export interface Appointment {
  id: string;
  patientName: string;
  time: string;
  date: string;
  treatment: string;
  status: "Confirmed" | "Completed" | "Pending" | "Cancelled";
  email: string;
  phone: string;
  notes?: string;
  createdAt: string;
}

const STORAGE_KEY = "appointments";

export const appointmentStorage = {
  // Get all appointments
  getAll(): Appointment[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error loading appointments:", error);
      return [];
    }
  },

  // Add a new appointment
  add(appointment: Omit<Appointment, "id" | "createdAt">): Appointment {
    const appointments = this.getAll();
    const newAppointment: Appointment = {
      ...appointment,
      id: `apt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    };
    appointments.push(newAppointment);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
    
    // Dispatch custom event for real-time updates
    window.dispatchEvent(new CustomEvent("appointmentsUpdated"));
    
    return newAppointment;
  },

  // Update appointment status
  updateStatus(id: string, status: Appointment["status"]): void {
    const appointments = this.getAll();
    const updated = appointments.map(apt => 
      apt.id === id ? { ...apt, status } : apt
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    
    // Dispatch custom event for real-time updates
    window.dispatchEvent(new CustomEvent("appointmentsUpdated"));
  },

  // Get today's appointments
  getToday(): Appointment[] {
    const today = new Date().toDateString();
    return this.getAll().filter(apt => 
      new Date(apt.date).toDateString() === today
    );
  },

  // Get appointments for current month
  getThisMonth(): Appointment[] {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    return this.getAll().filter(apt => {
      const aptDate = new Date(apt.createdAt);
      return aptDate.getMonth() === currentMonth && 
             aptDate.getFullYear() === currentYear;
    });
  },

  // Get appointments with specific status
  getByStatus(status: Appointment["status"]): Appointment[] {
    return this.getAll().filter(apt => apt.status === status);
  }
};
