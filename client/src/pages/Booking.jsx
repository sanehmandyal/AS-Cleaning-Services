import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaCheckCircle, FaCalendarAlt } from "react-icons/fa";
import { serviceApi } from "../services/serviceApi";
import { bookingApi } from "../services/bookingApi";
import { useAuth } from "../context/AuthContext";
import { Spinner } from "../components/UIState";

const defaultServicesList = [
  { _id: "1", title: "Residential Cleaning", price: 89 },
  { _id: "2", title: "Commercial Cleaning", price: 149 },
  { _id: "3", title: "Deep Cleaning", price: 179 },
  { _id: "4", title: "Move In/Move Out Cleaning", price: 199 },
  { _id: "5", title: "Post Construction Cleaning", price: 249 },
  { _id: "6", title: "Custom Cleaning", price: 99 },
];

const initialForm = {
  customerName: "",
  email: "",
  phone: "",
  service: "",
  propertyType: "House",
  address: "",
  bookingDate: "",
  bookingTime: "",
  rooms: 1,
  notes: "",
};

const timeSlots = ["08:00 AM", "10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM", "06:00 PM"];

const Booking = () => {
  const [params] = useSearchParams();
  const { user, isAuthenticated } = useAuth();
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
    document.title = "Book a Cleaning | AS Cleaning Services";
    serviceApi
      .getAll()
      .then((res) => {
        const list = res.data?.data?.length > 0 ? res.data.data : defaultServicesList;
        setServices(list);
        const preselect = params.get("service");
        const found = list.find((s) => s._id === preselect || s.slug === preselect);
        setForm((f) => ({ ...f, service: found?._id || list[0]?._id || "" }));
      })
      .catch(() => {
        setServices(defaultServicesList);
        setForm((f) => ({ ...f, service: defaultServicesList[0]._id }));
      })
      .finally(() => setLoadingServices(false));
  }, [params]);

  useEffect(() => {
    if (isAuthenticated && user) {
      setForm((f) => ({
        ...f,
        customerName: f.customerName || user.name || "",
        email: f.email || user.email || "",
        phone: f.phone || user.phone || "",
      }));
    }
  }, [isAuthenticated, user]);

  const validate = () => {
    const errs = {};
    if (!form.customerName.trim()) errs.customerName = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.phone.trim()) errs.phone = "Phone number is required";
    if (!form.service) errs.service = "Please select a service";
    if (!form.address.trim()) errs.address = "Address is required";
    if (!form.bookingDate) errs.bookingDate = "Select a date";
    if (!form.bookingTime) errs.bookingTime = "Select a time slot";
    if (!form.rooms || form.rooms < 1) errs.rooms = "Enter number of rooms";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await bookingApi.create(form);
      setConfirmation(res.data.data);
      toast.success("Booking submitted successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create booking. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (confirmation) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center py-16 bg-slate-50 px-4">
        <div className="card max-w-lg w-full p-8 sm:p-10 text-center">
          <span className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-3xl mx-auto mb-4 border border-emerald-100">
            <FaCheckCircle />
          </span>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Booking Confirmed!</h1>
          <p className="text-xs sm:text-sm text-slate-500 mb-6">
            Thank you, {confirmation.customerName}. We've received your booking request and our team will confirm it shortly.
          </p>
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 mb-6 text-left text-xs sm:text-sm space-y-1.5">
            <p>
              <span className="text-slate-400">Booking ID:</span>{" "}
              <span className="font-mono font-semibold text-slate-800">{confirmation._id}</span>
            </p>
            <p>
              <span className="text-slate-400">Date:</span>{" "}
              <span className="font-semibold text-slate-800">
                {new Date(confirmation.bookingDate).toLocaleDateString()}
              </span>
            </p>
            <p>
              <span className="text-slate-400">Time:</span>{" "}
              <span className="font-semibold text-slate-800">{confirmation.bookingTime}</span>
            </p>
            <p>
              <span className="text-slate-400">Status:</span>{" "}
              <span className="inline-block bg-amber-50 text-amber-700 font-semibold px-2 py-0.5 rounded text-xs">
                {confirmation.status}
              </span>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="btn-secondary text-sm">
              Back to Home
            </Link>
            <button
              onClick={() => {
                setConfirmation(null);
                setForm(initialForm);
              }}
              className="btn-primary text-sm"
            >
              Book Another Service
            </button>
          </div>
        </div>
      </div>
    );
  }

  const selectedServiceObj = services.find((s) => s._id === form.service);

  return (
    <div className="relative overflow-hidden bg-white">
      <section className="relative bg-slate-900 py-18 sm:py-24 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1920&auto=format&fit=crop"
            alt="Booking background"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-slate-950/90" />
        </div>

        <div className="container-x text-center max-w-2xl mx-auto px-4 relative z-10">
          <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block mb-2">
            Online Reservation
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-3 tracking-tight">
            Schedule Your Cleaning
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Book trusted, background-checked professional cleaners online in under 60 seconds.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-slate-50/50">
        <div className="container-x max-w-3xl">
          {loadingServices ? (
            <Spinner />
          ) : (
            <form onSubmit={handleSubmit} className="card p-6 sm:p-10 space-y-6">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="input-label">Full Name *</label>
                  <input
                    name="customerName"
                    value={form.customerName}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Jane Doe"
                  />
                  {errors.customerName && (
                    <p className="text-xs text-red-500 mt-1">{errors.customerName}</p>
                  )}
                </div>

                <div>
                  <label className="input-label">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="jane@example.com"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="input-label">Phone Number *</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="+1 (555) 000-0000"
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="input-label">Cleaning Service *</label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="input-field"
                  >
                    {services.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p className="text-xs text-red-500 mt-1">{errors.service}</p>
                  )}
                </div>

                <div>
                  <label className="input-label">Property Type</label>
                  <select
                    name="propertyType"
                    value={form.propertyType}
                    onChange={handleChange}
                    className="input-field"
                  >
                    {["Apartment", "House", "Office", "Commercial Space", "Other"].map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="input-label">Number of Rooms</label>
                  <input
                    type="number"
                    min="1"
                    name="rooms"
                    value={form.rooms}
                    onChange={handleChange}
                    className="input-field"
                  />
                  {errors.rooms && (
                    <p className="text-xs text-red-500 mt-1">{errors.rooms}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="input-label">Service Address *</label>
                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Street, City, State, ZIP"
                  />
                  {errors.address && (
                    <p className="text-xs text-red-500 mt-1">{errors.address}</p>
                  )}
                </div>

                <div>
                  <label className="input-label">Preferred Date *</label>
                  <input
                    type="date"
                    name="bookingDate"
                    min={new Date().toISOString().split("T")[0]}
                    value={form.bookingDate}
                    onChange={handleChange}
                    className="input-field"
                  />
                  {errors.bookingDate && (
                    <p className="text-xs text-red-500 mt-1">{errors.bookingDate}</p>
                  )}
                </div>

                <div>
                  <label className="input-label">Preferred Time *</label>
                  <select
                    name="bookingTime"
                    value={form.bookingTime}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Select a time slot</option>
                    {timeSlots.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  {errors.bookingTime && (
                    <p className="text-xs text-red-500 mt-1">{errors.bookingTime}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="input-label">Special Instructions (Optional)</label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows="3"
                    className="input-field resize-none"
                    placeholder="Pet in home, gate access code, key under mat..."
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full !py-3 text-sm"
              >
                <FaCalendarAlt /> {submitting ? "Processing..." : "Confirm & Schedule"}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default Booking;
