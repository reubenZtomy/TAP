import { QuizContent } from '../types/quizContent'

/** Internal option keys collected from each quiz screen */
export type QuizAnswerKeys = {
  passion?: string
  partner?: string
  treasure?: string
  fun?: string
  basecamp?: string
  adventure?: string
  recharge?: string
  graduation?: string
}

/** Body shape for POST /api/generate-result (see readme.md) */
export type GenerateResultRequest = {
  passion: string
  partner: string
  treasure: string
  funBalance: string
  basecamp: string
  downtime: string
  rankingView: string
  afterGraduation: string
}

const OPTION_FALLBACKS: Record<string, Record<string, string>> = {
  passion: {
    business: 'BUSINESS',
    engineering: 'ENGINEERING',
    health_science: 'HEALTH SCIENCE',
    art_humanities: 'ART & HUMANITIES',
    environmental_studies: 'ENVIRONMENTAL STUDIES',
    it_cs: 'IT & COMPUTER SCIENCE',
    design_creative: 'DESIGN & CREATIVE ARTS',
    law: 'LAW',
    nursing: 'NURSING',
    education: 'EDUCATION',
    social_work: 'SOCIAL WORK',
    other: 'OTHER',
  },
  partner: {
    koala: 'Koala Chill',
    kangaroo: 'Kangaroo Jumper',
    wombat: 'Wombat Warrior',
    crocodile: 'Crocodile Survivor',
  },
  treasure: {
    under_25k: 'Small Fortune',
    '25_35k': 'Well-Stocked',
    '35_45k': 'Treasure Trove',
    over_45k: 'Endless Gold',
  },
  fun: {
    all_work: 'All Work, No Play',
    balanced: 'Balanced Adventurer',
    relaxed: 'Relaxed Scholar',
    party: 'Party Expert',
  },
  basecamp: {
    big_creative: 'Big and Creative City Life',
    fast_paced: 'Fast-Paced and Exciting',
    quiet_relaxed: 'Quiet and Relaxed',
    city_nature: 'A Mix of City and Nature',
  },
  adventure: {
    surf: 'Surf the Waves',
    wildlife: 'Wildlife Watcher',
    hike: 'Hike the Outback',
    city: 'City Explorer',
  },
  recharge: {
    top_100: 'Top 100 or bust!',
    top_200: 'Top 200 works for me!',
    program: "It's all about the program",
    ranking: 'Who cares about rankings?',
  },
  graduation: {
    arena: 'Enter the Arena',
    knowledge: 'Power Up Your Knowledge',
    path: 'Build Your Own Path',
    world_tour: 'Embark on a World Tour',
  },
}

function normalizeLabel(text: string): string {
  return text.replace(/\\n/g, ' ').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim()
}

export function labelForOption(
  content: QuizContent | null,
  questionKey: string,
  optionKey: string | undefined
): string {
  if (!optionKey) return ''
  const fromContent = content?.questions?.[questionKey]?.options?.find((o) => o.key === optionKey)?.label
  const raw = fromContent ?? OPTION_FALLBACKS[questionKey]?.[optionKey] ?? optionKey
  const normalized = normalizeLabel(raw)

  if (questionKey === 'treasure' || questionKey === 'basecamp') {
    return OPTION_FALLBACKS[questionKey]?.[optionKey] ?? normalized
  }
  if (questionKey === 'recharge' && optionKey === 'top_100') {
    return 'Top 100 or bust!'
  }
  if (questionKey === 'recharge' && optionKey === 'ranking') {
    return 'Who cares about rankings?'
  }

  return normalized
}

export function buildGenerateResultPayload(
  answers: QuizAnswerKeys,
  content: QuizContent | null
): GenerateResultRequest | null {
  const passion = labelForOption(content, 'passion', answers.passion)
  const partner = labelForOption(content, 'partner', answers.partner)
  const treasure = labelForOption(content, 'treasure', answers.treasure)
  const funBalance = labelForOption(content, 'fun', answers.fun)
  const basecamp = labelForOption(content, 'basecamp', answers.basecamp)
  const downtime = labelForOption(content, 'adventure', answers.adventure)
  const rankingView = labelForOption(content, 'recharge', answers.recharge)
  const afterGraduation = labelForOption(content, 'graduation', answers.graduation)

  const payload = {
    passion,
    partner,
    treasure,
    funBalance,
    basecamp,
    downtime,
    rankingView,
    afterGraduation,
  }

  if (Object.values(payload).some((v) => !v)) {
    return null
  }

  return payload
}
