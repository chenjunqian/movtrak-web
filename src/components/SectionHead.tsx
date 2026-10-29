interface SectionHeadProps {
  index: string
  label: string
  title: string
  intro?: string
}

export default function SectionHead({ index, label, title, intro }: SectionHeadProps) {
  return (
    <div>
      <p className="mono flex items-center gap-3 text-[9px] text-cream/40">
        <span className="text-coral">{index}</span>
        <span className="text-mint">{label}</span>
        <span className="h-px flex-1 bg-mint/25" aria-hidden />
      </p>
      <h2 className="mt-4 font-display text-2xl leading-tight md:text-3xl">{title}</h2>
      {intro ? (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-cream/65">{intro}</p>
      ) : null}
    </div>
  )
}
