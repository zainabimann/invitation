import { HERO_FLORAL_IMAGE, HERO_INVITE_TEXT } from '../config'
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
        <h1 id="hero-names" className="hero__names">
          <span className="hero__line">Abdul Rehman</span>
          <span className="hero__line hero__line--and">and</span>
          <span className="hero__line">Zainab Iman</span>
        </h1>
        <p id="hero-invite" className="hero__invite">
          {HERO_INVITE_TEXT}
        </p>
      </div>
    </section>
  )
}
