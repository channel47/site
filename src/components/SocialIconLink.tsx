export default function SocialIconLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
      aria-label={label}
      className="w-12 h-12 rounded-full border border-[#333333] flex items-center justify-center text-c47-muted hover:text-c47-accent hover:border-c47-accent/40 hover:shadow-[0_8px_24px_rgba(255,107,80,0.25)] transition-all duration-300"
    >
      {icon}
    </a>
  );
}
