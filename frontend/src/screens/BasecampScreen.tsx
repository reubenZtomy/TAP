import React, { useMemo, useState } from 'react'
import { Button } from '../components/Button'
import { Title } from '../components/Typography'

type BasecampScreenProps = {
  onBack: () => void
  onConfirm: (choice: string) => void
  questionText?: string
  optionLabels?: Record<string, string>
  backText?: string
  confirmText?: string
  instructionText?: string
}

const options = [
  { key: 'big_creative', label: 'Big and Creative' },
  { key: 'fast_paced', label: 'Fast-Paced and Exciting' },
  { key: 'quiet_relaxed', label: 'Quiet and Relaxed' },
  { key: 'city_nature', label: 'A mix of City and Nature' },
]

export function BasecampScreen({
  onBack,
  onConfirm,
  questionText = 'Where will you set up your basecamp for learning?',
  optionLabels = {},
  backText = 'Back',
  confirmText = 'Confirm',
  instructionText = 'Select Answer then Confirm',
}: BasecampScreenProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const localizedOptions = options.map((option) => ({
    ...option,
    label: optionLabels[option.key] ?? option.label,
  }))
  const heroSrc = useMemo(() => {
    switch (selected) {
      case 'big_creative':
        return '/asq/results - city/hero.png'
      case 'fast_paced':
        return '/asq/results - dynamic explorer/hero.png'
      case 'quiet_relaxed':
        return '/asq/results - focused scholar/hero.png'
      case 'city_nature':
        return '/asq/results - balanced adventurer/hero.png'
      default:
        return '/asq/Group 53.png'
    }
  }, [selected])

  return (
    <div className="screen basecamp-screen">
      <button className="passion-back-link" type="button" onClick={onBack} aria-label="Back">
        &lt;&lt;{backText}
      </button>
      <div className="screen-content">
        <Title className="basecamp-title">{questionText}</Title>
        <div className="basecamp-hero" aria-hidden="true">
          <img src={heroSrc} alt="" draggable={false} />
        </div>
        <div className="basecamp-options">
          {localizedOptions.map((opt) => (
            <button
              key={opt.key}
              className={['basecamp-option', selected === opt.key ? 'is-selected' : ''].join(' ')}
              onClick={() => setSelected(opt.key)}
              aria-pressed={selected === opt.key}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      <div className="screen-footer basecamp-footer">
        <Button
          onClick={() => selected && onConfirm(selected)}
          disabled={!selected}
          fullWidth
          aria-label="Confirm"
        >
          {confirmText}
        </Button>
        <div className="basecamp-instruction">{instructionText}</div>
      </div>
    </div>
  )
}
