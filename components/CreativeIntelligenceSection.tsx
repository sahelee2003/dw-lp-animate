"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type DepartmentTabId =
  | "all"
  | "social"
  | "brand"
  | "performance"
  | "video"
  | "promo";

interface PreviewProject {
  id: string;
  department: string;
  title: string;
  note: string;
  image: string;
  objectPosition: string;
}

interface DepartmentConfig {
  id: DepartmentTabId;
  label: string;
  summary: string;
  projects: [PreviewProject, PreviewProject, PreviewProject, PreviewProject];
}

const DEPARTMENTS: DepartmentConfig[] = [
  {
    id: "all",
    label: "All Departments",
    summary: "Cross-channel creative systems built for commercial recall.",
    projects: [
      {
        id: "01",
        department: "SOCIAL MEDIA",
        title: "Always-on social system",
        note: "Editorial rhythm",
        image: "/images/short.jpg",
        objectPosition: "object-center",
      },
      {
        id: "02",
        department: "PERFORMANCE CREATIVES",
        title: "Performance creative lab",
        note: "Test / learn / scale",
        image: "/images/long.jpg",
        objectPosition: "object-center",
      },
      {
        id: "03",
        department: "BRAND CAMPAIGNS",
        title: "Category launch platform",
        note: "Distinctive by design",
        image: "/images/long.jpg",
        objectPosition: "object-top",
      },
      {
        id: "04",
        department: "VIDEO & MOTION",
        title: "Product story in motion",
        note: "Explain with energy",
        image: "/images/short.jpg",
        objectPosition: "object-right",
      },
    ],
  },
  {
    id: "social",
    label: "Social Media",
    summary: "Editorial cadence and thumb-stopping formats that build trust.",
    projects: [
      {
        id: "01",
        department: "SOCIAL MEDIA",
        title: "Always-on social system",
        note: "Editorial rhythm",
        image: "/images/short.jpg",
        objectPosition: "object-right",
      },
      {
        id: "02",
        department: "SOCIAL MEDIA",
        title: "Founder authority series",
        note: "Executive narrative",
        image: "/images/long.jpg",
        objectPosition: "object-top",
      },
      {
        id: "03",
        department: "SOCIAL MEDIA",
        title: "Short-form hook library",
        note: "Retention first",
        image: "/images/long.jpg",
        objectPosition: "object-bottom",
      },
      {
        id: "04",
        department: "SOCIAL MEDIA",
        title: "Creator collaboration system",
        note: "Trusted reach",
        image: "/images/short.jpg",
        objectPosition: "object-left",
      },
    ],
  },
  {
    id: "brand",
    label: "Brand Campaigns",
    summary: "High-conviction positioning platforms designed to own categories.",
    projects: [
      {
        id: "01",
        department: "BRAND CAMPAIGNS",
        title: "Category launch platform",
        note: "Distinctive by design",
        image: "/images/short.jpg",
        objectPosition: "object-left",
      },
      {
        id: "02",
        department: "BRAND CAMPAIGNS",
        title: "Visual identity manifesto",
        note: "Positioning clarity",
        image: "/images/long.jpg",
        objectPosition: "object-bottom",
      },
      {
        id: "03",
        department: "BRAND CAMPAIGNS",
        title: "Flagship positioning film",
        note: "Commercial storytelling",
        image: "/images/long.jpg",
        objectPosition: "object-center",
      },
      {
        id: "04",
        department: "BRAND CAMPAIGNS",
        title: "Multi-market brand rollout",
        note: "Unified architecture",
        image: "/images/short.jpg",
        objectPosition: "object-center",
      },
    ],
  },
  {
    id: "performance",
    label: "Performance Creatives",
    summary: "Iterative ad creative engineered directly for ROAS and CPA.",
    projects: [
      {
        id: "01",
        department: "PERFORMANCE CREATIVES",
        title: "Performance creative lab",
        note: "Test / learn / scale",
        image: "/images/short.jpg",
        objectPosition: "object-center",
      },
      {
        id: "02",
        department: "PERFORMANCE CREATIVES",
        title: "High-intent Meta ad matrix",
        note: "Paid acquisition",
        image: "/images/long.jpg",
        objectPosition: "object-center",
      },
      {
        id: "03",
        department: "PERFORMANCE CREATIVES",
        title: "Modular UGC test framework",
        note: "Rapid creative sprints",
        image: "/images/long.jpg",
        objectPosition: "object-top",
      },
      {
        id: "04",
        department: "PERFORMANCE CREATIVES",
        title: "ROAS creative iteration",
        note: "Compounding winners",
        image: "/images/short.jpg",
        objectPosition: "object-right",
      },
    ],
  },
  {
    id: "video",
    label: "Video & Motion",
    summary: "Kinetic product stories and brand films that earn attention.",
    projects: [
      {
        id: "01",
        department: "VIDEO & MOTION",
        title: "Product story in motion",
        note: "Explain with energy",
        image: "/images/short.jpg",
        objectPosition: "object-right",
      },
      {
        id: "02",
        department: "VIDEO & MOTION",
        title: "3D interface sequences",
        note: "Precision visuals",
        image: "/images/long.jpg",
        objectPosition: "object-bottom",
      },
      {
        id: "03",
        department: "VIDEO & MOTION",
        title: "Kinetic typography reels",
        note: "Thumb-stopping pace",
        image: "/images/long.jpg",
        objectPosition: "object-center",
      },
      {
        id: "04",
        department: "VIDEO & MOTION",
        title: "Brand anthem film cutdowns",
        note: "Multi-format delivery",
        image: "/images/short.jpg",
        objectPosition: "object-left",
      },
    ],
  },
  {
    id: "promo",
    label: "Promotional Campaigns",
    summary: "Margin-aware launch sprints built for peak demand windows.",
    projects: [
      {
        id: "01",
        department: "PROMOTIONAL CAMPAIGNS",
        title: "Q4 peak demand playbook",
        note: "Revenue acceleration",
        image: "/images/short.jpg",
        objectPosition: "object-left",
      },
      {
        id: "02",
        department: "PROMOTIONAL CAMPAIGNS",
        title: "Omnichannel flash campaign",
        note: "Synchronized urgency",
        image: "/images/long.jpg",
        objectPosition: "object-center",
      },
      {
        id: "03",
        department: "PROMOTIONAL CAMPAIGNS",
        title: "Offer architecture sprints",
        note: "Margin-aware hooks",
        image: "/images/long.jpg",
        objectPosition: "object-top",
      },
      {
        id: "04",
        department: "PROMOTIONAL CAMPAIGNS",
        title: "Retention & win-back creative",
        note: "Lifecycle expansion",
        image: "/images/short.jpg",
        objectPosition: "object-right",
      },
    ],
  },
];

