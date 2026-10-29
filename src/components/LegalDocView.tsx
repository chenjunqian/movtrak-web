import type { DocBlock, LegalDoc } from '../content/legal'

function InlineText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)

  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={i} className="font-semibold text-cream">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  )
}

function DocBlockView({ block }: { block: DocBlock }) {
  switch (block.kind) {
    case 'p':
      return (
        <p>
          <InlineText text={block.text} />
        </p>
      )
    case 'list':
      return (
        <ul className="space-y-2.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-[7px] h-1 w-1 shrink-0 bg-mint" aria-hidden />
              <span>
                <InlineText text={item} />
              </span>
            </li>
          ))}
        </ul>
      )
    case 'groups':
      return (
        <div className="grid gap-px border hair bg-mint/25 sm:grid-cols-3">
          {block.items.map((group) => (
            <div key={group.label} className="bg-slate-canvas p-4">
              <p className="mono text-[9px] text-mint">{group.label}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-cream/65">{group.text}</p>
            </div>
          ))}
        </div>
      )
    case 'contact':
      return (
        <div>
          <p>{block.text}</p>
          <a
            href={`mailto:${block.email}`}
            className="mono mt-4 inline-flex items-center gap-2 border-b border-mint pb-1 text-[10px] text-mint transition-colors hover:text-cream"
          >
            {block.email}
            <span aria-hidden>→</span>
          </a>
        </div>
      )
  }
}

interface LegalDocViewProps {
  doc: LegalDoc
}

export default function LegalDocView({ doc }: LegalDocViewProps) {
  return (
    <article>
      <div className="mono flex flex-wrap items-center justify-between gap-3 border-b hair pb-3 text-[9px] text-cream/40">
        <span className="text-mint">{doc.title}</span>
        <span>UPDATED {doc.updated}</span>
      </div>

      {doc.sections.map((section, i) => (
        <section
          key={section.title}
          id={`s${i + 1}`}
          className="border-b hair py-7 md:grid md:grid-cols-[64px_1fr] md:gap-8 md:py-9"
        >
          <p className="mono text-[9px] text-coral">{String(i + 1).padStart(2, '0')}</p>
          <div>
            <h2 className="font-display text-xl leading-snug md:text-2xl">{section.title}</h2>
            <div className="mt-3 space-y-3 text-[13px] leading-relaxed text-cream/70 md:text-sm">
              {section.blocks.map((block, j) => (
                <DocBlockView key={j} block={block} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <p className="mono mt-8 flex items-center gap-2 text-[9px] text-cream/30">
        <span className="text-mint" aria-hidden>
          █
        </span>
        END_OF_DOCUMENT · {doc.updated}
      </p>
    </article>
  )
}
