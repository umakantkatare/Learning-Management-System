// CoursesCard.jsx
import { ArrowRight, PlayCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CoursesCard({ course }) {
  const navigate = useNavigate();
    const handleNavigate = () => {
    navigate(`/course/${course.slug}`);
  };
  return (
    <div
      onClick={handleNavigate}
      className="group rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-1"
    >
      {/* image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={course.thumbnail?.url}
          alt={course?.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        <button className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center border border-white/20 hover:bg-orange-500 transition">
          <PlayCircle size={18} />
        </button>
      </div>

      {/* content */}
      <div className="p-5">
        <p className="text-sm text-orange-400 font-medium">{course?.category}</p>

        <h3 className="mt-2 text-xl font-semibold leading-snug line-clamp-2 min-h-[56px]">
          {course?.title}
        </h3>

        {/* pricing */}
        <div className="mt-4 flex items-end gap-3">
          <span className="text-2xl font-bold">₹{course?.discountPrice}</span>

          <span className="text-sm text-zinc-500 line-through">
            ₹{course?.price}
          </span>
        </div>

        {/* button */}
        <button className="mt-5 w-full h-11 rounded-xl bg-orange-500 hover:bg-orange-600 transition font-medium flex items-center justify-center gap-2">
          Check Course
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
