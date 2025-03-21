
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { SalaryForm } from '@/components/SalaryForm';
import { SalaryResult } from '@/components/SalaryResult';
import { AnimatedSection } from '@/components/AnimatedSection';
import { DeveloperProfile, calculateSalary } from '@/utils/salaryCalculator';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [salary, setSalary] = useState<number | null>(null);
  const [profile, setProfile] = useState<DeveloperProfile | null>(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (formData: DeveloperProfile) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in or create an account to view salary predictions.",
        variant: "destructive",
      });
      navigate('/signin');
      return;
    }
    
    const calculatedSalary = calculateSalary(formData);
    setSalary(calculatedSalary);
    setProfile(formData);
    
    // Scroll to results
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const resetCalculation = () => {
    setSalary(null);
    setProfile(null);
  };

  return (
    <Layout>
      <section className="py-16 md:py-20 px-4">
        <div className="container max-w-6xl">
          {!salary && (
            <AnimatedSection className="text-center mb-12 max-w-3xl mx-auto" animation="fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                Predict Your Developer Salary
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Get an accurate estimate of your market value based on experience, location, and skills.
              </p>
              {!isAuthenticated && (
                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                  <Button 
                    onClick={() => navigate('/signin')} 
                    variant="outline" 
                    size="lg"
                  >
                    Sign In
                  </Button>
                  <Button 
                    onClick={() => navigate('/signup')} 
                    variant="default" 
                    size="lg"
                  >
                    Create Account
                  </Button>
                </div>
              )}
            </AnimatedSection>
          )}
          
          {salary && profile ? (
            <SalaryResult 
              salary={salary} 
              profile={profile} 
              onReset={resetCalculation} 
            />
          ) : (
            <SalaryForm onSubmit={handleSubmit} />
          )}
        </div>
      </section>

      {!salary && (
        <section className="py-16 bg-white/50 dark:bg-black/20 backdrop-blur-sm border-y border-gray-200 dark:border-gray-800">
          <div className="container max-w-6xl px-4">
            <AnimatedSection className="text-center mb-12" animation="fade-up">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our prediction model analyzes multiple factors to give you the most accurate salary estimate for your profile.
              </p>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AnimatedSection className="flex flex-col items-center text-center" animation="fade-up" delay={100}>
                <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Data Collection</h3>
                <p className="text-muted-foreground">
                  We collect your professional details including experience, location, and tech stack.
                </p>
              </AnimatedSection>
              
              <AnimatedSection className="flex flex-col items-center text-center" animation="fade-up" delay={200}>
                <div className="w-16 h-16 rounded-2xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                    <path d="M2 20H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M5 20V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M9 20V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M13 20V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M17 20V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Analysis</h3>
                <p className="text-muted-foreground">
                  Our algorithm analyzes market data and industry trends to calculate your worth.
                </p>
              </AnimatedSection>
              
              <AnimatedSection className="flex flex-col items-center text-center" animation="fade-up" delay={300}>
                <div className="w-16 h-16 rounded-2xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                    <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M12 16V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Results</h3>
                <p className="text-muted-foreground">
                  Get a detailed salary prediction with insights on how to increase your market value.
                </p>
              </AnimatedSection>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Index;
