import { PersonalityTheme } from '../data/personalityThemes'
import { QuizResult } from '../types/quizResult'

export type PersonalityResultViewData = {
  title: string
  description: string
  personality: string
  basecamp: string
  partner: string
  luckyCharmText: string
  subjects: string[]
}

export function mapApiResultToView(
  result: QuizResult,
  theme: PersonalityTheme,
  passionLabel?: string
): PersonalityResultViewData {
  const recs = result.university_recommendations ?? []
  const topCity = recs[0]?.city?.trim()
  const subjectFromRecs = recs
    .slice(0, 3)
    .map((r) => {
      const courses = (r.top_courses || '').trim()
      if (courses) return courses.split(',')[0]?.trim() || courses
      return passionLabel || 'Subject'
    })
    .filter(Boolean)

  const subjects =
    subjectFromRecs.length > 0
      ? subjectFromRecs
      : passionLabel
        ? [passionLabel, passionLabel, passionLabel]
        : ['BUSINESS', 'BUSINESS', 'BUSINESS']

  return {
    title: result.title || 'City Visionary',
    description: result.description || theme.defaultDescription,
    personality: result.personality || 'Serious Study Person',
    basecamp: topCity || result.basecamp || 'Melbourne',
    partner: result.partner || 'Creative Learner',
    luckyCharmText: result.reason || theme.defaultLuckyCharm,
    subjects,
  }
}
