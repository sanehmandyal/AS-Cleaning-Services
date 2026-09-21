import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaClipboardList,
  FaUsers,
  FaBroom,
  FaEnvelope,
  FaEye,
  FaClock,
} from "react-icons/fa";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { adminApi } from "../../services/adminApi";
import { Spinner } from "../../components/UIState";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Dashboard | AS Cleaning Services";
    Promise.all([
      adminApi.getDashboard().catch(() => ({ data: { data: null } })),
      adminApi.getBookings({ limit: 5 }).catch(() => ({ data: { data: [] } })),
    ])
      .then(([dashRes, bookRes]) => {
        setStats(dashRes.data?.data || null);
        setRecentBookings(bookRes.data?.data || []);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner full />;

  // Real Database Metrics (using nullish coalescing to accurately show 0)
  const totalBookings = stats?.totalBookings ?? 0;
  const totalCustomers = stats?.totalCustomers ?? 0;
  const totalServices = stats?.totalServices ?? 0;
  const totalMessages = stats?.unreadMessages ?? 0;
  const pendingBookings = stats?.pendingBookings ?? 0;

  // Real Chart Data
  const currentMonthIdx = new Date().getMonth();
  const last6Months = Array.from({ length: 6 }).map((_, i) => {
    const monthIndex = (currentMonthIdx - 5 + i + 12) % 12;
    return monthNames[monthIndex];
  });

  const chartData = stats?.monthlyBookings?.length
    ? stats.monthlyBookings.map((m) => ({
        name: monthNames[(m._id?.month || 1) - 1] || `M${m._id?.month}`,
        bookings: m.count || 0,
        revenue: m.revenue || 0,
      }))
    : last6Months.map((name) => ({ name, bookings: 0 }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-xs text-slate-500 mt-0.5">Live overview from database</p>
        </div>
        <Link to="/admin/bookings" className="btn-primary !py-2 text-xs">
          View All Bookings
        </Link>
      </div>

      {/* Top 4 Real KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Total Bookings */}
        <div className="card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Bookings
            </span>
            <span className="w-8 h-8 rounded-lg bg-sky-50 text-primary flex items-center justify-center text-sm">
              <FaClipboardList />
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {totalBookings}
            </span>
            {pendingBookings > 0 ? (
              <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                <FaClock size={10} /> {pendingBookings} Pending
              </span>
            ) : (
              <span className="text-[11px] font-medium text-slate-400">All caught up</span>
            )}
          </div>
        </div>

        {/* Card 2: Total Customers */}
        <div className="card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Customers
            </span>
            <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm">
              <FaUsers />
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {totalCustomers}
            </span>
            <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              Registered
            </span>
          </div>
        </div>

        {/* Card 3: Total Services */}
        <div className="card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Services
            </span>
            <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-sm">
              <FaBroom />
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {totalServices}
            </span>
            <span className="text-xs text-slate-400">Active</span>
          </div>
        </div>

        {/* Card 4: Messages */}
        <div className="card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Messages
            </span>
            <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">
              <FaEnvelope />
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {totalMessages}
            </span>
            {totalMessages > 0 ? (
              <span className="text-[11px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full">
                New
              </span>
            ) : (
              <span className="text-xs text-slate-400">0 unread</span>
            )}
          </div>
        </div>
      </div>

      {/* Bookings Overview Chart */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-bold text-slate-900 text-base">Bookings Overview</h2>
            <p className="text-xs text-slate-400">Monthly booking trend from database</p>
          </div>
          <span className="text-xs bg-slate-100 text-slate-600 font-semibold px-2.5 py-1 rounded-md">
            Last 6 Months
          </span>
        </div>
        <div className="h-64 sm:h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorBookings" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="5%" stopColor="#0284C7" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#0284C7" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0F172A",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: "12px",
                  border: "none",
                }}
              />
              <Area
                type="monotone"
                dataKey="bookings"
                stroke="#0284C7"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorBookings)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="card overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-900 text-base">Recent Bookings</h2>
          <Link to="/admin/bookings" className="text-xs font-semibold text-primary hover:underline">
            View All
          </Link>
        </div>

        {recentBookings.length === 0 ? (
          <div className="py-12 px-4 text-center">
            <span className="w-12 h-12 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center text-xl mx-auto mb-3">
              <FaClipboardList />
            </span>
            <p className="text-sm font-semibold text-slate-700">No bookings recorded yet</p>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              When customers book cleaning services on the site, their appointments and status will appear here in real time.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-500 text-[11px] font-semibold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="px-5 py-3">Customer Name</th>
                  <th className="px-5 py-3">Service</th>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentBookings.map((b) => {
                  const status = b.status || "Pending";
                  const isCompleted = status.toLowerCase() === "completed";
                  const isPending = status.toLowerCase() === "pending";
                  const isConfirmed = status.toLowerCase() === "confirmed";

                  return (
                    <tr key={b._id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-slate-800">
                        {b.customerName || "Customer"}
                      </td>
                      <td className="px-5 py-3.5 text-slate-600">
                        {b.service?.title || b.service || "Cleaning"}
                      </td>
                      <td className="px-5 py-3.5 text-slate-500">
                        {b.bookingDate
                          ? new Date(b.bookingDate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "—"}
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                            isCompleted
                              ? "bg-emerald-50 text-emerald-700"
                              : isPending
                              ? "bg-amber-50 text-amber-700"
                              : isConfirmed
                              ? "bg-sky-50 text-sky-700"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          {status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <Link
                          to="/admin/bookings"
                          className="text-slate-400 hover:text-primary transition-colors p-1"
                          aria-label="View booking details"
                        >
                          <FaEye size={14} />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
