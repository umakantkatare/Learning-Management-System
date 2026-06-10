import { User, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";


export default function InfoSectionCard({ title, data, type, bio }) {
  const Icon = type === "contact" ? User : MapPin;

  return (
    <Card className="bg-zinc-900 border-zinc-800 text-white">
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center gap-3">
          <Icon className="text-orange-500" />
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm text-zinc-400">Full Name</label>
            <input
              type="text"
              defaultValue={data?.name}
              readOnly
              className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm text-zinc-400">Email</label>
            <input
              type="email"
              defaultValue={data?.email}
              readOnly
              className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {bio && (
          <div>
            <p className="text-xs uppercase text-zinc-500 mb-2">Bio</p>

            <div className="bg-black border border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-300 leading-6">
              Passionate Full Stack Developer in training. Currently mastering
              React, Node.js and advanced system architecture. Focused on
              building scalable EdTech solutions.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
