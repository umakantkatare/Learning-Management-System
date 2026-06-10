import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Lock, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

import PasswordField from "./PasswordField";
import { changePasswordThunk } from "@/features/auth/authThunk";

const INITIAL_FORM = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function ChangePassword() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(INITIAL_FORM);

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const togglePassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (message.text) {
      setMessage({
        type: "",
        text: "",
      });
    }
  };

  const validateForm = () => {
    const { oldPassword, newPassword, confirmPassword } = formData;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return "Please fill in all fields.";
    }

    if (newPassword !== confirmPassword) {
      return "Passwords do not match.";
    }

    if (newPassword.length < 6) {
      return "Password must be at least 6 characters long.";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage({
      type: "",
      text: "",
    });

    const validationError = validateForm();

    if (validationError) {
      setMessage({
        type: "error",
        text: validationError,
      });
      return;
    }

    setIsLoading(true);

    try {
      await dispatch(
        changePasswordThunk({
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        }),
      ).unwrap();

      setMessage({
        type: "success",
        text: "Password changed successfully!",
      });

      setFormData(INITIAL_FORM);

      setShowPassword({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false,
      });
    } catch (err) {
      setMessage({
        type: "error",
        text: err?.message || "Failed to change password. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength =
    formData.newPassword.length < 6
      ? "Weak"
      : formData.newPassword.length < 10
        ? "Medium"
        : "Strong";

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 dark:bg-zinc-950">
      <div className="mx-auto w-full max-w-lg">
        <Card className="border-border bg-card shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <CardHeader className="space-y-2">
            <CardTitle className="flex items-center gap-2 text-xl text-foreground dark:text-zinc-50">
              <Lock className="h-5 w-5 text-primary" />
              Change Password
            </CardTitle>

            <CardDescription className="text-muted-foreground dark:text-zinc-400">
              Update your password to keep your account secure.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-5">
              {message.text && (
                <div
                  className={`flex items-center gap-2 rounded-md border p-3 text-sm ${
                    message.type === "error"
                      ? "border-destructive/20 bg-destructive/10 text-destructive dark:border-red-900/50 dark:bg-red-950/50 dark:text-red-400"
                      : "border-primary/20 bg-primary/10 text-primary dark:border-emerald-900/50 dark:bg-emerald-950/50 dark:text-emerald-400"
                  }`}
                >
                  {message.type === "error" ? (
                    <AlertCircle className="h-4 w-4 shrink-0" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                  )}

                  <span>{message.text}</span>
                </div>
              )}

              <PasswordField
                id="oldPassword"
                label="Current Password"
                value={formData.oldPassword}
                onChange={handleChange}
                show={showPassword.oldPassword}
                onToggle={() => togglePassword("oldPassword")}
                placeholder="Enter current password"
              />

              <div>
                <PasswordField
                  id="newPassword"
                  label="New Password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  show={showPassword.newPassword}
                  onToggle={() => togglePassword("newPassword")}
                  placeholder="Enter new password"
                />

                {formData.newPassword && (
                  <p className="mt-2 text-xs text-muted-foreground dark:text-zinc-400">
                    Password Strength:
                    <span
                      className={`ml-1 font-medium ${
                        passwordStrength === "Weak"
                          ? "text-destructive dark:text-red-400"
                          : "text-primary dark:text-emerald-400"
                      }`}
                    >
                      {passwordStrength}
                    </span>
                  </p>
                )}
              </div>

              <PasswordField
                id="confirmPassword"
                label="Confirm New Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                show={showPassword.confirmPassword}
                onToggle={() => togglePassword("confirmPassword")}
                placeholder="Re-enter new password"
              />
            </CardContent>

            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating Password...
                  </>
                ) : (
                  "Update Password"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
