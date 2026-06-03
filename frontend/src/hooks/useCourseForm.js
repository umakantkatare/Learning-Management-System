import { useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { createCourseThunk } from "@/features/course/courseThunk";
import { courseSchema } from "@/utils/courseSchema";

export default function useCourseForm() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const [selectedCategory, setSelectedCategory] = useState("");

  const [thumbnailPreview, setThumbnailPreview] = useState("");

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setValue,

    formState: { errors },
  } = useForm({
    resolver: zodResolver(courseSchema),

    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
      category: "",
      level: "beginner",
      language: "English",

      isFree: false,

      price: 0,

      discountPrice: 0,

      thumbnail: null,

      tags: [{ value: "" }],

      requirements: [{ value: "" }],

      learningOutcomes: [{ value: "" }],
    },
  });

  const isFree = watch("isFree");

  const tagsField = useFieldArray({
    control,
    name: "tags",
  });

  const requirementsField = useFieldArray({
    control,
    name: "requirements",
  });

  const outcomesField = useFieldArray({
    control,
    name: "learningOutcomes",
  });

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setValue("thumbnail", file);

    const previewUrl = URL.createObjectURL(file);

    setThumbnailPreview(previewUrl);
  };

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        ...data,

        tags: data.tags.map((item) => item.value.trim()).filter(Boolean),

        requirements: data.requirements
          .map((item) => item.value.trim())
          .filter(Boolean),

        learningOutcomes: data.learningOutcomes
          .map((item) => item.value.trim())
          .filter(Boolean),
      };

      const formData = new FormData();

      formData.append("title", formattedData.title);

      formData.append("subtitle", formattedData.subtitle);

      formData.append("description", formattedData.description);

      formData.append("category", formattedData.category);

      formData.append("level", formattedData.level);

      formData.append("language", formattedData.language);

      formData.append("isFree", formattedData.isFree);

      formData.append("price", formattedData.price);

      formData.append("discountPrice", formattedData.discountPrice);

      if (formattedData.thumbnail) {
        formData.append("thumbnail", formattedData.thumbnail);
      }

      formData.append("tags", JSON.stringify(formattedData.tags));

      formData.append(
        "requirements",
        JSON.stringify(formattedData.requirements),
      );

      formData.append(
        "learningOutcomes",
        JSON.stringify(formattedData.learningOutcomes),
      );

      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const result = await dispatch(createCourseThunk(formData)).unwrap();

      const courseId = result?.data?._id;

      if (courseId) {
        reset();
        setThumbnailPreview("");
        navigate(`/create-course/sections/${courseId}`);
      }

    } catch (error) {
      console.log("CREATE COURSE ERROR:", error);

      toast.error(error?.message || "Failed to create course");
    }
  };

  return {
    register,
    errors,
    handleSubmit,
    onSubmit,
    setValue,
    isFree,
    fileInputRef,
    selectedCategory,
    setSelectedCategory,
    thumbnailPreview,
    handleThumbnailChange,
    tagsField,
    requirementsField,
    outcomesField,
  };
}
