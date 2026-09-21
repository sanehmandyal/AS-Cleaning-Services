import React, { useState } from "react";
import { NavLink, Outlet, useNavigate, Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCalendarCheck,
  FaBroom,
  FaUsers,
  FaStar,
  FaBlog,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import Logo from "../components/Logo";

const links = [
  { to: "/admin", label: "Dashboard", icon: FaTachometerAlt, end: true },
  { to: "/admin/bookings", label: "Bookings", icon: FaCalendarCheck },
  { to: "/admin/services", label: "Services", icon: FaBroom },
  { to: "/admin/customers", label: "Customers", icon: FaUsers },
  { to: "/admin/testimonials", label: "Testimonials", icon: FaStar },
  { to: "/admin/blog", label: "Blog", icon: FaBlog },
  { to: "/admin/messages", label: "Messages", icon: FaEnvelope },
  { to: "/admin/settings", label: "Settings", icon: FaCog },
];

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-slate-900 text-white">
      <div className="p-5 border-b border-slate-800">
        <Logo variant="light" size="small" />
      </div>
      <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-white font-semibold"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <link.icon size={15} />
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium text-slate-300 hover:bg-red-950/40 hover:text-red-400 w-full transition-colors"
        >
          <FaSignOutAlt size={15} /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 fixed h-full z-30">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-64 bg-slate-900">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-4 text-slate-400 hover:text-white"
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
          <div className="hidden lg:block text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Admin Management Console
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-800 leading-tight">
                {user?.name || "Admin"}
              </p>
              <p className="text-[10px] text-slate-400">Administrator</p>
            </div>
            <span className="w-8 h-8 rounded-full bg-sky-50 text-primary text-xs font-bold flex items-center justify-center border border-sky-100">
              {user?.name?.[0] || "A"}
            </span>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
