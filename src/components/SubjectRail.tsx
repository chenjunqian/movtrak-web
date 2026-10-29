import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SCREENSHOTS } from '../constants'
import { useClock } from '../hooks/useHud'

export default function SubjectRail() {
  const { t } = useTranslation()
  const clock = useClock()
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(
    () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const total = SCREENSHOTS.length

  useEffect(() => {
    if (!playing) return
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % total)
    }, 3400)
    return () => window.clearInterval(id)
  }, [playing, index, total])

  const go = (delta: number) => setIndex((current) => (current + delta + total) % total)

  return (
    <div className="relative flex h-[440px] flex-col overflow-hidden bg-slate-canvas md:h-[520px] lg:h-[calc(100vh-3rem)] lg:min-h-[560px]">
      <div className="relative flex-1 overflow-hidden">
        {SCREENSHOTS.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={i === index ? t('hero.imageAlt', { index: i + 1 }) : ''}
            aria-hidden={i !== index}
            loading={i === 0 ? 'eager' : 'lazy'}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-700 ease-out ${
              i === index ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
            }`}
          />
        ))}

        {/* Soft edge scrims keep the HUD readable without tinting the screenshot. */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-canvas/75 to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-canvas/85 to-transparent"
          aria-hidden
        />

        {/* HUD — top */}
        <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-3 p-3 md:p-4">
          <div>
            <p className="mono flex items-center gap-2 text-[9px] text-mint md:text-[10px]">
              <span className="h-1.5 w-1.5 animate-pulse bg-coral" aria-hidden />
              {t('hero.railSubject')}
            </p>
            <p className="mt-1.5 mono text-[9px] text-cream/45">
              {t('hero.railHint')}
            </p>
          </div>
          <div className="text-right">
            <p className="mono text-[10px] text-cream/70 tabular-nums">{clock}</p>
            <p className="mt-1.5 mono text-[9px] text-mint/70">
              {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
            </p>
          </div>
        </div>

        {/* HUD — vertical seam label */}
        <p
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 mono text-[9px] tracking-[0.4em] text-mint/60"
          style={{ writingMode: 'vertical-rl' }}
          aria-hidden
        >
          {t('hero.railLabel')}
        </p>

        {/* HUD — lock readout */}
        <div className="absolute bottom-4 left-3 z-10 w-32 md:left-4">
          <div className="mono flex justify-between whitespace-nowrap text-[9px] text-cream/55">
            <span>{t('hero.railLock')}</span>
            <span className="text-mint">98%</span>
          </div>
          <div className="mt-1.5 h-px w-full bg-mint/25">
            <div className="h-px w-[98%] bg-mint" />
          </div>
        </div>

        {/* HUD — live flag */}
        <p className="absolute bottom-4 right-3 z-10 mono flex items-center gap-1.5 text-[9px] text-coral md:right-4">
          <span className="animate-blink" aria-hidden>
            █
          </span>
          {t('hero.railLive')}
        </p>
      </div>

      <div className="relative z-10 flex items-center justify-between gap-2 border-t hair bg-slate-canvas/85 px-3 py-2.5 backdrop-blur-sm">
        <div className="min-w-0">
          <p className="mono truncate text-[9px] text-mint">
            {t('hero.railCaption')}
            <span className="ml-2 text-cream/35">
              · {playing ? t('hero.playing') : t('hero.paused')}
            </span>
          </p>
          <div className="mt-1.5 flex gap-1" aria-hidden>
            {SCREENSHOTS.map((src, i) => (
              <span
                key={src}
                className={`h-0.5 w-3 transition-colors ${i === index ? 'bg-coral' : 'bg-mint/20'}`}
              />
            ))}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => setPlaying((value) => !value)}
            aria-label={playing ? t('hero.pause') : t('hero.play')}
            aria-pressed={!playing}
            className="mono flex h-7 w-7 items-center justify-center border border-mint/40 text-[8px] text-mint/80 transition-colors hover:border-mint hover:bg-mint hover:text-slate-canvas focus:outline-none focus-visible:ring-1 focus-visible:ring-mint"
          >
            {playing ? '❚❚' : '▶'}
          </button>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={t('hero.prev')}
            className="mono flex h-7 w-7 items-center justify-center border hair text-[10px] text-mint transition-colors hover:bg-mint hover:text-slate-canvas focus:outline-none focus-visible:ring-1 focus-visible:ring-mint"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={t('hero.next')}
            className="mono flex h-7 w-7 items-center justify-center border hair text-[10px] text-mint transition-colors hover:bg-mint hover:text-slate-canvas focus:outline-none focus-visible:ring-1 focus-visible:ring-mint"
          >
            →
          </button>
        </div>
      </div>
    </div>
  )
}
