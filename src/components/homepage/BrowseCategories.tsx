import React from 'react';
import { Code, Megaphone, Palette, Briefcase, TrendingUp, Cog } from 'lucide-react';
import CategoryCard from '@/components/CategoryCard';

const categories = [
  { name: 'Engineering', icon: <Code size={32} />, count: 1200 },
  { name: 'Marketing', icon: <Megaphone size={32} />, count: 850 },
  { name: 'Design', icon: <Palette size={32} />, count: 540 },
  { name: 'Sales', icon: <TrendingUp size={32} />, count: 760 },
  { name: 'Operations', icon: <Cog size={32} />, count: 430 },
  { name: 'Product', icon: <Briefcase size={32} />, count: 390 },
];

const BrowseCategories: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <h2 className="text-2xl font-bold mb-8 text-center">Browse by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <CategoryCard key={cat.name} {...cat} />
        ))}
      </div>
    </section>
  );
};

export default BrowseCategories;
