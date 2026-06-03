import { Card, CardContent } from "@/components/ui/card";

export default function CourseDescription({ course }) {
  return (
    <Card className="rounded-2xl shadow-sm border-0">
      <CardContent className="p-6 space-y-6">
        {/* Heading */}
        <div>
          <h2 className="text-2xl font-bold">Course Description</h2>

          <p className="text-sm text-slate-500 mt-1">
            Overview of what this course covers
          </p>
        </div>

        {/* Main Description */}
        <div className="space-y-4 text-slate-700 leading-7">
          <p>{course?.subtitle}</p>

          <p>
            {/* This course is designed for students who want to build real-world
            skills and become job-ready through hands-on learning, guided
            projects, and production-level practices. */}
            {course?.description}
          </p>
        </div>

        {/* Highlights */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl bg-slate-50 p-4">
            <h3 className="font-semibold">{course.level} Level</h3>

            <p className="text-sm text-slate-600 mt-1">
              Start from fundamentals and progress step by step.
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <h3 className="font-semibold">Real Projects</h3>

            <p className="text-sm text-slate-600 mt-1">
              Build practical applications used in real industry workflows.
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <h3 className="font-semibold">Career Focused</h3>

            <p className="text-sm text-slate-600 mt-1">
              Learn skills aligned with hiring demands.
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <h3 className="font-semibold">Lifetime Access</h3>

            <p className="text-sm text-slate-600 mt-1">
              Revisit content anytime and learn at your pace.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
