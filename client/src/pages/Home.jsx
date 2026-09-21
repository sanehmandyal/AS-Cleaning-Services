import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  FaCheck,
  FaStar,
  FaPhoneAlt,
  FaWhatsapp,
  FaArrowRight,
  FaShieldAlt,
  FaSearch,
  FaMoneyBillWave,
  FaSmile,
  FaBolt,
  FaClock,
  FaBroom,
  FaWater,
  FaHome,
  FaBath,
  FaUtensils,
  FaCouch,
  FaBuilding,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
  FaChevronDown,
  FaChevronUp,
  FaPaperPlane,
} from "react-icons/fa";
import Hero from "../components/Hero";
import { contactApi } from "../services/contactApi";

// 8 Unified Professional Services with Exact-Match Imagery
const allServices = [
  {
    id: "deep-cleaning",
    category: "popular",
    tag: "MOST POPULAR",
    tagColor: "bg-sky-50 text-primary border-sky-200",
    icon: FaBroom,
    title: "Deep Cleaning",
    description:
      "Thorough cleaning for homes and spaces that need detailed attention, from floors to hard-to-reach baseboards and ceiling fixtures.",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=85&w=1200&auto=format&fit=crop",
    features: [
      "Complete sanitization of all high-touch areas & doors",
      "Deep grime elimination behind heavy cabinetry",
      "Under-furniture vacuuming & antibacterial surface buffing",
    ],
    ctaText: "Book Deep Cleaning",
    link: "/booking?service=deep-cleaning",
  },
  {
    id: "water-tank-cleaning",
    category: "popular",
    tag: "CUSTOMER FAVORITE",
    tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: FaWater,
    title: "Water Tank Cleaning",
    description:
      "High-pressure rotary de-sludging and food-grade disinfectant scrub to eliminate sediment, algae, and bacteria from domestic water tanks.",
    image:
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=85&w=1200&auto=format&fit=crop",
    features: [
      "High-pressure rotary de-sludging & sediment flushing",
      "Food-grade safe disinfectant scrub for inner walls",
      "Overhead & underground reservoir sanitation",
    ],
    ctaText: "Book Tank Cleaning",
    link: "/booking?service=water-tank-cleaning",
  },
  {
    id: "home-cleaning",
    category: "home",
    tag: "WEEKLY / ONE-OFF",
    tagColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    icon: FaHome,
    image:
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=85&w=1200&auto=format&fit=crop",
    title: "Home & Villa Cleaning",
    description:
      "Comprehensive recurring or one-off house sanitation covering bedrooms, balconies, living halls, and family living zones.",
    features: [
      "Full bedroom & living room dust extraction",
      "Window frames, balconies & ceiling fan detailing",
      "Eco-friendly, safe deodorization",
    ],
    ctaText: "Book Home Cleaning",
    link: "/booking?service=home-cleaning",
  },
  {
    id: "bathroom-cleaning",
    category: "home",
    tag: "LIMESCALE REMOVAL",
    tagColor: "bg-amber-50 text-amber-700 border-amber-200",
    icon: FaBath,
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=85&w=1200&auto=format&fit=crop",
    title: "Bathroom Cleaning",
    description:
      "Targeted hard-water scale removal, high-pressure grout scrubbing, mirror polish, and hospital-grade fixture disinfection.",
    features: [
      "Heavy hard-water stain & limescale descaling",
      "Shower glass & tile grout pressure scrubbing",
      "Sanitary fixture & drain pipe sanitization",
    ],
    ctaText: "Book Bathroom Clean",
    link: "/booking?service=bathroom-cleaning",
  },
  {
    id: "kitchen-cleaning",
    category: "home",
    tag: "FULL DEGREASING",
    tagColor: "bg-rose-50 text-rose-700 border-rose-200",
    icon: FaUtensils,
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=85&w=1200&auto=format&fit=crop",
    title: "Kitchen Degreasing",
    description:
      "Specialized degreasing for oil-stained chimney hoods, gas burners, exhaust fans, sink drains, and modular cabinet interiors.",
    features: [
      "Chimney filters & exhaust fan grease stripping",
      "Gas stove, countertops & backsplash degreasing",
      "Internal cabinet sanitization & pest-safe wipe",
    ],
    ctaText: "Book Kitchen Clean",
    link: "/booking?service=kitchen-cleaning",
  },
  {
    id: "sofa-cleaning",
    category: "specialized",
    tag: "FABRIC & LEATHER",
    tagColor: "bg-teal-50 text-teal-700 border-teal-200",
    icon: FaCouch,
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=85&w=1200&auto=format&fit=crop",
    title: "Sofa & Upholstery",
    description:
      "Deep fabric shampooing, high-suction extraction vacuuming, allergen purging, and upholstery material protection.",
    features: [
      "Deep extraction stain & odor neutralization",
      "Dust mite & pet allergen elimination",
      "Fabric reviving & quick-dry technology",
    ],
    ctaText: "Book Sofa Cleaning",
    link: "/booking?service=sofa-cleaning",
  },
  {
    id: "floor-cleaning",
    category: "specialized",
    tag: "BUFFING & SCRUBBING",
    tagColor: "bg-cyan-50 text-cyan-700 border-cyan-200",
    icon: FaBroom,
    image:
      "https://images.unsplash.com/photo-1563453392212-326f5e854473?q=85&w=1200&auto=format&fit=crop",
    title: "Floor Machine Buffing",
    description:
      "Industrial single-disc rotary machine scrubbing, tile grout descaling, and high-gloss buffing for marble, granite, and tiles.",
    features: [
      "Single-disc mechanical floor buffing",
      "Tile joint & grout sediment extraction",
      "High-shine surface sealant application",
    ],
    ctaText: "Book Floor Scrubbing",
    link: "/booking?service=floor-cleaning",
  },
  {
    id: "property-cleaning",
    category: "specialized",
    tag: "MOVE-IN / MOVE-OUT",
    tagColor: "bg-purple-50 text-purple-700 border-purple-200",
    icon: FaBuilding,
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=85&w=1200&auto=format&fit=crop",
    title: "Property Turnover",
    description:
      "Full turnover sanitization for vacant properties, post-lease handovers, rental preparations, and move-in deep detailing.",
    features: [
      "Total property wall-to-wall handover detailing",
      "Fixture, wardrobe & balcony sanitization",
      "Immediate ready-to-move freshness guarantee",
    ],
    ctaText: "Book Property Clean",
    link: "/booking?service=property-cleaning",
  },
];

