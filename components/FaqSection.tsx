"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    question: "What types of businesses do you work with?",
    answer:
      "We work with growth-minded organizations across B2B and B2C. Fit matters more than size: we look for a clear commercial goal, access to decision-makers and a willingness to measure what matters. Industry experience is discussed transparently during discovery.",
  },
  {
    id: "faq-2",
    question: "Can I hire you for only Google Ads?",
    answer:
      "Yes. You can engage us for a single focused channel such as Google Ads when your broader funnel is already performing well. During onboarding we still audit tracking and landing page clarity so your ad spend converts efficiently.",
  },
  {
    id: "faq-3",
    question: "Do you provide complete digital marketing solutions?",
    answer:
      "Yes. Digital Wolf connects strategy, paid acquisition, SEO, social media, creative production, landing experiences and analytics into one accountable growth system—so every channel reinforces the same commercial target.",
  },
  {
    id: "faq-4",
    question: "How much do your services cost?",
    answer:
      "Engagements are scoped around commercial complexity, channel mix and growth goals rather than rigid off-the-shelf packages. After our discovery call, we share a clear fixed monthly retainer or project proposal with defined deliverables.",
  },
  {
    id: "faq-5",
    question: "Do I need a separate advertising budget?",
    answer:
      "Yes. Media spend is paid directly to platforms like Google and Meta from your own ad accounts so you retain full ownership of your data, billing history and campaign assets. Our management fee is separate and transparent.",
  },
  {
    id: "faq-6",
    question: "How do you measure campaign performance?",
    answer:
      "We tie tracking directly to commercial outcomes—qualified pipeline, acquisition cost, verified return on ad spend and conversion efficiency—rather than vanity impressions. Every engagement begins with reliable attribution setup.",
  },
  {
    id: "faq-7",
    question: "Do you guarantee leads or sales?",
    answer:
      "We do not make unrealistic overnight guarantees because genuine growth depends on market demand, offer competitiveness and sales follow-through. Instead, we establish realistic baselines, clear milestones and disciplined weekly optimization.",
  },
  {
    id: "faq-8",
    question: "How frequently do you share reports?",
    answer:
      "You have continuous access to a live decision-ready dashboard, supported by structured bi-weekly check-ins and monthly executive reviews that explain what moved, why it happened and what we are testing next.",
  },
  {
    id: "faq-9",
    question: "What happens after I submit an enquiry?",
    answer:
      "A senior strategist reviews your enquiry within one business day and schedules a focused discovery call. From there, we assess your current setup and share practical recommendations alongside a tailored engagement roadmap.",
  },
  {
    id: "faq-10",
    question: "Is the initial consultation free?",
    answer:
      "Yes. The initial discovery consultation is completely free and carries zero obligation. Our goal is to understand your business economics and confirm whether Digital Wolf is the right partner before proposing next steps.",
  },
];

function RowArrow({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`shrink-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isOpen
          ? "rotate-90 text-[#000000]"
          : "rotate-0 text-[#525252] group-hover:translate-x-1 group-hover:text-[#000000]"
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

export default function FaqSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power4.out" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        });

        tl.from(".faq-eyebrow", {
          y: 14,
          opacity: 0,
          duration: 0.6,
        })
          .from(
            ".faq-line",
            {
              yPercent: 105,
              duration: 0.95,
              stagger: 0.08,
            },
            "-=0.4"
          )
          .from(
            ".faq-intro",
            {
              y: 16,
              opacity: 0,
              duration: 0.7,
            },
            "-=0.55"
          );
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative overflow-x-clip border-b border-[#e5e5e5] bg-[#f5f5f5]"
    >
      <div className="container mx-auto px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left Sticky Editorial Column */}
          <div className="lg:sticky lg:top-28 lg:col-span-5">
            <div className="faq-eyebrow mb-6 flex items-center gap-3.5">
              <span
                aria-hidden="true"
                className="inline-block h-px w-6 bg-[#525252]"
              />
              <span className="font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-[#525252]">
                Clear Answers
              </span>
            </div>

            <h2 className="font-heading text-[2.45rem] font-medium leading-[1.06] tracking-[-0.03em] text-[#000000] sm:text-[3.1rem] lg:text-[3.5rem]">
              <span className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
                <span className="faq-line block">Questions worth</span>
              </span>
              <span className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
                <span className="faq-line block">
                  asking <em className="font-normal italic">before</em>
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                <span className="faq-line block">
                  <em className="font-normal italic">choosing an agency.</em>
                </span>
              </span>
            </h2>

            <div className="faq-intro">
              <p className="mt-6 max-w-[40ch] font-sans text-base leading-[1.7] text-[#525252]">
                Direct answers create better partnerships. If your question is
                not here, bring it to the discovery call.
              </p>

              <div className="mt-8">
                <MagneticButton
                  href="#contact"
                  variant="primary"
                  size="md"
                  arrow="right"
                >
                  Ask us directly
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Right Column: Compact Hairline Divider List with Left-to-Right Color Sweep */}
          <div className="divide-y divide-[#e5e5e5] border-y border-[#e5e5e5] lg:col-span-7">
            {FAQ_ITEMS.map((item) => {
              const isOpen = openId === item.id;

              return (
                <article
                  key={item.id}
                  className="group relative overflow-hidden"
                >
                  {/* Left-to-right white fill animation on grey section bg */}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 bg-[#ffffff] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
                      isOpen ? "translate-x-0" : "-translate-x-[101%]"
                    }`}
                  />

                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`${item.id}-panel`}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="relative z-10 flex w-full cursor-pointer items-center justify-between gap-6 px-5 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#000000]"
                  >
                    <h3
                      className={`font-heading text-[17px] font-medium leading-[1.35] tracking-[-0.015em] transition-colors duration-300 sm:text-lg ${
                        isOpen
                          ? "text-[#000000]"
                          : "text-[#525252] group-hover:text-[#000000]"
                      }`}
                    >
                      {item.question}
                    </h3>

                    <RowArrow isOpen={isOpen} />
                  </button>

                  {/* Compact Inline Answer Expansion */}
                  <div
                    id={`${item.id}-panel`}
                    className={`relative z-10 grid transition-[grid-template-rows,opacity] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-[62ch] px-5 pt-0.5 pb-5 font-sans text-sm leading-[1.7] text-[#525252]">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
