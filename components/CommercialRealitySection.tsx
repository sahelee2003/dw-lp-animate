import RippleDistortion from "./RippleDistortion";

const REALITY_ITEMS = [
  {
    id: "01",
    title: "More spend. Same pipeline.",
    description:
      "Budgets rise while the volume of sales-ready enquiries stays flat.",
  },
  {
    id: "02",
    title: "Leads that never become customers.",
    description:
      "The dashboard looks busy, but quality is inconsistent and sales loses confidence.",
  },
  {
    id: "03",
    title: "Traffic that quietly leaks away.",
    description:
      "People visit, hesitate and leave because the experience does not build enough clarity or trust.",
  },
  {
    id: "04",
    title: "Channels working in isolation.",
    description:
      "Media, creative, website and reporting tell different stories, making growth harder to diagnose.",
  },
  {
    id: "05",
    title: "Activity mistaken for progress.",
    description:
      "Clicks and impressions dominate the conversation while commercial outcomes remain unclear.",
  },
];

function RowArrow() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0 text-[#525252] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:text-[#000000]"
    >
      <path
        d="M3.5 9H14.5M14.5 9L9.75 4.25M14.5 9L9.75 13.75"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export default function CommercialRealitySection() {
  return (
    <section
      id="about"
      className="relative border-b border-[#e5e5e5] bg-[#ffffff]"
    >
      <div className="container mx-auto px-6 py-24 lg:px-10 lg:py-32">
        {/* Top Editorial Header */}
        <div className="max-w-3xl">
          <div className="mb-6 flex items-center gap-3.5">
            <span
              aria-hidden="true"
              className="inline-block h-px w-6 bg-[#525252]"
            />
            <span className="font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-[#525252]">
              The Commercial Reality
            </span>
          </div>

          <h2 className="font-heading text-[2.4rem] font-medium leading-[1.06] tracking-[-0.03em] text-[#000000] sm:text-[3.2rem] lg:text-[3.85rem]">
            Your marketing should
            <br />
            generate business.{" "}
            <em className="font-normal italic">Not just</em>
            <br />
            <em className="font-normal italic">reports.</em>
          </h2>

          <p className="mt-6 max-w-[54ch] font-sans text-base leading-[1.7] text-[#525252] sm:text-[17px]">
            When growth feels harder than it should, the problem is rarely a
            lack of activity. It is usually a lack of connection between that
            activity and the business outcome.
          </p>
        </div>

        {/* Image with Half-Sized Ripple Distortion + Clean 5-Item Editorial List */}
        <div className="mt-14 grid grid-cols-1 gap-12 lg:mt-16 lg:grid-cols-12 lg:items-stretch lg:gap-16">
          {/* Left Image with Ripple Distortion inside circle (half size) */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/4.5] w-full overflow-hidden rounded-md bg-[#f5f5f5] shadow-[0_6px_26px_rgba(0,0,0,0.06)] lg:h-full lg:min-h-[520px] lg:aspect-auto">
              <RippleDistortion
                src="/images/long.jpg"
                alt="Digital Wolf commercial strategy architecture"
                circleRadius={0.12}
                strength={0.038}
                frequency={65.0}
                speed={4.8}
                dispersion={0.06}
              />
            </div>
          </div>

          {/* Right Static Content List (01 - 05) - Original text, zero animation */}
          <div className="lg:col-span-7">
            <div className="divide-y divide-[#e5e5e5] border-y border-[#e5e5e5]">
              {REALITY_ITEMS.map((item) => (
                <article
                  key={item.id}
                  className="group flex items-start justify-between gap-6 py-7 transition-colors duration-200 hover:bg-[#f5f5f5]/60 sm:px-4 sm:py-8"
                >
                  <div className="flex items-start gap-5 sm:gap-7">
                    <span className="mt-1.5 font-sans text-xs font-medium tabular-nums tracking-[0.12em] text-[#525252] transition-colors duration-200 group-hover:text-[#000000]">
                      {item.id}
                    </span>

                    <div>
                      <h3 className="font-heading text-xl font-medium leading-[1.25] tracking-[-0.02em] text-[#000000] sm:text-[1.45rem]">
                        {item.title}
                      </h3>
                      <p className="mt-2 max-w-[50ch] font-sans text-[15px] leading-[1.65] text-[#525252]">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-1.5">
                    <RowArrow />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
