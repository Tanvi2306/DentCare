import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Thermometer, Activity } from 'lucide-react';

interface AdditionalQuestionsProps {
  hasFever: boolean;
  setHasFever: (value: boolean) => void;
  painLevel: number;
  setPainLevel: (value: number) => void;
}

export const AdditionalQuestions = ({
  hasFever,
  setHasFever,
  painLevel,
  setPainLevel,
}: AdditionalQuestionsProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Fever question */}
      <div className="bg-card rounded-2xl p-8 shadow-[var(--shadow-lg)] border border-border">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
            <Thermometer className="w-6 h-6 text-destructive" />
          </div>
          <h3 className="text-xl font-semibold">Do you have a fever?</h3>
        </div>
        
        <div className="flex gap-4">
          <Button
            variant={hasFever ? 'default' : 'outline'}
            onClick={() => setHasFever(true)}
            className="flex-1"
          >
            Yes
          </Button>
          <Button
            variant={!hasFever ? 'default' : 'outline'}
            onClick={() => setHasFever(false)}
            className="flex-1"
          >
            No
          </Button>
        </div>
      </div>

      {/* Pain level slider */}
      <div className="bg-card rounded-2xl p-8 shadow-[var(--shadow-lg)] border border-border">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Activity className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Rate your pain level</h3>
        </div>
        
        <div className="space-y-6">
          <Slider
            value={[painLevel]}
            onValueChange={(value) => setPainLevel(value[0])}
            max={10}
            min={0}
            step={1}
            className="w-full"
          />
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">No pain</span>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">{painLevel}</div>
              <div className="text-sm text-muted-foreground">
                {painLevel === 0 && 'No pain'}
                {painLevel > 0 && painLevel <= 3 && 'Mild'}
                {painLevel > 3 && painLevel <= 6 && 'Moderate'}
                {painLevel > 6 && painLevel <= 8 && 'Severe'}
                {painLevel > 8 && 'Extreme'}
              </div>
            </div>
            <span className="text-sm text-muted-foreground">Worst pain</span>
          </div>
        </div>
      </div>
    </div>
  );
};
