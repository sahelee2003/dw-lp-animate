"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ProcessStage {
  id: string;
  title: string;
  description: string;
  xPercent: number;
  cx: number;
  cy: number;
  position: "top" | "bottom";
}

const PROCESS_STAGES: ProcessStage[] = [
  {
    id: "01",
    title: "Discover",
    description: "Business context, economics and customer journey",
    xPercent: 11.6667,
    cx: 140,
    cy: 56,
    position: "top",
  },
  {
    id: "02",
    title: "Research",
    description: "Market evidence and strategic priorities",
    xPercent: 27,
    cx: 324,
    cy: 164,
    position: "bottom",
  },
  {
    id: "03",
    title: "Execute",
    description: "Channel, creative and experience roadmap",
    xPercent: 42.3333,
    cx: 508,
    cy: 56,
    position: "top",
  },
  {
    id: "04",
    title: "Measure",
    description: "Reliable tracking and decision-ready reporting",
    xPercent: 57.6667,
    cx: 692,
    cy: 164,
    position: "bottom",
  },
  {
    id: "05",
    title: "Optimize",
    description: "Structured experiments against agreed goals",
    xPercent: 73,
    cx: 876,
    cy: 56,
    position: "top",
  },
  {
    id: "06",
    title: "Scale",
    description: "Invest behind proven signals and opportunities",
    xPercent: 88.3333,
    cx: 1060,
    cy: 164,
    position: "bottom",
  },
];

// Smooth symmetric C1/C2 cubic Bezier wave passing directly through all 6 stage nodes
const WAVE_PATH =
  "M 0 128 C 46 128, 76 56, 140 56 C 207 56, 257 164, 324 164 C 391 164, 441 56, 508 56 C 575 56, 625 164, 692 164 C 759 164, 809 56, 876 56 C 943 56, 993 164, 1060 164 C 1124 164, 1154 92, 1200 92";

function CheckIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="mt-0.5 shrink-0 text-[#000000]"
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

