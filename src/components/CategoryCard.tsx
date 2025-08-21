import Link from 'next/link';
import React from 'react';

export interface CategoryCardProps {
  name: string;
  icon: React.ReactNode;
  count: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, icon, count }) => {
  const href = `/jobs/category/${encodeURIComponent(name.toLowerCase())}`;
  return (
    <Link
      href={href}
      className="border rounded p-6 flex flex-col items-center text-center gap-2 hover:shadow-md transition"
    >
      <div className="text-blue-600">{icon}</div>
      <h3 className="font-semibold">{name}</h3>
      <p className="text-sm text-gray-600">{count} jobs available</p>
    </Link>
  );
};

export default CategoryCard;
