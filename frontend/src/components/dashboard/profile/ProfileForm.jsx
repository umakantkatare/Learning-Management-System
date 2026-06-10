import { User, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ProfileForm({
  user,
  formData,
  handleChange,
  handleSubmit,
  loading,
  isEditing,
}) {
  const defaultBio =
    "Passionate Full Stack Developer in training. Currently mastering React, Node.js and advanced system architecture. Focused on building scalable EdTech solutions.";
  return (
    <Card className="bg-zinc-900 border-zinc-800 text-white">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center gap-3">
            <User className="text-orange-500 w-5 h-5" />
            <h2 className="text-xl font-semibold">Contact Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Full Name */}
            <div className="space-y-2">
              <Label className="text-sm text-zinc-400 font-normal">
                Full Name
              </Label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full bg-zinc-950 border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:!bg-zinc-950 disabled:!text-white disabled:opacity-100 disabled:cursor-not-allowed transition-all"
              />
            </div>

            {/* Email Address */}
            <div className="space-y-2">
              <Label className="text-sm text-zinc-400 font-normal">
                Email Address
              </Label>
              <Input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full bg-zinc-950 border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:!bg-zinc-950 disabled:!text-white disabled:opacity-100 disabled:cursor-not-allowed transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wider text-zinc-500">
              Bio
            </Label>
            <Textarea
              rows={4}
              name="bio"
              value={isEditing ? formData.bio : formData.bio || defaultBio}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Write a brief description about yourself..."
              className="w-full bg-zinc-950 border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:!bg-zinc-950 disabled:!text-white disabled:opacity-100 disabled:cursor-not-allowed transition-all"
            />
          </div>

          {isEditing && (
            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-lg transition-colors shadow-md"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
