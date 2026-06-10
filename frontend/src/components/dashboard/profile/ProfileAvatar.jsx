import { Camera } from "lucide-react";

export default function ProfileAvatar({ user, handleAvatarChange }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="flex flex-col items-center gap-6 md:flex-row">
        <div className="relative">
          <img
            src={
              user?.avatar?.secure_url ||
              `https://ui-avatars.com/api/?name=${user?.name}`
            }
            alt={user?.name}
            className="h-28 w-28 rounded-full border-2 border-orange-500 object-cover"
          />

          <label
            htmlFor="avatar"
            className="absolute bottom-0 right-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-orange-500 text-white hover:bg-orange-600"
          >
            <Camera size={16} />
          </label>

          <input
            id="avatar"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">{user?.name}</h2>

          <p className="mt-1 text-zinc-400">{user?.email}</p>

          <span className="mt-3 inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-sm text-orange-400">
            {user?.role}
          </span>
        </div>
      </div>
    </div>
  );
}
