'use client'

import { useEffect, useRef } from 'react'

export default function Home() {
  const frameRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    // Oyun kendi içinde odağı yönetir; iframe yüklendiğinde odak ver
    const f = frameRef.current
    if (!f) return
    const focusFrame = () => {
      try {
        f.contentWindow?.focus()
      } catch {
        /* yoksay */
      }
    }
    f.addEventListener('load', focusFrame)
    return () => f.removeEventListener('load', focusFrame)
  }, [])

  return (
    <main
      style={{
        position: 'fixed',
        inset: 0,
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        background: '#5E2F8F'
      }}
    >
      <iframe
        ref={frameRef}
        src="/game.html"
        title="Meyve Patlat!"
        allow="autoplay; fullscreen; gamepad; vibration; clipboard-write"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          border: 'none',
          margin: 0,
          padding: 0,
          display: 'block'
        }}
      />
    </main>
  )
}
