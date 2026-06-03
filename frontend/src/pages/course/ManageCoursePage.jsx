import { useEffect, useState } from "react";
import {
  ChevronRight,
  Play,
  Pencil,
  Trash2,
  Plus,
  Upload,
  Globe,
  Save,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { setCurrentSection } from "@/features/course/courseSlice";
import { useDispatch } from "react-redux";
import {
  addSection,
  deleteSection,
  getSection,
  updateSection,
} from "@/api/sectionApi";
import { useParams, useNavigate } from "react-router-dom";
import { createLecture, deleteLecture, editLecture } from "@/api/lectureApi";
import { uploadVideo } from "@/api/uploadVideo";
// ✅ Ensure getCourse is exported from your courseApi file
import { updateCourse, getInstructorCourses, getCourseById } from "@/api/courseApi";

// InfoCard Component for the top metrics
const InfoCard = ({ title, value }) => (
  <Card className="border-zinc-800 bg-zinc-950">
    <CardContent className="flex flex-col gap-1 p-6">
      <span className="text-sm font-medium text-zinc-400">{title}</span>
      <span className="text-2xl font-bold text-white truncate" title={value}>
        {value}
      </span>
    </CardContent>
  </Card>
);

export default function ManageCoursePage() {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const navigate = useNavigate();

  // Core Data States
  const [sections, setSections] = useState([]);
  const [courseTitle, setCourseTitle] = useState("Loading...");
  const [expandedId, setExpandedId] = useState(null);
  const [sectionTitle, setSectionTitle] = useState("");
  const [showSectionInput, setShowSectionInput] = useState(false);

  const [lectureTitles, setLectureTitles] = useState({});
  const [lectureDescriptions, setLectureDescriptions] = useState({});
  const [lectureFiles, setLectureFiles] = useState({});

  // Loading States
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const [uploadingLectureId, setUploadingLectureId] = useState(null);

  const [editDialog, setEditDialog] = useState({
    isOpen: false,
    type: "",
    id: "",
    title: "",
    description: "",
  });

  // Calculate Dynamic Totals for Info Cards
  const totalSections = sections.length;
  const totalLectures = sections.reduce(
    (acc, section) => acc + (section.lectures?.length || 0),
    0,
  );

  // Fetch initial data
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // Fetch sections
        const sectionData = await getSection(courseId);
        setSections(sectionData?.data || []);

        // Fetch course details for the title
        const courseData = await getCourseById(courseId);
        // console.log('get course title:', courseData?.data?.data);
        // Adjust the path to the title based on your exact API response structure
        setCourseTitle(
            courseData?.data?.data?.title ||
            "Untitled Course",
        );
      } catch (error) {
        console.error(error);
        toast.error("Failed to load course data.");
        setCourseTitle("Course Details Unavailable");
      }
    };
    fetchCourseData();
  }, [courseId]);

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      await updateCourse(courseId, { status: "draft" });
      toast.success("Course saved as draft");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save draft");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (sections.length === 0) {
      return toast.warning("Add at least one section");
    }

    const hasEmptySection = sections.some(
      (section) => !section.lectures?.length,
    );

    if (hasEmptySection) {
      return toast.warning("Each section must contain at least one lecture");
    }

    const lectureWithoutVideo = sections.some((section) =>
      section.lectures.some((lecture) => !lecture.video?.url),
    );

    if (lectureWithoutVideo) {
      return toast.warning("Upload video for all lectures");
    }

    setIsPublishing(true);
    try {
      await updateCourse(courseId, { status: "published" });
      toast.success("Course published successfully 🚀");
    } catch (error) {
      console.error(error);
      toast.error("Failed to publish course");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleAddSection = async () => {
    if (!sectionTitle.trim()) {
      return toast.error("Section title cannot be empty");
    }

    setIsAddingSection(true);
    try {
      const result = await addSection(courseId, { title: sectionTitle });
      const newSection = result?.data?.data || result?.data;
      const newSectionId = newSection._id || newSection.id;

      dispatch(setCurrentSection(newSection));

      setSections((prev) => [
        ...prev,
        {
          _id: newSectionId,
          title: newSection.title,
          lectures: [],
        },
      ]);

      setExpandedId(newSectionId);
      setSectionTitle("");
      setShowSectionInput(false);
      toast.success("Section added successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to create section");
    } finally {
      setIsAddingSection(false);
    }
  };

  const handleDeleteSection = async (sectionId) => {
    try {
      await deleteSection(sectionId);
      setSections((prev) =>
        prev.filter((section) => section._id !== sectionId),
      );
      if (expandedId === sectionId) {
        setExpandedId(null);
      }
      toast.success("Section deleted");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete section");
    }
  };

  const handleEditSection = (section) => {
    setEditDialog({
      isOpen: true,
      type: "section",
      id: section._id,
      title: section.title,
      description: "",
    });
  };

  const handleAddLecture = async (sectionId) => {
    const title = lectureTitles[sectionId]?.trim();
    const description = lectureDescriptions[sectionId]?.trim() || "";
    const selectedFile = lectureFiles[sectionId];

    if (!title) {
      return toast.warning("Lecture title is required!");
    }

    try {
      setUploadingLectureId(sectionId);
      let videoData = null;

      if (selectedFile) {
        const uploadResult = await uploadVideo(selectedFile);
        if (!uploadResult.success) {
          throw new Error(uploadResult.error || "Video upload failed");
        }
        videoData = {
          public_id: uploadResult.public_id,
          url: uploadResult.url,
          duration: uploadResult.duration,
        };
      }

      await createLecture(courseId, {
        title,
        sectionId,
        description,
        video: videoData,
      });

      const data = await getSection(courseId);
      setSections(data?.data || []);

      setLectureTitles((prev) => ({ ...prev, [sectionId]: "" }));
      setLectureDescriptions((prev) => ({ ...prev, [sectionId]: "" }));
      setLectureFiles((prev) => ({ ...prev, [sectionId]: null }));

      toast.success("Lecture added successfully!");
    } catch (error) {
      console.error("Create Lecture Error:", error);
      toast.error(error.message || "Failed to create lecture");
    } finally {
      setUploadingLectureId(null);
    }
  };

  const handleEditLecture = (lecture) => {
    setEditDialog({
      isOpen: true,
      type: "lecture",
      id: lecture._id,
      title: lecture.title,
      description: lecture.description || "",
    });
  };

  const handleDeleteLecture = async (lectureId) => {
    try {
      await deleteLecture(lectureId);
      const data = await getSection(courseId);
      setSections(data?.data || []);
      toast.success("Lecture deleted");
    } catch (error) {
      console.error("Delete Lecture Error:", error);
      toast.error("Failed to delete lecture");
    }
  };

  const handleSaveEdit = async () => {
    const { type, id, title, description } = editDialog;
    if (!title.trim()) return toast.warning("Title cannot be empty");

    setIsSavingEdit(true);
    try {
      if (type === "section") {
        await updateSection(id, { title: title.trim() });
        setSections((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, title: title.trim() } : item,
          ),
        );
        toast.success("Section updated");
      } else if (type === "lecture") {
        await editLecture(id, {
          title: title.trim(),
          description: description.trim(),
        });
        const data = await getSection(courseId);
        setSections(data?.data || []);
        toast.success("Lecture updated");
      }

      setEditDialog({
        isOpen: false,
        type: "",
        id: "",
        title: "",
        description: "",
      });
    } catch (error) {
      console.error(`Failed to update ${type}:`, error);
      toast.error(`Failed to update ${type}`);
    } finally {
      setIsSavingEdit(false);
    }
  };

  const handleFileUpload = async (lectureId, file) => {
    if (!file) return;

    setUploadingLectureId(lectureId);
    try {
      const uploadResult = await uploadVideo(file);

      if (!uploadResult.success) {
        throw new Error(uploadResult.error || "Upload failed");
      }

      await editLecture(lectureId, {
        video: {
          public_id: uploadResult.public_id,
          url: uploadResult.url,
          duration: uploadResult.duration,
        },
      });

      const data = await getSection(courseId);
      setSections(data?.data || []);
      toast.success("Video uploaded successfully!");
    } catch (error) {
      console.error("Video Upload Error:", error.message);
      toast.error(error.message || "Failed to upload video");
    } finally {
      setUploadingLectureId(null);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => navigate(-1)}
              className="rounded-xl text-zinc-400 hover:bg-zinc-800 hover:text-white"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Manage Course
              </h1>
              <p className="mt-2 text-zinc-400">
                Build and organize your complete course curriculum
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              disabled={isSaving}
              className="rounded-xl border-zinc-700 bg-transparent hover:bg-zinc-800 text-white disabled:opacity-50"
            >
              {isSaving ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin text-zinc-400" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              {isSaving ? "Saving..." : "Save Draft"}
            </Button>

            <Button
              onClick={handlePublish}
              disabled={isPublishing}
              className="rounded-xl bg-[#ff5a00] hover:bg-[#ff5a00]/90 text-white disabled:opacity-50"
            >
              {isPublishing ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" />
              ) : (
                <Globe className="mr-2 h-4 w-4" />
              )}
              {isPublishing ? "Publishing..." : "Publish Course"}
            </Button>
          </div>
        </div>

        {/* Top Info Cards */}
        <div className="mt-8 mb-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <InfoCard title="Course Title" value={courseTitle} />
          <InfoCard
            title="Total Sections"
            value={`${totalSections} Sections`}
          />
          <InfoCard
            title="Total Lectures"
            value={`${totalLectures} Lectures`}
          />
        </div>

        {/* Course Curriculum Sub-Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Course Curriculum</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Organize your sections and lectures
            </p>
          </div>

          <Button
            onClick={() => setShowSectionInput(!showSectionInput)}
            className="rounded-xl bg-[#ff5a00] hover:bg-[#ff5a00]/90 text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Section
          </Button>
        </div>

        {/* Toggleable Add Section Input Form */}
        {showSectionInput && (
          <Card className="mb-6 border-zinc-800 bg-zinc-950 animate-in fade-in slide-in-from-top-2">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row">
                <Input
                  name="title"
                  placeholder="Enter section title..."
                  value={sectionTitle}
                  autoFocus
                  onChange={(e) => setSectionTitle(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && !isAddingSection && handleAddSection()
                  }
                  className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-[#ff5a00]"
                  disabled={isAddingSection}
                />
                <Button
                  onClick={handleAddSection}
                  disabled={isAddingSection || !sectionTitle.trim()}
                  className="bg-zinc-100 text-zinc-900 hover:bg-white min-w-[100px]"
                >
                  {isAddingSection ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    "Save"
                  )}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setShowSectionInput(false)}
                  className="text-zinc-400 hover:text-white"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Sections Listing */}
        <div className="space-y-4">
          {sections.map((section, idx) => {
            const isOpen = expandedId === section._id;
            const lectures = section.lectures || [];

            return (
              <Card
                key={section._id}
                className="overflow-hidden border-zinc-800 bg-zinc-950"
              >
                {/* Section Header */}
                <div
                  onClick={() => {
                    setExpandedId(isOpen ? null : section._id);
                    dispatch(setCurrentSection(section));
                  }}
                  className="flex cursor-pointer flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between hover:bg-zinc-900/50 transition-colors"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-md bg-zinc-900 transition ${
                        isOpen ? "rotate-90 text-[#ff5a00]" : "text-zinc-500"
                      }`}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </div>

                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-md border text-xs font-bold ${
                        isOpen
                          ? "border-[#ff5a00]/30 bg-[#ff5a00]/10 text-[#ff5a00]"
                          : "border-zinc-800 bg-zinc-900 text-zinc-500"
                      }`}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </div>

                    <div className="min-w-0">
                      <h2 className="truncate text-sm font-semibold sm:text-base text-white">
                        {section.title || "Untitled Section"}
                      </h2>
                      <p className="text-xs text-zinc-500">
                        {lectures.length} lecture
                        {lectures.length !== 1 && "s"}
                      </p>
                    </div>
                  </div>

                  <div
                    className="flex items-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                      onClick={() => handleEditSection(section)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>

                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDeleteSection(section._id)}
                      className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Section Body */}
                {isOpen && (
                  <div className="border-t border-zinc-800 p-4 bg-black/20">
                    <div className="space-y-3">
                      {lectures.length === 0 && (
                        <div className="rounded-lg border border-dashed border-zinc-800 py-6 text-center text-sm text-zinc-500">
                          No lectures yet — add one below
                        </div>
                      )}

                      {lectures.map((lecture) => (
                        <div
                          key={lecture._id}
                          className="flex flex-col gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4 lg:flex-row lg:items-center lg:justify-between"
                        >
                          <div className="flex min-w-0 items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#ff5a00]/10 text-[#ff5a00]">
                              <Play className="h-4 w-4 fill-[#ff5a00]" />
                            </div>

                            <div className="min-w-0">
                              <h3 className="truncate text-sm font-medium text-white">
                                {lecture.title}
                              </h3>

                              {lecture.description && (
                                <p className="text-xs text-zinc-400 mt-1 line-clamp-1">
                                  {lecture.description}
                                </p>
                              )}

                              <div className="mt-1 flex flex-wrap items-center gap-2">
                                <span className="text-xs text-zinc-500">
                                  {lecture.video?.duration || 0}
                                </span>

                                {lecture.isPreviewFree && (
                                  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-400">
                                    Preview Free
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            {/* File Upload Trigger */}
                            <div className="relative">
                              <input
                                type="file"
                                id={`upload-${lecture._id}`}
                                className="hidden"
                                accept="video/*"
                                onChange={(e) =>
                                  handleFileUpload(
                                    lecture._id,
                                    e.target.files[0],
                                  )
                                }
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-zinc-700 bg-zinc-950 text-zinc-300 hover:text-white cursor-pointer"
                                disabled={uploadingLectureId === lecture._id}
                                onClick={() =>
                                  document
                                    .getElementById(`upload-${lecture._id}`)
                                    .click()
                                }
                              >
                                {uploadingLectureId === lecture._id ? (
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                  <Upload className="mr-2 h-4 w-4" />
                                )}
                                {uploadingLectureId === lecture._id
                                  ? "Uploading..."
                                  : "Upload"}
                              </Button>
                            </div>

                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-zinc-400 hover:text-white"
                              onClick={() => handleEditLecture(lecture)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>

                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                              onClick={() => handleDeleteLecture(lecture._id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}

                      {/* Add Lecture Form */}
                      <div className="mt-4 flex flex-col gap-3 rounded-xl border border-dashed border-zinc-700 bg-zinc-900/40 p-4">
                        <div className="flex flex-col gap-2 sm:flex-row">
                          <Input
                            placeholder="Lecture title"
                            className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-[#ff5a00]"
                            value={lectureTitles[section._id] || ""}
                            onChange={(e) =>
                              setLectureTitles((prev) => ({
                                ...prev,
                                [section._id]: e.target.value,
                              }))
                            }
                          />

                          <Input
                            placeholder="Description"
                            className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-[#ff5a00]"
                            value={lectureDescriptions[section._id] || ""}
                            onChange={(e) =>
                              setLectureDescriptions((prev) => ({
                                ...prev,
                                [section._id]: e.target.value,
                              }))
                            }
                          />

                          <Input
                            type="file"
                            accept="video/*"
                            className="border-zinc-800 bg-zinc-900 text-zinc-400 file:text-zinc-300"
                            onChange={(e) =>
                              setLectureFiles((prev) => ({
                                ...prev,
                                [section._id]: e.target.files?.[0],
                              }))
                            }
                          />

                          <Button
                            onClick={() => handleAddLecture(section._id)}
                            disabled={uploadingLectureId === section._id}
                            className="bg-zinc-200 text-zinc-900 hover:bg-white min-w-[140px]"
                          >
                            {uploadingLectureId === section._id ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                              </>
                            ) : (
                              "Add Lecture"
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {/* Edit Dialog (Modal) */}
      <Dialog
        open={editDialog.isOpen}
        onOpenChange={(isOpen) =>
          setEditDialog((prev) => ({ ...prev, isOpen }))
        }
      >
        <DialogContent className="border-zinc-800 bg-zinc-950 text-white sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Edit {editDialog.type === "section" ? "Section" : "Lecture"}
            </DialogTitle>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Title</label>
              <Input
                value={editDialog.title}
                onChange={(e) =>
                  setEditDialog((prev) => ({ ...prev, title: e.target.value }))
                }
                onKeyDown={(e) =>
                  e.key === "Enter" && !isSavingEdit && handleSaveEdit()
                }
                className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-[#ff5a00]"
                autoFocus
                disabled={isSavingEdit}
              />
            </div>

            {editDialog.type === "lecture" && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">
                  Description
                </label>
                <Input
                  value={editDialog.description}
                  onChange={(e) =>
                    setEditDialog((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  onKeyDown={(e) =>
                    e.key === "Enter" && !isSavingEdit && handleSaveEdit()
                  }
                  className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-[#ff5a00]"
                  placeholder="Optional description"
                  disabled={isSavingEdit}
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              disabled={isSavingEdit}
              onClick={() =>
                setEditDialog({
                  isOpen: false,
                  type: "",
                  id: "",
                  title: "",
                  description: "",
                })
              }
              className="border-zinc-800 bg-transparent text-white hover:bg-zinc-900"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveEdit}
              disabled={isSavingEdit}
              className="bg-[#ff5a00] text-white hover:bg-[#ff5a00]/90 min-w-[120px]"
            >
              {isSavingEdit ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {isSavingEdit ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
