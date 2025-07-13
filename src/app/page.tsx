'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import SubscribeForm from '@/components/SubscribeForm';
import Link from 'next/link';

// Import all layout components
import Header from '@/components/Header';
import TopBanner from '@/components/TopBanner';
import JobSearch from '@/components/JobSearch';
import JobDirectory from '@/components/JobDirectory';
import TrendingJobs from '@/components/TrendingJobs';
import FeatureBlocks from '@/components/FeatureBlocks';
import Footer from '@/components/Footer';

// Define the Job interface (keep it here or consider moving to a shared types.ts file like src/types.ts)
export interface Job {
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
  source: string; // Used for government filter (e.g., 'usajobs')
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

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10; // Display 10 jobs per page

  // State to track if component is mounted (client-side)
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set isMounted to true once component has mounted on the client
    setIsMounted(true);

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

  // Filter jobs based on search term and category filter
  const getFilteredAndSearchedJobs = (allJobs: Job[], currentSearchTerm: string, currentFilter: string | null) => {
    // Reset to first page whenever filters or search terms change
    if (currentPage !== 1) {
      setCurrentPage(1); // Reset page to 1 when filters/search terms change
    }

    return allJobs.filter(job => {
      const matchesSearch = job && job.JobTitle && typeof job.JobTitle === 'string' &&
        job.JobTitle.toLowerCase().includes(currentSearchTerm.toLowerCase());

      const matchesFilter = !currentFilter ||
        (currentFilter === 'remote' && job.is_remote) ||
        (currentFilter === 'government' && job.source === 'usajobs') ||
        (currentFilter === 'others' && !job.is_remote && job.source !== 'usajobs');

      return matchesSearch && matchesFilter;
    });
  };

  const allFilteredJobs = getFilteredAndSearchedJobs(jobs, searchTerm, filter);

  // Calculate jobs for the current page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentPaginatedJobs = allFilteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(allFilteredJobs.length / jobsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Only scroll if the component is mounted on the client
    if (isMounted) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Trending Jobs (FIXED: Sort by PostedDate for consistent server/client render)
  const trendingJobs = jobs
    .filter(job => job && job.JobTitle && job.PostedDate) // Ensure job, title, and date exist
    .sort((a, b) => new Date(b.PostedDate).getTime() - new Date(a.PostedDate).getTime()) // Sort by most recent
    .slice(0, 10);

  // Use suppressHydrationWarning for loading/error states that might differ server/client
  if (loading) return <div suppressHydrationWarning className="text-center py-12 text-secondary-text">Loading job data...</div>;
  if (error) return <div suppressHydrationWarning className="text-center py-12 text-red-600">Error: {error}</div>;

  return (
    <div className="min-h-screen flex flex-col bg-background-light text-primary-text">
      <Header />
      <TopBanner />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Section: "Hello Jacob..." and Main Job Cards */}
          <section className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-border-gray">
            <h2 className="text-xl font-bold text-primary-text mb-4">Hello, here are the latest six figure job opportunities for you:</h2>

            {/* Job Search (retained for keyword search) */}
            <div className="mb-6">
              <JobSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>

            {/* Directory Filter (buttons only) and Job Cards Display */}
            <JobDirectory
              jobs={currentPaginatedJobs} // Pass only the jobs for the current page
              currentFilter={filter}
              setFilter={setFilter}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </section>

          {/* Trending Jobs Section */}
          <TrendingJobs jobs={trendingJobs} />

          {/* Feature Blocks */}
          <FeatureBlocks />

          {/* Blog Section Placeholder */}
          <section className="bg-white py-12 rounded-lg shadow-sm mb-8 border border-border-gray">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl font-bold text-primary-text mb-4">Our Blog</h2>
              <p className="text-secondary-text mb-6">Stay tuned for job tips, industry insights, and career advice.</p>
              <Link href="/blog" className="bg-accent-blue text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                Read Our Articles
              </Link>
            </div>
          </section>

          {/* Subscribe Form Section */}
          <section className="bg-white py-8 rounded-lg shadow-sm border border-border-gray">
            <div className="container mx-auto px-4 max-w-md">
              <h2 className="text-xl font-bold text-primary-text mb-4 text-center">Stay Updated!</h2>
              <p className="text-secondary-text text-center mb-4">Receive the latest job opportunities and career tips directly in your inbox.</p>
              <SubscribeForm />
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}