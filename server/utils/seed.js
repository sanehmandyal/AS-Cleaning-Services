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
    title: "Residential Cleaning",
    icon: "FaHome",
    shortDescription: "Keep your home fresh, clean and healthy.",
    description:
      "Our residential cleaning service covers every room in your home, from dusting and vacuuming to sanitizing kitchens and bathrooms, leaving your living space spotless and healthy for your family.",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200",
    price: 79,
    duration: "2-3 hours",
    features: ["Dusting & wiping surfaces", "Vacuuming & mopping", "Kitchen & bathroom sanitizing", "Trash removal"],
    included: ["All living areas", "Bedrooms", "Kitchen surfaces", "Bathrooms"],
    excluded: ["Laundry", "Dishwashing", "Exterior windows"],
    faqs: [
      { question: "Do I need to be home during the cleaning?", answer: "No, many clients provide access instructions and are away during the service." },
      { question: "Do you bring your own supplies?", answer: "Yes, our team brings eco-friendly cleaning products and equipment." },
    ],
  },
  {
    title: "Commercial Cleaning",
    icon: "FaBuilding",
    shortDescription: "Professional cleaning for your business space.",
    description:
      "Maintain a spotless, professional environment for your employees and clients with our commercial cleaning packages, tailored to offices, retail stores and commercial facilities of any size.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200",
    price: 149,
    duration: "3-5 hours",
    features: ["Office desks & common areas", "Restroom sanitation", "Floor care", "Trash & recycling"],
    included: ["Workstations", "Break rooms", "Restrooms", "Reception areas"],
    excluded: ["IT equipment interiors", "Personal belongings"],
    faqs: [{ question: "Can you clean after business hours?", answer: "Yes, we offer flexible scheduling including evenings and weekends." }],
  },
  {
    title: "Deep Cleaning",
    icon: "FaSprayCan",
    shortDescription: "A complete clean for a healthier environment.",
    description:
      "Our deep cleaning service reaches every corner — behind appliances, inside cabinets, baseboards and grout — providing a thorough reset for your home or office.",
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=1200",
    price: 189,
    duration: "4-6 hours",
    features: ["Behind appliances", "Baseboards & grout", "Inside cabinets", "Detailed sanitizing"],
    included: ["Full property deep clean"],
    excluded: ["Carpet shampooing (add-on available)"],
    faqs: [{ question: "How often should I book a deep clean?", answer: "We recommend every 3-6 months for most homes." }],
  },
  {
    title: "Move In / Move Out Cleaning",
    icon: "FaTruckMoving",
    shortDescription: "Specialized cleaning for smooth transitions.",
    description:
      "Whether you're moving in or out, our team ensures the property is spotless and ready — perfect for tenants, landlords and homeowners during a move.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
    price: 199,
    duration: "3-5 hours",
    features: ["Empty property deep clean", "Cabinet & closet interiors", "Appliance cleaning", "Floor detailing"],
    included: ["Entire empty unit"],
    excluded: ["Furniture removal", "Repairs"],
    faqs: [{ question: "Does the property need to be empty?", answer: "Yes, an empty property allows us to clean every surface thoroughly." }],
  },
  {
    title: "Post-Construction Cleaning",
    icon: "FaHardHat",
    shortDescription: "Removes dust and debris for a fresh start.",
    description:
      "After a renovation or build, our post-construction cleaning removes dust, debris and residue so your space is safe and ready to use.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200",
    price: 249,
    duration: "5-8 hours",
    features: ["Dust removal", "Debris disposal", "Window & fixture cleaning", "Floor polishing"],
    included: ["Full site cleanup"],
    excluded: ["Structural debris removal", "Hazardous waste disposal"],
    faqs: [{ question: "Is this safe after painting?", answer: "Yes, we recommend waiting 24-48 hours after paint dries." }],
  },
  {
    title: "Custom Cleaning",
    icon: "FaClipboardList",
    shortDescription: "Tailored to your specific needs.",
    description:
      "Have unique cleaning requirements? Our custom cleaning plans are built around your schedule, property and priorities.",
    image: "https://images.unsplash.com/photo-1596178060810-72660ee8f27f?q=80&w=1200",
    price: 99,
    duration: "Varies",
    features: ["Fully customizable checklist", "Flexible frequency", "Add-on services available"],
    included: ["Whatever you need, we tailor it"],
    excluded: ["N/A - discuss during booking"],
    faqs: [{ question: "Can I combine multiple services?", answer: "Absolutely, just let us know your requirements when booking." }],
  },
  {
    title: "Bathroom Cleaning",
    icon: "FaBath",
    shortDescription: "Deep sanitizing for a spotless, germ-free bathroom.",
    description: "Focused bathroom cleaning covering tiles, grout, fixtures and sanitizing every surface.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200",
    price: 49,
    duration: "1 hour",
    features: ["Tile & grout scrubbing", "Fixture polishing", "Mirror & glass cleaning", "Disinfecting surfaces"],
    included: ["All bathroom surfaces"],
    excluded: ["Plumbing repairs"],
    faqs: [],
  },
  {
    title: "Kitchen Cleaning",
    icon: "FaUtensils",
    shortDescription: "Degreasing and sanitizing for a spotless kitchen.",
    description: "From countertops to appliance exteriors, we deep clean and sanitize your kitchen.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1200",
    price: 59,
    duration: "1-2 hours",
    features: ["Countertop degreasing", "Appliance exteriors", "Sink & faucet polishing", "Floor mopping"],
    included: ["All kitchen surfaces"],
    excluded: ["Inside oven (add-on available)"],
    faqs: [],
  },
  {
    title: "Office Cleaning",
    icon: "FaBriefcase",
    shortDescription: "Reliable cleaning for productive workspaces.",
    description: "Regular office cleaning to keep your workspace hygienic and welcoming for staff and clients.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200",
    price: 129,
    duration: "2-4 hours",
    features: ["Desk & surface cleaning", "Common area upkeep", "Restroom sanitation", "Waste disposal"],
    included: ["Full office space"],
    excluded: ["Server room equipment"],
    faqs: [],
  },
  {
    title: "Sofa & Upholstery Cleaning",
    icon: "FaCouch",
    shortDescription: "Restore freshness to sofas and upholstered furniture.",
    description: "Professional deep-cleaning for sofas, chairs and upholstered furniture to remove stains and odors.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200",
    price: 89,
    duration: "1-2 hours",
    features: ["Stain treatment", "Deep fabric extraction", "Odor removal", "Fabric-safe products"],
    included: ["Sofas, chairs, cushions"],
    excluded: ["Leather conditioning (add-on)"],
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

    const adminExists = await User.findOne({ email: adminEmail });
    if (!adminExists) {
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
