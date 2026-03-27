export default function FooterHero() {
  return (
    <div>
      <h2 className="text-[14vw] md:text-[10vw] leading-[0.85] font-black tracking-tighter mb-12 select-none text-gradient">
        LET&rsquo;S
        <br />
        TALK.
      </h2>
      <div className="flex flex-col gap-6">
        <a
          href="mailto:hello@channel47.dev"
          className="text-3xl md:text-4xl font-semibold hover:text-c47-accent transition-all duration-300 w-fit"
        >
          hello@channel47.dev
        </a>
        <p className="text-[#666666] flex items-center gap-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Available for worldwide collaborations.
        </p>
      </div>
    </div>
  );
}
