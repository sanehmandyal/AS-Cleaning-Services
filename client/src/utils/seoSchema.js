const BASE_URL = "https://as-cleaning-services.vercel.app";

export const buildLocalBusinessSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "AS Cleaning Services",
    image: `${BASE_URL}/images/services/deep-cleaning.jpg`,
    "@id": `${BASE_URL}/#organization`,
    url: BASE_URL,
    telephone: "+91-6280016815",
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: "VIP Road / High Ground Service Hub",
      addressLocality: "Zirakpur",
      addressRegion: "Punjab",
      postalCode: "140603",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 30.6425,
      longitude: 76.8173,
    },
    areaServed: [
      { "@type": "City", name: "Zirakpur" },
      { "@type": "City", name: "Mohali" },
      { "@type": "City", name: "Chandigarh" },
      { "@type": "City", name: "Panchkula" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    sameAs: [
      "https://wa.me/916280016815",
    ],
  };
};

export const buildServiceSchema = (service) => {
  if (!service) return null;
  const canonicalUrl = `${BASE_URL}/services/${service.slug || service.id}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.title} in Zirakpur, Mohali & Chandigarh`,
    serviceType: service.title,
    description: service.description || service.shortDescription,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: "AS Cleaning Services",
      telephone: "+91-6280016815",
      url: BASE_URL,
    },
    areaServed: [
      { "@type": "City", name: "Zirakpur" },
      { "@type": "City", name: "Mohali" },
      { "@type": "City", name: "Chandigarh" },
      { "@type": "City", name: "Panchkula" },
    ],
    url: canonicalUrl,
    image: service.image?.startsWith("http")
      ? service.image
      : `${BASE_URL}${service.image}`,
  };
};

export const buildBreadcrumbSchema = (crumbs = []) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: crumb.name,
      item: crumb.url.startsWith("http") ? crumb.url : `${BASE_URL}${crumb.url}`,
    })),
  };
};

export const buildFaqSchema = (faqs = []) => {
  if (!faqs || faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
};
