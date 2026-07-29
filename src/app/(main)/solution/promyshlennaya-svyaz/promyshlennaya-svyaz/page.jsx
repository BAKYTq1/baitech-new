'use client'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../../../../../../assets/svg/logo.svg'
import img from '../../../../../../assets/png/5310213237846513441.jpg'
import img2 from '../../../../../../assets/png/5310213237846513448.jpg'
import React, { Suspense, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import img1 from '../../../../../../assets/svg/icon_conditions_1_blue.svg'
import img12 from '../../../../../../assets/svg/icon_conditions_2_blue.svg'
import img3 from '../../../../../../assets/svg/icon_conditions_3_blue.svg'
import img4 from '../../../../../../assets/svg/icon_conditions_4_blue.svg'
import img5 from '../../../../../../assets/svg/img2.png'

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
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial color="#173B73" size={0.07} sizeAttenuation={true} transparent opacity={0.8} />
    </points>
  )
}
const PRODUCT_IMAGES = [
  'https://arman-engineering.ru/assets/images/sections/solutions/svyaz/armtel_product_2.png',
  'https://arman-engineering.ru/assets/images/sections/solutions/svyaz/armtel_product_4.png',
  'https://arman-engineering.ru/assets/images/sections/solutions/svyaz/armtel_product_1.png',
  'https://arman-engineering.ru/assets/images/sections/solutions/svyaz/armtel_product_3.png',
]

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
          <line x1="14" y1="32" x2="26" y2="10" stroke={stroke} strokeWidth="1.5" />
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