function ArrowIcon({ active = false }: { active?: boolean }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`shrink-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        active
          ? "translate-x-1 text-[#000000]"
          : "translate-x-0 text-[#525252] group-hover:translate-x-1 group-hover:text-[#000000]"
      }`}
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

export default function CreativeIntelligenceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const isFirstRenderRef = useRef(true);

  const [activeTab, setActiveTab] = useState<DepartmentTabId>("all");

  const currentDepartment =
    DEPARTMENTS.find((d) => d.id === activeTab) ?? DEPARTMENTS[0];

  // Header masked reveal + initial scroll reveal on blocks
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

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
          .from(".creative-eyebrow", {
            y: 14,
            opacity: 0,
            duration: 0.6,
          })
          .from(
            ".creative-line",
            {
              yPercent: 105,
              duration: 0.95,
              stagger: 0.08,
            },
            "-=0.4"
          )
          .from(
            ".creative-subcopy",
            {
              y: 16,
              opacity: 0,
              duration: 0.7,
            },
            "-=0.55"
          )
          .from(
            ".creative-preview-tile",
            {
              y: 28,
              opacity: 0,
              duration: 0.7,
              stagger: 0.08,
              clearProps: "transform,opacity",
            },
            "-=0.45"
          );
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  // Clean staggered preview cross-fade when switching department tabs
  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || !previewRef.current) return;

    const tiles = previewRef.current.querySelectorAll<HTMLElement>(
      ".creative-preview-tile"
    );
    if (tiles.length === 0) return;

    gsap.killTweensOf(tiles);
    gsap.fromTo(
      tiles,
      {
        y: 22,
        scale: 0.98,
        opacity: 0,
        force3D: true,
      },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.55,
        stagger: 0.07,
        ease: "power3.out",
        force3D: true,
        clearProps: "transform",
      }
    );
  }, [activeTab]);

  return (
    <section
      id="creative"
      ref={sectionRef}
      className="relative overflow-x-clip border-b border-[#e5e5e5] bg-[#ffffff]"
    >
      <div className="container mx-auto px-6 py-24 lg:px-10 lg:py-32">
        {/* Clean Split Header */}
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="creative-eyebrow mb-6 flex items-center gap-3.5">
              <span
                aria-hidden="true"
                className="inline-block h-px w-6 bg-[#525252]"
              />
              <span className="font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-[#525252]">
                Creative Intelligence
              </span>
            </div>

            <h2 className="font-heading text-[2.45rem] font-medium leading-[1.06] tracking-[-0.03em] text-[#000000] sm:text-[3.25rem] lg:text-[3.9rem]">
              <span className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
                <span className="creative-line block">
                  Creativity that makes your
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                <span className="creative-line block">
                  brand{" "}
                  <em className="font-normal italic">impossible to ignore.</em>
                </span>
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="creative-subcopy max-w-[44ch] font-sans text-base leading-[1.7] text-[#525252] sm:text-[17px] lg:ml-auto">
              Distinctive work is not decoration. It earns attention,
              communicates value and gives performance media more room to work.
            </p>
          </div>
        </div>

        {/* Interactive Split: Sticky Left Department Tabs (No Numbering) + Right 2x2 Uniform Grid */}
        <div className="mt-14 grid grid-cols-1 items-start gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Clean Sticky Department Selector (No Numbering) */}
          <div
            role="tablist"
            aria-label="Creative department projects"
            className="divide-y divide-[#e5e5e5] border-y border-[#e5e5e5] lg:sticky lg:top-28 lg:col-span-4"
          >
            {DEPARTMENTS.map((dept) => {
              const isSelected = dept.id === activeTab;

              return (
                <button
                  key={dept.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`creative-panel-${dept.id}`}
                  onClick={() => setActiveTab(dept.id)}
                  className="group relative w-full cursor-pointer overflow-hidden bg-[#ffffff] px-5 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#000000]"
                >
                  {/* Left-to-right grey fill animation on white section bg */}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 bg-[#f5f5f5] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
                      isSelected ? "translate-x-0" : "-translate-x-[101%]"
                    }`}
                  />

                  <div className="relative z-10 flex items-center justify-between gap-4">
                    <span
                      className={`font-heading text-lg font-medium tracking-[-0.015em] transition-colors duration-300 ${
                        isSelected
                          ? "text-[#000000]"
                          : "text-[#525252] group-hover:text-[#000000]"
                      }`}
                    >
                      {dept.label}
                    </span>

                    <ArrowIcon active={isSelected} />
                  </div>

                  {/* Clean one-line summary shown smoothly for the active department */}
                  <div
                    className={`relative z-10 grid transition-[grid-template-rows,opacity] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isSelected
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pt-2.5 font-sans text-xs leading-[1.6] text-[#525252]">
                        {dept.summary}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Clean Uniform 2x2 Grid (4 Equal 4:3 Blocks) */}
          <div
            ref={previewRef}
            id={`creative-panel-${currentDepartment.id}`}
            role="tabpanel"
            className="grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:col-span-8 lg:gap-x-7 lg:gap-y-10"
          >
            {currentDepartment.projects.map((item) => (
              <article
                key={`${currentDepartment.id}-${item.id}`}
                className="creative-preview-tile group flex flex-col will-change-transform"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-[#f5f5f5]">
                  <Image
                    src={item.image}
                    alt={`${item.title} — ${item.department}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className={`object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 ${item.objectPosition}`}
                  />
                </div>

                <div className="mt-4 border-b border-[#e5e5e5] pb-4 transition-colors duration-300 group-hover:border-[#000000]">
                  <div className="flex items-center justify-between gap-4 font-sans text-[10.5px] uppercase tracking-[0.14em] text-[#525252]">
                    <span>{item.department}</span>
                    <span className="normal-case tracking-normal">
                      {item.note}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-4">
                    <h3 className="font-heading text-lg font-medium leading-snug tracking-[-0.02em] text-[#000000]">
                      {item.title}
                    </h3>
                    <ArrowIcon />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
