'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { Suspense, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import logo from '../../../../../../assets/svg/logo.svg'
import { Canvas, useFrame } from '@react-three/fiber'
import img from '../../../../../../assets/png/5310213237846513460.jpg'
import img2 from '../../../../../../assets/svg/icon_video_1_blue.svg'
import img3 from '../../../../../../assets/svg/icon_video_2_blue.svg'
import img4 from '../../../../../../assets/svg/icon_video_3_blue.svg'

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

// SVG-иконки для карточек преимуществ
const icons = {
  analysis: (
    <svg className="w-10 h-10 text-[#173B73]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="14" rx="2"/>
      <circle cx="9" cy="10" r="2.5"/>
      <path d="M15 8l-3 4" strokeLinecap="round"/>
      <path d="M3 21h18" strokeLinecap="round"/>
    </svg>
  ),
  cameras: (
    <svg className="w-10 h-10 text-[#173B73]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M23 7l-7 5 7 5V7z"/>
      <rect x="1" y="5" width="15" height="14" rx="2"/>
    </svg>
  ),
  modernize: (
    <svg className="w-10 h-10 text-[#173B73]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round"/>
    </svg>
  )
}

// Схема компонентов СВН
const SvnScheme = () => (
  <div className="border border-slate-200 rounded-sm p-5 bg-slate-50/40 w-full">
    <svg viewBox="0 0 460 280" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="100" width="80" height="36" rx="4" fill="#EFF3FB" stroke="#173B73" strokeWidth="1.2"/>
      <text x="50" y="122" textAnchor="middle" fontSize="9" fill="#173B73" fontWeight="600">Видеокамера</text>
      <rect x="10" y="180" width="80" height="52" rx="4" fill="#EFF3FB" stroke="#173B73" strokeWidth="1.2"/>
      <text x="50" y="198" textAnchor="middle" fontSize="7.5" fill="#173B73" fontWeight="600">Поддержка</text>
      <text x="50" y="209" textAnchor="middle" fontSize="7.5" fill="#173B73" fontWeight="600">неограниченного</text>
      <text x="50" y="220" textAnchor="middle" fontSize="7.5" fill="#173B73" fontWeight="600">числа камер</text>
      <rect x="150" y="190" width="80" height="36" rx="4" fill="#EFF3FB" stroke="#173B73" strokeWidth="1.2"/>
      <text x="190" y="212" textAnchor="middle" fontSize="9" fill="#173B73" fontWeight="600">Коммутатор</text>
      <rect x="150" y="100" width="90" height="50" rx="4" fill="#EFF3FB" stroke="#173B73" strokeWidth="1.2"/>
      <text x="195" y="119" textAnchor="middle" fontSize="8" fill="#173B73" fontWeight="600">Видеосервер или</text>
      <text x="195" y="131" textAnchor="middle" fontSize="8" fill="#173B73" fontWeight="600">видеорегистратор</text>
      <rect x="290" y="60" width="90" height="46" rx="4" fill="#EFF3FB" stroke="#173B73" strokeWidth="1.2"/>
      <text x="335" y="79" textAnchor="middle" fontSize="7.5" fill="#173B73" fontWeight="600">Интеграция</text>
      <text x="335" y="90" textAnchor="middle" fontSize="7.5" fill="#173B73" fontWeight="600">с системами КСБ</text>
      <rect x="390" y="60" width="62" height="46" rx="4" fill="#EFF3FB" stroke="#173B73" strokeWidth="1.2"/>
      <text x="421" y="79" textAnchor="middle" fontSize="7.5" fill="#173B73" fontWeight="600">Облачное</text>
      <text x="421" y="90" textAnchor="middle" fontSize="7.5" fill="#173B73" fontWeight="600">хранилище</text>
      <rect x="390" y="130" width="62" height="46" rx="4" fill="#EFF3FB" stroke="#173B73" strokeWidth="1.2"/>
      <text x="421" y="149" textAnchor="middle" fontSize="7.5" fill="#173B73" fontWeight="600">Удалённый</text>
      <text x="421" y="160" textAnchor="middle" fontSize="7.5" fill="#173B73" fontWeight="600">АРМ (УРМ)</text>
      <rect x="390" y="200" width="62" height="36" rx="4" fill="#EFF3FB" stroke="#173B73" strokeWidth="1.2"/>
      <text x="421" y="222" textAnchor="middle" fontSize="9" fill="#173B73" fontWeight="600">АРМ</text>
      <line x1="90" y1="118" x2="150" y2="118" stroke="#173B73" strokeWidth="1" markerEnd="url(#arrowV)"/>
      <line x1="90" y1="200" x2="150" y2="205" stroke="#173B73" strokeWidth="1" markerEnd="url(#arrowV)"/>
      <line x1="190" y1="150" x2="190" y2="190" stroke="#173B73" strokeWidth="1" markerEnd="url(#arrowV)"/>
      <line x1="240" y1="118" x2="290" y2="85" stroke="#173B73" strokeWidth="1" markerEnd="url(#arrowV)"/>
      <line x1="240" y1="125" x2="390" y2="83" stroke="#173B73" strokeWidth="1" markerEnd="url(#arrowV)"/>
      <line x1="240" y1="130" x2="390" y2="153" stroke="#173B73" strokeWidth="1" markerEnd="url(#arrowV)"/>
      <line x1="240" y1="135" x2="390" y2="215" stroke="#173B73" strokeWidth="1" markerEnd="url(#arrowV)"/>
      <defs>
        <marker id="arrowV" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="#173B73" />
        </marker>
      </defs>
    </svg>
  </div>
)

