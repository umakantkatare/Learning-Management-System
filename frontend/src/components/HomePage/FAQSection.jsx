import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function FAQSection() {
  const faqs = [
    {
      q: "Do I need coding experience?",
      a: "No. Courses are beginner friendly and start from basics.",
    },
    {
      q: "Will I build projects?",
      a: "Yes. Real-world projects are included in each program.",
    },
    {
      q: "Do you provide placement help?",
      a: "Yes. Resume guidance, mock interviews and hiring prep included.",
    },
  ];

  const [open, setOpen] = useState(null);

  return (
    <section className="bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-16">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-orange-500">
            FAQ
          </p>

          <h2 className="mt-3 text-3xl md:text-5xl font-bold">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-10 space-y-4">
          {faqs.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/60"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-5 py-4 flex items-center justify-between text-left"
              >
                <span>{item.q}</span>
                <ChevronDown
                  size={18}
                  className={`transition ${open === i ? "rotate-180" : ""}`}
                />
              </button>

              {open === i && (
                <div className="px-5 pb-5 text-sm text-zinc-400 leading-7">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
