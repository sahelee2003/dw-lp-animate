const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Our Work", href: "#work" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Services", href: "#services" },
  { label: "FAQ", href: "#faq" },
];

const CAPABILITY_LINKS = [
  "Performance Marketing",
  "Search Engine Optimization",
  "Social Media Marketing",
  "Web & Landing Experiences",
  "Creative & Content",
  "Analytics & Intelligence",
];

function ArrowUpIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M7 11.5V2.5M7 2.5L3 6.5M7 2.5L11 6.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#f5f5f5] text-[#000000]">
      <div className="container mx-auto px-6 lg:px-10">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-12 lg:py-20">
          {/* Brand Summary */}
          <div className="md:col-span-5">
            <a
              href="#home"
              aria-label="DW — Digital Wolf Home"
              className="inline-flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#000000]"
            >
              <span
                aria-hidden="true"
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#000000] font-heading text-[12px] font-bold tracking-[-0.04em] text-[#ffffff]"
              >
                DW
              </span>
              <span className="font-heading text-[15px] font-semibold tracking-[0.14em] text-[#000000]">
                DIGITAL WOLF
              </span>
            </a>

            <p className="mt-5 max-w-[34ch] font-sans text-sm leading-[1.7] text-[#525252]">
              Business-first digital growth—connecting strategy, performance
              media, creative, data and technology into measurable commercial
              momentum.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2">
            <h3 className="font-sans text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#000000]">
              Navigation
            </h3>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="font-sans text-sm text-[#525252] transition-colors duration-200 hover:text-[#000000]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Capabilities */}
          <div className="md:col-span-3">
            <h3 className="font-sans text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#000000]">
              Capabilities
            </h3>
            <ul className="mt-5 space-y-3">
              {CAPABILITY_LINKS.map((label) => (
                <li key={label}>
                  <a
                    href="#services"
                    className="font-sans text-sm text-[#525252] transition-colors duration-200 hover:text-[#000000]"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="md:col-span-2">
            <h3 className="font-sans text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#000000]">
              Connect
            </h3>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="mailto:hello@digitalwolf.com"
                  className="font-sans text-sm text-[#525252] transition-colors duration-200 hover:text-[#000000]"
                >
                  hello@digitalwolf.com
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="font-sans text-sm text-[#525252] transition-colors duration-200 hover:text-[#000000]"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="font-sans text-sm text-[#525252] transition-colors duration-200 hover:text-[#000000]"
                >
                  Instagram
                </a>
              </li>
              <li className="pt-1">
                <a
                  href="#contact"
                  className="inline-block border-b border-[#000000] pb-0.5 font-sans text-sm font-medium text-[#000000] transition-opacity duration-200 hover:opacity-70"
                >
                  Start a project →
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Minimal Bottom Legal & Back-to-Top Bar */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-[#e5e5e5] py-6 sm:flex-row sm:items-center">
          <p className="font-sans text-xs text-[#525252]">
            © 2026 DW — Digital Wolf. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#home"
              className="font-sans text-xs text-[#525252] transition-colors duration-200 hover:text-[#000000]"
            >
              Privacy Policy
            </a>
            <a
              href="#home"
              className="font-sans text-xs text-[#525252] transition-colors duration-200 hover:text-[#000000]"
            >
              Terms
            </a>
            <a
              href="#home"
              aria-label="Back to top"
              className="group inline-flex items-center gap-2 font-sans text-xs font-medium text-[#000000]"
            >
              <span>Top</span>
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-sm bg-[#ffffff] text-[#000000] transition-colors duration-300 group-hover:bg-[#E8DEC8]">
                <ArrowUpIcon />
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
