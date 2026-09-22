const path = require("path");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");
const User = require("./models/User");
const Service = require("./models/Service");
const Testimonial = require("./models/Testimonial");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// Routes
const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const contactRoutes = require("./routes/contactRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const blogRoutes = require("./routes/blogRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Auto-seed admin user, default services, and testimonials if missing
const ensureInitialData = async () => {
  try {
    // 1. Admin User
    const adminEmail = (process.env.ADMIN_EMAIL || "admin@ascleaning.com").toLowerCase().trim();
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123456";

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      await User.create({
        name: "AS Administrator",
        email: adminEmail,
        phone: "+91 62800 16815",
        password: adminPassword,
        role: "admin",
      });
      console.log(`✅ Default admin account created: ${adminEmail}`);
    }

    // 2. Default 8 Professional Services
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      const defaultServices = [
        {
          title: "Water Tank Cleaning",
          slug: "water-tank-cleaning",
          icon: "FaWater",
          shortDescription: "High-pressure rotary de-sludging and food-grade disinfectant scrub to eliminate sediment, algae, and bacteria from domestic water tanks.",
          description: "Our 5-stage scientific water tank cleaning protocol uses high-pressure rotary sediment flushing, sludge extraction vacuuming, safe food-grade antibacterial scrubbing, and UV/disinfectant reservoir sanitization for crystal-clear, safe water.",
          image: "/images/services/water-tank-cleaning.jpg",
          price: 1499,
          priceUnit: "starting at",
          duration: "60-90 mins",
          features: [
            "High-pressure rotary de-sludging & sediment flushing",
            "Food-grade safe disinfectant scrub for inner walls",
            "Overhead & underground reservoir sanitation",
          ],
          isActive: true,
        },
        {
          title: "Deep Cleaning",
          slug: "deep-cleaning",
          icon: "FaBroom",
          shortDescription: "Thorough cleaning for homes and spaces that need detailed attention, from floors to hard-to-reach baseboards and ceiling fixtures.",
          description: "Intensive wall-to-wall deep cleaning of residential spaces including furniture dust extraction, hard-to-reach corners, baseboards, switchboards, and sanitized surface buffing.",
          image: "/images/services/deep-cleaning.jpg",
          price: 2999,
          priceUnit: "starting at",
          duration: "4-6 hours",
          features: [
            "Complete sanitization of all high-touch areas & doors",
            "Deep grime elimination behind heavy cabinetry",
            "Under-furniture vacuuming & antibacterial surface buffing",
          ],
          isActive: true,
        },
        {
          title: "Home Cleaning",
          slug: "home-cleaning",
          icon: "FaHome",
          shortDescription: "Comprehensive recurring or one-off house sanitation covering bedrooms, balconies, living halls, and family living zones.",
          description: "Full residential sanitation service customized for apartments, duplexes, and independent villas. Includes dusting, vacuuming, floor mop-buffing, and balcony sanitizing.",
          image: "/images/services/home-cleaning.jpg",
          price: 2499,
          priceUnit: "starting at",
          duration: "3-5 hours",
          features: [
            "Full bedroom & living room dust extraction",
            "Window frames, balconies & ceiling fan detailing",
            "Eco-friendly, safe deodorization",
          ],
          isActive: true,
        },
        {
          title: "Bathroom Cleaning",
          slug: "bathroom-cleaning",
          icon: "FaBath",
          shortDescription: "Targeted hard-water scale removal, high-pressure grout scrubbing, mirror polish, and hospital-grade fixture disinfection.",
          description: "Intensive hard water stain removal, anti-fungal tile grout scrubbing, chrome fitting shine restoration, and hospital-grade sanitization.",
          image: "/images/services/bathroom-cleaning.jpg",
          price: 799,
          priceUnit: "starting at",
          duration: "1-2 hours",
          features: [
            "Heavy hard-water stain & limescale descaling",
            "Shower glass & tile grout pressure scrubbing",
            "Sanitary fixture & drain pipe sanitization",
          ],
          isActive: true,
        },
        {
          title: "Kitchen Cleaning",
          slug: "kitchen-cleaning",
          icon: "FaUtensils",
          shortDescription: "Specialized degreasing for oil-stained chimney hoods, gas burners, exhaust fans, sink drains, and modular cabinet interiors.",
          description: "Deep degreasing and grime removal for modular kitchens, exhaust ducts, chimney mesh, gas stoves, tile backsplashes, and cabinets.",
          image: "/images/services/kitchen-cleaning.jpg",
          price: 1299,
          priceUnit: "starting at",
          duration: "2-3 hours",
          features: [
            "Chimney filters & exhaust fan grease stripping",
            "Gas stove, countertops & backsplash degreasing",
            "Internal cabinet sanitization & pest-safe wipe",
          ],
          isActive: true,
        },
        {
          title: "Sofa Cleaning",
          slug: "sofa-cleaning",
          icon: "FaCouch",
          shortDescription: "Deep fabric shampooing, high-suction extraction vacuuming, allergen purging, and upholstery material protection.",
          description: "Specialized hot-water / chemical injection-extraction fabric shampooing that lifts deep-seated dirt, food stains, pet dander, and odors from couches and recliners.",
          image: "/images/services/sofa-cleaning.jpg",
          price: 999,
          priceUnit: "starting at",
          duration: "1-2 hours",
          features: [
            "Deep extraction stain & odor neutralization",
            "Dust mite & pet allergen elimination",
            "Fabric reviving & quick-dry technology",
          ],
          isActive: true,
        },
        {
          title: "Floor Cleaning",
          slug: "floor-cleaning",
          icon: "FaBroom",
          shortDescription: "Industrial single-disc rotary machine scrubbing, tile grout descaling, and high-gloss buffing for marble, granite, and tiles.",
          description: "Heavy-duty mechanical rotary disc scrubbing and buffing that removes stubborn dirt layers, construction residue, and grout haze from tile, marble, and granite floors.",
          image: "/images/services/floor-cleaning.jpg",
          price: 1499,
          priceUnit: "starting at",
          duration: "2-3 hours",
          features: [
            "Single-disc mechanical floor buffing",
            "Tile joint & grout sediment extraction",
            "High-shine surface sealant application",
          ],
          isActive: true,
        },
        {
          title: "Property Cleaning",
          slug: "property-cleaning",
          icon: "FaBuilding",
          shortDescription: "Full turnover sanitization for vacant properties, post-lease handovers, rental preparations, and move-in deep detailing.",
          description: "End-to-end move-in / move-out property restoration ensuring 100% inspection-ready cleanliness for tenants, landlords, and new homeowners.",
          image: "/images/services/property-cleaning.jpg",
          price: 3499,
          priceUnit: "starting at",
          duration: "5-7 hours",
          features: [
            "Total property wall-to-wall handover detailing",
            "Fixture, wardrobe & balcony sanitization",
            "Immediate ready-to-move freshness guarantee",
          ],
          isActive: true,
        },
      ];
      await Service.insertMany(defaultServices);
      console.log(`✅ Default services seeded (${defaultServices.length} items)`);
    }

    // 3. Default Testimonials
    const testimonialCount = await Testimonial.countDocuments();
    if (testimonialCount === 0) {
      const defaultTestimonials = [
        {
          name: "Verified Homeowner",
          role: "Water Tank Cleaning",
          rating: 5,
          message: "Excellent job. I had them clean my water tank, and they cleaned it very thoroughly. I would recommend their service.",
          isApproved: true,
        },
        {
          name: "Satisfied Client",
          role: "Water Tank Cleaning & Care",
          rating: 5,
          message: "Nice work water tank clean and service very low prices",
          isApproved: true,
        },
        {
          name: "Local Customer",
          role: "Full Deep Cleaning",
          rating: 5,
          message: "Very good service man and perfect work",
          isApproved: true,
        },
      ];
      await Testimonial.insertMany(defaultTestimonials);
      console.log(`✅ Default testimonials seeded (${defaultTestimonials.length} items)`);
    }
  } catch (err) {
    console.error("Data auto-seed error:", err.message);
  }
};

