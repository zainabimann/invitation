import { useEffect, useState } from 'react'
import { EVENT_ISO } from '../config'
import './Countdown.css'

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function getParts(target: number) {
  const now = Date.now()
  const diff = Math.max(0, target - now)
  const sec = Math.floor(diff / 1000)
  return {
    days: Math.floor(sec / 86400),
    hours: Math.floor((sec % 86400) / 3600),
    minutes: Math.floor((sec % 3600) / 60),
    seconds: sec % 60,
  }
}

export function Countdown() {
  const target = new Date(EVENT_ISO).getTime()
  const [parts, setParts] = useState(() => getParts(target))

  useEffect(() => {
    const id = window.setInterval(() => {
      setParts(getParts(target))
    }, 1000)
    return () => window.clearInterval(id)
  }, [target])

  const blocks = [
    { label: 'Days', value: parts.days },
    { label: 'Hours', value: pad(parts.hours) },
    { label: 'Minutes', value: pad(parts.minutes) },
    { label: 'Seconds', value: pad(parts.seconds) },
  ]

  return (
    <section className="countdown-section" aria-labelledby="date-heading">
      <p className="countdown-section__dayname">Sunday</p>
      <p id="date-heading" className="countdown-section__date">
        March 29, 2026
      </p>
      <div className="countdown-grid" role="timer" aria-live="polite">
        {blocks.map((b) => (
          <div key={b.label} className="countdown-block">
            <span className="countdown-block__value">{b.value}</span>
            <span className="countdown-block__label">{b.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
