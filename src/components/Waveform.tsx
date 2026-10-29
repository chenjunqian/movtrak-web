import { usePageScrollProgress } from '../hooks/useHud'

const WAVE_PATH =
  'M0 70 L70 70 L86 44 L102 98 L118 70 L250 70 L266 54 L281 88 L296 70 L424 70 L440 18 L456 120 L474 70 L596 70 L610 46 L625 94 L640 70 L774 70 L790 8 L807 130 L823 70 L956 70 L970 56 L985 84 L1000 70 L1200 70'

export default function Waveform() {
  const progress = usePageScrollProgress()

  return (
    <div className="relative h-24 overflow-hidden border-b hair md:h-28" aria-hidden>
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-mint/15" />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 140"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d={WAVE_PATH}
          stroke="#FF7A85"
          strokeWidth="2"
          strokeLinejoin="miter"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - progress}
          style={{ filter: 'drop-shadow(0 0 6px rgba(255,122,133,0.6))' }}
        />
      </svg>
      <div className="absolute left-4 top-3 mono text-[8px] text-cream/35 md:left-12">
        SIDE_SEAM // TRACK_SIGNAL
      </div>
      <div className="absolute bottom-3 right-4 mono text-[8px] text-coral/70 md:right-12">
        {String(Math.round(progress * 100)).padStart(3, '0')}%
      </div>
    </div>
  )
}
