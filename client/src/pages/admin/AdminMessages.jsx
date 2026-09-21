import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaTrash, FaTimes } from "react-icons/fa";
import { contactApi } from "../../services/contactApi";
import { Spinner, StatusBadge, EmptyState } from "../../components/UIState";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [processing, setProcessing] = useState(false);

  const load = () => {
    setLoading(true);
    contactApi
      .getAll()
      .then((res) => setMessages(res.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    document.title = "Messages | Admin | AS Cleaning Services";
    load();
  }, []);

  const openMessage = async (m) => {
    setSelected(m);
    if (m.status === "New") {
      try {
        await contactApi.update(m._id, { status: "Read" });
        load();
      } catch {
        /* silent */
      }
    }
  };

  const markResolved = async (id) => {
    setProcessing(true);
    try {
      await contactApi.update(id, { status: "Resolved" });
      toast.success("Message marked as resolved.");
      setSelected((s) => (s && s._id === id ? { ...s, status: "Resolved" } : s));
      load();
    } catch (err) {
      toast.error("Failed to update message.");
    } finally {
      setProcessing(false);
    }
  };

  const confirmDelete = async () => {
    setProcessing(true);
    try {
      await contactApi.remove(deleteId);
      toast.success("Message deleted.");
      setDeleteId(null);
      load();
    } catch (err) {
      toast.error("Failed to delete message.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink mb-6">Contact Messages</h1>

      <div className="card p-6">
        {loading ? (
          <Spinner />
        ) : messages.length === 0 ? (
          <EmptyState title="No messages yet" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-ink/40 border-b border-gray-100">
                  <th className="py-3 pr-4 font-medium">From</th>
                  <th className="py-3 pr-4 font-medium">Subject</th>
                  <th className="py-3 pr-4 font-medium">Date</th>
                  <th className="py-3 pr-4 font-medium">Status</th>
                  <th className="py-3 pr-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((m) => (
                  <tr key={m._id} className="border-b border-gray-50 last:border-0">
                    <td className="py-3 pr-4">
                      <p className="font-medium text-ink">{m.name}</p>
                      <p className="text-xs text-ink/40">{m.email}</p>
                    </td>
                    <td className="py-3 pr-4 max-w-xs truncate">{m.subject}</td>
                    <td className="py-3 pr-4">{new Date(m.createdAt).toLocaleDateString()}</td>
                    <td className="py-3 pr-4"><StatusBadge status={m.status} /></td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3">
                        <button onClick={() => openMessage(m)} className="text-primary hover:text-primary-dark" aria-label="View message">
                          <FaEye />
                        </button>
                        <button onClick={() => setDeleteId(m._id)} className="text-red-400 hover:text-red-600" aria-label="Delete message">
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

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-xl2 p-6 max-w-lg w-full relative">
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-ink/40">
              <FaTimes />
            </button>
            <h3 className="font-display font-semibold text-lg text-ink mb-1">{selected.subject}</h3>
            <p className="text-sm text-ink/50 mb-4">
              From {selected.name} ({selected.email}) {selected.phone && `· ${selected.phone}`}
            </p>
            <p className="text-sm text-ink/70 bg-surface rounded-lg p-4 mb-6 leading-relaxed">{selected.message}</p>
            {selected.status !== "Resolved" && (
              <button
                onClick={() => markResolved(selected._id)}
                disabled={processing}
                className="btn-primary w-full disabled:opacity-60"
              >
                {processing ? "Updating..." : "Mark as Resolved"}
              </button>
            )}
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-xl2 p-6 max-w-sm w-full">
            <h3 className="font-display font-semibold text-lg text-ink mb-2">Delete Message?</h3>
            <p className="text-sm text-ink/60 mb-6">This will permanently remove this message.</p>
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

export default AdminMessages;
