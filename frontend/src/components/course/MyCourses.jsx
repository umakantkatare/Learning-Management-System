// import { useState } from "react";
// import {
//   Plus,
//   Search,
//   BookOpen,
//   Users,
//   Pencil,
//   Trash2,
//   Eye,
//   Globe,
//   MoreVertical,
//   BookX,
// } from "lucide-react";

// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { Progress } from "@/components/ui/progress";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { formatCurrency } from "@/utils/formatCurrency";

// const coursesData = [
//   {
//     _id: "1",
//     title: "Complete MERN Stack Bootcamp",
//     category: "Web Development",
//     thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
//     totalStudents: 320,
//     totalLectures: 48,
//     progress: 80,
//     totalRevenue: 45000,
//     isPublished: true,
//   },
//   {
//     _id: "2",
//     title: "Advanced React Masterclass",
//     category: "Frontend",
//     thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
//     totalStudents: 120,
//     totalLectures: 32,
//     progress: 45,
//     totalRevenue: 18000,
//     isPublished: false,
//   },
// ];

// export default function MyCourses() {
//   const [search, setSearch] = useState("");

//   const filteredCourses = coursesData.filter((course) =>
//     course.title.toLowerCase().includes(search.toLowerCase()),
//   );

//   return (
//     <div className="min-h-screen bg-black text-white p-4 md:p-8 relative overflow-hidden font-sans selection:bg-orange-500/30">
//       {/* Background Ambient Glow (matching the landing page vibe) */}
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none z-0" />

//       <div className="relative z-10 max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h1 className="text-3xl font-bold tracking-tight text-white">
//               My Courses
//             </h1>
//             <p className="text-zinc-400 mt-1">
//               Manage, edit, and publish your courses
//             </p>
//           </div>

//           <Button className="rounded-xl w-full sm:w-auto bg-[#ff5a00] hover:bg-[#ff5a00]/90 text-white font-medium border-0 shadow-[0_0_20px_rgba(255,90,0,0.2)] transition-all">
//             <Plus className="mr-2 h-4 w-4" />
//             Create Course
//           </Button>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-4">
//           <StatsCard
//             icon={<BookOpen className="h-5 w-5" />}
//             title="Total Courses"
//             value="12"
//           />
//           <StatsCard
//             icon={<Globe className="h-5 w-5" />}
//             title="Published"
//             value="8"
//           />
//           <StatsCard
//             icon={<Users className="h-5 w-5" />}
//             title="Students"
//             value="1,240"
//           />
//           <StatsCard
//             icon={<span className="font-semibold text-lg">₹</span>}
//             title="Revenue"
//             value={formatCurrency(82000)}
//           />
//         </div>

//         {/* Search & Filters */}
//         <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//           <div className="relative w-full sm:max-w-sm">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
//             <Input
//               placeholder="Search courses by title..."
//               className="pl-9 rounded-xl bg-[#0a0a0a] border-zinc-800/80 text-white placeholder:text-zinc-600 focus-visible:ring-[#ff5a00] focus-visible:border-[#ff5a00]"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Courses Grid */}
//         {filteredCourses.length > 0 ? (
//           <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 xl:grid-cols-3">
//             {filteredCourses.map((course) => (
//               <CourseCard key={course._id} course={course} />
//             ))}
//           </div>
//         ) : (
//           /* Empty State */
//           <Card className="mt-8 border-dashed bg-[#0a0a0a]/50 border-zinc-800/80">
//             <CardContent className="flex flex-col items-center justify-center p-12 text-center">
//               <div className="h-16 w-16 rounded-full bg-[#141414] flex items-center justify-center mb-4 border border-zinc-800/50">
//                 <BookX className="h-8 w-8 text-zinc-500" />
//               </div>
//               <h3 className="text-xl font-semibold text-white mb-1">
//                 No courses found
//               </h3>
//               <p className="text-zinc-400 max-w-sm">
//                 We couldn't find any courses matching "{search}". Try adjusting
//                 your search or create a new course.
//               </p>
//               <Button
//                 variant="outline"
//                 className="mt-6 rounded-xl bg-transparent border-zinc-700 hover:bg-zinc-800 hover:text-white"
//                 onClick={() => setSearch("")}
//               >
//                 Clear Search
//               </Button>
//             </CardContent>
//           </Card>
//         )}
//       </div>
//     </div>
//   );
// }

