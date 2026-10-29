interface SectionTagProps {
  children: React.ReactNode
}

export default function SectionTag({ children }: SectionTagProps) {
  return (
    <div className="mono flex items-center gap-3 text-[10px] text-mint md:text-[11px]">
      <span className="h-1.5 w-1.5 shrink-0 animate-pulse bg-mint" aria-hidden />
      <span className="whitespace-nowrap">{children}</span>
      <span className="h-px flex-1 bg-mint/25" aria-hidden />
      <span className="text-cream/30">///</span>
    </div>
  )
}
