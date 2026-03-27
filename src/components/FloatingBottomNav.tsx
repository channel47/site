const navItems = [
  { label: "Skills", icon: "M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z", active: true },
  { label: "Global", icon: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2a8 8 0 0 1 5.29 2H6.71A8 8 0 0 1 12 4zM4 12a8 8 0 0 1 .34-2.3h15.32A8 8 0 0 1 20 12a8 8 0 0 1-.34 2.3H4.34A8 8 0 0 1 4 12zm2.71 6h10.58A8 8 0 0 1 12 20a8 8 0 0 1-5.29-2z", active: false },
  { label: "Plugin", icon: "M4 17l6-6-6-6M12 19h8", active: false },
  { label: "Services", icon: "M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z", active: false },
  { label: "Updates", icon: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 14.5A2.5 2.5 0 0 1 6.5 12H20M4 4h16v6H4V4z", active: false },
];

export default function FloatingBottomNav() {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 hidden md:flex">
      <div
        className="flex items-center gap-1 rounded-2xl px-2 py-2 border border-white/[0.08]"
        style={{
          background: "rgba(17,17,17,0.85)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        }}
      >
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
              item.active
                ? "bg-c47-accent/15 text-c47-accent"
                : "text-c47-muted hover:text-white hover:bg-white/5"
            }`}
            aria-label={item.label}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={item.icon} />
            </svg>
          </button>
        ))}
        <div className="w-px h-6 bg-white/10 mx-1" />
        <a
          href="#setup"
          className="px-5 py-2 rounded-xl bg-c47-accent text-white text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all"
        >
          Setup
        </a>
      </div>
    </div>
  );
}
