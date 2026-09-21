import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaClipboardList, FaHourglassHalf, FaCheckCircle, FaTimesCircle, FaPlus } from "react-icons/fa";
import { bookingApi } from "../services/bookingApi";
import { Spinner, StatusBadge, EmptyState } from "../components/UIState";

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="card p-6 flex items-center gap-4">
    <span className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg ${color}`}>
      <Icon />
    </span>
    <div>
      <p className="text-2xl font-bold text-ink">{value}</p>
      <p className="text-sm text-ink/50">{label}</p>
    </div>
  </div>
);

const CustomerDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "My Dashboard | AS Cleaning Services";
    bookingApi
      .getAll()
      .then((res) => setBookings(res.data.data))
      .finally(() => setLoading(false));
  }, []);

  const counts = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "Pending").length,
    completed: bookings.filter((b) => b.status === "Completed").length,
    cancelled: bookings.filter((b) => b.status === "Cancelled").length,
  };

  if (loading) return <Spinner full />;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-ink">Dashboard</h1>
        <Link to="/booking" className="btn-primary !py-2.5 !px-5 text-sm">
          <FaPlus size={12} /> Book a Service
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <StatCard icon={FaClipboardList} label="Total Bookings" value={counts.total} color="bg-primary-light text-primary" />
        <StatCard icon={FaHourglassHalf} label="Pending" value={counts.pending} color="bg-amber-50 text-amber-500" />
        <StatCard icon={FaCheckCircle} label="Completed" value={counts.completed} color="bg-green-50 text-success" />
        <StatCard icon={FaTimesCircle} label="Cancelled" value={counts.cancelled} color="bg-red-50 text-red-500" />
      </div>

      <div className="card p-6">
        <h2 className="font-display font-semibold text-lg text-ink mb-5">Recent Bookings</h2>
        {bookings.length === 0 ? (
          <EmptyState title="No bookings yet" subtitle="Book your first cleaning service to get started." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-ink/40 border-b border-gray-100">
                  <th className="py-3 pr-4 font-medium">Booking ID</th>
                  <th className="py-3 pr-4 font-medium">Service</th>
                  <th className="py-3 pr-4 font-medium">Date</th>
                  <th className="py-3 pr-4 font-medium">Time</th>
                  <th className="py-3 pr-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.slice(0, 5).map((b) => (
                  <tr key={b._id} className="border-b border-gray-50 last:border-0">
                    <td className="py-3 pr-4 font-mono text-xs text-ink/60">{b._id.slice(-8)}</td>
                    <td className="py-3 pr-4">{b.service?.title || "—"}</td>
                    <td className="py-3 pr-4">{new Date(b.bookingDate).toLocaleDateString()}</td>
                    <td className="py-3 pr-4">{b.bookingTime}</td>
                    <td className="py-3 pr-4"><StatusBadge status={b.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
