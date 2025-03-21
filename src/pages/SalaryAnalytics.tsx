
import React from 'react';
import { Layout } from '@/components/Layout';
import { AnimatedSection } from '@/components/AnimatedSection';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const SalaryAnalytics = () => {
  // Mock data for charts
  const roleSalaryData = [
    { name: 'Frontend', value: 110000 },
    { name: 'Backend', value: 120000 },
    { name: 'Fullstack', value: 125000 },
    { name: 'DevOps', value: 135000 },
    { name: 'Data Scientist', value: 140000 },
    { name: 'ML Engineer', value: 150000 },
  ];

  const locationData = [
    { name: 'US', value: 140000 },
    { name: 'Canada', value: 120000 },
    { name: 'UK', value: 110000 },
    { name: 'Germany', value: 105000 },
    { name: 'Australia', value: 115000 },
    { name: 'India', value: 45000 },
    { name: 'Singapore', value: 95000 },
  ];

  const experienceTrendData = [
    { years: '0-1', salary: 70000, marketDemand: 65 },
    { years: '1-2', salary: 85000, marketDemand: 70 },
    { years: '2-3', salary: 95000, marketDemand: 75 },
    { years: '3-5', salary: 110000, marketDemand: 85 },
    { years: '5-7', salary: 130000, marketDemand: 90 },
    { years: '7-10', salary: 150000, marketDemand: 90 },
    { years: '10+', salary: 180000, marketDemand: 85 },
  ];

  const yearlyTrendData = [
    { year: 2018, salary: 95000 },
    { year: 2019, salary: 101000 },
    { year: 2020, salary: 108000 },
    { year: 2021, salary: 115000 },
    { year: 2022, salary: 123000 },
    { year: 2023, salary: 130000 },
    { year: 2024, salary: 138000 },
  ];

  const stackData = [
    { name: 'JavaScript', value: 110000, popularity: 90 },
    { name: 'Python', value: 125000, popularity: 85 },
    { name: 'Java', value: 115000, popularity: 75 },
    { name: 'C#', value: 105000, popularity: 70 },
    { name: 'PHP', value: 95000, popularity: 60 },
    { name: 'Go', value: 135000, popularity: 65 },
    { name: 'Rust', value: 145000, popularity: 55 },
  ];

  const industryData = [
    { name: 'Finance', value: 145000 },
    { name: 'Healthcare', value: 125000 },
    { name: 'E-commerce', value: 120000 },
    { name: 'Entertainment', value: 115000 },
    { name: 'Education', value: 100000 },
    { name: 'Government', value: 110000 },
  ];

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Custom colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  // Chart configuration
  const chartConfig = {
    primary: { theme: { light: '#0088FE', dark: '#0088FE' } },
    secondary: { theme: { light: '#00C49F', dark: '#00C49F' } },
    tertiary: { theme: { light: '#FFBB28', dark: '#FFBB28' } },
    quaternary: { theme: { light: '#FF8042', dark: '#FF8042' } },
  };

  // Top paying companies data
  const topCompaniesData = [
    { name: 'Google', role: 'Senior Developer', salary: 185000 },
    { name: 'Meta', role: 'Software Engineer III', salary: 175000 },
    { name: 'Apple', role: 'Senior iOS Developer', salary: 170000 },
    { name: 'Microsoft', role: 'Principal Engineer', salary: 180000 },
    { name: 'Amazon', role: 'SDE III', salary: 165000 },
    { name: 'Netflix', role: 'Senior Frontend Developer', salary: 190000 },
  ];

  return (
    <Layout>
      <section className="py-16 md:py-20 px-4">
        <div className="container max-w-6xl">
          <AnimatedSection className="text-center mb-12" animation="fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Developer Salary Analytics
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore comprehensive salary data across various roles, technologies, and locations to gain insights on market trends.
            </p>
          </AnimatedSection>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="technologies">Technologies</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatedSection animation="fade-up" delay={100}>
                  <Card>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-4">Salary by Role</h3>
                      <ChartContainer className="h-[350px]" config={chartConfig}>
                        <BarChart data={roleSalaryData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis tickFormatter={(value) => `$${Math.floor(value / 1000)}k`} />
                          <ChartTooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(Number(value))} />} />
                          <Bar dataKey="value" fill="#0088FE" name="Annual Salary" />
                        </BarChart>
                      </ChartContainer>
                    </div>
                  </Card>
                </AnimatedSection>

                <AnimatedSection animation="fade-up" delay={200}>
                  <Card>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-4">Salary by Industry</h3>
                      <ChartContainer className="h-[350px]" config={chartConfig}>
                        <PieChart>
                          <Pie
                            data={industryData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {industryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <ChartTooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(Number(value))} />} />
                        </PieChart>
                      </ChartContainer>
                    </div>
                  </Card>
                </AnimatedSection>
              </div>

              <AnimatedSection animation="fade-up" delay={300}>
                <Card>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Top Paying Companies</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Company</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead className="text-right">Avg Salary</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {topCompaniesData.map((company, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{company.name}</TableCell>
                            <TableCell>{company.role}</TableCell>
                            <TableCell className="text-right">{formatCurrency(company.salary)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </Card>
              </AnimatedSection>
            </TabsContent>

            {/* Location Tab */}
            <TabsContent value="location" className="space-y-6 mt-6">
              <AnimatedSection animation="fade-up">
                <Card>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Salary by Country</h3>
                    <ChartContainer className="h-[400px]" config={chartConfig}>
                      <BarChart data={locationData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" tickFormatter={(value) => `$${Math.floor(value / 1000)}k`} />
                        <YAxis type="category" dataKey="name" />
                        <ChartTooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(Number(value))} />} />
                        <Bar dataKey="value" fill="#00C49F" name="Annual Salary" />
                      </BarChart>
                    </ChartContainer>
                  </div>
                </Card>
              </AnimatedSection>
            </TabsContent>

            {/* Technologies Tab */}
            <TabsContent value="technologies" className="space-y-6 mt-6">
              <AnimatedSection animation="fade-up">
                <Card>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Technology Stack vs Salary</h3>
                    <ChartContainer className="h-[400px]" config={chartConfig}>
                      <BarChart data={stackData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" tickFormatter={(value) => `$${Math.floor(value / 1000)}k`} />
                        <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `${value}%`} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar yAxisId="left" dataKey="value" fill="#8884d8" name="Salary" />
                        <Bar yAxisId="right" dataKey="popularity" fill="#82ca9d" name="Popularity" />
                        <Legend />
                      </BarChart>
                    </ChartContainer>
                  </div>
                </Card>
              </AnimatedSection>
            </TabsContent>

            {/* Trends Tab */}
            <TabsContent value="trends" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatedSection animation="fade-up" delay={100}>
                  <Card>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-4">Experience vs Salary</h3>
                      <ChartContainer className="h-[350px]" config={chartConfig}>
                        <LineChart data={experienceTrendData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="years" />
                          <YAxis yAxisId="left" tickFormatter={(value) => `$${Math.floor(value / 1000)}k`} />
                          <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `${value}%`} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line yAxisId="left" type="monotone" dataKey="salary" stroke="#8884d8" name="Salary" />
                          <Line yAxisId="right" type="monotone" dataKey="marketDemand" stroke="#82ca9d" name="Market Demand" />
                          <Legend />
                        </LineChart>
                      </ChartContainer>
                    </div>
                  </Card>
                </AnimatedSection>

                <AnimatedSection animation="fade-up" delay={200}>
                  <Card>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-4">Yearly Salary Trends</h3>
                      <ChartContainer className="h-[350px]" config={chartConfig}>
                        <AreaChart data={yearlyTrendData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis tickFormatter={(value) => `$${Math.floor(value / 1000)}k`} />
                          <ChartTooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(Number(value))} />} />
                          <Area type="monotone" dataKey="salary" fill="#8884d8" stroke="#8884d8" />
                        </AreaChart>
                      </ChartContainer>
                    </div>
                  </Card>
                </AnimatedSection>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default SalaryAnalytics;
