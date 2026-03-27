import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import './EnvelopeIntro.css'

type Props = {
  onComplete: () => void
}

export function EnvelopeIntro({ onComplete }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const flapGroupRef = useRef<HTMLDivElement>(null)
  const sealRef = useRef<HTMLDivElement>(null)
  const shimmerRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const [busy, setBusy] = useState(false)
  const [hidden, setHidden] = useState(false)

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (hidden) return
    const stage = stageRef.current
    if (!stage) return
    if (prefersReduced) {
      gsap.set(stage, { clearProps: 'opacity,transform' })
      return
    }
    gsap.fromTo(
      stage,
      { opacity: 0, y: 24, scale: 0.94 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
        delay: 0.08,
      },
    )
  }, [hidden, prefersReduced])

  const finish = useCallback(() => {
    setHidden(true)
    document.body.classList.remove('intro-locked')
    onComplete()
  }, [onComplete])

  const runAnimation = useCallback(() => {
    if (busy || hidden) return
    setBusy(true)

    if (prefersReduced) {
      gsap.to(rootRef.current, {
        opacity: 0,
        duration: 0.2,
        onComplete: finish,
      })
      return
    }

    const seal = sealRef.current
    const flapGroup = flapGroupRef.current
    const shimmer = shimmerRef.current
    const tagline = taglineRef.current
    const root = rootRef.current

    gsap.set(shimmer, { xPercent: -120, opacity: 0 })
    gsap.set(flapGroup, {
      transformPerspective: 1100,
      rotationX: 0,
      force3D: true,
    })
    gsap.set(seal, { z: 14, y: 0, scale: 1, rotationZ: 0, force3D: true })
    gsap.set(tagline, { y: 0, filter: 'brightness(1)' })

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: finish,
    })

    const sealLiftShadow =
      'inset 0 3px 6px rgba(255,255,255,0.28), inset 0 -4px 10px rgba(25,35,22,0.35), 0 4px 10px rgba(35,48,32,0.22), 0 12px 22px rgba(35,48,32,0.32), 0 0 0 1px rgba(30,40,28,0.35)'

    tl.timeScale(0.9)
      .to(shimmer, {
        opacity: 1,
        xPercent: 180,
        duration: 1.02,
        ease: 'sine.inOut',
      })
      .to(
        [seal, tagline],
        {
          filter: 'brightness(1.05)',
          duration: 0.32,
          ease: 'sine.out',
        },
        '-=0.28',
      )
      .to(shimmer, { opacity: 0, duration: 0.28, ease: 'sine.out' })
      .to(seal, {
        y: -14,
        scale: 1.035,
        rotationZ: 1.5,
        z: 16,
        boxShadow: sealLiftShadow,
        duration: 0.92,
        ease: 'power3.out',
        force3D: true,
      })
      .to(
        tagline,
        {
          y: -8,
          duration: 0.85,
          ease: 'power2.out',
        },
        '-=0.88',
      )
      .to(
        flapGroup,
        {
          rotationX: -136,
          duration: 1.48,
          ease: 'power3.inOut',
          force3D: true,
        },
        '-=0.12',
      )
      .to(
        root,
        {
          opacity: 0,
          y: -20,
          scale: 0.99,
          duration: 0.88,
          ease: 'power3.inOut',
        },
        '-=0.18',
      )
  }, [busy, hidden, prefersReduced, finish])

  const handleClick = () => {
    runAnimation()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      runAnimation()
    }
  }

  if (hidden) return null

  return (
    <div
      ref={rootRef}
      className="envelope-intro"
      role="button"
      tabIndex={0}
      aria-label="Open invitation envelope"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className="envelope-intro__glow" aria-hidden />
      <div className="envelope-intro__pattern" aria-hidden />
      <div
        ref={stageRef}
        className={`envelope-stage${prefersReduced ? '' : ' envelope-stage--enter'}`}
      >
        <div className="envelope-perspective">
          <div className="envelope-body">
            <div className="envelope-liner" aria-hidden />
            <div className="envelope-fold envelope-fold--left" aria-hidden />
            <div className="envelope-fold envelope-fold--right" aria-hidden />
            <div className="envelope-fold envelope-fold--bottom" aria-hidden />
            <div ref={flapGroupRef} className="envelope-top-group">
              <div className="envelope-flap-outer">
                <div className="envelope-flap" aria-hidden />
              </div>
              <div className="envelope-seal-cluster">
                <div ref={sealRef} className="wax-seal">
                  <div ref={shimmerRef} className="wax-seal__shimmer" aria-hidden />
                  <span className="wax-seal__initials">A &amp; Z</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p ref={taglineRef} className="envelope-tagline">
          The invitation is exclusively for you
        </p>
        <p className="envelope-hint">Tap to open</p>
      </div>
    </div>
  )
}
