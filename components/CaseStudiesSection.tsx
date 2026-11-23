"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import RippleDistortion from "./RippleDistortion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  title: string;
  services: string;
  image: string;
  objectPosition: string;
  alt: string;
}

const CASE_STUDY_ROWS: [CaseStudy, CaseStudy][] = [
  [
    {
      id: "CASE / 01",
      client: "Vanguard Systems",
      industry: "B2B Enterprise",
      title: "From inconsistent demand to a connected acquisition system.",
      services: "Performance · Creative · CRO",
      image: "/images/short.jpg",
      objectPosition: "object-center",
      alt: "Vanguard Systems case study visual",
    },
    {
      id: "CASE / 02",
      client: "Meridian Health",
      industry: "Healthcare",
      title: "Turning complex customer journeys into clearer conversion paths.",
      services: "Strategy · Web · Analytics",
      image: "/images/long.jpg",
      objectPosition: "object-center",
      alt: "Meridian Health case study visual",
    },
  ],
  [
    {
      id: "CASE / 03",
      client: "Northline Capital",
      industry: "Financial Services",
      title: "Building organic visibility around high-value customer intent.",
      services: "SEO · Content · Measurement",
      image: "/images/long.jpg",
      objectPosition: "object-top",
      alt: "Northline Capital case study visual",
    },
    {
      id: "CASE / 04",
      client: "Helios Commerce",
      industry: "Retail & DTC",
      title: "Aligning brand positioning with full-funnel revenue velocity.",
      services: "Brand · Paid Media · Attribution",
      image: "/images/short.jpg",
      objectPosition: "object-right",
      alt: "Helios Commerce case study visual",
    },
  ],
];

function LinkArrow() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5"
    >
      <path
        d="M2.5 7.5H12.5M12.5 7.5L8.25 3.25M12.5 7.5L8.25 11.75"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
    </svg>
  );
}

