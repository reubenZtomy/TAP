import React, { useMemo } from 'react'
import { PersonalityTheme, RESULT_ACTION_ICONS } from '../../data/personalityThemes'
import { PersonalityResultViewData } from '../../utils/mapQuizResult'
import { pickResultCardColors } from '../../utils/personalityResultCardColors'

type PersonalityResultLayoutProps = {
  theme: PersonalityTheme
  data: PersonalityResultViewData
  onShare?: () => void
  onBack?: () => void
  onRetry?: () => void
}

export function PersonalityResultLayout({
  theme,
  data,
  onShare,
  onBack,
  onRetry,
}: PersonalityResultLayoutProps) {
  const [traitLeft, traitCenter, traitRight] = theme.traits
  const [colorLeft, colorCenter, colorRight] = theme.traitColors
  const cardColors = useMemo(() => pickResultCardColors(), [theme.id])

  return (
    <div className="screen personality-result-screen">
      <div className="personality-result-scroll">
        <div className="personality-result-panel">
          <p className="personality-result-intro">You are a...!</p>
          <img
            className="personality-result-hero"
            src={theme.heroImage}
            alt=""
            draggable={false}
          />

          <div className="personality-result-traits">
            <span className="personality-result-body-text" style={{ color: colorLeft }}>
              {traitLeft}
            </span>
            <span className="personality-result-body-text" style={{ color: colorCenter }}>
              {traitCenter}
            </span>
            <span className="personality-result-body-text" style={{ color: colorRight }}>
              {traitRight}
            </span>
          </div>

          <section
            className="personality-result-block personality-result-block--random"
            style={
              {
                '--result-card-bg': cardColors.titleBg,
                '--result-card-fg': cardColors.titleFg,
              } as React.CSSProperties
            }
          >
            <h2 className="personality-result-block-title">{data.title}</h2>
            <p className="personality-result-block-body">{data.description}</p>
          </section>

          <section
            className="personality-result-block personality-result-block--random"
            style={
              {
                '--result-card-bg': cardColors.personalityBg,
                '--result-card-fg': cardColors.personalityFg,
              } as React.CSSProperties
            }
          >
            <h2 className="personality-result-block-title">Personality</h2>
            <p className="personality-result-block-body">{data.personality}</p>
          </section>

          <section
            className="personality-result-block personality-result-block--random personality-result-block--lucky-charm"
            style={
              {
                '--result-card-bg': cardColors.luckyCharmBg,
                '--result-card-fg': cardColors.luckyCharmFg,
              } as React.CSSProperties
            }
          >
            <h2 className="personality-result-block-title">Lucky Charm</h2>
            <img
              className="personality-result-charm-img"
              src={theme.luckyCharmImage}
              alt=""
              draggable={false}
            />
            <p className="personality-result-block-body">{data.luckyCharmText}</p>
          </section>

          <section
            className="personality-result-block personality-result-block--random"
            style={
              {
                '--result-card-bg': cardColors.baseCampBg,
                '--result-card-fg': cardColors.baseCampFg,
              } as React.CSSProperties
            }
          >
            <h2 className="personality-result-block-title">Base Camp</h2>
            <p className="personality-result-block-body">{data.basecamp}</p>
          </section>

          <section className="personality-result-block personality-result-block--white">
            <h2 className="personality-result-block-title personality-result-block-title--blue">
              Partner
            </h2>
            <img
              className="personality-result-partner-img"
              src={theme.partnerImage}
              alt=""
              draggable={false}
            />
            <p className="personality-result-partner-label">{data.partner}</p>
          </section>

          <section className="personality-result-block personality-result-block--white personality-result-block--subjects">
            <h2 className="personality-result-block-title personality-result-block-title--orange">
              Potential Subjects
            </h2>
            <div className="personality-result-subjects">
              {data.subjects.slice(0, 3).map((subject, index) => (
                <div key={`${subject}-${index}`} className="personality-result-subject-card">
                  <img
                    src={
                      theme.subjectCardImage ??
                      theme.subjectImages?.[0] ??
                      'https://placehold.co/78x138'
                    }
                    alt=""
                    className="personality-result-subject-frame"
                    draggable={false}
                  />
                  <span className="personality-result-subject-label">{subject}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="personality-result-actions">
          <button type="button" className="personality-result-action" onClick={onShare} aria-label="Share">
            <img
              className="personality-result-action-icon personality-result-action-icon--share"
              src={RESULT_ACTION_ICONS.share}
              alt=""
              draggable={false}
            />
            <span className="personality-result-action-label">Share</span>
          </button>
          <button type="button" className="personality-result-action" onClick={onBack} aria-label="Back">
            <img
              className="personality-result-action-icon personality-result-action-icon--back"
              src={RESULT_ACTION_ICONS.back}
              alt=""
              draggable={false}
            />
            <span className="personality-result-action-label">Back</span>
          </button>
          <button type="button" className="personality-result-action" onClick={onRetry} aria-label="Retry">
            <img
              className="personality-result-action-icon"
              src={RESULT_ACTION_ICONS.retry}
              alt=""
              draggable={false}
            />
            <span className="personality-result-action-label">Retry</span>
          </button>
        </div>
      </div>
    </div>
  )
}
