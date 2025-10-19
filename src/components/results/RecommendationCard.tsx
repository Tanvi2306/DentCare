import { useState } from 'react';
import { RecommendationResult } from '@/types/dental';
import { getUrgencyColor, getUrgencyLabel } from '@/utils/dentalRules';
import { AlertCircle, CheckCircle, DollarSign, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NearbyDentistsDialog } from '@/components/dentists/NearbyDentistsDialog';
import { ScheduleReminderDialog } from '@/components/reminders/ScheduleReminderDialog';

interface RecommendationCardProps {
  result: RecommendationResult;
}

export const RecommendationCard = ({ result }: RecommendationCardProps) => {
  const [showNearbyDentists, setShowNearbyDentists] = useState(false);
  const [showScheduleReminder, setShowScheduleReminder] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Urgency banner */}
      <div className={`rounded-2xl p-6 ${getUrgencyColor(result.urgency)} shadow-[var(--shadow-lg)]`}>
        <div className="flex items-center gap-4">
          <AlertCircle className="w-8 h-8 flex-shrink-0" />
          <div>
            <h3 className="text-2xl font-bold mb-1">Urgency Level</h3>
            <p className="text-lg opacity-90">{getUrgencyLabel(result.urgency)}</p>
          </div>
        </div>
      </div>

      {/* Specialist recommendation */}
      <div className="bg-card rounded-2xl p-8 shadow-[var(--shadow-lg)] border border-border">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-2">Recommended Specialist</h2>
            <p className="text-4xl font-bold text-primary mb-4">{result.specialist}</p>
            <p className="text-lg text-muted-foreground">{result.description}</p>
          </div>
        </div>

        <div className="p-4 bg-secondary/10 rounded-lg border border-secondary/20">
          <p className="font-medium text-secondary">
            <span className="font-semibold">Why: </span>{result.reason}
          </p>
        </div>
      </div>

      {/* Preventive tips */}
      <div className="bg-card rounded-2xl p-8 shadow-[var(--shadow-lg)] border border-border">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
            <Lightbulb className="w-6 h-6 text-accent" />
          </div>
          <h3 className="text-2xl font-semibold">Preventive Care Tips</h3>
        </div>
        
        <ul className="space-y-3">
          {result.preventiveTips.map((tip, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Cost estimate */}
      {result.estimatedCost && (
        <div className="bg-card rounded-2xl p-8 shadow-[var(--shadow-lg)] border border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold">Estimated Treatment Cost</h3>
          </div>
          
          <p className="text-3xl font-bold text-primary">{result.estimatedCost}</p>
          <p className="text-sm text-muted-foreground mt-2">
            * Costs may vary based on location and specific treatment requirements
          </p>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          variant="hero" 
          size="lg" 
          className="flex-1"
          onClick={() => setShowNearbyDentists(true)}
        >
          Find Nearby Dentists
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          className="flex-1"
          onClick={() => setShowScheduleReminder(true)}
        >
          Schedule Reminder
        </Button>
      </div>

      {/* Dialogs */}
      <NearbyDentistsDialog
        open={showNearbyDentists}
        onOpenChange={setShowNearbyDentists}
        recommendedSpecialist={result.specialist}
      />
      <ScheduleReminderDialog
        open={showScheduleReminder}
        onOpenChange={setShowScheduleReminder}
      />
    </div>
  );
};
