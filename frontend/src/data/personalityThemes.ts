import type { QuizResult } from '../types/quizResult'

export type PersonalityId =
  | 'city_visionary'
  | 'adventurous_scholar'
  | 'dynamic_explorer'
  | 'creative_innovator'
  | 'focused_scholar'
  | 'balanced_adventurer'
  | 'nature_loving_learner'
  | 'mindful_learner'

export type PersonalityTheme = {
  id: PersonalityId
  traits: [string, string, string]
  traitColors: [string, string, string]
  heroImage: string
  luckyCharmImage: string
  partnerImage: string
  subjectCardImage?: string
  defaultDescription: string
  defaultLuckyCharm: string
}

const PLACEHOLDER = 'https://placehold.co'
const RESULT_ACTIONS_BASE = '/asq/Button'

type PersonalityAssetConfig = {
  folder: string
  heroFile: string
  luckyCharmFile: string
  partnerFile: string
  subjectCardFile: string
  traits: [string, string, string]
  traitColors: [string, string, string]
  defaultDescription: string
  defaultLuckyCharm: string
}

function resultAsset(folder: string, filename: string): string {
  return encodeURI(`/asq/${folder}/${filename}`)
}

function resultActionAsset(filename: string): string {
  return encodeURI(`${RESULT_ACTIONS_BASE}/${filename}`)
}

function buildTheme(id: PersonalityId, config: PersonalityAssetConfig): PersonalityTheme {
  return {
    id,
    traits: config.traits,
    traitColors: config.traitColors,
    heroImage: resultAsset(config.folder, config.heroFile),
    luckyCharmImage: resultAsset(config.folder, config.luckyCharmFile),
    partnerImage: resultAsset(config.folder, config.partnerFile),
    subjectCardImage: resultAsset(config.folder, config.subjectCardFile),
    defaultDescription: config.defaultDescription,
    defaultLuckyCharm: config.defaultLuckyCharm,
  }
}

