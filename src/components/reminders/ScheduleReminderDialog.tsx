import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Mail, MessageCircle, Phone, Bell, CheckCircle2, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from '@/hooks/use-toast';

interface ScheduleReminderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ScheduleReminderDialog = ({ open, onOpenChange }: ScheduleReminderDialogProps) => {
  const [reminderMethod, setReminderMethod] = useState<'email' | 'sms' | 'whatsapp'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [reminderTiming, setReminderTiming] = useState<string[]>(['1-day']);
  const [showSuccess, setShowSuccess] = useState(false);

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const reminderOptions = [
    { id: '1-day', label: '1 day before' },
    { id: '2-hours', label: '2 hours before' },
    { id: '1-hour', label: '1 hour before' },
  ];

  const handleScheduleReminder = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please select both date and time for your appointment",
        variant: "destructive",
      });
      return;
    }

    if (reminderMethod === 'email' && !email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    if ((reminderMethod === 'sms' || reminderMethod === 'whatsapp') && !phone) {
      toast({
        title: "Phone Number Required",
        description: "Please enter your phone number",
        variant: "destructive",
      });
      return;
    }

    // Simulate reminder scheduling
    setShowSuccess(true);
    setTimeout(() => {
      toast({
        title: "Reminder Scheduled!",
        description: `You'll receive a reminder via ${reminderMethod} before your appointment on ${format(selectedDate, 'PPP')} at ${selectedTime}`,
      });
    }, 1500);
  };

  const handleAddToCalendar = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please select both date and time first",
        variant: "destructive",
      });
      return;
    }

    // Create Google Calendar link
    const startDateTime = new Date(selectedDate);
    const [time, period] = selectedTime.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    startDateTime.setHours(hours, minutes);

    const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000); // 1 hour duration

    const formatDateForCalendar = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Dental+Appointment&dates=${formatDateForCalendar(startDateTime)}/${formatDateForCalendar(endDateTime)}&details=Dental+appointment+scheduled+via+DentaMatch`;

    window.open(calendarUrl, '_blank');
  };

  const toggleReminderTiming = (id: string) => {
    setReminderTiming(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const resetForm = () => {
    setShowSuccess(false);
    setEmail('');
    setPhone('');
    setSelectedDate(undefined);
    setSelectedTime('');
    setReminderTiming(['1-day']);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => {
      onOpenChange(open);
      if (!open) resetForm();
    }}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Bell className="w-6 h-6 text-primary" />
            Schedule Appointment Reminder
          </DialogTitle>
          <DialogDescription>
            Get notified before your appointment via your preferred method
          </DialogDescription>
        </DialogHeader>

        {!showSuccess ? (
          <div className="space-y-6">
            {/* Reminder Method Selection */}
            <Tabs value={reminderMethod} onValueChange={(v) => setReminderMethod(v as any)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </TabsTrigger>
                <TabsTrigger value="sms" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  SMS
                </TabsTrigger>
                <TabsTrigger value="whatsapp" className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </TabsContent>

              <TabsContent value="sms" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="phone-sms">Phone Number</Label>
                  <Input
                    id="phone-sms"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </TabsContent>

              <TabsContent value="whatsapp" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="phone-whatsapp">WhatsApp Number</Label>
                  <Input
                    id="phone-whatsapp"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Make sure this number is registered with WhatsApp
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            {/* Date Selection */}
            <div className="space-y-2">
              <Label>Appointment Date</Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date()}
                className="rounded-md border border-border"
              />
            </div>

            {/* Time Selection */}
            <div className="space-y-2">
              <Label>Appointment Time</Label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Reminder Timing */}
            <div className="space-y-3">
              <Label>When to remind me</Label>
              <div className="space-y-2">
                {reminderOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.id}
                      checked={reminderTiming.includes(option.id)}
                      onCheckedChange={() => toggleReminderTiming(option.id)}
                    />
                    <label
                      htmlFor={option.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="hero"
                className="flex-1"
                onClick={handleScheduleReminder}
              >
                <Bell className="w-4 h-4 mr-2" />
                Schedule Reminder
              </Button>
              <Button
                variant="outline"
                onClick={handleAddToCalendar}
              >
                <CalendarIcon className="w-4 h-4 mr-2" />
                Add to Calendar
              </Button>
            </div>
          </div>
        ) : (
          <div className="py-12 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-accent/10 mx-auto flex items-center justify-center animate-scale-in">
              <CheckCircle2 className="w-12 h-12 text-accent" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Reminder Scheduled!</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                You'll receive a reminder via {reminderMethod} before your appointment on{' '}
                <span className="font-semibold text-foreground">
                  {selectedDate && format(selectedDate, 'PPP')}
                </span>{' '}
                at <span className="font-semibold text-foreground">{selectedTime}</span>
              </p>
            </div>
            <div className="flex gap-3 justify-center">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Close
              </Button>
              <Button
                variant="hero"
                onClick={handleAddToCalendar}
              >
                <CalendarIcon className="w-4 h-4 mr-2" />
                Add to Calendar
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};