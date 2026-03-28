import {
  HERO_FLORAL_IMAGE,
  HERO_HOST_LINES,
  HERO_INVITE_TEXT,
  HERO_NAME_BRIDE,
  HERO_NAME_PARTNER,
} from '../config'
import './Hero.css'

export function Hero() {
  return (
    <section
      className="hero"
      aria-labelledby="hero-names"
      aria-describedby="hero-invite"
    >
      <div className="hero__media">
        <img
          className="hero__image"
          src={HERO_FLORAL_IMAGE}
          alt=""
          aria-hidden
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="hero__scrim" aria-hidden />
      </div>
      <div className="hero__content">
        <div className="hero__header">
          {HERO_HOST_LINES.map((line, i) => (
            <p
              key={line}
              className={
                i === 0 ? 'hero__host hero__host--primary' : 'hero__host hero__host--line'
              }
            >
              {line}
            </p>
          ))}
        </div>
        <h1 id="hero-names" className="hero__names">
          <span className="hero__line">{HERO_NAME_BRIDE}</span>
          <span className="hero__line hero__line--and">with</span>
          <span className="hero__line">{HERO_NAME_PARTNER}</span>
        </h1>
        <p id="hero-invite" className="hero__invite">
          {HERO_INVITE_TEXT}
        </p>
      </div>
    </section>
  )
}