const PERSONALITY_ASSET_CONFIG: Record<PersonalityId, PersonalityAssetConfig> = {
  city_visionary: {
    folder: 'results - city',
    heroFile: 'hero.png',
    luckyCharmFile: 'lucky_charm.png',
    partnerFile: 'partner.png',
    subjectCardFile: 'Business.png',
    traits: ['Resilient', 'Resourceful', 'Focused'],
    traitColors: ['#4D688C', '#F2A25C', '#152840'],
    defaultDescription:
      'You thrive in vibrant cities, drawing inspiration and networking opportunities to fuel your studies. Embrace the energy and dive into your work!',
    defaultLuckyCharm: 'You have everything prepared in hand and ready to use!',
  },
  adventurous_scholar: {
    folder: 'results - adventurous scholar',
    heroFile: 'hero.png',
    luckyCharmFile: 'lucky_charm.png',
    partnerFile: 'partner.png',
    subjectCardFile: 'Business.png',
    traits: ['Bold', 'Curious', 'Driven'],
    traitColors: ['#4D688C', '#BF4F26', '#152840'],
    defaultDescription:
      'You chase excitement and growth, balancing adventure with academic ambition.',
    defaultLuckyCharm: 'Your compass always points toward the next challenge.',
  },
  dynamic_explorer: {
    folder: 'results - dynamic explorer',
    heroFile: 'hero.png',
    luckyCharmFile: 'lucky_charm.png',
    partnerFile: 'partner.png',
    subjectCardFile: 'Business.png',
    traits: ['Energetic', 'Optimistic', 'Social'],
    traitColors: ['#4D688C', '#4D688C', '#4D688C'],
    defaultDescription:
      'You thrive in a fast-paced lifestyle, balancing studies with fun adventures. From exploring cafes to attending events, you make the most of every moment while achieving your goals.',
    defaultLuckyCharm: 'You are ready to capture every moment!',
  },
  creative_innovator: {
    folder: 'results - creative innovator',
    heroFile: 'hero.png',
    luckyCharmFile: 'lucky_charm.png',
    partnerFile: 'partner.png',
    subjectCardFile: 'Business.png',
    traits: ['Imaginative', 'Expressive', 'Original'],
    traitColors: ['#4D688C', '#F2A25C', '#BF4F26'],
    defaultDescription:
      'You see possibilities everywhere and turn ideas into bold new paths.',
    defaultLuckyCharm: 'Your sketchbook is your secret superpower.',
  },
  focused_scholar: {
    folder: 'results - focused scholar',
    heroFile: 'hero.png',
    luckyCharmFile: 'lucky_charm.png',
    partnerFile: 'partner.png',
    subjectCardFile: 'Business.png',
    traits: ['Disciplined', 'Thoughtful', 'Steady'],
    traitColors: ['#152840', '#4D688C', '#F2A25C'],
    defaultDescription:
      'You prefer calm focus and deep work to reach your goals step by step.',
    defaultLuckyCharm: 'Quiet determination is your greatest ally.',
  },
  balanced_adventurer: {
    folder: 'results - balanced adventurer',
    heroFile: 'hero.png',
    luckyCharmFile: 'lucky_charm.png',
    partnerFile: 'partner.png',
    subjectCardFile: 'Business.png',
    traits: ['Flexible', 'Grounded', 'Open'],
    traitColors: ['#4D688C', '#BF4F26', '#F2A25C'],
    defaultDescription:
      'You blend study and exploration, finding rhythm between work and wonder.',
    defaultLuckyCharm: 'Balance is the charm that keeps you moving forward.',
  },
  nature_loving_learner: {
    folder: 'results - nature loving learner',
    heroFile: 'hero.png',
    luckyCharmFile: 'lucky_charm.png',
    partnerFile: 'partner.png',
    subjectCardFile: 'Business.png',
    traits: ['Calm', 'Observant', 'Grounded'],
    traitColors: ['#152840', '#4D688C', '#BF4F26'],
    defaultDescription:
      'You recharge in nature and bring that peace into how you learn and live.',
    defaultLuckyCharm: 'The outdoors renews your focus whenever you need it.',
  },
  mindful_learner: {
    folder: 'results - mindful learner',
    heroFile: 'hero.png',
    luckyCharmFile: 'lucky_charm.png',
    partnerFile: 'partner.png',
    subjectCardFile: 'Business.png',
    traits: ['Reflective', 'Patient', 'Wise'],
    traitColors: ['#4D688C', '#152840', '#F2A25C'],
    defaultDescription:
      'You take your time, reflect deeply, and choose paths that feel truly right.',
    defaultLuckyCharm: 'Mindfulness guides every decision you make.',
  },
}

export const PERSONALITY_THEMES: Record<PersonalityId, PersonalityTheme> = {
  city_visionary: buildTheme('city_visionary', PERSONALITY_ASSET_CONFIG.city_visionary),
  adventurous_scholar: buildTheme('adventurous_scholar', PERSONALITY_ASSET_CONFIG.adventurous_scholar),
  dynamic_explorer: buildTheme('dynamic_explorer', PERSONALITY_ASSET_CONFIG.dynamic_explorer),
  creative_innovator: buildTheme('creative_innovator', PERSONALITY_ASSET_CONFIG.creative_innovator),
  focused_scholar: buildTheme('focused_scholar', PERSONALITY_ASSET_CONFIG.focused_scholar),
  balanced_adventurer: buildTheme('balanced_adventurer', PERSONALITY_ASSET_CONFIG.balanced_adventurer),
  nature_loving_learner: buildTheme(
    'nature_loving_learner',
    PERSONALITY_ASSET_CONFIG.nature_loving_learner
  ),
  mindful_learner: buildTheme('mindful_learner', PERSONALITY_ASSET_CONFIG.mindful_learner),
}

export const RESULT_ACTION_ICONS = {
  share: resultActionAsset('Share.png'),
  back: resultActionAsset('back.png'),
  retry: resultActionAsset('retry.png'),
} as const

export const DEFAULT_PERSONALITY_ID: PersonalityId = 'city_visionary'

