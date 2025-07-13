'use client';
/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react'; // Make sure useState is imported

interface JobSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function JobSearch({ searchTerm, setSearchTerm }: JobSearchProps) {
  // Keeping location input for the example, but actual filtering only on searchTerm
  const [location, setLocation] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm, 'in', location);
    // Filtering logic is handled in page.tsx by searchTerm
  };

  return (
    <div className="bg-white py-6"> {/* Changed background from darkgray to white */}
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-primary-text mb-4 text-center">Let&apos;s Find You a Job</h2>
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
          <input
            type="text"
            placeholder="Keywords"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-border-gray rounded text-primary-text focus:outline-none focus:ring-2 focus:ring-accent-blue"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-1 px-4 py-2 border border-border-gray rounded text-primary-text focus:outline-none focus:ring-2 focus:ring-accent-blue"
          />
          <button
            type="submit"
            className="bg-accent-blue text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}