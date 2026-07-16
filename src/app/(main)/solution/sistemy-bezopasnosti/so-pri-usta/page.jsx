'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { Suspense, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import logo from '../../../../../../assets/svg/logo.svg'
import img from '../../../../../../assets/png/5310213237846513464.jpg'
import { Canvas, useFrame } from '@react-three/fiber'

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

const SpeakerIcon = ({ x, y }) => (
  <g>
    <rect x={x - 14} y={y - 14} width="28" height="28" rx="5" fill="#EFF3FB" stroke="#173B73" strokeWidth="1.2"/>
    <path
      d={`M${x-5} ${y-5} L${x-1} ${y-5} L${x+5} ${y-9} L${x+5} ${y+9} L${x-1} ${y+5} L${x-5} ${y+5} Z`}
      fill="#173B73" stroke="none"
    />
    <path d={`M${x+7} ${y-4} Q${x+11} ${y} ${x+7} ${y+4}`} stroke="#173B73" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </g>
)

const SOUstaScheme = () => (
  <div className="border border-slate-200 rounded-sm p-5 bg-slate-50/40 w-full">
    <svg viewBox="0 0 640 320" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="120" width="110" height="80" rx="6" fill="#EFF3FB" stroke="#173B73" strokeWidth="1.5"/>
      <text x="75" y="150" textAnchor="middle" fontSize="11" fill="#173B73" fontWeight="700">СО</text>
      <text x="75" y="165" textAnchor="middle" fontSize="11" fill="#173B73" fontWeight="700">при УСТА</text>
      <text x="75" y="182" textAnchor="middle" fontSize="9" fill="#6b7280">блок упр.</text>
      <line x1="130" y1="160" x2="175" y2="160" stroke="#173B73" strokeWidth="1.5" markerEnd="url(#arr)"/>
      <rect x="175" y="50" width="330" height="260" rx="6" fill="#f8fafc" stroke="#d1d5db" strokeWidth="1.2"/>
      <line x1="175" y1="137" x2="505" y2="137" stroke="#e2e8f0" strokeWidth="1"/>
      <line x1="175" y1="224" x2="505" y2="224" stroke="#e2e8f0" strokeWidth="1"/>
      <text x="205" y="78" fontSize="10" fill="#94a3b8" fontWeight="500">3 этаж</text>
      <text x="205" y="165" fontSize="10" fill="#94a3b8" fontWeight="500">2 этаж</text>
      <text x="205" y="252" fontSize="10" fill="#94a3b8" fontWeight="500">1 этаж</text>
      <SpeakerIcon x={300} y={93} />
      <SpeakerIcon x={355} y={93} />
      <SpeakerIcon x={410} y={93} />
      <SpeakerIcon x={465} y={93} />
      <SpeakerIcon x={300} y={180} />
      <SpeakerIcon x={355} y={180} />
      <SpeakerIcon x={410} y={180} />
      <SpeakerIcon x={465} y={180} />
      <SpeakerIcon x={300} y={267} />
      <SpeakerIcon x={355} y={267} />
      <SpeakerIcon x={410} y={267} />
      <SpeakerIcon x={465} y={267} />
      <line x1="505" y1="160" x2="545" y2="160" stroke="#173B73" strokeWidth="1.5" markerEnd="url(#arr)"/>
      <rect x="545" y="110" width="80" height="100" rx="6" fill="#EFF3FB" stroke="#173B73" strokeWidth="1.5"/>
      <text x="585" y="150" textAnchor="middle" fontSize="11" fill="#173B73" fontWeight="700">СОУЭ</text>
      <text x="585" y="166" textAnchor="middle" fontSize="9" fill="#6b7280">система</text>
      <text x="585" y="180" textAnchor="middle" fontSize="9" fill="#6b7280">управления</text>
      <defs>
        <marker id="arr" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,1 L0,7 L7,4 z" fill="#173B73" />
        </marker>
      </defs>
    </svg>
  </div>
)

