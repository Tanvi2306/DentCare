import { Button } from "@/components/ui/button";
import { Activity, MapPin, Shield, Sparkles, Stethoscope } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border shadow-[var(--shadow-sm)]">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Trusted by 10,000+ patients</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Find the Right
            <span className="block mt-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Dental Specialist
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            No more confusion. Our intelligent symptom checker guides you to the perfect dental specialist in seconds.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => navigate('/symptom-checker')}
              className="text-lg px-8 py-6 h-auto"
            >
              Start Symptom Checker
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/book-appointment')}
              className="text-lg px-8 py-6 h-auto"
            >
              Book Appointment
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/how-it-works')}
              className="text-lg px-8 py-6 h-auto"
            >
              How It Works
            </Button>
          </div>

          {/* Dentist Login Link */}
          <button
            onClick={() => navigate('/dentist/login')}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors pt-2"
          >
            <Stethoscope className="w-4 h-4" />
            <span>Are you a dentist? Login here</span>
          </button>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card border border-border shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Instant Analysis</h3>
              <p className="text-sm text-muted-foreground">Get specialist recommendations in under 60 seconds</p>
            </div>

            <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card border border-border shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold text-lg">100% Transparent</h3>
              <p className="text-sm text-muted-foreground">Rule-based system you can trust and understand</p>
            </div>

            <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card border border-border shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-lg">Find Nearby Dentists</h3>
              <p className="text-sm text-muted-foreground">Connect with verified specialists in your area</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
