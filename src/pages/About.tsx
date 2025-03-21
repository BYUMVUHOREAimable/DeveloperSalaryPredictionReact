
import React from 'react';
import { Layout } from '@/components/Layout';
import { AnimatedSection } from '@/components/AnimatedSection';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Link } from 'react-router-dom';

const About = () => {
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
              <BreadcrumbLink>About</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <AnimatedSection animation="fade-up" className="space-y-10">
          <section>
            <h1 className="text-4xl font-bold mb-6">About DevSalary</h1>
            <div className="prose prose-lg dark:prose-invert">
              <p className="lead text-xl text-muted-foreground">
                DevSalary provides accurate salary predictions for software developers worldwide, 
                helping tech professionals understand their market value.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
              <p>
                Our mission is to bring transparency to developer compensation globally. We believe that 
                developers should have access to accurate salary information to make informed career decisions,
                negotiate fair compensation, and understand their value in the tech industry.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">How We Started</h2>
              <p>
                DevSalary was founded in 2023 by a group of software engineers who were frustrated with the 
                lack of transparency in tech compensation. We started by collecting salary data from various 
                sources and building a prediction model that could accurately estimate developer salaries 
                based on key factors.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Our Data</h2>
              <p>
                Our prediction model is built on extensive data collected from:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Industry salary surveys</li>
                <li>Anonymous compensation reports</li>
                <li>Company data</li>
                <li>Public job listings</li>
                <li>User-contributed information</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Privacy Commitment</h2>
              <p>
                We take your privacy seriously. All data submitted to DevSalary is anonymized and aggregated. 
                We never share individual salary information or personally identifiable details with third parties.
              </p>
            </div>
          </section>

          <section className="mt-12 pt-12 border-t">
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            <p className="mb-6">
              Have questions about DevSalary? We'd love to hear from you.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Contact Us
            </Link>
          </section>
        </AnimatedSection>
      </div>
    </Layout>
  );
};

export default About;
