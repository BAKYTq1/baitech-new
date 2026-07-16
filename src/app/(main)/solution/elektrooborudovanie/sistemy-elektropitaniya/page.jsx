'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { Suspense, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Canvas, useFrame } from '@react-three/fiber'
import logo from '../../../../../../assets/svg/logo.svg'
import img from '../../../../../../assets/png/elektrooborudovanie_kabel_1_mirrored.webp'
import img11 from '../../../../../../assets/png/elektrooborudovanie_kabel_2_mirrored.webp'
import img2 from '../../../../../../assets/png/elektrooborudovanie_kabel_3_mirrored.webp'
import img3 from '../../../../../../assets/png/elektrooborudovanie_kabel_4_mirrored.webp'
import img4 from '../../../../../../assets/png/elektrooborudovanie_kabel_5_mirrored.webp'
import img5 from '../../../../../../assets/png/elektrooborudovanie_kabel_6_mirrored.webp'
import img6 from '../../../../../../assets/png/elektrooborudovanie_kabel_7_mirrored.webp'
import img7 from '../../../../../../assets/png/elektrooborudovanie_kabel_9_mirrored.webp'
import img12 from '../../../../../../assets/png/elektrooborudovanie_kabel_8.png'
import img8 from '../../../../../../assets/png/elektrooborudovanie_product_2_mirrored.webp'
import img9 from '../../../../../../assets/png/elektrooborudovanie_product_3_mirrored.webp'
import img10 from '../../../../../../assets/png/elektrooborudovanie_product_4_mirrored.webp'
import img13 from '../../../../../../assets/png/elektrooborudovanie_kabel_2.png'
import img17 from '../../../../../../assets/svg/Icon-93-blue.svg'
import img18 from '../../../../../../assets/svg/Icon-07_blue.svg'
import img19 from '../../../../../../assets/svg/Icon-10_blue.svg'
import img20 from '../../../../../../assets/svg/Icon-04_blue.svg'
const PRODUCT_IMAGES = [img, img7, img12, img6, img5, img4, img3, img2, img13]

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

// Статические иконки для features
const featureImages = [img17, img18, img19, img20]

