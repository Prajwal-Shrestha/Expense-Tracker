import { useEffect, useRef, useState } from 'react'


export function useCountUp(target, duration = 500) {
  const [value, setValue] = useState(target)
  const fromRef = useRef(target)
  const frameRef = useRef()

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setValue(target)
      fromRef.current = target
      return
    }

    const from = fromRef.current
    const change = target - from
    const start = performance.now()

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) 
      setValue(from + change * eased)
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        fromRef.current = target
      }
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [target])

  return value
}
