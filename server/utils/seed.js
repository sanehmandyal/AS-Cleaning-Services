require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const User = require("../models/User");
const Service = require("../models/Service");
const Testimonial = require("../models/Testimonial");
const Blog = require("../models/Blog");

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

if (!adminEmail || !adminPassword) {
  throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in server/.env");
}

const services = [
  {
    title: "Deep Cleaning",
    slug: "deep-cleaning",
    icon: "FaBroom",
    shortDescription: "Complete intensive sanitization for switchboards, hard-to-reach areas, baseboards, and deep grime.",
    description: "Our deep cleaning service reaches every corner — behind appliances, inside cabinets, baseboards, switchboards and grout — providing a thorough reset for your home or office.",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=85&w=1200&auto=format&fit=crop",
    price: 0,
    duration: "4-6 hours",
    features: ["Behind appliances", "Baseboards & grout", "Inside cabinets", "Detailed sanitizing"],
    included: ["Full property deep clean", "All living areas", "Bedrooms", "Kitchen & bathrooms"],
    excluded: ["Structural alterations"],
    faqs: [
      { question: "How often should I book a deep clean?", answer: "We recommend every 3-6 months for most homes." },
      { question: "Do you bring your own equipment?", answer: "Yes, our team brings all specialized gear and eco-friendly products." },
    ],
  },
  {
    title: "Water Tank Cleaning",
    slug: "water-tank-cleaning",
    icon: "FaWater",
    shortDescription: "High-pressure rotary de-sludging and food-grade disinfectant scrub for pure, hygienic water storage.",
    description: "High-pressure rotary de-sludging and food-grade disinfectant scrub to eliminate sediment, algae, and bacteria from domestic water tanks.",
    image: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?q=85&w=1200&auto=format&fit=crop",
    price: 0,
    duration: "1-2 hours",
    features: ["High-pressure rotary de-sludging", "Food-grade disinfectant scrub", "Sediment vacuum extraction", "Overhead & underground reservoirs"],
    included: ["Complete tank drain & de-sludge", "Wall disinfection", "Post-clean inspection"],
    excluded: ["Plumbing line repairs"],
    faqs: [
      { question: "How often should water tanks be cleaned?", answer: "We recommend cleaning every 6 months to ensure pure, safe water." },
    ],
  },
  {
    title: "Home & Villa Cleaning",
    slug: "home-cleaning",
    icon: "FaHome",
    shortDescription: "Comprehensive recurring and one-off house sanitation including bedrooms, balconies, and living rooms.",
    description: "Comprehensive recurring or one-off house sanitation covering bedrooms, balconies, living halls, and family living zones.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85&w=1200&auto=format&fit=crop",
    price: 0,
    duration: "3-5 hours",
    features: ["Full bedroom & living room dust extraction", "Window frames & balconies", "Ceiling fans & fixtures", "Eco-friendly safe deodorization"],
    included: ["All living areas", "Bedrooms", "Common zones"],
    excluded: ["Laundry"],
    faqs: [],
  },
  {
    title: "Bathroom Cleaning",
    slug: "bathroom-cleaning",
    icon: "FaBath",
    shortDescription: "Targeted hard-water scale removal, high-pressure grout scrubbing, mirror polish, and fixture disinfection.",
    description: "Targeted hard-water scale removal, high-pressure grout scrubbing, mirror polish, and hospital-grade fixture disinfection.",
    image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?q=85&w=1200&auto=format&fit=crop",
    price: 0,
    duration: "1-2 hours",
    features: ["Hard-water stain descaling", "Shower glass polish", "Tile grout scrubbing", "Sanitary fixture sanitization"],
    included: ["All bathroom surfaces", "Mirror & glass", "Fixtures"],
    excluded: ["Plumbing pipe replacements"],
    faqs: [],
  },
  {
    title: "Kitchen Cleaning",
    slug: "kitchen-cleaning",
    icon: "FaUtensils",
    shortDescription: "Specialized degreasing for oily chimney hoods, gas burners, exhaust fans, sink drains, and cabinets.",
    description: "Specialized degreasing for oil-stained chimney hoods, gas burners, exhaust fans, sink drains, and modular cabinet interiors.",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=85&w=1200&auto=format&fit=crop",
    price: 0,
    duration: "2-3 hours",
    features: ["Chimney & exhaust fan degreasing", "Gas stove & backsplash stripping", "Internal cabinet sanitization", "Sink & drain polish"],
    included: ["All kitchen surfaces", "Appliances exterior", "Counters"],
    excluded: ["Structural repairs"],
    faqs: [],
  },
  {
    title: "Sofa Cleaning",
    slug: "sofa-cleaning",
    icon: "FaCouch",
    shortDescription: "Deep fabric shampooing, high-suction extraction vacuuming, allergen purging, and upholstery protection.",
    description: "Deep fabric shampooing, high-suction extraction vacuuming, allergen purging, and upholstery material protection.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=85&w=1200&auto=format&fit=crop",
    price: 0,
    duration: "1-2 hours",
    features: ["Deep extraction stain removal", "Dust mite & allergen purge", "Fabric reviving shampoo", "Quick-dry treatment"],
    included: ["Sofas, armchairs, cushions"],
    excluded: ["Leather dye repair"],
    faqs: [],
  },
  {
    title: "Floor Cleaning",
    slug: "floor-cleaning",
    icon: "FaBroom",
    shortDescription: "Industrial single-disc machine scrubbing, tile grout descaling, and high-gloss buffing for tiles & marble.",
    description: "Industrial single-disc rotary machine scrubbing, tile grout descaling, and high-gloss buffing for marble, granite, and tiles.",
    image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?q=85&w=1200&auto=format&fit=crop",
    price: 0,
    duration: "2-3 hours",
    features: ["Single-disc mechanical buffing", "Tile joint descaling", "High-gloss surface polishing", "Sealant application"],
    included: ["All hard floors", "Marble, tile, granite"],
    excluded: ["Carpets"],
    faqs: [],
  },
  {
    title: "Property Cleaning",
    slug: "property-cleaning",
    icon: "FaBuilding",
    shortDescription: "Full turnover sanitization for vacant properties, post-lease handovers, and move-in/move-out deep detailing.",
    description: "Full turnover sanitization for vacant properties, post-lease handovers, rental preparations, and move-in deep detailing.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=85&w=1200&auto=format&fit=crop",
    price: 0,
    duration: "4-6 hours",
    features: ["Wall-to-wall handover detailing", "Wardrobes & cupboards", "Balconies & windows", "Ready-to-move sanitization"],
    included: ["Complete vacant property"],
    excluded: ["Debris removal"],
    faqs: [],
  },
];

