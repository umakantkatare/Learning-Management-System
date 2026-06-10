import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Lock, Trash2 } from "lucide-react";

export default function AccountActions({ onChangePassword, onDeleteAccount }) {
  return (
    <div className="rounded-2xl border border-red-500/20 bg-zinc-900 p-6">
      <h2 className="text-xl font-semibold text-white">Account Actions</h2>

      <p className="mt-2 text-zinc-400">
        Manage your password and account settings.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button variant="ghost" onClick={onChangePassword}>
          <Lock className="mr-2 h-4 w-4" />
          Change Password
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Account
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent className="border-zinc-800 bg-zinc-950">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Account?</AlertDialogTitle>

              <AlertDialogDescription>
                This action cannot be undone. Your profile, enrolled courses,
                and account data will be permanently deleted.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button variant="outline">Cancel</Button>
              </AlertDialogCancel>

              <AlertDialogAction asChild>
                <Button variant="destructive" onClick={onDeleteAccount}>
                  Delete Account
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
