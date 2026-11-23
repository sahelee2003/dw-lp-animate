"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface ProofStat {
  target: number;
  decimals: number;
  suffix: string;
  useCommas: boolean;
  display: string;
  label: string;
  context: string;
}

export const PROOF_STATS: ProofStat[] = [
  {
    target: 12400,
    decimals: 0,
    suffix: "+",
    useCommas: true,
    display: "12,400+",
    label: "Qualified leads generated",
    context: "Across 12-month growth cycle",
  },
  {
    target: 4.2,
    decimals: 1,
    suffix: "×",
    useCommas: false,
    display: "4.2×",
    label: "Verified return on ad spend",
    context: "For multi-channel performance campaigns",
  },
  {
    target: 38,
    decimals: 0,
    suffix: "%",
    useCommas: false,
    display: "38%",
    label: "Acquisition cost reduction",
    context: "Compared with prior baseline period",
  },
  {
    target: 52,
    decimals: 0,
    suffix: "%",
    useCommas: false,
    display: "52%",
    label: "Conversion rate improvement",
    context: "Across redesigned buyer experience",
  },
];

export function formatStatValue(val: number, stat: ProofStat): string {
  if (stat.decimals > 0) {
    return `${val.toFixed(stat.decimals)}${stat.suffix}`;
  }
  const rounded = Math.round(val);
  const formatted = stat.useCommas
    ? rounded.toLocaleString("en-US")
    : String(rounded);
  return `${formatted}${stat.suffix}`;
}

