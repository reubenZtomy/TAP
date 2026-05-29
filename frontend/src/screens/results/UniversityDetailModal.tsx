import React from 'react'
import { UniversityRecommendation } from '../../types/quizResult'

type UniversityDetailModalProps = {
  university: UniversityRecommendation
  onClose: () => void
}

function DetailRow({ label, value }: { label: string; value?: string }) {
  if (!value?.trim()) return null
  return (
    <div className="university-detail-row">
      <span className="university-detail-label">{label}</span>
      <span className="university-detail-value">{value}</span>
    </div>
  )
}

export function UniversityDetailModal({ university, onClose }: UniversityDetailModalProps) {
  const cityLine = [university.city, university.state].filter(Boolean).join(', ')

  return (
    <div
      className="university-detail-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="university-detail-title"
      onClick={onClose}
    >
      <div className="university-detail-sheet" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="university-detail-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h3 id="university-detail-title" className="university-detail-title">
          {university.name || 'University'}
        </h3>
        {cityLine && <p className="university-detail-city">{cityLine}</p>}
        <div className="university-detail-body">
          <DetailRow label="QS ranking" value={university.qs_ranking} />
          <DetailRow label="Top courses" value={university.top_courses} />
          <DetailRow label="International fees" value={university.intl_fee} />
          <DetailRow label="Domestic fees" value={university.domestic_fee} />
          {university.why?.trim() && (
            <div className="university-detail-row university-detail-row--why">
              <span className="university-detail-label">Why this fit</span>
              <p className="university-detail-why">{university.why}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
