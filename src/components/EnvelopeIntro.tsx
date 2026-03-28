import { useCallback, useEffect, useRef, useState } from 'react'
import { INTRO_SPLASH_IMAGE } from '../config'
import './EnvelopeIntro.css'

type Props = {
  onComplete: () => void
}

export function EnvelopeIntro({ onComplete }: Props) {
  const finishedRef = useRef(false)
  const [dissolving, setDissolving] = useState(false)
  const [hidden, setHidden] = useState(false)

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const finish = useCallback(() => {
    if (finishedRef.current) return
    finishedRef.current = true
    setHidden(true)
    document.body.classList.remove('intro-locked')
    onComplete()
  }, [onComplete])

  const startDissolve = useCallback(() => {
    if (hidden || dissolving) return
    if (prefersReduced) {
      finish()
      return
    }
    setDissolving(true)
  }, [hidden, dissolving, prefersReduced, finish])

  useEffect(() => {
    if (!dissolving || prefersReduced) return
    const safety = window.setTimeout(finish, 4000)
    return () => window.clearTimeout(safety)
  }, [dissolving, prefersReduced, finish])

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName !== 'opacity' || !dissolving) return
    finish()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      startDissolve()
    }
  }

  if (hidden) return null

  return (
    <div
      className={`envelope-intro${dissolving ? ' envelope-intro--dissolve' : ''}`}
      role="button"
      tabIndex={0}
      aria-label="Continue to invitation"
      onClick={startDissolve}
      onKeyDown={handleKeyDown}
      onTransitionEnd={handleTransitionEnd}
    >
      <img
        className="envelope-intro__image"
        src={INTRO_SPLASH_IMAGE}
        alt="Invitation envelope with A and Z wax seal"
        decoding="sync"
        fetchPriority="high"
      />
      <p className="envelope-intro__hint">Tap to continue</p>
    </div>
  )
}
