import CopyButton from "./CopyButton";

export default function HeroSection() {
  return (
    <header className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(255,255,255,0.04) 0%, transparent 70%)",
        }}
      />
      <div className="reveal relative z-10">
        <h1 className="text-[18vw] md:text-[14vw] lg:text-[12vw] font-black tracking-[-0.05em] leading-[0.85] text-white select-none relative">
          <span
            className="italic font-extralight absolute"
            style={{
              fontSize: "1.35em",
              lineHeight: "0.7",
              left: "-0.15em",
              top: "-0.18em",
              opacity: 0.9,
            }}
          >
            /
          </span>
          <span className="relative">strategy</span>
        </h1>
        <p className="mt-8 text-lg md:text-xl text-c47-muted max-w-2xl mx-auto leading-relaxed">
          A free Claude Code plugin that extracts real customer language from
          public data and turns it into personas and ad angles you can use today.
        </p>

        <div className="mt-10 max-w-xl mx-auto">
          <div className="flex items-center gap-3 bg-c47-card border border-c47-border rounded-lg px-5 py-4 font-mono text-sm">
            <span className="text-c47-accent select-none">$</span>
            <code className="flex-1 text-c47-text truncate">
              claude plugin marketplace add channel47
            </code>
            <CopyButton text="claude plugin marketplace add channel47" />
          </div>
        </div>

        <a
          href="#setup"
          className="inline-block mt-6 text-sm text-c47-muted hover:text-c47-accent transition-colors"
        >
          Or have it set up for your team{" "}
          <span className="text-c47-accent">&rarr;</span>
        </a>
      </div>

      <a
        href="mailto:hello@channel47.dev"
        className="absolute bottom-8 right-8 text-sm text-c47-muted hover:text-white transition-colors hidden md:block"
      >
        hello@channel47.dev
      </a>
    </header>
  );
}
