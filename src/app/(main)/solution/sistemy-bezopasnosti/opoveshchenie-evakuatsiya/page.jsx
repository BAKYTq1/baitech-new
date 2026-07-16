'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { Suspense, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import logo from '../../../../../../assets/svg/logo.svg'
import img from '../../../../../../assets/png/5310213237846513458.jpg'
import img2 from '../../../../../../assets/png/5310213237846513459.jpg'
import { Canvas, useFrame } from '@react-three/fiber'

// ─── ДЕКОРАТИВНЫЙ 3D КОМПОНЕНТ ДЛЯ БАННЕРА ───
function AnimatedGrid() {
  const pointsRef = useRef(null)
  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    const positions = pointsRef.current.geometry.attributes.position.array
    const time = clock.getElapsedTime()
    let index = 0
    for (let i = 0; i < 35; i++) {
      for (let j = 0; j < 35; j++) {
        const x = (i - 17.5) * 0.5
        const y = (j - 17.5) * 0.5
        positions[index + 2] = Math.sin(x * 0.4 + time * 0.6) * Math.cos(y * 0.4 + time * 0.6) * 0.6
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
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#173B73" size={0.07} sizeAttenuation transparent opacity={0.8} />
    </points>
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

// ─── ИКОНКИ ───
const CheckIcon = () => (
  <span className="text-[#173B73] font-bold text-base mt-[-2px] flex-shrink-0">☑</span>
)

const TriangleIcon = () => (
  <span className="text-[#173B73] text-[9px] mr-1 flex-shrink-0">▲</span>
)

// Схема компонентов АПС (SVG)
const ApsScheme = () => (
  <div className="border border-slate-200 rounded-sm p-5 bg-slate-50/40 w-full">
    <svg viewBox="0 0 420 260" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="100" width="70" height="40" rx="4" fill="#EFF3FB" stroke="#173B73" strokeWidth="1.2"/>
      <text x="45" y="125" textAnchor="middle" fontSize="9" fill="#173B73" fontWeight="600">Датчики</text>
      <rect x="10" y="160" width="70" height="40" rx="4" fill="#EFF3FB" stroke="#173B73" strokeWidth="1.2"/>
      <text x="45" y="178" textAnchor="middle" fontSize="8" fill="#173B73" fontWeight="600">Ручные</text>
      <text x="45" y="190" textAnchor="middle" fontSize="8" fill="#173B73" fontWeight="600">извещатели</text>
      <rect x="115" y="80" width="80" height="50" rx="4" fill="#EFF3FB" stroke="#173B73" strokeWidth="1.2"/>
      <text x="155" y="101" textAnchor="middle" fontSize="8" fill="#173B73" fontWeight="600">Приёмно-</text>
      <text x="155" y="113" textAnchor="middle" fontSize="8" fill="#173B73" fontWeight="600">контрольная</text>
      <text x="155" y="125" textAnchor="middle" fontSize="8" fill="#173B73" fontWeight="600">аппаратура</text>
      <rect x="115" y="155" width="80" height="40" rx="4" fill="#EFF3FB" stroke="#173B73" strokeWidth="1.2"/>
      <text x="155" y="179" textAnchor="middle" fontSize="9" fill="#173B73" fontWeight="600">ИБП</text>
      <rect x="235" y="60" width="80" height="40" rx="4" fill="#EFF3FB" stroke="#173B73" strokeWidth="1.2"/>
      <text x="275" y="78" textAnchor="middle" fontSize="8" fill="#173B73" fontWeight="600">Диспетчерский</text>
      <text x="275" y="90" textAnchor="middle" fontSize="8" fill="#173B73" fontWeight="600">пункт</text>
      <rect x="235" y="115" width="80" height="40" rx="4" fill="#EFF3FB" stroke="#173B73" strokeWidth="1.2"/>
      <text x="275" y="139" textAnchor="middle" fontSize="9" fill="#173B73" fontWeight="600">СОУЭ</text>
      <rect x="235" y="170" width="80" height="40" rx="4" fill="#EFF3FB" stroke="#173B73" strokeWidth="1.2"/>
      <text x="275" y="194" textAnchor="middle" fontSize="9" fill="#173B73" fontWeight="600">АУПТ</text>
      <rect x="355" y="115" width="58" height="50" rx="4" fill="#EFF3FB" stroke="#173B73" strokeWidth="1.2"/>
      <text x="384" y="136" textAnchor="middle" fontSize="7.5" fill="#173B73" fontWeight="600">Инженерное</text>
      <text x="384" y="148" textAnchor="middle" fontSize="7.5" fill="#173B73" fontWeight="600">оборудо-</text>
      <text x="384" y="160" textAnchor="middle" fontSize="7.5" fill="#173B73" fontWeight="600">вание</text>
      <line x1="80" y1="120" x2="115" y2="110" stroke="#173B73" strokeWidth="1" markerEnd="url(#arrow)"/>
      <line x1="80" y1="175" x2="115" y2="130" stroke="#173B73" strokeWidth="1" markerEnd="url(#arrow)"/>
      <line x1="155" y1="155" x2="155" y2="130" stroke="#173B73" strokeWidth="1" markerEnd="url(#arrow)"/>
      <line x1="195" y1="95" x2="235" y2="82" stroke="#173B73" strokeWidth="1" markerEnd="url(#arrow)"/>
      <line x1="195" y1="110" x2="235" y2="130" stroke="#173B73" strokeWidth="1" markerEnd="url(#arrow)"/>
      <line x1="195" y1="120" x2="235" y2="175" stroke="#173B73" strokeWidth="1" markerEnd="url(#arrow)"/>
      <line x1="315" y1="135" x2="355" y2="140" stroke="#173B73" strokeWidth="1" markerEnd="url(#arrow)"/>
      <defs>
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="#173B73" />
        </marker>
      </defs>
    </svg>
  </div>
)

// Схема компонентов АУПТ (SVG)
const AuptScheme = () => (
  <div className="border border-slate-200 rounded-sm p-5 bg-slate-50/40 w-full">
    <svg viewBox="0 0 420 260" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="100" width="60" height="36" rx="4" fill="#EFF3FB" stroke="#173B73" strokeWidth="1.2"/>
      <text x="40" y="121" textAnchor="middle" fontSize="9" fill="#173B73" fontWeight="600">АПС</text>
      <rect x="10" y="155" width="60" height="36" rx="4" fill="#EFF3FB" stroke="#173B73" strokeWidth="1.2"/>
      <text x="40" y="176" textAnchor="middle" fontSize="9" fill="#173B73" fontWeight="600">Датчики</text>
      <rect x="10" y="210" width="60" height="36" rx="4" fill="#EFF3FB" stroke="#173B73" strokeWidth="1.2"/>
      <text x="40" y="224" textAnchor="middle" fontSize="8" fill="#173B73" fontWeight="600">Средства</text>
      <text x="40" y="236" textAnchor="middle" fontSize="8" fill="#173B73" fontWeight="600">оповещения</text>
      <rect x="110" y="80" width="75" height="45" rx="4" fill="#EFF3FB" stroke="#173B73" strokeWidth="1.2"/>
      <text x="147" y="99" textAnchor="middle" fontSize="8" fill="#173B73" fontWeight="600">Приёмно-</text>
      <text x="147" y="111" textAnchor="middle" fontSize="8" fill="#173B73" fontWeight="600">контрольный</text>
      <text x="147" y="123" textAnchor="middle" fontSize="8" fill="#173B73" fontWeight="600">прибор</text>
      <rect x="225" y="60" width="60" height="36" rx="4" fill="#EFF3FB" stroke="#173B73" strokeWidth="1.2"/>
      <text x="255" y="81" textAnchor="middle" fontSize="9" fill="#173B73" fontWeight="600">ОТВ</text>
      <rect x="340" y="60" width="65" height="36" rx="4" fill="#EFF3FB" stroke="#173B73" strokeWidth="1.2"/>
      <text x="372" y="81" textAnchor="middle" fontSize="9" fill="#173B73" fontWeight="600">Оросители</text>
      <rect x="225" y="130" width="70" height="45" rx="4" fill="#EFF3FB" stroke="#173B73" strokeWidth="1.2"/>
      <text x="260" y="149" textAnchor="middle" fontSize="8" fill="#173B73" fontWeight="600">Насосное</text>
      <text x="260" y="161" textAnchor="middle" fontSize="8" fill="#173B73" fontWeight="600">оборудо-</text>
      <text x="260" y="173" textAnchor="middle" fontSize="8" fill="#173B73" fontWeight="600">вание</text>
      <rect x="330" y="130" width="75" height="45" rx="4" fill="#EFF3FB" stroke="#173B73" strokeWidth="1.2"/>
      <text x="367" y="148" textAnchor="middle" fontSize="7.5" fill="#173B73" fontWeight="600">Трубопроводы</text>
      <text x="367" y="160" textAnchor="middle" fontSize="7.5" fill="#173B73" fontWeight="600">запорная</text>
      <text x="367" y="172" textAnchor="middle" fontSize="7.5" fill="#173B73" fontWeight="600">арматура</text>
      <line x1="70" y1="118" x2="110" y2="105" stroke="#173B73" strokeWidth="1" markerEnd="url(#arrow2)"/>
      <line x1="70" y1="170" x2="110" y2="115" stroke="#173B73" strokeWidth="1" markerEnd="url(#arrow2)"/>
      <line x1="70" y1="222" x2="110" y2="120" stroke="#173B73" strokeWidth="1" markerEnd="url(#arrow2)"/>
      <line x1="185" y1="95" x2="225" y2="80" stroke="#173B73" strokeWidth="1" markerEnd="url(#arrow2)"/>
      <line x1="185" y1="110" x2="225" y2="150" stroke="#173B73" strokeWidth="1" markerEnd="url(#arrow2)"/>
      <line x1="285" y1="78" x2="340" y2="78" stroke="#173B73" strokeWidth="1" markerEnd="url(#arrow2)"/>
      <line x1="295" y1="152" x2="330" y2="152" stroke="#173B73" strokeWidth="1" markerEnd="url(#arrow2)"/>
      <defs>
        <marker id="arrow2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="#173B73" />
        </marker>
      </defs>
    </svg>
  </div>
)

export default function FireSafetyPage() {
  const { t } = useTranslation()

  // Получаем переведенные данные
  const fireSafetyItems = t('fireSafety.fireSafetyItems', { returnObjects: true })
  const apsComponents = t('fireSafety.apsComponents', { returnObjects: true })
  const auptItems = t('fireSafety.auptItems', { returnObjects: true })
  const auptComponents = t('fireSafety.auptComponents', { returnObjects: true })

  return (
    <div className="text-[#1f2937] font-sans min-h-screen antialiased select-none">

      {/* ─── БАННЕР ─── */}
      <header
        className="w-full relative overflow-hidden mb-[15px] md:mb-5 h-[340px] md:h-[380px]"
        style={{ background: 'linear-gradient(135deg, rgb(2, 13, 48) 0%, #0e2e5b 58%, #000000 100%)' }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(23,43,153,0.25),transparent_50%)]" />
        
        {/* Декоративные иконки */}
        {bannerIcons.map((ic, i) => (
          <div key={i} className="absolute hidden md:block" style={{ top: ic.top, left: ic.left }}>
            <BannerIcon kind={ic.d} />
          </div>
        ))}

        <div className="max-w-[1280px] mx-auto px-4 xl:px-0 h-full grid grid-cols-1 md:grid-cols-12 items-center relative z-10">
          <div className="col-span-1 md:col-span-7 flex flex-col justify-center h-full pt-4 md:pt-0">
            
            {/* ─── ХЛЕБНЫЕ КРОШКИ ─── */}
            <div className="text-[14px] font-medium text-white/60 mb-3 flex items-center gap-1.5 flex-wrap">
              <Link href="/solution" className="hover:text-white transition-colors duration-200">
                {t('fireSafety.breadcrumb.solutions')}
              </Link>
              <span className="text-white/30">&gt;</span>
              <Link href="/solution/sistemy-bezopasnosti" className="hover:text-white transition-colors duration-200">
                {t('fireSafety.breadcrumb.securitySystems')}
              </Link>
              <span className="text-white/30">&gt;</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide leading-tight max-w-xl">
              {t('fireSafety.title')}
            </h1>
            <p className="text-white/50 text-[14px] md:text-[14px] mt-3 max-w-lg leading-relaxed">
              {t('fireSafety.subtitle')}
            </p>
            
            <div className="mt-4 flex flex-col gap-1.5">
              <Link href="/solution/sistemy-bezopasnosti/skud" className="text-white text-[14px] font-medium hover:underline">
                &gt; {t('fireSafety.links.skud')}
              </Link>
              <Link href="/solution/sistemy-bezopasnosti/videonablyudenie" className="text-white text-[14px] font-medium hover:underline">
                &gt; {t('fireSafety.links.videoSurveillance')}
              </Link>
              <Link href="/solution/sistemy-bezopasnosti/okhrannaya-signalizatsiya" className="text-white text-[14px] font-medium hover:underline">
                &gt; {t('fireSafety.links.securityAlarm')}
              </Link>
            </div>
          </div>
          
          {/* 3D Анимация */}
          <div className="hidden md:block md:col-span-5 h-full relative">
            <div className="absolute inset-0 top-[-20px]">
              <Suspense fallback={null}>
                <Canvas camera={{ position: [0, -5, 4.5], fov: 45 }}>
                  <ambientLight intensity={0.5} />
                  <AnimatedGrid />
                </Canvas>
              </Suspense>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1280px] mx-auto px-4 xl:px-0">

        {/* ─── ARMTEL БЛОК ─── */}
        <section className="mt-[30px] md:mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 flex items-center justify-start">
              <Image 
                src={logo} 
                alt="Armtel Logo" 
                width={200} 
                height={200}
                className="object-contain"
              />
            </div>
            <div className="lg:col-span-8">
              <p className="text-[14px] text-slate-600 leading-relaxed">
                {t('fireSafety.armtelDescription')}
              </p>
            </div>
          </div>
        </section>

        {/* ─── РАЗДЕЛ 1: ПОЖАРНАЯ СИГНАЛИЗАЦИЯ ─── */}
        <section className="mt-[40px] md:mt-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 mb-8">
            <div className="flex-1 border-b-2 border-[#173B73] pb-1">
              <h3 className="text-xl font-bold text-[#173B73]">{t('fireSafety.fireAlarmTitle')}</h3>
            </div>
            <div className="text-[14px] text-gray-500 md:w-1/3 md:pl-6 pb-1 leading-tight">
              {t('fireSafety.fireAlarmSubtitle')}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
              {fireSafetyItems.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-[14px]">
                  <CheckIcon />
                  <p className="text-slate-600 leading-relaxed">
                    <strong className="text-[#173B73] font-bold">{item.label}</strong> {item.text}
                  </p>
                </div>
              ))}
            </div>
            <div className="lg:col-span-5">
              <Image src={img} alt='img' />
            </div>
          </div>
        </section>

        {/* ─── КОМПОНЕНТЫ СИСТЕМЫ АПС ─── */}
        <section className="mt-[40px] md:mt-12">
          <h4 className="text-lg font-bold text-[#173B73] mb-6">{t('fireSafety.apsComponentsTitle')}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 text-[14px] text-slate-600">
            {apsComponents.map((block, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <TriangleIcon />
                <div>
                  <p className="font-semibold text-slate-700 mb-1">{block.label}</p>
                  <ul className="space-y-0.5 text-[14px] text-slate-500">
                    {block.items.map((t, j) => (
                      <li key={j}>— {t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── РАЗДЕЛ 2: АУПТ ─── */}
        <section className="mt-[60px] md:mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 mb-8">
            <div className="flex-1 border-b-2 border-[#173B73] pb-1">
              <h3 className="text-xl font-bold text-[#173B73]">{t('fireSafety.auptTitle')}</h3>
            </div>
            <div className="text-[14px] text-gray-500 md:w-1/3 md:pl-6 pb-1 leading-tight">
              {t('fireSafety.auptSubtitle')}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
              {auptItems.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-[14px]">
                  <CheckIcon />
                  <p className="text-slate-600 leading-relaxed">
                    <strong className="text-[#173B73] font-bold">{item.label}</strong> {item.text}
                  </p>
                </div>
              ))}
            </div>
            <div className="lg:col-span-5">
              <Image src={img2} alt='img2' />
            </div>
          </div>
        </section>

        {/* ─── КОМПОНЕНТЫ СИСТЕМЫ АУПТ ─── */}
        <section className="mt-[40px] md:mt-12">
          <h4 className="text-lg font-bold text-[#173B73] mb-6">{t('fireSafety.auptComponentsTitle')}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 text-[14px] text-slate-600">
            {auptComponents.map((block, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <TriangleIcon />
                <div>
                  <p className="font-semibold text-slate-700 mb-1">{block.label}</p>
                  <ul className="space-y-0.5 text-[14px] text-slate-500">
                    {block.items.map((t, j) => (
                      <li key={j}>— {t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── ФУТЕР ─── */}
        <section className="mb-[100px] mt-24">
          <div className="border-t border-[#173B73] pt-6 flex flex-col md:flex-row justify-between items-start gap-4">
            <h3 className="text-xl md:text-2xl font-bold text-slate-800 leading-tight">
              {t('fireSafety.footer.title')}
            </h3>
            <p className="text-[14px] text-slate-400 max-w-xs md:text-right font-light leading-relaxed">
              {t('fireSafety.footer.subtitle')}
            </p>
          </div>
        </section>

      </div>
    </div>
  )
}