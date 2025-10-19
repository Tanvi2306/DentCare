import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Calendar as CalendarIcon, Clock, ArrowLeft } from "lucide-react";

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM", "5:00 PM"
];

const specialists = [
  "General Dentist",
  "Orthodontist",
  "Endodontist",
  "Periodontist",
  "Oral Surgeon",
  "Prosthodontist",
  "Pediatric Dentist",
  "Cosmetic Dentist"
];

const BookAppointment = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    specialist: "",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime || !formData.fullName || !formData.email || !formData.phone || !formData.specialist) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and select a date and time.",
        variant: "destructive"
      });
      return;
    }

    // Save appointment to localStorage
    const appointmentStorage = {
      add: (appointment: any) => {
        const appointments = JSON.parse(localStorage.getItem("appointments") || "[]");
        const newAppointment = {
          ...appointment,
          id: `apt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
        };
        appointments.push(newAppointment);
        localStorage.setItem("appointments", JSON.stringify(appointments));
        window.dispatchEvent(new CustomEvent("appointmentsUpdated"));
        return newAppointment;
      }
    };

    appointmentStorage.add({
      patientName: formData.fullName,
      time: selectedTime,
      date: selectedDate.toISOString(),
      treatment: formData.specialist,
      status: "Pending",
      email: formData.email,
      phone: formData.phone,
      notes: formData.notes
    });

    toast({
      title: "Appointment Booked Successfully! 🎉",
      description: `Your appointment with ${formData.specialist} is scheduled for ${selectedDate.toLocaleDateString()} at ${selectedTime}. We'll contact you soon!`,
    });

    // Reset form
    setSelectedDate(undefined);
    setSelectedTime("");
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      specialist: "",
      notes: ""
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4 text-primary-foreground hover:bg-white/20"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Book Your Appointment</h1>
          <p className="text-lg opacity-90">Choose your preferred date, time, and specialist for your dental care</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Date & Time */}
            <div className="space-y-6">
              {/* Calendar Card */}
              <Card className="shadow-lg border-2 border-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-primary" />
                    Select Date
                  </CardTitle>
                  <CardDescription>Choose your preferred appointment date</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    className="rounded-md border pointer-events-auto"
                  />
                </CardContent>
              </Card>

              {/* Time Slots Card */}
              <Card className="shadow-lg border-2 border-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Select Time
                  </CardTitle>
                  <CardDescription>Pick an available time slot</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        type="button"
                        variant={selectedTime === time ? "default" : "outline"}
                        className={`transition-all duration-300 ${
                          selectedTime === time 
                            ? "shadow-[var(--shadow-glow)]" 
                            : "hover:border-primary"
                        }`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Contact Form */}
            <div>
              <Card className="shadow-lg border-2 border-primary/10">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Please provide your details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialist">Specialist Type *</Label>
                    <Select
                      value={formData.specialist}
                      onValueChange={(value) => setFormData({ ...formData, specialist: value })}
                    >
                      <SelectTrigger id="specialist">
                        <SelectValue placeholder="Select a specialist" />
                      </SelectTrigger>
                      <SelectContent>
                        {specialists.map((specialist) => (
                          <SelectItem key={specialist} value={specialist}>
                            {specialist}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any specific concerns or requests..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full text-lg py-6"
                  >
                    Book Appointment
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    We'll confirm your appointment within 24 hours
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
