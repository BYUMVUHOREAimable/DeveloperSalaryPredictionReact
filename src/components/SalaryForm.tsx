
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { 
  getCountries, 
  getEducationLevels, 
  getExperienceLevels, 
  getProgrammingLanguages, 
  getCompanySizes,
  DeveloperProfile 
} from '@/utils/salaryCalculator';
import { AnimatedSection } from './AnimatedSection';

interface SalaryFormProps {
  onSubmit: (profile: DeveloperProfile) => void;
}

export const SalaryForm: React.FC<SalaryFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<DeveloperProfile>({
    country: 'United States',
    yearsOfExperience: 3,
    educationLevel: 'Bachelor\'s Degree',
    programmingLanguage: 'JavaScript',
    companySize: 'Medium (201-1000)',
    remoteWork: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (name: keyof DeveloperProfile, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const experienceLevels = getExperienceLevels();
  const countries = getCountries();
  const educationLevels = getEducationLevels();
  const programmingLanguages = getProgrammingLanguages();
  const companySizes = getCompanySizes();

  return (
    <AnimatedSection animation="scale-in" className="w-full max-w-3xl mx-auto">
      <Card className="card-glass overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold mb-2">Developer Profile</h2>
            <p className="text-muted-foreground text-sm">
              Fill in your details to get a salary prediction
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="country" className="text-sm font-medium">
                Country
              </Label>
              <Select
                value={formData.country}
                onValueChange={(value) => handleChange('country', value)}
              >
                <SelectTrigger className="bg-white/50 dark:bg-black/10 backdrop-blur-sm border-gray-200 dark:border-gray-800">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label htmlFor="experience" className="text-sm font-medium">
                  Years of Experience
                </Label>
                <span className="text-xs text-muted-foreground">
                  {formData.yearsOfExperience < 1 
                    ? 'Less than 1 year'
                    : `${formData.yearsOfExperience}+ years`}
                </span>
              </div>
              <Select
                value={formData.yearsOfExperience.toString()}
                onValueChange={(value) => handleChange('yearsOfExperience', parseInt(value, 10))}
              >
                <SelectTrigger className="bg-white/50 dark:bg-black/10 backdrop-blur-sm border-gray-200 dark:border-gray-800">
                  <SelectValue placeholder="Select experience" />
                </SelectTrigger>
                <SelectContent className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
                  {experienceLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value.toString()}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="education" className="text-sm font-medium">
                Education Level
              </Label>
              <Select
                value={formData.educationLevel}
                onValueChange={(value) => handleChange('educationLevel', value)}
              >
                <SelectTrigger className="bg-white/50 dark:bg-black/10 backdrop-blur-sm border-gray-200 dark:border-gray-800">
                  <SelectValue placeholder="Select education" />
                </SelectTrigger>
                <SelectContent className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
                  {educationLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="language" className="text-sm font-medium">
                Primary Programming Language
              </Label>
              <Select
                value={formData.programmingLanguage}
                onValueChange={(value) => handleChange('programmingLanguage', value)}
              >
                <SelectTrigger className="bg-white/50 dark:bg-black/10 backdrop-blur-sm border-gray-200 dark:border-gray-800">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
                  {programmingLanguages.map((language) => (
                    <SelectItem key={language} value={language}>
                      {language}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="companySize" className="text-sm font-medium">
                Company Size
              </Label>
              <Select
                value={formData.companySize}
                onValueChange={(value) => handleChange('companySize', value)}
              >
                <SelectTrigger className="bg-white/50 dark:bg-black/10 backdrop-blur-sm border-gray-200 dark:border-gray-800">
                  <SelectValue placeholder="Select company size" />
                </SelectTrigger>
                <SelectContent className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
                  {companySizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="remote" className="text-sm font-medium">
                  Remote Work
                </Label>
                <Switch
                  id="remote"
                  checked={formData.remoteWork}
                  onCheckedChange={(checked) => handleChange('remoteWork', checked)}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Are you working remotely or looking for remote positions?
              </p>
            </div>
          </div>
          
          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Calculate Salary Prediction
            </Button>
          </div>
        </form>
      </Card>
    </AnimatedSection>
  );
};
