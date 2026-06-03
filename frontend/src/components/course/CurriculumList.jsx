import { Card, CardContent } from "@/components/ui/card";
import { formatDuration } from "@/utils/formatDuration";
import { ChevronDown, PlayCircle, Clock3 } from "lucide-react";

export default function CurriculumList({ course }) {
  console.log("curriculam list:", course?.sections);
  return (
    <Card className="rounded-2xl shadow-sm border-0">
      <CardContent className="p-6 space-y-6">
        {/* Heading */}
        <div>
          <h2 className="text-2xl font-bold">Course Curriculum</h2>

          <p className="text-sm text-slate-500 mt-1">
            {course?.sections?.length} sections • {course?.totalDuration} total
            length
          </p>
        </div>

        {/* Curriculum Items */}
        <div className="space-y-3">
          {course?.sections?.map((item, index) => (
            <div key={index} className="border rounded-xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-50">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </span>

                  <h3 className="font-medium">{item?.title || item}</h3>
                </div>

                <ChevronDown className="w-4 h-4 text-slate-500" />
              </div>

              {/* Content Preview */}
              <div className="px-4 py-3 space-y-3">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <PlayCircle className="w-4 h-4" />
                    <span>{item?.totalLectures || 5} lectures</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock3 className="w-4 h-4" />
                    <span>
                      {formatDuration(item?.totalDuration) || "2h 30m"}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-slate-500">
                  {/* Learn key concepts, hands-on projects, and real-world
                  examples. */}
                  {item?.description ||
                    "Learn key concepts, hands-on projects, and real-world examples"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
