'use client'
import React, { Suspense, useRef } from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { GoArrowUpRight } from 'react-icons/go'
import { Canvas, useFrame } from '@react-three/fiber'
import { 
  FiBell, 
  FiLock, 
  FiUsers, 
  FiZap, 
  FiCheckSquare 
} from 'react-icons/fi'

// ─── ДЕКОРАТИВНЫЙ ИНТЕРАКТИВНЫЙ ФОН ДЛЯ БАННЕРА (ВРАЩЕНИЕ) ───
function AnimatedGrid() {
  const pointsRef = useRef(null)
  const groupRef = useRef(null)

  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    const positions = pointsRef.current.geometry.attributes.position.array 
    const time = clock.getElapsedTime()

    let index = 0
    for (let i = 0; i < 35; i++) {
      for (let j = 0; j < 35; j++) {
        const x = (i - 17.5) * 0.5
        const y = (j - 17.5) * 0.5
        // Более сложная волна
        const z = Math.sin(x * 0.5 + time * 0.8) * Math.cos(y * 0.5 + time * 0.5) * 0.8
        positions[index + 2] = z
        index += 3
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  const count = 35
  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * count * 3)
    let index = 0
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        pos[index++] = (i - count / 2) * 0.55
        pos[index++] = (j - count / 2) * 0.55
        pos[index++] = 0
      }
    }
    return pos
  }, [])

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial 
          color="#416fb8" 
          size={0.09} 
          sizeAttenuation={true} 
          transparent 
          opacity={0.7} 
        />
      </points>
    </group>
  )
}

/* ─── Декоративные иконки баннера ─── */
const bannerIcons = [
  { top: '6%', left: '46%', d: 'doc' },
  { top: '8%', left: '92%', d: 'doc2' },
  { top: '20%', left: '64%', d: 'gear' },
  { top: '34%', left: '85%', d: 'monitor' },
  { top: '46%', left: '50%', d: 'camera' },
  { top: '60%', left: '74%', d: 'speaker' },
  { top: '78%', left: '58%', d: 'valve' },
]

function BannerIcon({ kind }) {
  const stroke = 'rgba(255,255,255,0.35)'
  switch (kind) {
    case 'gear':
      return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="7" stroke={stroke} strokeWidth="1.5" />
          <circle cx="20" cy="20" r="13" stroke={stroke} strokeWidth="1.5" strokeDasharray="3 4" />
        </svg>
      )
    case 'monitor':
      return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect x="6" y="9" width="28" height="18" rx="2" stroke={stroke} strokeWidth="1.5" />
          <line x1="14" y1="32" x2="26" y2="32" stroke={stroke} strokeWidth="1.5" />
          <line x1="20" y1="27" x2="20" y2="32" stroke={stroke} strokeWidth="1.5" />
        </svg>
      )
    case 'camera':
      return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect x="6" y="14" width="22" height="14" rx="2" stroke={stroke} strokeWidth="1.5" />
          <path d="M28 18l8-4v14l-8-4" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      )
    case 'speaker':
      return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M10 15h6l9-6v22l-9-6h-6z" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M29 16a6 6 0 010 8" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    case 'valve':
      return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="6" stroke={stroke} strokeWidth="1.5" />
          <line x1="20" y1="6" x2="20" y2="14" stroke={stroke} strokeWidth="1.5" />
          <line x1="20" y1="26" x2="20" y2="34" stroke={stroke} strokeWidth="1.5" />
          <line x1="6" y1="20" x2="14" y2="20" stroke={stroke} strokeWidth="1.5" />
          <line x1="26" y1="20" x2="34" y2="20" stroke={stroke} strokeWidth="1.5" />
        </svg>
      )
    case 'doc2':
      return (
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
          <rect x="7" y="4" width="20" height="26" rx="2" stroke={stroke} strokeWidth="1.5" />
          <line x1="11" y1="11" x2="23" y2="11" stroke={stroke} strokeWidth="1.5" />
          <line x1="11" y1="16" x2="23" y2="16" stroke={stroke} strokeWidth="1.5" />
        </svg>
      )
    default:
      return (
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
          <rect x="9" y="5" width="16" height="22" rx="2" stroke={stroke} strokeWidth="1.5" />
          <line x1="13" y1="11" x2="21" y2="11" stroke={stroke} strokeWidth="1.5" />
          <line x1="13" y1="16" x2="21" y2="16" stroke={stroke} strokeWidth="1.5" />
        </svg>
      )
  }
}

