import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaSearch, FaEye, FaTimes, FaBan, FaCheckCircle } from "react-icons/fa";
import { adminApi } from "../../services/adminApi";
import { Spinner, StatusBadge, EmptyState } from "../../components/UIState";

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [detail, setDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [processing, setProcessing] = useState(false);

  const load = () => {
    setLoading(true);
    adminApi
      .getCustomers({ search })
      .then((res) => setCustomers(res.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    document.title = "Manage Customers | Admin | AS Cleaning Services";
  }, []);

  useEffect(() => {
    const t = setTimeout(load, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const viewCustomer = async (id) => {
    setDetailLoading(true);
    try {
      const res = await adminApi.getCustomer(id);
      setDetail(res.data.data);
    } catch (err) {
      toast.error("Failed to load customer details.");
    } finally {
      setDetailLoading(false);
    }
  };

  const toggleStatus = async (id, isActive) => {
    setProcessing(true);
    try {
      await adminApi.toggleCustomer(id, { isActive: !isActive });
      toast.success(!isActive ? "Customer reactivated." : "Customer deactivated.");
      load();
      setDetail((d) => (d && d.customer._id === id ? { ...d, customer: { ...d.customer, isActive: !isActive } } : d));
    } catch (err) {
      toast.error("Failed to update customer status.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink mb-6">Manage Customers</h1>

      <div className="card p-5 mb-6">
        <div className="relative max-w-sm">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/30" size={13} />
          <input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      <div className="card p-6">
        {loading ? (
          <Spinner />
        ) : customers.length === 0 ? (
          <EmptyState title="No customers found" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-ink/40 border-b border-gray-100">
                  <th className="py-3 pr-4 font-medium">Name</th>
                  <th className="py-3 pr-4 font-medium">Email</th>
                  <th className="py-3 pr-4 font-medium">Phone</th>
                  <th className="py-3 pr-4 font-medium">Joined</th>
                  <th className="py-3 pr-4 font-medium">Status</th>
                  <th className="py-3 pr-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c._id} className="border-b border-gray-50 last:border-0">
                    <td className="py-3 pr-4 font-medium text-ink">{c.name}</td>
                    <td className="py-3 pr-4">{c.email}</td>
                    <td className="py-3 pr-4">{c.phone || "—"}</td>
                    <td className="py-3 pr-4">{new Date(c.createdAt).toLocaleDateString()}</td>
                    <td className="py-3 pr-4">
                      <StatusBadge status={c.isActive ? "Confirmed" : "Cancelled"} />
                    </td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3">
                        <button onClick={() => viewCustomer(c._id)} className="text-primary hover:text-primary-dark" aria-label="View customer">
                          <FaEye />
                        </button>
                        <button
                          onClick={() => toggleStatus(c._id, c.isActive)}
                          className={c.isActive ? "text-red-400 hover:text-red-600" : "text-success hover:text-green-700"}
                          aria-label="Toggle customer status"
                        >
                          {c.isActive ? <FaBan /> : <FaCheckCircle />}
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

      {(detail || detailLoading) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8">
          <div className="bg-white rounded-xl2 p-6 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setDetail(null)} className="absolute top-4 right-4 text-ink/40">
              <FaTimes />
            </button>
            {detailLoading ? (
              <Spinner />
            ) : (
              detail && (
                <>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="w-14 h-14 rounded-full bg-primary-light text-primary-dark font-bold text-lg flex items-center justify-center">
                      {detail.customer.name[0]}
                    </span>
                    <div>
                      <p className="font-display font-semibold text-lg text-ink">{detail.customer.name}</p>
                      <p className="text-sm text-ink/50">{detail.customer.email}</p>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm mb-6">
                    <p><span className="text-ink/50">Phone:</span> {detail.customer.phone || "—"}</p>
                    <p><span className="text-ink/50">Joined:</span> {new Date(detail.customer.createdAt).toLocaleDateString()}</p>
                    <p><span className="text-ink/50">Status:</span> <StatusBadge status={detail.customer.isActive ? "Confirmed" : "Cancelled"} /></p>
                    <p><span className="text-ink/50">Total Bookings:</span> {detail.bookings.length}</p>
                  </div>
                  <h4 className="font-semibold text-ink mb-3">Booking History</h4>
                  {detail.bookings.length === 0 ? (
                    <EmptyState title="No bookings yet" />
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-left text-ink/40 border-b border-gray-100">
                            <th className="py-2 pr-4 font-medium">Service</th>
                            <th className="py-2 pr-4 font-medium">Date</th>
                            <th className="py-2 pr-4 font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {detail.bookings.map((b) => (
                            <tr key={b._id} className="border-b border-gray-50 last:border-0">
                              <td className="py-2 pr-4">{b.service?.title || "—"}</td>
                              <td className="py-2 pr-4">{new Date(b.bookingDate).toLocaleDateString()}</td>
                              <td className="py-2 pr-4"><StatusBadge status={b.status} /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  <button
                    onClick={() => toggleStatus(detail.customer._id, detail.customer.isActive)}
                    disabled={processing}
                    className={`mt-6 w-full font-semibold rounded-full px-4 py-3 text-sm disabled:opacity-60 ${
                      detail.customer.isActive ? "bg-red-50 text-red-500 hover:bg-red-100" : "bg-green-50 text-success hover:bg-green-100"
                    }`}
                  >
                    {detail.customer.isActive ? "Deactivate Customer" : "Reactivate Customer"}
                  </button>
                </>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCustomers;
