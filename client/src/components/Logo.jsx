import React from "react";
import { Link } from "react-router-dom";

export const LogoIcon = ({ className = "w-10 h-10" }) => {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="as-blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="50%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>
        <linearGradient id="as-glow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0EA5E9" />
        </linearGradient>
      </defs>

      {/* Sparkles on top left */}
      {/* Sparkle 1 */}
      <path
        d="M 52 24 Q 52 35 41 35 Q 52 35 52 46 Q 52 35 63 35 Q 52 35 52 24 Z"
        fill="#38BDF8"
      />
      {/* Sparkle 2 */}
      <path
        d="M 68 12 Q 68 18 62 18 Q 68 18 68 24 Q 68 18 74 18 Q 68 18 68 12 Z"
        fill="#38BDF8"
      />
      {/* Sparkle 3 */}
      <path
        d="M 36 42 Q 36 46 32 46 Q 36 46 36 50 Q 36 46 40 46 Q 36 46 36 42 Z"
        fill="#38BDF8"
      />

      {/* Letter A with House cutout */}
      {/* Outer A shape */}
      <path
        d="M 65 38 
           L 10 148 
           L 44 148 
           L 56 122 
           L 96 122 
           L 96 148 
           L 122 148 
           L 85 38 
           Z 
           M 72 72 
           L 88 104 
           L 60 104 
           Z"
        fill="url(#as-blue-grad)"
      />

      {/* House Silhouette & Arch Cutout in A base */}
      <path
        d="M 46 148 
           L 46 130 
           L 62 114 
           L 78 130 
           L 78 148 
           Z"
        fill="white"
      />
      <path
        d="M 54 148 
           A 8 8 0 0 1 70 148 
           Z"
        fill="#0284C7"
      />

      {/* Letter S swooping into broom head */}
      <path
        d="M 166 60 
           C 166 45 152 38 134 38 
           C 112 38 98 48 98 64 
           C 98 80 112 88 132 94 
           C 152 100 162 108 162 120 
           C 162 136 144 144 126 144 
           C 112 144 98 138 90 130 
           L 80 148 
           C 92 160 110 166 128 166 
           C 158 166 186 150 186 120 
           C 186 98 170 88 148 82 
           C 128 76 118 70 118 58 
           C 118 48 128 44 136 44 
           C 146 44 156 50 160 56 
           Z"
        fill="url(#as-blue-grad)"
      />

      {/* Broom Head & Bristles swooshing around S */}
      {/* Broom Ring / Band */}
      <path
        d="M 158 138 
           L 174 136 
           L 177 144 
           L 160 147 
           Z"
        fill="#38BDF8"
      />
      {/* Broom Bristles */}
      <path
        d="M 162 148 
           C 172 152 186 160 196 174 
           L 178 180 
           C 170 168 160 160 152 156 
           Z"
        fill="url(#as-blue-grad)"
      />
      <path
        d="M 168 148 
           C 176 156 184 168 188 182 
           L 174 184 
           C 168 172 160 162 154 156 
           Z"
        fill="#0284C7"
      />
      <path
        d="M 155 152 
           C 150 164 144 176 134 186 
           L 124 180 
           C 134 170 142 160 148 150 
           Z"
        fill="#0284C7"
      />
      <path
        d="M 148 155 
           C 140 168 128 178 114 186 
           L 106 178 
           C 120 170 132 160 140 150 
           Z"
        fill="#0284C7"
      />
    </svg>
  );
};

export const Logo = ({ variant = "dark", size = "normal", showTagline = true, to = "/" }) => {
  const isLight = variant === "light";
  
  const content = (
    <div className="flex items-center gap-2 sm:gap-2.5 select-none group">
      <div className="relative shrink-0 transition-transform duration-300 group-hover:scale-105">
        <LogoIcon className={size === "large" ? "w-10 h-10 sm:w-12 sm:h-12" : size === "small" ? "w-7 h-7 sm:w-8 sm:h-8" : "w-8 h-8 sm:w-10 sm:h-10"} />
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
