import React from 'react';
import JobCard, { JobCardProps } from '@/components/JobCard';

const jobs: JobCardProps[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'Stripe',
    location: 'Remote',
    type: 'Full-time',
    logo: '/vercel.svg',
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'Airbnb',
    location: 'San Francisco, CA',
    type: 'Full-time',
    logo: '/vercel.svg',
  },
  {
    id: '3',
    title: 'UX Designer',
    company: 'Figma',
    location: 'New York, NY',
    type: 'Contract',
    logo: '/vercel.svg',
  },
  {
    id: '4',
    title: 'Data Scientist',
    company: 'Netflix',
    location: 'Los Gatos, CA',
    type: 'Full-time',
    logo: '/vercel.svg',
  },
];

const PopularJobs: React.FC = () => {
  return (
    <section className="py-16">
      <h2 className="text-2xl font-bold mb-8 text-center">Popular Job Openings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>
    </section>
  );
};

export default PopularJobs;
