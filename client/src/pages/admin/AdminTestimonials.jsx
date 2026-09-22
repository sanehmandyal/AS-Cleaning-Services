import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash, FaCheck, FaTimes, FaStar, FaPlus } from "react-icons/fa";
import { testimonialApi } from "../../services/testimonialApi";
import { Spinner, EmptyState } from "../../components/UIState";

const emptyTestimonial = {
  name: "",
  role: "",
  rating: 5,
  message: "",
  isApproved: true,
};

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyTestimonial);
  const [processing, setProcessing] = useState(false);

  const load = () => {
    setLoading(true);
    testimonialApi
      .getAll({ all: true })
      .then((res) => setTestimonials(res.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    document.title = "Manage Testimonials | Admin | AS Cleaning Services";
    load();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      toast.error("Please enter customer name and review text.");
      return;
    }
    setProcessing(true);
    try {
      await testimonialApi.create(form);
      toast.success("Testimonial created successfully.");
      setModalOpen(false);
      setForm(emptyTestimonial);
      load();
    } catch (err) {
      toast.error("Failed to create testimonial.");
    } finally {
      setProcessing(false);
    }
  };

  const toggleApproval = async (t) => {
    try {
      await testimonialApi.update(t._id, { isApproved: !t.isApproved });
      toast.success(!t.isApproved ? "Testimonial approved." : "Testimonial unapproved.");
      load();
    } catch (err) {
      toast.error("Failed to update testimonial.");
    }
  };

  const confirmDelete = async () => {
    setProcessing(true);
    try {
      await testimonialApi.remove(deleteId);
      toast.success("Testimonial deleted.");
      setDeleteId(null);
      load();
    } catch (err) {
      toast.error("Failed to delete testimonial.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-ink">Manage Testimonials</h1>
        <button
          onClick={() => {
            setForm(emptyTestimonial);
            setModalOpen(true);
          }}
          className="btn-primary !py-2.5 !px-5 text-sm flex items-center gap-2"
        >
          <FaPlus size={12} /> Add Testimonial
        </button>
      </div>

      <div className="card p-6">
        {loading ? (
          <Spinner />
        ) : testimonials.length === 0 ? (
          <EmptyState title="No testimonials yet" />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div key={t._id} className="border border-gray-100 rounded-xl2 p-5 relative">
                <div className="flex text-yellow-400 mb-2 gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar key={i} size={12} className={i < t.rating ? "" : "text-gray-200"} />
                  ))}
                </div>
                <p className="text-sm text-ink/70 mb-3 line-clamp-4">"{t.message}"</p>
                <p className="font-semibold text-sm text-ink">{t.name}</p>
                <p className="text-xs text-ink/40 mb-4">{t.role}</p>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => toggleApproval(t)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 ${
                      t.isApproved ? "bg-green-50 text-success" : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    <FaCheck size={10} /> {t.isApproved ? "Approved" : "Pending"}
                  </button>
                  <button onClick={() => setDeleteId(t._id)} className="text-red-400 hover:text-red-600" aria-label="Delete testimonial">
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-xl2 p-6 max-w-sm w-full relative">
            <button onClick={() => setDeleteId(null)} className="absolute top-4 right-4 text-ink/40">
              <FaTimes />
            </button>
            <h3 className="font-display font-semibold text-lg text-ink mb-2">Delete Testimonial?</h3>
            <p className="text-sm text-ink/60 mb-6">This will permanently remove this testimonial.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="btn-secondary flex-1">Cancel</button>
              <button
                onClick={confirmDelete}
                disabled={processing}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full px-4 disabled:opacity-60"
              >
                {processing ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full relative shadow-xl">
            <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <FaTimes />
            </button>
            <h3 className="text-lg font-bold text-slate-900 mb-4">Add Customer Testimonial</h3>
            <form onSubmit={handleCreate} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Customer Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Ramesh Sharma"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Service / Role Title</label>
                <input
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  placeholder="e.g. Water Tank Cleaning Client"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Rating</label>
                <select
                  value={form.rating}
                  onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                  className="input-field"
                >
                  <option value={5}>5 Stars ★★★★★</option>
                  <option value={4}>4 Stars ★★★★☆</option>
                  <option value={3}>3 Stars ★★★☆☆</option>
                  <option value={2}>2 Stars ★★☆☆☆</option>
                  <option value={1}>1 Star ★☆☆☆☆</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Testimonial Review</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Write the customer review message..."
                  className="input-field"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isApproved"
                  checked={form.isApproved}
                  onChange={(e) => setForm({ ...form, isApproved: e.target.checked })}
                  className="rounded text-primary focus:ring-primary h-4 w-4"
                />
                <label htmlFor="isApproved" className="text-xs font-semibold text-slate-700">
                  Approve immediately for live public display
                </label>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn-secondary flex-1 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="btn-primary flex-1 text-xs disabled:opacity-60"
                >
                  {processing ? "Saving..." : "Save Testimonial"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTestimonials;
