import React from "react";
import { FaInbox, FaExclamationTriangle } from "react-icons/fa";

export const Spinner = ({ full = false }) => (
  <div className={`flex items-center justify-center ${full ? "min-h-[50vh]" : "py-10"}`}>
    <div className="w-10 h-10 border-4 border-primary-light border-t-primary rounded-full animate-spin" />
  </div>
);

export const EmptyState = ({ title = "Nothing here yet", subtitle = "" }) => (
  <div className="flex flex-col items-center justify-center text-center py-16 px-6">
    <span className="w-16 h-16 rounded-full bg-primary-light text-primary flex items-center justify-center text-2xl mb-4">
      <FaInbox />
    </span>
    <p className="font-semibold text-ink">{title}</p>
    {subtitle && <p className="text-sm text-ink/50 mt-1">{subtitle}</p>}
  </div>
);

export const ErrorState = ({ message = "Something went wrong." }) => (
  <div className="flex flex-col items-center justify-center text-center py-16 px-6">
    <span className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-2xl mb-4">
      <FaExclamationTriangle />
    </span>
    <p className="font-semibold text-ink">{message}</p>
  </div>
);

export const SkeletonCard = () => (
  <div className="card overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-100" />
    <div className="p-6 space-y-3">
      <div className="h-4 bg-gray-100 rounded w-2/3" />
      <div className="h-3 bg-gray-100 rounded w-full" />
      <div className="h-3 bg-gray-100 rounded w-4/5" />
    </div>
  </div>
);

export const StatusBadge = ({ status }) => {
  const styles = {
    Pending: "bg-amber-50 text-amber-600",
    Confirmed: "bg-blue-50 text-blue-600",
    "In Progress": "bg-indigo-50 text-indigo-600",
    Completed: "bg-green-50 text-green-600",
    Cancelled: "bg-red-50 text-red-600",
    New: "bg-blue-50 text-blue-600",
    Read: "bg-gray-100 text-gray-600",
    Resolved: "bg-green-50 text-green-600",
  };
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${styles[status] || "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
};
