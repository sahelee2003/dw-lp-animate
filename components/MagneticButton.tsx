"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type ArrowDirection = "right" | "down-right" | "none";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  size?: "sm" | "md";
  arrow?: ArrowDirection;
  className?: string;
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
}

function ArrowIcon({ direction }: { direction: ArrowDirection }) {
  if (direction === "none") return null;

  if (direction === "down-right") {
    return (
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M3.5 3.5L10.5 10.5M10.5 10.5V4.5M10.5 10.5H4.5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>
    );
  }

  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M2.5 7.5H12.5M12.5 7.5L8.25 3.25M12.5 7.5L8.25 11.75"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  arrow = "right",
  className = "",
  fullWidth = false,
  type = "button",
}: MagneticButtonProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const magneticRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const contentRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const buttonEl = magneticRef.current;
      const contentEl = contentRef.current;
      if (!buttonEl || !contentEl) return;

      const mm = gsap.matchMedia();

      mm.add(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const xTo = gsap.quickTo(buttonEl, "x", {
            duration: 0.45,
            ease: "power3.out",
          });
          const yTo = gsap.quickTo(buttonEl, "y", {
            duration: 0.45,
            ease: "power3.out",
          });
          const innerXTo = gsap.quickTo(contentEl, "x", {
            duration: 0.45,
            ease: "power3.out",
          });
          const innerYTo = gsap.quickTo(contentEl, "y", {
            duration: 0.45,
            ease: "power3.out",
          });

          const handleMouseMove = (event: MouseEvent) => {
            const rect = buttonEl.getBoundingClientRect();
            const relX = event.clientX - (rect.left + rect.width / 2);
            const relY = event.clientY - (rect.top + rect.height / 2);

            xTo(relX * 0.22);
            yTo(relY * 0.28);
            innerXTo(relX * 0.08);
            innerYTo(relY * 0.1);
          };

          const handleMouseLeave = () => {
            gsap.to(buttonEl, {
              x: 0,
              y: 0,
              duration: 0.65,
              ease: "elastic.out(1, 0.45)",
            });
            gsap.to(contentEl, {
              x: 0,
              y: 0,
              duration: 0.65,
              ease: "elastic.out(1, 0.45)",
            });
          };

          buttonEl.addEventListener("mousemove", handleMouseMove);
          buttonEl.addEventListener("mouseleave", handleMouseLeave);

          return () => {
            buttonEl.removeEventListener("mousemove", handleMouseMove);
            buttonEl.removeEventListener("mouseleave", handleMouseLeave);
            gsap.set([buttonEl, contentEl], { clearProps: "transform" });
          };
        }
      );

      return () => mm.revert();
    },
    { scope: wrapRef }
  );

  const isPrimary = variant === "primary";

  const sizeClasses =
    size === "sm"
      ? "px-5 py-2.5 text-[13px] gap-2.5"
      : "px-6 py-3.5 text-sm gap-3";

  const variantClasses = isPrimary
    ? "bg-[#000000] text-[#ffffff] border border-[#000000]"
    : "bg-[#ffffff] text-[#000000] border border-[#e5e5e5] hover:border-[#000000]";

  const curtainColor = isPrimary ? "bg-[#ffffff]" : "bg-[#000000]";
  const hoverTextColor = isPrimary ? "text-[#000000]" : "text-[#ffffff]";

  const arrowExitClass =
    arrow === "down-right"
      ? "group-hover:translate-x-4 group-hover:translate-y-4"
      : "group-hover:translate-x-5";

  const arrowEnterStartClass =
    arrow === "down-right"
      ? "-translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0"
      : "-translate-x-5 group-hover:translate-x-0";

  const sharedClassName = [
    "group relative inline-flex items-center justify-center overflow-hidden rounded-md font-medium tracking-[-0.01em]",
    "transition-[border-color,transform] duration-300 active:scale-[0.98]",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#000000]",
    "will-change-transform select-none cursor-pointer",
    sizeClasses,
    variantClasses,
    className,
  ].join(" ");

  const innerMarkup = (
    <>
      {/* Flat solid monochrome sweep layer (no gradients) */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 translate-y-[102%] ${curtainColor} transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 will-change-transform`}
      />

      {/* Kinetic dual-track label + arrow */}
      <span
        ref={contentRef}
        className="relative z-10 inline-flex items-center gap-2.5 will-change-transform"
      >
        <span className="relative block overflow-hidden leading-[1.35]">
          <span className="block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
            {children}
          </span>
          <span
            aria-hidden="true"
            className={`absolute inset-0 block translate-y-full ${hoverTextColor} transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0`}
          >
            {children}
          </span>
        </span>

        {arrow !== "none" && (
          <span className="relative inline-flex h-4 w-4 items-center justify-center overflow-hidden">
            <span
              className={`inline-flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${arrowExitClass}`}
            >
              <ArrowIcon direction={arrow} />
            </span>
            <span
              aria-hidden="true"
              className={`absolute inset-0 inline-flex items-center justify-center ${hoverTextColor} transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${arrowEnterStartClass}`}
            >
              <ArrowIcon direction={arrow} />
            </span>
          </span>
        )}
      </span>
    </>
  );

  return (
    <div ref={wrapRef} className={fullWidth ? "block w-full" : "inline-block"}>
      {href ? (
        <a
          ref={magneticRef}
          href={href}
          onClick={onClick}
          className={`${sharedClassName} ${fullWidth ? "w-full" : ""}`}
        >
          {innerMarkup}
        </a>
      ) : (
        <button
          ref={magneticRef}
          type={type}
          onClick={onClick}
          className={`${sharedClassName} ${fullWidth ? "w-full" : ""}`}
        >
          {innerMarkup}
        </button>
      )}
    </div>
  );
}
