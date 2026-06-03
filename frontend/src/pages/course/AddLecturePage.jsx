import { useRef, useState } from "react";

import { useForm, useFieldArray } from "react-hook-form";

import { motion } from "framer-motion";

import {
  Plus,
  Trash2,
  UploadCloud,
  Video,
  FileText,
  Clock3,
  GripVertical,
} from "lucide-react";

import { Card, CardContent, } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";

import { Switch } from "@/components/ui/switch";
import { createLecture } from "@/api/lectureApi";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { uploadVideo } from "@/api/uploadVideo";

export default function AddLecturePage() {
  const navigate = useNavigate()
  const { courseId } = useParams();
  const { currentSection } = useSelector((state) => state?.course);
  const sectionId = currentSection?.data?._id;
  const videoInputRef = useRef({});

  const [videoPreview, setVideoPreview] = useState({});

  const { register, control, watch, setValue, handleSubmit,reset } = useForm({
    defaultValues: {
      lectures: [
        {
          title: "",
          description: "",
          order: 1,

          video: {
            duration: 0,
          },

          isPreviewFree: false,

          isPublished: false,

          resources: [
            {
              title: "",
              url: "",
            },
          ],
        },
      ],
    },
  });

  /* ========================================
     FIELD ARRAY
  ======================================== */

  const { fields, append, remove } = useFieldArray({
    control,
    name: "lectures",
  });

  const onSubmit = async (data) => {
    try {
      const updatedLectures = await Promise.all(
        data.lectures.map(async (lecture) => {
          const file = lecture.video.file;

          // no file uploaded
          if (!file) return lecture;

          // upload video

          const uploadResult = await uploadVideo(file);

          if (!uploadResult.success) {
            throw new Error(uploadResult.error);
          }
          reset()
          navigate(`/`)


          return {
            ...lecture,

            video: {
              public_id: uploadResult.public_id,
              url: uploadResult.url,
              duration: uploadResult.duration,
            },
          };
        }),
      );

      // final payload

      const payload = {
        lectures: updatedLectures,
        sectionId,
      };

      const response = await createLecture(courseId, payload);

      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm text-orange-400">
            <Video className="w-4 h-4" />
            Course Lecture Builder
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mt-5">
            Add Course
            <span className="text-orange-500"> Lectures</span>
          </h1>

          <p className="text-zinc-400 mt-4 max-w-2xl">
            Upload videos, add resources and organize your lecture content for
            students.
          </p>
        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {fields.map((field, index) => {
            const isPublished = watch(`lectures.${index}.isPublished`);

            const isPreviewFree = watch(`lectures.${index}.isPreviewFree`);

            return (
              <motion.div
                key={field.id}
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
              >
                <Card className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden">
                  {/* TOP BAR */}

                  <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800 bg-zinc-900/40">
                    {/* LEFT */}

                    <div className="flex items-center gap-3">
                      <GripVertical className="w-5 h-5 text-zinc-500 cursor-grab" />

                      <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 font-semibold">
                        {index + 1}
                      </div>

                      <div>
                        <h3 className="font-semibold">Lecture {index + 1}</h3>

                        <p className="text-xs text-zinc-500">
                          Course Video Lecture
                        </p>
                      </div>
                    </div>

                    {/* RIGHT */}

                    <div className="flex items-center gap-3">
                      <div
                        className={`
                          px-3 py-1 rounded-full text-xs font-medium
                          ${
                            isPublished
                              ? "bg-green-500/10 text-green-400 border border-green-500/20"
                              : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                          }
                        `}
                      >
                        {isPublished ? "Published" : "Draft"}
                      </div>

                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* CONTENT */}

                  <CardContent className="p-6 space-y-8">
                    {/* TITLE */}

                    <div className="space-y-2">
                      <Label className="text-zinc-300">Lecture Title</Label>

                      <Input
                        placeholder="Introduction to React"
                        {...register(`lectures.${index}.title`)}
                        // {...register(`title`)}
                        className="bg-zinc-900 border-zinc-700 text-white h-12 placeholder:text-zinc-500"
                      />
                    </div>

                    {/* DESCRIPTION */}

                    <div className="space-y-2">
                      <Label className="text-zinc-300">
                        Lecture Description
                      </Label>

                      <Textarea
                        rows={5}
                        placeholder="Write lecture summary..."
                        {...register(`lectures.${index}.description`)}
                        className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
                      />
                    </div>

                    {/* VIDEO UPLOAD */}

                    <div className="space-y-3">
                      <Label className="text-zinc-300">Upload Video</Label>

                      <div
                        onClick={() => videoInputRef.current[index]?.click()}
                        className="
                          border-2 border-dashed border-zinc-700
                          rounded-3xl
                          p-8
                          bg-zinc-900/50
                          flex
                          flex-col
                          items-center
                          justify-center
                          text-center
                          cursor-pointer
                          hover:border-orange-500
                          transition-all
                        "
                      >
                        <UploadCloud className="w-12 h-12 text-orange-500 mb-4" />

                        <h3 className="font-semibold text-lg">
                          Upload Lecture Video
                        </h3>

                        <p className="text-sm text-zinc-500 mt-2">
                          MP4, MOV or WEBM up to 2GB
                        </p>

                        <Input
                          ref={(el) => (videoInputRef.current[index] = el)}
                          type="file"
                          accept="video/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];

                            if (!file) return;

                            setValue(`lectures.${index}.video.file`, file);

                            const preview = URL.createObjectURL(file);

                            setVideoPreview((prev) => ({
                              ...prev,
                              [index]: preview,
                            }));
                          }}
                        />

                        {videoPreview[index] && (
                          <video
                            controls
                            className="
                              w-full
                              max-w-3xl
                              rounded-2xl
                              mt-6
                              border
                              border-zinc-700
                            "
                          >
                            <source src={videoPreview[index]} />
                          </video>
                        )}
                      </div>
                    </div>

                    {/* RESOURCES */}

                    <ResourceSection
                      control={control}
                      register={register}
                      lectureIndex={index}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}

          {/* ADD LECTURE */}

          <Button
            type="button"
            variant="outline"
            onClick={() =>
              append({
                title: "",
                description: "",
                order: fields.length + 1,

                isPreviewFree: false,

                isPublished: false,

                video: {
                  duration: 0,
                },

                resources: [
                  {
                    title: "",
                    url: "",
                  },
                ],
              })
            }
            className="
              w-full
              h-14
              border-dashed
              border-zinc-700
              bg-zinc-950
              text-white
              hover:bg-zinc-900
              rounded-2xl
            "
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Lecture
          </Button>

          {/* ACTIONS */}

          <div className="sticky bottom-0 bg-black/80 backdrop-blur-md py-5">
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Button
                type="button"
                variant="outline"
                className="border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800 h-12 px-6"
              >
                Save Draft
              </Button>

              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white h-12 px-8"
              >
                Save Lectures
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ========================================
   RESOURCE SECTION
======================================== */

function ResourceSection({ control, register, lectureIndex }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `lectures.${lectureIndex}.resources`,
  });

  return (
    <div className="space-y-5">
      {/* HEADER */}

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Lecture Resources</h3>

          <p className="text-sm text-zinc-500 mt-1">
            Attach PDFs, docs or external links.
          </p>
        </div>

        <Button
          type="button"
          onClick={() =>
            append({
              title: "",
              url: "",
            })
          }
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Resource
        </Button>
      </div>

      {/* RESOURCE LIST */}

      <div className="space-y-4">
        {fields.map((field, resourceIndex) => (
          <div
            key={field.id}
            className="
              bg-zinc-900
              border
              border-zinc-800
              rounded-2xl
              p-5
              space-y-4
            "
          >
            {/* TOP */}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-orange-500" />
                </div>

                <div>
                  <h4 className="font-medium">Resource {resourceIndex + 1}</h4>

                  <p className="text-xs text-zinc-500">
                    Lecture Supporting Material
                  </p>
                </div>
              </div>

              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => remove(resourceIndex)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            {/* TITLE */}

            <div className="space-y-2">
              <Label className="text-zinc-300">Resource Title</Label>

              <Input
                placeholder="React Notes PDF"
                {...register(
                  `lectures.${lectureIndex}.resources.${resourceIndex}.title`,
                )}
                className="bg-black border-zinc-700 text-white h-12"
              />
            </div>

            {/* URL */}

            <div className="space-y-2">
              <Label className="text-zinc-300">Resource URL</Label>

              <Input
                placeholder="https://..."
                {...register(
                  `lectures.${lectureIndex}.resources.${resourceIndex}.url`,
                )}
                className="bg-black border-zinc-700 text-white h-12"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
