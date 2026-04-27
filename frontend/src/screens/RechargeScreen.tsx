import React, { useState } from 'react'
import { Button } from '../components/Button'
import { Title } from '../components/Typography'

type RechargeScreenProps = {
  onBack: () => void
  onConfirm: (choice: string) => void
}

const options = [
  { key: 'top_100', label: 'Top 100 or Bust!' },
  { key: 'top_200', label: 'Top 200 works for me!' },
  { key: 'program', label: "It's all about the program" },
  { key: 'ranking', label: 'Who cares about raking?' },
]

export function RechargeScreen({ onBack, onConfirm }: RechargeScreenProps) {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="screen basecamp-screen recharge-screen">
      <button className="passion-back-link" type="button" onClick={onBack} aria-label="Back">
        &lt;&lt;Back
      </button>
      <div className="screen-content">
        <Title className="basecamp-title">Do you need a top-tier university to claim victory of the quest?</Title>
        <div className="recharge-hero" aria-hidden="true">
          <img src="/asq/Group 53.png" alt="" draggable={false} />
        </div>
        <div className="basecamp-options">
          {options.map((opt) => (
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
          Confirm
        </Button>
        <div className="basecamp-instruction">Select Answer then Confirm</div>
      </div>
    </div>
  )
}
