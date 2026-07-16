'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { Suspense, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import img1 from '../../../../../../assets/svg/logo.svg'
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
      <pointsMaterial color="#ffffff" size={0.07} sizeAttenuation transparent opacity={0.5} />
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

/* ─── Ссылки баннера: путь + ключ перевода ───
   Пути взяты из вашей структуры:
   infrastruktura/seti-peredachi-dannyh
   infrastruktura/bshpd-i-rrl
   infrastruktura/sistemy-chasofikatsii
*/
const bannerLinks = [
  { href: '/solution/infrastruktura/seti-peredachi-dannyh', key: 'links.networks' },
  { href: '/solution/infrastruktura/bshpd-i-rrl', key: 'links.wireless' },
  { href: '/solution/infrastruktura/sistemy-chasofikatsii', key: 'links.timeSync' },
]

export default function DataStoragePage() {
  const { t } = useTranslation()

  const features = t('infrastruktura.dataStorage.features', { returnObjects: true })
  const complexSolutionItems = t('infrastruktura.dataStorage.complexSolutions.items', { returnObjects: true })
  const infraBlocks = t('infrastruktura.dataStorage.infraBlocks', { returnObjects: true })

  return (
    <div className="text-[#1f2937] font-sans min-h-screen antialiased select-none">

      {/* ─── БАННЕР ─── */}
      <header
        className="w-full relative overflow-hidden mb-[15px] md:mb-5 h-[340px] md:h-[380px]"
        style={{ background: 'linear-gradient(135deg, rgb(2, 13, 48) 0%, #0e2e5b 58%, #000000 100%)' }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_55%)]" />
        {bannerIcons.map((ic, i) => (
          <div key={i} className="absolute hidden md:block" style={{ top: ic.top, left: ic.left }}>
            <BannerIcon kind={ic.d} />
          </div>
        ))}
        <div className="max-w-[1280px] mx-auto px-4 xl:px-0 h-full grid grid-cols-1 md:grid-cols-12 items-center relative z-10">
          <div className="col-span-1 md:col-span-7 flex flex-col justify-center h-full pt-4 md:pt-0">
            <div className="text-[14px] font-medium text-white/70 mb-3 flex items-center gap-1.5 flex-wrap">
               <Link href="/solution" className="hover:text-white transition-colors">
              <span>{t('infrastruktura.dataStorage.breadcrumb.solutions')}</span>
               </Link>
              <span className="text-white/40">&gt;</span>
                 <Link href="/solution/infrastruktura" className="hover:text-white transition-colors">
              <span>{t('infrastruktura.dataStorage.breadcrumb.infrastructure')}</span>
                 </Link>
              <span className="text-white/40">&gt;</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-white tracking-wide leading-tight max-w-xl">
              {t('infrastruktura.dataStorage.title')}
            </h1>
            <p className="text-white/70 text-[14px] md:text-[14px] mt-3 max-w-lg leading-relaxed">
              {t('infrastruktura.dataStorage.subtitle')}
            </p>
            <div className="mt-4 flex flex-col gap-1.5">
              {bannerLinks.map((l, i) => (
                <Link
                  key={i}
                  href={l.href}
                  className="text-white text-[14px] font-medium underline cursor-pointer"
                >
                  &gt; {t(`infrastruktura.dataStorage.${l.key}`)}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:block md:col-span-5 h-full relative">
            <div className="absolute inset-0 top-[-20px] opacity-60">
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

        {/* ─── ARMTEL БЛОК + FEATURES ─── */}
        <section className="mt-[30px] md:mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 flex items-start">
              <Image src={img1} alt="ARMTEL" width={200} height={200} />
            </div>
            <div className="lg:col-span-8">
              <p className="text-[14px] text-slate-600 leading-relaxed mb-6">
                {t('infrastruktura.dataStorage.armtelDescription')}
              </p>

              <div className="flex flex-col gap-5">
                {features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-[14px]">
                    <span className="text-[#173B73] font-bold mt-[2px] flex-shrink-0">▲</span>
                    <div>
                      <p className="font-semibold text-slate-700">{f.title}</p>
                      <p className="text-slate-500 leading-relaxed mt-0.5">{f.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── СОЗДАЁМ РЕШЕНИЯ ─── */}
        <section className="mt-[50px] md:mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10">
            <div className="lg:col-span-4">
              <h2 className="text-xl md:text-2xl font-bold text-[#173B73] leading-snug">
                {t('infrastruktura.dataStorage.solutionsTitle')}
              </h2>
              <div className="border-t-2 border-[#173B73] mt-3" />
            </div>
            <div className="lg:col-span-8">
              <p className="text-[14px] text-gray-500 leading-relaxed">
                {t('infrastruktura.dataStorage.solutionsSubtitle')}
              </p>
            </div>
          </div>

          {/* ─── Комплексные решения ─── */}
          <div className="mb-8">
            <p className="text-[14px] font-semibold text-slate-800 mb-1.5">
              {t('infrastruktura.dataStorage.complexSolutions.title')}
            </p>
            <p className="text-[14px] text-slate-500 leading-relaxed mb-3">
              {t('infrastruktura.dataStorage.complexSolutions.intro')}
            </p>
            <div className="flex flex-col gap-2.5">
              {complexSolutionItems.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-[14px]">
                  <span className="text-[#173B73] font-bold mt-[2px] flex-shrink-0">☑</span>
                  <p className="text-slate-600 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ─── Остальные блоки инфраструктуры ─── */}
          <div className="flex flex-col gap-7">
            {infraBlocks.map((b, i) => (
              <div key={i}>
                <p className="text-[14px] font-semibold text-slate-800 mb-1.5">{b.title}</p>
                <p className="text-[14px] text-slate-500 leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── ФУТЕР ─── */}
        <section className="mb-[100px] mt-24">
          <div className="border-t border-[#173B73] pt-6 flex flex-col md:flex-row justify-between items-start gap-4">
            <h3 className="text-xl md:text-2xl font-bold text-slate-800 leading-tight">
              {t('infrastruktura.dataStorage.footer.title')}
            </h3>
            <p className="text-[14px] text-slate-400 max-w-xs md:text-right font-light leading-relaxed">
              {t('infrastruktura.dataStorage.footer.subtitle')}
            </p>
          </div>
        </section>

      </div>
    </div>
  )
}