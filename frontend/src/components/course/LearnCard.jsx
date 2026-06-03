import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function LearnCard({ course }) {
  const dynamicItems = Array.isArray(course?.learningOutcomes)
    ? JSON.parse(course.learningOutcomes[0]).filter(
        (item) => item && item !== "[]" && item.trim() !== "",
      )
    : [];
  const learnItems =
    dynamicItems?.length > 0
      ? dynamicItems
      : [
          "Build full MERN stack applications",
          "Create REST APIs with Express.js",
          "Use MongoDB with Mongoose",
          "Implement JWT Authentication",
          "Deploy production-ready apps",
          "Follow industry project structure",
        ];

  return (
    <Card className="rounded-2xl shadow-sm border-0 sticky top-24">
      <CardContent className="p-6 space-y-5">
        {/* Heading */}
        <div>
          <h2 className="text-xl font-bold">What you'll learn</h2>

          <p className="text-sm text-slate-500 mt-1">
            Skills you'll gain after completing this course
          </p>
        </div>

        {/* List */}
        <ul className="space-y-4">
          {learnItems.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />

              <span className="text-sm text-slate-700 leading-6">{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
