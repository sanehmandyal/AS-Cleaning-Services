import React from "react";
import { Link } from "react-router-dom";

export const LogoIcon = ({ className = "w-10 h-10", alt = "AS Cleaning Services Logo" }) => {
  return (
    <img
      src="/images/logo.png"
      alt={alt}
      className={`object-contain rounded-full drop-shadow-xs shrink-0 select-none ${className}`}
      loading="eager"
      decoding="async"
    />
  );
};

export const Logo = ({ variant = "dark", size = "normal", showTagline = true, to = "/" }) => {
  const isLight = variant === "light";
  
  const content = (
    <div className="flex items-center gap-2 sm:gap-2.5 select-none group">
      <div className="relative shrink-0 transition-transform duration-300 group-hover:scale-105">
        <LogoIcon className={size === "large" ? "w-12 h-12 sm:w-14 sm:h-14" : size === "small" ? "w-8 h-8 sm:w-9 sm:h-9" : "w-9 h-9 sm:w-11 sm:h-11"} />
      </div>
      <div className="flex flex-col justify-center leading-none">
        <span
          className={`font-display font-extrabold tracking-tight ${
            size === "large"
              ? "text-xl sm:text-2xl"
              : size === "small"
              ? "text-sm sm:text-base"
              : "text-base sm:text-lg lg:text-xl"
          } ${isLight ? "text-white" : "text-[#0F172A]"}`}
        >
          AS <span className="text-[#0284C7]">CLEANING SERVICES</span>
        </span>
        {showTagline && (
          <span
            className={`font-semibold tracking-[0.18em] uppercase mt-0.5 ${
              size === "large" ? "text-[8.5px] sm:text-[10px]" : "text-[7.5px] sm:text-[8.5px]"
            } ${isLight ? "text-sky-300" : "text-[#0284C7]"}`}
          >
            CLEAN SPACES • HEALTHY LIVES
          </span>
        )}
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="inline-block">
        {content}
      </Link>
    );
  }

  return content;
};

export default Logo;
