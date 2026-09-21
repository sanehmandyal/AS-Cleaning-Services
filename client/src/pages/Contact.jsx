import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaPaperPlane } from "react-icons/fa";
import { contactApi } from "../services/contactApi";

const initialForm = { name: "", email: "", phone: "", subject: "", message: "" };

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Contact Us | AS Cleaning Services";
  }, []);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.subject.trim()) errs.subject = "Subject is required";
    if (!form.message.trim()) errs.message = "Message is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await contactApi.send(form);
      toast.success("Message sent! We'll get back to you shortly.");
      setForm(initialForm);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send message.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Header Banner with Background Image */}
      <section className="relative bg-slate-900 py-18 sm:py-24 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1920&auto=format&fit=crop"
            alt="Contact us background"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-slate-950/90" />
        </div>

        <div className="container-x text-center max-w-2xl mx-auto px-4 relative z-10">
          <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block mb-2">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-3 tracking-tight">
            Contact Us
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Have a question, need a custom plan, or ready to book? Our team is always here to help.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-14 sm:py-20 bg-slate-50/50">
        <div className="container-x grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact Details & Map */}
          <div className="lg:col-span-2 space-y-4">
            <div className="card p-5 flex items-start gap-4 hover:shadow-md transition-all">
              <span className="w-10 h-10 rounded-lg bg-sky-50 text-primary flex items-center justify-center shrink-0">
                <FaMapMarkerAlt />
              </span>
              <div>
                <h3 className="font-semibold text-slate-900 text-sm mb-0.5">Our Address</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  221B Cleanway Street, Suite 4, Springfield, USA
                </p>
              </div>
            </div>

            <div className="card p-5 flex items-start gap-4 hover:shadow-md transition-all">
              <span className="w-10 h-10 rounded-lg bg-sky-50 text-primary flex items-center justify-center shrink-0">
                <FaPhoneAlt />
              </span>
              <div>
                <h3 className="font-semibold text-slate-900 text-sm mb-0.5">Phone Line</h3>
                <p className="text-xs text-slate-500">+1 (555) 012-3456</p>
              </div>
            </div>

            <div className="card p-5 flex items-start gap-4 hover:shadow-md transition-all">
              <span className="w-10 h-10 rounded-lg bg-sky-50 text-primary flex items-center justify-center shrink-0">
                <FaEnvelope />
              </span>
              <div>
                <h3 className="font-semibold text-slate-900 text-sm mb-0.5">Email Support</h3>
                <p className="text-xs text-slate-500">hello@ascleaningservices.com</p>
              </div>
            </div>

            <div className="card p-5 flex items-start gap-4 hover:shadow-md transition-all">
              <span className="w-10 h-10 rounded-lg bg-sky-50 text-primary flex items-center justify-center shrink-0">
                <FaClock />
              </span>
              <div>
                <h3 className="font-semibold text-slate-900 text-sm mb-0.5">Working Hours</h3>
                <p className="text-xs text-slate-500">Mon - Sat: 7:00 AM - 8:00 PM</p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden h-48 sm:h-56 border border-slate-100 shadow-sm">
              <iframe
                title="AS Cleaning Services Location"
                src="https://www.google.com/maps?q=Springfield&output=embed"
                width="100%"
                height="100%"
                loading="lazy"
                style={{ border: 0 }}
              />
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="card p-6 sm:p-8 space-y-4 shadow-md">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Send Us a Message</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Your Name *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Jane Doe"
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
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
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="input-label">Phone Number</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div>
                  <label className="input-label">Subject *</label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="How can we help?"
                  />
                  {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
                </div>
              </div>
              <div>
                <label className="input-label">Message *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="5"
                  className="input-field resize-none"
                  placeholder="Tell us about your cleaning needs..."
                />
                {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full !py-3 text-sm"
              >
                <FaPaperPlane size={13} /> {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
