interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: SectionHeaderProps) {
  return (
    <div className="text-center mb-12 md:mb-16">
      <div className="inline-flex items-center gap-3 px-4 py-2 mb-6">
        <div className="h-[1.5px] w-18 bg-gradient-to-l from-transparent via-cyan-500 to-transparent" />
        <span className="text-cyan-400 font-medium tracking-widest text-sm uppercase">
          {eyebrow}
        </span>
        <div className="h-[1.5px] w-18 bg-gradient-to-l from-transparent via-cyan-500 to-transparent" />
      </div>

      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
        <span className="bg-gradient-to-r from-white via-sky-400 to-white bg-clip-text text-transparent">
          {title}
        </span>
      </h2>

      {subtitle && (
        <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto px-4">
          {subtitle}
        </p>
      )}
    </div>
  );
}
