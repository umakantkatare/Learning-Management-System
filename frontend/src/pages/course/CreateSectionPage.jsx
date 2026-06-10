// import { useFieldArray, useForm } from "react-hook-form";

// import { motion } from "framer-motion";

// import { Plus, Trash2, GripVertical, BookOpen, Clock3 } from "lucide-react";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// import { Input } from "@/components/ui/input";

// import { Button } from "@/components/ui/button";

// import { Label } from "@/components/ui/label";

// import { Switch } from "@/components/ui/switch";
// import { addSection } from "@/api/sectionApi";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setCurrentSection } from "@/features/course/courseSlice";

// export default function CreateSectionPage() {
//   const dispatch = useDispatch();
//   const { courseId } = useParams();
//   const navigate = useNavigate();
//   const { control, register, watch, setValue, handleSubmit } = useForm({
//     defaultValues: {
//       sections: [
//         {
//           title: "",
//           order: 1,
//           isPublished: false,
//           totalLectures: 0,
//           totalDuration: 0,
//         },
//       ],
//     },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "sections",
//   });

//   const onSubmit = async (data) => {
//     try {
//       const result = await addSection(courseId, data);

//       const getSectionId = await dispatch(setCurrentSection(result));
//       console.log("get sectionId:", result?.data);
//       console.log("Success! Data saved:", result);

//       navigate(`/create-course/lectures/${courseId}`);
//     } catch (error) {
//       if (error.response) {
//         console.error("Backend Error:", error.response.data);
//         alert(`Error: ${error.success.message || "Failed to save"}`);
//       } else {
//         console.error("Network Error:", error.message);
//         alert("Network issue! Please check your internet.");
//       }
//     }
//     console.log(data);
//   };

//   return (
//     <div className="min-h-screen bg-black text-white px-4 py-8 md:px-6">
//       <div className="max-w-5xl mx-auto">
//         {/* HEADER */}

//         <div className="mb-10">
//           <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm text-orange-400">
//             <BookOpen className="w-4 h-4" />
//             Course Curriculum Builder
//           </div>

//           <h1 className="text-3xl md:text-5xl font-bold mt-5">
//             Create Course
//             <span className="text-orange-500"> Sections</span>
//           </h1>

//           <p className="text-zinc-400 mt-4 max-w-2xl">
//             Organize your course into structured learning sections for better
//             student experience.
//           </p>
//         </div>

//         {/* FORM */}

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           {/* SECTION LIST */}

//           {fields.map((field, index) => {
//             const isPublished = watch(`sections.${index}.isPublished`);

//             return (
//               <motion.div
//                 key={field.id}
//                 initial={{
//                   opacity: 0,
//                   y: 10,
//                 }}
//                 animate={{
//                   opacity: 1,
//                   y: 0,
//                 }}
//               >
//                 <Card className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden">
//                   {/* TOP BAR */}

//                   <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800 bg-zinc-900/40">
//                     {/* LEFT */}

//                     <div className="flex items-center gap-3">
//                       <GripVertical className="w-5 h-5 text-zinc-500 cursor-grab" />

//                       <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 font-semibold">
//                         {index + 1}
//                       </div>

//                       <div>
//                         <h3 className="font-semibold">Section {index + 1}</h3>

//                         <p className="text-xs text-zinc-500">
//                           Course Curriculum Section
//                         </p>
//                       </div>
//                     </div>

//                     {/* RIGHT */}

//                     <div className="flex items-center gap-3">
//                       <div
//                         className={`
//                           px-3 py-1 rounded-full text-xs font-medium
//                           ${
//                             isPublished
//                               ? "bg-green-500/10 text-green-400 border border-green-500/20"
//                               : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
//                           }
//                         `}
//                       >
//                         {isPublished ? "Published" : "Draft"}
//                       </div>

//                       <Button
//                         type="button"
//                         variant="destructive"
//                         size="icon"
//                         onClick={() => remove(index)}
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </Button>
//                     </div>
//                   </div>

//                   {/* CONTENT */}

//                   <CardContent className="p-6 space-y-6">
//                     {/* TITLE */}

//                     <div className="space-y-2">
//                       <Label className="text-zinc-300">Section Title</Label>

//                       <Input
//                         placeholder="Introduction to MERN Stack"
//                         // {...register(`sections.${index}.title`)}
//                         {...register("title")}
//                         className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 h-12"
//                       />
//                     </div>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             );
//           })}

//           {/* ADD SECTION */}

//           <Button
//             type="button"
//             variant="outline"
//             onClick={() =>
//               append({
//                 title: "",
//                 order: fields.length + 1,
//                 isPublished: false,
//                 totalLectures: 0,
//                 totalDuration: 0,
//               })
//             }
//             className="
//               w-full
//               h-14
//               border-dashed
//               border-zinc-700
//               bg-zinc-950
//               text-white
//               hover:bg-zinc-900
//               rounded-2xl
//             "
//           >
//             <Plus className="w-5 h-5 mr-2" />
//             Add New Section
//           </Button>

//           {/* ACTIONS */}

//           <div className="sticky bottom-0 bg-black/80 backdrop-blur-md py-5">
//             <div className="flex flex-col sm:flex-row gap-4 justify-end">
//               <Button
//                 type="button"
//                 variant="outline"
//                 className="border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800 h-12 px-6"
//               >
//                 Save Draft
//               </Button>

//               <Button
//                 type="submit"
//                 className="bg-orange-500 hover:bg-orange-600 text-white h-12 px-8"
//               >
//                 Next
//               </Button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// //  const dispatch = useDispatch()
// //   const {courseId} = useParams()
// //   const navigate = useNavigate()
// //   const { control, register, watch, setValue, handleSubmit } = useForm({
// //     defaultValues: {
// //       sections: [
// //         {
// //           title: "",
// //           order: 1,
// //           isPublished: false,
// //           totalLectures: 0,
// //           totalDuration: 0,
// //         },
// //       ],
// //     },
// //   });

// //   const { fields, append, remove } = useFieldArray({
// //     control,
// //     name: "sections",
// //   });

// //   const onSubmit = async (data) => {
// //     try {
// //       const result = await addSection(courseId, data);

// //      const getSectionId =  await dispatch(setCurrentSection(result))
// //      console.log("get sectionId:", result?.data);
// //      console.log("Success! Data saved:", result);

// //       navigate(`/create-course/lectures/${courseId}`)
// //     } catch (error) {
// //       if (error.response) {
// //         console.error("Backend Error:", error.response.data);
// //         alert(`Error: ${error.success.message || "Failed to save"}`);
// //       } else {
// //         console.error("Network Error:", error.message);
// //         alert("Network issue! Please check your internet.");
// //       }
// //     }
// //     console.log(data);
// //   };

// //  <div className="space-y-2">
// //     <Label className="text-zinc-300">Section Title</Label>

// //     <Input
// //       placeholder="Introduction to MERN Stack"
// //       {...register(`sections.${index}.title`)}
// //       // {...register('title')}
// //       className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 h-12"
// //     />
// //   </div>
