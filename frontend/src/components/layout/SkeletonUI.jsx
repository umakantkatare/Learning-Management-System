import React from "react";
import { Skeleton } from "../ui/skeleton";

const SkeletonUI = () => {
  return (
    <div className="w-full min-h-screen bg-[#0d0d0d] text-white flex flex-col items-center p-6 space-y-12 overflow-hidden">
      {/* 1. Header/Navbar Skeleton */}
      <div className="w-full max-w-7xl flex justify-between items-center h-16 border-b border-zinc-800/50 px-4">
        <Skeleton className="h-6 w-32 bg-zinc-800" /> {/* Logo */}
        <div className="flex space-x-6">
          <Skeleton className="h-4 w-16 bg-zinc-800 hidden sm:block" />
          <Skeleton className="h-4 w-16 bg-zinc-800 hidden sm:block" />
          <Skeleton className="h-4 w-16 bg-zinc-800 hidden sm:block" />
        </div>
        <Skeleton className="h-8 w-8 rounded-full bg-zinc-800" />{" "}
        {/* Profile/Login */}
      </div>

      {/* 2. Hero Section Skeleton */}
      <div className="w-full max-w-3xl flex flex-col items-center text-center space-y-6 pt-10">
        {/* Top small badge */}
        <Skeleton className="h-6 w-40 rounded-full bg-zinc-800/80" />

        {/* Main Huge Heading (Become the Software Engineer...) */}
        <Skeleton className="h-12 w-full max-w-2xl rounded-lg bg-zinc-800" />
        <Skeleton className="h-12 w-3/4 max-w-md rounded-lg bg-zinc-800" />

        {/* Subtitle text line */}
        <Skeleton className="h-4 w-5/6 max-w-lg rounded bg-zinc-800/60" />

        {/* Action Buttons (View courses / Stats) */}
        <div className="flex space-x-4 pt-4">
          <Skeleton className="h-11 w-32 rounded-md bg-zinc-800" />
          <Skeleton className="h-11 w-32 rounded-md bg-zinc-800/50" />
        </div>
      </div>

      {/* 3. Stats Row Skeleton (4 Column small grid items) */}
      <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
        <Skeleton className="h-16 rounded-xl bg-zinc-800/70" />
        <Skeleton className="h-16 rounded-xl bg-zinc-800/70" />
        <Skeleton className="h-16 rounded-xl bg-zinc-800/70" />
        <Skeleton className="h-16 rounded-xl bg-zinc-800/70" />
      </div>

      {/* 4. Two Column Content Cards Grid (Unlock First Job etc.) */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        <Skeleton className="h-44 rounded-2xl bg-zinc-800/50" />
        <Skeleton className="h-44 rounded-2xl bg-zinc-800/50" />
      </div>
    </div>
  );
};

export default SkeletonUI;
