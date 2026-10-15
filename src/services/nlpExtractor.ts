import { Resource, PreferenceExtraction, PreferenceMatchResult, ResourceCategory, CostType, Language } from '../types';

/**
 * Natural Language Preference Extractor
 * Extracts user preferences across English and Indian languages (Tamil, Hindi, Telugu, Kannada, Malayalam, Bengali, Marathi)
 * without psychological diagnosis or medical profiling.
 */
export function extractPreferences(query: string): PreferenceExtraction {
  const q = query.toLowerCase();
  const tokens: PreferenceExtraction['tokens'] = [];

  let extractedCategory: ResourceCategory | undefined;
  let extractedCost: CostType | undefined;
  let extractedLanguage: Language | undefined;
  let extractedLocation: string | undefined;
  let extractedAvailability: string | undefined;

  // 1. Category extraction (Multilingual)
  if (
    q.includes('counsel') || q.includes('therapy') || q.includes('psychologist') || q.includes('counselling') ||
    q.includes('ஆலோசனை') || // Tamil
    q.includes('काउंसलिंग') || q.includes('परामर्श') || // Hindi
    q.includes('కౌన్సెలింగ్') || // Telugu
    q.includes('ಕೌನ್ಸೆಲಿಂಗ್') || // Kannada
    q.includes('കൗൺസിലിംഗ്') || // Malayalam
    q.includes('কাউন্সেলিং') || // Bengali
    q.includes('समुपदेशन') // Marathi
  ) {
    extractedCategory = 'counselling';
    tokens.push({ type: 'category', label: 'Counselling', value: 'counselling' });
  } else if (
    q.includes('addict') || q.includes('rehab') || q.includes('detox') || q.includes('recovery') || q.includes('sobriety') ||
    q.includes('மீட்பு') || q.includes('போதை') || // Tamil
    q.includes('रिकवरी') || q.includes('नशा') || q.includes('व्यसन') || // Hindi
    q.includes('పునరావాసం') || q.includes('వ్యసన') || // Telugu
    q.includes('ಚೇತರಿಕೆ') || // Kannada
    q.includes('വീണ്ടെടുക്കൽ') || // Malayalam
    q.includes('পুনরুদ্ধার') || // Bengali
    q.includes('पुनर्प्राप्ती') // Marathi
  ) {
    extractedCategory = 'recovery';
    tokens.push({ type: 'category', label: 'Recovery', value: 'recovery' });
  } else if (
    q.includes('crisis') || q.includes('suicide') || q.includes('helpline') || q.includes('distress') || q.includes('emergency') ||
    q.includes('நெருக்கடி') || q.includes('அவசரம்') || // Tamil
    q.includes('संकट') || q.includes('आपातकालीन') || // Hindi
    q.includes('సంక్షోభ') || q.includes('అత్యవసర') || // Telugu
    q.includes('ಬಿಕ್ಕಟ್ಟು') || q.includes('ತುರ್ತು') || // Kannada
    q.includes('അടിയന്തര') || // Malayalam
    q.includes('সংকট') || q.includes('জরুরি') || // Bengali
    q.includes('आपत्कालीन') // Marathi
  ) {
    extractedCategory = 'crisis';
    tokens.push({ type: 'category', label: 'Crisis Support', value: 'crisis' });
  } else if (
    q.includes('group') || q.includes('circle') || q.includes('peer') || q.includes('meetup') ||
    q.includes('குழு') || q.includes('समूह') || q.includes('సమూహ') || q.includes('ಗುಂಪು') || q.includes('ഗ്രൂപ്പ്') || q.includes('দল') || q.includes('गट')
  ) {
    extractedCategory = 'support_group';
    tokens.push({ type: 'category', label: 'Support Group', value: 'support_group' });
  } else if (
    q.includes('campus') || q.includes('student') || q.includes('university') || q.includes('college') || q.includes('hostel') ||
    q.includes('வளாக') || q.includes('மாணவர்') || q.includes('परिसर') || q.includes('छात्र') || q.includes('క్యాంపస్') || q.includes('ಕ್ಯಾಂಪಸ್') || q.includes('ক্যাম্পাস') || q.includes('कॅम्पस')
  ) {
    extractedCategory = 'campus';
    tokens.push({ type: 'category', label: 'Campus Support', value: 'campus' });
  } else if (
    q.includes('medical') || q.includes('doctor') || q.includes('psychiatry') || q.includes('hospital') || q.includes('clinic') ||
    q.includes('மருத்துவ') || q.includes('மருத்துவமனை') || q.includes('चिकित्सा') || q.includes('अस्पताल') || q.includes('ఆసుపత్రి') || q.includes('ಆಸ್ಪತ್ರೆ') || q.includes('ആശുപത്രി') || q.includes('হাসপাতাল') || q.includes('रुग्णालय')
  ) {
    extractedCategory = 'medical';
    tokens.push({ type: 'category', label: 'Medical Support', value: 'medical' });
  }

  // 2. Cost extraction (Multilingual)
  if (
    q.includes('free') || q.includes('zero cost') || q.includes('no cost') || q.includes('complimentary') ||
    q.includes('இலவச') || q.includes('கட்டணமின்றி') || // Tamil
    q.includes('मुफ्त') || q.includes('निःशुल्क') || q.includes('फ्री') || // Hindi
    q.includes('ఉచిత') || // Telugu
    q.includes('ಉಚಿತ') || // Kannada
    q.includes('സൗജന്യ') || // Malayalam
    q.includes('বিনামূল্যে') || // Bengali
    q.includes('मोफत') // Marathi
  ) {
    extractedCost = 'free';
    tokens.push({ type: 'cost', label: 'Free', value: 'free' });
  } else if (q.includes('sliding scale') || q.includes('subsidized') || q.includes('concession') || q.includes('സബ്‌സിഡി') || q.includes('ছাড়') || q.includes('सवलत')) {
    extractedCost = 'sliding_scale';
    tokens.push({ type: 'cost', label: 'Sliding Scale', value: 'sliding_scale' });
  } else if (q.includes('low cost') || q.includes('affordable') || q.includes('cheap') || q.includes('குறைந்த கட்டணம்') || q.includes('कम लागत') || q.includes('తక్కువ ఖర్చు')) {
    extractedCost = 'low_cost';
    tokens.push({ type: 'cost', label: 'Low Cost', value: 'low_cost' });
  }

  // 3. Language extraction (Multilingual)
  if (q.includes('tamil') || q.includes('தமிழ்') || q.includes('तमिल') || q.includes('తమిళ')) {
    extractedLanguage = 'Tamil';
    tokens.push({ type: 'language', label: 'Tamil', value: 'Tamil' });
  } else if (q.includes('english') || q.includes('ஆங்கிலம்') || q.includes('अंग्रेजी') || q.includes('ఇంగ్లీష్')) {
    extractedLanguage = 'English';
    tokens.push({ type: 'language', label: 'English', value: 'English' });
  } else if (q.includes('hindi') || q.includes('हिन्दी') || q.includes('இந்தி') || q.includes('హిందీ')) {
    extractedLanguage = 'Hindi';
    tokens.push({ type: 'language', label: 'Hindi', value: 'Hindi' });
  } else if (q.includes('telugu') || q.includes('తెలుగు')) {
    extractedLanguage = 'Telugu';
    tokens.push({ type: 'language', label: 'Telugu', value: 'Telugu' });
  } else if (q.includes('malayalam') || q.includes('മലയാളം')) {
    extractedLanguage = 'Malayalam';
    tokens.push({ type: 'language', label: 'Malayalam', value: 'Malayalam' });
  }

  // 4. Location extraction (Multilingual)
  if (
    q.includes('vellore') ||
    q.includes('வேலூர்') || // Tamil
    q.includes('वेल्लोर') || // Hindi / Marathi
    q.includes('వెల్లూరు') || // Telugu
    q.includes('ವೆಲ್ಲೂರು') || // Kannada
    q.includes('വെല്ലൂർ') || // Malayalam
    q.includes('ভেলোর') // Bengali
  ) {
    extractedLocation = 'Vellore';
    tokens.push({ type: 'location', label: 'Vellore', value: 'Vellore' });
  } else if (
    q.includes('katpadi') ||
    q.includes('காட்பாடி') ||
    q.includes('काटपाडी')
  ) {
    extractedLocation = 'Katpadi';
    tokens.push({ type: 'location', label: 'Katpadi', value: 'Katpadi' });
  } else if (q.includes('sathuvachari') || q.includes('சத்துவாச்சாரி')) {
    extractedLocation = 'Sathuvachari';
    tokens.push({ type: 'location', label: 'Sathuvachari', value: 'Sathuvachari' });
  }

  // 5. Availability extraction (Multilingual)
  if (
    q.includes('open today') || q.includes('today') || q.includes('now') || q.includes('immediate') ||
    q.includes('இன்று') || q.includes('இன்னைக்கு') || // Tamil
    q.includes('आज') || // Hindi / Marathi / Bengali
    q.includes('ఈరోజు') || q.includes('నేడు') || // Telugu
    q.includes('ಇಂದು') || // Kannada
    q.includes('ഇന്ന്') // Malayalam
  ) {
    extractedAvailability = 'open_today';
    tokens.push({ type: 'availability', label: 'Open today', value: 'open_today' });
  } else if (q.includes('24/7') || q.includes('anytime') || q.includes('night') || q.includes('round the clock') || q.includes('24 மணி நேரமும்') || q.includes('२४ तास')) {
    extractedAvailability = '24_7';
    tokens.push({ type: 'availability', label: '24/7 Available', value: '24_7' });
  } else if (q.includes('walk-in') || q.includes('no appointment')) {
    tokens.push({ type: 'availability', label: 'No Appointment Needed', value: 'walk_in' });
  }

  return {
    rawQuery: query,
    category: extractedCategory,
    cost: extractedCost,
    language: extractedLanguage,
    location: extractedLocation,
    availability: extractedAvailability,
    tokens
  };
}

