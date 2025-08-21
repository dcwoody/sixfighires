import HeroSearch from '@/components/homepage/HeroSearch';
import PopularJobs from '@/components/homepage/PopularJobs';
import BrowseCategories from '@/components/homepage/BrowseCategories';
import NewsletterSignup from '@/components/homepage/NewsletterSignup';

export default function Home() {
  return (
    <main>
      <HeroSearch />
      <div className="container mx-auto px-4">
        <PopularJobs />
        <BrowseCategories />
      </div>
      <NewsletterSignup />
    </main>
  );
}
