import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Activity, AlertCircle, ArrowRight, CheckCircle, Lightbulb, MapPin } from 'lucide-react';

const HowItWorks = () => {
  const navigate = useNavigate();

  const steps = [
    {
      icon: MapPin,
      title: 'Select Affected Area',
      description: 'Click on the interactive tooth map to identify which tooth, gum area, or jaw region is affected.'
    },
    {
      icon: AlertCircle,
      title: 'Choose Your Symptoms',
      description: 'Select from common dental symptoms like pain, swelling, bleeding, sensitivity, and more.'
    },
    {
      icon: Activity,
      title: 'Answer Quick Questions',
      description: 'Tell us about fever presence and rate your pain level to help us assess urgency.'
    },
    {
      icon: CheckCircle,
      title: 'Get Specialist Recommendation',
      description: 'Receive instant, rule-based recommendations for the right dental specialist to visit.'
    },
    {
      icon: Lightbulb,
      title: 'Follow Preventive Tips',
      description: 'Access personalized oral care tips and estimated treatment costs for your condition.'
    }
  ];

  const features = [
    {
      title: '100% Transparent',
      description: 'No black-box AI. Every recommendation follows clear, understandable rules.'
    },
    {
      title: 'Urgency Detection',
      description: 'Automatically identifies emergency conditions requiring immediate attention.'
    },
    {
      title: 'Cost Estimates',
      description: 'Know approximate treatment costs before visiting the dentist.'
    },
    {
      title: 'Preventive Care',
      description: 'Get actionable tips to maintain oral health and prevent future issues.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            How It Works
          </h1>
          <p className="text-xl text-muted-foreground">
            Simple, transparent, and effective dental specialist recommendations in 5 easy steps
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto space-y-12 mb-20">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index}
                className="flex flex-col md:flex-row gap-6 items-start bg-card rounded-2xl p-8 shadow-[var(--shadow-lg)] border border-border hover:shadow-[var(--shadow-glow)] transition-all duration-300"
              >
                <div className="flex items-center gap-4 md:w-auto w-full">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="md:hidden">
                    <span className="text-sm font-medium text-muted-foreground">Step {index + 1}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="hidden md:block mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Step {index + 1}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-lg">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Features Grid */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-card rounded-xl p-6 shadow-[var(--shadow-md)] border border-border"
              >
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            variant="hero" 
            size="lg"
            onClick={() => navigate('/symptom-checker')}
            className="text-lg px-8 py-6 h-auto"
          >
            Try Symptom Checker Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
