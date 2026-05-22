import React, { useEffect, useState } from 'react'
import { Button } from '../components/Button'

type ResultsRevealScreenProps = {
  onContinue: () => void
  mainText?: string
  subtitleText?: string
  buttonText?: string
  /** When false, continue stays disabled until the result API finishes */
  ready?: boolean
}

export function ResultsRevealScreen({
  onContinue,
  mainText = 'Gathering results...',
  subtitleText = 'I wonder where you will go?',
  buttonText = 'Click to find out!',
  ready = true,
}: ResultsRevealScreenProps) {
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
        <div className="results-main">{mainText}</div>
        {showSubtitle && <div className="results-sub">{subtitleText}</div>}
      </div>
      <div className="screen-footer results-footer">
        {showButton && (
          <Button
            onClick={onContinue}
            disabled={!ready}
            fullWidth
            aria-label="Click to find out"
          >
            {ready ? buttonText : 'Still gathering...'}
          </Button>
        )}
      </div>
    </div>
  )
}
