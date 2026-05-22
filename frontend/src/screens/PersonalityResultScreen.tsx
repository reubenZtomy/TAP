import React, { useMemo } from 'react'
import {
  DEFAULT_PERSONALITY_ID,
  PERSONALITY_THEMES,
  resolvePersonalityId,
} from '../data/personalityThemes'
import { QuizResult } from '../types/quizResult'
import { mapApiResultToView } from '../utils/mapQuizResult'
import { labelForOption, QuizAnswerKeys } from '../utils/quizAnswers'
import { QuizContent } from '../types/quizContent'
import { PersonalityResultLayout } from './results/PersonalityResultLayout'

type PersonalityResultScreenProps = {
  result: QuizResult | null
  quizAnswers?: QuizAnswerKeys
  quizContent?: QuizContent | null
  onShare?: () => void
  onBack?: () => void
  onRetry?: () => void
}

export function PersonalityResultScreen({
  result,
  quizAnswers,
  quizContent,
  onShare,
  onBack,
  onRetry,
}: PersonalityResultScreenProps) {
  const personalityId = resolvePersonalityId(result)
  const theme = PERSONALITY_THEMES[personalityId] ?? PERSONALITY_THEMES[DEFAULT_PERSONALITY_ID]

  const passionLabel = quizAnswers?.passion
    ? labelForOption(quizContent ?? null, 'passion', quizAnswers.passion)
    : undefined

  const viewData = useMemo(
    () =>
      mapApiResultToView(
        result ?? { id: personalityId, title: theme.id.replace(/_/g, ' ') },
        theme,
        passionLabel
      ),
    [result, theme, passionLabel, personalityId]
  )

  if (result?.error) {
    return (
      <div className="screen personality-result-screen personality-result-screen--error">
        <div className="personality-result-scroll">
          <p className="personality-result-intro">Results unavailable</p>
          <p className="personality-result-error">{result.error}</p>
          <button type="button" className="personality-result-action" onClick={onRetry}>
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <PersonalityResultLayout
      theme={theme}
      data={viewData}
      onShare={onShare}
      onBack={onBack}
      onRetry={onRetry}
    />
  )
}
