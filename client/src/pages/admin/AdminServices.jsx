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
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
              <div>
                <h3 className="font-display font-semibold text-lg text-ink">
                  {editingId ? "Edit Service" : "Add New Service"}
                </h3>
                <p className="text-xs text-slate-500">
                  Update service details, pricing, features, and cover photo.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                aria-label="Close"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Service Title *
                  </label>
                  <input
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="input-field"
                    placeholder="e.g. Glass Cleaning & Window Washing"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Category *
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="input-field"
                  >
                    <option value="popular">Popular Services</option>
                    <option value="home">Home & Villa</option>
                    <option value="specialized">Specialized Cleaning</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Price, Duration & Icon (Equal 3-column grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Starting Price (₹) *
                  </label>
                  <input
                    required
                    type="number"
                    min="0"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="input-field"
                    placeholder="0 for Custom Quote"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">0 = Free Consultation</span>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Duration *
                  </label>
                  <input
                    required
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    className="input-field"
                    placeholder="e.g. 1-2 hours"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">Est. job completion time</span>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Icon
                  </label>
                  <select
                    value={form.icon}
                    onChange={(e) => setForm({ ...form, icon: e.target.value })}
                    className="input-field"
                  >
                    {iconOptions.map((i) => (
                      <option key={i} value={i}>
                        {i.replace(/^Fa/, "")}
                      </option>
                    ))}
                  </select>
                  <span className="text-[11px] text-slate-400 mt-1 block">Display badge icon</span>
                </div>
              </div>

              {/* Image Section: Device Upload + URL + Quick Presets */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Service Cover Image *
                </label>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  {/* Thumbnail Preview */}
                  <div className="w-20 h-20 rounded-xl bg-white border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center shadow-sm">
                    {form.image ? (
                      <img
                        src={form.image}
                        alt="Service preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/images/services/deep-cleaning.jpg";
                        }}
                      />
                    ) : (
                      <span className="text-xs text-slate-400">No Image</span>
                    )}
                  </div>

                  <div className="flex-1 w-full space-y-2">
                    {/* Device Upload Button */}
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-medium shadow-sm transition-all">
                        <FaIcons.FaCloudUploadAlt size={16} />
                        <span>Upload from Device</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            if (file.size > 5 * 1024 * 1024) {
                              toast.error("Please choose an image under 5MB");
                              return;
                            }
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              setForm({ ...form, image: event.target.result });
                              toast.success("Image loaded from device!");
                            };
                            reader.readAsDataURL(file);
                          }}
                        />
                      </label>
                      <span className="text-xs text-slate-400">or enter path / URL below</span>
                    </div>

                    {/* Image URL Input */}
                    <input
                      required
                      value={form.image}
                      onChange={(e) => setForm({ ...form, image: e.target.value })}
                      className="input-field bg-white text-xs"
                      placeholder="/images/services/... or https://..."
                    />
                  </div>
                </div>

                {/* Quick Presets */}
                <div className="pt-2 border-t border-slate-200/60">
                  <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                    Or select a built-in photo preset:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
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
                        className={`text-[11px] font-medium border px-2.5 py-1 rounded-lg transition-all ${
                          form.image === preset.path
                            ? "bg-primary text-white border-primary shadow-sm"
                            : "bg-white hover:bg-sky-50 text-slate-700 border-slate-200"
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Descriptions */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Short Summary *
                </label>
                <input
                  required
                  value={form.shortDescription}
                  onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                  className="input-field"
                  placeholder="1-2 sentences summarizing the service on service cards & search previews"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Details & Scope *
                </label>
                <textarea
                  required
                  rows="3"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="input-field resize-none"
                  placeholder="Detailed explanation of the process, equipment, and cleaning standards used..."
                />
              </div>

              {/* Key Features (Single clean textarea) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Key Features & Highlights
                  </label>
                  <span className="text-[11px] text-slate-400">One feature per line</span>
                </div>
                <textarea
                  rows="3"
                  value={form.featuresText}
                  onChange={(e) => setForm({ ...form, featuresText: e.target.value })}
                  className="input-field resize-none text-xs"
                  placeholder="High-pressure mechanized equipment&#10;Eco-friendly & non-toxic chemicals&#10;Verified & trained technicians&#10;100% satisfaction guarantee"
                />
              </div>

              {/* Visibility Status */}
              <div className="pt-2">
                <label className="inline-flex items-center gap-2 text-sm text-slate-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                    className="w-4 h-4 rounded text-primary focus:ring-primary border-slate-300"
                  />
                  <span className="font-medium">Active (visible to customers on website & navigation)</span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full py-3 text-sm font-semibold disabled:opacity-60"
                >
                  {submitting ? "Saving Service..." : editingId ? "Update Service" : "Create Service"}
                </button>
              </div>
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
