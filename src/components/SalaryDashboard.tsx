
import React from 'react';
import { 
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area
} from 'recharts';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { DeveloperProfile } from '@/utils/salaryCalculator';

// Custom colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

interface SalaryDashboardProps {
  salary: number;
  profile: DeveloperProfile;
}

export const SalaryDashboard: React.FC<SalaryDashboardProps> = ({ salary, profile }) => {
  // Generate mock data for industry comparison
  const industryData = [
    { name: 'Your Salary', value: salary },
    { name: 'Industry Avg', value: salary * 0.9 },
    { name: 'Top 10%', value: salary * 1.3 },
  ];

  // Technology comparison data
  const techStackData = [
    { name: 'React', value: 120000 },
    { name: 'Angular', value: 110000 },
    { name: 'Vue', value: 105000 },
    { name: profile.programmingLanguage, value: salary },
    { name: 'Node.js', value: 115000 },
    { name: 'Python', value: 125000 },
  ].sort((a, b) => b.value - a.value);

  // Experience progression data
  const experienceData = [
    { years: '0-1', salary: 70000 },
    { years: '1-2', salary: 85000 },
    { years: '2-3', salary: 95000 },
    { years: '3-5', salary: 110000 },
    { years: '5-7', salary: 130000 },
    { years: '7-10', salary: 150000 },
    { years: '10+', salary: 180000 },
  ];

  // Location comparison data
  const locationData = [
    { name: 'US', value: 140000 },
    { name: 'Canada', value: 120000 },
    { name: 'UK', value: 110000 },
    { name: 'Germany', value: 105000 },
    { name: 'Australia', value: 115000 },
    { name: profile.country, value: salary },
  ];

  // Education impact data
  const educationData = [
    { name: 'High School', value: 85000 },
    { name: 'Associate', value: 95000 },
    { name: 'Bachelor\'s', value: 115000 },
    { name: 'Master\'s', value: 130000 },
    { name: 'PhD', value: 145000 },
    { name: 'Self-taught', value: 100000 },
  ];

  // Find where the user's education level exists in the data
  const userEducationIndex = educationData.findIndex(item => 
    item.name.toLowerCase() === profile.educationLevel.toLowerCase()
  );

  // If not found, add it
  if (userEducationIndex === -1) {
    educationData.push({ name: profile.educationLevel, value: salary });
  } else {
    // Update the existing entry with the user's salary
    educationData[userEducationIndex].value = salary;
  }

  // Career progression projection
  const careerProjection = [
    { year: 'Current', salary },
    { year: 'Year 1', salary: Math.round(salary * 1.05) },
    { year: 'Year 2', salary: Math.round(salary * 1.12) },
    { year: 'Year 3', salary: Math.round(salary * 1.20) },
    { year: 'Year 5', salary: Math.round(salary * 1.35) },
  ];

  // Format number as currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Chart configuration for ChartContainer
  const chartConfig = {
    salary: { theme: { light: '#0088FE', dark: '#0088FE' } },
    industry: { theme: { light: '#00C49F', dark: '#00C49F' } },
    education: { theme: { light: '#FFBB28', dark: '#FFBB28' } },
    projection: { theme: { light: '#FF8042', dark: '#FF8042' } },
    technology: { theme: { light: '#8884d8', dark: '#8884d8' } },
  };

  return (
    <div className="w-full space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
          <TabsTrigger value="projection">Projection</TabsTrigger>
          <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Salary by Technology</CardTitle>
                <CardDescription>
                  How your technology stack compares to others
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer className="h-[300px]" config={chartConfig}>
                  <BarChart data={techStackData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `$${Math.floor(value / 1000)}k`} />
                    <ChartTooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(Number(value))} />} />
                    <Bar dataKey="value" fill="#8884d8" name="Annual Salary" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Your Salary vs Industry</CardTitle>
                <CardDescription>
                  How your salary compares to industry standards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer className="h-[300px]" config={chartConfig}>
                  <PieChart>
                    <Pie
                      data={industryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
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
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Comparison Tab */}
        <TabsContent value="comparison" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Salary by Location</CardTitle>
                <CardDescription>
                  How location affects developer salaries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer className="h-[300px]" config={chartConfig}>
                  <BarChart data={locationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `$${Math.floor(value / 1000)}k`} />
                    <ChartTooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(Number(value))} />} />
                    <Bar dataKey="value" fill="#0088FE" name="Annual Salary" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Salary by Education</CardTitle>
                <CardDescription>
                  Impact of education on developer compensation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer className="h-[300px]" config={chartConfig}>
                  <BarChart data={educationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `$${Math.floor(value / 1000)}k`} />
                    <ChartTooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(Number(value))} />} />
                    <Bar dataKey="value" fill="#FFBB28" name="Annual Salary" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Projection Tab */}
        <TabsContent value="projection" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Career Salary Projection</CardTitle>
              <CardDescription>
                Estimated salary growth over the next 5 years
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-[300px]" config={chartConfig}>
                <AreaChart data={careerProjection}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(value) => `$${Math.floor(value / 1000)}k`} />
                  <ChartTooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(Number(value))} />} />
                  <Area type="monotone" dataKey="salary" fill="#8884d8" stroke="#8884d8" />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Breakdown Tab */}
        <TabsContent value="breakdown" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Salary by Years of Experience</CardTitle>
              <CardDescription>
                How experience level affects developer compensation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-[300px]" config={chartConfig}>
                <LineChart data={experienceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="years" />
                  <YAxis tickFormatter={(value) => `$${Math.floor(value / 1000)}k`} />
                  <ChartTooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(Number(value))} />} />
                  <Line type="monotone" dataKey="salary" stroke="#FF8042" activeDot={{ r: 8 }} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
