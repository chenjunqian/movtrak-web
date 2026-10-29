import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import TerminalTopbar from './components/TerminalTopbar'
import SubjectRail from './components/SubjectRail'
import Waveform from './components/Waveform'
import Barcode from './components/Barcode'
import SectionTag from './components/SectionTag'
import TerminalFooter from './components/TerminalFooter'
import { APP_STORE_URL } from './constants'
import { useCountUp, useScrollVelocityVar } from './hooks/useHud'

interface StatCardProps {
  label: string
  target: number
  note: string
  prefix?: string
  suffix?: string
  decimals?: number
}

function StatCard({ label, target, note, prefix = '', suffix = '', decimals = 0 }: StatCardProps) {
  const { ref, value } = useCountUp(target)
  const shown = (value / 10 ** decimals).toFixed(decimals)

  return (
    <div className="relative overflow-hidden bg-slate-canvas p-5 md:p-6">
      <div className="lav-glow pointer-events-none absolute -right-12 -top-12 h-36 w-36 opacity-40" aria-hidden />
      <p className="mono text-[10px] text-cream/40">{label}</p>
      <p className="mt-4 font-display text-4xl leading-none text-lavender md:text-5xl">
        <span ref={ref} className="tabular-nums">
          {prefix}
          {shown}
        </span>
        {suffix ? <span className="ml-1 text-xl text-lavender/80">{suffix}</span> : null}
      </p>
      <p className="mt-3 text-xs leading-relaxed text-cream/60">{note}</p>
    </div>
  )
}

