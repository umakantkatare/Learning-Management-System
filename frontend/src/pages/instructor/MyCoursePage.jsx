import { useEffect, useMemo, useState } from "react";

import {
  Plus,
  Search,
  BookOpen,
  Users,
  Pencil,
  Trash2,
  Eye,
  Globe,
  MoreVertical,
  BookX,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useDispatch } from "react-redux";

import { getInstructorCoursesThunk } from "@/features/course/courseThunk";
import { useNavigate, useParams } from "react-router-dom";

export default function MyCoursePage() {
  const [search, setSearch] = useState("");
  const [coursesData, setCoursesData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const result = await dispatch(getInstructorCoursesThunk());

        const instructorCourses = result?.payload?.data || [];

        setCoursesData(instructorCourses);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCourses();
  }, [dispatch]);

  const stats = useMemo(() => {
    return {
      totalCourses: coursesData.length,

      publishedCourses: coursesData.filter(
        (course) => course?.status === "published",
      ).length,

      totalStudents: coursesData.reduce(
        (acc, course) => acc + (course?.enrolledStudents?.length || 0),
        0,
      ),
    };
  }, [coursesData]);

  const filteredCourses = useMemo(() => {
    if (!Array.isArray(coursesData)) return [];

    return coursesData.filter((course) =>
      course?.title?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [coursesData, search]);

  return (
    <div className="min-h-screen overflow-hidden bg-[#050505] text-white">
      {/* Ambient Glow */}
      <div className="pointer-events-none fixed left-1/2 top-[-200px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-10">
        {/* Header */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              My Courses
            </h1>

            <p className="mt-2 text-zinc-400">
              Manage and publish your LMS courses
            </p>
          </div>

          <Button className="h-11 rounded-xl bg-[#ff5a00] px-5 text-white hover:bg-[#ff5a00]/90">
            <Plus className="mr-2 h-4 w-4" />
            Create Course
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatsCard
            title="Total Courses"
            value={stats?.totalCourses}
            icon={<BookOpen className="h-5 w-5" />}
          />

          <StatsCard
            title="Published"
            value={stats?.publishedCourses}
            icon={<Globe className="h-5 w-5" />}
          />

          <StatsCard
            title="Students"
            value={stats?.totalStudents}
            icon={<Users className="h-5 w-5" />}
          />
        </div>

        {/* Search */}
        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />

            <Input
              placeholder="Search your courses..."
              className="h-11 rounded-xl border-zinc-800 bg-[#101010] pl-10 text-white placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-[#ff5a00]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 ? (
          <Card className="mt-8 border border-dashed border-zinc-800 bg-[#0f0f0f]">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-zinc-800 bg-[#171717]">
                <BookX className="h-10 w-10 text-zinc-500" />
              </div>

              <h3 className="mt-6 text-2xl font-semibold">
                No Courses Available
              </h3>

              <p className="mt-2 max-w-md text-sm text-zinc-500">
                Create your first course to get started.
              </p>

              <Button className="mt-6 rounded-xl bg-[#ff5a00] hover:bg-[#ff5a00]/90">
                <Plus className="mr-2 h-4 w-4" />
                Create Course
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredCourses.map((course) => (
              <CourseCard key={course?._id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatsCard({ title, value, icon }) {
  return (
    <Card className="rounded-2xl border border-zinc-800 bg-[#0f0f0f] transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700">
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm text-zinc-500">{title}</p>

          <h3 className="mt-2 text-2xl font-bold text-white">{value}</h3>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/10 text-[#ff5a00]">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}

function CourseCard({ course }) {
  console.log('coursedetails:', course);
   const navigate = useNavigate()
  //  const courseId = course._id
  return (
    <Card className="group overflow-hidden rounded-3xl border border-zinc-800 bg-[#0f0f0f] transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={course?.thumbnail?.url || "/placeholder-course.jpg"}
          alt={course?.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Publish Badge */}
        <div className="absolute right-4 top-4">
          <Badge
            className={`rounded-full border-0 px-3 py-1 text-xs font-medium ${
              course?.status === "published"
                ? "bg-emerald-500/15 text-emerald-400"
                : "bg-yellow-500/15 text-yellow-400"
            }`}
          >
            <div className="mr-2 h-2 w-2 rounded-full bg-current" />

            {course?.status === "published" ? "Published" : "Draft"}
          </Badge>
        </div>

        {/* Lectures Overlay */}
        <div className="absolute bottom-4 left-4">
          <div className="rounded-lg bg-black/70 px-3 py-1 text-xs text-white backdrop-blur-md">
            {course?.totalLectures || 0} Lectures
          </div>
        </div>
      </div>
      {/* Content */}
      <CardContent className="space-y-4 p-4">
        {/* Title */}
        <div>
          <h2 className="line-clamp-2 text-lg font-semibold text-white transition-colors duration-300 group-hover:text-[#ff5a00]">
            {course?.title}
          </h2>

          <p className="mt-1 text-sm text-zinc-500">{course?.category}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 rounded-2xl border border-zinc-800 bg-[#171717] p-3">
          <div className="flex flex-col">
            <span className="text-base font-bold text-white">
              {course?.enrolledStudents?.length || 0}
            </span>

            <span className="text-xs text-zinc-500">Students</span>
          </div>

          <div className="flex flex-col">
            <span className="text-base font-bold text-white">
              {course?.totalLectures || 0}
            </span>

            <span className="text-xs text-zinc-500">Lectures</span>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex h-10 w-10 items-center justify-center rounded-xl text-zinc-400 outline-none transition-colors hover:bg-zinc-800 hover:text-white">
              <MoreVertical className="h-5 w-5" />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-48 rounded-xl border border-zinc-800 bg-[#0f0f0f] text-zinc-300"
            >
              <DropdownMenuItem className="cursor-pointer focus:bg-zinc-800">
                <Pencil className="mr-2 h-4 w-4" />
                Edit Course
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer focus:bg-zinc-800">
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer focus:bg-zinc-800">
                <Globe className="mr-2 h-4 w-4" />

                {course?.status === "published" ? "Unpublish" : "Publish"}
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer text-red-400 focus:bg-red-500/10 focus:text-red-400">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Course
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* CTA */}
        <Button className="h-10 w-full rounded-xl bg-[#ff5a00] text-white hover:bg-[#ff5a00]/90" onClick={() => navigate(`/instructor/managecourse/${course?._id}`)}>
          Manage Course
        </Button>
      </CardContent>
    </Card>
  );
}
