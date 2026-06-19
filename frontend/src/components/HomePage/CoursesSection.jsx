import { getPublishedCoursesThunk } from "@/features/course/courseThunk";
import { ArrowRight, Clock3, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CoursesSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [courseList, setCourseList] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await dispatch(getPublishedCoursesThunk());
      if (response?.payload?.success) {
        setCourseList(response.payload.data);
      }
    })();
  }, [dispatch]);

  function goToCourse() {
    navigate("/courses");
  }
  const handleNavigate = (slug) => {
    navigate(`/course/${slug}`);
  };
  return (
    <section className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-sm uppercase tracking-[0.25em] text-orange-500">
            Popular Programs
          </p>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold">
            Choose Your Learning Path
          </h2>
          <p className="mt-4 text-zinc-400">
            Industry-ready programs focused on skills, projects and placement.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {courseList.slice(0, 4).map((course) => (
            <div
              key={course._id}
              className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 hover:border-orange-500/40 transition"
            >
              <img
                src={course.thumbnail?.url}
                alt={course.title}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />

              <span className="text-xs text-orange-400">{course.level}</span>

              <h3 className="mt-3 text-xl font-semibold line-clamp-2 min-h-14">
                {course.title}
              </h3>

              <p className="mt-2 text-sm text-zinc-400 min-h-10">
                {course.subtitle?.length > 40
                  ? `${course.subtitle.substring(0, 40)}...`
                  : course.subtitle}
              </p>

              <div className="mt-5 flex items-center justify-between text-sm text-zinc-400">
                <span className="flex items-center gap-2">
                  <Clock3 size={16} />
                  {course.totalDuration || 0} hrs
                </span>

                <span className="flex items-center gap-1">
                  <Star size={16} className="fill-orange-500 text-orange-500" />
                  {course.rating || 0}
                </span>
              </div>

              <button
                onClick={() => handleNavigate(course.slug)}
                className="mt-6 w-full rounded-xl bg-orange-500 hover:bg-orange-600 px-5 py-3 text-sm font-medium transition"
              >
                course details
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => goToCourse()}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 px-6 py-3 hover:border-zinc-500 transition"
          >
            View All Courses
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
