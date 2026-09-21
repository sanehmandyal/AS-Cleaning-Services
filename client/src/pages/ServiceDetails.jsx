import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import { FaCheck, FaTimes, FaClock, FaArrowRight, FaChevronDown } from "react-icons/fa";
import { Spinner, ErrorState } from "../components/UIState";
import { serviceApi } from "../services/serviceApi";

const ServiceDetails = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    setLoading(true);
    serviceApi
      .getOne(slug)
      .then((res) => {
        setService(res.data.data);
        document.title = `${res.data.data.title} | AS Cleaning Services`;
      })
      .catch(() => setError("This service could not be found."))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Spinner full />;
  if (error || !service) return <ErrorState message={error} />;

  const Icon = FaIcons[service.icon] || FaIcons.FaBroom;

  return (
    <div>
      <section className="relative h-80 sm:h-96">
        <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-primary-dark/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container-x pb-8">
          <span className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-primary text-2xl mb-4 shadow-soft">
            <Icon />
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">{service.title}</h1>
        </div>
      </section>

      <section className="py-16">
        <div className="container-x grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-xl font-display font-semibold text-ink mb-3">Overview</h2>
              <p className="text-ink/60 leading-relaxed">{service.description}</p>
            </div>

            {service.features?.length > 0 && (
              <div>
                <h2 className="text-xl font-display font-semibold text-ink mb-4">Key Features</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {service.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-ink/70">
                      <FaCheck className="text-success shrink-0" size={13} /> {f}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-8">
              {service.included?.length > 0 && (
                <div>
                  <h3 className="font-display font-semibold text-ink mb-3">What's Included</h3>
                  <ul className="space-y-2">
                    {service.included.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-ink/70">
                        <FaCheck className="text-success mt-0.5 shrink-0" size={13} /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {service.excluded?.length > 0 && (
                <div>
                  <h3 className="font-display font-semibold text-ink mb-3">What's Not Included</h3>
                  <ul className="space-y-2">
                    {service.excluded.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-ink/70">
                        <FaTimes className="text-red-400 mt-0.5 shrink-0" size={13} /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {service.faqs?.length > 0 && (
              <div>
                <h2 className="text-xl font-display font-semibold text-ink mb-4">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {service.faqs.map((faq, i) => (
                    <div key={i} className="card overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between px-5 py-4 text-left"
                      >
                        <span className="font-medium text-sm text-ink">{faq.question}</span>
                        <FaChevronDown
                          className={`text-ink/40 transition-transform shrink-0 ml-3 ${openFaq === i ? "rotate-180" : ""}`}
                        />
                      </button>
                      {openFaq === i && (
                        <p className="px-5 pb-4 text-sm text-ink/60">{faq.answer}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h3 className="font-bold text-slate-900 text-lg mb-2">Book This Service</h3>
              <p className="text-xs text-slate-500 mb-5 leading-relaxed">
                Schedule a professional cleaning tailored to your space and requirements.
              </p>
              {service.duration && (
                <div className="flex items-center gap-2 text-xs font-medium text-slate-600 mb-6 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <FaClock className="text-primary" /> Estimated duration: {service.duration}
                </div>
              )}
              <Link
                to={`/booking?service=${service._id}`}
                className="btn-primary w-full"
              >
                Book Now <FaArrowRight />
              </Link>
              <Link to="/contact" className="btn-secondary w-full mt-3">
                Ask a Question
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetails;
