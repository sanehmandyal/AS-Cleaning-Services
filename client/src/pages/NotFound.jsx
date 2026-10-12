import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaBroom } from "react-icons/fa";
import SEOHead from "../components/SEOHead";

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <SEOHead
        title="404 - Page Not Found"
        description="The requested page could not be found. Return to AS Cleaning Services home or explore our professional cleaning services."
      />
      <p className="text-7xl font-bold text-primary-light mb-2">404</p>
      <h1 className="text-2xl font-bold text-ink mb-3">Page Not Found</h1>
      <p className="text-ink/60 mb-8 max-w-sm">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link to="/" className="btn-primary">
        <FaHome /> Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
