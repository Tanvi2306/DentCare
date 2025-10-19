import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, CalendarPlus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface ViewRecordsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface PatientRecord {
  id: number;
  name: string;
  age: number;
  contact: string;
  treatments: {
    date: string;
    type: string;
    notes: string;
    status: "Completed" | "Pending" | "Upcoming";
  }[];
}

const mockPatients: PatientRecord[] = [
  {
    id: 1,
    name: "Riya Sharma",
    age: 28,
    contact: "+91 98765 43210",
    treatments: [
      { date: "2024-01-15", type: "Cleaning", notes: "Regular cleaning, no issues found", status: "Completed" },
      { date: "2024-03-20", type: "Filling", notes: "Cavity on upper left molar", status: "Completed" },
      { date: "2024-06-10", type: "Checkup", notes: "Follow-up scheduled", status: "Upcoming" },
    ],
  },
  {
    id: 2,
    name: "Aarav Patel",
    age: 35,
    contact: "+91 98765 43211",
    treatments: [
      { date: "2024-02-10", type: "Root Canal", notes: "Successful procedure", status: "Completed" },
      { date: "2024-04-15", type: "Crown", notes: "Crown fitting scheduled", status: "Pending" },
    ],
  },
  {
    id: 3,
    name: "Priya Mehta",
    age: 42,
    contact: "+91 98765 43212",
    treatments: [
      { date: "2024-01-20", type: "Extraction", notes: "Wisdom tooth removed", status: "Completed" },
      { date: "2024-05-01", type: "Checkup", notes: "Healing process normal", status: "Completed" },
    ],
  },
];

const statusColors = {
  Completed: "bg-accent/10 text-accent border-accent/20",
  Pending: "bg-urgent-yellow/10 text-urgent-yellow border-urgent-yellow/20",
  Upcoming: "bg-primary/10 text-primary border-primary/20",
};

export const ViewRecordsDialog = ({ open, onOpenChange }: ViewRecordsDialogProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<PatientRecord | null>(null);

  const filteredPatients = mockPatients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Patient Records</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search patient by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Patient List or Selected Patient */}
          {!selectedPatient ? (
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-3">
                {filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className="p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedPatient(patient)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{patient.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Age: {patient.age} • {patient.contact}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {patient.treatments.length} treatment(s) on record
                        </p>
                      </div>
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{selectedPatient.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Age: {selectedPatient.age} • {selectedPatient.contact}
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedPatient(null)}>
                  Back to List
                </Button>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="font-medium text-foreground">Treatment History</h4>
                <ScrollArea className="h-[250px]">
                  <div className="space-y-3 pr-4">
                    {selectedPatient.treatments.map((treatment, index) => (
                      <div key={index} className="p-3 bg-muted/20 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-medium text-foreground">{treatment.type}</p>
                            <p className="text-xs text-muted-foreground">{treatment.date}</p>
                          </div>
                          <Badge variant="outline" className={statusColors[treatment.status]}>
                            {treatment.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{treatment.notes}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 gap-2">
                  <FileText className="w-4 h-4" />
                  Add Note
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <CalendarPlus className="w-4 h-4" />
                  Schedule Follow-Up
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