export const PERSONALITY_RESULT_TITLES: Record<PersonalityId, string> = {
  city_visionary: 'City Visionary',
  adventurous_scholar: 'Adventurous Scholar',
  dynamic_explorer: 'Dynamic Explorer',
  creative_innovator: 'Creative Innovator',
  focused_scholar: 'Focused Scholar',
  balanced_adventurer: 'Balanced Adventurer',
  nature_loving_learner: 'Nature-Loving Learner',
  mindful_learner: 'Mindful Learner',
}

export const PERSONALITY_RESULT_IDS = Object.keys(PERSONALITY_THEMES) as PersonalityId[]

const MOCK_BASECAMP: Partial<Record<PersonalityId, string>> = {
  city_visionary: 'Melbourne',
  dynamic_explorer: 'Sydney',
  adventurous_scholar: 'Brisbane',
  creative_innovator: 'Melbourne',
  focused_scholar: 'Canberra',
  balanced_adventurer: 'Gold Coast',
  nature_loving_learner: 'Hobart',
  mindful_learner: 'Adelaide',
}

const MOCK_PARTNER: Partial<Record<PersonalityId, string>> = {
  dynamic_explorer: 'Adventurous Scholar',
  city_visionary: 'Creative Learner',
}

export function createMockQuizResult(personalityId: PersonalityId): QuizResult {
  const theme = PERSONALITY_THEMES[personalityId]
  const seriousTypes: PersonalityId[] = [
    'city_visionary',
    'adventurous_scholar',
    'focused_scholar',
    'balanced_adventurer',
  ]

  return {
    id: personalityId,
    title: PERSONALITY_RESULT_TITLES[personalityId],
    personality: seriousTypes.includes(personalityId) ? 'Serious Study Person' : 'Relaxed Person',
    description: theme.defaultDescription,
    reason: theme.defaultLuckyCharm,
    partner: MOCK_PARTNER[personalityId] ?? 'Creative Learner',
    basecamp: MOCK_BASECAMP[personalityId] ?? 'Melbourne',
    university_recommendations: [
      {
        rank: 1,
        name: 'University of Melbourne',
        city: MOCK_BASECAMP[personalityId] ?? 'Melbourne',
        state: 'VIC',
        qs_ranking: '#19',
        top_courses: 'Medicine, Biomedical Science, Public Health',
        intl_fee: 'AUD 54,000 – 75,000',
        domestic_fee: 'AUD 4,500 – 16,700 (CSP / HECS-HELP)',
        why: 'Strong reputation, research opportunities, and industry connections for your field of study.',
      },
      {
        rank: 2,
        name: 'University of Sydney',
        city: 'Sydney',
        state: 'NSW',
        qs_ranking: '#25',
        top_courses: 'Medicine, Biomedical Engineering, Health Sciences',
        intl_fee: 'AUD 52,000 – 68,000',
        domestic_fee: 'AUD 4,500 – 16,700 (CSP / HECS-HELP)',
        why: 'Cutting-edge facilities and collaborations with major hospitals.',
      },
      {
        rank: 3,
        name: 'Monash University',
        city: 'Melbourne',
        state: 'VIC',
        qs_ranking: '#36',
        top_courses: 'Biomedical Science, Pharmacy, Public Health',
        intl_fee: 'AUD 44,000 – 60,000',
        domestic_fee: 'AUD 4,500 – 16,700 (CSP / HECS-HELP)',
        why: 'Excellence in research, clinical practice, and community engagement.',
      },
    ],
  }
}

export function resolvePersonalityId(result: { id?: string; title?: string } | null): PersonalityId {
  if (!result) return DEFAULT_PERSONALITY_ID
  const rawId = (result.id || '').toLowerCase().replace(/\s+/g, '_')
  if (rawId in PERSONALITY_THEMES) return rawId as PersonalityId
  const titleKey = (result.title || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '') as PersonalityId
  if (titleKey in PERSONALITY_THEMES) return titleKey
  return DEFAULT_PERSONALITY_ID
}

export function getPersonalityAssetFolder(personalityId: PersonalityId): string {
  return PERSONALITY_ASSET_CONFIG[personalityId].folder
}