export default function LandingPage() {
  const { t, i18n } = useTranslation()
  const isZh = i18n.language.startsWith('zh')
  useScrollVelocityVar()

  useEffect(() => {
    document.documentElement.lang = isZh ? 'zh-Hans' : 'en'
  }, [isZh])

  const heroType = isZh
    ? 'text-[clamp(3rem,10vw,7.5rem)] leading-[0.98] tracking-[-0.01em]'
    : 'text-[clamp(3.25rem,12vw,10.5rem)] leading-[0.82] tracking-[-0.02em]'

  const sectionType = isZh
    ? 'text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.02] tracking-[-0.01em]'
    : 'text-[clamp(2.75rem,8vw,7rem)] leading-[0.85] tracking-[-0.02em]'

  const stats = [
    {
      label: t('telemetry.stat1Label'),
      target: 100,
      suffix: '%',
      note: t('telemetry.stat1Note'),
    },
    {
      label: t('telemetry.stat2Label'),
      target: 0,
      note: t('telemetry.stat2Note'),
    },
    {
      label: t('telemetry.stat3Label'),
      target: 7,
      suffix: 'D',
      note: t('telemetry.stat3Note'),
    },
    {
      label: t('telemetry.stat4Label'),
      target: 999,
      prefix: '$',
      decimals: 2,
      note: t('telemetry.stat4Note'),
    },
  ]

  const features = ['highlight1', 'highlight2', 'highlight3'] as const
  const specRows = ['sensor', 'tracking', 'pipeline', 'privacy', 'output', 'hardware', 'trial', 'pricing'] as const
  const steps = [1, 2, 3, 4, 5] as const

  return (
    <div className={`min-h-screen bg-slate-canvas font-body text-cream ${isZh ? 'zh-mode' : ''}`}>
      <TerminalTopbar />

      <main>
        {/* ── HERO ─────────────────────────────────────────────── */}
        <section id="top" className="relative overflow-hidden border-b hair">
          <div className="mesh-drift pointer-events-none absolute inset-0 opacity-80" aria-hidden />
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            {[16, 47, 82].map((left, i) => (
              <span
                key={left}
                className="drain-line absolute top-0 h-40 w-px"
                style={{ left: `${left}%`, animationDelay: `${i * 1.4}s` }}
              />
            ))}
          </div>

          <div className="relative mx-auto grid max-w-[1600px] lg:grid-cols-[minmax(0,1fr)_minmax(300px,30%)]">
            <div className="px-4 py-10 sm:px-6 md:px-12 lg:py-14 lg:pr-10 xl:py-16">
              <div
                className="reveal-up mono space-y-1.5 text-[10px] text-cream/50 md:text-[11px]"
                style={{ animationDelay: '0.05s' }}
              >
                <p className="text-mint">{t('hero.boot1')}</p>
                <p>{t('hero.boot2')}</p>
                <p>
                  {t('hero.boot3')} <span className="animate-blink text-coral">█</span>
                </p>
              </div>

              <h1
                className={`reveal-up mt-7 font-display font-semibold uppercase ${heroType}`}
                style={{ animationDelay: '0.15s' }}
              >
                <span className="block">{t('hero.line1')}</span>
                <span className="txt-outline block">{t('hero.line2')}</span>
                <span className="block text-mint">{t('hero.line3')}</span>
              </h1>

              <p
                className="reveal-up mt-6 max-w-xl text-[15px] leading-relaxed text-cream/70 md:text-base"
                style={{ animationDelay: '0.3s' }}
              >
                {t('hero.subtitle')}
              </p>

              <div
                className="reveal-up mt-8 flex flex-col gap-3 sm:flex-row"
                style={{ animationDelay: '0.42s' }}
              >
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-between gap-8 border border-mint bg-mint px-5 py-4 mono text-[10px] text-slate-canvas transition-colors hover:bg-transparent hover:text-mint focus:outline-none focus-visible:ring-1 focus-visible:ring-mint md:px-6 md:text-[11px]"
                >
                  <span>{t('hero.primaryCta')}</span>
                  <span className="text-base transition-transform group-hover:translate-x-1" aria-hidden>
                    →
                  </span>
                </a>
                <a
                  href="#sensors"
                  className="group inline-flex items-center justify-between gap-8 border border-mint/40 px-5 py-4 mono text-[10px] text-cream/75 transition-colors hover:border-mint hover:text-mint md:px-6 md:text-[11px]"
                >
                  <span>{t('hero.secondaryCta')}</span>
                  <span className="text-base transition-transform group-hover:translate-y-0.5" aria-hidden>
                    ↓
                  </span>
                </a>
              </div>

              <p
                className="reveal-up mt-4 mono text-[9px] leading-relaxed text-cream/45 md:text-[10px]"
                style={{ animationDelay: '0.5s' }}
              >
                {t('hero.pricingTag')}
              </p>

              {isZh && (
                <p className="mt-5 max-w-xl border-l border-coral/60 pl-3 font-mono text-[11px] leading-relaxed tracking-normal text-cream/50">
                  {t('hero.regionNotice')}
                </p>
              )}

              <dl
                className="reveal-up mt-10 grid grid-cols-3 gap-px border hair bg-mint/25"
                style={{ animationDelay: '0.58s' }}
              >
                {[1, 2, 3].map((n) => (
                  <div key={n} className="bg-slate-canvas px-3 py-4 md:px-5">
                    <dt className="mono text-[9px] text-cream/40 md:text-[10px]">
                      {t(`hero.spec${n}Label`)}
                    </dt>
                    <dd className="mt-2 mono text-[10px] text-mint md:text-[11px]">
                      {t(`hero.spec${n}Value`)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative border-t hair lg:sticky lg:top-12 lg:h-[calc(100vh-3rem)] lg:border-l lg:border-t-0">
              <SubjectRail />
            </div>
          </div>
        </section>

        <Waveform />

        {/* ── SENSORS / TELEMETRY ──────────────────────────────── */}
        <section id="sensors" className="border-b hair">
          <div className="mx-auto max-w-[1600px] px-4 py-14 sm:px-6 md:px-12 md:py-20">
            <SectionTag>{t('telemetry.section')}</SectionTag>

            <div className="mt-9 grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-end">
              <h2 className={`font-display font-semibold uppercase ${sectionType}`}>
                <span className="block">{t('telemetry.title1')}</span>
                <span className="txt-outline block">{t('telemetry.title2')}</span>
                <span className="block text-coral">{t('telemetry.title3')}</span>
              </h2>

              <div>
                <p className="max-w-md text-sm leading-relaxed text-cream/70 md:text-base">
                  {t('telemetry.intro')}
                </p>
                <div className="mt-6">
                  <div className="mono flex items-center justify-between gap-4 text-[9px] text-cream/40 md:text-[10px]">
                    <span>{t('telemetry.meterLabel')}</span>
                    <span className="text-coral">{t('telemetry.meterHint')}</span>
                  </div>
                  <div className="mt-2 h-[3px] w-full bg-cream/10">
                    <div
                      className="vel-bar h-full"
                      style={{ width: 'calc(5% + var(--vel, 0) * 95%)' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-px border hair bg-mint/25 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </div>

            <div className="mono mt-10 flex items-center gap-3 text-[10px] text-cream/40">
              <span>{t('telemetry.modulesLabel')}</span>
              <span className="h-px flex-1 bg-mint/25" aria-hidden />
              <span className="text-mint/60">///</span>
            </div>

            <div className="mt-4 grid gap-px border hair bg-mint/25 lg:grid-cols-3">
              {features.map((key, i) => (
                <article key={key} className="group bg-slate-canvas p-6 md:p-8">
                  <div className="mono flex items-center justify-between text-[10px] text-cream/40">
                    <span>MOD_0{i + 1}</span>
                    <span className="text-mint" aria-hidden>
                      ●
                    </span>
                  </div>
                  <h3 className="mt-8 font-display text-xl leading-snug tracking-tight md:text-2xl">
                    {t(`features.${key}.title`)}
                  </h3>
                  <p className="mt-4 text-sm font-medium text-mint/90">
                    {t(`features.${key}.coreValue`)}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-cream/60">
                    {t(`features.${key}.description`)}
                  </p>
                  <div className="mt-8 h-px w-full bg-mint/20" aria-hidden>
                    <div className="h-px w-0 bg-mint transition-all duration-500 group-hover:w-full" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROTOCOL / SPEC + STEPS ──────────────────────────── */}
        <section id="protocol" className="border-b hair">
          <div className="mx-auto max-w-[1600px] px-4 py-14 sm:px-6 md:px-12 md:py-20">
            <SectionTag>{t('howItWorks.section')}</SectionTag>

            <div className="mt-9 grid gap-10 lg:grid-cols-2 lg:gap-14">
              <div>
                <h2 className={`font-display font-semibold uppercase ${sectionType}`}>
                  <span className="block">{t('howItWorks.title1')}</span>
                  <span className="txt-outline block">{t('howItWorks.title2')}</span>
                </h2>
                <p className="mt-6 max-w-md text-sm leading-relaxed text-cream/70">
                  {t('howItWorks.intro')}
                </p>

                <div className="mt-8 border hair">
                  <div className="mono flex items-center justify-between border-b hair px-4 py-3 text-[9px] text-cream/40">
                    <span>{t('howItWorks.tableLabel')}</span>
                    <span>VALUE</span>
                  </div>
                  <dl>
                    {specRows.map((key) => (
                      <div
                        key={key}
                        className="grid grid-cols-[auto_1fr] items-start gap-4 border-b hair px-4 py-3.5 transition-colors last:border-b-0 hover:bg-mint/5 md:py-4"
                      >
                        <dt className="mono text-[9px] leading-5 text-cream/40 md:text-[10px]">
                          {t(`spec.${key}.label`)}
                        </dt>
                        <dd className="mono text-right text-[10px] leading-5 text-mint md:text-[11px]">
                          {t(`spec.${key}.value`)}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              <ol className="grid gap-px self-start border hair bg-mint/25 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {steps.map((step, i) => (
                  <li
                    key={step}
                    className={`bg-slate-canvas p-5 md:p-6 ${
                      i === steps.length - 1 ? 'sm:col-span-2 lg:col-span-1 xl:col-span-2' : ''
                    }`}
                  >
                    <div className="mono flex items-center justify-between text-[9px] text-cream/40">
                      <span>STEP</span>
                      <span className="text-coral">[{String(step).padStart(2, '0')}]</span>
                    </div>
                    <h3 className="mt-4 font-display text-lg leading-snug tracking-tight md:text-xl">
                      {t(`howItWorks.step${step}`)}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-cream/60">
                      {t(`howItWorks.step${step}Desc`)}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ── ACQUIRE / END TRACK ──────────────────────────────── */}
        <section id="acquire" className="relative overflow-hidden border-b hair">
          <div
            className="lav-glow pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 opacity-40"
            aria-hidden
          />
          <div className="relative mx-auto max-w-[1600px] px-4 py-16 text-center sm:px-6 md:px-12 md:py-24">
            <SectionTag>{t('cta.section')}</SectionTag>

            <h2 className="mt-10 font-display text-[clamp(3.5rem,13vw,11rem)] font-semibold uppercase leading-[0.82] tracking-[-0.02em]">
              <span className="block">{t('cta.title1')}</span>
              <span className="txt-outline-coral block">{t('cta.title2')}</span>
            </h2>

            <p className="mx-auto mt-8 max-w-lg text-sm leading-relaxed text-cream/70 md:text-base">
              {t('cta.body')}
            </p>

            <div className="mt-8 flex flex-col items-center gap-4">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-8 border border-coral bg-coral px-7 py-4 mono text-[10px] text-slate-canvas transition-colors hover:bg-transparent hover:text-coral focus:outline-none focus-visible:ring-1 focus-visible:ring-coral md:px-10 md:text-[11px]"
              >
                <span>{t('cta.button')}</span>
                <span className="text-base transition-transform group-hover:translate-x-1" aria-hidden>
                  →
                </span>
              </a>
              <p className="mono text-[10px] text-cream/45 md:text-[11px]">
                <span className="text-mint">{t('cta.price')}</span>
                <span className="mx-2 text-cream/25">/</span>
                {t('cta.note')}
              </p>
              {isZh && (
                <p className="mx-auto max-w-lg font-mono text-[11px] leading-relaxed tracking-normal text-cream/50">
                  {t('hero.regionNotice')}
                </p>
              )}
            </div>

            <div className="mt-16">
              <Barcode />
              <div className="mono mt-3 flex flex-col items-center justify-between gap-2 text-[9px] text-cream/40 sm:flex-row">
                <span>{t('cta.barcode')}</span>
                <span>
                  {t('cta.idLabel')} 6755912677
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <TerminalFooter />
    </div>
  )
}
