// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// export default function ContinueLearning() {
//   const courses = [
//     {
//       title: "Complete MERN Stack Bootcamp",
//       progress: 65,
//     },
//     {
//       title: "Advanced React Masterclass",
//       progress: 28,
//     },
//   ];

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-5">Continue Learning</h2>

//       <div className="grid md:grid-cols-2 gap-5">
//         {courses.map((course, index) => (
//           <Card key={index} className="rounded-2xl border-0 shadow-sm">
//             <CardContent className="p-5 space-y-4">
//               <h3 className="font-semibold text-lg">{course.title}</h3>

//               <div>
//                 <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
//                   <div
//                     className="h-full bg-primary"
//                     style={{
//                       width: `${course.progress}%`,
//                     }}
//                   />
//                 </div>

//                 <p className="text-sm text-slate-500 mt-2">
//                   {course.progress}% completed
//                 </p>
//               </div>

//               <Button className="w-full">Resume Course</Button>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }
