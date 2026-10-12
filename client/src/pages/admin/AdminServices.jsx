import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as FaIcons from "react-icons/fa";
import { FaPlus, FaEdit, FaTrash, FaTimes, FaToggleOn, FaToggleOff } from "react-icons/fa";
import { serviceApi } from "../../services/serviceApi";
import { Spinner, EmptyState } from "../../components/UIState";

const emptyForm = {
  title: "",
  category: "popular",
  icon: "FaBroom",
  shortDescription: "",
  description: "",
  image: "/images/services/deep-cleaning.jpg",
  price: 0,
  duration: "1-2 hours",
  featuresText: "",
  includedText: "",
  excludedText: "",
  isActive: true,
};

const iconOptions = [
  "FaBroom", "FaWater", "FaHome", "FaBath", "FaUtensils", "FaCouch",
  "FaBuilding", "FaSprayCan", "FaShieldAlt", "FaPumpSoap", "FaGem", "FaClipboardList"
];

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const load = () => {
    setLoading(true);
    serviceApi
      .getAll({ all: true })
      .then((res) => setServices(res.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    document.title = "Manage Services | Admin | AS Cleaning Services";
    load();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (s) => {
    setEditingId(s._id);
    setForm({
      title: s.title,
      category: s.category || "popular",
      icon: s.icon || "FaBroom",
      shortDescription: s.shortDescription || "",
      description: s.description || "",
      image: s.image || "",
      price: s.price || 0,
      duration: s.duration || "1-2 hours",
      featuresText: (s.features || []).join("\n"),
      includedText: (s.included || []).join("\n"),
      excludedText: (s.excluded || []).join("\n"),
      isActive: s.isActive !== false,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const payload = {
      title: form.title,
      category: form.category,
      icon: form.icon,
      shortDescription: form.shortDescription,
      description: form.description,
      image: form.image,
      price: Number(form.price),
      duration: form.duration,
      features: form.featuresText.split("\n").map((f) => f.trim()).filter(Boolean),
      included: form.includedText.split("\n").map((f) => f.trim()).filter(Boolean),
      excluded: form.excludedText.split("\n").map((f) => f.trim()).filter(Boolean),
      isActive: form.isActive,
    };
    try {
      if (editingId) {
        await serviceApi.update(editingId, payload);
        toast.success("Service updated.");
      } else {
        await serviceApi.create(payload);
        toast.success("Service created.");
      }
      setModalOpen(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save service.");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleActive = async (s) => {
    try {
      await serviceApi.update(s._id, { isActive: !s.isActive });
      toast.success(`Service ${!s.isActive ? "enabled" : "disabled"}.`);
      load();
    } catch (err) {
      toast.error("Failed to update service.");
    }
  };

  const confirmDelete = async () => {
    setSubmitting(true);
    try {
      await serviceApi.remove(deleteId);
      toast.success("Service deleted.");
      setDeleteId(null);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete service.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-ink">Manage Services</h1>
        <button onClick={openCreate} className="btn-primary !py-2.5 !px-5 text-sm">
          <FaPlus size={12} /> Add Service
        </button>
      </div>

      <div className="card p-6">
        {loading ? (
          <Spinner />
        ) : services.length === 0 ? (
          <EmptyState title="No services yet" subtitle="Add your first service to get started." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-ink/40 border-b border-gray-100">
                  <th className="py-3 pr-4 font-medium">Service</th>
                  <th className="py-3 pr-4 font-medium">Price</th>
                  <th className="py-3 pr-4 font-medium">Duration</th>
                  <th className="py-3 pr-4 font-medium">Status</th>
                  <th className="py-3 pr-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s) => {
                  const Icon = FaIcons[s.icon] || FaIcons.FaBroom;
                  return (
                    <tr key={s._id} className="border-b border-gray-50 last:border-0">
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-3">
                          <span className="w-9 h-9 rounded-lg bg-primary-light text-primary flex items-center justify-center shrink-0">
                            <Icon size={14} />
                          </span>
                          <span className="font-medium text-ink">{s.title}</span>
                        </div>
                      </td>
                      <td className="py-3 pr-4 font-semibold text-slate-900">
                        {s.price > 0 ? `₹${s.price}` : "Custom Quote"}
                      </td>
                      <td className="py-3 pr-4">{s.duration}</td>
                      <td className="py-3 pr-4">
                        <button onClick={() => toggleActive(s)} className="flex items-center gap-1.5 text-xs font-semibold">
                          {s.isActive ? (
                            <span className="flex items-center gap-1.5 text-success"><FaToggleOn size={18} /> Active</span>
                          ) : (
                            <span className="flex items-center gap-1.5 text-ink/40"><FaToggleOff size={18} /> Disabled</span>
                          )}
                        </button>
                      </td>
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-3">
                          <button onClick={() => openEdit(s)} className="text-primary hover:text-primary-dark" aria-label="Edit service">
                            <FaEdit />
                          </button>
                          <button onClick={() => setDeleteId(s._id)} className="text-red-400 hover:text-red-600" aria-label="Delete service">
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8">
          <div className="bg-white rounded-xl2 p-6 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-ink/40">
              <FaTimes />
            </button>
            <h3 className="font-display font-semibold text-lg text-ink mb-5">
              {editingId ? "Edit Service" : "Add New Service"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-ink mb-1.5">Service Title *</label>
                  <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input-field" placeholder="e.g. Glass Cleaning & Window Washing" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-1.5">Category *</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-field">
                    <option value="popular">Popular Services</option>
                    <option value="home">Home & Villa</option>
                    <option value="specialized">Specialized Cleaning</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-ink mb-1.5">Icon</label>
                  <select value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="input-field">
                    {iconOptions.map((i) => (
                      <option key={i} value={i}>{i}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-1.5">Starting Price (₹)</label>
                  <input required type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="input-field" placeholder="0 for Free Quote" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-1.5">Duration</label>
                  <input required value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="input-field" placeholder="e.g. 1-2 hours" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">Image URL or Local Preset *</label>
                <input required value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="input-field" placeholder="/images/services/... or https://..." />
                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                  <span className="text-[11px] font-semibold text-slate-400 mr-1">1-Click Presets:</span>
                  {[
                    { label: "Deep Clean", path: "/images/services/deep-cleaning.jpg" },
                    { label: "Water Tank", path: "/images/services/water-tank-cleaning.jpg" },
                    { label: "Home", path: "/images/services/home-cleaning.jpg" },
                    { label: "Bathroom", path: "/images/services/bathroom-cleaning.jpg" },
                    { label: "Kitchen", path: "/images/services/kitchen-cleaning.jpg" },
                    { label: "Sofa", path: "/images/services/sofa-cleaning.jpg" },
                    { label: "Floor", path: "/images/services/floor-cleaning.jpg" },
                    { label: "Property", path: "/images/services/property-cleaning.jpg" },
                  ].map((preset) => (
                    <button
                      key={preset.path}
                      type="button"
                      onClick={() => setForm({ ...form, image: preset.path })}
                      className={`text-[10px] font-medium border px-2 py-0.5 rounded transition-all ${
                        form.image === preset.path
                          ? "bg-primary text-white border-primary"
                          : "bg-slate-50 hover:bg-sky-50 text-slate-700 border-slate-200"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">Short Description</label>
                <input required value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">Full Description</label>
                <textarea required rows="3" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field resize-none" />
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-ink mb-1.5">Features (one per line)</label>
                  <textarea rows="4" value={form.featuresText} onChange={(e) => setForm({ ...form, featuresText: e.target.value })} className="input-field resize-none text-xs" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-1.5">Included (one per line)</label>
                  <textarea rows="4" value={form.includedText} onChange={(e) => setForm({ ...form, includedText: e.target.value })} className="input-field resize-none text-xs" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-1.5">Excluded (one per line)</label>
                  <textarea rows="4" value={form.excludedText} onChange={(e) => setForm({ ...form, excludedText: e.target.value })} className="input-field resize-none text-xs" />
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm text-ink/70">
                <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
                Active (visible to customers)
              </label>
              <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
                {submitting ? "Saving..." : editingId ? "Update Service" : "Create Service"}
              </button>
            </form>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-xl2 p-6 max-w-sm w-full">
            <h3 className="font-display font-semibold text-lg text-ink mb-2">Delete Service?</h3>
            <p className="text-sm text-ink/60 mb-6">This will permanently remove the service listing.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="btn-secondary flex-1">Cancel</button>
              <button
                onClick={confirmDelete}
                disabled={submitting}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full px-4 disabled:opacity-60"
              >
                {submitting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;
