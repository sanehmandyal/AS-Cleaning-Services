import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";
import { bookingApi } from "../services/bookingApi";
import { Spinner, StatusBadge, EmptyState } from "../components/UIState";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelId, setCancelId] = useState(null);
  const [processing, setProcessing] = useState(false);

  const load = () => {
    setLoading(true);
    bookingApi
      .getAll()
      .then((res) => setBookings(res.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    document.title = "My Bookings | AS Cleaning Services";
    load();
  }, []);

  const confirmCancel = async () => {
    setProcessing(true);
    try {
      await bookingApi.update(cancelId, { status: "Cancelled" });
      toast.success("Booking cancelled.");
      setCancelId(null);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not cancel booking.");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <Spinner full />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink mb-6">My Bookings</h1>
      <div className="card p-6">
        {bookings.length === 0 ? (
          <EmptyState title="No bookings found" subtitle="Book a service to see it appear here." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-ink/40 border-b border-gray-100">
                  <th className="py-3 pr-4 font-medium">Booking ID</th>
                  <th className="py-3 pr-4 font-medium">Service</th>
                  <th className="py-3 pr-4 font-medium">Date</th>
                  <th className="py-3 pr-4 font-medium">Time</th>
                  <th className="py-3 pr-4 font-medium">Amount</th>
                  <th className="py-3 pr-4 font-medium">Status</th>
                  <th className="py-3 pr-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id} className="border-b border-gray-50 last:border-0">
                    <td className="py-3 pr-4 font-mono text-xs text-ink/60">{b._id.slice(-8)}</td>
                    <td className="py-3 pr-4">{b.service?.title || "—"}</td>
                    <td className="py-3 pr-4">{new Date(b.bookingDate).toLocaleDateString()}</td>
                    <td className="py-3 pr-4">{b.bookingTime}</td>
                    <td className="py-3 pr-4">${b.totalAmount}</td>
                    <td className="py-3 pr-4"><StatusBadge status={b.status} /></td>
                    <td className="py-3 pr-4">
                      {["Pending", "Confirmed"].includes(b.status) ? (
                        <button
                          onClick={() => setCancelId(b._id)}
                          className="text-red-500 text-xs font-semibold hover:underline"
                        >
                          Cancel
                        </button>
                      ) : (
                        <span className="text-ink/30 text-xs">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {cancelId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-xl2 p-6 max-w-sm w-full relative">
            <button onClick={() => setCancelId(null)} className="absolute top-4 right-4 text-ink/40">
              <FaTimes />
            </button>
            <h3 className="font-display font-semibold text-lg text-ink mb-2">Cancel Booking?</h3>
            <p className="text-sm text-ink/60 mb-6">This action cannot be undone. Are you sure you want to cancel this booking?</p>
            <div className="flex gap-3">
              <button onClick={() => setCancelId(null)} className="btn-secondary flex-1">Keep Booking</button>
              <button
                onClick={confirmCancel}
                disabled={processing}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full px-4 disabled:opacity-60"
              >
                {processing ? "Cancelling..." : "Yes, Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
