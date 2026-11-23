"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const CLIENT_NAMES = [
  "MOOPLE",
  "SRI SIKHAYATAN",
  "CEEBEE DESIGN STUDIO",
  "ADAMAS",
  "SASSYA",
  "NARAYANA",
  "I-LEAD",
  "BEYUVANA",
];

function MarqueeTrack({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden}
      className="flex shrink-0 items-center gap-12 pr-12 sm:gap-16 sm:pr-16"
    >
      {CLIENT_NAMES.map((name) => (
        <li key={name} className="flex shrink-0 items-center gap-12 sm:gap-16">
          <span className="font-heading text-[15px] font-semibold tracking-[0.18em] text-[#525252] transition-colors duration-300 hover:text-[#000000] sm:text-base">
            {name}
          </span>
          <span
            aria-hidden="true"
            className="inline-block h-1.5 w-1.5 shrink-0 bg-[#d4d4d4]"
          />
        </li>
      ))}
    </ul>
  );
}

export default function ClientMarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackWrapRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      const trackEl = trackWrapRef.current;
      if (!trackEl) return;

      gsap.set(trackEl, { xPercent: 0, force3D: true });

      tweenRef.current = gsap.to(trackEl, {
        xPercent: -50,
        duration: 22,
        ease: "none",
        repeat: -1,
        force3D: true,
      });
    },
    { scope: sectionRef }
  );

  const handleMouseEnter = () => {
    if (!tweenRef.current) return;
    gsap.to(tweenRef.current, { timeScale: 0.25, duration: 0.4, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    if (!tweenRef.current) return;
    gsap.to(tweenRef.current, { timeScale: 1, duration: 0.4, ease: "power2.out" });
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Trusted Clients"
      className="relative overflow-hidden border-b border-[#e5e5e5] bg-[#f5f5f5]"
    >
      <div className="container mx-auto px-6 py-8 lg:px-10 lg:py-9">
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="overflow-hidden"
        >
          <div
            ref={trackWrapRef}
            className="flex w-max items-center will-change-transform"
          >
            <MarqueeTrack />
            <MarqueeTrack hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
