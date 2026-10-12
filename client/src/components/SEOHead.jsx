import { useEffect } from "react";

const BASE_URL = "https://as-cleaning-services.vercel.app";
const DEFAULT_TITLE = "AS Cleaning Services | Clean Spaces. Healthy Lives.";
const DEFAULT_DESC =
  "AS Cleaning Services offers professional residential, commercial, water tank, and deep cleaning services across Zirakpur, Mohali, Chandigarh & Tricity. Trained staff, eco-friendly products, 100% satisfaction guaranteed.";
const DEFAULT_IMAGE = `${BASE_URL}/images/services/deep-cleaning.jpg`;

/**
 * Helper to get or create a <meta> or <link> tag
 */
const setMetaTag = (attrName, attrValue, content) => {
  if (!content) return;
  let element = document.head.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
};

const setCanonicalLink = (url) => {
  let element = document.head.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }
  element.setAttribute("href", url);
};

const setJsonLdSchema = (schemaData) => {
  let script = document.head.querySelector('script[id="seo-schema"]');
  if (!schemaData) {
    if (script) script.remove();
    return;
  }
  if (!script) {
    script = document.createElement("script");
    script.setAttribute("id", "seo-schema");
    script.setAttribute("type", "application/ld+json");
    document.head.appendChild(script);
  }
  try {
    script.textContent = JSON.stringify(schemaData);
  } catch (err) {
    console.error("Schema serialization error:", err);
  }
};

const SEOHead = ({
  title,
  description = DEFAULT_DESC,
  canonicalPath = "",
  keywords = "cleaning services, water tank cleaning, deep cleaning, home cleaning, bathroom cleaning, kitchen degreasing, sofa cleaning, floor buffing, Zirakpur, Mohali, Chandigarh",
  ogImage = DEFAULT_IMAGE,
  ogType = "website",
  schema = null,
}) => {
  useEffect(() => {
    // 1. Document Title
    const fullTitle = title
      ? `${title} | AS Cleaning Services`
      : DEFAULT_TITLE;
    document.title = fullTitle;

    // 2. Primary Meta Tags
    setMetaTag("name", "description", description);
    setMetaTag("name", "keywords", keywords);

    // 3. Canonical URL
    const canonicalUrl = `${BASE_URL}${canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`}`;
    setCanonicalLink(canonicalUrl);

    // 4. Open Graph Tags
    setMetaTag("property", "og:title", fullTitle);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:url", canonicalUrl);
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:image", ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`);
    setMetaTag("property", "og:site_name", "AS Cleaning Services");

    // 5. Twitter Card Tags
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", fullTitle);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`);

    // 6. Schema.org JSON-LD
    if (schema) {
      setJsonLdSchema(schema);
    }

    return () => {
      // Optional cleanup on component unmount
    };
  }, [title, description, canonicalPath, keywords, ogImage, ogType, schema]);

  return null;
};

export default SEOHead;
