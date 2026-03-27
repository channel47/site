import Image from "next/image";

export default function SkillCard({
  title,
  category,
  description,
  imageSrc,
}: {
  title: string;
  category: string;
  description: string;
  imageSrc: string;
}) {
  return (
    <article className="group cursor-pointer">
      <div className="aspect-[4/3] overflow-hidden rounded-sm relative">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>
      <div className="mt-8 flex justify-between items-start">
        <div>
          <h3 className="text-3xl font-bold tracking-tight mb-2 group-hover:text-c47-accent transition-colors duration-300">
            {title}
          </h3>
          <p className="text-[#666666] text-[10px] font-bold uppercase tracking-[0.2em]">
            {category}
          </p>
        </div>
        <div className="p-3 rounded-full border border-[#333333] group-hover:bg-c47-accent group-hover:text-black group-hover:border-transparent transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(255,107,80,0.3)] group-hover:scale-110">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </div>
      </div>
      <p className="mt-4 text-[#888888] text-sm leading-relaxed max-w-md">
        {description}
      </p>
    </article>
  );
}
