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
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// Routes
const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const contactRoutes = require("./routes/contactRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const blogRoutes = require("./routes/blogRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Auto-seed admin user if missing
const ensureAdminUser = async () => {
  try {
    const adminEmail = (process.env.ADMIN_EMAIL || "admin@ascleaning.com").toLowerCase().trim();
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123456";

    const existing = await User.findOne({ email: adminEmail });
    if (!existing) {
      await User.create({
        name: "AS Administrator",
        email: adminEmail,
        phone: "+91 62800 16815",
        password: adminPassword,
        role: "admin",
      });
      console.log(`✅ Default admin account created: ${adminEmail}`);
    }
  } catch (err) {
    console.error("Admin auto-seed error:", err.message);
  }
};

connectDB().then(() => {
  ensureAdminUser();
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
