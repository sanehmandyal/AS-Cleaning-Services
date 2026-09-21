import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaSave } from "react-icons/fa";
import { authApi } from "../../services/authApi";
import { useAuth } from "../../context/AuthContext";

const AdminSettings = () => {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({ name: "", phone: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Settings | Admin | AS Cleaning Services";
    if (user) setForm({ name: user.name || "", phone: user.phone || "", password: "" });
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await authApi.updateProfile(form);
      updateUser(res.data.data);
      toast.success("Account settings updated.");
      setForm((f) => ({ ...f, password: "" }));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update settings.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink mb-6">Settings</h1>
      <div className="card p-8 max-w-xl">
        <h2 className="font-display font-semibold text-lg text-ink mb-5">Admin Account</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Full Name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Email</label>
            <input value={user?.email || ""} disabled className="input-field bg-gray-50 text-ink/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Phone</label>
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">New Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="input-field"
              placeholder="Leave blank to keep current password"
            />
          </div>
          <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-60">
            <FaSave /> {submitting ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;
