import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import {
  FaCheck,
  FaTimes,
  FaClock,
  FaArrowRight,
  FaChevronDown,
  FaPhoneAlt,
  FaWhatsapp,
  FaShieldAlt,
  FaChevronRight,
  FaHome,
  FaCalendarCheck,
} from "react-icons/fa";
import { Spinner, ErrorState } from "../components/UIState";
import { serviceApi } from "../services/serviceApi";
import { getVerifiedServiceBySlug, verifiedServices } from "../data/servicesData";
import SEOHead from "../components/SEOHead";
import {
  buildServiceSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "../utils/seoSchema";

const ServiceDetails = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });

    // 1. Fetch from live API first (preserves live Admin edits)
    serviceApi
      .getOne(slug)
      .then((res) => {
        if (res.data?.data) {
          // Merge API data with verified local details (like process, faqs, relatedSlugs)
          const fallback = getVerifiedServiceBySlug(slug) || {};
          const merged = {
            ...fallback,
            ...res.data.data,
            features: res.data.data.features?.length
              ? res.data.data.features
              : fallback.features || [],
            included: res.data.data.included?.length
              ? res.data.data.included
              : fallback.included || [],
            excluded: res.data.data.excluded?.length
              ? res.data.data.excluded
              : fallback.excluded || [],
            faqs: res.data.data.faqs?.length
              ? res.data.data.faqs
              : fallback.faqs || [],
            process: fallback.process || [],
            relatedSlugs: fallback.relatedSlugs || [],
          };
          setService(merged);
        } else {
          fallbackOrError();
        }
      })
      .catch(() => {
        fallbackOrError();
      })
      .finally(() => setLoading(false));

    function fallbackOrError() {
      const fallback = getVerifiedServiceBySlug(slug);
      if (fallback) {
        setService(fallback);
      } else {
        setError("This service could not be found. Please browse our active cleaning services.");
      }
    }
  }, [slug]);

  if (loading) return <Spinner full />;
  if (error || !service) {
    return (
      <div className="py-24 container-x max-w-xl text-center">
        <ErrorState message={error || "Service not found."} />
        <Link to="/services" className="btn-primary mt-6 inline-flex">
          Browse All Services
        </Link>
      </div>
    );
  }

  // Fallback icon resolution
  const Icon = FaIcons[service.icon] || FaIcons.FaBroom;

  // Breadcrumbs data
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: service.title, url: `/services/${service.slug || service.id}` },
  ];

  // Combined Schemas
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceSchema(service),
      buildBreadcrumbSchema(breadcrumbs),
      ...(service.faqs?.length ? [buildFaqSchema(service.faqs)] : []),
    ].filter(Boolean),
  };

  // Find related services for internal linking
  const relatedServices = verifiedServices.filter(
    (s) => s.slug !== (service.slug || service.id)
  ).slice(0, 3);

  const whatsappInquiryUrl = `https://wa.me/916280016815?text=${encodeURIComponent(
    `Hello AS Cleaning Services, I would like to inquire about ${service.title} in Zirakpur / Tricity.`
  )}`;

  return (
    <div className="bg-white">
      {/* 1. Dynamic SEO Metadata & Schemas */}
      <SEOHead
        title={`${service.title} Services in Zirakpur, Mohali & Chandigarh`}
        description={
          service.shortDescription ||
          `Professional ${service.title} by AS Cleaning Services. Trained staff, eco-friendly supplies, 100% satisfaction guarantee in Zirakpur, Mohali, Chandigarh & Tricity.`
        }
        canonicalPath={`/services/${service.slug || service.id}`}
        ogImage={service.image}
        ogType="service"
        schema={combinedSchema}
      />

      {/* 2. Hero Header Banner */}
      <section className="relative h-80 sm:h-96 lg:h-[420px] bg-slate-900 overflow-hidden">
        <img
          src={service.image}
          alt={`${service.title} - AS Cleaning Services`}
          className="w-full h-full object-cover opacity-40 scale-105"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=85&w=1200&auto=format&fit=crop";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 container-x pb-8 sm:pb-12">
          {/* Breadcrumbs Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs text-slate-300 mb-4 flex-wrap"
          >
            <Link to="/" className="hover:text-white flex items-center gap-1">
              <FaHome size={11} /> Home
            </Link>
            <FaChevronRight size={9} className="text-slate-500" />
            <Link to="/services" className="hover:text-white">
              Services
            </Link>
            <FaChevronRight size={9} className="text-slate-500" />
            <span className="text-sky-300 font-semibold">{service.title}</span>
          </nav>

          <div className="flex items-center gap-3 mb-3">
            <span className="w-12 h-12 rounded-xl bg-white text-primary flex items-center justify-center text-xl shadow-lg shrink-0">
              <Icon />
            </span>
            <span className="bg-sky-500/20 text-sky-300 border border-sky-400/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Verified Cleaning Standard
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {service.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
            Professional {service.title.toLowerCase()} tailored for residential homes, apartments, villas & commercial properties across Zirakpur, Mohali & Chandigarh.
          </p>
        </div>
      </section>

      {/* 3. Main Body Content & Sidebar */}
      <section className="py-14 sm:py-20">
        <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Detailed Service Information */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Overview Section */}
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">
                SERVICE OVERVIEW
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
                About Our {service.title}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Key Features & Benefits */}
            {service.features?.length > 0 && (
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">
                  KEY ADVANTAGES
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 tracking-tight">
                  What Sets This Service Apart
                </h2>
                <div className="grid sm:grid-cols-2 gap-3.5">
                  {service.features.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-sky-200 transition-colors"
                    >
                      <FaCheck className="text-[#16A34A] shrink-0 mt-0.5" size={13} />
                      <span className="text-xs sm:text-sm text-slate-700 font-medium">
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Inclusions & Exclusions */}
            <div className="grid sm:grid-cols-2 gap-6 bg-slate-50/70 p-6 rounded-2xl border border-slate-100">
              {service.included?.length > 0 && (
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-3 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs">
                      ✓
                    </span>
                    What's Included
                  </h3>
                  <ul className="space-y-2">
                    {service.included.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                        <FaCheck className="text-[#16A34A] mt-0.5 shrink-0" size={11} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {service.excluded?.length > 0 && (
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-3 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">
                      ✕
                    </span>
                    What's Not Included
                  </h3>
                  <ul className="space-y-2">
                    {service.excluded.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-500">
                        <FaTimes className="text-red-400 mt-0.5 shrink-0" size={11} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Scientific Cleaning Process */}
            {service.process?.length > 0 && (
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">
                  OUR METHODOLOGY
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 tracking-tight">
                  Step-by-Step Cleaning Process
                </h2>
                <div className="space-y-4">
                  {service.process.map((stepItem, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-white hover:shadow-sm transition-shadow"
                    >
                      <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-black text-sm flex items-center justify-center shrink-0">
                        {stepItem.step || idx + 1}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 mb-1">
                          {stepItem.title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {stepItem.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Frequently Asked Questions */}
            {service.faqs?.length > 0 && (
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">
                  COMMON QUESTIONS
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 tracking-tight">
                  Frequently Asked Questions About {service.title}
                </h2>
                <div className="space-y-3">
                  {service.faqs.map((faq, i) => {
                    const isOpen = openFaq === i;
                    return (
                      <div
                        key={i}
                        className="rounded-xl border border-slate-200 overflow-hidden bg-white"
                      >
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : i)}
                          className="w-full flex items-center justify-between p-4 text-left font-semibold text-xs sm:text-sm text-slate-900 hover:bg-slate-50 transition-colors"
                        >
                          <span>{faq.question}</span>
                          <FaChevronDown
                            className={`text-slate-400 transition-transform shrink-0 ml-3 ${
                              isOpen ? "rotate-180 text-primary" : ""
                            }`}
                            size={12}
                          />
                        </button>
                        {isOpen && (
                          <div className="p-4 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Internal Cross-Linking: Related Services */}
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">
                RECOMMENDED SERVICES
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 tracking-tight">
                Other Services You May Need
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {relatedServices.map((rel) => (
                  <Link
                    key={rel.slug}
                    to={`/services/${rel.slug}`}
                    className="p-4 rounded-xl border border-slate-200 hover:border-sky-300 hover:shadow-md transition-all group bg-white flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-primary transition-colors mb-1.5">
                        {rel.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                        {rel.shortDescription}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-primary mt-3 group-hover:translate-x-1 transition-transform">
                      View Service <FaArrowRight size={9} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Booking & Direct Contact Card */}
          <div className="lg:col-span-4">
            <div className="card p-6 sm:p-7 sticky top-24 border border-slate-200/90 shadow-lg space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary block mb-1">
                  DIRECT DISPATCH
                </span>
                <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl">
                  Book {service.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Schedule certified cleaning technicians in Zirakpur, Mohali, Chandigarh & Tricity.
                </p>
              </div>

              {service.duration && (
                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 bg-sky-50 p-3 rounded-xl border border-sky-100">
                  <FaClock className="text-primary" /> Estimated Duration: {service.duration}
                </div>
              )}

              <div className="space-y-3">
                <Link
                  to={`/booking?service=${service.slug || service._id || service.id}`}
                  className="btn-primary w-full text-center text-xs sm:text-sm !py-3 shadow-md"
                >
                  <FaCalendarCheck size={13} /> Book Online Now
                </Link>

                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#16A34A] hover:bg-[#15803D] text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-md transition-all"
                >
                  <FaWhatsapp size={16} /> WhatsApp Inquiry
                </a>

                <a
                  href="tel:06280016815"
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-md transition-all"
                >
                  <FaPhoneAlt size={12} className="text-sky-400" /> Call: 062800 16815
                </a>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <FaShieldAlt className="text-emerald-500 shrink-0" />
                  <span>100% Satisfaction Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheck className="text-emerald-500 shrink-0" />
                  <span>Police Background-Checked Crew</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheck className="text-emerald-500 shrink-0" />
                  <span>Eco-Friendly & Non-Toxic Chemicals</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ServiceDetails;
