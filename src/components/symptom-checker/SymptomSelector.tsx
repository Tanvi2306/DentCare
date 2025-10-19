import { Symptom } from '@/types/dental';
import { cn } from '@/lib/utils';
import { AlertCircle, Droplet, Flame, Frown, Sparkles, Thermometer, Zap } from 'lucide-react';

interface SymptomSelectorProps {
  selectedSymptoms: Symptom[];
  onSymptomToggle: (symptom: Symptom) => void;
}

const symptomData: { id: Symptom; label: string; icon: any }[] = [
  { id: 'pain', label: 'Pain', icon: AlertCircle },
  { id: 'sensitivity', label: 'Sensitivity', icon: Zap },
  { id: 'bleeding', label: 'Bleeding', icon: Droplet },
  { id: 'swelling', label: 'Swelling', icon: Flame },
  { id: 'looseness', label: 'Loose Tooth', icon: Frown },
  { id: 'discoloration', label: 'Discoloration', icon: Sparkles },
  { id: 'bad-breath', label: 'Bad Breath', icon: Frown },
  { id: 'clicking', label: 'Jaw Clicking', icon: AlertCircle },
  { id: 'difficulty-chewing', label: 'Difficulty Chewing', icon: Frown },
  { id: 'cavity', label: 'Visible Cavity', icon: AlertCircle },
];

export const SymptomSelector = ({ selectedSymptoms, onSymptomToggle }: SymptomSelectorProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-card rounded-2xl p-8 shadow-[var(--shadow-lg)] border border-border">
        <h3 className="text-2xl font-semibold mb-6 text-center">What symptoms are you experiencing?</h3>
        <p className="text-muted-foreground text-center mb-8">Select all that apply</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {symptomData.map((symptom) => {
            const isSelected = selectedSymptoms.includes(symptom.id);
            const Icon = symptom.icon;
            
            return (
              <button
                key={symptom.id}
                onClick={() => onSymptomToggle(symptom.id)}
                className={cn(
                  'flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all duration-300',
                  'hover:scale-105 active:scale-95',
                  isSelected
                    ? 'bg-primary text-primary-foreground border-primary shadow-[var(--shadow-md)]'
                    : 'bg-background border-border hover:border-primary/50'
                )}
              >
                <Icon className="w-8 h-8" />
                <span className="text-sm font-medium text-center">{symptom.label}</span>
              </button>
            );
          })}
        </div>

        {selectedSymptoms.length > 0 && (
          <div className="mt-6 p-4 bg-secondary/10 rounded-lg border border-secondary/20">
            <p className="text-sm font-medium text-secondary text-center">
              {selectedSymptoms.length} symptom{selectedSymptoms.length > 1 ? 's' : ''} selected
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
