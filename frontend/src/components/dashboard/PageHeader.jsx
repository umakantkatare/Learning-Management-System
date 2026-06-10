import { Lock, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { changePasswordThunk } from "@/features/auth/authThunk";
import { useNavigate } from "react-router-dom";

export default function PageHeader() {
  const navigate = useNavigate()
   function changePassword() {
    console.log("Change password button clicked!"); // Check karein ye console me aa raha hai ya nahi
    try {
      navigate(`/change-password`)
    } catch (error) {
      console.error("Error in thunk:", error);
    }
  }

  function handleEditProfile() {
    console.log("Edit profile button clicked!");
    // Yahan apni logic dalein, jaise modal open karna
  }

  // async function changePassword() {
  //   await dispatch(changePasswordThunk());
  // }
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold">Personal Information</h1>

        <p className="text-zinc-400 text-sm">
          Update your personal details and manage account visibility
        </p>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={() => handleEditProfile()}
          className="bg-orange-600 hover:bg-orange-700 cursor-pointer"
        >
          <Pencil className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>

        <Button
          onClick={() => changePassword()}
          // variant="ghost"
          className="bg-orange-600 hover:bg-orange-700 cursor-pointer"
        >
          <Lock />
          Change Password
        </Button>
      </div>
    </div>
  );
}