export default function SOUstaPage() {
  const { t } = useTranslation()

  // Получаем переведенные данные
  const methodologyItems = t('soUsta.methodologyItems', { returnObjects: true })
  const scenarios = t('soUsta.scenarios', { returnObjects: true })
  const cards = t('soUsta.cards', { returnObjects: true })
  const integratorItems = t('soUsta.integratorItems', { returnObjects: true })
  const requirements = t('soUsta.requirements', { returnObjects: true })

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
                {t('soUsta.breadcrumb.solutions')}
              </Link>
              <span className="text-white/30">&gt;</span>
              <Link href="/solution/sistemy-bezopasnosti" className="hover:text-white transition-colors duration-200">
                {t('soUsta.breadcrumb.securitySystems')}
              </Link>
              <span className="text-white/30">&gt;</span>
            </div>

            <h1 className="text-2xl md:text-2xl font-bold text-white tracking-wide ">
              {t('soUsta.title')}
            </h1>
            <p className="text-white/50 text-[14px] md:text-[14px] mt-3 max-w-lg leading-relaxed">
              {t('soUsta.subtitle')}
            </p>
            
            <div className="mt-4 flex flex-col gap-1.5">
              <Link href="/solution/sistemy-bezopasnosti/opoveshchenie-evakuatsiya" className="text-white text-[14px] font-medium hover:underline">
                &gt; {t('soUsta.links.sou')}
              </Link>
              <Link href="/solution/sistemy-bezopasnosti/skud" className="text-white text-[14px] font-medium hover:underline">
                &gt; {t('soUsta.links.skud')}
              </Link>
              <Link href="/solution/sistemy-bezopasnosti/videonablyudenie" className="text-white text-[14px] font-medium hover:underline">
                &gt; {t('soUsta.links.videoSurveillance')}
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
                {t('soUsta.armtelDescription')}
              </p>
            </div>
          </div>
        </section>

        {/* ─── ИСКЛЮЧАЕМ КОНФЛИКТ ─── */}
        <section className="mt-[30px] md:mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <h2 className="text-xl md:text-2xl font-bold text-[#173B73] leading-snug">
                {t('soUsta.conflictTitle')}
              </h2>
            </div>
            <div className="lg:col-span-5">
              <div className="border-t-2 border-[#173B73] pt-3">
                <p className="text-[14px] text-gray-500 leading-relaxed">
                  {t('soUsta.conflictSubtitle')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── МЕТОДИКА ─── */}
        <section className="mt-[25px] md:mt-8">
          <p className="text-[14px] font-semibold text-slate-700 mb-4">
            {t('soUsta.methodologyTitle')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">
            {methodologyItems.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 text-[14px]">
                <span className="text-[#173B73] font-bold mt-[2px] flex-shrink-0">☑</span>
                <p className="text-slate-600 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── СЦЕНАРИИ ─── */}
        <section className="mt-[50px] md:mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-8">
            <div className="lg:col-span-7">
              <h2 className="text-xl md:text-2xl font-bold text-[#173B73] leading-snug">
                {t('soUsta.scenariosTitle')}
              </h2>
            </div>
            <div className="lg:col-span-5">
              <div className="border-t-2 border-[#173B73] pt-3">
                <p className="text-[14px] text-gray-500 leading-relaxed">
                  {t('soUsta.scenariosSubtitle')}
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {scenarios.map((text, i) => (
              <div key={i} className="border border-slate-200 rounded-sm p-5 flex flex-col items-center gap-4 text-center">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="8" stroke="#173B73" strokeWidth="1.8"/>
                    <path d="M6.5 10l2.5 2.5 4.5-4.5" stroke="#173B73" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-[14px] text-slate-500 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 4 КАРТОЧКИ ─── */}
        <section className="mt-[50px] md:mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cards.map((card, i) => (
              <div key={i} className={`border rounded-sm p-6 ${card.accent ? 'border-[#173B73]' : 'border-slate-200'}`}>
                <h3 className="text-[15px] font-bold mb-3 leading-snug text-[#173B73]">
                  {card.title}
                </h3>
                <p className="text-[14px] text-slate-500 leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── ИНТЕГРАТОР ─── */}
        <section className="mt-[50px] md:mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-8">
            <div className="lg:col-span-8">
              <h2 className="text-xl md:text-2xl font-bold text-[#173B73] leading-snug">
                {t('soUsta.integratorTitle')}
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {integratorItems.map((text, i) => (
              <div key={i} className="border border-slate-200 rounded-sm p-5 flex flex-col items-center gap-4 text-center">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="8" stroke="#173B73" strokeWidth="1.8"/>
                    <path d="M6.5 10l2.5 2.5 4.5-4.5" stroke="#173B73" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-[14px] text-slate-500 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── ЛАБОРАТОРИЯ ─── */}
        <section className="mt-[50px] md:mt-16">
          <div className="flex flex-col md:flex-row border border-slate-200 rounded-sm overflow-hidden">
            <div className="md:w-2/5 min-h-[400px] bg-slate-100 relative">
              <Image
                src="https://arman-engineering.ru/assets/images/sections/solutions/ksb/sopriusta-photo2.png"
                alt={t('soUsta.labImageAlt')}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            </div>
            <div className="flex-1 p-8 flex flex-col justify-center">
              <h3 className="text-[17px] font-bold text-[#173B73] mb-3 leading-snug">
                {t('soUsta.labTitle')}
              </h3>
              <p className="text-[14px] text-slate-500 leading-relaxed">
                {t('soUsta.labText')}
              </p>
            </div>
          </div>
        </section>

        {/* ─── КОМПОНЕНТЫ СИСТЕМЫ ─── */}
        <section className="mt-[50px] md:mt-16">
          <h3 className="text-lg md:text-xl font-bold text-[#173B73] mb-8">
            {t('soUsta.componentsTitle')}
          </h3>
          <div className="relative w-full">
            <Image 
              src={img} 
              alt={t('soUsta.componentsImageAlt')}
              className="w-full h-auto object-contain"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
          </div>
        </section>

        {/* ─── ТРЕБОВАНИЯ ─── */}
        <section className="mt-[50px] md:mt-16">
          <h2 className="text-xl md:text-2xl font-bold text-[#173B73] mb-8 leading-snug">
            {t('soUsta.requirementsTitle')}
          </h2>
          <div className="flex flex-col gap-5">
            {requirements.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 text-[14px]">
                <span className="text-[#173B73] font-bold mt-[2px] flex-shrink-0">☑</span>
                <p className="text-slate-600 leading-relaxed">
                  <strong className="text-[#173B73] font-bold">{item.label}</strong>{item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── ТК 234 ─── */}
        <section className="mt-8">
          <div className="border border-[#173B73] rounded-sm p-6">
            <p className="text-[14px] font-bold text-slate-800 mb-2 leading-snug">
              {t('soUsta.tk234Title')}
            </p>
            <p className="text-[14px] text-slate-500 leading-relaxed mb-1">
              {t('soUsta.tk234Text1')}
            </p>
            <p className="text-[14px] text-slate-500 leading-relaxed">
              {t('soUsta.tk234Text2')}
            </p>
          </div>
        </section>

        {/* ─── ФУТЕР ─── */}
        <section className="mb-[100px] mt-24">
          <div className="border-t border-[#173B73] pt-6 flex flex-col md:flex-row justify-between items-start gap-4">
            <h3 className="text-xl md:text-2xl font-bold text-slate-800 leading-tight">
              {t('soUsta.footer.title')}
            </h3>
            <p className="text-[14px] text-slate-400 max-w-xs md:text-right font-light leading-relaxed">
              {t('soUsta.footer.subtitle')}
            </p>
          </div>
        </section>

      </div>
    </div>
  )
}