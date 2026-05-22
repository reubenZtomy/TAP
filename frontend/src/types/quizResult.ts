export type UniversityRecommendation = {
  rank?: number
  name?: string
  city?: string
  state?: string
  qs_ranking?: string
  why?: string
  top_courses?: string
  intl_fee?: string
  domestic_fee?: string
}

export type QuizResult = {
  id?: string
  title?: string
  personality?: string
  basecamp?: string
  partner?: string
  treasure?: string
  funBalance?: string
  downtime?: string
  rankingView?: string
  afterGraduation?: string
  description?: string
  reason?: string
  confidence?: number
  university_recommendations?: UniversityRecommendation[]
  error?: string
  details?: string
}
