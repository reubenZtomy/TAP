import React, { useEffect, useState } from 'react'
import { Button } from '../components/Button'

type ResultsRevealScreenProps = {
  onContinue: () => void
}

export function ResultsRevealScreen({ onContinue }: ResultsRevealScreenProps) {
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const subtitleTimer = window.setTimeout(() => setShowSubtitle(true), 1100)
    const buttonTimer = window.setTimeout(() => setShowButton(true), 2200)
    return () => {
      window.clearTimeout(subtitleTimer)
      window.clearTimeout(buttonTimer)
    }
  }, [])

  return (
    <div className="screen results-screen">
      <div className="screen-content results-content">
        <div className="results-main">Gathering results...</div>
        {showSubtitle && <div className="results-sub">I wonder where you will go?</div>}
      </div>
      <div className="screen-footer results-footer">
        {showButton && (
          <Button onClick={onContinue} fullWidth aria-label="Click to find out">
            Click to find out!
          </Button>
        )}
      </div>
    </div>
  )
}
