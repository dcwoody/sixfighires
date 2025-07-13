'use client';

export default function Hero() {
  return (
    <section className="bg-coral text-white py-12">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          SixFigHires is your gateway to high-paying jobs
        </h1>
        <p className="text-lg mb-6">
          Find your dream job with competitive salaries and great benefits
        </p>
        <button className="bg-white text-coral px-6 py-2 rounded hover:bg-gray-100 transition">
          Register for Free
        </button>
        {/* Optional: Add an illustration (add to `public/hero-illustration.png`) */}
        <div className="mt-8">
          <img
            src="/hero-illustration.png"
            alt="Hero Illustration"
            className="mx-auto h-24 md:h-32 w-auto"
          />
        </div>
      </div>
    </section>
  );
}