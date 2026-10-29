import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import TerminalFooter from './TerminalFooter'
import TerminalTopbar from './TerminalTopbar'
import LanguageTabs from './LanguageTabs'
import SectionTag from './SectionTag'
import type { DocLang } from '../hooks/useDocLanguage'

export interface TocItem {
  id: string
  label: string
}

interface PageShellProps {
  system: string
  kicker: string
  titleSolid: string
  titleOutline: string
  intro: string
  meta: { label: string; value: string }[]
  toc: TocItem[]
  railLabel: string
  language: DocLang
  onLanguageChange: (lang: DocLang) => void
  children: ReactNode
  active?: 'support' | 'privacy' | 'terms'
}

export default function PageShell({
  system,
  kicker,
  titleSolid,
  titleOutline,
  intro,
  meta,
  toc,
  railLabel,
  language,
  onLanguageChange,
  children,
  active,
}: PageShellProps) {
  const { t } = useTranslation()

  const typeClass =
    language === 'zh'
      ? 'text-[clamp(2.75rem,10vw,8rem)] leading-[1.0] tracking-[-0.01em]'
      : 'text-[clamp(3rem,10vw,8rem)] leading-[0.84] tracking-[-0.02em]'

  return (
    <div className={`min-h-screen bg-slate-canvas font-body text-cream ${language === 'zh' ? 'zh-mode' : ''}`}>
      <TerminalTopbar system={system} active={active} />

      <main>
        <header className="relative overflow-hidden border-b hair">
          <div className="mesh-drift pointer-events-none absolute inset-0 opacity-60" aria-hidden />
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            {[21, 57, 83].map((left, i) => (
              <span
                key={left}
                className="drain-line absolute top-0 h-40 w-px"
                style={{ left: `${left}%`, animationDelay: `${i * 1.3}s` }}
              />
            ))}
          </div>

          <div className="relative mx-auto max-w-[1600px] px-4 py-12 sm:px-6 md:px-12 md:py-16">
            <SectionTag>{kicker}</SectionTag>

            <h1 className={`mt-8 font-display font-semibold uppercase ${typeClass}`}>
              <span className="block">{titleSolid}</span>
              <span className="txt-outline block">{titleOutline}</span>
            </h1>

            <div className="mt-7 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <p className="max-w-2xl text-sm leading-relaxed text-cream/70 md:text-base">
                {intro}
              </p>
              <LanguageTabs
                value={language}
                onChange={onLanguageChange}
                className="shrink-0 self-start md:self-auto"
              />
            </div>

            <dl className="mt-10 grid gap-px border hair bg-mint/25 sm:grid-cols-3">
              {meta.map((item) => (
                <div key={item.label} className="bg-slate-canvas px-4 py-4">
                  <dt className="mono text-[9px] text-cream/40">{item.label}</dt>
                  <dd className="mono mt-2 text-[10px] text-mint">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </header>

        <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[minmax(0,1fr)_250px]">
          <div className="px-4 py-10 sm:px-6 md:px-12 md:py-14 lg:pr-14">
            <div className="max-w-4xl">{children}</div>

            <Link
              to="/"
              className="mono mt-12 inline-flex items-center gap-2 text-[9px] text-cream/45 transition-colors hover:text-mint"
            >
              <span aria-hidden>←</span>
              {t('pages.backHome')}
            </Link>
          </div>

          <aside className="relative hidden border-l hair lg:block">
            <div className="sticky top-12 px-6 py-10">
              <p className="mono text-[9px] text-cream/40">{t('pages.onThisPage')}</p>
              <nav aria-label={t('pages.onThisPage')} className="mt-4 space-y-2.5">
                {toc.map((item, i) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="mono flex gap-2 text-[9px] leading-relaxed text-cream/50 transition-colors hover:text-mint"
                  >
                    <span className="text-coral">{String(i + 1).padStart(2, '0')}</span>
                    <span>{item.label}</span>
                  </a>
                ))}
              </nav>

              <div className="mt-10 border-t hair pt-4">
                <p className="mono text-[8px] text-cream/30">{railLabel}</p>
                <p className="mono mt-2 flex items-center gap-2 text-[8px] text-cream/40">
                  <span className="h-1 w-1 animate-pulse bg-mint" aria-hidden />
                  SYS.READY
                </p>
              </div>
            </div>

            <p
              className="absolute right-2 top-1/2 -translate-y-1/2 mono text-[8px] tracking-[0.4em] text-mint/40"
              style={{ writingMode: 'vertical-rl' }}
              aria-hidden
            >
              {railLabel}
            </p>
          </aside>
        </div>
      </main>

      <TerminalFooter />
    </div>
  )
}
