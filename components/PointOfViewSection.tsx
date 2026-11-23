"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ProofStatsSection, {
  PROOF_STATS,
  formatStatValue,
} from "./ProofStatsSection";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const POV_CARDS = [
  {
    id: "01",
    label: "Principle 01",
    title: "Strategy before execution",
    description:
      "We clarify the commercial goal, customer decision and growth constraint before choosing channels or tactics.",
  },
  {
    id: "02",
    label: "Principle 02",
    title: "Data before assumptions",
    description:
      "We combine market evidence, customer signals and reliable tracking to replace opinion with informed action.",
  },
  {
    id: "03",
    label: "Principle 03",
    title: "Business growth before vanity metrics",
    description:
      "Reach matters only when it moves a meaningful outcome: qualified demand, acquisition efficiency, revenue or retention.",
  },
];

function CompassMark() {
  return (
    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#000000] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="9.5"
          stroke="currentColor"
          strokeWidth="1.3"
        />
        <path
          d="M9.5 14.5L11 11L14.5 9.5L13 13L9.5 14.5Z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="miter"
        />
      </svg>
    </span>
  );
}

function CardArrow() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0 text-[#525252] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5 group-hover:text-[#000000]"
    >
      <path
        d="M3 8H13M13 8L8.75 3.75M13 8L8.75 12.25"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
    </svg>
  );
}

