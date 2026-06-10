import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  updateProfileThunk,
  updateAvatarThunk,
  deleteAccountThunk,
} from "@/features/user/userThunk";

import { profileThunk, logoutThunk } from "@/features/auth/authThunk";

import ProfileHeader from "@/components/dashboard/profile/ProfileHeader";
import ProfileAvatar from "@/components/dashboard/profile/ProfileAvatar";
import ProfileForm from "@/components/dashboard/profile/ProfileForm";
import AccountActions from "@/components/dashboard/profile/AccountActions";
import DashboardLayout from "@/layouts/DashboardLayout";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.user);

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        bio: user.bio || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    const result = await dispatch(updateProfileThunk(formData));

    if (updateProfileThunk.fulfilled.match(result)) {
      await dispatch(profileThunk());

      toast.success("Profile updated successfully");

      setIsEditing(false);
    } else {
      toast.error(result.payload || "Failed to update profile");
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const avatarData = new FormData();

    avatarData.append("avatar", file);

    const result = await dispatch(updateAvatarThunk(avatarData));

    if (updateAvatarThunk.fulfilled.match(result)) {
      await dispatch(profileThunk());

      toast.success("Avatar updated successfully");
    } else {
      toast.error(result.payload || "Failed to update avatar");
    }
  };

  const handleDeleteAccount = async () => {
    const result = await dispatch(deleteAccountThunk());

    if (deleteAccountThunk.fulfilled.match(result)) {
      toast.success("Account deleted successfully");

      await dispatch(logoutThunk());

      navigate("/login", {
        replace: true,
      });
    } else {
      toast.error(result.payload || "Failed to delete account");
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl space-y-6 p-5">
        <ProfileHeader isEditing={isEditing} setIsEditing={setIsEditing} />

        <ProfileAvatar user={user} handleAvatarChange={handleAvatarChange} />

        <ProfileForm
          user={user}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleProfileUpdate}
          loading={loading}
          isEditing={isEditing}
        />

        <AccountActions
          onChangePassword={() => navigate("/change-password")}
          onDeleteAccount={handleDeleteAccount}
        />
      </div>
    </DashboardLayout>
  );
}