// function StatsCard({ title, value, icon }) {
//   return (
//     <Card className="rounded-2xl border-zinc-800/60 bg-[#0a0a0a] shadow-none transition-all duration-300 hover:border-zinc-700 hover:-translate-y-1">
//       <CardContent className="p-6 flex items-center justify-between">
//         <div className="space-y-1">
//           <p className="text-sm font-medium text-zinc-400">{title}</p>
//           <h3 className="text-2xl font-bold text-white">{value}</h3>
//         </div>
//         <div className="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-[#ff5a00] border border-orange-500/20">
//           {icon}
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// function CourseCard({ course }) {
//   return (
//     <Card className="group flex flex-col overflow-hidden rounded-2xl border-zinc-800/60 bg-[#0a0a0a] shadow-none hover:border-zinc-700 transition-all duration-300">
//       {/* Thumbnail */}
//       <div className="relative aspect-video overflow-hidden bg-[#141414]">
//         <img
//           src={course.thumbnail}
//           alt={`Thumbnail for ${course.title}`}
//           className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
//           loading="lazy"
//         />
//         {/* Dark Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

//         <div className="absolute top-3 right-3">
//           <Badge
//             variant="outline"
//             className={`shadow-sm font-medium border-0 px-3 py-1 ${
//               course.isPublished
//                 ? "bg-emerald-500/15 text-emerald-400"
//                 : "bg-zinc-800/80 text-zinc-300 backdrop-blur-sm"
//             }`}
//           >
//             {course.isPublished ? "Published" : "Draft"}
//           </Badge>
//         </div>
//       </div>

//       <CardContent className="flex flex-col flex-1 p-5 space-y-5">
//         {/* Title & Category */}
//         <div className="space-y-1.5">
//           <h2
//             className="text-xl font-semibold line-clamp-2 text-white group-hover:text-[#ff5a00] transition-colors"
//             title={course.title}
//           >
//             {course.title}
//           </h2>
//           <p className="text-sm font-medium text-zinc-500">{course.category}</p>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-2 gap-4 text-sm bg-[#141414] p-3 rounded-xl border border-zinc-800/50">
//           <div className="flex items-center gap-2">
//             <Users className="h-4 w-4 text-[#ff5a00]" />
//             <span className="font-medium text-zinc-200">
//               {course.totalStudents}{" "}
//               <span className="text-zinc-500 font-normal">Students</span>
//             </span>
//           </div>
//           <div className="flex items-center gap-2">
//             <BookOpen className="h-4 w-4 text-[#ff5a00]" />
//             <span className="font-medium text-zinc-200">
//               {course.totalLectures}{" "}
//               <span className="text-zinc-500 font-normal">Lectures</span>
//             </span>
//           </div>
//         </div>

//         {/* Progress Tracker */}
//         <div className="space-y-2 mt-auto">
//           <div className="flex items-center justify-between text-sm">
//             <span className="text-zinc-400 font-medium">Setup Progress</span>
//             <span className="font-bold text-white">{course.progress}%</span>
//           </div>
//           {/* Customizing standard shadcn progress to match dark/orange theme */}
//           <Progress
//             value={course.progress}
//             className="h-2 bg-zinc-800 [&>div]:bg-[#ff5a00]"
//           />
//         </div>

//         <hr className="border-zinc-800" />

//         {/* Bottom Section: Revenue & Actions */}
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">
//               Revenue
//             </p>
//             <h4 className="text-lg font-bold text-white">
//               {formatCurrency(course.totalRevenue)}
//             </h4>
//           </div>

//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button
//                 size="icon"
//                 variant="ghost"
//                 className="rounded-xl hover:bg-zinc-800 text-zinc-400 hover:text-white"
//                 aria-label="Open course options"
//               >
//                 <MoreVertical className="h-5 w-5" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent
//               align="end"
//               className="w-48 rounded-xl shadow-2xl border-zinc-800 bg-[#0a0a0a] text-zinc-300"
//             >
//               <DropdownMenuItem className="cursor-pointer focus:bg-zinc-800 focus:text-white">
//                 <Pencil className="mr-2 h-4 w-4 text-zinc-400" />
//                 Edit Course
//               </DropdownMenuItem>
//               <DropdownMenuItem className="cursor-pointer focus:bg-zinc-800 focus:text-white">
//                 <Eye className="mr-2 h-4 w-4 text-zinc-400" />
//                 Preview
//               </DropdownMenuItem>
//               <DropdownMenuItem className="cursor-pointer focus:bg-zinc-800 focus:text-white">
//                 <Globe className="mr-2 h-4 w-4 text-zinc-400" />
//                 {course.isPublished ? "Unpublish" : "Publish"}
//               </DropdownMenuItem>
//               <DropdownMenuItem className="text-red-400 focus:text-red-400 focus:bg-red-500/10 cursor-pointer">
//                 <Trash2 className="mr-2 h-4 w-4" />
//                 Delete Course
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>

//         {/* Footer Buttons */}
//         <div className="flex flex-col gap-3 sm:flex-row pt-2">
//           <Button className="flex-1 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white border-0">
//             Manage Content
//           </Button>
//           <Button
//             variant="outline"
//             className="flex-1 rounded-xl bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
//           >
//             Delete
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
