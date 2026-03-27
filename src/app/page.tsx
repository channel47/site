import ScrollReveal from "@/components/ScrollReveal";
import TopNavigation from "@/components/TopNavigation";
import FloatingBottomNav from "@/components/FloatingBottomNav";
import HeroSection from "@/components/HeroSection";
import SectionHeader from "@/components/SectionHeader";
import StepCard from "@/components/StepCard";
import TerminalQuoteWindow from "@/components/TerminalQuoteWindow";
import SkillCard from "@/components/SkillCard";
import ProofCard from "@/components/ProofCard";
import FloatingGlowOrb from "@/components/FloatingGlowOrb";
import CTAButton from "@/components/CTAButton";
import NewsletterForm from "@/components/NewsletterForm";
import FooterHero from "@/components/FooterHero";
import SocialIconLink from "@/components/SocialIconLink";

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <TopNavigation />
      <FloatingBottomNav />

      <main className="flex-1">
        {/* ── Hero ──────────────────────────────────────────── */}
        <HeroSection />

        {/* ── How It Works + Terminal Preview ────────────────── */}
        <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
          <SectionHeader label="Why launch slow when you can move fast?" />

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.05] tracking-tight text-white max-w-5xl mb-24 reveal reveal-delay-1">
            One command.{" "}
            <span className="text-[#666666]">
              30 seconds. Real customer language ready to deploy.
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Steps card */}
            <div
              className="reveal reveal-delay-2 rounded-[2.5rem] p-10 md:p-12 min-h-[520px] flex flex-col justify-between relative overflow-hidden card-shimmer gradient-border-glow"
              style={{
                background:
                  "radial-gradient(ellipse at top right, rgba(255,107,80,0.06), transparent 60%), linear-gradient(135deg, #111111, #0d0d0d)",
              }}
            >
              <div className="absolute top-10 right-10 bg-[#1a1a1a] text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest text-[#888888] border border-[#333333]/60">
                3 Steps
              </div>

              <div className="flex flex-col gap-10 mt-16">
                <StepCard
                  stepNumber="01"
                  title="Install"
                  description="Add the plugin to Claude Code. One command, 30 seconds."
                />
                <StepCard
                  stepNumber="02"
                  title="Run"
                  description="Tell Claude to research your market. It pulls real quotes from Reddit, review sites, and forums."
                />
                <StepCard
                  stepNumber="03"
                  title="Get"
                  description="Personas, angles, and 50+ tagged customer quotes. Ready to use, not ready to guess."
                />
              </div>
            </div>

            {/* Terminal preview card */}
            <div
              className="reveal reveal-delay-3 rounded-[2.5rem] p-8 md:p-12 min-h-[520px] flex items-center justify-center relative overflow-hidden group"
              style={{
                background:
                  "linear-gradient(135deg, #FF6B50 0%, #E55A40 40%, #c94430 100%)",
              }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[radial-gradient(circle,_rgba(255,255,255,0.12)_0%,_transparent_70%)] pointer-events-none" />
              <TerminalQuoteWindow />
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          </div>
        </section>

        {/* ── Skills Gallery ────────────────────────────────── */}
        <section id="skills" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-20 border-b border-[#222222] pb-10 reveal">
            <h2 className="text-xs font-bold tracking-[0.4em] uppercase text-c47-accent">
              The Skills
            </h2>
            <span className="hidden md:block text-[#444444] text-xs font-medium uppercase tracking-widest">
              Claude Code Plugin
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-32">
            <div className="reveal">
              <SkillCard
                title="CUSTOMER RESEARCH"
                category="Extraction / Real Language"
                description="50+ real customer quotes from Reddit, review sites, and forums. Each tagged by emotional intensity and buying journey stage."
                imageSrc="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop"
              />
            </div>
            <div className="md:mt-24 reveal reveal-delay-1">
              <SkillCard
                title="PERSONA BUILDER"
                category="Behavior / Journey Maps"
                description="Behavior-based personas with decision journey monologues, objection maps, and creative briefs."
                imageSrc="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop"
              />
            </div>
            <div className="reveal reveal-delay-2">
              <SkillCard
                title="ANGLE GENERATOR"
                category="Hooks / Ad Archetypes"
                description="Ad angles and hooks mapped to each persona. Organized by archetype: fear, empathy, economics, authority, transformation."
                imageSrc="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop"
              />
            </div>
            <div className="md:mt-24 reveal reveal-delay-3">
              <ProofCard />
            </div>
          </div>
        </section>

        {/* ── Setup Section ($750) ──────────────────────────── */}
        <section id="setup" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
          <div
            className="rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden group transition-all duration-500 gradient-border-glow reveal"
            style={{
              background:
                "radial-gradient(ellipse at top right, rgba(255,107,80,0.08), transparent 50%), radial-gradient(ellipse at bottom left, rgba(255,107,80,0.04), transparent 50%), linear-gradient(135deg, #111111, #0d0d0d)",
            }}
          >
            <FloatingGlowOrb />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-12">
                <div
                  className="w-2 h-2 rounded-full bg-c47-accent"
                  style={{ boxShadow: "0 0 8px rgba(255,107,80,0.6)" }}
                />
                <span className="text-[10px] font-bold tracking-[0.3em] text-[#666666] uppercase">
                  For Teams
                </span>
              </div>

              <div className="flex flex-col md:flex-row gap-16 justify-between items-start">
                <div className="max-w-xl flex flex-col gap-6">
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.05]">
                    Want this running for your team{" "}
                    <span className="text-[#666666]">by end of day?</span>
                  </h3>
                  <p className="text-[#888888] leading-relaxed text-lg">
                    I will install the plugin, configure it for your accounts,
                    and walk your team through the first research run. You will
                    have personas and angles for your first product before our
                    call ends.
                  </p>
                </div>
                <div className="flex flex-col gap-6 shrink-0 w-full md:w-auto md:min-w-[280px]">
                  <div className="flex flex-col gap-1">
                    <span className="text-6xl font-bold tracking-tight text-gradient">
                      $750
                    </span>
                    <span className="text-sm text-[#888888]">
                      one-time setup
                    </span>
                  </div>
                  <CTAButton href="#setup" />
                  <p className="text-sm text-[#666666]">
                    One call. Done by end of day.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Newsletter ────────────────────────────────────── */}
        <section
          id="newsletter"
          className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#1a1a1a]"
        >
          <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-10 reveal">
            <div className="flex flex-col gap-4">
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
                Build Notes
              </h2>
              <p className="text-[#888888] text-lg">
                What I am building, what is working, what is not. Weekly.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="relative pt-48 pb-32 px-6 md:px-12 border-t border-[#1a1a1a]">
        <div
          className="absolute top-0 left-0 right-0 h-[400px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center top, rgba(255,107,80,0.03), transparent 70%)",
          }}
        />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-16 relative z-10">
          <div className="flex-1">
            <FooterHero />
          </div>

          <div className="flex gap-4 md:mb-6">
            <SocialIconLink
              href="https://github.com/channel47"
              label="GitHub"
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              }
            />
            <SocialIconLink
              href="https://x.com/ctrlswing"
              label="X (Twitter)"
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              }
            />
            <SocialIconLink
              href="mailto:hello@channel47.dev"
              label="Email"
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              }
            />
            <SocialIconLink
              href="https://www.skool.com/the-vibe-marketers"
              label="Skool"
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="10" fillOpacity="0" stroke="currentColor" strokeWidth="2" />
                  <text x="12" y="16" textAnchor="middle" fontSize="11" fill="currentColor" fontWeight="bold">S</text>
                </svg>
              }
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-40 pt-10 border-t border-[#111111] flex flex-col md:flex-row justify-between text-[#333333] text-[10px] font-bold uppercase tracking-widest relative z-10">
          <p>
            &copy; 2026 channel47.dev — Built by ctrlswing. All rights reserved.
          </p>
          <div className="flex gap-10 mt-6 md:mt-0">
            <a href="#" className="hover:text-[#666666] transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#666666] transition-colors duration-300">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