// Кастомные SVG-иконки для блоков устойчивости
const armtelIcons = {
  ex: (
    <div className="w-10 h-10 border-2 border-[#173B73] text-[#173B73] font-mono text-sm flex items-center justify-center rounded-[4px] font-bold select-none">
      Ex
    </div>
  ),
  chemistry: (
    <svg className="w-8 h-8 text-[#173B73]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path d="M12 2l3.5 6h-7L12 2zM5 12l3.5 6h-7L5 12zM19 12l3.5 6h-7L19 12z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  shield: (
    <svg className="w-8 h-8 text-[#173B73]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 6v8" strokeLinecap="round"/>
    </svg>
  ),
  audio: (
    <svg className="w-8 h-8 text-[#173B73]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path d="M12 3v18M17 7v10M7 7v10M22 10v4M2 10v4" strokeLinecap="round"/>
    </svg>
  ),
  lan: (
    <svg className="w-10 h-10 text-[#173B73]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="2" y="3" width="20" height="12" rx="2" />
      <path d="M6 21v-3M18 21v-3M12 15v6M4 21h16" strokeLinecap="round"/>
    </svg>
  ),
  bell: (
    <svg className="w-10 h-10 text-[#173B73]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function IndustrialCommunicationPage() {
  const { t } = useTranslation()

  // Безопасное получение данных с проверкой на массив
  const featuresData = t('industrialCommunication.features', { returnObjects: true })
  const durabilityData = t('industrialCommunication.durabilityItems', { returnObjects: true })
  const dispatchData = t('industrialCommunication.dispatchItems', { returnObjects: true })
  const operationalData = t('industrialCommunication.operationalItems', { returnObjects: true })
  const standardsData = t('industrialCommunication.standards', { returnObjects: true })
  const productsData = t('industrialCommunication.products', { returnObjects: true })
  const softwareData = t('industrialCommunication.softwareItems', { returnObjects: true })

  // Проверка и защита от ошибок
  const features = Array.isArray(featuresData) ? featuresData : []
  const durabilityItems = Array.isArray(durabilityData) ? durabilityData : []
  const dispatchItems = Array.isArray(dispatchData) ? dispatchData : []
  const operationalItems = Array.isArray(operationalData) ? operationalData : []
  const standards = Array.isArray(standardsData) ? standardsData : []
  const products = Array.isArray(productsData) ? productsData : []
  const softwareItems = Array.isArray(softwareData) ? softwareData : []

  return (
    <div className="bg-white text-[#1f2937] font-sans min-h-screen antialiased select-none">
      
      {/* ─── СТРАНИЦА 1 ─── */}
      <div className="bg-white pb-[40px] md:pb-[60px]">
        
        {/* Баннер */}
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
    {t('industrialCommunication.breadcrumb.solutions')}
  </Link>
  <span className="text-white/30">&gt;</span>
  <Link href="/solution/promyshlennaya-svyaz" className="hover:text-white transition-colors duration-200">
    {t('industrialCommunication.breadcrumb.industrialCommunication')}
  </Link>
  <span className="text-white/30">&gt;</span>
</div>

              <h1 className="text-2xl md:text-4xl font-bold text-white tracking-wide leading-tight max-w-xl">
                {t('industrialCommunication.title')}
              </h1>
              <p className="text-white/50 text-[14px] md:text-[14px] mt-3 max-w-lg leading-relaxed">
                {t('industrialCommunication.subtitle')}
              </p>
            </div>

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

        {/* Главный блок */}
        <section className="max-w-[1280px] mx-auto mt-[15px] md:mt-5 px-4 xl:px-0 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3 flex flex-col pt-2">
            <div className="flex items-center gap-2">
              <Image src={logo} alt="Armtel Logo" width={200} height={200} className="object-contain" /> 
            </div>
            <span className="text-[10px] text-gray-400 tracking-widest uppercase ml-9 mt-[-4px]">by Baitech</span>
          </div>

          <div className="lg:col-span-9 space-y-[15px] md:space-y-5">
            <h2 className="text-xl md:text-2xl font-bold text-[#173B73] leading-snug">
              {t('industrialCommunication.armtelTitle')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[15px] md:gap-5 text-[14px] text-[#1f2937] pt-2">
              {features.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="text-[#173B73] font-bold text-base mt-[-2px]">☑</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Сетка Устойчивости */}
       {/* Сетка Устойчивости */}
<section className="max-w-[1280px] mx-auto mt-[30px] md:mt-10 px-4 xl:px-0 space-y-[15px] md:space-y-5">
  <h3 className="text-lg md:text-xl font-bold text-[#173B73]">
    {t('industrialCommunication.durabilityTitle')}
  </h3>
  
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-slate-200">
    {durabilityItems.map((item, i) => {
      const durabilityImages = [img1, img12, img3, img4]
      return (
        <div key={i} className={`p-[15px] md:p-5 flex flex-col justify-between min-h-[160px] ${i < 3 ? 'border-b sm:border-b-0 sm:border-r border-slate-200' : ''} bg-slate-50/50`}>
          <div className="w-10 h-10 relative">
            <Image src={durabilityImages[i]} alt="" fill className="object-contain" />
          </div>
          <p className="text-[14px] text-[#1f2937] text-right mt-auto font-medium">{item.text}</p>
        </div>
      )
    })}
  </div>
</section>

        {/* ─── ДИСПЕТЧЕРСКАЯ СВЯЗЬ ─── */}
        <section className="max-w-[1280px] mx-auto mt-[50px] px-4 xl:px-0">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 mb-8">
            <div className="flex-1 border-b-2 border-[#173B73] pb-1">
              <h3 className="text-xl font-bold text-[#173B73]">
                {t('industrialCommunication.dispatchTitle')}
              </h3>
            </div>
            <div className="text-[14px] text-gray-500 md:w-1/3 md:pl-6 pb-1 leading-tight">
              {t('industrialCommunication.dispatchSubtitle')}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5">
              <div className="relative w-full h-[300px] md:h-[360px] overflow-hidden">
                <Image
                  src={img}
                  alt={t('industrialCommunication.dispatchImageAlt')}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-contain"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {dispatchItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-none text-[14px]">
                  <span className="text-[#173B73] font-bold mt-[2px]">☑</span>
                  <p className="text-slate-600 leading-relaxed">
                    <strong className="text-[#173B73] font-bold">{item.label}</strong> {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── ОПЕРАТИВНО-ТЕХНОЛОГИЧЕСКАЯ СВЯЗЬ ─── */}
        <section className="max-w-[1280px] mx-auto mt-[50px] px-4 xl:px-0">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 mb-8">
            <div className="flex-1 border-b-2 border-[#173B73] pb-1">
              <h3 className="text-xl font-bold text-[#173B73]">
                {t('industrialCommunication.operationalTitle')}
              </h3>
            </div>
            <div className="text-[14px] text-gray-500 md:w-1/3 md:pl-6 pb-1 leading-tight">
              {t('industrialCommunication.operationalSubtitle')}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5">
              <div className="relative w-full h-[300px] md:h-[360px] overflow-hidden">
                <Image
                  src={img2}
                  alt={t('industrialCommunication.operationalImageAlt')}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-contain"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {operationalItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-none text-[14px]">
                  <span className="text-[#173B73] font-bold mt-[2px]">☑</span>
                  <p className="text-slate-600 leading-relaxed">
                    <strong className="text-[#173B73] font-bold">{item.label}</strong> {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>

      {/* ─── СТРАНИЦА 2 ─── */}
      <div className="max-w-[1280px] mx-auto bg-white pb-16">
        
        {/* Соответствие стандартам */}
        <section className="mt-[40px] md:mt-12 px-4 xl:px-0 space-y-[15px] md:space-y-5">
          <h4 className="text-sm font-bold text-[#173B73] uppercase tracking-wider">
            {t('industrialCommunication.standardsTitle')}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[15px] md:gap-5">
            {standards.map((text, i) => (
  <div key={i} className="border border-slate-200 p-[15px] md:p-5 text-[14px] text-slate-500 leading-relaxed flex flex-col gap-3 rounded-2xl bg-slate-50/40">
    <div className="w-9 h-9 relative">
      <Image src={img5} alt="" width={100} className="object-contain" />
    </div>
    <p>{text}</p>
  </div>
))}
          </div>
        </section>

        {/* Каталог Оборудования */}
        <section className="mt-[40px] md:mt-16 px-4 xl:px-0 space-y-[15px] md:space-y-5">
          <h3 className="text-lg md:text-xl font-bold text-[#173B73]">
            {t('industrialCommunication.catalogTitle')}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((product, i) => (
              <div key={i} className="border border-slate-200 p-6 flex flex-col rounded-sm bg-white min-h-[640px] shadow-sm">
                <div className="mb-2">
                  <h4 className="text-[15px] font-bold text-slate-800 leading-snug min-h-[44px]">
                    {product.title}
                  </h4>
                </div>

                <div className="relative w-full h-56 my-4 flex items-center justify-center">
                  <div className={`relative ${product.imageWidth || 'w-40'} h-full`}>
                    <Image 
                      src={PRODUCT_IMAGES[i] || product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 40vw, 20vw"
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="mt-2 mb-4 text-left min-h-[72px]">
  {i < 2 && (
    <div className="w-8 h-8 relative mb-2">
      <Image src={img1} alt="" fill className="object-contain" />
    </div>
  )}
  <p className="text-[14px] text-gray-400 font-light leading-relaxed">
    {product.description}
  </p>
</div>

                <div className="w-full border-t border-slate-200 my-4" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 text-[14px] text-gray-500 leading-normal">
                  {product.specs && product.specs.map((spec, j) => (
                    <div key={j}>
                      <p>
                        <span className="text-[#173B73] mr-1 text-[9px]">▲</span> 
                        <strong className="text-gray-700 font-medium">{spec.label}:</strong>
                        <br />{spec.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-4">
            {/* <button className="border-2 border-[#173B73] text-[#173B73] hover:bg-[#172B99] hover:border-[#172B99] hover:text-white font-bold text-sm px-6 py-2.5 rounded-full transition-colors flex items-center gap-2">
              {t('industrialCommunication.catalogButton')}
            </button> */}
          </div>
        </section>

        {/* ─── ПРОГРАММНОЕ ОБЕСПЕЧЕНИЕ ─── */}
        <section className="mt-[40px] md:mt-16 px-4 xl:px-0 space-y-[15px] md:space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-6">
            <div className="lg:col-span-7">
              <h3 className="text-lg md:text-xl font-bold text-[#173B73] leading-snug">
                {t('industrialCommunication.softwareTitle')}
              </h3>
            </div>
            <div className="lg:col-span-5">
              <div className="border-t-2 border-[#173B73] pt-3">
                <p className="text-[14px] text-gray-500 leading-relaxed">
                  {t('industrialCommunication.softwareSubtitle')}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {softwareItems.map((item, i) => (
              <div key={i} className="border border-slate-200 bg-white rounded-sm overflow-hidden flex flex-col shadow-sm">
                <div className="relative w-full h-[160px] bg-slate-50 flex items-center justify-center overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain p-2"
                  />
                </div>
                <div className="p-4">
                  <p className="text-[14px] text-slate-600 leading-snug">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Футер */}
        <section className="max-w-[1280px] mx-auto mb-[100px] mt-24 px-4 xl:px-0">
          <div className="border-t border-[#173B73] pt-6 flex flex-col md:flex-row justify-between items-start gap-4">
            <h3 className="text-xl md:text-2xl font-bold text-slate-800 leading-tight">
              {t('industrialCommunication.footer.title')}
            </h3>
            <p className="text-[14px] text-slate-400 max-w-xs md:text-right font-light leading-relaxed">
              {t('industrialCommunication.footer.subtitle')}
            </p>
          </div>
        </section>

      </div>
    </div>
  )
}