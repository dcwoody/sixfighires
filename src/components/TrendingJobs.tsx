'use client';
import { Job } from '@/app/page'; // Import the Job interface

interface TrendingJobsProps {
  jobs: Job[]; // These are the pre-selected trending jobs from page.tsx
}

export default function TrendingJobs({ jobs }: TrendingJobsProps) {
  return (
    <section className="bg-black text-black py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Trending Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div
                key={job.JobID}
                className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors text-lightgraytext"
              >
                <p className="text-sm text-coral mb-1">{job.Company}</p>
                <p className="text-sm text-lightgraytext mb-1">{job.Location}</p>
                <h3 className="text-lg font-bold text-white">{job.JobTitle}</h3>
                <a
                  href={job.job_url || job.job_url_direct}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 hover:underline mt-2 inline-block text-sm"
                >
                  View Job
                </a>
              </div>
            ))
          ) : (
            <div className="md:col-span-2 text-center py-4">
              <p className="text-lightgraytext">No trending jobs available.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}