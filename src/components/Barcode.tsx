import { useMemo } from 'react'

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export default function Barcode() {
  const bars = useMemo(() => {
    const random = mulberry32(6755912677)
    return Array.from({ length: 96 }, (_, i) => ({
      width: 1 + Math.floor(random() * 3),
      height: 20 + Math.round(random() * 80),
      tone: i % 23 === 0 ? 'bg-coral' : i % 11 === 0 ? 'bg-mint' : 'bg-cream',
    }))
  }, [])

  return (
    <div className="flex h-14 items-end gap-[3px] overflow-hidden border-b hair pb-1" aria-hidden>
      {bars.map((bar, i) => (
        <span
          key={i}
          className={`shrink-0 ${bar.tone}`}
          style={{ width: `${bar.width}px`, height: `${bar.height}%` }}
        />
      ))}
    </div>
  )
}
