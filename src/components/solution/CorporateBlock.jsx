'use client'
import Link from 'next/link'
import React, { Suspense, useRef } from 'react'
import { GoArrowUpRight } from "react-icons/go";
import { Canvas, useFrame } from '@react-three/fiber'
import Under from '../ui/under/Under'
import { solutionsData, solutionTranslations } from '@/lib/solution/data'
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

// ─── ИМПОРТЫ SVG ИКОНОК ───
import IconTopologyStar from '../../../assets/svg/icon_prom_sv_blue (1).svg';
import IconBell        from '../../../assets/svg/icon_sis_opov_evak_blue.svg';
import IconBell2       from '../../../assets/svg/ChatGPT_Image_14_июл._2026_г.__16_45_51-removebg-preview.png';
import IconDeviceTv    from '../../../assets/svg/icon_t_sv_blue.svg';
import IconWifi        from '../../../assets/svg/ChatGPT_Image_14_июл._2026_г.__17_05_10-removebg-preview.png';
import IconCamera      from '../../../assets/svg/icon_sis_video_tele_nabl_blue.svg';
import IconShieldLock  from '../../../assets/svg/icon_sis_ohr_sign_blue.svg';
import IconDoor        from '../../../assets/svg/icon_skud_blue.svg';
// import IconUserShield  from '../../../assets/svg/иконка16-blue-mirrored.svg';
import IconBellEvac    from '../../../assets/svg/ико23-blue-mirrored.svg';
import IconTools       from '../../../assets/svg/ChatGPT_Image_14_июл._2026_г.__17_00_25-removebg-preview.png';
import IconPlug        from '../../../assets/svg/icon_sis_elektropit-blue-mirrored.svg';
import IconBulb        from '../../../assets/svg/icon_prom_osv-blue-mirrored.svg';
import IconLaptop      from '../../../assets/svg/icon_monitor_kontrol-blue-mirrored.svg';
import IconRouter      from '../../../assets/svg/icon_seti_sis_pered_dann-blue-mirrored.svg';
import IconServer      from '../../../assets/svg/icon_sis_obr_hran_dann-blue-mirrored (1).svg';
import IconClock       from '../../../assets/svg/icon_sis_chas-blue-mirrored.svg';
import IconTopology    from '../../../assets/svg/иконка11-blue-mirrored.svg';
import IconShieldCheck from '../../../assets/svg/shield-check-blue.svg';
import IconUserShield  from '../../../assets/svg/icon-ksb-sopriusta_blue.svg';
import IconSistemaChasogikasii  from '../../../assets/svg/icon_besp_shir_dost-blue-mirrored.svg';
import IconBesprovonyeradiolinia    from '../../../assets/svg/icon_sis_chas-blue-mirrored.svg';

// ─── МАППИНГ ИКОНОК ───
const ICON_MAP = {
  'topology-star': IconTopologyStar,
  'bell':          IconBell,
  'bell2':          IconBell2,
  'device-tv':     IconDeviceTv,
  'wifi':          IconWifi,
  'camera':        IconCamera,
  'shield-lock':   IconShieldLock,
  'door':          IconDoor,
  'user-shield':   IconUserShield,
  'bell-evac':     IconBellEvac,
  'tools':         IconTools,
  'plug':          IconPlug,
  'bulb':          IconBulb,
  'device-laptop': IconLaptop,
  'router':        IconRouter,
  'server':        IconServer,
  'shield-check':  IconShieldCheck,
  'wireless-access': IconSistemaChasogikasii,
  'wireless-line':   IconBesprovonyeradiolinia,
};

// Иконки для секций (в HeroBanner маленькие)
const SECTION_ICON_MAP = {
  'router':        IconRouter,
  'shield-check':  IconShieldCheck,
  'plug':          IconPlug,
  'topology-star': IconTopologyStar,
};

// ─── ЛОКАЛЬНЫЕ ПЕРЕВОДЫ ДЛЯ СТРОК, НЕ ВХОДЯЩИХ В uiT ───
const heroExtra = {
  tagline: {
    ru: 'Байтех — от проектирования до пусконаладки. Решение под ключ.',
    ky: 'Байтех — долбоорлоодон тартып орнотуп-тууралоого чейин. Ачкычтуу чечим.',
    en: 'Baitech — from design to commissioning. A turnkey solution.',
  },
  downloadLabel: {
    ru: 'Скачать презентацию (.pdf)',
    ky: 'Презентацияны жүктөп алуу (.pdf)',
    en: 'Download presentation (.pdf)',
  },
}

function SvgIcon({ name, className = "w-[80px] h-[80px]" }) {
  const src = ICON_MAP[name];
  if (!src) return (
    <div className={`${className} mx-auto mb-5`}>
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full text-current">
        <rect x="8" y="8" width="48" height="48" rx="6" stroke="currentColor" strokeWidth="2.5"/>
      </svg>
    </div>
  );
  return (
    <div className={`${className} mx-auto mb-5 relative`}>
      <Image
        src={src}
        alt={name}
        fill
        style={{ objectFit: 'contain' }}
      />
    </div>
  );
}

