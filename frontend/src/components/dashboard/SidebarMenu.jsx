import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { menuByRole } from "@/constants/studentMenu ";
import { useDispatch } from "react-redux";
import { logoutThunk } from "@/features/auth/authThunk";
import useAuth from "@/hooks/useAuth";
import { NavLink, useNavigate } from "react-router-dom";

export default function SidebarMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  async function onLogout() {
    await dispatch(logoutThunk());
    navigate('/')

  }

  const { user } = useAuth();

  const userRole = user?.role;
  const menu = menuByRole[userRole] || [];

  return (
    <>
      <nav className="space-y-2 flex-1">
        {menu.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition ${
                  isActive
                    ? "bg-orange-600 text-white"
                    : "text-zinc-400 hover:bg-zinc-900"
                }`
              }
            >
              <Icon className="w-4 h-4" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      <Button
        onClick={onLogout}
        variant="ghost"
        className="justify-start text-zinc-400 hover:text-red-400 mt-4"
      >
        <LogOut className="mr-2 w-4 h-4" />
        Logout
      </Button>
    </>
  );
}
