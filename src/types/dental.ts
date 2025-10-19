export type ToothLocation = 
  | 'upper-front' 
  | 'upper-left' 
  | 'upper-right' 
  | 'lower-front' 
  | 'lower-left' 
  | 'lower-right'
  | 'gums'
  | 'jaw';

export type Symptom = 
  | 'pain'
  | 'sensitivity'
  | 'bleeding'
  | 'swelling'
  | 'looseness'
  | 'discoloration'
  | 'bad-breath'
  | 'clicking'
  | 'difficulty-chewing'
  | 'cavity';

export type UrgencyLevel = 'low' | 'medium' | 'high';

export type Specialist = 
  | 'Endodontist'
  | 'Periodontist'
  | 'Oral Surgeon'
  | 'Orthodontist'
  | 'Prosthodontist'
  | 'General Dentist'
  | 'Pediatric Dentist';

export interface SymptomSelection {
  location: ToothLocation | null;
  symptoms: Symptom[];
  hasFever: boolean;
  painLevel?: number;
}

export interface RecommendationResult {
  specialist: Specialist;
  urgency: UrgencyLevel;
  reason: string;
  description: string;
  preventiveTips: string[];
  estimatedCost?: string;
}

export interface JourneyStep {
  label: string;
  value: string;
  icon?: string;
}
