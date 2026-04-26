import React from 'react'

type TitleScreenProps = {
  onStart: () => void
}

export function TitleScreen({ onStart }: TitleScreenProps) {
  const arrangedTopCharacters = [
    { src: '/asq/IMG_1136.png', slot: 'slot-1' },
    { src: '/asq/IMG_1131.png', slot: 'slot-2' },
    { src: '/asq/IMG_1134.png', slot: 'slot-3' },
    { src: '/asq/IMG_1132.png', slot: 'slot-4' },
    { src: '/asq/IMG_1133.png', slot: 'slot-5' },
    { src: '/asq/IMG_1130.png', slot: 'slot-6' },
    { src: '/asq/IMG_1135.png', slot: 'slot-7' },
    { src: '/asq/IMG_1137.png', slot: 'slot-8' },
  ]

  return (
    <div className="screen title-screen">
      <div className="title-illustration">
        <img src="/asq/bg_waves.png" alt="" className="title-illustration-img" draggable={false} />
        <div className="title-characters-layer" aria-hidden="true">
          {arrangedTopCharacters.map((item) => (
            <img key={item.src} src={item.src} alt="" className={`title-character ${item.slot}`} draggable={false} />
          ))}
        </div>
      </div>
      <div className="title-content">
        <h1 className="asq-title">AUSTRALIA STUDY<br />QUIZ</h1>
        <p className="asq-subtitle">Where do you belong?</p>
      </div>
      <div className="title-actions">
        <button className="asq-cta" onClick={onStart} aria-label="Tap to Start" data-testid="cta-start">
          Tap to Start
        </button>
      </div>
    </div>
  )
}
