import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SymptomSelection } from '@/types/dental';
import { getDentalRecommendation } from '@/utils/dentalRules';
import { RecommendationCard } from '@/components/results/RecommendationCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, Calendar } from 'lucide-react';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selection] = useState<SymptomSelection>(location.state?.selection);

  useEffect(() => {
    if (!selection) {
      navigate('/symptom-checker');
    }
  }, [selection, navigate]);

  if (!selection) {
    return null;
  }

  const result = getDentalRecommendation(selection);

  // Generate journey steps
  const journeySteps = [
    { label: 'Location', value: selection.location?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Not specified' },
    { label: 'Symptoms', value: selection.symptoms.map(s => s.replace(/-/g, ' ')).join(', ') || 'None' },
    { label: 'Fever', value: selection.hasFever ? 'Yes' : 'No' },
    { label: 'Pain Level', value: `${selection.painLevel}/10` },
    { label: 'Urgency', value: result.urgency.toUpperCase() },
    { label: 'Specialist', value: result.specialist },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <CheckCircle className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium text-accent">Analysis Complete</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your Personalized Recommendation
          </h1>
          <p className="text-xl text-muted-foreground">
            Based on your symptoms and condition
          </p>
        </div>

        {/* Symptom Journey Timeline */}
        <div className="mb-12 bg-card rounded-2xl p-8 shadow-[var(--shadow-lg)] border border-border">
          <h2 className="text-2xl font-semibold mb-6 text-center">Your Symptom Journey</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {journeySteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mb-2">
                    <span className="text-sm font-bold text-primary">{index + 1}</span>
                  </div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">{step.label}</p>
                  <p className="text-sm font-semibold">{step.value}</p>
                </div>
                {index < journeySteps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-full w-full h-0.5 bg-border -translate-x-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recommendation */}
        <RecommendationCard result={result} />

        {/* Call to Action - Book Appointment */}
        <div className="mt-12 bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-center shadow-[var(--shadow-glow)]">
          <h3 className="text-2xl font-bold text-primary-foreground mb-3">
            Ready to Get Treatment?
          </h3>
          <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
            Schedule an appointment with a {result.specialist} and get the care you need. Our verified specialists are ready to help you.
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate('/book-appointment')}
            className="text-lg px-8 py-6 h-auto shadow-lg"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Book Appointment Now
          </Button>
        </div>

        {/* Back button */}
        <div className="mt-8 text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/symptom-checker')}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Start New Check
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;
