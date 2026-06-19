import { ArrowRight, PlayCircle, Star } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-black text-white py-15">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ea580c22,transparent_45%)]" />
      <div className="absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-orange-500/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-orange-600/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 pt-16 md:pt-24 pb-14 md:pb-20">
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs md:text-sm text-orange-300">
            <Star size={14} className="fill-orange-400 text-orange-400" />
            Learn Skills. Get Hired. Grow Fast.
          </span>
        </div>

        <div className="mx-auto mt-6 max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight">
            Become The Software Engineer
            <span className="block text-orange-500 mt-1">
              Companies Want To Hire
            </span>
          </h1>

          <p className="mt-5 text-sm sm:text-base md:text-lg text-zinc-400 max-w-2xl mx-auto leading-7">
            Master full-stack development, build real-world projects, crack
            interviews, and launch your tech career with industry-ready skills.
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-600 px-6 py-3 text-sm md:text-base font-medium transition">
            Start Learning
            <ArrowRight size={18} />
          </button>

          <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 hover:border-zinc-500 bg-zinc-900/60 px-6 py-3 text-sm md:text-base font-medium transition">
            <PlayCircle size={18} />
            Watch Demo
          </button>
        </div>

        {/* Stats */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 text-center">
            <h3 className="text-2xl font-bold text-orange-500">650K+</h3>
            <p className="mt-1 text-xs md:text-sm text-zinc-400">
              Students Trained
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 text-center">
            <h3 className="text-2xl font-bold text-orange-500">10M+</h3>
            <p className="mt-1 text-xs md:text-sm text-zinc-400">
              Views Across Platforms
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 text-center">
            <h3 className="text-2xl font-bold text-orange-500">200+</h3>
            <p className="mt-1 text-xs md:text-sm text-zinc-400">
              Free Tutorials
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 text-center">
            <h3 className="text-2xl font-bold text-orange-500">4.9★</h3>
            <p className="mt-1 text-xs md:text-sm text-zinc-400">
              Student Rating
            </p>
          </div>
        </div>

        {/* Showcase Card */}
        <div className="mt-10 md:mt-14 grid md:grid-cols-2 gap-5">
          {/* Left Card */}
          <div className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-black p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              Career Launchpad
            </p>

            <h3 className="mt-3 text-2xl font-semibold leading-snug">
              Unlock Your First Job & Internship With Us
            </h3>

            <p className="mt-3 text-sm text-zinc-400 leading-6">
              Learn practical skills, build strong projects, and prepare for
              interviews with structured mentorship.
            </p>

            <button className="mt-6 rounded-xl bg-orange-500 px-5 py-3 text-sm font-medium hover:bg-orange-600 transition">
              Explore Programs
            </button>
          </div>

          {/* Right Card */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-4">
            <div className="h-full min-h-[260px] rounded-2xl border border-zinc-800 bg-[linear-gradient(135deg,#18181b,#09090b)] p-5 flex flex-col justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                  Real Classroom Energy
                </p>

                <h3 className="mt-3 text-xl font-semibold">
                  Start Learning From Mentors Who Build Products
                </h3>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-black/50 p-4">
                <p className="text-sm text-zinc-400">
                  Live sessions • Projects • Community • Placements
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
