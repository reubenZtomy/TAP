import {
  PERSONALITY_RESULT_IDS,
  PERSONALITY_RESULT_TITLES,
  PersonalityId,
} from '../data/personalityThemes'

type PersonalityResultDevNavProps = {
  onOpenResult: (personalityId: PersonalityId) => void
}

export function PersonalityResultDevNav({ onOpenResult }: PersonalityResultDevNavProps) {
  return (
    <aside className="personality-dev-nav" aria-label="Test personality result screens">
      <p className="personality-dev-nav-title">Test results</p>
      <div className="personality-dev-nav-buttons">
        {PERSONALITY_RESULT_IDS.map((id) => (
          <button
            key={id}
            type="button"
            className="personality-dev-nav-button"
            onClick={() => onOpenResult(id)}
          >
            {PERSONALITY_RESULT_TITLES[id]}
          </button>
        ))}
      </div>
    </aside>
  )
}
