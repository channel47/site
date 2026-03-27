import AnimatedLogo from "./AnimatedLogo";

export default function TopNavigation() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50">
      <div
        className="backdrop-blur-xl border-b border-white/[0.08]"
        style={{
          background: "rgba(17,17,17,0.75)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-3">
          <div className="flex items-center gap-8">
            <a
              href="/"
              aria-label="channel47 home"
            >
              <AnimatedLogo />
            </a>
            <div className="hidden md:flex items-center gap-6 text-sm">
              <a
                href="#"
                className="text-white font-medium hover:text-c47-accent transition-colors"
              >
                Home
              </a>
              <a
                href="#skills"
                className="text-c47-muted hover:text-white transition-colors"
              >
                Skills
              </a>
              <a
                href="#proof"
                className="text-c47-muted hover:text-white transition-colors"
              >
                Proof
              </a>
              <a
                href="#setup"
                className="text-c47-muted hover:text-white transition-colors"
              >
                Setup
              </a>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#newsletter"
              className="hidden md:block text-sm text-c47-muted hover:text-white transition-colors"
            >
              Build Notes
            </a>
            <a
              href="#setup"
              className="text-sm font-medium text-white border border-white/20 rounded-full px-5 py-2 hover:bg-white/10 transition-all"
            >
              Get started
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
