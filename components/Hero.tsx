"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PROOF_ITEMS = [
  "No-obligation discovery",
  "Business-focused recommendations",
];

const HERO_CARDS = [
  {
    id: "01",
    title: "Growth Strategy",
    image: "/images/long.jpg",
    objectPosition: "object-center",
    alt: "Digital Wolf hero visual 01 — Growth Strategy",
  },
  {
    id: "02",
    title: "Performance Media",
    image: "/images/short.jpg",
    objectPosition: "object-center",
    alt: "Digital Wolf hero visual 02 — Performance Media",
  },
  {
    id: "03",
    title: "Brand & Experience",
    image: "/images/long.jpg",
    objectPosition: "object-bottom",
    alt: "Digital Wolf hero visual 03 — Brand & Experience",
  },
];

const SLOT_TRANSFORMS = [
  { x: 0, y: 0, rotation: 0, scale: 1, zIndex: 30, opacity: 1 },
  { x: 18, y: -16, rotation: 3.5, scale: 0.95, zIndex: 20, opacity: 0.96 },
  { x: -16, y: -26, rotation: -3.5, scale: 0.9, zIndex: 10, opacity: 0.88 },
];

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0 text-[#000000]"
    >
      <path
        d="M2.5 7.25L5.5 10.25L11.5 3.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prevActiveRef = useRef(0);
  const isFirstRenderRef = useRef(true);

  const [activeIndex, setActiveIndex] = useState(0);

  const advanceCard = () => {
    setActiveIndex((prev) => (prev + 1) % HERO_CARDS.length);
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.from(".hero-eyebrow", {
          y: 14,
          opacity: 0,
          duration: 0.65,
        })
          .from(
            ".hero-line",
            {
              yPercent: 105,
              duration: 1.0,
              stagger: 0.08,
            },
            "-=0.45"
          )
          .from(
            ".hero-copy",
            {
              y: 18,
              opacity: 0,
              duration: 0.75,
            },
            "-=0.55"
          )
          .from(
            ".hero-actions",
            {
              y: 18,
              opacity: 0,
              duration: 0.75,
            },
            "-=0.55"
          )
          .from(
            ".hero-proof",
            {
              y: 12,
              opacity: 0,
              duration: 0.65,
            },
            "-=0.5"
          )
          .from(
            ".hero-deck-wrap",
            {
              y: 28,
              opacity: 0,
              duration: 0.95,
            },
            "-=0.85"
          );
      });

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.fromTo(
            ".hero-deck-wrap",
            { y: 0, scale: 1 },
            {
              y: 28,
              scale: 0.97,
              ease: "none",
              scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1.2,
              },
            }
          );
        }
      );

      return () => mm.revert();
    },
    { scope: heroRef }
  );

  // Smooth 3-card stacked deck transition on hover / index change
  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const prevIndex = prevActiveRef.current;

      cardRefs.current.forEach((cardEl, idx) => {
        if (!cardEl) return;

        const slot = (idx - activeIndex + HERO_CARDS.length) % HERO_CARDS.length;
        const target = SLOT_TRANSFORMS[slot];

        gsap.killTweensOf(cardEl);

        if (isFirstRenderRef.current || prefersReducedMotion) {
          gsap.set(cardEl, {
            x: target.x,
            y: target.y,
            rotation: target.rotation,
            scale: target.scale,
            opacity: target.opacity,
            zIndex: target.zIndex,
          });
          return;
        }

        // Outgoing front card flicks smoothly outward before tucking to the back
        if (idx === prevIndex && prevIndex !== activeIndex && slot === 2) {
          const cardTl = gsap.timeline();
          cardTl
            .to(cardEl, {
              x: -44,
              y: -14,
              rotation: -6.5,
              scale: 0.94,
              duration: 0.22,
              ease: "power2.out",
            })
            .set(cardEl, { zIndex: target.zIndex })
            .to(cardEl, {
              x: target.x,
              y: target.y,
              rotation: target.rotation,
              scale: target.scale,
              opacity: target.opacity,
              duration: 0.44,
              ease: "power3.out",
            });
          return;
        }

        gsap.to(cardEl, {
          x: target.x,
          y: target.y,
          rotation: target.rotation,
          scale: target.scale,
          opacity: target.opacity,
          zIndex: target.zIndex,
          duration: 0.62,
          ease: "power3.out",
        });
      });

      isFirstRenderRef.current = false;
      prevActiveRef.current = activeIndex;
    },
    { dependencies: [activeIndex], scope: heroRef }
  );

  const activeCard = HERO_CARDS[activeIndex];

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative overflow-hidden border-b border-[#e5e5e5] bg-[#ffffff]"
    >
      {/* Flat architectural hairline grid (pure solid SVG strokes, zero gradients) */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <defs>
          <pattern
            id="hero-flat-grid"
            width="64"
            height="64"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 64 0 L 0 0 0 64"
              fill="none"
              stroke="#e5e5e5"
              strokeWidth="1"
              strokeOpacity="0.55"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-flat-grid)" />
      </svg>

      <div className="container relative z-10 mx-auto px-6 py-20 sm:py-24 lg:px-10 lg:py-28">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Editorial Headline + Copy + CTAs */}
          <div className="lg:col-span-8">
            {/* Eyebrow (flat rule + label, no badge/capsule) */}
            <div className="hero-eyebrow mb-7 flex items-center gap-3.5">
              <span
                aria-hidden="true"
                className="inline-block h-px w-6 bg-[#525252]"
              />
              <span className="font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-[#525252]">
                Business-First Digital Growth
              </span>
            </div>

            {/* H1 in DM Sans with Trionn-style masked line reveals */}
            <h1 className="font-heading text-[2.85rem] font-medium leading-[1.03] tracking-[-0.035em] text-[#000000] sm:text-[3.75rem] lg:text-[4.35rem] xl:text-[4.85rem]">
              <span className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
                <span className="hero-line block">Turn marketing</span>
              </span>
              <span className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
                <span className="hero-line block">investment</span>
              </span>
              <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                <span className="hero-line block">
                  into <em className="font-normal italic">measurable</em>
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
                <span className="hero-line block">business growth.</span>
              </span>
              <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                <span className="hero-line block"></span>
              </span>
            </h1>

            {/* Paragraph in Inter */}
            <p className="hero-copy mt-8 max-w-[46ch] font-sans text-base leading-[1.7] text-[#525252] sm:text-[17px]">
              We connect strategy, performance media, creative, data and
              technology to help businesses attract better customers—and convert
              attention into commercial momentum.
            </p>

            {/* Modern Animated Buttons (crisp rounded-md, no capsule, no gradients) */}
            <div className="hero-actions mt-9 flex flex-wrap items-center gap-4">
              <MagneticButton
                href="#contact"
                variant="primary"
                size="md"
                arrow="right"
              >
                Discuss your growth goals
              </MagneticButton>
              <MagneticButton
                href="#about"
                variant="secondary"
                size="md"
                arrow="down-right"
              >
                Explore our approach
              </MagneticButton>
            </div>

            {/* Proof items (plain clean typography, no capsules) */}
            <ul className="hero-proof mt-8 flex flex-wrap items-center gap-x-7 gap-y-2.5">
              {PROOF_ITEMS.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-2 font-sans text-xs text-[#525252]"
                >
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: 3 Overlapping Cards keeping Hero's exact portrait dimensions (aspect-[10/11], max-w-[460px]) */}
          <div className="lg:col-span-4">
            <div className="hero-deck-wrap mx-auto w-full max-w-[460px] lg:ml-auto lg:mr-0">
              <div
                role="button"
                tabIndex={0}
                aria-label={`Hero showcase card ${activeCard.id} of 03: ${activeCard.title}. Hover or click to show next card.`}
                onMouseEnter={advanceCard}
                onClick={advanceCard}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    advanceCard();
                  }
                }}
                className="relative mt-8 aspect-[10/11] w-full cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#000000]"
              >
                {HERO_CARDS.map((card, idx) => (
                  <div
                    key={card.id}
                    ref={(el) => {
                      cardRefs.current[idx] = el;
                    }}
                    className="absolute inset-0 overflow-hidden rounded-md bg-[#ffffff] shadow-[0_8px_28px_rgba(0,0,0,0.08)] will-change-transform"
                  >
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      priority={idx === 0}
                      sizes="(max-width: 1024px) 100vw, 460px"
                      className={`object-cover ${card.objectPosition}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
