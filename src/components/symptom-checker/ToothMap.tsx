import { useState } from 'react';
import { ToothLocation } from '@/types/dental';
import { cn } from '@/lib/utils';

interface ToothMapProps {
  selectedLocation: ToothLocation | null;
  onLocationSelect: (location: ToothLocation) => void;
}

export const ToothMap = ({ selectedLocation, onLocationSelect }: ToothMapProps) => {
  const [hoveredLocation, setHoveredLocation] = useState<ToothLocation | null>(null);

  const locations: { id: ToothLocation; label: string; position: string }[] = [
    { id: 'upper-front', label: 'Upper Front Teeth', position: 'top-1/4 left-1/2 -translate-x-1/2' },
    { id: 'upper-left', label: 'Upper Left Teeth', position: 'top-1/4 left-1/4' },
    { id: 'upper-right', label: 'Upper Right Teeth', position: 'top-1/4 right-1/4' },
    { id: 'lower-front', label: 'Lower Front Teeth', position: 'bottom-1/4 left-1/2 -translate-x-1/2' },
    { id: 'lower-left', label: 'Lower Left Teeth', position: 'bottom-1/4 left-1/4' },
    { id: 'lower-right', label: 'Lower Right Teeth', position: 'bottom-1/4 right-1/4' },
    { id: 'gums', label: 'Gums', position: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' },
    { id: 'jaw', label: 'Jaw', position: 'bottom-8 left-1/2 -translate-x-1/2' },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-card rounded-2xl p-8 shadow-[var(--shadow-lg)] border border-border">
        <h3 className="text-2xl font-semibold mb-6 text-center">Select Affected Area</h3>
        
        {/* Interactive tooth diagram */}
        <div className="relative aspect-square bg-gradient-to-br from-background to-muted rounded-xl border-2 border-border p-8">
          {/* Visual representation of mouth */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-full h-full opacity-10">
              <ellipse cx="100" cy="100" rx="80" ry="90" fill="currentColor" />
              <path d="M 50 100 Q 100 130 150 100" stroke="currentColor" strokeWidth="3" fill="none" />
            </svg>
          </div>

          {/* Clickable areas */}
          {locations.map((location) => {
            const isSelected = selectedLocation === location.id;
            const isHovered = hoveredLocation === location.id;
            
            return (
              <button
                key={location.id}
                onClick={() => onLocationSelect(location.id)}
                onMouseEnter={() => setHoveredLocation(location.id)}
                onMouseLeave={() => setHoveredLocation(null)}
                className={cn(
                  'absolute w-20 h-20 rounded-full border-2 transition-all duration-300',
                  'flex items-center justify-center text-xs font-medium',
                  location.position,
                  isSelected 
                    ? 'bg-primary text-primary-foreground border-primary scale-110 shadow-[var(--shadow-glow)]' 
                    : isHovered
                    ? 'bg-secondary/20 border-secondary scale-105'
                    : 'bg-card border-border hover:border-primary/50'
                )}
              >
                <span className="text-center leading-tight px-2">{location.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Selected location display */}
        {selectedLocation && (
          <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20 text-center">
            <p className="text-sm font-medium text-primary">
              Selected: {locations.find(l => l.id === selectedLocation)?.label}
            </p>
          </div>
        )}

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 rounded-full bg-card border-2 border-border"></div>
            <span className="text-muted-foreground">Available</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 rounded-full bg-primary border-2 border-primary"></div>
            <span className="text-muted-foreground">Selected</span>
          </div>
        </div>
      </div>
    </div>
  );
};