// ─── 3D АНИМАЦИЯ ───
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
      <pointsMaterial color="#173B73" size={0.06} sizeAttenuation transparent opacity={0.5} />
    </points>
  )
}

function SolutionSection({ section, lang }) {
  const title = section.title[lang] || section.title.ru
  const count = section.items.length

  return (
    <div id={section.id} className="mb-[80px]">
      <Link href={section.href} className="group block text-center mb-10">
        <span className="text-[28px] md:text-[32px] font-bold text-[#173B73] group-hover:text-[#172B99] transition-colors">
          {title}
        </span>
      </Link>

      <div className={
        count === 5
          ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10"
          : "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10"
      }>
        {section.items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="group flex flex-col items-center text-center text-[#173B73]"
          >
            <SvgIcon name={item.icon} />
            <span className="text-[15px] text-[#1f2937] group-hover:text-[#172B99] transition-colors leading-snug">
              {item.title[lang] || item.title.ru}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

function HeroBanner({ sections, lang, uiT }) {
  const extra = {
    tagline: heroExtra.tagline[lang] || heroExtra.tagline.ru,
    downloadLabel: heroExtra.downloadLabel[lang] || heroExtra.downloadLabel.ru,
  }
  return (
    <div
      className="w-full relative overflow-hidden mb-[70px]"
      style={{ background: 'linear-gradient(135deg, rgb(2, 13, 48) 0%, #0e2e5b 58%, #000000 100%)' }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,121,65,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.06),transparent_30%)]" />

      <div className="absolute right-0 top-0 w-[45%] h-full hidden lg:block pointer-events-none opacity-60">
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, -5, 4.5], fov: 45 }}>
            <ambientLight intensity={0.4} />
            <AnimatedGrid />
          </Canvas>
        </Suspense>
      </div>

      <div className="container mx-auto px-4 xl:px-0 max-w-[1280px] py-[52px] md:py-[68px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">

          <div className="lg:col-span-7">
            <h1 className="text-[28px] md:text-[40px] font-bold text-white mb-2 leading-tight">
              {uiT.heroTitle}
            </h1>
            <p className="text-[15px] md:text-[17px] text-white/70 font-semibold mb-3 leading-snug">
              {extra.tagline}
            </p>
            <p className="mb-7 text-[14px] md:text-[15px] leading-7 text-white/70 max-w-lg">
              {uiT.heroDesc}
            </p>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {sections.map((s) => {
                const iconSrc = SECTION_ICON_MAP[s.icon];
                return (
                  <li key={s.id}>
                    <Link
                      href={s.href}
                      className="group flex items-center gap-3 rounded-xl border border-white/12 bg-white/8 px-4 py-2.5 text-white/90 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/12"
                    >
                      <div className="flex-shrink-0 w-6 h-6 relative">
                        {iconSrc ? (
                          <Image src={iconSrc} alt={s.icon} fill style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
                        ) : (
                          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full text-white/70">
                            <rect x="8" y="8" width="48" height="48" rx="6" stroke="currentColor" strokeWidth="2.5"/>
                          </svg>
                        )}
                      </div>
                      <span className="text-[14px] md:text-[14px] flex-1 group-hover:text-white transition-colors leading-snug">
                        {s.title[lang] || s.title.ru}
                      </span>
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#173B72] text-[14px] font-bold text-white flex-shrink-0">
                        <GoArrowUpRight />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="lg:col-span-5 lg:pl-2 flex items-center justify-center">
            
            <a  href="/baitech-presentation.pdf"
              download
              className="inline-flex items-center gap-2.5 border border-white/30 text-white text-[14px] font-medium px-6 py-3 rounded-full hover:bg-white/10 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
              {extra.downloadLabel}
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}

const CorporateBlock = () => {
  const { i18n } = useTranslation()
  const lang = ['ru', 'ky', 'en'].includes(i18n.language) ? i18n.language : 'ru'
  const uiT = solutionTranslations[lang] || solutionTranslations.ru

  return (
    <section className="w-full">
      <div className="mx-auto px-4 xl:px-0 max-w-[1280px]">
        <Under text={uiT.breadcrumbHome} link="/" text1={uiT.breadcrumbSolutions} />
      </div>
      <HeroBanner sections={solutionsData} lang={lang} uiT={uiT} />
      <div className="container mx-auto px-4 xl:px-0 max-w-[1280px] pb-[60px]">
        {solutionsData.map((section) => (
          <SolutionSection key={section.id} section={section} lang={lang} />
        ))}
      </div>
    </section>
  )
}

export default CorporateBlock