
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DeveloperProfile, calculateSalaryRange } from '@/utils/salaryCalculator';
import { AnimatedSection } from './AnimatedSection';
import { Progress } from "@/components/ui/progress";
import { SalaryDashboard } from './SalaryDashboard';

interface SalaryResultProps {
  salary: number;
  profile: DeveloperProfile;
  onReset: () => void;
}

export const SalaryResult: React.FC<SalaryResultProps> = ({ 
  salary, 
  profile, 
  onReset 
}) => {
  const { min, max } = calculateSalaryRange(salary);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate percentages for visualization
  const maxPossibleSalary = 250000; // Arbitrary max for visualization
  const percentage = Math.min(100, (salary / maxPossibleSalary) * 100);
  
  // Factors that influence the prediction
  const factors = [
    { name: 'Location', value: profile.country, influence: 'High' },
    { name: 'Experience', value: `${profile.yearsOfExperience}+ years`, influence: 'High' },
    { name: 'Education', value: profile.educationLevel, influence: 'Medium' },
    { name: 'Technology', value: profile.programmingLanguage, influence: 'Medium' },
    { name: 'Company Size', value: profile.companySize, influence: 'Medium' },
    { name: 'Remote Work', value: profile.remoteWork ? 'Yes' : 'No', influence: 'Low' },
  ];

  return (
    <AnimatedSection animation="fade-up" className="w-full max-w-6xl mx-auto">
      <Card className="card-glass overflow-hidden mb-6">
        <div className="p-6 space-y-8">
          <div className="text-center mb-6">
            <p className="text-sm font-medium text-muted-foreground mb-1">Based on your profile</p>
            <h2 className="text-3xl font-bold mb-2">Your Estimated Salary</h2>
            <div className="flex flex-col items-center justify-center mt-4">
              <div className="text-4xl md:text-5xl font-extrabold text-primary">
                {formatCurrency(salary)}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Potential range: {formatCurrency(min)} - {formatCurrency(max)}
              </p>
            </div>
          </div>
          
          <div className="space-y-3 mb-6">
            <h3 className="text-md font-medium mb-3">Salary Visualization</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span>Entry Level</span>
                  <span>Senior Level</span>
                </div>
                <Progress value={percentage} className="h-3" />
                <div className="relative">
                  <div 
                    className="absolute h-4 w-1 bg-primary top-[-24px] rounded-full"
                    style={{ left: `${percentage}%`, transform: 'translateX(-50%)' }}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-md font-medium mb-2">Key Factors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {factors.map((factor, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-white/40 dark:bg-black/20 backdrop-blur-sm">
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">{factor.name}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        factor.influence === 'High' 
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' 
                          : factor.influence === 'Medium'
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300'
                      }`}>
                        {factor.influence} Impact
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{factor.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button 
              onClick={onReset} 
              className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground py-5 rounded-xl transition-all duration-300"
            >
              Update Your Profile
            </Button>
            <Button 
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-5 rounded-xl transition-all duration-300"
              onClick={() => {
                window.print();
              }}
            >
              Save Results
            </Button>
          </div>
          
          <div className="pt-4 text-center">
            <p className="text-xs text-muted-foreground">
              This prediction is based on statistical models and industry data.
              Individual salaries may vary based on additional factors.
            </p>
          </div>
        </div>
      </Card>
      
      {/* Add the salary dashboard with visualizations */}
      <AnimatedSection animation="fade-up" delay={200}>
        <Card className="card-glass overflow-hidden">
          <div className="p-6 space-y-4">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold">Salary Insights Dashboard</h2>
              <p className="text-sm text-muted-foreground">
                Explore salary data and comparisons across different factors
              </p>
            </div>
            
            <SalaryDashboard salary={salary} profile={profile} />
          </div>
        </Card>
      </AnimatedSection>
    </AnimatedSection>
  );
};
