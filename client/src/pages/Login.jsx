import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { FaLock, FaEnvelope, FaShieldAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import Logo from "../components/Logo";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Admin Login | AS Cleaning Services";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const data = await login(form);
      if (data.role !== "admin") {
        setError("Access restricted. This portal is for administrators only.");
        toast.error("Administrator privileges required.");
        return;
      }
      toast.success(`Welcome back, ${data.name.split(" ")[0]}!`);
      const redirectTo = location.state?.from?.pathname || "/admin";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      if (!err.response) {
        setError(
          err.message?.includes("Network") || err.code === "ERR_NETWORK"
            ? "Server is connecting/waking up. Please wait a few seconds and try again."
            : "Connection error. Please check your network and try again."
        );
      } else {
        setError(err.response?.data?.message || "Invalid email or password.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center py-16 px-4 bg-slate-50">
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-block mb-3">
            <Logo size="large" />
          </div>
          <div className="inline-flex items-center gap-1.5 bg-slate-200/70 text-slate-700 text-xs font-semibold px-3 py-1 rounded-full mt-2">
            <FaShieldAlt className="text-primary text-xs" />
            <span>Administrator Portal</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-3">Admin Sign In</h1>
          <p className="text-xs text-slate-500 mt-1">
            Enter your admin credentials to manage bookings, services, and system settings.
          </p>
        </div>

        <div className="card p-8 shadow-card border border-slate-200/80 bg-white">
          {error && (
            <div className="bg-red-50 text-red-600 text-xs rounded-md px-3.5 py-2.5 mb-5 border border-red-100 flex items-start gap-2">
              <span className="font-bold">•</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="input-label">Admin Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input-field !pl-9"
                  placeholder="admin@example.com"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="input-label">Password</label>
              <div className="relative">
                <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="input-field !pl-9"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full !py-2.5 text-sm mt-3"
            >
              {submitting ? "Signing in..." : "Sign In to Admin Panel"}
            </button>
          </form>
        </div>

        <p className="text-center text-[11px] text-slate-400 mt-6">
          🔒 Authorized AS Cleaning Services staff only.
        </p>
      </div>
    </div>
  );
};

export default Login;
