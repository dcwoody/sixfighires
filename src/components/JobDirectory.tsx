'use client';
import { Job } from '@/app/page'; // Import the Job interface

interface JobDirectoryProps {
  jobs: Job[]; // These are the jobs for the *current page*
  currentFilter: string | null;
  setFilter: (filter: string | null) => void;
  currentPage: number; // Current active page
  totalPages: number; // Total number of pages
  onPageChange: (page: number) => void; // Function to change page
}

export default function JobDirectory({
  jobs,
  currentFilter,
  setFilter,
  currentPage,
  totalPages,
  onPageChange,
}: JobDirectoryProps) {
  return (
    <div className="py-4"> {/* Background is handled by parent (page.tsx) */}
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-primary-text mb-6 text-center">Job and Careers Directory</h2>
        <p className="text-center mb-6 text-secondary-text">Check our list of jobs to get you started</p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setFilter(null)} // 'All' filter
            className={`px-4 py-2 rounded-lg text-sm font-semibold uppercase ${
              currentFilter === null ? 'bg-accent-blue text-white' : 'bg-gray-200 text-primary-text hover:bg-gray-300'
            } transition`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('remote')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold uppercase ${
              currentFilter === 'remote' ? 'bg-accent-blue text-white' : 'bg-gray-200 text-primary-text hover:bg-gray-300'
            } transition`}
          >
            Remote
          </button>
          <button
            onClick={() => setFilter('government')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold uppercase ${
              currentFilter === 'government' ? 'bg-accent-blue text-white' : 'bg-gray-200 text-primary-text hover:bg-gray-300'
            } transition`}
          >
            Government
          </button>
          <button
            onClick={() => setFilter('others')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold uppercase ${
              currentFilter === 'others' ? 'bg-accent-blue text-white' : 'bg-gray-200 text-primary-text hover:bg-gray-300'
            } transition`}
          >
            Others
          </button>
        </div>

        {/* Job Cards Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div
                key={job.JobID}
                className="bg-white rounded-lg p-4 border border-border-gray hover:shadow-md transition-shadow text-primary-text"
              >
                <h3 className="text-lg font-bold text-navy-blue mb-1">{job.JobTitle}</h3>
                <p className="text-sm text-secondary-text">{job.Company} - {job.Location}</p>
                {job.formatted_salary && (
                  <span className="text-xs bg-accent-yellow px-2 py-0.5 rounded-full mt-2 inline-block text-navy-blue">
                    {job.formatted_salary}
                  </span>
                )}
                <a
                  href={job.job_url || job.job_url_direct}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-blue hover:underline mt-2 inline-block text-sm"
                >
                  View Job
                </a>
              </div>
            ))
          ) : (
            <div className="md:col-span-3 text-center py-8 text-secondary-text">
              <p>No jobs found for the selected category or search term.</p>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4 mt-6">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-accent-blue text-white rounded-lg disabled:opacity-50 hover:bg-blue-700 transition"
            >
              Previous
            </button>
            <span className="text-primary-text">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-accent-blue text-white rounded-lg disabled:opacity-50 hover:bg-blue-700 transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}