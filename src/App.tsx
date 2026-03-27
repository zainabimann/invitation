import { useEffect, useState } from 'react'
import { Countdown } from './components/Countdown'
import { Details } from './components/Details'
import { EnvelopeIntro } from './components/EnvelopeIntro'
import { Hero } from './components/Hero'
import { Location } from './components/Location'
import { Rsvp } from './components/Rsvp'
import './App.css'

function App() {
  const [introDone, setIntroDone] = useState(false)

  useEffect(() => {
    if (!introDone) {
      document.body.classList.add('intro-locked')
    } else {
      document.body.classList.remove('intro-locked')
    }
    return () => document.body.classList.remove('intro-locked')
  }, [introDone])

  return (
    <>
      {!introDone && (
        <EnvelopeIntro onComplete={() => setIntroDone(true)} />
      )}
      <main className="main-shell">
        <Hero />
        <div className="section-divider" aria-hidden>
          <span className="section-divider__ornament" />
        </div>
        <Countdown />
        <div className="section-divider" aria-hidden>
          <span className="section-divider__ornament" />
        </div>
        <Location />
        <div className="section-divider" aria-hidden>
          <span className="section-divider__ornament" />
        </div>
        <Details />
        <div className="section-divider" aria-hidden>
          <span className="section-divider__ornament" />
        </div>
        <Rsvp />
      </main>
    </>
  )
}

export default App