export default function PointOfViewSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedStageRef = useRef<HTMLDivElement>(null);
  const povLayerRef = useRef<HTMLDivElement>(null);
  const proofLayerRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const proofNumberRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop & Tablet (md+):
      // Content scrolls left; cards arrive 1 by 1 from right-down corner.
      // Track ends tightly at marked line (no giant empty space on right).
      // Section closes right at marked line, revealing next section behind it.
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const cards = cardRefs.current.filter(
            (el): el is HTMLDivElement => el !== null
          );
          if (
            !containerRef.current ||
            !pinnedStageRef.current ||
            !povLayerRef.current ||
            !horizontalTrackRef.current ||
            cards.length === 0
          ) {
            return;
          }

          const track = horizontalTrackRef.current;
          // Exact scroll distance so Card 03 stops right at the marked line (with tight ~70px-80px margin)
          const getScrollDistance = () =>
            Math.max(0, track.scrollWidth - window.innerWidth);

          // Initial state: Each card starts in the right-down corner (offset x & y, tilted, scaled down)
          cards.forEach((card) => {
            gsap.set(card, {
              x: 340,
              y: 240,
              scale: 0.85,
              rotation: 7,
              opacity: 0,
              transformOrigin: "bottom right",
              force3D: true,
            });
          });

          // Proof layer behind is positioned ready for slow reveal
          if (proofLayerRef.current) {
            gsap.set(proofLayerRef.current, {
              xPercent: 12,
              opacity: 0.88,
              force3D: true,
            });
          }

          // Pre-populate stat display numbers to 0
          PROOF_STATS.forEach((stat, idx) => {
            const el = proofNumberRefs.current[idx];
            if (el) {
              el.textContent = formatStatValue(0, stat);
            }
          });

          // Master ScrollTrigger timeline pinned to container
          const masterTl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "+=3200",
              pin: true,
              scrub: 1.2,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          // Phase 1: Header line masked reveal
          masterTl.from(
            ".pov-line",
            {
              yPercent: 105,
              duration: 0.65,
              stagger: 0.08,
              ease: "power3.out",
            },
            0
          );

          // Moment to read the content in full view
          masterTl.to({}, { duration: 0.25 });

          // Phase 2: Horizontal Side Scroll
          const sideScrollLabel = "sideScroll";
          masterTl.addLabel(sideScrollLabel);

          // Track scrolls horizontally to end the section exactly at the marked line
          masterTl.to(
            track,
            {
              x: () => -getScrollDistance(),
              duration: 2.8,
              ease: "power1.inOut",
              force3D: true,
            },
            sideScrollLabel
          );

          // Card 01 arrives from right-down corner and sits on its position
          masterTl.to(
            cards[0],
            {
              x: 0,
              y: 0,
              scale: 1,
              rotation: 0,
              opacity: 1,
              duration: 0.75,
              ease: "power3.out",
              force3D: true,
            },
            `${sideScrollLabel}+=0.3`
          );

          // Card 02 arrives 1 by 1 from right-down corner and sits on its position
          masterTl.to(
            cards[1],
            {
              x: 0,
              y: 0,
              scale: 1,
              rotation: 0,
              opacity: 1,
              duration: 0.75,
              ease: "power3.out",
              force3D: true,
            },
            `${sideScrollLabel}+=1.1`
          );

          // Card 03 arrives 1 by 1 from right-down corner and sits on its position at the marked line
          masterTl.to(
            cards[2],
            {
              x: 0,
              y: 0,
              scale: 1,
              rotation: 0,
              opacity: 1,
              duration: 0.75,
              ease: "power3.out",
              force3D: true,
            },
            `${sideScrollLabel}+=1.9`
          );

          // Phase 3: Hold briefly — Card 03 sitting at the marked line
          masterTl.to({}, { duration: 0.45 });

          // Phase 4: Close Section at marked line — Full POV section slides left, revealing next section behind
          const closeLabel = "closeSection";
          masterTl.addLabel(closeLabel);

          masterTl.to(
            povLayerRef.current,
            {
              xPercent: -100,
              duration: 1.8,
              ease: "power2.inOut",
              force3D: true,
            },
            closeLabel
          );

          // Next section hidden behind slowly reveals as previous section slides left
          if (proofLayerRef.current) {
            masterTl.to(
              proofLayerRef.current,
              {
                xPercent: 0,
                opacity: 1,
                duration: 1.8,
                ease: "power2.out",
                force3D: true,
              },
              closeLabel
            );
          }

          // Phase 5: As next section is revealed, animate its elements & counters
          masterTl.from(
            ".proof-eyebrow",
            {
              y: 14,
              opacity: 0,
              duration: 0.5,
              ease: "power3.out",
            },
            `${closeLabel}+=0.35`
          );

          masterTl.from(
            ".proof-line",
            {
              yPercent: 105,
              duration: 0.75,
              stagger: 0.08,
              ease: "power4.out",
            },
            `${closeLabel}+=0.45`
          );

          masterTl.from(
            ".proof-subcopy",
            {
              y: 16,
              opacity: 0,
              duration: 0.55,
              ease: "power3.out",
            },
            `${closeLabel}+=0.55`
          );

          masterTl.from(
            ".proof-stat-col",
            {
              y: 22,
              opacity: 0,
              duration: 0.65,
              stagger: 0.08,
              ease: "power3.out",
            },
            `${closeLabel}+=0.6`
          );

          // Numbers count up smoothly to target values
          PROOF_STATS.forEach((stat, idx) => {
            const el = proofNumberRefs.current[idx];
            if (!el) return;

            const proxy = { val: 0 };
            masterTl.to(
              proxy,
              {
                val: stat.target,
                duration: 1.15 + idx * 0.1,
                ease: "power2.out",
                onUpdate: () => {
                  el.textContent = formatStatValue(proxy.val, stat);
                },
                onComplete: () => {
                  el.textContent = stat.display;
                },
              },
              `${closeLabel}+=0.6`
            );
          });

          // Buffer before unpinning
          masterTl.to({}, { duration: 0.35 });
        }
      );

      // Mobile (< 768px): Clean vertical staggered reveal
      mm.add(
        "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        () => {
          const cards = cardRefs.current.filter(
            (el): el is HTMLDivElement => el !== null
          );

          // Header reveal
          const headerTl = gsap.timeline({
            defaults: { ease: "power4.out" },
            scrollTrigger: {
              trigger: povLayerRef.current,
              start: "top 80%",
              once: true,
            },
          });

          headerTl
            .from(".pov-eyebrow", {
              y: 14,
              opacity: 0,
              duration: 0.6,
            })
            .from(
              ".pov-line",
              {
                yPercent: 105,
                duration: 0.9,
                stagger: 0.08,
              },
              "-=0.4"
            )
            .from(
              ".pov-subcopy",
              {
                y: 16,
                opacity: 0,
                duration: 0.7,
              },
              "-=0.55"
            );

          // Cards reveal from bottom-right on mobile scroll
          cards.forEach((card) => {
            gsap.from(card, {
              y: 60,
              x: 25,
              scale: 0.92,
              rotation: 3,
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
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative w-full bg-[#ffffff]">
      {/* Anchor targets for seamless Navbar/Footer scroll navigation */}
      <div
        id="work"
        className="pointer-events-none absolute top-0 left-0 h-1 w-1 opacity-0"
      />
      <div
        id="industries"
        className="pointer-events-none absolute left-0 h-1 w-1 opacity-0"
        style={{ top: "70%" }}
      />

      {/* Pinned Stage Viewport: Desktop pins h-screen overflow-hidden, Mobile stacks vertically */}
      <div
        ref={pinnedStageRef}
        className="relative w-full md:h-screen md:overflow-hidden"
      >
        {/* Layer 1 (Behind, z-10): The Next Section (ProofStatsSection) */}
        <div
          ref={proofLayerRef}
          className="relative z-10 w-full bg-[#ffffff] md:absolute md:inset-0 md:h-full md:flex md:flex-col md:justify-center md:overflow-hidden"
        >
          <ProofStatsSection
            embedded={true}
            numberRefs={proofNumberRefs}
          />
        </div>

        {/* Layer 2 (Front, z-20): Our Point of View Section (slides left on scroll) */}
        <div
          ref={povLayerRef}
          className="relative z-20 w-full overflow-hidden border-b border-[#e5e5e5] bg-[#f5f5f5] py-20 md:absolute md:inset-0 md:h-full md:border-b-0 md:py-0 md:flex md:flex-col md:justify-center will-change-transform"
        >
          {/* Subtle architectural hairline grid pattern */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            <defs>
              <pattern
                id="pov-flat-grid"
                width="80"
                height="80"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 80 0 L 0 0 0 80"
                  fill="none"
                  stroke="#e5e5e5"
                  strokeWidth="1"
                  strokeOpacity="0.6"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pov-flat-grid)" />
          </svg>

          {/* Horizontal Track: Content Block -> 3 Cards (Ends right at marked line) */}
          <div
            ref={horizontalTrackRef}
            className="relative z-10 flex flex-col md:flex-row md:flex-nowrap md:items-center md:h-full will-change-transform"
          >
            {/* Panel 1: Full Content Block spanning the site container width */}
            <div className="w-full shrink-0 px-6 sm:px-10 md:w-screen md:h-full md:flex md:flex-col md:justify-center lg:px-16 xl:px-24">
              <div className="w-full max-w-7xl mx-auto">
                <div>
                  {/* Top Eyebrow */}
                  <div className="pov-eyebrow mb-4 flex items-center gap-3.5 lg:mb-6">
                    <span
                      aria-hidden="true"
                      className="inline-block h-px w-6 bg-[#525252]"
                    />
                    <span className="font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-[#525252]">
                      Our Point of View
                    </span>
                  </div>

                  {/* Headline */}
                  <div className="max-w-4xl lg:max-w-5xl">
                    <h2 className="font-heading text-[2.6rem] font-medium leading-[1.03] tracking-[-0.035em] text-[#000000] sm:text-[3.5rem] lg:text-[4.4rem] xl:text-[4.9rem]">
                      <span className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
                        <span className="pov-line block">We don&apos;t believe in</span>
                      </span>
                      <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                        <span className="pov-line block">
                          marketing for <em className="font-normal italic">the sake</em>
                        </span>
                      </span>
                      <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                        <span className="pov-line block">of marketing.</span>
                      </span>
                    </h2>
                  </div>

                  {/* Subcopy spanning across the container grid into the marked area */}
                  <div className="pov-subcopy mt-8 grid grid-cols-1 items-start gap-4 border-t border-[#e5e5e5] pt-6 sm:grid-cols-12 sm:gap-6 lg:mt-10 lg:pt-8 w-full">
                    <div className="sm:col-span-4 lg:col-span-5">
                      <span className="font-sans text-xs uppercase tracking-[0.14em] text-[#525252]">
                        03 Core Principles
                      </span>
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7 flex justify-end">
                      <p className="max-w-[48ch] font-sans text-base leading-[1.7] text-[#525252] sm:text-lg text-left">
                        Good marketing is not a collection of disconnected deliverables.
                        It is a decision system designed around how your business creates
                        value.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel 2: The 3 Cards — Ends right at marked line (pr-16 lg:pr-20, no dead space) */}
            <div className="mt-12 flex flex-col gap-6 px-6 md:mt-0 md:flex-row md:flex-nowrap md:items-center md:gap-7 lg:gap-8 md:shrink-0 md:pl-10 lg:pl-14 md:pr-16 lg:pr-20 xl:pr-24">
              {POV_CARDS.map((card, idx) => (
                <div
                  key={card.id}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  className="w-full shrink-0 md:w-[380px] lg:w-[420px] xl:w-[450px] will-change-transform"
                >
                  <article className="group relative flex h-full min-h-[380px] md:h-[460px] lg:h-[490px] xl:h-[510px] flex-col justify-between overflow-hidden rounded-md border border-[#e5e5e5] bg-[#ffffff] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:border-[#000000] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] lg:p-9 xl:p-10">
                    {/* Subtle top hairline accent expanding on hover */}
                    <span
                      aria-hidden="true"
                      className="absolute top-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-[#000000] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                    />

                    <div className="flex items-center justify-between border-b border-[#e5e5e5] pb-5">
                      <div className="flex items-center gap-3">
                        <span className="font-sans text-xs font-medium tabular-nums tracking-[0.14em] text-[#000000]">
                          {card.id}
                        </span>
                        <span className="font-sans text-[10px] uppercase tracking-[0.14em] text-[#525252]">
                          {card.label}
                        </span>
                      </div>
                      <CompassMark />
                    </div>

                    <div className="my-auto py-6 lg:py-8">
                      <h3 className="font-heading text-[1.65rem] font-medium leading-[1.18] tracking-[-0.025em] text-[#000000] lg:text-[1.85rem] xl:text-[2rem]">
                        {card.title}
                      </h3>
                      <p className="mt-4 font-sans text-[14.5px] leading-[1.7] text-[#525252] lg:text-[15.5px]">
                        {card.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-[#e5e5e5] pt-4 font-sans text-[11px] uppercase tracking-[0.12em] text-[#525252] transition-colors duration-300 group-hover:text-[#000000]">
                      <span>Digital Wolf Standard</span>
                      <CardArrow />
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