connectDB().then(() => {
  ensureInitialData();
});

const app = express();

// Security & core middleware
app.use(helmet({ crossOriginResourcePolicy: false }));

// Normalize CORS Origins
const configuredClientUrl = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.replace(/\/+$/, "")
  : "";

const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests or missing origin
    if (!origin) return callback(null, true);

    const cleanOrigin = origin.replace(/\/+$/, "");

    if (
      cleanOrigin === "https://as-cleaning-services.vercel.app" ||
      cleanOrigin.endsWith(".vercel.app") ||
      cleanOrigin === configuredClientUrl ||
      cleanOrigin === "http://localhost:5173" ||
      cleanOrigin === "http://localhost:3000" ||
      process.env.NODE_ENV !== "production"
    ) {
      return callback(null, cleanOrigin);
    }
    return callback(null, cleanOrigin); // Permissive for production deployment
  },
  credentials: true,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
    "Access-Control-Request-Method",
    "Access-Control-Request-Headers",
  ],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Explicit fallback header middleware for CORS safety
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin) {
    const cleanOrigin = origin.replace(/\/+$/, "");
    res.setHeader("Access-Control-Allow-Origin", cleanOrigin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, Range"
    );
  }
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
if (process.env.NODE_ENV !== "test") app.use(morgan("dev"));

// Root Welcome & Health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AS Cleaning Services API is active and running 🚀",
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

// Rate limiting for auth & booking/contact endpoints
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests, please try again later." },
});
app.use("/api/auth", limiter);
app.use("/api/contact", limiter);

// Static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "AS Cleaning Services API is running" });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/admin", adminRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`AS Cleaning Services API running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode`);
});
