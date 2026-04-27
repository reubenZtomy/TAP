import React, { useState } from 'react'
import { Button } from '../components/Button'
import { Title } from '../components/Typography'

type GraduationScreenProps = {
  onBack: () => void
  onConfirm: (choice: string) => void
}

const options = [
  { key: 'arena', label: 'Enter the\nArena', img: '/asq/IMG_1119 1.png' },
  { key: 'knowledge', label: 'Power Up\nYour Knowledge', img: '/asq/IMG_1116.png' },
  { key: 'path', label: 'Build Your\nOwn Path', img: '/asq/IMG_1118.png' },
  { key: 'world_tour', label: 'Embark on a\nWorld Tour', img: '/asq/IMG_1117.png' },
]

export function GraduationScreen({ onBack, onConfirm }: GraduationScreenProps) {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="screen basecamp-screen graduation-screen">
      <button className="passion-back-link" type="button" onClick={onBack} aria-label="Back">
        &lt;&lt;Back
      </button>
      <div className="screen-content">
        <Title className="basecamp-title">How will you level up after graduation?</Title>
        <div className="graduation-grid">
          {options.map((opt) => (
            <button
              key={opt.key}
              className={['graduation-card', selected === opt.key ? 'is-selected' : ''].join(' ')}
              onClick={() => setSelected(opt.key)}
              aria-pressed={selected === opt.key}
            >
              <img src={opt.img} alt="" className="graduation-card-img" draggable={false} />
              <span className="graduation-card-label">
                {opt.label.split('\n').map((line, idx) => (
                  <span key={idx} className="graduation-card-line">
                    {line}
                  </span>
                ))}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="screen-footer basecamp-footer">
        <Button onClick={() => selected && onConfirm(selected)} disabled={!selected} fullWidth aria-label="Confirm">
          Confirm
        </Button>
        <div className="graduation-instruction">Select an option to confirm</div>
      </div>
    </div>
  )
}
