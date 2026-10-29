import { useEffect, useRef, useState } from 'react'

/**
 * Writes the current scroll velocity (0 → 1) to --vel on <html>.
 * Drives the telemetry velocity meter.
 */
export function useScrollVelocityVar() {
  useEffect(() => {
    let lastY = window.scrollY
    let velocity = 0
    let frame = 0

    const setVelocity = (value: number) => {
      document.documentElement.style.setProperty('--vel', value.toFixed(3))
    }

    const decay = () => {
      velocity *= 0.86
      if (velocity < 0.002) {
        velocity = 0
        setVelocity(0)
        frame = 0
        return
      }
      setVelocity(velocity)
      frame = window.requestAnimationFrame(decay)
    }

    const onScroll = () => {
      const y = window.scrollY
      velocity = Math.max(Math.min(1, Math.abs(y - lastY) / 45), velocity)
      lastY = y
      setVelocity(velocity)
      if (!frame) frame = window.requestAnimationFrame(decay)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
      setVelocity(0)
    }
  }, [])
}

/** Page scroll progress, 0 → 1. Used to draw the coral waveform. */
export function usePageScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0)
    }

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return progress
}

/** Live HUD clock, HH:MM:SS in 24h. */
export function useClock() {
  const [time, setTime] = useState(() => formatClock(new Date()))

  useEffect(() => {
    const id = window.setInterval(() => setTime(formatClock(new Date())), 1000)
    return () => window.clearInterval(id)
  }, [])

  return time
}

function formatClock(date: Date) {
  return date.toLocaleTimeString('en-GB', { hour12: false })
}

/** Intersection-triggered count-up with an out-expo curve. */
export function useCountUp(target: number, duration = 1600) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let frame = 0
    let started = false

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry?.isIntersecting || started) return
        started = true
        const start = performance.now()

        const step = (now: number) => {
          const t = Math.min(1, (now - start) / duration)
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
          setValue(Math.round(target * eased))
          if (t < 1) frame = window.requestAnimationFrame(step)
        }

        frame = window.requestAnimationFrame(step)
      },
      { threshold: 0.4 },
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [target, duration])

  return { ref, value }
}
