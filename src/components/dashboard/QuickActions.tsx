import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ViewRecordsDialog } from "./ViewRecordsDialog";

export const QuickActions = () => {
  const [viewRecordsOpen, setViewRecordsOpen] = useState(false);

  return (
    <>
      <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Button
            className="bg-accent hover:bg-accent/90 text-white gap-2"
            onClick={() => setViewRecordsOpen(true)}
          >
            <FileText className="w-4 h-4" />
            View Records
          </Button>
        </div>
      </div>

      <ViewRecordsDialog
        open={viewRecordsOpen}
        onOpenChange={setViewRecordsOpen}
      />
    </>
  );
};
