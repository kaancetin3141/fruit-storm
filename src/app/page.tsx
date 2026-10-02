'use client'

import { useEffect, useRef, useState } from 'react'

/* Kapak ekranı süsleri — sabit diziler (SSR/CSR hydration uyumu için random YOK) */
const FRUITS = [
  { e: '🍓', l: '8%', t: '16%', s: 46, d: '3.9s', dl: '0s' },
  { e: '🍇', l: '84%', t: '13%', s: 42, d: '4.4s', dl: '.6s' },
  { e: '🍊', l: '15%', t: '62%', s: 38, d: '3.6s', dl: '1.1s' },
  { e: '🍉', l: '76%', t: '58%', s: 50, d: '4.8s', dl: '.3s' },
  { e: '🍎', l: '63%', t: '25%', s: 34, d: '4.1s', dl: '1.6s' },
  { e: '🍋', l: '27%', t: '33%', s: 30, d: '3.4s', dl: '.9s' },
  { e: '🍌', l: '90%', t: '74%', s: 36, d: '4.6s', dl: '1.3s' },
  { e: '🥝', l: '5%', t: '82%', s: 32, d: '4.2s', dl: '.2s' },
  { e: '🍒', l: '44%', t: '7%', s: 28, d: '3.8s', dl: '1.9s' },
  { e: '🍑', l: '52%', t: '80%', s: 34, d: '4s', dl: '.7s' },
]

const BUBBLES = [
  { l: '12%', s: 14, d: '9s', dl: '0s' },
  { l: '28%', s: 9, d: '12s', dl: '2.2s' },
  { l: '41%', s: 18, d: '8s', dl: '1.1s' },
  { l: '55%', s: 11, d: '11s', dl: '3.4s' },
  { l: '67%', s: 15, d: '9.5s', dl: '.6s' },
  { l: '79%', s: 8, d: '13s', dl: '4.1s' },
  { l: '88%', s: 16, d: '8.6s', dl: '2.8s' },
  { l: '6%', s: 10, d: '10.5s', dl: '5s' },
  { l: '35%', s: 7, d: '14s', dl: '1.8s' },
  { l: '95%', s: 12, d: '10s', dl: '3.9s' },
]

const LOGO_W1 = ['F', 'R', 'U', 'I', 'T']
const LOGO_W2 = ['S', 'T', 'O', 'R', 'M', '!']

