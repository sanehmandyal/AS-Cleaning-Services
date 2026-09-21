import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import { FaCheck, FaArrowRight } from "react-icons/fa";
import { serviceApi } from "../services/serviceApi";
import { Spinner, ErrorState } from "../components/UIState";

const defaultPricing = [
  {
    _id: "1",
    title: "Residential Cleaning",
    shortDescription: "Ideal for regular home maintenance and spotless rooms.",
    price: 89,
    icon: "FaHome",
    features: [
      "Dusting & wiping all surfaces",
      "Vacuuming & mopping floors",
      "Kitchen counter & appliance exterior clean",
      "Bathroom sanitization & polishing",
    ],
  },
  {
    _id: "2",
    title: "Commercial Cleaning",
    shortDescription: "Tailored for offices, retail stores, and commercial workspaces.",
    price: 149,
    icon: "FaBuilding",
    features: [
      "Workstation & desk disinfection",
      "Common area & breakroom cleaning",
      "Restroom replenishment & deep sanitizing",
      "Trash removal & recycling",
    ],
  },
  {
    _id: "3",
    title: "Deep Cleaning",
    shortDescription: "Comprehensive top-to-bottom scrub for every hidden corner.",
    price: 179,
    icon: "FaSparkles",
    features: [
      "All standard cleaning tasks",
      "Deep tile & grout scrubbing",
      "Baseboards & door frames detail",
      "Inside microwave & cabinet exteriors",
    ],
  },
];

const Pricing = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Pricing | AS Cleaning Services";
    serviceApi
      .getAll()
      .then((res) => {
        if (res.data?.data && res.data.data.length > 0) {
          setServices(res.data.data);
        } else {
          setServices(defaultPricing);
        }
      })
      .catch(() => setServices(defaultPricing))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <section className="bg-gradient-to-b from-sky-50 to-white py-16 sm:py-20 border-b border-slate-100">
        <div className="container-x text-center max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">
            Simple, Transparent Pricing
          </h1>
          <p className="text-sm sm:text-base text-slate-500">
            No hidden fees. Choose the service that fits your space.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-x">
          {loading && <Spinner />}
          {error && <ErrorState message={error} />}
          {!loading && !error && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {services.slice(0, 3).map((s, i) => {
                const Icon = FaIcons[s.icon] || FaIcons.FaBroom;
                const featured = i === 2; // Deep Cleaning featured
                return (
                  <div
                    key={s._id}
                    className={`rounded-xl p-8 border transition-all duration-300 hover:shadow-md flex flex-col justify-between ${
                      featured
                        ? "bg-slate-900 text-white shadow-lg border-slate-900 ring-2 ring-primary"
                        : "bg-white border-slate-200/80 shadow-sm"
                    }`}
                  >
                    <div>
                      {featured && (
                        <span className="inline-block bg-primary text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-4">
                          Most Popular
                        </span>
                      )}
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
                            featured ? "bg-white/10 text-white" : "bg-sky-50 text-primary"
                          }`}
                        >
                          <Icon />
                        </span>
                        <h3 className="font-bold text-lg">{s.title}</h3>
                      </div>
                      <p
                        className={`text-xs sm:text-sm mb-6 ${
                          featured ? "text-slate-300" : "text-slate-500"
                        }`}
                      >
                        {s.shortDescription}
                      </p>
                      <div className="mb-6">
                        <span className="text-3xl font-extrabold">${s.price}</span>
                        <span
                          className={`text-xs ${
                            featured ? "text-slate-400" : "text-slate-500"
                          }`}
                        >
                          {" "}
                          starting
                        </span>
                      </div>
                      <ul className="space-y-2.5 mb-8">
                        {(s.features || [
                          "Professional equipment",
                          "Eco-friendly supplies",
                          "Satisfaction guaranteed",
                        ]).map((f, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm">
                            <FaCheck
                              className={`mt-0.5 shrink-0 ${
                                featured ? "text-sky-300" : "text-emerald-500"
                              }`}
                              size={12}
                            />
                            <span className={featured ? "text-slate-200" : "text-slate-700"}>
                              {f}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      to={`/booking?service=${s._id}`}
                      className={
                        featured
                          ? "btn-primary w-full !py-2.5 text-sm"
                          : "btn-secondary w-full !py-2.5 text-sm"
                      }
                    >
                      Book Now <FaArrowRight size={12} />
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Custom Quote CTA */}
      <section className="py-14 bg-slate-50 border-t border-slate-100">
        <div className="container-x text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Need a Custom Quote?</h2>
          <p className="text-sm text-slate-500 mb-6">
            For large commercial properties, recurring schedules, or post-renovation cleanup,
            get in touch and we'll prepare a custom estimate.
          </p>
          <Link to="/contact" className="btn-primary">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
