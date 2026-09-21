import React, { useEffect, useState } from "react";
import ServiceCard from "../components/ServiceCard";
import { SkeletonCard, EmptyState, ErrorState } from "../components/UIState";
import { serviceApi } from "../services/serviceApi";
import { FaSearch } from "react-icons/fa";

const fallbackServices = [
  {
    _id: "1",
    title: "Residential Cleaning",
    slug: "residential-cleaning",
    shortDescription: "Keep your home fresh, clean and healthy.",
    icon: "FaHome",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800",
  },
  {
    _id: "2",
    title: "Commercial Cleaning",
    slug: "commercial-cleaning",
    shortDescription: "Professional cleaning for your business space.",
    icon: "FaBuilding",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800",
  },
  {
    _id: "3",
    title: "Deep Cleaning",
    slug: "deep-cleaning",
    shortDescription: "A complete clean for a healthier environment.",
    icon: "FaSprayCan",
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=800",
  },
  {
    _id: "4",
    title: "Move In/Move Out Cleaning",
    slug: "move-in-move-out-cleaning",
    shortDescription: "Specialized cleaning for smooth transitions.",
    icon: "FaTruckMoving",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800",
  },
  {
    _id: "5",
    title: "Post Construction Cleaning",
    slug: "post-construction-cleaning",
    shortDescription: "Remove dust and debris for a fresh start.",
    icon: "FaHardHat",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800",
  },
  {
    _id: "6",
    title: "Custom Cleaning",
    slug: "custom-cleaning",
    shortDescription: "Tailored to your specific needs and schedule.",
    icon: "FaClipboardList",
    image: "https://images.unsplash.com/photo-1596178060810-72660ee8f27f?q=80&w=800",
  },
];

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = "Our Services | AS Cleaning Services";
    serviceApi
      .getAll()
      .then((res) => {
        if (res.data?.data && res.data.data.length > 0) {
          setServices(res.data.data);
        } else {
          setServices(fallbackServices);
        }
      })
      .catch(() => setServices(fallbackServices))
      .finally(() => setLoading(false));
  }, []);

  const filtered = services.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    (s.shortDescription && s.shortDescription.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Services Header Banner with background image and gradient overlay */}
      <section className="relative bg-slate-900 py-18 sm:py-24 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85&w=1920&auto=format&fit=crop"
            alt="Services background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/80 to-slate-950/90" />
        </div>

        <div className="container-x relative z-10 text-center max-w-2xl mx-auto px-4">
          <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block mb-2">
            Comprehensive Solutions
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-3 tracking-tight">
            Our Cleaning Services
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mb-8 leading-relaxed">
            Professional cleaning solutions tailored for residential homes, offices, and commercial facilities.
          </p>
          <div className="relative max-w-md mx-auto">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input
              type="text"
              placeholder="Search services (e.g. residential, office)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field !pl-11 !py-3 shadow-lg bg-white/95 text-slate-900 backdrop-blur-sm"
            />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-24 bg-slate-50/50">
        <div className="container-x">
          {error && <ErrorState message={error} />}
          {!error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                : filtered.map((service, i) => (
                    <ServiceCard key={service._id} service={service} index={i} />
                  ))}
            </div>
          )}
          {!loading && !error && filtered.length === 0 && (
            <EmptyState title="No services found" subtitle="Try searching with a different keyword." />
          )}
        </div>
      </section>
    </div>
  );
};

export default Services;
