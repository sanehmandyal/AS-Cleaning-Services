import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaSearch, FaTimes, FaEye, FaTrash } from "react-icons/fa";
import { bookingApi } from "../../services/bookingApi";
import { serviceApi } from "../../services/serviceApi";
import { Spinner, StatusBadge, EmptyState } from "../../components/UIState";

const statusOptions = ["Pending", "Confirmed", "In Progress", "Completed", "Cancelled"];

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: "", status: "", service: "", date: "" });
  const [selected, setSelected] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [processing, setProcessing] = useState(false);

  const load = () => {
    setLoading(true);
    const params = {};
    if (filters.search) params.search = filters.search;
    if (filters.status) params.status = filters.status;
    if (filters.service) params.service = filters.service;
    if (filters.date) params.date = filters.date;
    bookingApi
      .getAll(params)
      .then((res) => setBookings(res.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    document.title = "Manage Bookings | Admin | AS Cleaning Services";
    serviceApi.getAll({ all: true }).then((res) => setServices(res.data.data));
  }, []);

  useEffect(() => {
    const t = setTimeout(load, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handleStatusChange = async (id, status) => {
    setProcessing(true);
    try {
      await bookingApi.update(id, { status });
      toast.success(`Booking marked as ${status}`);
      load();
      setSelected((s) => (s && s._id === id ? { ...s, status } : s));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update booking.");
    } finally {
      setProcessing(false);
    }
  };

  const confirmDelete = async () => {
    setProcessing(true);
    try {
      await bookingApi.remove(deleteId);
      toast.success("Booking deleted.");
      setDeleteId(null);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete booking.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink mb-6">Manage Bookings</h1>

      <div className="card p-5 mb-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/30" size={13} />
          <input
            placeholder="Search name or email..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="input-field pl-10"
          />
        </div>
        <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })} className="input-field">
          <option value="">All Statuses</option>
          {statusOptions.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select value={filters.service} onChange={(e) => setFilters({ ...filters, service: e.target.value })} className="input-field">
          <option value="">All Services</option>
          {services.map((s) => (
            <option key={s._id} value={s._id}>{s.title}</option>
          ))}
        </select>
        <input type="date" value={filters.date} onChange={(e) => setFilters({ ...filters, date: e.target.value })} className="input-field" />
      </div>

      <div className="card p-6">
        {loading ? (
          <Spinner />
        ) : bookings.length === 0 ? (
          <EmptyState title="No bookings found" subtitle="Try adjusting your filters." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-ink/40 border-b border-gray-100">
                  <th className="py-3 pr-4 font-medium">Customer</th>
                  <th className="py-3 pr-4 font-medium">Service</th>
                  <th className="py-3 pr-4 font-medium">Date</th>
                  <th className="py-3 pr-4 font-medium">Amount</th>
                  <th className="py-3 pr-4 font-medium">Status</th>
                  <th className="py-3 pr-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id} className="border-b border-gray-50 last:border-0">
                    <td className="py-3 pr-4">
                      <p className="font-medium text-ink">{b.customerName}</p>
                      <p className="text-xs text-ink/40">{b.email}</p>
                    </td>
                    <td className="py-3 pr-4">{b.service?.title || "—"}</td>
                    <td className="py-3 pr-4">{new Date(b.bookingDate).toLocaleDateString()} · {b.bookingTime}</td>
                    <td className="py-3 pr-4">${b.totalAmount}</td>
                    <td className="py-3 pr-4"><StatusBadge status={b.status} /></td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3">
                        <button onClick={() => setSelected(b)} className="text-primary hover:text-primary-dark" aria-label="View booking">
                          <FaEye />
                        </button>
                        <button onClick={() => setDeleteId(b._id)} className="text-red-400 hover:text-red-600" aria-label="Delete booking">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail / status update modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-xl2 p-6 max-w-lg w-full relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-ink/40">
              <FaTimes />
            </button>
            <h3 className="font-display font-semibold text-lg text-ink mb-4">Booking Details</h3>
            <div className="space-y-2 text-sm mb-6">
              <p><span className="text-ink/50">Booking ID:</span> <span className="font-mono">{selected._id}</span></p>
              <p><span className="text-ink/50">Customer:</span> {selected.customerName}</p>
              <p><span className="text-ink/50">Email:</span> {selected.email}</p>
              <p><span className="text-ink/50">Phone:</span> {selected.phone}</p>
              <p><span className="text-ink/50">Service:</span> {selected.service?.title || "—"}</p>
              <p><span className="text-ink/50">Property Type:</span> {selected.propertyType}</p>
              <p><span className="text-ink/50">Address:</span> {selected.address}</p>
              <p><span className="text-ink/50">Date:</span> {new Date(selected.bookingDate).toLocaleDateString()}</p>
              <p><span className="text-ink/50">Time:</span> {selected.bookingTime}</p>
              <p><span className="text-ink/50">Rooms:</span> {selected.rooms}</p>
              <p><span className="text-ink/50">Amount:</span> ${selected.totalAmount}</p>
              {selected.notes && <p><span className="text-ink/50">Notes:</span> {selected.notes}</p>}
              <p><span className="text-ink/50">Status:</span> <StatusBadge status={selected.status} /></p>
            </div>
            <p className="text-sm font-medium text-ink mb-2">Update Status</p>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((s) => (
                <button
                  key={s}
                  disabled={processing || selected.status === s}
                  onClick={() => handleStatusChange(selected._id, s)}
                  className={`text-xs font-semibold px-3 py-2 rounded-full border transition-colors disabled:opacity-40 ${
                    selected.status === s ? "bg-primary text-white border-primary" : "border-gray-200 text-ink/60 hover:border-primary hover:text-primary"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-xl2 p-6 max-w-sm w-full">
            <h3 className="font-display font-semibold text-lg text-ink mb-2">Delete Booking?</h3>
            <p className="text-sm text-ink/60 mb-6">This will permanently remove this booking record.</p>
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

export default AdminBookings;
