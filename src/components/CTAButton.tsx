export default function CTAButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      className="cta-glow inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-c47-accent text-white font-semibold text-lg transition-all hover:brightness-110"
    >
      Book a setup call
    </a>
  );
}
