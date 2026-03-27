import { LOCATION_MAPS_URL, VENUE_SEARCH_QUERY } from '../config'
import './Location.css'

function buildMapsUrl(): string {
  if (LOCATION_MAPS_URL.trim()) return LOCATION_MAPS_URL.trim()
  const q = encodeURIComponent(VENUE_SEARCH_QUERY)
  return `https://www.google.com/maps/search/?api=1&query=${q}`
}

export function Location() {
  const href = buildMapsUrl()

  return (
    <section className="location-section" aria-labelledby="location-heading">
      <h2 id="location-heading" className="section-title">
        Location
      </h2>
      <a
        className="location-card"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="location-card__icon" aria-hidden>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 21s7-4.35 7-11a7 7 0 10-14 0c0 6.65 7 11 7 11z"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
            <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </span>
        <span className="location-card__cta">Open in Google Maps</span>
      </a>
      <p className="location-venue">{VENUE_SEARCH_QUERY}</p>
    </section>
  )
}