export default function HowWeWorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const waveStageRef = useRef<HTMLDivElement>(null);
  const activeWaveWrapRef = useRef<HTMLDivElement>(null);

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

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
          .from(".how-eyebrow", {
            y: 14,
            opacity: 0,
            duration: 0.6,
          })
          .from(
            ".how-line",
            {
              yPercent: 105,
              duration: 0.95,
              stagger: 0.08,
            },
            "-=0.4"
          )
          .from(
            ".how-assurance",
            {
              y: 16,
              opacity: 0,
              duration: 0.7,
            },
            "-=0.55"
          );
      });

      // Desktop (lg+): Scroll-drawn wavy path (GPU clip-path — 100% exact on every width) + sequential reveals
      // Outer wrappers hold static CSS centering (-translate-x-1/2) untouched by GSAP so alignment is pixel-exact
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const stageEl = waveStageRef.current;
          const activeWaveEl = activeWaveWrapRef.current;
          if (!stageEl || !activeWaveEl) return;

          gsap.set(activeWaveEl, {
            clipPath: "inset(0% 100% 0% 0%)",
          });

          const waveNodeInners = stageEl.querySelectorAll<HTMLElement>(
            ".wave-node-inner"
          );
          const waveCardInners = stageEl.querySelectorAll<HTMLElement>(
            ".wave-card-inner"
          );

          gsap.set(waveNodeInners, { scale: 0, opacity: 0, force3D: true });
          waveCardInners.forEach((card) => {
            const isTop = card.dataset.pos === "top";
            gsap.set(card, {
              y: isTop ? -14 : 14,
              opacity: 0.15,
              force3D: true,
            });
          });

          const waveTl = gsap.timeline({
            scrollTrigger: {
              trigger: stageEl,
              start: "top 88%",
              end: "bottom 78%",
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          });

          // Reveal the bold black wave 0% -> 100% all the way to the right tip
          waveTl.to(
            activeWaveEl,
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.0,
              ease: "none",
            },
            0
          );

          // Activate each of the 6 nodes & centered text blocks right as the reveal crosses them
          PROCESS_STAGES.forEach((stage, idx) => {
            const beat = stage.xPercent / 100 - 0.04;
            const nodeEl = stageEl.querySelector<HTMLElement>(
              `.wave-node-inner[data-idx="${idx}"]`
            );
            const cardEl = stageEl.querySelector<HTMLElement>(
              `.wave-card-inner[data-idx="${idx}"]`
            );

            if (nodeEl) {
              waveTl.to(
                nodeEl,
                {
                  scale: 1,
                  opacity: 1,
                  duration: 0.12,
                  ease: "back.out(1.6)",
                },
                Math.max(0, beat)
              );
            }

            if (cardEl) {
              waveTl.to(
                cardEl,
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.18,
                  ease: "power2.out",
                },
                Math.max(0, beat)
              );
            }
          });
        }
      );

      // Mobile / Tablet (< 1024px): Clean staggered vertical reveal
      mm.add(
        "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        () => {
          const mobileItems = gsap.utils.toArray<HTMLElement>(
            ".how-mobile-stage",
            sectionRef.current
          );
          mobileItems.forEach((item) => {
            gsap.from(item, {
              y: 28,
              opacity: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
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

  const topStages = PROCESS_STAGES.filter((s) => s.position === "top");
  const bottomStages = PROCESS_STAGES.filter((s) => s.position === "bottom");

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative overflow-x-clip border-b border-[#e5e5e5] bg-[#f5f5f5]"
    >
      <div className="container mx-auto px-6 py-24 lg:px-10 lg:py-32">
        {/* Clean Split Header */}
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="how-eyebrow mb-6 flex items-center gap-3.5">
              <span
                aria-hidden="true"
                className="inline-block h-px w-6 bg-[#525252]"
              />
              <span className="font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-[#525252]">
                How We Work
              </span>
            </div>

            <h2 className="font-heading text-[2.45rem] font-medium leading-[1.06] tracking-[-0.03em] text-[#000000] sm:text-[3.25rem] lg:text-[3.9rem]">
              <span className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
                <span className="how-line block">From business</span>
              </span>
              <span className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
                <span className="how-line block">understanding to</span>
              </span>
              <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                <span className="how-line block">
                  <em className="font-normal italic">measurable growth.</em>
                </span>
              </span>
            </h2>
          </div>

          <div className="how-assurance lg:col-span-5">
            <div className="flex items-start gap-3 border-l border-[#000000] pl-5 lg:ml-auto lg:max-w-[40ch]">
              <CheckIcon />
              <p className="font-sans text-[15px] leading-[1.65] text-[#525252]">
                At every stage, you know what is being done, why it matters and
                what happens next.
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Wavy Curve Journey (6 Items Centered Directly Over/Under Their Wave Nodes) */}
        <div ref={waveStageRef} className="mt-20 hidden lg:block">
          {/* Top Peak Stages: 01 Discover, 03 Execute, 05 Optimize */}
          <div className="relative h-[132px] w-full">
            {topStages.map((stage) => {
              const idx = PROCESS_STAGES.findIndex((s) => s.id === stage.id);
              const isHovered = hoveredIdx === idx;

              return (
                <div
                  key={stage.id}
                  style={{ left: `${stage.xPercent}%` }}
                  className="absolute bottom-0 w-[23%] -translate-x-1/2 pb-3"
                >
                  <article
                    data-idx={idx}
                    data-pos="top"
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className="wave-card-inner cursor-default text-center will-change-transform"
                  >
                    <span
                      className={`font-sans text-[11px] font-medium tabular-nums tracking-[0.16em] transition-colors duration-300 ${
                        isHovered ? "text-[#000000]" : "text-[#525252]"
                      }`}
                    >
                      {stage.id}
                    </span>
                    <h3 className="mt-1.5 font-heading text-2xl font-medium leading-[1.18] tracking-[-0.025em] text-[#000000]">
                      {stage.title}
                    </h3>
                    <p className="mx-auto mt-1.5 max-w-[24ch] font-sans text-[14px] leading-[1.58] text-[#525252]">
                      {stage.description}
                    </p>
                  </article>
                </div>
              );
            })}
          </div>

          {/* Bold Wavy SVG Path + 6 Compact Precision Nodes */}
          <div className="relative h-[220px] w-full">
            {/* Base static track & stems */}
            <svg
              viewBox="0 0 1200 220"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="h-full w-full overflow-visible"
            >
              {/* Crisp vertical connector stems aligned dead-center with each node & text block */}
              {PROCESS_STAGES.map((stage, idx) => {
                const isHovered = hoveredIdx === idx;
                return (
                  <line
                    key={`stem-${stage.id}`}
                    x1={stage.cx}
                    y1={stage.cy}
                    x2={stage.cx}
                    y2={stage.position === "top" ? 0 : 220}
                    stroke={isHovered ? "#000000" : "#cfcfcf"}
                    strokeWidth={isHovered ? "1.5" : "1"}
                    strokeDasharray="3 4"
                    vectorEffect="non-scaling-stroke"
                  />
                );
              })}

              {/* Base light grey wave track */}
              <path
                d={WAVE_PATH}
                stroke="#dddddd"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* Scroll-revealed bold black active wave (clip-path spans 100% cleanly on every width) */}
            <div
              ref={activeWaveWrapRef}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
            >
              <svg
                viewBox="0 0 1200 220"
                fill="none"
                preserveAspectRatio="none"
                className="h-full w-full overflow-visible"
              >
                <path
                  d={WAVE_PATH}
                  stroke="#000000"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>

            {/* 6 Compact Nodes Locked Pixel-Accurately to Every Peak & Valley */}
            {PROCESS_STAGES.map((stage, idx) => {
              const isHovered = hoveredIdx === idx;
              const topPercent = (stage.cy / 220) * 100;

              return (
                <div
                  key={`node-${stage.id}`}
                  style={{
                    left: `${stage.xPercent}%`,
                    top: `${topPercent}%`,
                  }}
                  className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                >
                  <button
                    type="button"
                    data-idx={idx}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    onFocus={() => setHoveredIdx(idx)}
                    onBlur={() => setHoveredIdx(null)}
                    aria-label={`Stage ${stage.id}: ${stage.title}`}
                    className="wave-node-inner flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#000000] bg-[#E8DEC8] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#000000] will-change-transform"
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full bg-[#000000] transition-transform duration-300 ${
                        isHovered ? "scale-125" : "scale-100"
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Bottom Valley Stages: 02 Research, 04 Measure, 06 Scale */}
          <div className="relative h-[132px] w-full">
            {bottomStages.map((stage) => {
              const idx = PROCESS_STAGES.findIndex((s) => s.id === stage.id);
              const isHovered = hoveredIdx === idx;

              return (
                <div
                  key={stage.id}
                  style={{ left: `${stage.xPercent}%` }}
                  className="absolute top-0 w-[23%] -translate-x-1/2 pt-3"
                >
                  <article
                    data-idx={idx}
                    data-pos="bottom"
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className="wave-card-inner cursor-default text-center will-change-transform"
                  >
                    <span
                      className={`font-sans text-[11px] font-medium tabular-nums tracking-[0.16em] transition-colors duration-300 ${
                        isHovered ? "text-[#000000]" : "text-[#525252]"
                      }`}
                    >
                      {stage.id}
                    </span>
                    <h3 className="mt-1.5 font-heading text-2xl font-medium leading-[1.18] tracking-[-0.025em] text-[#000000]">
                      {stage.title}
                    </h3>
                    <p className="mx-auto mt-1.5 max-w-[24ch] font-sans text-[14px] leading-[1.58] text-[#525252]">
                      {stage.description}
                    </p>
                  </article>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile & Tablet Clean Vertical Curved Spine */}
        <div className="relative mt-14 pl-10 lg:hidden">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 600"
            preserveAspectRatio="none"
            className="pointer-events-none absolute top-3 bottom-3 left-0 h-[calc(100%-1.5rem)] w-6"
          >
            <path
              d="M 12 0 C 22 50, 2 100, 12 150 C 22 200, 2 250, 12 300 C 22 350, 2 400, 12 450 C 22 500, 2 550, 12 600"
              stroke="#000000"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <div className="flex flex-col gap-10">
            {PROCESS_STAGES.map((stage) => (
              <article key={stage.id} className="how-mobile-stage relative">
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 -left-[2.05rem] flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#000000] bg-[#E8DEC8]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#000000]" />
                </span>

                <span className="font-sans text-[11px] font-medium tabular-nums tracking-[0.16em] text-[#525252]">
                  {stage.id}
                </span>
                <h3 className="mt-1.5 font-heading text-2xl font-medium leading-[1.2] tracking-[-0.02em] text-[#000000]">
                  {stage.title}
                </h3>
                <p className="mt-2 max-w-[38ch] font-sans text-[15px] leading-[1.65] text-[#525252]">
                  {stage.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