export default function CableSystemsPage() {
  const { t } = useTranslation()

  // Получаем переведенные данные с проверкой
  const featuresData = t('cableSystems.features', { returnObjects: true })
  const productsData = t('cableSystems.products', { returnObjects: true })
  const metalItemsData = t('cableSystems.metalItems', { returnObjects: true })
  const fprItemsData = t('cableSystems.fprItems', { returnObjects: true })
  const falshpolItemsData = t('cableSystems.falshpolItems', { returnObjects: true })

  // Защита от ошибок - проверяем, что данные являются массивами
  const features = Array.isArray(featuresData) ? featuresData : []
  const products = Array.isArray(productsData) ? productsData : []
  const metalItems = Array.isArray(metalItemsData) ? metalItemsData : []
  const fprItems = Array.isArray(fprItemsData) ? fprItemsData : []
  const falshpolItems = Array.isArray(falshpolItemsData) ? falshpolItemsData : []

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
                {t('cableSystems.breadcrumb.solutions')}
              </Link>
              <span className="text-white/30">&gt;</span>
              <Link href="/solution/elektrooborudovanie" className="hover:text-white transition-colors duration-200">
                {t('cableSystems.breadcrumb.electricalEquipment')}
              </Link>
              <span className="text-white/30">&gt;</span>
            </div>

            <h1 className="text-2xl md:text-4xl font-bold text-white tracking-wide leading-tight max-w-xl">
              {t('cableSystems.title')}
            </h1>
            <p className="text-white/50 text-[14px] md:text-[14px] mt-3 max-w-lg leading-relaxed">
              {t('cableSystems.subtitle')}
            </p>
            
            <div className="mt-4 flex flex-col gap-1.5">
              <Link href="/solution/elektrooborudovanie/sistemy-elektropitaniya" className="text-white text-[14px] font-medium hover:underline">
                &gt; {t('cableSystems.links.powerSupply')}
              </Link>
              <Link href="/solution/elektrooborudovanie/promyshlennoe-osveshchenie" className="text-white text-[14px] font-medium hover:underline">
                &gt; {t('cableSystems.links.industrialLighting')}
              </Link>
              <Link href="/solution/elektrooborudovanie/monitoring-i-kontrol" className="text-white text-[14px] font-medium hover:underline">
                &gt; {t('cableSystems.links.monitoring')}
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
                {t('cableSystems.armtelDescription')}
              </p>
            </div>
          </div>
        </section>

        {/* ─── 4 СТРОКИ FEATURES ─── */}
        <section className="mt-[40px] md:mt-12">
          <div className="flex flex-col divide-y divide-slate-200">
            {features.map((f, i) => (
              <div key={i} className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-6 items-start">
                <div className="lg:col-span-1 flex-shrink-0">
  <Image
    src={featureImages[i] || featureImages[0]}
    alt={f.title || 'feature icon'}
    width={36}
    height={36}
    className="object-contain"
  />
</div>
                <div className="lg:col-span-4">
                  <p className="text-[14px] font-semibold text-[#173B73] leading-snug">{f.title}</p>
                </div>
                <div className="lg:col-span-7">
                  <p className="text-[14px] text-slate-500 leading-relaxed">{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── АДАПТИРУЕМ РЕШЕНИЯ ─── */}
        <section className="mt-[50px] md:mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-8">
            <div className="lg:col-span-5">
              <h2 className="text-xl md:text-2xl font-bold text-[#173B73] leading-snug">
                {t('cableSystems.adaptTitle')}
              </h2>
              <div className="border-t-2 border-[#173B73] mt-3" />
            </div>
            <div className="lg:col-span-7">
              <p className="text-[14px] text-gray-500 leading-relaxed">
                {t('cableSystems.adaptSubtitle')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((p, i) => (
              <div key={i} className="border border-slate-200 rounded-sm overflow-hidden">
                <div className="bg-white h-[180px] relative flex items-center justify-center p-2">
                  <Image
                     src={PRODUCT_IMAGES[i] || p.img}
                    alt={p.label}
                   width={200}
                    height={150}
                    className="object-contain"
                  />
                </div>
                <div className="p-4">
                  <p className="text-[14px] text-slate-700 leading-snug">{p.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── ПРОДУКТЫ ИЗ МЕТАЛЛА ─── */}
        <section className="mt-[50px] md:mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-8">
            <div className="lg:col-span-5">
              <h2 className="text-xl md:text-2xl font-bold text-[#173B73] leading-snug">
                {t('cableSystems.metalTitle')}
              </h2>
              <div className="border-t-2 border-[#173B73] mt-3" />
            </div>
            <div className="lg:col-span-7">
              <p className="text-[14px] text-gray-500 leading-relaxed">
                {t('cableSystems.metalSubtitle')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 flex flex-col gap-3">
              {metalItems.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-[14px]">
                  <span className="text-[#173B73] font-bold mt-[2px] flex-shrink-0">☑</span>
                  <p className="text-slate-600 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <div className="bg-white rounded-sm h-[120px] relative overflow-hidden flex items-center justify-center p-2">
                <Image
                  src="https://arman-engineering.ru/assets/images/sections/solutions/elektrooborudovanie/elektrooborudovanie_product_4.png"
                  alt={t('cableSystems.metalImageAlt')}
                     width={200}
                    height={100}
                    className="object-contain"
                />
              </div>
              <div className="bg-white rounded-sm h-[120px] relative overflow-hidden flex items-center justify-center p-2">
                <Image
                  src="https://arman-engineering.ru/assets/images/sections/solutions/elektrooborudovanie/elektrooborudovanie_product_1.png"
                  alt={t('cableSystems.metalImageAlt')}
                     width={200}
                    height={100}
                    className="object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ─── ПРОДУКТЫ ИЗ FPR ─── */}
        <section className="mt-[50px] md:mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-8">
            <div className="lg:col-span-5">
              <h2 className="text-xl md:text-2xl font-bold text-[#173B73] leading-snug">
                {t('cableSystems.fprTitle')}
              </h2>
              <div className="border-t-2 border-[#173B73] mt-3" />
            </div>
            <div className="lg:col-span-7">
              <p className="text-[14px] text-gray-500 leading-relaxed">
                {t('cableSystems.fprSubtitle')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 flex flex-col gap-4">
              {fprItems.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-[14px]">
                  <span className="text-[#173B73] font-bold mt-[2px] flex-shrink-0">☑</span>
                  <div>
                    <p className="font-semibold text-slate-700">{item.label}</p>
                    <p className="text-slate-500 leading-relaxed mt-0.5">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="bg-white rounded-sm h-[140px] relative overflow-hidden flex items-center justify-center p-2">
                <Image
                  src="https://arman-engineering.ru/assets/images/sections/solutions/elektrooborudovanie/elektrooborudovanie_product_2.png"
                  alt={t('cableSystems.fprImageAlt')}
                  width={200}
                    height={120}
                    className="object-contain"
                />
              </div>
              <div className="bg-white rounded-sm h-[140px] relative overflow-hidden flex items-center justify-center p-2">
                <Image
                  src="https://arman-engineering.ru/assets/images/sections/solutions/elektrooborudovanie/elektrooborudovanie_product_3.png"
                  alt={t('cableSystems.fprImageAlt')}
                  width={200}
                    height={120}
                    className="object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ─── СИСТЕМА ПРОМЫШЛЕННОГО ФАЛЬШПОЛА ─── */}
        <section className="mt-[50px] md:mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-6">
            <div className="lg:col-span-6">
              <h2 className="text-xl md:text-2xl font-bold text-[#173B73] leading-snug">
                {t('cableSystems.falshpolTitle')}
              </h2>
              <div className="border-t-2 border-[#173B73] mt-3" />
            </div>
          </div>

          <p className="text-[14px] text-slate-600 mb-6">
            {t('cableSystems.falshpolDescription')}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {falshpolItems.map((item, i) => (
              <div key={i} className="flex flex-col gap-3">
                <div className={`text-[14px] text-slate-700 font-medium leading-snug pb-3 ${i < falshpolItems.length - 1 ? 'border-r-0 lg:border-r border-slate-200 pr-0 lg:pr-6' : ''}`}>
                  {item.label}
                </div>
                <div className="bg-white rounded-sm h-[180px] relative overflow-hidden flex items-center justify-center p-2">
                  <Image
                    src={item.img}
                    alt={item.caption}
                    width={300}
                    height={300}
                    className="object-cover"
                  />
                </div>
                <p className="text-[14px] text-slate-400">{item.caption}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button className="border border-[#173B73] text-[#173B73] text-[14px] px-6 py-2.5 rounded-sm hover:bg-[#173B73] hover:text-white transition-colors">
              {t('cableSystems.downloadButton')}
            </button>
          </div>
        </section>

        {/* ─── ФУТЕР ─── */}
        <section className="mb-[100px] mt-24">
          <div className="border-t border-[#173B73] pt-6 flex flex-col md:flex-row justify-between items-start gap-4">
            <h3 className="text-xl md:text-2xl font-bold text-slate-800 leading-tight">
              {t('cableSystems.footer.title')}
            </h3>
            <p className="text-[14px] text-slate-400 max-w-xs md:text-right font-light leading-relaxed">
              {t('cableSystems.footer.subtitle')}
            </p>
          </div>
        </section>

      </div>
    </div>
  )
}