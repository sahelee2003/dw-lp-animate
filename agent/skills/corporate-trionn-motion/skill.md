---
name: corporate-trionn-motion
description: Builds a minimalist 1-page corporate landing page in Next.js App Router with alternating #ffffff / #f5f5f5 sections, pure black typography/CTAs, and Trionn-style Lenis smooth scroll + GSAP ScrollTrigger animations.
---

# Corporate 1-Page Landing Page & Motion Guidelines

## 1. Strict Visual & Color System
- **Architecture:** Single-page landing page (`src/app/page.tsx`) with smooth anchor navigation (`#about`, `#services`, `#work`, `#contact`).
- **Background Rhythm:** Alternate section backgrounds strictly between `#ffffff` (white) and `#f5f5f5` (light neutral gray). Never place two sections with the same background color adjacent to each other.
- **Typography & Contrast:**
  - Primary Headings & Body Text: `#000000` (pure black) with high contrast and generous whitespace (`py-24` to `py-32`).
  - Secondary / Muted Labels: `#525252` (neutral-600) only for small eyebrows, captions, or borders (`#e5e5e5`).
- **Buttons:** Solid `#000000` background with `#ffffff` text (`rounded-full` or crisp `rounded-md`), featuring a subtle magnetic cursor pull on desktop hover.

## 2. Smooth Scroll Setup (Lenis + GSAP Sync)
- Create a client wrapper component `src/components/SmoothScroll.tsx` using `lenis` synchronized with `gsap.ticker` and `ScrollTrigger.update`.
- Wrap `{children}` in `src/app/layout.tsx` inside `<SmoothScroll>` so mouse-wheel inertia drives all ScrollTrigger animations cleanly without jitter.

## 3. Trionn-Style Animation Rules
- **Hook Discipline:** Always use `useGSAP()` from `@gsap/react` with a container `scope` ref for automatic React cleanup. Never leave raw `ScrollTrigger` instances uncleaned.
- **Masked Text Reveals:** Wrap hero and section headlines in `overflow-hidden` containers and animate inner lines from `yPercent: 100` to `yPercent: 0` with `power4.out` easing.
- **Mouse-Scroll Scrubbing:** On featured showcase/service sections, use `ScrollTrigger` with `scrub: 1.2` to smoothly scale media/cards (`scale: 0.92` to `1`) and apply subtle vertical parallax (`y: -40` to `40`) tied to scroll position.
- **Performance:** Only animate GPU-composited properties (`transform`, `opacity`, `clip-path`). Never animate `height`, `top`, `left`, or `margin`.
- **Accessibility:** Wrap scroll animations in `gsap.matchMedia()` to respect `(prefers-reduced-motion: reduce)` and tone down heavy pinning on mobile viewports (`max-width: 767px`).
