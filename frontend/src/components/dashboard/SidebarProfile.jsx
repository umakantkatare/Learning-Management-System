import { Camera } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuth from "@/hooks/useAuth";

export default function SidebarProfile({ handleAvatarChange }) {
  const { user } = useAuth();

  // Generate initials for the AvatarFallback
  const initials = user?.fullName
    ? user.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)
    : "U";

  return (
    <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-5 text-center mb-6">
      <div className="relative inline-block mx-auto mb-3">
        {/* Shadcn Avatar Component */}
        <Avatar className="w-20 h-20 border-2 border-orange-500">
          <AvatarImage
            src={
              user?.avatar?.url ||
              `https://ui-avatars.com/api/?name=${user?.fullName || "User"}&background=random`
            }
            alt={user?.fullName}
            className="object-cover"
          />
          <AvatarFallback className="bg-zinc-800 text-zinc-200">
            {initials}
          </AvatarFallback>
        </Avatar>

        {/* Camera Upload Button Overlay */}
        <label
          htmlFor="sidebar-avatar"
          className="absolute bottom-0 right-0 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-orange-500 text-white hover:bg-orange-600 shadow-md transition-colors"
        >
          <Camera size={14} />
        </label>

        {/* Hidden File Input */}
        <input
          id="sidebar-avatar"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleAvatarChange}
        />
      </div>

      {/* User Info */}
      <h3 className="font-semibold text-lg text-white">{user?.name}</h3>

      {/* Added email from the first snippet to fit the sidebar style */}
      {user?.email && (
        <p className="mt-1 text-sm text-zinc-400">{user.email}</p>
      )}

      <span className="inline-block mt-3 px-3 py-1 text-xs rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
        {user?.role}
      </span>
    </div>
  );
}
