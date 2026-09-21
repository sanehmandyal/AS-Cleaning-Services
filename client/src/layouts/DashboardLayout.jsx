import React, { useState } from "react";
import { NavLink, Outlet, useNavigate, Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaClipboardList,
  FaPlusCircle,
  FaUser,
  FaBell,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import Logo from "../components/Logo";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: FaTachometerAlt, end: true },
  { to: "/dashboard/bookings", label: "My Bookings", icon: FaClipboardList },
  { to: "/booking", label: "Book a Service", icon: FaPlusCircle },
  { to: "/dashboard/profile", label: "Profile", icon: FaUser },
  { to: "/dashboard/notifications", label: "Notifications", icon: FaBell },
];

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white border-r border-slate-100">
      <div className="p-5 border-b border-slate-100">
        <Logo size="small" />
      </div>
      <nav className="flex-1 px-3 py-6 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                isActive
                  ? "bg-sky-50 text-primary font-semibold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`
            }
          >
            <link.icon size={15} />
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium text-red-600 hover:bg-red-50 w-full transition-colors"
        >
          <FaSignOutAlt size={15} /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="hidden lg:flex w-64 shrink-0 fixed h-full z-30">
        <SidebarContent />
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-64 bg-white">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-4 text-slate-400 hover:text-slate-700"
              aria-label="Close sidebar"
            >
              <FaTimes />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-20">
          <button
            className="lg:hidden text-xl text-slate-700 hover:text-primary"
            onClick={() => setOpen(true)}
            aria-label="Open sidebar"
          >
            <FaBars />
          </button>
          <div className="hidden lg:block">
            <p className="text-xs text-slate-400">Welcome back,</p>
            <p className="font-bold text-slate-800 text-sm">{user?.name}</p>
          </div>
          <span className="w-8 h-8 rounded-full bg-sky-50 text-primary text-xs font-bold flex items-center justify-center border border-sky-100">
            {user?.name?.[0] || "U"}
          </span>
        </header>
        <main className="flex-1 p-4 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
