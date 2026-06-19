import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { useDispatch } from "react-redux";
import { profileThunk } from "@/features/auth/authThunk";
import navLinks from "@/constants/navbar";

export default function Navbar() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        await dispatch(profileThunk());
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <header className="sticky top-0 left-0 w-full z-50 px-4 md:px-8 py-6 bg-black">
      <div className="mx-auto w-[90vw] flex items-center justify-between">
        {/* Left Logo */}
        <Link to="/" className="text-white leading-none">
          <h1 className="text-xl md:text-3xl font-semibold tracking-tight">
            Learning
          </h1>
          <p className="text-sm md:text-xl font-light text-white/90">
            Coding School
          </p>
        </Link>

        {/* Desktop Center Nav */}
        <nav className="hidden md:flex items-center gap-2 px-3 py-3 rounded-2xl border border-orange-500/20 bg-black/55 backdrop-blur-2xl shadow-[0_8px_30px_rgba(255,115,0,0.08)]">
          {navLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-[#ff6900] text-white border border-white/10"
                    : "text-zinc-300 hover:text-white hover:bg-white/5"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Right */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <Link
              to="/profile"
              className="w-11 h-11 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white/10 transition"
            >
              <User size={18} />
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-white text-lg font-medium hover:text-orange-400 transition"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white p-2 rounded-xl border border-white/10 bg-white/5"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 mt-4" : "max-h-0"
        }`}
      >
        <div className="rounded-2xl border border-white/10 bg-black/70 backdrop-blur-2xl p-4 space-y-2">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 rounded-xl text-zinc-300 hover:text-white hover:bg-white/5"
            >
              {item.name}
            </Link>
          ))}

          <Link
            to={user ? "/profile" : "/login"}
            onClick={() => setOpen(false)}
            className="block px-4 py-3 rounded-xl text-white bg-orange-500/20 border border-orange-400/20"
          >
            {user ? "Profile" : "Sign In"}
          </Link>
        </div>
      </div>
    </header>
  );
}
