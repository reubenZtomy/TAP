import { PersonalityTheme } from '../data/personalityThemes'
import { QuizResult, UniversityRecommendation } from '../types/quizResult'

export type PersonalityResultViewData = {
  title: string
  description: string
  personality: string
  basecamp: string
  partner: string
  luckyCharmText: string
  subjects: string[]
  universities: UniversityRecommendation[]
}

function extractUniqueSubjects(
  recs: UniversityRecommendation[],
  passionLabel?: string
): string[] {
  const seen = new Set<string>()
  const subjects: string[] = []

  for (const rec of recs) {
    const courses = (rec.top_courses || '').trim()
    if (!courses) continue
    for (const part of courses.split(',')) {
      const subject = part.trim()
      if (!subject) continue
      const key = subject.toLowerCase()
      if (seen.has(key)) continue
      seen.add(key)
      subjects.push(subject)
      if (subjects.length >= 3) return subjects
    }
  }

  if (subjects.length > 0) return subjects
  if (passionLabel?.trim()) return [passionLabel.trim()]
  return ['Business', 'Commerce', 'Analytics']
}

export function mapApiResultToView(
  result: QuizResult,
  theme: PersonalityTheme,
  passionLabel?: string
): PersonalityResultViewData {
  const recs = result.university_recommendations ?? []
  const topCity = recs[0]?.city?.trim()
  const subjects = extractUniqueSubjects(recs, passionLabel)

  return {
    title: result.title || 'City Visionary',
    description: result.description || theme.defaultDescription,
    personality: result.personality || 'Serious Study Person',
    basecamp: topCity || result.basecamp || 'Melbourne',
    partner: result.partner || 'Creative Learner',
    luckyCharmText: result.reason || theme.defaultLuckyCharm,
    subjects,
    universities: recs.slice(0, 3),
  }
}
