
import React from 'react';
import { Layout } from '@/components/Layout';
import { AnimatedSection } from '@/components/AnimatedSection';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Methodology = () => {
  return (
    <Layout>
      <div className="container max-w-4xl py-12">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>Methodology</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <AnimatedSection animation="fade-up" className="space-y-10">
          <section>
            <h1 className="text-4xl font-bold mb-6">Our Methodology</h1>
            <p className="lead text-xl text-muted-foreground mb-8">
              Learn how DevSalary calculates accurate salary predictions for developers worldwide.
            </p>

            <Tabs defaultValue="model" className="w-full">
              <TabsList className="w-full justify-start mb-6">
                <TabsTrigger value="model">Prediction Model</TabsTrigger>
                <TabsTrigger value="factors">Key Factors</TabsTrigger>
                <TabsTrigger value="data">Data Sources</TabsTrigger>
                <TabsTrigger value="accuracy">Accuracy & Limitations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="model" className="prose prose-lg dark:prose-invert">
                <h3 className="text-xl font-semibold mb-4">Our Prediction Model</h3>
                <p>
                  DevSalary uses a sophisticated machine learning model to predict developer salaries. 
                  We employ a combination of regression analysis and neural networks trained on millions 
                  of data points from various sources.
                </p>
                <p>
                  Our model is regularly updated with new data and refined to improve accuracy. We account 
                  for regional variations, industry trends, and economic factors that influence compensation.
                </p>
                <p>
                  The model evaluates multiple inputs simultaneously, weighing each factor according to its 
                  statistical significance in determining salary outcomes.
                </p>
              </TabsContent>
              
              <TabsContent value="factors" className="prose prose-lg dark:prose-invert">
                <h3 className="text-xl font-semibold mb-4">Key Factors in Our Model</h3>
                <p>
                  Our salary predictions take into account numerous factors that influence developer compensation:
                </p>
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    <strong>Location:</strong> Geographic region has one of the strongest correlations with salary levels.
                    We account for country, city, and cost of living indices.
                  </li>
                  <li>
                    <strong>Experience:</strong> Years of professional experience, with diminishing returns after 15+ years.
                  </li>
                  <li>
                    <strong>Education:</strong> Highest degree attained, with varying impact depending on career stage.
                  </li>
                  <li>
                    <strong>Skills & Technologies:</strong> Specific programming languages, frameworks, and tools, weighted 
                    by market demand.
                  </li>
                  <li>
                    <strong>Company Size:</strong> Organization size influences compensation structures.
                  </li>
                  <li>
                    <strong>Remote Work:</strong> Increasingly important factor that can both increase and decrease 
                    compensation depending on circumstances.
                  </li>
                </ul>
              </TabsContent>
              
              <TabsContent value="data" className="prose prose-lg dark:prose-invert">
                <h3 className="text-xl font-semibold mb-4">Data Sources</h3>
                <p>
                  Our prediction model is powered by data from multiple sources:
                </p>
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    <strong>User-Contributed Data:</strong> Anonymous salary information submitted by users.
                  </li>
                  <li>
                    <strong>Public Datasets:</strong> Open economic and employment data from government sources.
                  </li>
                  <li>
                    <strong>Industry Surveys:</strong> Regular salary surveys conducted across the technology sector.
                  </li>
                  <li>
                    <strong>Job Listings:</strong> Analysis of published compensation ranges from public job advertisements.
                  </li>
                  <li>
                    <strong>Partner Data:</strong> Anonymized data from partner organizations and recruiting firms.
                  </li>
                </ul>
                <p>
                  All data is anonymized, cleaned, and normalized before being incorporated into our model.
                </p>
              </TabsContent>
              
              <TabsContent value="accuracy" className="prose prose-lg dark:prose-invert">
                <h3 className="text-xl font-semibold mb-4">Accuracy & Limitations</h3>
                <p>
                  While we strive for the highest possible accuracy, salary prediction inherently involves some uncertainty:
                </p>
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    <strong>Accuracy Rate:</strong> Our predictions typically fall within ±15% of actual salaries for 
                    most common profiles.
                  </li>
                  <li>
                    <strong>Data Limitations:</strong> Some regions or specialized roles may have fewer data points, 
                    potentially affecting prediction accuracy.
                  </li>
                  <li>
                    <strong>Market Volatility:</strong> Rapidly changing economic conditions can impact salary trends 
                    faster than model updates.
                  </li>
                  <li>
                    <strong>Individual Factors:</strong> Unique circumstances like negotiation skills, internal equity, 
                    or company-specific policies can significantly impact actual compensation.
                  </li>
                </ul>
                <p>
                  We continuously work to improve our model's accuracy through regular updates and refinements.
                </p>
              </TabsContent>
            </Tabs>
          </section>
        </AnimatedSection>
      </div>
    </Layout>
  );
};

export default Methodology;
