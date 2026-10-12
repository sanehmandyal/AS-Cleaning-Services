// Comprehensive verified service information for AS Cleaning Services
// Used as fallback & SEO baseline, preserving full dynamic override by admin database

export const verifiedServices = [
  {
    _id: "srv-deep-cleaning",
    id: "deep-cleaning",
    slug: "deep-cleaning",
    title: "Deep Cleaning",
    shortDescription: "Complete intensive sanitization for switchboards, hard-to-reach areas, baseboards, and deep grime.",
    description: "Our comprehensive deep cleaning service delivers an exhaustive, top-to-bottom reset for homes, apartments, villas, and commercial properties. We reach deep grime behind heavy appliances, inside cabinets, switchboards, door frames, baseboards, tile grout, and hidden crevices using hospital-grade sanitizers and high-efficiency particulate extraction.",
    icon: "FaBroom",
    image: "/images/services/deep-cleaning.jpg",
    price: 0,
    priceUnit: "starting at",
    duration: "4-6 hours",
    features: [
      "Behind & under heavy appliances sanitization",
      "Switchboards, baseboards, and door frames detailing",
      "Tile grout deep scrubbing and mechanical descaling",
      "Inside cabinet and drawer wiping and disinfection",
      "High-reach cobweb extraction and ceiling fixtures",
      "Window frames, tracks, and balcony washdown",
    ],
    included: [
      "All bedrooms, living spaces, and balconies",
      "Kitchen exterior, counters, sink, and degreasing",
      "All bathrooms complete descaling and sanitization",
      "Floor scrubbing and mechanical buffing",
    ],
    excluded: [
      "Structural masonry or civil repairs",
      "Interior wall repainting or wallpaper restoration",
      "Hazardous waste or heavy construction debris removal",
    ],
    process: [
      {
        step: 1,
        title: "Initial Property Inspection",
        desc: "Our cleaning supervisor assesses high-traffic grime points, delicate surfaces, and special customer focus areas.",
      },
      {
        step: 2,
        title: "Dry Dusting & HEPA Vacuuming",
        desc: "Thorough dry dust removal from ceiling fans, vents, switchboards, window tracks, and upholstery crevices.",
      },
      {
        step: 3,
        title: "Intensive Scrubbing & Degreasing",
        desc: "Eco-friendly, food-safe degreasers and descalers applied to kitchens, bathrooms, tiles, and high-grime zones.",
      },
      {
        step: 4,
        title: "Mechanical Floor Buffing & Sanitization",
        desc: "Machine rotary buffing of hard floors and final hospital-grade disinfectant spray over touchpoints.",
      },
      {
        step: 5,
        title: "Supervised Quality Audit",
        desc: "Supervisor walkthrough with customer checklist before handover to ensure 100% satisfaction.",
      },
    ],
    faqs: [
      {
        question: "How long does a full home deep clean take?",
        answer: "A standard 2 to 3 BHK apartment takes between 4 to 6 hours with a dedicated crew of 3 to 4 trained cleaning specialists.",
      },
      {
        question: "Do you bring your own cleaning machines and solutions?",
        answer: "Yes, our team brings industrial single-disc buffing machines, wet & dry extraction vacuums, ladders, microfibers, and non-toxic, eco-friendly chemicals.",
      },
      {
        question: "How frequently should a home or office have a deep clean?",
        answer: "We recommend a deep clean every 3 to 6 months to prevent allergen buildup, mold spores, and persistent tile limescale.",
      },
    ],
    relatedSlugs: ["home-cleaning", "bathroom-cleaning", "kitchen-cleaning", "water-tank-cleaning"],
  },
  {
    _id: "srv-water-tank-cleaning",
    id: "water-tank-cleaning",
    slug: "water-tank-cleaning",
    title: "Water Tank Cleaning",
    shortDescription: "High-pressure rotary de-sludging and food-grade disinfectant scrub for pure, hygienic water storage.",
    description: "Our 5-stage scientific water tank cleaning eliminates toxic sediment, algae biofilms, silt, and bacterial pathogens from overhead plastic Sintex tanks and underground concrete storage reservoirs using high-pressure rotary jets and food-grade UV/disinfectant treatment.",
    icon: "FaWater",
    image: "/images/services/water-tank-cleaning.jpg",
    price: 0,
    priceUnit: "starting at",
    duration: "1-2 hours",
    features: [
      "Submersible high-flow automatic de-watering",
      "Rotary high-pressure jet sludge dislodging",
      "Food-grade antibacterial wall scrubbing",
      "Industrial vacuum extraction of leftover sediment",
      "Ultra-hygienic overhead and underground tank servicing",
      "Zero chemical residue safe for immediate drinking water usage",
    ],
    included: [
      "Overhead PVC, Sintex, or stainless steel tanks",
      "Underground RCC concrete water reservoirs",
      "Wall, ceiling, and base scrub & rinse",
      "Pre and post tank inspection report",
    ],
    excluded: [
      "External underground plumbing line replacement",
      "Major civil masonry cracks in concrete tanks",
    ],
    process: [
      {
        step: 1,
        title: "Rapid De-Watering",
        desc: "Draining dirty water using heavy-duty submersible slurry pumps while protecting household connections.",
      },
      {
        step: 2,
        title: "Sludge & Silt Extraction",
        desc: "Vacuum removal of accumulated clay, sand, rust, and bottom sludge layer without scratching tank walls.",
      },
      {
        step: 3,
        title: "High-Pressure Rotary Jetting",
        desc: "150-bar rotary water jets strip stubborn microbial biofilms, algae patches, and scale from all internal walls.",
      },
      {
        step: 4,
        title: "Food-Grade Disinfection",
        desc: "Application of certified non-toxic, odorless food-grade disinfectant spray to neutralize bacteria and spores.",
      },
      {
        step: 5,
        title: "Clean Rinse & Inspection",
        desc: "Final pure water wash and supervisor clearance ensuring crystal clear water storage readiness.",
      },
    ],
    faqs: [
      {
        question: "Is the disinfectant safe for drinking water?",
        answer: "Yes, 100%. We exclusively use food-grade, biodegradable, non-toxic sanitizing agents that leave zero residual odor or taste once refilled.",
      },
      {
        question: "How often should drinking water tanks be cleaned in Zirakpur and Mohali?",
        answer: "Municipal and groundwater supplies in the Tricity area carry fine silt and minerals. We strongly advise cleaning water storage tanks every 6 months.",
      },
      {
        question: "Do you clean both underground sumps and overhead rooftop tanks?",
        answer: "Yes, our technicians are certified for confined-space cleaning of underground RCC sumps as well as rooftop Sintex/plastic tanks.",
      },
    ],
    relatedSlugs: ["deep-cleaning", "home-cleaning", "bathroom-cleaning"],
  },
  {
    _id: "srv-home-cleaning",
    id: "home-cleaning",
    slug: "home-cleaning",
    title: "Home & Villa Cleaning",
    shortDescription: "Comprehensive recurring and one-off house sanitation including bedrooms, balconies, and living rooms.",
    description: "Designed for residential homes, independent villas, and luxury apartments across Zirakpur, Mohali, and Chandigarh. Our skilled cleaners revitalize all living spaces, bedrooms, dining halls, balconies, and entry foyers with gentle yet deep-cleaning techniques safe for kids and pets.",
    icon: "FaHome",
    image: "/images/services/home-cleaning.jpg",
    price: 0,
    priceUnit: "starting at",
    duration: "3-5 hours",
    features: [
      "Full bedroom & living room dust extraction",
      "Window glass, frames, and balcony railing detailing",
      "Ceiling fan blades, light fixtures, and wall art dusting",
      "Mattress and sofa high-suction dust mite purge",
      "Eco-friendly pet-safe deodorizing treatment",
      "Floor scrubbing and wood/tile shine conditioning",
    ],
    included: [
      "All master & guest bedrooms",
      "Living, dining, and family entertainment halls",
      "Balconies, utility zones, and entry foyer",
      "Wardrobes exterior and visible shelves",
    ],
    excluded: [
      "Personal laundry or clothes ironing",
      "Washing dishes or cooking utensils",
    ],
    process: [
      {
        step: 1,
        title: "Top-to-Bottom Dusting",
        desc: "Starting from ceiling fans, AC vents, and cornices down to furniture surfaces and floor skirting.",
      },
      {
        step: 2,
        title: "Glass & Balcony Cleaning",
        desc: "Streak-free window glass polishing and pressure washing of exterior balconies and grills.",
      },
      {
        step: 3,
        title: "Furniture & Crevice Care",
        desc: "Vacuuming sofas, mattresses, and cushions to eliminate settled dust and allergen particles.",
      },
      {
        step: 4,
        title: "Floor Mopping & Buffing",
        desc: "Antiseptic floor wash with pH-neutral solutions preserving shine on marble, vitrified tiles, and wooden laminate.",
      },
    ],
    faqs: [
      {
        question: "Can I book a recurring weekly or monthly home clean?",
        answer: "Yes, we provide both flexible one-time deep resets and scheduled bi-weekly or monthly maintenance packages.",
      },
      {
        question: "Are your cleaning agents safe for infants and pets?",
        answer: "Absolutely. All our cleaning formulations are eco-friendly, hypoallergenic, non-corrosive, and zero-VOC.",
      },
    ],
    relatedSlugs: ["deep-cleaning", "sofa-cleaning", "kitchen-cleaning", "bathroom-cleaning"],
  },
  {
    _id: "srv-bathroom-cleaning",
    id: "bathroom-cleaning",
    slug: "bathroom-cleaning",
    title: "Bathroom Cleaning",
    shortDescription: "Targeted hard-water scale removal, high-pressure grout scrubbing, mirror polish, and fixture disinfection.",
    description: "Hard water scale and soap scum build up rapidly on shower partitions, chrome taps, washbasins, and ceramic tile joints. Our intensive bathroom sanitization dissolves stubborn calcium rings, descales glass enclosures, sanitizes toilet bowls, and restores pristine shine.",
    icon: "FaBath",
    image: "/images/services/bathroom-cleaning.jpg",
    price: 0,
    priceUnit: "starting at",
    duration: "1-2 hours",
    features: [
      "Heavy hard-water stain & limescale descaling",
      "Shower glass partition crystal-clear scale removal",
      "Tile grout pressure brushing and stain lifting",
      "Sanitary ware, toilet bowl, and bidet descaling",
      "Chrome taps, showerheads, and vanity mirror polishing",
      "Exhaust fan degreasing and drain odor neutralization",
    ],
    included: [
      "Tiles, floor, and ceiling corners",
      "Glass partitions and mirrors",
      "Taps, fixtures, and sanitary fittings",
      "Exhaust fan exterior and drain covers",
    ],
    excluded: [
      "Plumbing pipe replacement or unclogging sewer blockages",
      "Tile re-grouting or re-tiling masonry work",
    ],
    process: [
      {
        step: 1,
        title: "Scale Softening Pre-Treatment",
        desc: "Application of specialized descaling gels on shower glass, faucets, and tile borders to break calcium bonds.",
      },
      {
        step: 2,
        title: "Grout & Surface Scrubbing",
        desc: "Rotary and hand mechanical brushing of all tile seams, corners, and basin contours.",
      },
      {
        step: 3,
        title: "Fixture Polishing",
        desc: "Buffing chrome faucets, taps, and showerheads with non-abrasive polishes for a like-new reflective finish.",
      },
      {
        step: 4,
        title: "Hospital-Grade Sanitization",
        desc: "Germicidal disinfectant spray on high-contact zones, toilet seats, and door knobs.",
      },
    ],
    faqs: [
      {
        question: "Can you remove years-old hard water stains from shower glass?",
        answer: "Yes, our specialized calcium dissolvers safely lift stubborn mineral crusts without etching or scratching the tempered glass.",
      },
      {
        question: "How long does a bathroom cleaning session take?",
        answer: "Typically 60 to 90 minutes per bathroom depending on the level of limescale accumulation.",
      },
    ],
    relatedSlugs: ["deep-cleaning", "home-cleaning", "kitchen-cleaning", "floor-cleaning"],
  },
  {
    _id: "srv-kitchen-cleaning",
    id: "kitchen-cleaning",
    slug: "kitchen-cleaning",
    title: "Kitchen Cleaning",
    shortDescription: "Specialized degreasing for oily chimney hoods, gas burners, exhaust fans, sink drains, and cabinets.",
    description: "Cooking oils, spices, and carbon deposits create sticky yellow residues on kitchen chimney filters, gas stoves, tiled backsplashes, and overhead cabinetry. Our kitchen deep degreasing service strips grease from appliance surfaces, cleans modular cabinets, and disinfects prep zones.",
    icon: "FaUtensils",
    image: "/images/services/kitchen-cleaning.jpg",
    price: 0,
    priceUnit: "starting at",
    duration: "2-3 hours",
    features: [
      "Electric chimney filter removal and chemical degreasing",
      "Gas stove burners, knobs, and backsplash tile stripping",
      "Modular cabinet exterior and interior sanitization",
      "Exhaust fan blade degreasing and motor casing wipe",
      "Stainless steel sink descaling and drain pipe freshening",
      "Microwave, refrigerator exterior, and countertop polish",
    ],
    included: [
      "Chimney exterior and baffle/mesh filters",
      "Stove, countertops, and tiled walls",
      "Cabinets exteriors and handles",
      "Kitchen floor scrubbing and degreasing",
    ],
    excluded: [
      "Internal electronic repairs of kitchen appliances",
      "Pest control fumigation (available as separate add-on)",
    ],
    process: [
      {
        step: 1,
        title: "Chimney Filter Dismantling",
        desc: "Removing baffle filters and soaking them in industrial food-safe grease-dissolving baths.",
      },
      {
        step: 2,
        title: "Backsplash & Countertop Degreasing",
        desc: "Active degreaser foam application across tiles, granite counters, gas stove knobs, and exhaust vents.",
      },
      {
        step: 3,
        title: "Cabinet & Surface Detailing",
        desc: "Careful wiping of modular laminate and acrylic cabinets with microfiber cloths to prevent moisture damage.",
      },
      {
        step: 4,
        title: "Sink & Floor Anti-Bacterial Wash",
        desc: "Descaling sink bowls, sanitizing drain traps, and deep scrubbing floor tiles to eliminate slippery oil film.",
      },
    ],
    faqs: [
      {
        question: "Do I need to empty all cabinets before the kitchen clean?",
        answer: "For exterior and countertop cleaning, no. If you require full internal cabinet sanitization, we recommend moving pantry items to a table.",
      },
      {
        question: "Does this include cleaning the chimney filter?",
        answer: "Yes, removing, soaking, and degreasing the chimney baffle/mesh filters is included in our kitchen package.",
      },
    ],
    relatedSlugs: ["deep-cleaning", "home-cleaning", "bathroom-cleaning", "floor-cleaning"],
  },
  {
    _id: "srv-sofa-cleaning",
    id: "sofa-cleaning",
    slug: "sofa-cleaning",
    title: "Sofa Cleaning",
    shortDescription: "Deep fabric shampooing, high-suction extraction vacuuming, allergen purging, and upholstery protection.",
    description: "Dust mites, body sweat, accidental food spills, and pet dander penetrate deep into fabric cushions and leather upholstery. Our specialized upholstery injection-extraction treatment cleans down to the cushion core, lifting embedded grime and refreshing fabric brightness.",
    icon: "FaCouch",
    image: "/images/services/sofa-cleaning.jpg",
    price: 0,
    priceUnit: "starting at",
    duration: "1-2 hours",
    features: [
      "High-power commercial suction dry extraction",
      "Fabric-safe conditioning foam shampooing",
      "Deep injection-extraction stain removal",
      "Dust mite, allergen, and odor neutralization",
      "Leather sofa conditioning and moisture protection",
      "Fast-drying technology with 2-4 hour turnaround",
    ],
    included: [
      "Fabric, velvet, suede, and leather sofas",
      "Back cushions, seat pads, and armrests",
      "Recliner and ottoman upholstery",
    ],
    excluded: [
      "Repairing torn stitching or fabric tears",
      "Permanent ink or bleach damage dye restoration",
    ],
    process: [
      {
        step: 1,
        title: "Fabric Analysis & Dry Extraction",
        desc: "Testing fabric sensitivity and vacuuming deep dust, hair, and crumbs from seams and base crevices.",
      },
      {
        step: 2,
        title: "Stain Pre-Treatment",
        desc: "Targeted spotting agents applied to tea, coffee, ink, grease, and pet stains.",
      },
      {
        step: 3,
        title: "Rotary Brush Shampooing",
        desc: "Gentle mechanical agitation with pH-balanced upholstery foam that suspends dirt without soaking the padding.",
      },
      {
        step: 4,
        title: "High-Suction Moisture Extraction",
        desc: "Simultaneous rinse and powerful water extraction removing 90% of moisture for accelerated drying.",
      },
    ],
    faqs: [
      {
        question: "How long before the sofa is completely dry to sit on?",
        answer: "With our high-power moisture extraction, fabric sofas dry within 3 to 4 hours under normal ceiling fan ventilation.",
      },
      {
        question: "Can you clean genuine leather and faux leather sofas?",
        answer: "Yes, we use pH-neutral leather cleansers followed by rich conditioning creams that nourish the hide and prevent cracks.",
      },
    ],
    relatedSlugs: ["home-cleaning", "deep-cleaning", "floor-cleaning"],
  },
  {
    _id: "srv-floor-cleaning",
    id: "floor-cleaning",
    slug: "floor-cleaning",
    title: "Floor Cleaning",
    shortDescription: "Industrial single-disc machine scrubbing, tile grout descaling, and high-gloss buffing for tiles & marble.",
    description: "Flooring takes the brunt of everyday foot traffic, hard water mop streaks, and ground-in dust. Our floor restoration and machine scrubbing service utilizes industrial single-disc rotary machines with diamond and nylon pads to restore the mirror sheen of marble, granite, vitrified tiles, and terrazzo.",
    icon: "FaBroom",
    image: "/images/services/floor-cleaning.jpg",
    price: 0,
    priceUnit: "starting at",
    duration: "2-3 hours",
    features: [
      "Heavy-duty single-disc mechanical rotary buffing",
      "Deep tile joint & grout line sediment extraction",
      "Marble & vitrified tile crystalline gloss enhancement",
      "Stubborn paint drop, glue, and mortar stain removal",
      "Eco-friendly anti-slip conditioning wash",
      "Protective surface sealant application for lasting shine",
    ],
    included: [
      "Italian marble, Indian marble, and granite",
      "Vitrified, ceramic, and porcelain tiles",
      "Kota stone, terrazzo, and epoxy floors",
    ],
    excluded: [
      "Deep diamond stone grinding for cracked/broken slabs",
      "Carpet extraction (covered under upholstery)",
    ],
    process: [
      {
        step: 1,
        title: "Debris Sweeping & Edging",
        desc: "Clearing surface grit and pre-treating stubborn paint specks, tape adhesive, and rust marks along baseboards.",
      },
      {
        step: 2,
        title: "Rotary Machine Scrubbing",
        desc: "Heavy single-disc machine scrub with specialized cleaning solution lifting ground-in dirt from tile micro-pores.",
      },
      {
        step: 3,
        title: "Slurry Vacuum Extraction",
        desc: "Wet vacuuming all dirty slurry instantly so contaminated liquid is not reabsorbed into grout lines.",
      },
      {
        step: 4,
        title: "High-Gloss Buffing & Conditioning",
        desc: "White pad high-speed buffing for brilliant optical clarity and non-slip protective finish.",
      },
    ],
    faqs: [
      {
        question: "Will machine scrubbing make the floor slippery?",
        answer: "No. Our cleaning pads remove slippery oily films and use anti-slip pH-balanced conditioners.",
      },
      {
        question: "Can you clean floor grout lines that have turned black?",
        answer: "Yes, our mechanical rotary scrubbers and specialized grout cleaners penetrate deep into porous grout to restore its original clean tone.",
      },
    ],
    relatedSlugs: ["deep-cleaning", "property-cleaning", "home-cleaning"],
  },
  {
    _id: "srv-property-cleaning",
    id: "property-cleaning",
    slug: "property-cleaning",
    title: "Property Cleaning",
    shortDescription: "Full turnover sanitization for vacant properties, post-lease handovers, and move-in/move-out deep detailing.",
    description: "Moving into a new home or preparing an apartment for new tenants requires an exhaustive handover clean. Our property turnover service cleans every wardrobe interior, balcony, bathroom, kitchen shelf, and light fixture, ensuring a 100% spotless, hygienic move-in experience.",
    icon: "FaBuilding",
    image: "/images/services/property-cleaning.jpg",
    price: 0,
    priceUnit: "starting at",
    duration: "4-6 hours",
    features: [
      "Wall-to-wall handover detailing for vacant flats & villas",
      "Complete wardrobe, modular closet, and shelf disinfection",
      "Balcony power wash, sliding door tracks, and window polish",
      "Full kitchen & bathroom deep sanitization",
      "Turnover inspection checklist for landlords and tenants",
      "Ready-to-move-in fresh fragrance and hygiene seal",
    ],
    included: [
      "Complete vacant residential property or commercial office",
      "All cupboards, wardrobes, and modular storage interiors",
      "All attached bathrooms and kitchen",
      "Balconies, utility, and main entrance",
    ],
    excluded: [
      "Heavy masonry construction debris removal",
      "Disposal of leftover broken furniture left by previous tenants",
    ],
    process: [
      {
        step: 1,
        title: "Comprehensive Vacant Audit",
        desc: "Checking all rooms, cupboards, window tracks, and plumbing fixtures for dust accumulation and stain hotspots.",
      },
      {
        step: 2,
        title: "Wardrobe & Storage Interior Sanitation",
        desc: "Microfiber wiping and sanitizing of all inside shelves, drawers, hanging rods, and mirrors.",
      },
      {
        step: 3,
        title: "Full Kitchen & Restroom Deep Reset",
        desc: "Degreasing kitchen slabs, descaling bathroom tiles, and polishing chrome fittings to showhome condition.",
      },
      {
        step: 4,
        title: "Windows, Balconies & Final Floor Polish",
        desc: "Cleaning all sliding tracks, washing balconies, and machine buffing the floors for move-in readiness.",
      },
    ],
    faqs: [
      {
        question: "When is the best time to book a move-in or move-out clean?",
        answer: "We recommend scheduling the cleaning after moving trucks have cleared out personal items or 1 to 2 days before your furniture arrives.",
      },
      {
        question: "Do landlords and property managers accept your cleaning standard for security deposit return?",
        answer: "Yes! Our detailed checklist meets and exceeds rental handover criteria across societies in Zirakpur, Mohali, and Chandigarh.",
      },
    ],
    relatedSlugs: ["deep-cleaning", "floor-cleaning", "home-cleaning", "water-tank-cleaning"],
  },
];

// Helper to find a service by slug or id
export const getVerifiedServiceBySlug = (slugOrId) => {
  if (!slugOrId) return null;
  const normalized = slugOrId.toString().toLowerCase().trim();
  return (
    verifiedServices.find(
      (s) =>
        s.slug.toLowerCase() === normalized ||
        s.id.toLowerCase() === normalized ||
        s._id.toLowerCase() === normalized
    ) || null
  );
};
