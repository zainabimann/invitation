import './Details.css'

export function Details() {
  return (
    <section className="details-section" aria-labelledby="details-heading">
      <h2 id="details-heading" className="section-title">
        Details
      </h2>
      <p className="details-line">
        <span className="details-label">Arrival of Guests</span>
        <span className="details-time">5:00 PM</span>
      </p>
    </section>
  )
}