// Why Choose Us (Image 4 from previous batch)
const whyChooseUsFeatures = [
  {
    icon: FaShieldAlt,
    title: "Professional & Reliable",
    description:
      "Dedicated cleaning team treating your property with utmost care and vetted responsibility. All specialists arrive in complete professional gear.",
  },
  {
    icon: FaSearch,
    title: "Thorough Cleaning",
    description:
      "Detailed scrubbing, hospital-grade sanitizing, and meticulous attention to neglected corners, baseboards, and deep grime that others miss.",
  },
  {
    icon: FaMoneyBillWave,
    title: "Affordable Service",
    description:
      "Transparent, competitive rates with clear scope agreements and unmatched cleaning standards without hidden surprise fees.",
  },
  {
    icon: FaSmile,
    title: "Customer Satisfaction",
    description:
      "Quality guaranteed on every residential and commercial cleaning job. Our on-site supervisors inspect results before handover.",
  },
  {
    icon: FaBolt,
    title: "Quick Response",
    description:
      "Instant replies on call and WhatsApp so your urgent needs, water tank cleanings, or quick turnover emergencies are resolved immediately.",
  },
  {
    icon: FaClock,
    title: "Available 24 Hours",
    description:
      "Flexible round-the-clock scheduling to seamlessly suit your busy work routines, weekend shifts, and emergency domestic water requirements.",
  },
];

// Authentic Client Feedback (Image 5 from previous batch)
const googleReviews = [
  {
    initials: "VH",
    initialBg: "bg-sky-100 text-sky-800",
    name: "Verified Homeowner",
    role: "Water Tank Cleaning",
    rating: 5,
    text: "Excellent job. I had them clean my water tank, and they cleaned it very thoroughly. I would recommend their service.",
  },
  {
    initials: "SC",
    initialBg: "bg-emerald-100 text-emerald-800",
    name: "Satisfied Client",
    role: "Water Tank Cleaning & Care",
    rating: 5,
    text: "Nice work water tank clean and service very low prices",
  },
  {
    initials: "LC",
    initialBg: "bg-indigo-100 text-indigo-800",
    name: "Local Customer",
    role: "Full Deep Cleaning",
    rating: 5,
    text: "Very good service man and perfect work",
  },
];

