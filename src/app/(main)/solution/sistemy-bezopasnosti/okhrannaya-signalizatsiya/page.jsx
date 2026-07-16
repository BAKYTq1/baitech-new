'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { Suspense, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import logo from '../../../../../../assets/svg/logo.svg'
import img from '../../../../../../assets/png/5310213237846513463.jpg'
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

// Схема компонентов охранной сигнализации
const SecurityScheme = () => (
  <div className="border border-slate-200 rounded-sm p-5 bg-slate-50/40 w-full">
    <svg viewBox="0 0 420 240" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="90" width="75" height="36" rx="4" fill="#EFF3FB" stroke="#173B73" strokeWidth="1.2"/>
      <text x="47" y="112" textAnchor="middle" fontSize="9" fill="#173B73" fontWeight="600">Датчики</text>
      <rect x="10" y="160" width="75" height="36" rx="4" fill="#EFF3FB" stroke="#173B73" strokeWidth="1.2"/>
      <text x="47" y="182" textAnchor="middle" fontSize="9" fill="#173B73" fontWeight="600">ППИ</text>
      <rect x="155" y="90" width="75" height="36" rx="4" fill="#EFF3FB" stroke="#173B73" strokeWidth="1.2"/>
      <text x="192" y="112" textAnchor="middle" fontSize="9" fill="#173B73" fontWeight="600">ПКП</text>
      <rect x="300" y="60" width="100" height="46" rx="4" fill="#EFF3FB" stroke="#173B73" strokeWidth="1.2"/>
      <text x="350" y="79" textAnchor="middle" fontSize="8" fill="#173B73" fontWeight="600">Средства</text>
      <text x="350" y="91" textAnchor="middle" fontSize="8" fill="#173B73" fontWeight="600">оповещения</text>
      <rect x="290" y="140" width="120" height="46" rx="4" fill="#EFF3FB" stroke="#173B73" strokeWidth="1.2"/>
      <text x="350" y="158" textAnchor="middle" fontSize="7.5" fill="#173B73" fontWeight="600">Устройства</text>
      <text x="350" y="170" textAnchor="middle" fontSize="7.5" fill="#173B73" fontWeight="600">постановки</text>
      <text x="350" y="182" textAnchor="middle" fontSize="7.5" fill="#173B73" fontWeight="600">на охрану</text>
      <line x1="85" y1="108" x2="155" y2="108" stroke="#173B73" strokeWidth="1" markerEnd="url(#arrowS)"/>
      <line x1="85" y1="178" x2="155" y2="115" stroke="#173B73" strokeWidth="1" markerEnd="url(#arrowS)"/>
      <line x1="230" y1="100" x2="300" y2="83" stroke="#173B73" strokeWidth="1" markerEnd="url(#arrowS)"/>
      <line x1="230" y1="115" x2="290" y2="158" stroke="#173B73" strokeWidth="1" markerEnd="url(#arrowS)"/>
      <defs>
        <marker id="arrowS" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="#173B73" />
        </marker>
      </defs>
    </svg>
  </div>
)

export default function SecurityAlarmPage() {
  const { t } = useTranslation()

  // Получаем переведенные данные
  const securityItems = t('securityAlarm.securityItems', { returnObjects: true })
  const components = t('securityAlarm.components', { returnObjects: true })

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
                {t('securityAlarm.breadcrumb.solutions')}
              </Link>
              <span className="text-white/30">&gt;</span>
              <Link href="/solution/sistemy-bezopasnosti" className="hover:text-white transition-colors duration-200">
                {t('securityAlarm.breadcrumb.securitySystems')}
              </Link>
              <span className="text-white/30">&gt;</span>
            </div>

            <h1 className="text-2xl md:text-4xl font-bold text-white tracking-wide leading-tight max-w-xl">
              {t('securityAlarm.title')}
            </h1>
            <p className="text-white/50 text-[14px] md:text-[14px] mt-3 max-w-lg leading-relaxed">
              {t('securityAlarm.subtitle')}
            </p>
            
            <div className="mt-4 flex flex-col gap-1.5">
              <Link href="/solution/sistemy-bezopasnosti/skud" className="text-white text-[14px] font-medium hover:underline">
                &gt; {t('securityAlarm.links.skud')}
              </Link>
              <Link href="/solution/sistemy-bezopasnosti/videonablyudenie" className="text-white text-[14px] font-medium hover:underline">
                &gt; {t('securityAlarm.links.videoSurveillance')}
              </Link>
              <Link href="/solution/sistemy-bezopasnosti/opoveshchenie-evakuatsiya" className="text-white text-[14px] font-medium hover:underline">
                &gt; {t('securityAlarm.links.notification')}
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
                {t('securityAlarm.armtelDescription')}
              </p>
            </div>
          </div>
        </section>

        {/* ─── ЗАГОЛОВОК ─── */}
        <section className="mt-[30px] md:mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <h2 className="text-xl md:text-2xl font-bold text-[#173B73] leading-snug">
                {t('securityAlarm.regimeTitle')}
              </h2>
            </div>
            <div className="lg:col-span-5">
              <div className="border-t-2 border-[#173B73] pt-3">
                <p className="text-[14px] text-gray-500 leading-relaxed">
                  {t('securityAlarm.regimeSubtitle')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 4 ПУНКТА ─── */}
        <section className="mt-[25px] md:mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
            {securityItems.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 text-[14px]">
                <span className="text-[#173B73] font-bold mt-[2px] flex-shrink-0">☑</span>
                <p className="text-slate-600 leading-relaxed">
                  <strong className="text-[#173B73] font-bold">{item.label}</strong> {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── КОМПОНЕНТЫ СИСТЕМЫ ─── */}
        <section className="mt-[50px] md:mt-16">
          <h3 className="text-lg md:text-xl font-bold text-[#173B73] mb-8">
            {t('securityAlarm.componentsTitle')}
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-5 text-[14px] text-slate-600">
              {components.map((block, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="text-[#173B73] text-[9px] mt-1 flex-shrink-0">▲</span>
                  <div>
                    <p className="font-semibold text-slate-700 mb-1">{block.label}</p>
                    {block.text && <p className="text-[14px] text-slate-500 leading-relaxed mb-1">{block.text}</p>}
                    {block.items && (
                      <ul className="space-y-0.5 text-[14px] text-slate-500">
                        {block.items.map((t, j) => <li key={j}>— {t}</li>)}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-7">
              <Image src={img} alt='img'/>
            </div>
          </div>
        </section>

        {/* ─── ФУТЕР ─── */}
        <section className="mb-[100px] mt-24">
          <div className="border-t border-[#173B73] pt-6 flex flex-col md:flex-row justify-between items-start gap-4">
            <h3 className="text-xl md:text-2xl font-bold text-slate-800 leading-tight">
              {t('securityAlarm.footer.title')}
            </h3>
            <p className="text-[14px] text-slate-400 max-w-xs md:text-right font-light leading-relaxed">
              {t('securityAlarm.footer.subtitle')}
            </p>
          </div>
        </section>

      </div>
    </div>
  )
}