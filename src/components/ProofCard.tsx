export default function ProofCard() {
  return (
    <article className="group cursor-pointer">
      <div
        className="aspect-[4/3] overflow-hidden rounded-sm relative flex items-center justify-center p-10"
        style={{
          background:
            "radial-gradient(ellipse at bottom left, rgba(255,107,80,0.08), transparent 60%), #111111",
        }}
      >
        <div className="relative z-10">
          <p className="text-xl md:text-2xl leading-snug text-zinc-300 italic font-light">
            &ldquo;Built from running creative strategy across 25+ DTC brands.
            Every framework was used in production before it became a
            skill.&rdquo;
          </p>
          <p className="text-xs text-[#666666] font-mono mt-6">
            // Used by marketers managing paid media across Google, Meta, and
            Microsoft Ads.
          </p>
        </div>
      </div>
      <div className="mt-8 flex justify-between items-start">
        <div>
          <h3 className="text-3xl font-bold tracking-tight mb-2 group-hover:text-c47-accent transition-colors duration-300">
            BUILT FROM REAL WORK
          </h3>
          <p className="text-[#666666] text-[10px] font-bold uppercase tracking-[0.2em]">
            25+ DTC Brands / Production
          </p>
        </div>
        <div className="p-3 rounded-full border border-[#333333] group-hover:bg-c47-accent group-hover:text-black group-hover:border-transparent transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(255,107,80,0.3)] group-hover:scale-110">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </div>
      </div>
    </article>
  );
}
