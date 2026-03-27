import { HERO_FLORAL_IMAGE } from '../config'
import './Hero.css'

export function Hero() {
  return (
    <section className="hero" aria-label="Abdul Rehman and Zainab Iman">
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
        <h1 className="hero__names">
          <span className="hero__line">Abdul Rehman</span>
          <span className="hero__line hero__line--and">and</span>
          <span className="hero__line">Zainab Iman</span>
        </h1>
      </div>
    </section>
  )
}
