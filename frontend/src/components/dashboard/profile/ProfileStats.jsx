export default function ProfileStats({ user }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-sm text-zinc-400">Role</p>

        <h3 className="mt-2 text-xl font-semibold text-white">{user?.role}</h3>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-sm text-zinc-400">Account Status</p>

        <h3 className="mt-2 text-xl font-semibold text-green-500">Active</h3>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-sm text-zinc-400">Account Type</p>

        <h3 className="mt-2 text-xl font-semibold text-white">Verified</h3>
      </div>
    </div>
  );
}
