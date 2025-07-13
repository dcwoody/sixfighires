'use client';

export default function FeatureBlocks() {
  return (
    <section className="bg-navy-blue text-white py-12"> {/* Changed background from coral to navy-blue */}
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Block 1 */}
        <div className="text-center">
          <img
            src="/target-icon.png" // Add to `public/target-icon.png`
            alt="Target Icon"
            className="mx-auto h-16 w-auto mb-4"
          />
          <h3 className="text-xl font-bold mb-2">Direct And Targeted Access</h3>
          <p className="text-sm">
            We offer unfiltered access to our services completely for free
          </p>
        </div>

        {/* Block 2 */}
        <div className="text-center">
          <img
            src="/clipboard-icon.png" // Add to `public/clipboard-icon.png`
            alt="Clipboard Icon"
            className="mx-auto h-16 w-auto mb-4"
          />
          <h3 className="text-xl font-bold mb-2">No Data Overload</h3>
          <p className="text-sm">
            Simple controls let clients and candidates access results quickly
          </p>
        </div>

        {/* Block 3 */}
        <div className="text-center">
          <img
            src="/mountain-icon.png" // Add to `public/mountain-icon.png`
            alt="Mountain Icon"
            className="mx-auto h-16 w-auto mb-4"
          />
          <h3 className="text-xl font-bold mb-2">Confluence of Creativity</h3>
          <p className="text-sm">
            We love a challenge—engage our services to see what we can do for you
          </p>
        </div>
      </div>
    </section>
  );
}