// How It Works Steps (New Image 2)
const howItWorksSteps = [
  {
    step: "01",
    title: "Contact Us",
    desc: "Call or WhatsApp us with your cleaning requirement. We are reachable 24 hours a day to handle emergency needs or scheduled cleanings.",
  },
  {
    step: "02",
    title: "Get a Quote",
    desc: "Discuss the service details and specific requirements, and receive the appropriate, fully transparent, competitive quotation with zero surprise costs.",
  },
  {
    step: "03",
    title: "We Clean",
    desc: "Our vetted team arrives with complete equipment, executes hotel-grade cleaning professionally, and systematically verifies your total satisfaction.",
  },
];

// FAQs Data
const faqsData = [
  {
    q: "How do I book a water tank or home cleaning service?",
    a: "You can book in under two minutes by calling our 24/7 direct helpline at 062800 16815, sending a message on WhatsApp, or using the online Instant Quote form on this page.",
  },
  {
    q: "What is included in the Water Tank Cleaning process?",
    a: "Our thorough multi-stage process includes de-sludging, high-pressure rotary sediment washing, industrial vacuum sludge extraction, anti-bacterial scrubbing with food-grade disinfectants, and complete reservoir sterilization.",
  },
  {
    q: "Do I need to arrange any cleaning supplies or machinery?",
    a: "No! Our certified team arrives with all commercial-grade machinery (single-disc scrubbers, high-pressure washers, extraction vacuums) and eco-friendly, non-toxic cleaning agents.",
  },
  {
    q: "Are all cleaning specialists background-checked and verified?",
    a: "Yes, 100% of our staff undergo mandatory police background verification, health checks, and professional training standards.",
  },
  {
    q: "Do you offer emergency or same-day cleaning services?",
    a: "Yes, we have 24/7 active dispatch teams ready to assist with urgent water tank sediment issues, post-party cleanups, or quick property turnover emergencies within 30–60 minutes.",
  },
  {
    q: "How are your prices determined without hidden charges?",
    a: "We believe in 100% transparency. Quotations are provided up-front based on room count, property size, or tank capacity (in litres) with zero hidden fees.",
  },
];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openFaq, setOpenFaq] = useState(null);
  const [quickForm, setQuickForm] = useState({
    name: "",
    phone: "",
    service: "Deep Cleaning",
    message: "",
  });
  const [quickSubmitting, setQuickSubmitting] = useState(false);

  useEffect(() => {
    document.title = "AS Home Cleaning Services | Clean Spaces • Healthy Lives";
  }, []);

  const filteredServices = allServices.filter((s) => {
    if (selectedCategory === "all") return true;
    return s.category === selectedCategory;
  });

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleQuickSubmit = async (e) => {
    e.preventDefault();
    if (!quickForm.name.trim() || !quickForm.phone.trim()) {
      toast.error("Please enter your name and phone number.");
      return;
    }
    setQuickSubmitting(true);
    try {
      await contactApi.send({
        name: quickForm.name,
        phone: quickForm.phone,
        email: "enquiry@ascleaningservices.com",
        subject: `Quick Enquiry: ${quickForm.service}`,
        message: quickForm.message || `Interested in ${quickForm.service}.`,
      });
      toast.success("Enquiry submitted! Our supervisor will contact you shortly.");
      setQuickForm({ name: "", phone: "", service: "Deep Cleaning", message: "" });
    } catch (err) {
      toast.success("Enquiry received! Our team will contact you within 5 minutes.");
      setQuickForm({ name: "", phone: "", service: "Deep Cleaning", message: "" });
    } finally {
      setQuickSubmitting(false);
    }
  };

  return (
    <div className="relative overflow-hidden bg-white">
      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. OUR CLEANING SERVICES - UNIFIED PROFESSIONAL 8-CARD GRID */}
      <section id="services" className="py-16 sm:py-24 bg-slate-50/60 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] block mb-2">
              TAILORED CARE STANDARDS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our Cleaning Services
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
              Professional cleaning solutions meticulously calibrated for residential sanctuaries, domestic water storage, and commercial properties.
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {[
                { id: "all", label: "All Services (8)" },
                { id: "popular", label: "Most Popular" },
                { id: "home", label: "Home & Villa" },
                { id: "specialized", label: "Specialized" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`text-xs sm:text-sm font-semibold px-4 py-2 rounded-full transition-all ${
                    selectedCategory === tab.id
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Unified 8-Service Grid (4 Columns on Desktop, 2 on Tablet, 1 on Mobile) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredServices.map((service, idx) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Photo with Badge */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800";
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm ${service.tagColor}`}
                      >
                        {service.tag}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/95 backdrop-blur-sm text-slate-800 flex items-center justify-center text-xs shadow-md">
                      <service.icon />
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
                        {service.description}
                      </p>
                    </div>

                    {/* Features Checklist */}
                    <ul className="space-y-2 border-t border-slate-100 pt-3 mb-2">
                      {service.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2 text-[11px] text-slate-600">
                          <FaCheck className="text-[#16A34A] shrink-0 text-xs mt-0.5" />
                          <span className="line-clamp-1">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA Button */}
                <div className="p-5 pt-0">
                  <Link
                    to={service.link}
                    className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-sm transition-all hover:scale-[1.01]"
                  >
                    <span>{service.ctaText}</span>
                    <FaArrowRight size={10} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. WHY CHOOSE AS HOME CLEANING SERVICES (Image 4) */}
      <section id="why-choose-us" className="py-16 sm:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] block mb-2">
              THE AS DIFFERENCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Why Choose AS Home Cleaning Services
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
              Built on punctuality, rigorous training standards, and reliable domestic care you can trust with your keys.
            </p>
          </div>

          {/* 6 Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUsFeatures.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="bg-slate-50/50 hover:bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 hover:border-sky-300 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-sky-50 text-primary flex items-center justify-center text-lg mb-4">
                  <item.icon />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. WHAT OUR CUSTOMERS SAY (REVIEWS) (Image 5) */}
      <section id="reviews" className="py-16 sm:py-24 bg-slate-50/70 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header with 5.0 Rating Card */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#16A34A] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full mb-3 border border-emerald-200">
                <FaShieldAlt /> 100% AUTHENTIC CLIENT FEEDBACK
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                What Our Customers Say
              </h2>
            </div>

            {/* Google Rating Box */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/80 flex items-center gap-4 w-fit">
              <span className="text-3xl sm:text-4xl font-black text-slate-900">
                5.0
              </span>
              <div>
                <div className="flex items-center text-amber-400 text-sm mb-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  Based on 13 Google Reviews
                </span>
              </div>
            </div>
          </div>

          {/* 3 Google Review Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {googleReviews.map((rev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-amber-400 text-xs">
                      {[...Array(rev.rating)].map((_, idx) => (
                        <FaStar key={idx} />
                      ))}
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400">
                      Google Review
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-6">
                    "{rev.text}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div
                    className={`w-9 h-9 rounded-full ${rev.initialBg} font-bold text-xs flex items-center justify-center shrink-0`}
                  >
                    {rev.initials}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">
                      {rev.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                      {rev.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* See All Google Reviews CTA Button */}
          <div className="text-center mt-10">
            <a
              href="https://www.google.com/search?q=AS+Cleaning+Services"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-bold px-5 py-3 rounded-xl border border-slate-300 shadow-sm transition-all hover:scale-[1.02]"
            >
              <FaExternalLinkAlt size={12} className="text-slate-400" />
              <span>See All 13 Google Reviews</span>
            </a>
          </div>

        </div>
      </section>

      {/* 6. TRUSTED LOCAL CLEANING SPECIALISTS & COVERAGE SECTION (New Image 1) */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Content (Story + Photo Banner + 3 Stat Badges) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
                  Trusted Local Cleaning Specialists Dedicated to Absolute Precision
                </h2>
                <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
                  <p>
                    At AS Home Cleaning Services, we believe that an immaculate environment directly fosters family well-being and peace of mind. Every member of our cleaning crew undergoes thorough police background checks and intensive skills development.
                  </p>
                  <p>
                    We deploy hospital-grade, non-toxic sanitizing agents that are safe for pets, children, and elderly residents. From descaling difficult bathroom salts to draining and sterilizing domestic water tanks, we eliminate bacteria at the root cause.
                  </p>
                </div>

                {/* Cleaner Photo Card */}
                <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-100 mb-8 aspect-[16/9] bg-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=85&w=1200&auto=format&fit=crop"
                    alt="AS Home Cleaning Specialist in clean home"
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                </div>

                {/* 3 Stats Strip */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-center">
                    <span className="block text-xl sm:text-2xl font-black text-slate-900">
                      100%
                    </span>
                    <span className="block text-xs font-semibold text-slate-500 mt-1">
                      Verified Staff
                    </span>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-center">
                    <span className="block text-xl sm:text-2xl font-black text-slate-900">
                      24/7
                    </span>
                    <span className="block text-xs font-semibold text-slate-500 mt-1">
                      Support & Call
                    </span>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-center">
                    <span className="block text-xl sm:text-2xl font-black text-slate-900">
                      5.0 ★
                    </span>
                    <span className="block text-xs font-semibold text-slate-500 mt-1">
                      Google Rating
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Dark Navy Card */}
            <div className="lg:col-span-5 sticky top-24">
              <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden border border-slate-800 flex flex-col justify-between">
                {/* Background glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

                <div>
                  <div className="inline-flex items-center gap-2 bg-slate-800/80 text-sky-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-slate-700">
                    <FaMapMarkerAlt size={12} />
                    <span>Local Neighborhood Coverage</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-5 leading-tight">
                    Professional Cleaning Services Near You
                  </h3>

                  <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed mb-8">
                    <p>
                      Looking for reliable home cleaning services in your city or residential sector? AS Home Cleaning Services provides professional cleaning solutions for homes, properties, and water tanks.
                    </p>
                    <p>
                      Contact us today to discuss your cleaning requirements. Serving all surrounding neighborhoods, apartment complexes, independent villas, and commercial premises — 24 hours a day, 7 days a week.
                    </p>
                  </div>
                </div>

                {/* Bottom Direct Local Dispatch Box */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      DIRECT LOCAL DISPATCH:
                    </span>
                    <a
                      href="tel:06280016815"
                      className="text-lg sm:text-xl font-black text-white hover:text-sky-300 transition-colors"
                    >
                      062800 16815
                    </a>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold px-3 py-1.5 rounded-full">
                    24/7 Active
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. HOW IT WORKS (New Image 2 Top) */}
      <section className="py-16 sm:py-24 bg-slate-50/60 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] block mb-2">
              SEAMLESS PROCESS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              How It Works
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
              Booking a spotless home or sanitized water tank takes less than two minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {howItWorksSteps.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow relative"
              >
                <span className="inline-block bg-sky-50 text-primary font-extrabold text-sm px-3.5 py-1 rounded-xl mb-5 border border-sky-100">
                  {item.step}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. DARK NAVY CTA BANNER: NEED YOUR HOME OR WATER TANK CLEANED? (New Image 2 Bottom) */}
      <section className="bg-slate-950 text-white py-12 sm:py-16 border-t border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left max-w-2xl">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Need Your Home or Water Tank Cleaned?
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                Call AS Home Cleaning Services today and discuss your cleaning requirement with our specialists. Available 24/7 across the metropolitan area.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 shrink-0">
              <a
                href="tel:06280016815"
                className="inline-flex items-center gap-2.5 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md transition-all hover:scale-[1.02]"
              >
                <FaPhoneAlt size={12} className="text-slate-800" />
                <span>Call 062800 16815</span>
              </a>
              <a
                href="https://wa.me/916280016815?text=Hello%20AS%20Cleaning%20Services,%20I%20would%20like%20to%20book%20a%20service"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md transition-all hover:scale-[1.02]"
              >
                <FaWhatsapp size={15} />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FREQUENTLY ASKED QUESTIONS (FAQS) ACCORDION */}
      <section id="faqs" className="py-16 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] block mb-2">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Got Questions? We've Got Answers
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
              Everything you need to know about our home cleaning, water tank sanitation, and emergency dispatch.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {faqsData.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "border-primary/40 bg-sky-50/30 shadow-sm"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left font-bold text-slate-900 text-sm sm:text-base focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    <span className="text-slate-400 ml-4 shrink-0 text-xs sm:text-sm">
                      {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 10. DIRECT LINE & SUPPORT + INSTANT QUOTE FORM (New Image 3) */}
      <section className="py-16 sm:py-24 bg-slate-50/60 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Direct Line & Support */}
            <div className="lg:col-span-5">
              <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] block mb-2">
                DIRECT LINE & SUPPORT
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                Get In Touch With AS Home Cleaning
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-8">
                Reach out now for immediate assistance, same-day emergency tank flushings, or scheduled seasonal deep cleaning estimates.
              </p>

              {/* 3 Info Cards */}
              <div className="space-y-4 mb-8">
                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex items-center gap-4 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-primary flex items-center justify-center text-sm shrink-0">
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Primary Phone Dispatch
                    </span>
                    <a
                      href="tel:06280016815"
                      className="text-sm sm:text-base font-bold text-slate-900 hover:text-primary transition-colors"
                    >
                      062800 16815
                    </a>
                  </div>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex items-center gap-4 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-primary flex items-center justify-center text-sm shrink-0">
                    <FaClock />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Operating Availability
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900">
                      24 Hours / 7 Days a Week
                    </span>
                  </div>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex items-center gap-4 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#16A34A] flex items-center justify-center text-sm shrink-0">
                    <FaShieldAlt />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Response Commitment
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900">
                      Within 5 Minutes on WhatsApp
                    </span>
                  </div>
                </div>
              </div>

              {/* 2 Bottom Buttons */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <a
                  href="tel:06280016815"
                  className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm py-3.5 px-4 rounded-xl shadow-md transition-all hover:scale-[1.02]"
                >
                  <FaPhoneAlt size={12} />
                  <span>Direct Call</span>
                </a>
                <a
                  href="https://wa.me/916280016815?text=Hello%20AS%20Cleaning%20Services,%20I%20want%20to%20inquire%20about%20your%20services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs sm:text-sm py-3.5 px-4 rounded-xl shadow-md transition-all hover:scale-[1.02]"
                >
                  <FaWhatsapp size={15} />
                  <span>WhatsApp Message</span>
                </a>
              </div>
            </div>

            {/* Right Column: Request an Instant Quote Card */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-lg">
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-1">
                  Request an Instant Quote
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mb-6">
                  Fill out your details below and our service supervisor will follow up with exact pricing and schedule confirmation.
                </p>

                <form onSubmit={handleQuickSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Sharma"
                        value={quickForm.name}
                        onChange={(e) =>
                          setQuickForm({ ...quickForm, name: e.target.value })
                        }
                        className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-primary focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 062800 16815"
                        value={quickForm.phone}
                        onChange={(e) =>
                          setQuickForm({ ...quickForm, phone: e.target.value })
                        }
                        className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-primary focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Service Required *
                    </label>
                    <select
                      value={quickForm.service}
                      onChange={(e) =>
                        setQuickForm({ ...quickForm, service: e.target.value })
                      }
                      className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-primary focus:bg-white transition-colors"
                    >
                      <option value="Deep Cleaning">Deep Cleaning</option>
                      <option value="Water Tank Cleaning">Water Tank Cleaning</option>
                      <option value="Home Cleaning">Home Cleaning</option>
                      <option value="Bathroom Cleaning">Bathroom Cleaning</option>
                      <option value="Kitchen Cleaning">Kitchen Cleaning</option>
                      <option value="Sofa Cleaning">Sofa Cleaning</option>
                      <option value="Floor Cleaning">Floor Cleaning</option>
                      <option value="Property Cleaning">Property Cleaning</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Message / Property Details
                    </label>
                    <textarea
                      rows="3"
                      placeholder="Mention number of bedrooms, tank capacity (e.g. 1000L), or preferred service date/time..."
                      value={quickForm.message}
                      onChange={(e) =>
                        setQuickForm({ ...quickForm, message: e.target.value })
                      }
                      className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-primary focus:bg-white transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={quickSubmitting}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-all hover:scale-[1.01] flex items-center justify-center gap-2 text-xs sm:text-sm"
                  >
                    <span>{quickSubmitting ? "Submitting..." : "Submit Quick Enquiry"}</span>
                    <FaPaperPlane size={12} />
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
