export default function BrandsSection() {
  const brands = ["Google", "Microsoft", "Amazon", "Meta", "Netflix", "Adobe"];

  return (
    <section className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-14">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm uppercase tracking-[0.25em] text-orange-500">
            Trusted Learning Path
          </p>

          <h2 className="mt-3 text-3xl md:text-4xl font-bold">
            Skills Used In Top Companies
          </h2>

          <p className="mt-3 text-zinc-400 text-sm md:text-base leading-7">
            Learn modern technologies and workflows aligned with real industry
            expectations.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/50 px-5 py-6 text-center text-sm md:text-base font-medium text-zinc-300 hover:border-orange-500/40 hover:text-white transition"
            >
              {brand}
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-10 rounded-3xl border border-zinc-800 bg-gradient-to-r from-zinc-900 to-zinc-950 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div>
            <h3 className="text-xl md:text-2xl font-semibold">
              Industry Focused Curriculum
            </h3>

            <p className="mt-2 text-sm text-zinc-400">
              Build projects, solve problems, and prepare for hiring rounds.
            </p>
          </div>

          <button className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-sm font-medium transition">
            Explore Courses
          </button>
        </div>
      </div>
    </section>
  );
}
