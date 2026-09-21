import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash, FaCheck, FaTimes, FaStar } from "react-icons/fa";
import { testimonialApi } from "../../services/testimonialApi";
import { Spinner, EmptyState } from "../../components/UIState";

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
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
      <h1 className="text-2xl font-bold text-ink mb-6">Manage Testimonials</h1>

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
    </div>
  );
};

export default AdminTestimonials;
