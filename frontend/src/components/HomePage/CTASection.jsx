import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-16">
        <div className="rounded-3xl border border-zinc-800 bg-gradient-to-r from-orange-500 to-orange-600 p-8 md:p-12 text-black">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.25em] font-medium">
              Ready To Start?
            </p>

            <h2 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">
              Build Your Career In Tech Today
            </h2>

            <p className="mt-4 text-sm md:text-base text-black/80 leading-7">
              Learn practical skills, create projects, and get job-ready with
              structured guidance.
            </p>

            <button className="mt-7 inline-flex items-center gap-2 rounded-xl bg-black text-white px-6 py-3 text-sm font-medium hover:bg-zinc-900 transition">
              Explore Courses
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
