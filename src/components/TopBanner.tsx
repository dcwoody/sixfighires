'use client';

export default function TopBanner() {
  // Placeholder for dynamic date, you can use Intl.DateTimeFormat
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <section className="bg-navy-blue text-white py-8 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Top <span className="text-accent-yellow">Job</span> Opportunities
        </h1>
        <p className="text-sm md:text-base">{today}</p>
      </div>
    </section>
  );
}