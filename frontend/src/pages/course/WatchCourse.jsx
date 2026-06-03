import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Change to 'next/navigation' if using Next.js

// Import your API call (adjust the path based on your folder structure)

import CourseTabs from "@/components/course/watch/CourseTabs";
import LectureSidebar from "@/components/course/watch/LectureSidebar";
import VideoPlayer from "@/components/course/watch/VideoPlayer";
import { getCourseById } from "@/api/courseApi";

export default function WatchCourse() {
  const [course, setCourse] = useState(null);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [loading, setLoading] = useState(true);

  // Grab the course ID from the URL parameters (e.g., /watch/:id)
  const { id } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);

        // Call your actual backend API
        const res = await getCourseById(id);
        console.log("watch lecture response:", res);

        // Assuming your backend returns data in a { data: { course: {...} } } structure
        // Adjust this if your actual API response structure is different
        const fetchedCourse = res?.data?.data;
        console.log("fetchCourse", fetchedCourse);

        setCourse(fetchedCourse);

        // Automatically select the first lecture of the first section to play
        if (
          fetchedCourse?.sections?.length > 0 &&
          fetchedCourse.sections[0].lectures?.length > 0
        ) {
          setCurrentLecture(fetchedCourse.sections[0].lectures[0]);
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setLoading(false);
      }
    };

    // Only run the fetch if we have an ID
    if (id) {
      fetchCourse();
    }
  }, [id]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  // No Course Found
  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Course not found
      </div>
    );
  }
  console.log("current lecture:", currentLecture);
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Header */}
      <div className="border-b border-zinc-800 px-4 py-3">
        <h1 className="text-lg md:text-xl font-semibold">{course.title}</h1>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row">
        {/* LEFT SIDE: Sidebar (Sections & Lectures) */}
        <div className="w-full lg:w-[350px] border-b lg:border-b-0 lg:border-r border-zinc-800">
          <LectureSidebar
            sections={course.sections}
            currentLecture={currentLecture}
            setCurrentLecture={setCurrentLecture}
          />
        </div>

        {/* RIGHT SIDE: Video & Tabs */}
        <div className="flex-1 p-4 space-y-4">
          {/* Video */}
          {/* {currentLecture && <VideoPlayer lecture={currentLecture} />} */}
          {currentLecture &&
            currentLecture.video &&
            currentLecture.video.url && (
              <VideoPlayer
                lecture={currentLecture}
                videoUrl={currentLecture?.video?.url}
              />
            )}

          {/* Tabs */}
          <CourseTabs description={course.description} />
        </div>
      </div>
    </div>
  );
}
