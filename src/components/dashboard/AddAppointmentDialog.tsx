import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface AddAppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddAppointmentDialog = ({ open, onOpenChange }: AddAppointmentDialogProps) => {
  const [patientName, setPatientName] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [treatment, setTreatment] = useState("");
  const [status, setStatus] = useState("Pending");

  const handleSave = () => {
    if (!patientName || !date || !time || !treatment) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Appointment Added",
      description: `Appointment for ${patientName} has been scheduled.`,
    });

    // Reset form
    setPatientName("");
    setDate(undefined);
    setTime("");
    setTreatment("");
    setStatus("Pending");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Appointment</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="patient-name">Patient Name *</Label>
            <Input
              id="patient-name"
              placeholder="Enter patient name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Appointment Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Time *</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Treatment Type *</Label>
            <Select value={treatment} onValueChange={setTreatment}>
              <SelectTrigger>
                <SelectValue placeholder="Select treatment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cleaning">Cleaning</SelectItem>
                <SelectItem value="Filling">Filling</SelectItem>
                <SelectItem value="Root Canal">Root Canal</SelectItem>
                <SelectItem value="Checkup">Checkup</SelectItem>
                <SelectItem value="Extraction">Extraction</SelectItem>
                <SelectItem value="Crown">Crown</SelectItem>
                <SelectItem value="Whitening">Whitening</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Confirmed">Confirmed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Appointment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
