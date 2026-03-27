import './Rsvp.css'

const RSVP_CONTACTS = [
  { name: 'Iqbal Ali', phone: '+923215416062' },
  { name: 'Muhammad Asim', phone: '+923334247162' },
  { name: 'Hammad Ali', phone: '+923104500662' },
] as const

export function Rsvp() {
  return (
    <section className="rsvp-section" aria-labelledby="rsvp-heading">
      <h2 id="rsvp-heading" className="section-title">
        RSVP
      </h2>
      <ul className="rsvp-cards">
        {RSVP_CONTACTS.map((c, i) => (
          <li key={c.phone} className="rsvp-cards__item">
            <article className="rsvp-card" aria-labelledby={`rsvp-name-${i}`}>
              <h3 id={`rsvp-name-${i}`} className="rsvp-card__name">
                {c.name}
              </h3>
              <a
                href={`tel:${c.phone.replace(/\s/g, '')}`}
                className="rsvp-card__link"
                aria-label={`Call ${c.name} at ${c.phone}`}
              >
                {c.phone}
              </a>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}
