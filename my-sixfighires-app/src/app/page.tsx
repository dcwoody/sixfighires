'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import SubscribeForm from '@/components/SubscribeForm';

interface Job {
  JobID: string;
  JobTitle: string;
  LongDescription: string;
  ShortDescription: string;
  Company: string;
  Location: string;
  Industry: string;
  JobType: string;
  SubmissionDate: string;
  ExpirationDate: string;
  CompanyLogo: string;
  "Related Submissions": string;
  PostedDate: string;
  is_remote: boolean;
  Interval: string;
  min_amount: number;
  max_amount: number;
  currency: string;
  source: string;
  formatted_salary: string;
  job_url: string;
  job_url_direct: string;
  CreatedTime: string;
  is_duplicate: boolean;
}

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('jobs_db').select('*');
      if (error) {
        console.error('Error fetching jobs:', error.message);
        setError(error.message);
      } else if (data) {
        setJobs(data);
      } else {
        setJobs([]);
      }
      setLoading(false);
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.JobTitle && typeof job.JobTitle === 'string' && 
      job.JobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !filter || 
      (filter === 'remote' && job.is_remote) || 
      (filter === 'government' && job.source === 'usajobs') || 
      (filter === 'others' && job.source !== 'usajobs' && !job.is_remote);
    return matchesSearch && matchesFilter;
  });

  const trendingJobs = jobs
    .sort(() => 0.5 - Math.random()) // Placeholder: replace with traffic data
    .slice(0, 10);

  if (loading) return <div className="text-center py-8 text-gray-600">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-700 text-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl md:text-4xl font-bold">SixFigHires</h1>
          <div className="space-x-4">
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hidden md:inline-block"
            />
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">Sign In</button>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <section className="bg-blue-100 py-12 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Let’s find you a job</h2>
        <div className="max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Enter keyword (e.g., Nurse, Developer)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </section>

      {/* Directory Filter */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={() => setFilter('remote')}
            className={`px-4 py-2 rounded-lg ${filter === 'remote' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Remote
          </button>
          <button
            onClick={() => setFilter('government')}
            className={`px-4 py-2 rounded-lg ${filter === 'government' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Government
          </button>
          <button
            onClick={() => setFilter('others')}
            className={`px-4 py-2 rounded-lg ${filter === 'others' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Others
          </button>
          <button
            onClick={() => setFilter(null)}
            className={`px-4 py-2 rounded-lg ${!filter ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            All
          </button>
        </div>

        {/* Job Listings */}
        <main className="lg:w-2/3">
          <div className="space-y-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div key={job.JobID} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-bold text-blue-800">{job.JobTitle}</h2>
                        <p className="text-gray-600 mt-1">
                          {job.Company} • {job.Location} {job.is_remote && '(Remote)'}
                        </p>
                      </div>
                      {job.formatted_salary && (
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {job.formatted_salary}
                        </span>
                      )}
                    </div>
                    <p className="mt-3 text-gray-700">
                      {job.ShortDescription || job.LongDescription?.substring(0, 200) + '...'}
                    </p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        Posted: {new Date(job.PostedDate).toLocaleDateString()}
                      </span>
                      <a 
                        href={job.job_url || job.job_url_direct} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        Apply Now
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <p className="text-gray-600">No jobs found matching your search</p>
              </div>
            )}
          </div>
        </main>

        {/* Trending Jobs */}
        <aside className="lg:w-1/3 mt-8 lg:mt-0 lg:pl-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Trending Jobs</h2>
          <div className="space-y-4">
            {trendingJobs.map((job) => (
              <div key={job.JobID} className="bg-white rounded-lg shadow-md p-4">
                <h3 className="text-lg font-semibold text-blue-800">{job.JobTitle}</h3>
                <p className="text-gray-600">{job.Company} - {job.Location}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* Blog Placeholder */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Blog</h2>
          <p className="text-gray-600">Stay tuned for job tips and industry insights.</p>
          {/* Add dynamic blog posts later */}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4">Logo</div>
          <div className="space-x-4">
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Contact</a>
            <a href="#" className="hover:underline">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}