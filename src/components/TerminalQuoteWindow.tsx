export default function TerminalQuoteWindow() {
  return (
    <div className="w-full max-w-md bg-gradient-to-br from-[#0c0a09] to-[#0a0908] rounded-xl shadow-[0_24px_80px_rgba(0,0,0,0.5)] overflow-hidden transform group-hover:scale-[1.03] transition-all duration-700 ease-out terminal-container">
      <div className="bg-gradient-to-r from-[#111111] to-[#0f0f0f] px-4 py-3 border-b border-[#222222] flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-c47-accent/30" />
        <div className="w-2.5 h-2.5 rounded-full bg-c47-accent/20" />
        <div className="w-2.5 h-2.5 rounded-full bg-c47-accent/10" />
        <span className="ml-4 font-mono text-xs text-[#555555]">
          creative-strategist extract --raw
        </span>
      </div>
      <div className="terminal-lines p-5 font-mono text-xs leading-relaxed text-zinc-400 space-y-4">
        <div className="flex gap-3 terminal-line">
          <span className="text-c47-accent shrink-0">[fire-3]</span>
          <div>
            <span className="text-zinc-200">
              &ldquo;Marketing has always been the hardest part for us solo
              founders. You can build an amazing product but if nobody knows
              about it, none of that matters.&rdquo;
            </span>
            <br />
            <span className="text-zinc-600">
              — Reddit, r/SaaS | Journey: Problem-aware
            </span>
          </div>
        </div>
        <div className="flex gap-3 terminal-line">
          <span className="text-c47-accent/70 shrink-0">[fire-2]</span>
          <div>
            <span className="text-zinc-200">
              &ldquo;I was burning hours every week hunting for new
              tools.&rdquo;
            </span>
            <br />
            <span className="text-zinc-600">
              — PPC.io | Journey: Problem-aware
            </span>
          </div>
        </div>
        <div className="flex gap-3 terminal-line">
          <span className="text-c47-accent shrink-0">[fire-3]</span>
          <div>
            <span className="text-zinc-200">
              &ldquo;I found $3,400/month in wasted spend. In one
              prompt.&rdquo;
            </span>
            <br />
            <span className="text-zinc-600">
              — Adspirer | Journey: Post-purchase
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
