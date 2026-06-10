import { Badge } from "@/components/ui/badge";
import { Star, Users, Clock3, Globe } from "lucide-react";

export default function CourseHero({ course }) {
  console.log('instructor name:',course?.instructor?.name);
  console.log('course hero:', course);
  return (
    <section className="bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-10">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-5">
          <Badge className="bg-primary text-white">{course?.category}</Badge>

          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            {course?.title}
          </h1>

          <p className="text-slate-300 text-lg">{course?.subtitle}</p>

          {/* Rating */}
          <div className="flex flex-wrap gap-4 text-sm text-slate-300">
            <span className="flex items-center gap-1 text-yellow-400">
              <Star className="w-4 h-4 fill-yellow-400" />
              {course?.rating}
            </span>

            <span>({course?.reviews} reviews)</span>

            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {course?.students} students
            </span>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-5 text-sm text-slate-300">
            <span className="flex items-center gap-1">
              <Clock3 className="w-4 h-4" />
              {course?.duration}
            </span>

            <span className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              {course?.language}
            </span>

            <span>{course?.level}</span>
          </div>

          <p className="text-sm text-slate-400">
            Created by {course?.instructor?.name}
          </p>
        </div>

        {/* Right Empty Space for Purchase Card Alignment */}
        <div className="hidden lg:block" />
      </div>
    </section>
  );
}