export default function Home() {
  const frameRef = useRef<HTMLIFrameElement>(null)
  const [playing, setPlaying] = useState(false)
  const [coverGone, setCoverGone] = useState(false)

  /* OYNA → kapak süzülerek kaybolur, 700ms sonra DOM'dan kalkar */
  useEffect(() => {
    if (!playing) return
    const t = setTimeout(() => setCoverGone(true), 700)
    return () => clearTimeout(t)
  }, [playing])

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
  }, [playing])

  const startGame = () => setPlaying(true)

  return (
    <main
      style={{
        position: 'fixed',
        inset: 0,
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        background: '#5E2F8F',
      }}
    >
      {playing && (
        <iframe
          ref={frameRef}
          src="/game.html"
          title="Fruit Storm!"
          allow="autoplay; fullscreen; gamepad; vibration; clipboard-write"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            border: 'none',
            margin: 0,
            padding: 0,
            display: 'block',
          }}
        />
      )}

      {!coverGone && (
        <div className={`fs-cover${playing ? ' fs-hide' : ''}`}>
          <style>{COVER_CSS}</style>

          {/* dekor: köşe kabarıklıkları */}
          <div className="fs-blob fs-blob-a" aria-hidden="true" />
          <div className="fs-blob fs-blob-b" aria-hidden="true" />

          {/* süzülen meyveler */}
          <div className="fs-fruits" aria-hidden="true">
            {FRUITS.map((f, i) => (
              <i
                key={`f${i}`}
                style={{
                  left: f.l,
                  top: f.t,
                  fontSize: f.s,
                  animationDuration: f.d,
                  animationDelay: f.dl,
                }}
              >
                {f.e}
              </i>
            ))}
          </div>

          {/* yükselen kabarcıklar */}
          <div className="fs-bubbles" aria-hidden="true">
            {BUBBLES.map((b, i) => (
              <i
                key={`b${i}`}
                style={{
                  left: b.l,
                  width: b.s,
                  height: b.s,
                  animationDuration: b.d,
                  animationDelay: b.dl,
                }}
              />
            ))}
          </div>

          <div className="fs-center" role="banner">
            <h1 className="fs-logo" aria-label="Fruit Storm!">
              <span className="fs-w1">
                {LOGO_W1.map((c, i) => (
                  <b key={i} style={{ '--i': i } as React.CSSProperties}>
                    {c}
                  </b>
                ))}
              </span>{' '}
              <span className="fs-w2">
                {LOGO_W2.map((c, i) => (
                  <b
                    key={i}
                    style={{ '--i': i + LOGO_W1.length } as React.CSSProperties}
                  >
                    {c}
                  </b>
                ))}
              </span>
            </h1>

            <p className="fs-tag">Eşleştir · Zincirle · Yıldızları topla</p>

            <button
              type="button"
              className="fs-play"
              onClick={startGame}
              aria-label="Oyunu başlat"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="fs-play-ic"
              >
                <path d="M8 5.5v13a1 1 0 0 0 1.53.85l10.2-6.5a1 1 0 0 0 0-1.7L9.53 4.65A1 1 0 0 0 8 5.5z" />
              </svg>
              OYNA
            </button>

            <div className="fs-chip">
              <span className="fs-dot" aria-hidden="true" />
              Fruit Storm! v5.1 · 8 Dil · Çevrimiçi Skor
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

/* Kapak ekranı stili — oyunun kendi splash renkleriyle birebir (#5E2F8F mor gradyan,
   pembe OYNA butonu = oyunun --green/b-green gradyanı) */
const COVER_CSS = `
.fs-cover{position:fixed;inset:0;z-index:10;display:flex;align-items:center;justify-content:center;
  background:linear-gradient(180deg,#5E2F8F 0%,#9B5FC9 45%,#D6A0EE 75%,#F3D2F8 100%);
  overflow:hidden;transition:opacity .6s ease,transform .6s ease,visibility .6s}
.fs-cover.fs-hide{opacity:0;transform:scale(1.12);pointer-events:none;visibility:hidden}
.fs-blob{position:absolute;border-radius:50%;pointer-events:none}
.fs-blob-a{width:44vmax;height:44vmax;left:-12vmax;top:-14vmax;
  background:radial-gradient(circle at 35% 35%,rgba(255,255,255,.16),rgba(255,255,255,0) 62%)}
.fs-blob-b{width:30vmax;height:30vmax;right:-9vmax;bottom:-10vmax;
  background:radial-gradient(circle at 60% 60%,rgba(255,255,255,.13),rgba(255,255,255,0) 60%)}
.fs-fruits,.fs-bubbles{position:absolute;inset:0;pointer-events:none}
.fs-fruits i{position:absolute;display:block;filter:drop-shadow(0 6px 10px rgba(94,47,143,.35));
  animation:fsFloat var(--d,3.8s) ease-in-out var(--dl,0s) infinite}
.fs-bubbles i{position:absolute;bottom:-34px;border-radius:50%;
  background:rgba(255,255,255,.28);border:1px solid rgba(255,255,255,.4);
  animation:fsUp var(--d,10s) linear var(--dl,0s) infinite}
.fs-center{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;
  gap:18px;padding:24px;text-align:center}
.fs-logo{margin:0;font-weight:800;font-size:clamp(46px,13vw,88px);line-height:.95;letter-spacing:1px;
  color:#fff;text-shadow:0 6px 24px rgba(74,29,107,.45)}
.fs-logo span{display:inline-block;white-space:nowrap}
.fs-logo b{display:inline-block;font-weight:inherit;animation:fsDrop .62s cubic-bezier(.2,.9,.3,1.35) both;
  animation-delay:calc(var(--i)*55ms)}
.fs-w1{color:#FF5A9E;text-shadow:0 3px 0 #fff,0 6px 0 rgba(122,36,86,.35),0 14px 30px rgba(74,29,107,.35)}
.fs-w2{color:#B56CE8;text-shadow:0 3px 0 #fff,0 6px 0 rgba(122,36,86,.35),0 14px 30px rgba(74,29,107,.35)}
.fs-tag{margin:0;color:rgba(255,255,255,.92);font-size:clamp(14px,2.6vw,17px);font-weight:600;
  letter-spacing:2.5px;text-shadow:0 2px 8px rgba(74,29,107,.4);animation:fsFadeUp .7s ease .5s both}
.fs-play{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:12px;
  margin-top:10px;padding:18px 58px;min-height:56px;border-radius:999px;border:1.5px solid rgba(255,255,255,.45);
  cursor:pointer;overflow:hidden;color:#fff;font-size:clamp(22px,4.5vw,28px);font-weight:800;letter-spacing:5px;
  font-family:inherit;text-shadow:0 2px 0 rgba(122,36,86,.5);
  background:linear-gradient(172deg,rgba(255,255,255,.32) 0%,rgba(255,255,255,.05) 40%,rgba(0,0,0,.08) 100%),
    linear-gradient(170deg,#FF8FC9 0%,#F26BB5 55%,#E05AA4 100%);
  box-shadow:0 6px 0 #C24488,0 18px 40px rgba(74,29,107,.5);
  transition:transform .15s ease,box-shadow .15s ease;
  animation:fsFadeUp .7s ease .75s both,fsPulse 1.6s ease-in-out 1.6s infinite}
.fs-play:hover{transform:scale(1.05)}
.fs-play:active{transform:translateY(4px) scale(.98);box-shadow:0 2px 0 #C24488,0 8px 20px rgba(74,29,107,.45)}
.fs-play:focus-visible{outline:3px solid #fff;outline-offset:4px}
.fs-play::after{content:'';position:absolute;top:-45%;bottom:-45%;left:-70%;width:32%;
  background:linear-gradient(105deg,rgba(255,255,255,0),rgba(255,255,255,.65),rgba(255,255,255,0));
  transform:skewX(-22deg);animation:fsShine 2.6s ease 2s infinite}
.fs-play-ic{width:.95em;height:.95em;filter:drop-shadow(0 2px 0 rgba(122,36,86,.5))}
.fs-chip{display:inline-flex;align-items:center;gap:8px;margin-top:6px;padding:7px 16px;border-radius:999px;
  color:rgba(255,255,255,.9);font-size:12.5px;font-weight:600;letter-spacing:1.2px;
  background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.3);
  backdrop-filter:blur(4px);animation:fsFadeUp .7s ease 1s both}
.fs-dot{width:8px;height:8px;border-radius:50%;background:#7DFFA3;
  box-shadow:0 0 8px #7DFFA3;animation:fsBlink 1.8s ease-in-out infinite}
@keyframes fsFloat{0%,100%{transform:translateY(0) rotate(-8deg)}50%{transform:translateY(-26px) rotate(8deg)}}
@keyframes fsUp{0%{transform:translateY(0);opacity:0}12%{opacity:.7}100%{transform:translateY(-110vh);opacity:0}}
@keyframes fsDrop{from{transform:translateY(-110%) scale(.4);opacity:0}to{transform:translateY(0) scale(1);opacity:1}}
@keyframes fsFadeUp{from{transform:translateY(18px);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes fsPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.045)}}
@keyframes fsShine{0%{left:-70%}55%,100%{left:130%}}
@keyframes fsBlink{0%,100%{opacity:1}50%{opacity:.35}}
@media (max-width:480px){.fs-center{gap:14px}.fs-play{padding:16px 46px;letter-spacing:4px}}
@media (prefers-reduced-motion:reduce){
  .fs-cover,.fs-play{transition:none}
  .fs-fruits i,.fs-bubbles i,.fs-logo b,.fs-tag,.fs-play,.fs-chip,.fs-dot,.fs-play::after{animation:none!important}
}
`