export default function VideoSurveillancePage() {
  const { t } = useTranslation()

  // Получаем переведенные данные
  const advantages = t('videoSurveillance.advantages', { returnObjects: true })
  const benefits = t('videoSurveillance.benefits', { returnObjects: true })
  const components = t('videoSurveillance.components', { returnObjects: true })

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
                {t('videoSurveillance.breadcrumb.solutions')}
              </Link>
              <span className="text-white/30">&gt;</span>
              <Link href="/solution/ksb" className="hover:text-white transition-colors duration-200">
                {t('videoSurveillance.breadcrumb.securitySystems')}
              </Link>
              <span className="text-white/30">&gt;</span>
            </div>

            <h1 className="text-2xl md:text-4xl font-bold text-white tracking-wide leading-tight max-w-xl">
              {t('videoSurveillance.title')}
            </h1>
            <p className="text-white/50 text-[14px] md:text-[14px] mt-3 max-w-lg leading-relaxed">
              {t('videoSurveillance.subtitle')}
            </p>
            
            <div className="mt-4 flex flex-col gap-1.5">
              <Link href="/solution/sistemy-bezopasnosti/skud" className="text-white text-[14px] font-medium hover:underline">
                &gt; {t('videoSurveillance.links.skud')}
              </Link>
              <Link href="/solution/sistemy-bezopasnosti/okhrannaya-signalizatsiya" className="text-white text-[14px] font-medium hover:underline">
                &gt; {t('videoSurveillance.links.securityAlarm')}
              </Link>
              <Link href="/solution/sistemy-bezopasnosti/opoveshchenie-evakuatsiya" className="text-white text-[14px] font-medium hover:underline">
                &gt; {t('videoSurveillance.links.notification')}
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
                alt=" Logo" 
                width={200} 
                height={200}
                className="object-contain"
              />
            </div>
            <div className="lg:col-span-8">
              <p className="text-[14px] text-slate-600 leading-relaxed">
                {t('videoSurveillance.armtelDescription')}
              </p>
            </div>
          </div>
        </section>

        {/* ─── ЗАГОЛОВОК ─── */}
        <section className="mt-[30px] md:mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <h2 className="text-xl md:text-2xl font-bold text-[#173B73] leading-snug">
                {t('videoSurveillance.headerTitle')}
              </h2>
            </div>
            <div className="lg:col-span-5">
              <div className="border-t-2 border-[#173B73] pt-3">
                <p className="text-[14px] text-gray-500 leading-relaxed">
                  {t('videoSurveillance.headerSubtitle')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3 КАРТОЧКИ ─── */}
        <section className="mt-[25px] md:mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 border border-slate-200">
           {advantages.map((item, i) => {
  const iconMap = { analysis: img2, cameras: img3, modernize: img4 }
  const iconSrc = iconMap[item.icon] || img2
  return (
    <div
      key={i}
      className={`p-[15px] md:p-6 flex flex-col items-start gap-4 bg-slate-50/50 min-h-[140px]
        ${i < 2 ? 'border-b sm:border-b-0 sm:border-r border-slate-200' : ''}`}
    >
      <div className="w-10 h-10 relative">
        <Image src={iconSrc} alt="" fill className="object-contain" />
      </div>
      <p className="text-[14px] text-[#1f2937] font-medium leading-snug">{item.text}</p>
    </div>
  )
})}
          </div>
        </section>

        {/* ─── ВИДЕОНАБЛЮДЕНИЕ КАК ЧАСТЬ КСБ ─── */}
        <section className="mt-[50px] md:mt-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 mb-8">
            <div className="flex-1 border-b-2 border-[#173B73] pb-1">
              <h3 className="text-xl font-bold text-[#173B73]">
                {t('videoSurveillance.benefitsTitle')}
              </h3>
            </div>
            <div className="text-[14px] text-gray-500 md:w-1/3 md:pl-6 pb-1 leading-tight">
              {t('videoSurveillance.benefitsSubtitle')}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
            {benefits.map((item, i) => (
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
            {t('videoSurveillance.componentsTitle')}
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start ">
            <div className="lg:col-span-5 space-y-5 text-[14px] text-slate-600">
              {components.map((block, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="text-[#173B73] text-[9px] mt-1 flex-shrink-0">▲</span>
                  <div>
                    <p className="font-semibold text-slate-700 mb-1">{block.label}</p>
                    {block.text && <p className="text-[14px] text-slate-500 leading-relaxed">{block.text}</p>}
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
              <Image src={img} alt={img} width={600}/>
            </div>
          </div>
        </section>

        {/* ─── ФУТЕР ─── */}
        <section className="mb-[100px] mt-24">
          <div className="border-t border-[#173B73] pt-6 flex flex-col md:flex-row justify-between items-start gap-4">
            <h3 className="text-xl md:text-2xl font-bold text-slate-800 leading-tight">
              {t('videoSurveillance.footer.title')}
            </h3>
            <p className="text-[14px] text-slate-400 max-w-xs md:text-right font-light leading-relaxed">
              {t('videoSurveillance.footer.subtitle')}
            </p>
          </div>
        </section>

      </div>
    </div>
  )
}