const TITLE_CARD_COLORS = ['#F2A25C', '#4D688C', '#FFFFFF'] as const
const PERSONALITY_CARD_COLORS = ['#4D688C', '#152840', '#BF4F26', '#F2A25C'] as const
const LUCKY_CHARM_CARD_COLORS = ['#152840', '#FFFFFF', '#4D688C'] as const
const BASE_CAMP_CARD_COLORS = ['#F2A25C', '#4D688C'] as const

export type ResultCardColorSet = {
  titleBg: string
  titleFg: string
  personalityBg: string
  personalityFg: string
  luckyCharmBg: string
  luckyCharmFg: string
  baseCampBg: string
  baseCampFg: string
}

function normalizeHex(color: string): string {
  return color.toUpperCase()
}

function pickOne<T>(pool: readonly T[]): T {
  return pool[Math.floor(Math.random() * pool.length)]
}

/** Pick from pool, excluding `avoid` when possible (for adjacent cards). */
function pickOneAvoiding<T extends string>(pool: readonly T[], avoid?: string): T {
  const avoidNorm = avoid ? normalizeHex(avoid) : undefined
  const candidates = avoidNorm
    ? pool.filter((color) => normalizeHex(color) !== avoidNorm)
    : [...pool]
  return pickOne(candidates.length > 0 ? candidates : pool)
}

/** White cards use navy body text; all other pool colors use white text. */
export function textColorForCardBackground(bg: string): '#FFFFFF' | '#4D688C' {
  return bg.toUpperCase() === '#FFFFFF' ? '#4D688C' : '#FFFFFF'
}

export function pickResultCardColors(): ResultCardColorSet {
  const titleBg = pickOne(TITLE_CARD_COLORS)
  const personalityBg = pickOneAvoiding(PERSONALITY_CARD_COLORS, titleBg)
  const luckyCharmBg = pickOneAvoiding(LUCKY_CHARM_CARD_COLORS, personalityBg)
  const baseCampBg = pickOneAvoiding(BASE_CAMP_CARD_COLORS, luckyCharmBg)

  return {
    titleBg,
    titleFg: textColorForCardBackground(titleBg),
    personalityBg,
    personalityFg: textColorForCardBackground(personalityBg),
    luckyCharmBg,
    luckyCharmFg: textColorForCardBackground(luckyCharmBg),
    baseCampBg,
    baseCampFg: textColorForCardBackground(baseCampBg),
  }
}
