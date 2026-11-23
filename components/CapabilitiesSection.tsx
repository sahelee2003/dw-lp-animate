"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ServiceCardData {
  id: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  metric: string;
  metricLabel: string;
  image: string;
  objectPosition: string;
  visualBadge: string;
  visualTitle: string;
  visualNote: string;
}

const SERVICE_CARDS: ServiceCardData[] = [
  {
    id: "01",
    category: "STRATEGY & ARCHITECTURE",
    title: "Growth Strategy",
    description:
      "Diagnosing commercial bottlenecks and aligning channel execution with real business outcomes — not vanity traffic or disconnected reports.",
    tags: [
      "Commercial Roadmap",
      "Customer Journey Audit",
      "Market Positioning",
      "Attribution Modeling",
      "Unit Economics",
      "Pipeline Architecture",
    ],
    metric: "3.4x",
    metricLabel: "Average Pipeline Multiplier",
    image: "/images/long.jpg",
    objectPosition: "object-center",
    visualBadge: "COMMERCIAL OUTCOME",
    visualTitle: "Predictable Demand System",
    visualNote: "Connecting marketing spend directly to commercial EBITDA impact.",
  },
  {
    id: "02",
    category: "BRAND & RECOGNITION",
    title: "Brand & Experience",
    description:
      "Identity systems that don't just decorate — they establish category authority, build enduring market trust, and command pricing power.",
    tags: [
      "Brand Strategy",
      "Visual Identity",
      "Design Systems",
      "Corporate Tone",
      "Motion Guidelines",
      "Multi-Platform Recall",
    ],
    metric: "100%",
    metricLabel: "Cross-Channel Cohesion",
    image: "/images/short.jpg",
    objectPosition: "object-center",
    visualBadge: "IDENTITY CORE",
    visualTitle: "Category Authority",
    visualNote: "Distinctive assets engineered for instant commercial recognition.",
  },
  {
    id: "03",
    category: "DIGITAL PRODUCTS & WEB",
    title: "Development & Motion",
    description:
      "Visual storytelling engineered for the modern browser. Clean Next.js App Router, 120fps motion, sub-second loads, and zero layout shift.",
    tags: [
      "Next.js App Router",
      "TypeScript Architecture",
      "GSAP Motion",
      "Headless CMS",
      "Sub-Second TTFB",
      "Accessibility (WCAG)",
    ],
    metric: "99.8",
    metricLabel: "Lighthouse Performance",
    image: "/images/long.jpg",
    objectPosition: "object-bottom",
    visualBadge: "RUNTIME INTELLIGENCE",
    visualTitle: "120 FPS Motion Pipeline",
    visualNote: "Fluid Lenis inertia synced with GPU-composited shaders.",
  },
  {
    id: "04",
    category: "DEMAND & PERFORMANCE",
    title: "Performance & CRO",
    description:
      "Connecting creative execution with scalable acquisition. Compounding organic search visibility, conversion sprints, and qualified sales pipeline.",
    tags: [
      "Performance Media",
      "SEO Architecture",
      "Conversion Rate Sprints",
      "Creative Testing Lab",
      "Paid Search & Social",
      "Retention Loops",
    ],
    metric: "+142%",
    metricLabel: "Conversion Rate Lift",
    image: "/images/short.jpg",
    objectPosition: "object-top",
    visualBadge: "PERFORMANCE METRIC",
    visualTitle: "Compounding Demand Engine",
    visualNote: "High-intent customer journeys optimized for repeatable conversion.",
  },
];

