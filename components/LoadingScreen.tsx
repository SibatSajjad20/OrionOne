"use client";

import { forwardRef } from "react";

interface LoadingScreenProps {
  progress: number;
  className?: string;
}

const LoadingScreen = forwardRef<HTMLDivElement, LoadingScreenProps>(
  ({ progress, className = "" }, ref) => {
    return (
      <div
        ref={ref}
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center select-none pointer-events-auto touch-none bg-[#153D3D] ${className}`}
        style={{
          background:
            "radial-gradient(circle at 50% 45%, #1c4e4e 0%, #153D3D 50%, #081a1a 100%)",
        }}
      >
        {/* Subtle pure white ambient glow directly behind the 3D rotating Sub Mark */}
        <div className="absolute top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />

        {/* Transparent Spacer for the 3D rotating Sub Mark in screen center */}
        <div className="w-44 h-44 sm:w-56 sm:h-56 pointer-events-none" />

        {/* Understated Quiet Luxury Typography */}
        <div className="flex flex-col items-center text-center mt-3 sm:mt-4 space-y-2">
          <span className="font-serif text-base sm:text-lg tracking-[0.28em] text-[#EDE5DA] font-light uppercase">
            Orion One
          </span>

          {/* Minimal Loading Indicator */}
          <div className="flex items-center gap-2.5 text-[10px] sm:text-[11px] tracking-[0.35em] text-[#62AA9E] uppercase font-sans-body font-medium">
            <span>Loading</span>
            <span className="text-[#EDE5DA]/30 text-[8px]">•</span>
            <span className="tabular-nums text-[#EDE5DA]/85">{progress}%</span>
          </div>
        </div>
      </div>
    );
  }
);

LoadingScreen.displayName = "LoadingScreen";

export default LoadingScreen;
