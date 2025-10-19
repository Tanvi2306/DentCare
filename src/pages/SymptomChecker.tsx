import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ToothMap } from '@/components/symptom-checker/ToothMap';
import { SymptomSelector } from '@/components/symptom-checker/SymptomSelector';
import { AdditionalQuestions } from '@/components/symptom-checker/AdditionalQuestions';
import { SymptomSelection, Symptom, ToothLocation } from '@/types/dental';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const SymptomChecker = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selection, setSelection] = useState<SymptomSelection>({
    location: null,
    symptoms: [],
    hasFever: false,
    painLevel: 0,
  });

  const handleLocationSelect = (location: ToothLocation) => {
    setSelection(prev => ({ ...prev, location }));
  };

  const handleSymptomToggle = (symptom: Symptom) => {
    setSelection(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }));
  };

  const handleNext = () => {
    if (step === 1 && !selection.location) {
      toast.error('Please select an affected area');
      return;
    }
    if (step === 2 && selection.symptoms.length === 0) {
      toast.error('Please select at least one symptom');
      return;
    }
    if (step < 3) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Navigate to results
      navigate('/results', { state: { selection } });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Symptom Checker
          </h1>
          <p className="text-xl text-muted-foreground">
            Let's find the right specialist for you
          </p>
        </div>

        {/* Progress indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all duration-300 ${
                  s === step 
                    ? 'w-12 bg-primary' 
                    : s < step 
                    ? 'w-8 bg-secondary' 
                    : 'w-8 bg-border'
                }`}
              />
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Step {step} of 3
          </p>
        </div>

        {/* Step content */}
        <div className="mb-12">
          {step === 1 && (
            <ToothMap
              selectedLocation={selection.location}
              onLocationSelect={handleLocationSelect}
            />
          )}
          
          {step === 2 && (
            <SymptomSelector
              selectedSymptoms={selection.symptoms}
              onSymptomToggle={handleSymptomToggle}
            />
          )}
          
          {step === 3 && (
            <AdditionalQuestions
              hasFever={selection.hasFever}
              setHasFever={(value) => setSelection(prev => ({ ...prev, hasFever: value }))}
              painLevel={selection.painLevel || 0}
              setPainLevel={(value) => setSelection(prev => ({ ...prev, painLevel: value }))}
            />
          )}
        </div>

        {/* Navigation buttons */}
        <div className="flex gap-4 justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={handleBack}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <Button
            variant="hero"
            size="lg"
            onClick={handleNext}
          >
            {step === 3 ? 'Get Recommendation' : 'Next'}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;
