import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

export default function ProfileHeader({ isEditing, setIsEditing }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-4xl font-bold text-white">Personal Information</h1>

        <p className="mt-2 text-zinc-400">
          Update your personal details and manage your account.
        </p>
      </div>

      <Button
        onClick={() => setIsEditing(!isEditing)}
        className="bg-orange-500 hover:bg-orange-600"
      >
        <Pencil className="mr-2 h-4 w-4" />

        {isEditing ? "Cancel Editing" : "Edit Profile"}
      </Button>
    </div>
  );
}