export default function BesprovodnayaSvyazPage() {
  const { t } = useTranslation()

  // Получаем переведенные данные
  const advantages = t('wirelessCommunication.advantages', { returnObjects: true })
  const standards = t('wirelessCommunication.standards', { returnObjects: true })

  return (
    <div className="text-[#1f2937] font-sans min-h-screen antialiased select-none">
      
      {/* ─── ПЕРВЫЙ ЭКРАН: СИНИЙ КОРПОРАТИВНЫЙ БАННЕР ─── */}
      <header 
        className="w-full relative overflow-hidden h-[360px] md:h-[400px]"
        style={{ background: 'linear-gradient(135deg, #051636 0%, #0e2e5b 60%, #173B73 100%)' }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(23,59,115,0.3),transparent_50%)]" />
        
        {/* Декоративные иконки */}
        {bannerIcons.map((ic, i) => (
          <div key={i} className="absolute hidden md:block" style={{ top: ic.top, left: ic.left }}>
            <BannerIcon kind={ic.d} />
          </div>
        ))}

        <div className="max-w-[1280px] mx-auto px-4 xl:px-0 h-full grid grid-cols-1 md:grid-cols-12 items-center relative z-10">
          <div className="col-span-1 md:col-span-8 flex flex-col justify-center">
            
            {/* ─── ХЛЕБНЫЕ КРОШКИ ─── */}
            <div className="text-[14px] font-medium text-white/60 mb-3 flex items-center gap-1.5 flex-wrap">
              <Link href="/solution" className="hover:text-white transition-colors duration-200">
                {t('wirelessCommunication.breadcrumb.solutions')}
              </Link>
              <span className="text-white/30">&gt;</span>
              <Link href="/solution/promyshlennaya-svyaz" className="hover:text-white transition-colors duration-200">
                {t('wirelessCommunication.breadcrumb.industrialCommunication')}
              </Link>
              <span className="text-white/30">&gt;</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-wide leading-tight max-w-4xl">
              {t('wirelessCommunication.title')}
            </h1>
            <p className="text-white/70 text-[14px] md:text-[15px] mt-3 font-light max-w-2xl leading-relaxed">
              {t('wirelessCommunication.subtitle')}
            </p>
          </div>

          <div className="hidden md:block md:col-span-4 h-full relative">
            <div className="absolute inset-0 top-[-10px]">
              <Suspense fallback={null}>
                <Canvas camera={{ position: [0, -5, 4.5], fov: 45 }}>
                  <ambientLight intensity={0.6} />
                  <AnimatedGrid />
                </Canvas>
              </Suspense>
            </div>
          </div>
        </div>
      </header>

      {/* ─── ВВЕДЕНИЕ / ГЛАВНЫЙ ПОДЗАГОЛОВОК ─── */}
      <section className="max-w-[1280px] mx-auto mt-16 px-4 xl:px-0">
        <h2 className="text-2xl md:text-4xl font-normal text-slate-800 tracking-tight leading-snug max-w-5xl">
          {t('wirelessCommunication.mainTitle')}
        </h2>
      </section>

      {/* ─── СЕКЦИЯ ПРЕИМУЩЕСТВ ─── */}
      <section className="max-w-[1280px] mx-auto mt-16 px-4 xl:px-0">
        <div className="flex flex-col w-full border-t border-slate-200">
          
          {advantages.map((item, i) => (
            <div key={i} className="border-b border-slate-200 py-6 grid grid-cols-1 md:grid-cols-12 items-center gap-4">
              <div className="md:col-span-1 flex items-center justify-start text-[#173B73]">
                {item.icon === 'Bell' && <FiBell className="w-5 h-5" />}
                {item.icon === 'Lock' && <FiLock className="w-5 h-5" />}
                {item.icon === 'Users' && <FiUsers className="w-5 h-5" />}
                {item.icon === 'Zap' && <FiZap className="w-5 h-5" />}
                {item.icon === 'Voice' && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14" />
                  </svg>
                )}
              </div>
              <div className="md:col-span-11">
                <h3 className="text-[15px] font-medium text-slate-800 leading-tight">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* ─── СЕКЦИЯ: ПРОВЕРЕННЫЕ СТАНДАРТЫ ─── */}
      <section className="max-w-[1280px] mx-auto mt-24 px-4 xl:px-0">
        <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-8">
          {t('wirelessCommunication.standardsTitle')}
        </h3>
        
        <div className="flex flex-col gap-6 max-w-4xl">
          
          {standards.map((item, i) => (
            <div key={i} className="border-b border-slate-100 pb-6 flex items-start gap-3">
              <FiCheckSquare className="w-4 h-4 text-[#173B73] mt-1 shrink-0" />
              <div>
                <h4 className="text-[14px] font-bold text-slate-800">
                  {item.title}:
                </h4>
                <p className="text-[14px] text-slate-400 font-light mt-1">
                  {item.text}
                </p>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* ─── ТЕКСТОВАЯ ПЛАШКА "ЕДИНАЯ ЭКОСИСТЕМА" ─── */}
      <section className="max-w-[1280px] mx-auto mt-28 px-4 xl:px-0 mb-24">
        <div className="border-t border-[#173B73] pt-6 flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="max-w-2xl">
            <h3 className="text-xl md:text-2xl font-bold text-slate-800 leading-tight">
              {t('wirelessCommunication.footer.title')}
            </h3>
            <p className="text-[14px] text-slate-500 font-light mt-2">
              {t('wirelessCommunication.footer.subtitle')}
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
            <p className="text-[14px] text-slate-400 font-light max-w-[240px] md:text-right mt-1">
              {t('wirelessCommunication.footer.calc')}
            </p>
          </div>
        </div>
      </section>

    </div>
  )
}