export default function FloatingGlowOrb() {
  return (
    <>
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none transition-all duration-700 group-hover:w-[28rem] group-hover:h-[28rem]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,107,80,0.1) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,107,80,0.04) 0%, transparent 70%)",
        }}
      />
    </>
  );
}