/**
 * Calculates Explainable Preference Match Score between user criteria and a resource.
 * Explicitly transparent, non-diagnostic, and non-clinical.
 */
export function calculatePreferenceMatch(
  resource: Resource,
  extraction: PreferenceExtraction,
  fallbackActiveCategory?: string
): PreferenceMatchResult {
  const factors: PreferenceMatchResult['factors'] = [];
  let totalPoints = 0;
  let earnedPoints = 0;

  // 1. Service Type match
  const targetCategory = extraction.category || fallbackActiveCategory;
  if (targetCategory && targetCategory !== 'all') {
    totalPoints += 25;
    const catMatch = resource.category === targetCategory;
    if (catMatch) earnedPoints += 25;
    factors.push({
      id: 'service',
      title: 'Service match',
      matches: catMatch,
      detail: catMatch
        ? `Matches requested support discipline (${resource.category.replace('_', ' ')})`
        : `Provides ${resource.category.replace('_', ' ')} rather than requested ${targetCategory}`
    });
  } else {
    totalPoints += 15;
    earnedPoints += 15;
    factors.push({
      id: 'service',
      title: 'Service alignment',
      matches: true,
      detail: `Verified service category: ${resource.category.replace('_', ' ')}`
    });
  }

  // 2. Location & Proximity match
  totalPoints += 20;
  let locMatch = true;
  let locDetail = `Within close reach (${resource.distanceKm.toFixed(1)} km away in ${resource.city})`;
  if (extraction.location) {
    const cityLower = resource.city.toLowerCase();
    const addrLower = resource.address.toLowerCase();
    const targetLoc = extraction.location.toLowerCase();
    locMatch = cityLower.includes(targetLoc) || addrLower.includes(targetLoc) || resource.distanceKm <= 3.5;
    locDetail = locMatch
      ? `Located in / near ${extraction.location} (${resource.distanceKm.toFixed(1)} km)`
      : `Located in ${resource.city} (${resource.distanceKm.toFixed(1)} km)`;
  }
  if (locMatch) earnedPoints += 20;
  factors.push({
    id: 'location',
    title: 'Location & Distance',
    matches: locMatch,
    detail: locDetail
  });

  // 3. Cost match
  totalPoints += 20;
  let costMatch = true;
  let costDetail = `Cost structure: ${resource.cost.replace('_', ' ')} (${resource.costDetails})`;
  if (extraction.cost) {
    costMatch = resource.cost === extraction.cost || (extraction.cost === 'free' && resource.cost === 'free');
    costDetail = costMatch
      ? `Exactly meets your ${extraction.cost} requirement`
      : `Fee structure is ${resource.cost.replace('_', ' ')}`;
  }
  if (costMatch) earnedPoints += 20;
  factors.push({
    id: 'cost',
    title: 'Cost preference',
    matches: costMatch,
    detail: costDetail
  });

  // 4. Language match
  totalPoints += 15;
  let langMatch = true;
  let langDetail = `Languages supported: ${resource.languages.join(', ')}`;
  if (extraction.language) {
    langMatch = resource.languages.includes(extraction.language);
    langDetail = langMatch
      ? `Fluent support available in ${extraction.language}`
      : `Primary languages are ${resource.languages.join(', ')}`;
  }
  if (langMatch) earnedPoints += 15;
  factors.push({
    id: 'language',
    title: 'Language preference',
    matches: langMatch,
    detail: langDetail
  });

  // 5. Availability match
  totalPoints += 10;
  let availMatch = true;
  let availDetail = resource.availabilityHours;
  if (extraction.availability === 'open_today') {
    availMatch = resource.availability === 'open_today' || resource.availability === '24_7';
    availDetail = availMatch
      ? `Confirmed open today (${resource.availabilityHours})`
      : `Operates ${resource.availabilityHours}`;
  } else if (extraction.availability === '24_7') {
    availMatch = resource.availability === '24_7';
    availDetail = availMatch ? '24/7 Round-the-clock availability' : 'Has scheduled operating hours';
  }
  if (availMatch) earnedPoints += 10;
  factors.push({
    id: 'availability',
    title: 'Availability',
    matches: availMatch,
    detail: availDetail
  });

  // 6. Eligibility match
  totalPoints += 10;
  earnedPoints += 10;
  factors.push({
    id: 'eligibility',
    title: 'Eligibility & Access',
    matches: true,
    detail: resource.eligibility
  });

  const rawScore = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 85;
  const score = Math.min(98, Math.max(45, rawScore));

  const summary = factors.filter(f => f.matches).length >= 5
    ? 'Recommended because it matches your selected support type, language, cost preference, location and availability.'
    : 'Partially matches your search preferences with high relevance.';

  return {
    score,
    factors,
    summary
  };
}
