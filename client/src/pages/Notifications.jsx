import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { bookingApi } from "../services/bookingApi";
import { Spinner, EmptyState } from "../components/UIState";

// Notifications are derived from booking status changes since this is a
// lightweight demo notification center backed by real booking data.
const Notifications = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Notifications | AS Cleaning Services";
    bookingApi
      .getAll()
      .then((res) => setBookings(res.data.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner full />;

  const notifications = bookings.map((b) => ({
    id: b._id,
    title: `Booking ${b.status}`,
    message: `Your ${b.service?.title || "cleaning"} booking for ${new Date(b.bookingDate).toLocaleDateString()} is now marked as "${b.status}".`,
    date: b.updatedAt,
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink mb-6">Notifications</h1>
      <div className="card p-6">
        {notifications.length === 0 ? (
          <EmptyState title="No notifications yet" subtitle="Booking updates will appear here." />
        ) : (
          <div className="divide-y divide-gray-50">
            {notifications.map((n) => (
              <div key={n.id} className="flex items-start gap-4 py-4">
                <span className="w-10 h-10 rounded-full bg-primary-light text-primary flex items-center justify-center shrink-0">
                  <FaBell size={14} />
                </span>
                <div>
                  <p className="font-medium text-sm text-ink">{n.title}</p>
                  <p className="text-sm text-ink/60">{n.message}</p>
                  <p className="text-xs text-ink/40 mt-1">{new Date(n.date).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
