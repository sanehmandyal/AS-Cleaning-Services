import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as FaIcons from "react-icons/fa";
import { FaPlus, FaEdit, FaTrash, FaTimes, FaToggleOn, FaToggleOff } from "react-icons/fa";
import { serviceApi } from "../../services/serviceApi";
import { Spinner, EmptyState } from "../../components/UIState";

const emptyForm = {
  title: "",
  icon: "FaBroom",
  shortDescription: "",
  description: "",
  image: "",
  price: "",
  duration: "",
  featuresText: "",
  includedText: "",
  excludedText: "",
  isActive: true,
};

const iconOptions = [
  "FaBroom", "FaHome", "FaBuilding", "FaSprayCan", "FaTruckMoving", "FaHardHat",
  "FaClipboardList", "FaBath", "FaUtensils", "FaBriefcase", "FaCouch",
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
      icon: s.icon,
      shortDescription: s.shortDescription,
      description: s.description,
      image: s.image,
      price: s.price,
      duration: s.duration,
      featuresText: (s.features || []).join("\n"),
      includedText: (s.included || []).join("\n"),
      excludedText: (s.excluded || []).join("\n"),
      isActive: s.isActive,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const payload = {
      title: form.title,
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
                      <td className="py-3 pr-4">${s.price}</td>
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
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-ink mb-1.5">Title</label>
                  <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-1.5">Icon</label>
                  <select value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="input-field">
                    {iconOptions.map((i) => (
                      <option key={i} value={i}>{i}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-1.5">Price ($)</label>
                  <input required type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-1.5">Duration</label>
                  <input required value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="input-field" placeholder="e.g. 2-3 hours" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">Image URL</label>
                <input required value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="input-field" placeholder="https://..." />
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
