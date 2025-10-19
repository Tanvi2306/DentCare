import { SymptomSelection, RecommendationResult, UrgencyLevel, Specialist } from '@/types/dental';

// Rule-based engine for dental specialist recommendations
export const getDentalRecommendation = (selection: SymptomSelection): RecommendationResult => {
  const { symptoms, hasFever, painLevel = 0 } = selection;

  // High urgency rules
  if (symptoms.includes('swelling') && hasFever && painLevel >= 7) {
    return {
      specialist: 'Oral Surgeon',
      urgency: 'high',
      reason: 'Severe infection detected with swelling, fever, and intense pain',
      description: 'This combination suggests a serious infection that requires immediate attention to prevent complications.',
      preventiveTips: [
        'Seek immediate medical attention',
        'Do not apply heat to the swollen area',
        'Rinse with warm salt water gently',
        'Take prescribed antibiotics if available'
      ],
      estimatedCost: '₹3,000 - ₹8,000'
    };
  }

  if (symptoms.includes('pain') && symptoms.includes('swelling') && painLevel >= 7) {
    return {
      specialist: 'Endodontist',
      urgency: 'high',
      reason: 'Severe tooth pain with swelling indicates possible abscess',
      description: 'Root canal treatment or emergency intervention may be needed to save the tooth.',
      preventiveTips: [
        'Visit dentist within 24 hours',
        'Avoid chewing on affected side',
        'Take over-the-counter pain relief',
        'Apply cold compress for 15 minutes'
      ],
      estimatedCost: '₹2,500 - ₹5,000'
    };
  }

  // Medium urgency rules
  if (symptoms.includes('bleeding') && symptoms.includes('looseness')) {
    return {
      specialist: 'Periodontist',
      urgency: 'medium',
      reason: 'Gum bleeding and tooth looseness suggest periodontal disease',
      description: 'Advanced gum disease can lead to tooth loss if not treated promptly.',
      preventiveTips: [
        'Schedule appointment within a week',
        'Brush gently with soft-bristled brush',
        'Floss daily despite bleeding',
        'Rinse with antibacterial mouthwash',
        'Avoid smoking and tobacco'
      ],
      estimatedCost: '₹1,500 - ₹4,000'
    };
  }

  if (symptoms.includes('cavity') && symptoms.includes('pain')) {
    return {
      specialist: 'General Dentist',
      urgency: 'medium',
      reason: 'Cavity with pain requires filling to prevent further decay',
      description: 'Untreated cavities can lead to infection and may require root canal treatment.',
      preventiveTips: [
        'Book appointment within 2 weeks',
        'Avoid sugary foods and drinks',
        'Use fluoride toothpaste',
        'Rinse after meals',
        'Consider temporary filling if pain is severe'
      ],
      estimatedCost: '₹800 - ₹2,000'
    };
  }

  if (symptoms.includes('clicking') && symptoms.includes('difficulty-chewing')) {
    return {
      specialist: 'Oral Surgeon',
      urgency: 'medium',
      reason: 'TMJ (jaw joint) disorder affecting jaw function',
      description: 'Temporomandibular joint issues can worsen without proper treatment.',
      preventiveTips: [
        'Schedule consultation within 2-3 weeks',
        'Avoid hard or chewy foods',
        'Apply warm compress to jaw',
        'Practice gentle jaw exercises',
        'Avoid excessive jaw movement'
      ],
      estimatedCost: '₹2,000 - ₹6,000'
    };
  }

  // Low urgency rules
  if (symptoms.includes('sensitivity')) {
    return {
      specialist: 'General Dentist',
      urgency: 'low',
      reason: 'Tooth sensitivity is common and treatable',
      description: 'Sensitivity can be managed with proper oral care and desensitizing treatments.',
      preventiveTips: [
        'Use desensitizing toothpaste',
        'Avoid acidic foods and drinks',
        'Use soft-bristled toothbrush',
        'Brush gently in circular motions',
        'Schedule routine check-up'
      ],
      estimatedCost: '₹500 - ₹1,500'
    };
  }

  if (symptoms.includes('discoloration')) {
    return {
      specialist: 'Prosthodontist',
      urgency: 'low',
      reason: 'Tooth discoloration - cosmetic treatment available',
      description: 'Professional whitening or veneers can restore your smile\'s brightness.',
      preventiveTips: [
        'Schedule consultation at convenience',
        'Reduce coffee and tea consumption',
        'Quit smoking if applicable',
        'Use whitening toothpaste',
        'Maintain regular brushing routine'
      ],
      estimatedCost: '₹3,000 - ₹15,000'
    };
  }

  if (symptoms.includes('bad-breath')) {
    return {
      specialist: 'Periodontist',
      urgency: 'low',
      reason: 'Persistent bad breath may indicate gum issues',
      description: 'Professional cleaning and gum treatment can eliminate chronic bad breath.',
      preventiveTips: [
        'Brush tongue daily',
        'Floss between all teeth',
        'Use antibacterial mouthwash',
        'Stay hydrated throughout day',
        'Visit dentist for professional cleaning'
      ],
      estimatedCost: '₹1,000 - ₹3,000'
    };
  }

  // Default case
  return {
    specialist: 'General Dentist',
    urgency: 'low',
    reason: 'General dental consultation recommended',
    description: 'A routine check-up will help identify any issues and provide appropriate care.',
    preventiveTips: [
      'Brush twice daily for 2 minutes',
      'Floss at least once per day',
      'Use fluoride toothpaste',
      'Limit sugary snacks and drinks',
      'Visit dentist every 6 months'
    ],
    estimatedCost: '₹300 - ₹800'
  };
};

export const getUrgencyColor = (urgency: UrgencyLevel): string => {
  switch (urgency) {
    case 'high':
      return 'bg-destructive text-destructive-foreground';
    case 'medium':
      return 'bg-yellow-500 text-white';
    case 'low':
      return 'bg-accent text-accent-foreground';
  }
};

export const getUrgencyLabel = (urgency: UrgencyLevel): string => {
  switch (urgency) {
    case 'high':
      return 'Urgent - Seek immediate care';
    case 'medium':
      return 'Moderate - Schedule soon';
    case 'low':
      return 'Low - Routine care';
  }
};
