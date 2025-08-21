import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

export interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  logo: string;
}

const JobCard: React.FC<JobCardProps> = ({ id, title, company, location, type, logo }) => {
  return (
    <Link
      href={`/jobs/${id}`}
      className="border rounded p-4 flex flex-col gap-2 hover:shadow-md transition"
    >
      <div className="flex items-center gap-2">
        <Image src={logo} alt={`${company} logo`} width={40} height={40} className="rounded" />
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-gray-600">{company}</p>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
        <span>{location}</span>
        <span className="px-2 py-1 bg-gray-100 rounded">{type}</span>
      </div>
    </Link>
  );
};

export default JobCard;
