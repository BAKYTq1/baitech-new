'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { Suspense, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import img1 from '../../../../../../assets/svg/logo.svg'
import { Canvas, useFrame } from '@react-three/fiber'
import img from '../../../../../../assets/svg/icon_chasof_1_rezerv_blue.svg'
import img2 from '../../../../../../assets/svg/icon_chasof_2_sinhron_blue.svg'
import img3 from '../../../../../../assets/svg/icon_chasof_3_gibk_blue.svg'
import img4 from '../../../../../../assets/svg/icon_chasof_4_integr_blue.svg'

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

export default function TimeSyncPage() {
  const { t } = useTranslation()

  // Получаем переведенные данные
  const features = t('timeSync.features', { returnObjects: true })
  const advantages = t('timeSync.advantages', { returnObjects: true })
  const products = t('timeSync.products', { returnObjects: true })
  const advantageImages = [img, img2, img3, img4]
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
              <Link href="/solution" className="hover:text-white transition-colors duration-200">
                {t('timeSync.breadcrumb.solutions')}
              </Link>
              <span className="text-white/40">&gt;</span>
              <Link href="/solution/infrastruktura" className="hover:text-white transition-colors duration-200">
                {t('timeSync.breadcrumb.infrastructure')}
              </Link>
              <span className="text-white/40">&gt;</span>
              <span className="text-white/60">
                {t('timeSync.breadcrumb.current')}
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-white tracking-wide leading-tight max-w-xl">
              {t('timeSync.title')}
            </h1>
            <p className="text-white/70 text-[14px] md:text-[14px] mt-3 max-w-lg leading-relaxed">
              {t('timeSync.subtitle')}
            </p>
            <div className="mt-4 flex flex-col gap-1.5">
              <Link href="../seti-peredachi-dannyh" className="text-white text-[14px] font-medium hover:underline">
                &gt; {t('timeSync.links.networks')}
              </Link>
              <Link href="../bshpd-i-rrl" className="text-white text-[14px] font-medium hover:underline">
                &gt; {t('timeSync.links.wirelessBroadband')}
              </Link>
              <Link href="../sistemy-obrabotki-i-hraneniya-dannyh" className="text-white text-[14px] font-medium hover:underline">
                &gt; {t('timeSync.links.dataStorage')}
              </Link>
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

        {/* ─── БЛОК С ЛОГО + FEATURES ─── */}
        <section className="mt-[30px] md:mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 flex items-start">
              <Image src={img1} alt="logo" width={200} height={200} />
            </div>
            <div className="lg:col-span-8">
              <p className="text-[14px] text-slate-600 leading-relaxed mb-6">
                {t('timeSync.armtelDescription')}
              </p>
              <div className="flex flex-col gap-5">
                {features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-[14px]">
                    <span className="text-[#173B73] font-bold mt-[2px] flex-shrink-0">▲</span>
                    <div>
                      <p className="font-semibold text-slate-700">{f.title}</p>
                      {f.text && <p className="text-slate-500 leading-relaxed mt-0.5">{f.text}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── ОРГАНИЗУЕМ ТОЧНУЮ СИНХРОНИЗАЦИЮ ─── */}
        <section className="mt-[50px] md:mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-8">
            <div className="lg:col-span-7">
              <h2 className="text-xl md:text-2xl font-bold text-[#173B73] leading-snug">
                {t('timeSync.syncTitle')}
              </h2>
            </div>
            <div className="lg:col-span-5">
              <div className="border-t-2 border-[#173B73] pt-3" />
            </div>
          </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {advantages.map((item, i) => (
    <div key={i} className="border border-slate-200 rounded-sm p-5 flex flex-col items-center gap-3 text-center">
      <div className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0">
        <Image
          src={advantageImages[i % advantageImages.length]}
          alt={typeof item === 'string' ? item : 'advantage icon'}
          width={24}
          height={24}
          className="object-contain w-[60px] h-[40px] flex-shrink-0"
        />
      </div>
      <p className="text-[14px] text-slate-600 leading-relaxed">{item}</p>
    </div>
  ))}
</div>
        </section>

        {/* ─── ПРЕДЛАГАЕМ КОМПЛЕКСНЫЕ СИСТЕМЫ ─── */}
        <section className="mt-[50px] md:mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-8">
            <div className="lg:col-span-5">
              <h2 className="text-xl md:text-2xl font-bold text-[#173B73] leading-snug">
                {t('timeSync.productsTitle')}
              </h2>
              <div className="border-t-2 border-[#173B73] mt-3" />
            </div>
            <div className="lg:col-span-7">
              <p className="text-[14px] text-gray-500 leading-relaxed">
                {t('timeSync.productsSubtitle')}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {products.map((product, i) => (
              <div key={i} className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start border-b border-slate-100 pb-6 last:border-none">
                <div className="lg:col-span-4">
                  <h4 className="text-[15px] font-bold text-[#173B73] leading-snug">
                    {product.title}
                  </h4>
                </div>
                <div className="lg:col-span-8">
                  <p className="text-[14px] text-slate-600 leading-relaxed">
                    {product.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── ФУТЕР ─── */}
        <section className="mb-[100px] mt-24">
          <div className="border-t border-[#173B73] pt-6 flex flex-col md:flex-row justify-between items-start gap-4">
            <h3 className="text-xl md:text-2xl font-bold text-slate-800 leading-tight">
              {t('timeSync.footer.title')}
            </h3>
            <p className="text-[14px] text-slate-400 max-w-xs md:text-right font-light leading-relaxed">
              {t('timeSync.footer.subtitle')}
            </p>
          </div>
        </section>

      </div>
    </div>
  )
}