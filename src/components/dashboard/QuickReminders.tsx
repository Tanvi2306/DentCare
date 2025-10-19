import { Bell, ChevronRight } from "lucide-react";

interface Reminder {
  id: number;
  message: string;
  time: string;
}

const mockReminders: Reminder[] = [
  { id: 1, message: "Follow-up with Riya Sharma tomorrow", time: "Tomorrow, 10:00 AM" },
  { id: 2, message: "Appointment with Aarav Patel at 5:30 PM", time: "Today, 5:30 PM" },
  { id: 3, message: "Lab results due for Priya Mehta", time: "Today, 4:00 PM" },
];

export const QuickReminders = () => {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold text-foreground">Quick Reminders</h2>
      </div>

      <div className="space-y-3">
        {mockReminders.map((reminder) => (
          <div
            key={reminder.id}
            className="flex items-start justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer group"
          >
            <div className="flex-1">
              <p className="text-foreground font-medium mb-1">{reminder.message}</p>
              <p className="text-sm text-muted-foreground">{reminder.time}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        ))}
      </div>
    </div>
  );
};
