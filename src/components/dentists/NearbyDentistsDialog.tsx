import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Star, Navigation, Clock, X } from 'lucide-react';
import { Specialist } from '@/types/dental';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Dentist {
  id: string;
  name: string;
  specialist: Specialist;
  distance: number;
  rating: number;
  reviewCount: number;
  address: string;
  phone: string;
  hours: string;
  isOpen: boolean;
  lat: number;
  lng: number;
}

interface NearbyDentistsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recommendedSpecialist: Specialist;
}

export const NearbyDentistsDialog = ({ open, onOpenChange, recommendedSpecialist }: NearbyDentistsDialogProps) => {
  const [locationGranted, setLocationGranted] = useState(false);
  const [manualLocation, setManualLocation] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  // Mock data - in real app, this would come from API
  const mockDentists: Dentist[] = [
    {
      id: '1',
      name: 'Smile Dental Clinic',
      specialist: recommendedSpecialist,
      distance: 1.2,
      rating: 4.8,
      reviewCount: 127,
      address: '123 Main Street, Downtown',
      phone: '+1 (555) 123-4567',
      hours: '9:00 AM - 6:00 PM',
      isOpen: true,
      lat: 40.7128,
      lng: -74.0060,
    },
    {
      id: '2',
      name: 'Care Dental Center',
      specialist: recommendedSpecialist,
      distance: 2.5,
      rating: 4.6,
      reviewCount: 89,
      address: '456 Oak Avenue, City Center',
      phone: '+1 (555) 234-5678',
      hours: '8:00 AM - 5:00 PM',
      isOpen: true,
      lat: 40.7580,
      lng: -73.9855,
    },
    {
      id: '3',
      name: 'Advanced Dental Solutions',
      specialist: recommendedSpecialist,
      distance: 3.8,
      rating: 4.9,
      reviewCount: 203,
      address: '789 Park Lane, Uptown',
      phone: '+1 (555) 345-6789',
      hours: 'Closed',
      isOpen: false,
      lat: 40.7489,
      lng: -73.9680,
    },
  ];

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setLocationGranted(true);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const handleManualLocationSearch = () => {
    if (manualLocation.trim()) {
      setLocationGranted(true);
    }
  };

  const handleGetDirections = (dentist: Dentist) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${dentist.lat},${dentist.lng}`, '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Find Nearby {recommendedSpecialist}s</DialogTitle>
          <DialogDescription>
            Locate verified dentists near your location
          </DialogDescription>
        </DialogHeader>

        {!locationGranted ? (
          <div className="space-y-6 py-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto flex items-center justify-center">
                <MapPin className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Share Your Location</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Allow location access to find dentists near you, or enter your city/zip code manually
              </p>
            </div>

            <div className="space-y-4 max-w-md mx-auto">
              <Button
                variant="hero"
                size="lg"
                className="w-full"
                onClick={requestLocation}
              >
                <MapPin className="w-5 h-5 mr-2" />
                Use My Current Location
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Enter City or Zip Code</Label>
                <div className="flex gap-2">
                  <Input
                    id="location"
                    placeholder="e.g., New York, NY or 10001"
                    value={manualLocation}
                    onChange={(e) => setManualLocation(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleManualLocationSearch()}
                  />
                  <Button onClick={handleManualLocationSearch} variant="outline">
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'list' | 'map')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="map">Map View</TabsTrigger>
              </TabsList>

              <TabsContent value="list" className="space-y-4 mt-6">
                {mockDentists.map((dentist) => (
                  <div
                    key={dentist.id}
                    className="bg-card border border-border rounded-xl p-6 hover:shadow-[var(--shadow-md)] transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-xl font-semibold">{dentist.name}</h4>
                            {dentist.isOpen ? (
                              <Badge className="bg-accent text-accent-foreground">Open</Badge>
                            ) : (
                              <Badge variant="secondary">Closed</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{dentist.specialist}</p>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-accent text-accent" />
                            <span className="font-semibold">{dentist.rating}</span>
                            <span className="text-muted-foreground">({dentist.reviewCount})</span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span>{dentist.distance} km away</span>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <span>{dentist.address}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            <a href={`tel:${dentist.phone}`} className="hover:text-primary">
                              {dentist.phone}
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{dentist.hours}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 min-w-[140px]">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleGetDirections(dentist)}
                        >
                          <Navigation className="w-4 h-4 mr-2" />
                          Directions
                        </Button>
                        <Button
                          variant="hero"
                          size="sm"
                          onClick={() => {
                            onOpenChange(false);
                            window.location.href = '/book-appointment';
                          }}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="map" className="mt-6">
                <div className="bg-muted rounded-xl p-12 text-center space-y-4">
                  <MapPin className="w-16 h-16 mx-auto text-muted-foreground" />
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Map Integration</h4>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      To enable the interactive map view, you'll need to add a Mapbox API token.
                      Visit <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mapbox.com</a> to get your free token.
                    </p>
                  </div>
                  <Button variant="outline" onClick={() => setViewMode('list')}>
                    Back to List View
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};