export default function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
      if (!section || cards.length === 0) return;

      const mm = gsap.matchMedia();

      // Header masked entrance reveal
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const headerTl = gsap.timeline({
          defaults: { ease: "power4.out" },
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
        });

        headerTl
          .from(".services-eyebrow", {
            y: 16,
            opacity: 0,
            duration: 0.6,
          })
          .from(
            ".services-line",
            {
              yPercent: 105,
              duration: 0.95,
              stagger: 0.08,
            },
            "-=0.4"
          )
          .from(
            ".services-lead",
            {
              y: 20,
              opacity: 0,
              duration: 0.7,
            },
            "-=0.5"
          );
      });

      // Desktop & Tablet (>= 768px): Sticky Stacking Card Animation
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          // Cards scale down smoothly and stack as new cards overlap,
          // keeping the card 100% solid white (no darkening, no black transformation).
          cards.forEach((card, i) => {
            if (i < cards.length - 1) {
              const nextCard = cards[i + 1];

              gsap.to(card, {
                scale: 0.96,
                y: -14,
                ease: "none",
                force3D: true,
                scrollTrigger: {
                  trigger: nextCard,
                  start: "top 90%",
                  end: "top 25%",
                  scrub: 1.0,
                  invalidateOnRefresh: true,
                },
              });

              // Progressive scale down if another card follows
              if (i < cards.length - 2) {
                const thirdCard = cards[i + 2];
                gsap.to(card, {
                  scale: 0.92,
                  y: -28,
                  ease: "none",
                  force3D: true,
                  scrollTrigger: {
                    trigger: thirdCard,
                    start: "top 90%",
                    end: "top 25%",
                    scrub: 1.0,
                    invalidateOnRefresh: true,
                  },
                });
              }

              // Final deck tuck if a fourth card follows
              if (i === 0 && cards.length >= 4) {
                const fourthCard = cards[3];
                gsap.to(card, {
                  scale: 0.88,
                  y: -42,
                  ease: "none",
                  force3D: true,
                  scrollTrigger: {
                    trigger: fourthCard,
                    start: "top 90%",
                    end: "top 25%",
                    scrub: 1.0,
                    invalidateOnRefresh: true,
                  },
                });
              }
            }
          });
        }
      );

      // Mobile (< 768px): Clean staggered vertical scroll entrance
      mm.add(
        "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        () => {
          cards.forEach((card) => {
            gsap.from(card, {
              y: 40,
              opacity: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                once: true,
              },
            });
          });
        }
      );

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full border-b border-[#e5e5e5] bg-[#ffffff] py-24 lg:py-32"
    >
      <div className="container mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="mb-14 flex flex-col items-start justify-between gap-8 md:mb-18 md:flex-row md:items-end">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="services-eyebrow mb-4 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 rounded-full bg-[#000000]"
              />
              <span className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-[#525252]">
                (Services)
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-heading text-4xl font-medium tracking-tight text-[#000000] sm:text-5xl lg:text-6xl">
              <span className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
                <span className="services-line block">
                  Services <em className="font-normal italic">we offer.</em>
                </span>
              </span>
            </h2>

            {/* Lead description */}
            <p className="services-lead mt-4 font-sans text-base leading-relaxed text-[#525252] sm:text-lg">
              Strategic clarity, brand distinction, and high-performance engineering
              designed around how your business creates commercial value.
            </p>
          </div>

          {/* Top CTA Button */}
          <div className="shrink-0">
            <MagneticButton
              href="#contact"
              variant="primary"
              size="md"
              arrow="right"
            >
              See All Services
            </MagneticButton>
          </div>
        </div>

        {/* Stacked Cards Deck with 3D Perspective */}
        <div className="relative mx-auto w-full max-w-6xl [perspective:2000px]">
          {SERVICE_CARDS.map((card, idx) => {
            // Calculated sticky offset so cards create a layered peek deck at the top
            const topOffsetClass =
              idx === 0
                ? "md:top-[110px]"
                : idx === 1
                ? "md:top-[134px]"
                : idx === 2
                ? "md:top-[158px]"
                : "md:top-[182px]";

            // Generous spacing between cards so scroll momentum drives the stacking naturally
            const marginClass =
              idx === SERVICE_CARDS.length - 1
                ? "mb-0"
                : "mb-20 sm:mb-28 md:mb-40 lg:mb-48";

            return (
              <div
                key={card.id}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                className={`relative w-full ${marginClass} md:sticky ${topOffsetClass} will-change-transform`}
                style={{
                  zIndex: 10 + idx * 5,
                  transformOrigin: "center top",
                }}
              >
                <article className="group relative flex min-h-[500px] w-full flex-col justify-between overflow-hidden rounded-[28px] border border-[#e5e5e5] bg-[#ffffff] p-7 text-[#000000] shadow-[0_20px_50px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.03)] transition-shadow duration-300 sm:p-9 md:flex-row md:items-stretch md:gap-8 lg:min-h-[540px] lg:gap-12 lg:p-11">
                  {/* Left Column: Details & Actions */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      {/* Step ID & Category */}
                      <div className="flex items-center justify-between border-b border-[#e5e5e5] pb-4">
                        <span className="font-heading text-3xl font-medium tracking-tight text-[#000000] sm:text-4xl">
                          {card.id}
                        </span>
                        <span className="font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-[#525252]">
                          {card.category}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="mt-6 font-heading text-2xl font-medium leading-tight text-[#000000] sm:text-3xl lg:text-4xl">
                        {card.title}
                      </h3>
                      <p className="mt-4 max-w-[44ch] font-sans text-sm leading-relaxed text-[#525252] sm:text-[15px]">
                        {card.description}
                      </p>

                      {/* Capability Points List (One by One) */}
                      <div className="mt-6">
                        <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-3">
                          {card.tags.map((tag) => (
                            <li
                              key={tag}
                              className="flex items-center gap-2.5 font-sans text-xs sm:text-[13px] font-medium text-[#000000]"
                            >
                              <span
                                aria-hidden="true"
                                className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#000000]"
                              />
                              <span>{tag}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Bottom Row: CTA Button & Metric */}
                    <div className="mt-8 flex flex-col gap-5 border-t border-[#e5e5e5] pt-6 sm:flex-row sm:items-center sm:justify-between">
                      <MagneticButton
                        href="#contact"
                        variant="primary"
                        size="sm"
                        arrow="right"
                      >
                        Contact with us
                      </MagneticButton>

                      <div className="flex items-baseline gap-2">
                        <span className="font-heading text-2xl font-bold tracking-tight text-[#000000]">
                          {card.metric}
                        </span>
                        <span className="font-sans text-xs text-[#525252]">
                          {card.metricLabel}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Visual Showcase Card */}
                  <div className="mt-8 flex-1 md:mt-0">
                    <div className="relative flex h-full min-h-[300px] w-full flex-col justify-between overflow-hidden rounded-2xl border border-[#e5e5e5] bg-[#f5f5f5] p-6 sm:min-h-[360px] sm:p-7">
                      {/* Architectural Photo Background with Subtle Light Vignette */}
                      <Image
                        src={card.image}
                        alt={`${card.title} capability preview`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className={`object-cover ${card.objectPosition} opacity-75 transition-transform duration-700 ease-out group-hover:scale-105`}
                        priority={idx === 0}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/95 via-white/40 to-transparent" />

                      {/* Top Header Badge */}
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="rounded-full border border-black/10 bg-white/85 px-3.5 py-1 font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-[#000000] shadow-sm backdrop-blur-md">
                          {card.visualBadge}
                        </span>
                        <span className="flex h-2 w-2 rounded-full bg-[#000000] opacity-80" />
                      </div>

                      {/* Bottom Information Card */}
                      <div className="relative z-10 rounded-xl border border-[#e5e5e5] bg-[#ffffff]/90 p-4.5 shadow-sm backdrop-blur-md">
                        <h4 className="font-heading text-base font-semibold text-[#000000] sm:text-lg">
                          {card.visualTitle}
                        </h4>
                        <p className="mt-1 font-sans text-xs leading-relaxed text-[#525252]">
                          {card.visualNote}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
