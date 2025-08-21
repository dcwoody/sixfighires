'use client';

import { Briefcase, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const HeroSearch: React.FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams({ q: title, location }).toString();
    router.push(`/jobs/search?${query}`);
  };

  return (
    <section className="py-20 bg-gray-50 text-center flex flex-col items-center gap-6">
      <h1 className="text-4xl font-bold">Find Your Next Opportunity</h1>
      <p className="text-gray-600">Thousands of jobs in tech, marketing, and more are waiting for you.</p>
      <form
        onSubmit={handleSubmit}
        className="mt-4 flex flex-col sm:flex-row items-center gap-2 w-full max-w-2xl"
      >
        <div className="relative w-full">
          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Job title, keyword, or company"
            className="pl-9"
          />
        </div>
        <div className="relative w-full">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, state, or zip code"
            className="pl-9"
          />
        </div>
        <Button type="submit" className="w-full sm:w-auto">Search</Button>
      </form>
    </section>
  );
};

export default HeroSearch;
