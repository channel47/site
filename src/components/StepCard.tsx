export default function StepCard({
  stepNumber,
  title,
  description,
}: {
  stepNumber: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group/step flex items-start gap-6 cursor-default">
      <span
        className="step-number text-5xl font-bold leading-none"
        style={{ color: "#222222" }}
      >
        {stepNumber}
      </span>
      <div>
        <h3 className="text-xl font-semibold mb-1 text-white">{title}</h3>
        <p className="text-[#888888] text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
