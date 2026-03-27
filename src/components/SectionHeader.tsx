export default function SectionHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-10 reveal">
      <div
        className="w-2 h-2 rounded-full bg-c47-accent"
        style={{ boxShadow: "0 0 8px rgba(255,107,80,0.6)" }}
      />
      <span className="text-[10px] font-bold tracking-[0.3em] text-[#666666] uppercase">
        {label}
      </span>
    </div>
  );
}