export default function ProofStatsSection({
  embedded = false,
  numberRefs: externalNumberRefs,
}: {
  embedded?: boolean;
  numberRefs?: React.MutableRefObject<(HTMLDivElement | null)[]>;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsGridRef = useRef<HTMLDivElement>(null);
  const internalNumberRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numberRefs = externalNumberRefs || internalNumberRefs;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Standalone desktop mode (when not embedded in pinned slide transition)
      if (!embedded) {
        mm.add(
          "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          () => {
            // Header reveal
            const headerTl = gsap.timeline({
              defaults: { ease: "power4.out" },
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                once: true,
              },
            });

            headerTl
              .from(".proof-eyebrow", {
                y: 14,
                opacity: 0,
                duration: 0.6,
              })
              .from(
                ".proof-line",
                {
                  yPercent: 105,
                  duration: 0.95,
                  stagger: 0.08,
                },
                "-=0.4"
              )
              .from(
                ".proof-subcopy",
                {
                  y: 16,
                  opacity: 0,
                  duration: 0.7,
                },
                "-=0.55"
              );

            // Smooth 60fps scroll-triggered number counters
            const counterTl = gsap.timeline({
              scrollTrigger: {
                trigger: statsGridRef.current,
                start: "top 84%",
                once: true,
              },
            });

            counterTl.from(
              ".proof-stat-col",
              {
                y: 22,
                opacity: 0,
                duration: 0.7,
                stagger: 0.09,
                ease: "power3.out",
                clearProps: "transform,opacity",
              },
              0
            );

            PROOF_STATS.forEach((stat, idx) => {
              const el = numberRefs.current[idx];
              if (!el) return;

              const proxy = { val: 0 };
              el.textContent = formatStatValue(0, stat);

              counterTl.to(
                proxy,
                {
                  val: stat.target,
                  duration: 1.75 + idx * 0.12,
                  ease: "power3.out",
                  onUpdate: () => {
                    el.textContent = formatStatValue(proxy.val, stat);
                  },
                  onComplete: () => {
                    el.textContent = stat.display;
                  },
                },
                idx * 0.1
              );
            });
          }
        );
      }

      // Mobile (< 768px): Clean staggered reveal for both standalone and embedded
      mm.add(
        "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        () => {
          const headerTl = gsap.timeline({
            defaults: { ease: "power4.out" },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              once: true,
            },
          });

          headerTl
            .from(".proof-eyebrow", {
              y: 14,
              opacity: 0,
              duration: 0.6,
            })
            .from(
              ".proof-line",
              {
                yPercent: 105,
                duration: 0.9,
                stagger: 0.08,
              },
              "-=0.4"
            )
            .from(
              ".proof-subcopy",
              {
                y: 16,
                opacity: 0,
                duration: 0.7,
              },
              "-=0.55"
            );

          const counterTl = gsap.timeline({
            scrollTrigger: {
              trigger: statsGridRef.current,
              start: "top 88%",
              once: true,
            },
          });

          counterTl.from(
            ".proof-stat-col",
            {
              y: 20,
              opacity: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: "power3.out",
              clearProps: "transform,opacity",
            },
            0
          );

          PROOF_STATS.forEach((stat, idx) => {
            const el = numberRefs.current[idx];
            if (!el) return;

            const proxy = { val: 0 };
            el.textContent = formatStatValue(0, stat);

            counterTl.to(
              proxy,
              {
                val: stat.target,
                duration: 1.5 + idx * 0.1,
                ease: "power3.out",
                onUpdate: () => {
                  el.textContent = formatStatValue(proxy.val, stat);
                },
                onComplete: () => {
                  el.textContent = stat.display;
                },
              },
              idx * 0.1
            );
          });
        }
      );

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <div
      id={embedded ? undefined : "industries"}
      ref={sectionRef}
      className={`w-full bg-[#ffffff] text-[#000000] ${
        embedded
          ? "flex h-full flex-col justify-center pt-20 pb-10"
          : "border-b border-[#e5e5e5] py-24 lg:py-32"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-10">
        {/* Open Minimal Header */}
        <div className="max-w-2xl">
          <div className="proof-eyebrow mb-5 flex items-center gap-3.5">
            <span
              aria-hidden="true"
              className="inline-block h-px w-6 bg-[#525252]"
            />
            <span className="font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-[#525252]">
              Proof, With Context
            </span>
          </div>

          <h2 className="font-heading text-[2.5rem] font-medium leading-[1.05] tracking-[-0.03em] text-[#000000] sm:text-[3.25rem] lg:text-[4rem]">
            <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
              <span className="proof-line block">
                Growth backed by{" "}
                <em className="font-normal italic">numbers.</em>
              </span>
            </span>
          </h2>

          <p className="proof-subcopy mt-5 max-w-[46ch] font-sans text-base leading-[1.7] text-[#525252]">
            Credible performance includes the baseline, timeframe and
            measurement method — not a headline number in isolation.
          </p>
        </div>

        {/* Simple, Open 4-Column Typographic Stat Strip with Scroll Counter */}
        <div
          ref={statsGridRef}
          className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-x-12"
        >
          {PROOF_STATS.map((stat, idx) => (
            <div
              key={stat.label}
              className="proof-stat-col group relative border-t border-[#e5e5e5] pt-8"
            >
              {/* Crisp expanding black hairline on hover */}
              <span
                aria-hidden="true"
                className="absolute -top-px left-0 h-[1.5px] w-full origin-left scale-x-0 bg-[#000000] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
              />

              <div
                ref={(el) => {
                  numberRefs.current[idx] = el;
                }}
                className="font-heading text-[3.1rem] font-medium leading-none tracking-[-0.04em] tabular-nums text-[#000000] sm:text-[3.6rem] xl:text-[4.1rem]"
              >
                {stat.display}
              </div>

              <h3 className="mt-6 font-heading text-[16px] font-medium leading-snug text-[#000000]">
                {stat.label}
              </h3>

              <p className="mt-1.5 font-sans text-sm leading-relaxed text-[#525252]">
                {stat.context}
              </p>
            </div>
          ))}
        </div>

        {/* Quiet Single-Line Footnote */}
        <p className="mt-16 font-sans text-[11px] uppercase tracking-[0.08em] text-[#525252] lg:mt-20">
          Performance figures are editable placeholders and must be replaced
          with verified data and context before publication.
        </p>
      </div>
    </div>
  );
}
