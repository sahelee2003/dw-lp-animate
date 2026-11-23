"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(useGSAP);

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#work" },
  { label: "Industries", href: "#industries" },
  { label: "Contact", href: "#contact" },
];

function BrandMark() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#000000] font-heading text-[12px] font-bold tracking-[-0.04em] text-[#ffffff]"
    >
      DW
    </span>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".nav-reveal", {
          y: -12,
          opacity: 0,
          duration: 0.7,
          stagger: 0.05,
          ease: "power3.out",
          clearProps: "transform,opacity",
        });
      });

      return () => mm.revert();
    },
    { scope: headerRef }
  );

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full border-b border-[#e5e5e5] bg-[#ffffff]"
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-6 lg:px-10">
        {/* Brand */}
        <a
          href="#home"
          aria-label="DW — Digital Wolf Home"
          className="nav-reveal group inline-flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#000000]"
        >
          <span className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105">
            <BrandMark />
          </span>
          <span className="font-heading text-[15px] font-semibold tracking-[0.14em] text-[#000000]">
            DIGITAL WOLF
          </span>
        </a>

        {/* Desktop Nav + CTA */}
        <div className="hidden items-center gap-9 lg:flex">
          <nav aria-label="Primary Navigation">
            <ul className="flex items-center gap-7">
              {NAV_LINKS.map((item) => (
                <li key={item.label} className="nav-reveal">
                  <a
                    href={item.href}
                    className="group relative py-1 text-[13.5px] font-normal text-[#525252] transition-colors duration-200 hover:text-[#000000]"
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-[#000000] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav-reveal">
            <MagneticButton
              href="#contact"
              variant="primary"
              size="sm"
              arrow="right"
            >
              Let&apos;s talk
            </MagneticButton>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#e5e5e5] bg-[#ffffff] text-[#000000] transition-colors hover:border-[#000000] lg:hidden"
        >
          <span className="sr-only">Menu</span>
          <span className="flex flex-col gap-1.5">
            <span
              className={`block h-[1.5px] w-5 bg-[#000000] transition-transform duration-300 ${
                menuOpen ? "translate-y-[3.75px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-5 bg-[#000000] transition-transform duration-300 ${
                menuOpen ? "-translate-y-[3.75px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="border-t border-[#e5e5e5] bg-[#ffffff] py-6 lg:hidden">
          <div className="container mx-auto px-6">
            <nav aria-label="Mobile Navigation">
              <ul className="flex flex-col gap-4">
                {NAV_LINKS.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block py-1 text-base font-medium text-[#000000]"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-6 border-t border-[#e5e5e5] pt-5">
              <MagneticButton
                href="#contact"
                onClick={() => setMenuOpen(false)}
                variant="primary"
                size="md"
                arrow="right"
                className="w-full"
              >
                Let&apos;s talk
              </MagneticButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
