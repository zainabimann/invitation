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
      <ol className="rsvp-list">
        {RSVP_CONTACTS.map((c) => (
          <li key={c.phone} className="rsvp-row">
            <span className="rsvp-name">{c.name}</span>
            <a
              href={`tel:${c.phone.replace(/\s/g, '')}`}
              className="rsvp-link"
              aria-label={`Call ${c.name} at ${c.phone}`}
            >
              {c.phone}
            </a>
          </li>
        ))}
      </ol>
    </section>
  )
}