const testimonials = [
  { name: "Priya Sharma", role: "Homeowner", rating: 5, message: "AS Cleaning Services did an amazing job! My home has never looked so clean. Highly recommended.", isApproved: true },
  { name: "Rahul Mehta", role: "Office Manager", rating: 5, message: "Professional, punctual and very thorough. Great service for our office every week.", isApproved: true },
  { name: "Neha Verma", role: "Client", rating: 5, message: "Excellent team and eco-friendly products. Will definitely book again!", isApproved: true },
];

const blogs = [
  {
    title: "5 Tips to Keep Your Home Clean Between Visits",
    image: "https://images.unsplash.com/photo-1581578021450-2f6b8fdcfa9e?q=80&w=1200",
    excerpt: "Simple daily habits that keep your home looking fresh between professional cleanings.",
    content: "Maintaining a clean home between professional visits doesn't have to be hard. Start with a nightly 10-minute tidy-up, wipe kitchen counters after every use, keep a small caddy of supplies in each bathroom, do a load of laundry every couple of days instead of letting it pile up, and open windows regularly for fresh air circulation.",
    category: "Cleaning Tips",
    published: true,
    publishedDate: new Date(),
  },
  {
    title: "The Benefits of Eco-Friendly Cleaning Products",
    image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?q=80&w=1200",
    excerpt: "Why switching to green cleaning products is better for your family and the planet.",
    content: "Eco-friendly cleaning products reduce exposure to harsh chemicals, are safer for children and pets, and lessen environmental impact. At AS Cleaning Services, we use plant-based, biodegradable products across all our residential and commercial services without compromising on cleanliness.",
    category: "Sustainability",
    published: true,
    publishedDate: new Date(),
  },
  {
    title: "How Often Should You Deep Clean Your Home?",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200",
    excerpt: "A guide to the right deep-cleaning frequency for different rooms and lifestyles.",
    content: "Most homes benefit from a deep clean every 3-6 months, though high-traffic households, homes with pets, or allergy sufferers may need more frequent deep cleans. Weekly maintenance cleaning combined with quarterly deep cleaning keeps your home consistently healthy.",
    category: "Cleaning Tips",
    published: true,
    publishedDate: new Date(),
  },
];

const seed = async () => {
  await connectDB();
  try {
    await Promise.all([Service.deleteMany(), Testimonial.deleteMany(), Blog.deleteMany()]);

    await Service.insertMany(services);
    await Testimonial.insertMany(testimonials);
    await Blog.insertMany(blogs);

    const admin = await User.findOne({ email: adminEmail });
    if (admin) {
      admin.password = adminPassword;
      admin.role = "admin";
      admin.isActive = true;
      await admin.save();
    } else {
      await User.create({
        name: "AS Admin",
        email: adminEmail,
        phone: "+1 555-0100",
        password: adminPassword,
        role: "admin",
      });
    }

    console.log("✅ Database seeded successfully!");
    console.log(`Admin account configured for: ${adminEmail}`);
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    mongoose.connection.close();
  }
};

seed();
