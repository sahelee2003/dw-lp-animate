"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SERVICE_OPTIONS = [
  "Performance Marketing",
  "Search Engine Optimization",
  "Social Media Marketing",
  "Web & Landing Experiences",
  "Creative & Content",
  "Analytics & Intelligence",
  "Complete Growth System",
];

function CheckIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
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

function ChatIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 5.5H16V13.5H8.5L5 16.5V13.5H4V5.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5"
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

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

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

        tl.from(".contact-eyebrow", {
          y: 14,
          opacity: 0,
          duration: 0.6,
        })
          .from(
            ".contact-line",
            {
              yPercent: 105,
              duration: 0.95,
              stagger: 0.08,
            },
            "-=0.4"
          )
          .from(
            ".contact-subcopy",
            {
              y: 16,
              opacity: 0,
              duration: 0.7,
            },
            "-=0.55"
          )
          .from(
            ".contact-panel",
            {
              y: 26,
              opacity: 0,
              duration: 0.75,
              stagger: 0.1,
              clearProps: "transform,opacity",
            },
            "-=0.45"
          );
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-x-clip border-b border-[#e5e5e5] bg-[#ffffff]"
    >
      {/* Architectural BG Graph Design (flat SVG grid strokes, zero gradients, skill.md palette) */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <defs>
          <pattern
            id="contact-bg-graph"
            width="56"
            height="56"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 56 0 L 0 0 0 56"
              fill="none"
              stroke="#d4d4d4"
              strokeWidth="1"
              strokeOpacity="0.45"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#contact-bg-graph)" />
      </svg>

      <div className="container relative z-10 mx-auto px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Column (5 cols): Editorial Copy + Guidance & WhatsApp Blocks */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <div className="contact-eyebrow mb-6 flex items-center gap-3.5">
                <span
                  aria-hidden="true"
                  className="inline-block h-px w-6 bg-[#525252]"
                />
                <span className="font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-[#525252]">
                  Let&apos;s Explore The Opportunity
                </span>
              </div>

              <h2 className="font-heading text-[2.45rem] font-medium leading-[1.05] tracking-[-0.035em] text-[#000000] sm:text-[3.1rem] lg:text-[3.5rem]">
                <span className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
                  <span className="contact-line block">Your next phase</span>
                </span>
                <span className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
                  <span className="contact-line block">of business growth</span>
                </span>
                <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                  <span className="contact-line block">
                    starts with{" "}
                    <em className="font-normal italic">a conversation.</em>
                  </span>
                </span>
              </h2>

              <p className="contact-subcopy mt-6 max-w-[44ch] font-sans text-base leading-[1.7] text-[#525252]">
                Tell us where your business stands, what challenges you&apos;re
                facing and where you want to go. Let&apos;s explore how the
                right digital strategy can help you get there.
              </p>
            </div>

            {/* Supporting Blocks Placed Cleanly Under Left Content */}
            <div className="mt-10 flex flex-col gap-4">
              {/* What Happens Next */}
              <div className="contact-panel rounded-md bg-[#f5f5f5] p-6">
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-[#E8DEC8] text-[#000000]">
                    <CheckIcon />
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-medium tracking-[-0.015em] text-[#000000]">
                      What happens next?
                    </h3>
                    <p className="mt-1.5 font-sans text-sm leading-[1.65] text-[#525252]">
                      A strategist reviews your brief and contacts you to
                      arrange a focused discovery call.
                    </p>
                  </div>
                </div>
              </div>

              {/* Prefer WhatsApp Direct Channel */}
              <div className="contact-panel rounded-md bg-[#000000] p-6 text-[#ffffff]">
                <span className="font-sans text-[10px] font-medium uppercase tracking-[0.16em] text-[#a3a3a3]">
                  Prefer WhatsApp?
                </span>

                <a
                  href="#contact"
                  className="group mt-3.5 flex items-center justify-between gap-4 border-b border-[#262626] pb-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffffff]"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-sm bg-[#1a1a1a] text-[#ffffff] transition-colors duration-300 group-hover:bg-[#E8DEC8] group-hover:text-[#000000]">
                      <ChatIcon />
                    </span>
                    <span className="font-heading text-base font-medium tracking-[-0.015em] text-[#ffffff]">
                      Start a conversation
                    </span>
                  </div>
                  <ArrowIcon />
                </a>

                <p className="mt-3 font-sans text-xs text-[#a3a3a3]">
                  Replace with your verified business number.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Clean Minimal Form Card */}
          <div className="contact-panel rounded-md bg-[#f5f5f5] p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:p-10 lg:col-span-7 lg:p-12">
            {submitted ? (
              <div className="py-12">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-sm bg-[#E8DEC8] text-[#000000]">
                  <CheckIcon />
                </span>
                <h3 className="mt-6 font-heading text-2xl font-medium tracking-[-0.025em] text-[#000000] sm:text-3xl">
                  Your brief is in.
                </h3>
                <p className="mt-3 max-w-[46ch] font-sans text-base leading-[1.7] text-[#525252]">
                  A senior Digital Wolf strategist will review your goals and
                  reach out within one business day to schedule your focused
                  discovery call.
                </p>
                <div className="mt-8">
                  <MagneticButton
                    type="button"
                    variant="primary"
                    size="md"
                    arrow="right"
                    onClick={() => setSubmitted(false)}
                  >
                    Send another enquiry
                  </MagneticButton>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block font-sans text-[10.5px] font-medium uppercase tracking-[0.15em] text-[#525252]"
                    >
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className="mt-2.5 w-full border-b border-[#d4d4d4] bg-transparent pb-3 font-sans text-[15px] text-[#000000] placeholder:text-[#525252]/65 transition-colors duration-200 focus:border-[#000000] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block font-sans text-[10.5px] font-medium uppercase tracking-[0.15em] text-[#525252]"
                    >
                      Phone Number
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      placeholder="+00 00000 00000"
                      className="mt-2.5 w-full border-b border-[#d4d4d4] bg-transparent pb-3 font-sans text-[15px] text-[#000000] placeholder:text-[#525252]/65 transition-colors duration-200 focus:border-[#000000] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-company"
                      className="block font-sans text-[10.5px] font-medium uppercase tracking-[0.15em] text-[#525252]"
                    >
                      Company or Brand
                    </label>
                    <input
                      id="contact-company"
                      name="company"
                      type="text"
                      placeholder="Your company"
                      className="mt-2.5 w-full border-b border-[#d4d4d4] bg-transparent pb-3 font-sans text-[15px] text-[#000000] placeholder:text-[#525252]/65 transition-colors duration-200 focus:border-[#000000] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block font-sans text-[10.5px] font-medium uppercase tracking-[0.15em] text-[#525252]"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      className="mt-2.5 w-full border-b border-[#d4d4d4] bg-transparent pb-3 font-sans text-[15px] text-[#000000] placeholder:text-[#525252]/65 transition-colors duration-200 focus:border-[#000000] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-service"
                    className="block font-sans text-[10.5px] font-medium uppercase tracking-[0.15em] text-[#525252]"
                  >
                    What can we help with?
                  </label>
                  <select
                    id="contact-service"
                    name="service"
                    defaultValue=""
                    className="mt-2.5 w-full cursor-pointer border-b border-[#d4d4d4] bg-transparent pb-3 font-sans text-[15px] text-[#000000] transition-colors duration-200 focus:border-[#000000] focus:outline-none"
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {SERVICE_OPTIONS.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-challenge"
                    className="block font-sans text-[10.5px] font-medium uppercase tracking-[0.15em] text-[#525252]"
                  >
                    Tell us about the challenge
                  </label>
                  <textarea
                    id="contact-challenge"
                    name="challenge"
                    rows={3}
                    placeholder="Where are you now, and what would meaningful growth look like?"
                    className="mt-2.5 w-full resize-none border-b border-[#d4d4d4] bg-transparent pb-3 font-sans text-[15px] leading-relaxed text-[#000000] placeholder:text-[#525252]/65 transition-colors duration-200 focus:border-[#000000] focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <MagneticButton
                    type="submit"
                    variant="primary"
                    size="md"
                    arrow="right"
                    fullWidth
                  >
                    Discuss my growth goals
                  </MagneticButton>

                  <p className="mt-4 text-center font-sans text-xs leading-relaxed text-[#525252]">
                    No obligation. No hard sell. We&apos;ll only use your
                    details to understand and respond to your requirements.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