export default function CaseStudiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Header masked reveal
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const headerTl = gsap.timeline({
          defaults: { ease: "power4.out" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        });

        headerTl
          .from(".case-eyebrow", {
            y: 14,
            opacity: 0,
            duration: 0.6,
          })
          .from(
            ".case-line",
            {
              yPercent: 105,
              duration: 0.95,
              stagger: 0.08,
            },
            "-=0.4"
          );
      });

      // Desktop / Tablet (md+): Left card arrives from bottom-left -> sits;
      // Right card arrives from bottom-right -> sits, scrubbed smoothly per row
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          rowRefs.current.forEach((rowEl) => {
            if (!rowEl) return;

            const leftCard = rowEl.querySelector<HTMLElement>(".case-card-left");
            const rightCard =
              rowEl.querySelector<HTMLElement>(".case-card-right");

            if (leftCard) {
              gsap.fromTo(
                leftCard,
                {
                  x: -110,
                  y: 140,
                  rotation: -5.5,
                  scale: 0.92,
                  opacity: 0,
                  force3D: true,
                },
                {
                  x: 0,
                  y: 0,
                  rotation: 0,
                  scale: 1,
                  opacity: 1,
                  ease: "power2.out",
                  force3D: true,
                  scrollTrigger: {
                    trigger: rowEl,
                    start: "top 95%",
                    end: "bottom 96%",
                    scrub: 1.0,
                    invalidateOnRefresh: true,
                  },
                }
              );
            }

            if (rightCard) {
              gsap.fromTo(
                rightCard,
                {
                  x: 110,
                  y: 140,
                  rotation: 5.5,
                  scale: 0.92,
                  opacity: 0,
                  force3D: true,
                },
                {
                  x: 0,
                  y: 0,
                  rotation: 0,
                  scale: 1,
                  opacity: 1,
                  ease: "power2.out",
                  force3D: true,
                  scrollTrigger: {
                    trigger: rowEl,
                    start: "top 95%",
                    end: "bottom 96%",
                    scrub: 1.0,
                    invalidateOnRefresh: true,
                  },
                }
              );
            }
          });
        }
      );

      // Mobile (< 768px): Clean down-to-up reveal
      mm.add(
        "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        () => {
          const mobileCards = gsap.utils.toArray<HTMLElement>(
            ".case-card-left, .case-card-right",
            sectionRef.current
          );
          mobileCards.forEach((card) => {
            gsap.from(card, {
              y: 56,
              opacity: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
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
      id="case-studies"
      ref={sectionRef}
      className="relative overflow-x-clip border-b border-[#e5e5e5] bg-[#f5f5f5]"
    >
      <div className="container mx-auto px-6 py-24 lg:px-10 lg:py-32">
        {/* Header - Clean editorial typography, zero distortion */}
        <div className="max-w-3xl">
          <div className="case-eyebrow mb-6 flex items-center gap-3.5">
            <span
              aria-hidden="true"
              className="inline-block h-px w-6 bg-[#525252]"
            />
            <span className="font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-[#525252]">
              Strategic Problem Solving
            </span>
          </div>

          <h2 className="font-heading text-[2.45rem] font-medium leading-[1.06] tracking-[-0.03em] text-[#000000] sm:text-[3.25rem] lg:text-[3.9rem]">
            <span className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
              <span className="case-line block">Real challenges. Strategic</span>
            </span>
            <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
              <span className="case-line block">
                execution. <em className="font-normal italic">Measurable</em>
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
              <span className="case-line block">
                <em className="font-normal italic">outcomes.</em>
              </span>
            </span>
          </h2>
        </div>

        {/* 4 Case Study Cards — 2 Cards in Each Row */}
        <div className="mt-16 flex flex-col gap-10 lg:mt-20 lg:gap-12">
          {CASE_STUDY_ROWS.map((row, rowIdx) => (
            <div
              key={rowIdx}
              ref={(el) => {
                rowRefs.current[rowIdx] = el;
              }}
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10"
            >
              {row.map((study, colIdx) => {
                const isLeft = colIdx === 0;

                return (
                  <article
                    key={study.id}
                    className={`group flex flex-col overflow-hidden rounded-md bg-[#ffffff] shadow-[0_4px_24px_rgba(0,0,0,0.05)] transition-shadow duration-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.09)] will-change-transform ${
                      isLeft ? "case-card-left" : "case-card-right"
                    }`}
                  >
                    {/* Card Image with Hardware-Accelerated WebGL Ripple Distortion inside circle */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#f5f5f5]">
                      <RippleDistortion
                        src={study.image}
                        alt={study.alt}
                        circleRadius={0.14}
                        strength={0.038}
                        frequency={65.0}
                        speed={4.8}
                        dispersion={0.06}
                      />
                    </div>

                    {/* Card Content - Clean editorial text, zero distortion */}
                    <div className="flex flex-1 flex-col justify-between p-7 sm:p-9">
                      <div>
                        <div className="flex items-center justify-between gap-4 font-sans text-[11px] uppercase tracking-[0.14em] text-[#525252]">
                          <span className="font-medium text-[#000000]">
                            {study.id}
                          </span>
                          <span>{study.industry}</span>
                        </div>

                        <p className="mt-5 font-sans text-xs font-medium tracking-[0.04em] text-[#525252]">
                          {study.client}
                        </p>

                        <h3 className="mt-2 font-heading text-2xl font-medium leading-[1.2] tracking-[-0.025em] text-[#000000] sm:text-[1.65rem]">
                          {study.title}
                        </h3>

                        <p className="mt-4 font-sans text-xs tracking-[0.04em] text-[#525252]">
                          {study.services}
                        </p>
                      </div>

                      <div className="mt-8 border-t border-[#e5e5e5] pt-5">
                        <a
                          href="#contact"
                          className="inline-flex items-center gap-2.5 font-sans text-sm font-medium text-[#000000] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#000000]"
                        >
                          <span className="relative pb-0.5">
                            View case study
                            <span
                              aria-hidden="true"
                              className="absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-100 bg-[#000000] transition-transform duration-300 group-hover:scale-x-0"
                            />
                            <span
                              aria-hidden="true"
                              className="absolute bottom-0 left-0 h-[1.5px] w-full origin-right scale-x-0 bg-[#000000] transition-transform duration-300 delay-75 group-hover:scale-x-100"
                            />
                          </span>
                          <LinkArrow />
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ))}
        </div>

        {/* Compliance Footnote */}
        <p className="mt-12 font-sans text-[11px] uppercase tracking-[0.08em] text-[#525252]">
          Case studies are structured placeholders—not representations of actual
          client results.
        </p>
      </div>
    </section>
  );
}
