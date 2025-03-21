
// This is a simplified salary prediction model
// In a real application, this would be replaced with machine learning models or API calls

export interface DeveloperProfile {
  country: string;
  yearsOfExperience: number;
  educationLevel: string;
  programmingLanguage: string;
  companySize: string;
  remoteWork: boolean;
}

// Base salaries by country (USD)
const countrySalaries: Record<string, number> = {
  'United States': 85000,
  'Canada': 70000,
  'United Kingdom': 65000,
  'Germany': 60000,
  'Australia': 70000,
  'France': 55000,
  'India': 25000,
  'Brazil': 30000,
  'China': 35000,
  'Japan': 60000,
  'Spain': 45000,
  'Netherlands': 60000,
  'Sweden': 58000,
  'Switzerland': 90000,
  'Russia': 35000,
  'South Korea': 50000,
  'Italy': 45000,
  'Singapore': 65000,
  'Israel': 70000,
  'Other': 40000,
};

// Education level multipliers
const educationMultipliers: Record<string, number> = {
  'High School': 0.85,
  'Associate Degree': 0.9,
  'Bachelor\'s Degree': 1.0,
  'Master\'s Degree': 1.15,
  'PhD': 1.3,
  'Self-taught': 0.9,
  'Bootcamp': 0.9,
};

// Programming language multipliers
const languageMultipliers: Record<string, number> = {
  'JavaScript': 1.0,
  'Python': 1.05,
  'Java': 1.02,
  'C#': 1.0,
  'C++': 1.05,
  'Go': 1.1,
  'Rust': 1.15,
  'Ruby': 0.95,
  'PHP': 0.9,
  'Swift': 1.08,
  'Kotlin': 1.03,
  'TypeScript': 1.05,
  'Other': 1.0,
};

// Company size multipliers
const companySizeMultipliers: Record<string, number> = {
  'Startup (1-50)': 0.9,
  'Small (51-200)': 0.95,
  'Medium (201-1000)': 1.0,
  'Large (1001-5000)': 1.1,
  'Enterprise (5000+)': 1.15,
};

// Experience calculation function
const calculateExperienceMultiplier = (years: number): number => {
  if (years < 1) return 0.7;
  if (years < 3) return 0.85;
  if (years < 5) return 1.0;
  if (years < 8) return 1.2;
  if (years < 12) return 1.35;
  return 1.5;
};

// Remote work adjustment
const remoteWorkMultiplier = 0.97; // 3% less for remote work on average

export const calculateSalary = (profile: DeveloperProfile): number => {
  // Get base salary for the country
  const baseSalary = countrySalaries[profile.country] || countrySalaries['Other'];
  
  // Apply multipliers
  const experienceMultiplier = calculateExperienceMultiplier(profile.yearsOfExperience);
  const educationMultiplier = educationMultipliers[profile.educationLevel] || 1.0;
  const languageMultiplier = languageMultipliers[profile.programmingLanguage] || 1.0;
  const sizeMultiplier = companySizeMultipliers[profile.companySize] || 1.0;
  
  // Calculate adjusted salary
  let adjustedSalary = baseSalary * experienceMultiplier * educationMultiplier * languageMultiplier * sizeMultiplier;
  
  // Apply remote work adjustment if applicable
  if (profile.remoteWork) {
    adjustedSalary *= remoteWorkMultiplier;
  }
  
  // Add some randomness (±5%) to make predictions more realistic
  const randomFactor = 0.95 + Math.random() * 0.1;
  adjustedSalary *= randomFactor;
  
  // Round to nearest thousand
  return Math.round(adjustedSalary / 1000) * 1000;
};

export const calculateSalaryRange = (
  prediction: number
): { min: number; max: number } => {
  const min = Math.round((prediction * 0.9) / 1000) * 1000;
  const max = Math.round((prediction * 1.1) / 1000) * 1000;
  return { min, max };
};

export const getExperienceLevels = (): { value: number; label: string }[] => {
  return [
    { value: 0, label: 'Less than 1 year' },
    { value: 1, label: '1-2 years' },
    { value: 3, label: '3-4 years' },
    { value: 5, label: '5-7 years' },
    { value: 8, label: '8-11 years' },
    { value: 12, label: '12+ years' },
  ];
};

export const getEducationLevels = (): string[] => {
  return [
    'High School',
    'Associate Degree',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'PhD',
    'Self-taught',
    'Bootcamp',
  ];
};

export const getCountries = (): string[] => {
  return Object.keys(countrySalaries);
};

export const getProgrammingLanguages = (): string[] => {
  return Object.keys(languageMultipliers);
};

export const getCompanySizes = (): string[] => {
  return Object.keys(companySizeMultipliers);
};
