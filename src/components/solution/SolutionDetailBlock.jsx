'use client'
import React from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { GoArrowUpRight, GoCheck } from 'react-icons/go'
import { solutionTranslations } from '@/lib/solution/data'

// ─────────────────────────────────────────────
// Чек-иконка (используется везде вместо точки)
// ─────────────────────────────────────────────
function CheckIcon() {
  return (
    <span className="mt-0.5 w-4 h-4 rounded-full bg-[#173B73]/10 text-[#173B73] flex items-center justify-center flex-shrink-0">
      <GoCheck className="w-3 h-3" />
    </span>
  )
}

// ─────────────────────────────────────────────
// 1. HERO: лого/иконка + заголовок + описание + список тезисов
// ─────────────────────────────────────────────
function Hero({ solution }) {
  return (
    <div className="mb-14">
      {solution.heroIcon && (
        <Image src={solution.heroIcon} alt="" width={160} height={40} className="h-10 w-auto mb-6" />
      )}

      <h1 className="text-[28px] md:text-[36px] font-bold text-[#173B73] mb-4 leading-snug">
        {solution.title}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className={`${solution.image ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
          <p className="text-[15px] md:text-[17px] text-gray-600 leading-relaxed mb-4">
            {solution.mainDescription}
          </p>

          {solution.heroBullets?.length > 0 && (
            <ul className="space-y-2">
              {solution.heroBullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-2 text-[14px] md:text-[15px] text-gray-700">
                  <CheckIcon />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {solution.image && (
          <div className="lg:col-span-5 relative rounded-lg overflow-hidden border border-gray-200 shadow-sm h-[260px] bg-gray-50">
            <Image src={solution.image} alt={solution.title} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
          </div>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// 2. "Устойчива к условиям" — 4 иконки в ряд
// ─────────────────────────────────────────────
function AdvantagesRow({ heading, items }) {
  if (!items?.length) return null
  return (
    <div className="mb-16">
      {heading && (
        <h2 className="text-[22px] md:text-[26px] font-bold text-[#173B73] text-center mb-10 max-w-[700px] mx-auto">
          {heading}
        </h2>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center border border-gray-200 rounded-lg p-6 hover:border-[#173B73] transition-colors duration-300"
          >
            <div className="w-12 h-12 mb-4 flex items-center justify-center">
              {item.icon ? (
                <Image src={item.icon} alt="" width={48} height={48} className="w-full h-full object-contain" />
              ) : (
                <div className="w-full h-full rounded-full bg-gray-100" />
              )}
            </div>
            <p className="text-[14px] text-gray-700 leading-snug">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// 3/4. Текстовый блок: заголовок + описание + список (чек-иконки) + картинка/схема
// ─────────────────────────────────────────────
function TextImageBlock({ block, reverse }) {
  if (!block) return null
  return (
    <div className="mb-16">
      <div
        className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${
          reverse ? 'lg:[direction:rtl]' : ''
        }`}
      >
        <div className={`lg:col-span-6 ${reverse ? 'lg:[direction:ltr]' : ''}`}>
          <div className="flex items-baseline gap-4 mb-5 border-b border-gray-100 pb-3">
            <h2 className="text-[22px] md:text-[26px] font-bold text-[#173B73]">
              {block.heading}
            </h2>
            {block.subheading && (
              <p className="text-[14px] text-gray-400 hidden sm:block">{block.subheading}</p>
            )}
          </div>
          {block.subheading && (
            <p className="text-[14px] text-gray-500 mb-4 sm:hidden">{block.subheading}</p>
          )}
          {block.bullets?.length > 0 && (
            <ul className="space-y-3">
              {block.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-2 text-[14px] md:text-[15px] text-gray-700 leading-relaxed">
                  <CheckIcon />
                  <span>
                    {bullet.title && <span className="font-semibold text-[#173B73]">{bullet.title}: </span>}
                    {bullet.text}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={`lg:col-span-6 ${reverse ? 'lg:[direction:ltr]' : ''}`}>
          {/* Сюда кладёшь либо обычное фото, либо картинку-схему/диаграмму */}
          <div className="rounded-lg overflow-hidden border border-gray-200 bg-gray-50 aspect-[4/3] flex items-center justify-center p-4">
            <Image
              src={block.image || '/images/placeholder-4-3.jpg'}
              alt={block.heading}
              width={640}
              height={480}
              className="w-full h-full object-contain"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// 5. Список соответствия стандартам/ГОСТам — карточки в ряд
// ─────────────────────────────────────────────
function StandardsList({ heading, items }) {
  if (!items?.length) return null
  return (
    <div className="mb-16">
      {heading && (
        <h2 className="text-[22px] md:text-[26px] font-bold text-[#173B73] mb-8 max-w-[760px]">
          {heading}
        </h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-lg p-5 hover:border-[#173B73] transition-colors duration-300"
          >
            <div className="w-8 h-8 mb-3 flex items-center justify-center text-[#173B73]">
              {item.icon ? (
                <Image src={item.icon} alt="" width={32} height={32} className="w-full h-full object-contain" />
              ) : (
                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                  <path d="M6 2h9l3 3v17H6V2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M9 8h6M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              )}
            </div>
            <p className="text-[14px] text-gray-600 leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// 6. Карточки товаров — фото + название + характеристики (чек-иконки)
// ─────────────────────────────────────────────
function ProductCards({ heading, products }) {
  if (!products?.length) return null
  return (
    <div className="mb-16">
      {heading && (
        <h2 className="text-[22px] md:text-[26px] font-bold text-[#173B73] mb-10 max-w-[760px]">
          {heading}
        </h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, i) => (
          <div key={i} className="flex flex-col border border-gray-200 rounded-lg overflow-hidden hover:border-[#173B73] transition-colors duration-300">
            <div className="aspect-square bg-gray-50 flex items-center justify-center p-6">
              <Image
                src={product.image || '/images/placeholder-square.jpg'}
                alt={product.name}
                width={260}
                height={260}
                className="w-full h-full object-contain"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h4 className="text-[15px] font-semibold text-[#173B73] mb-3 leading-snug">
                {product.name}
              </h4>
              {product.specs?.length > 0 && (
                <ul className="space-y-2 mt-auto">
                  {product.specs.map((spec, j) => (
                    <li key={j} className="flex items-start gap-2 text-[14px] text-gray-600 leading-relaxed">
                      <CheckIcon />
                      <span>
                        <span className="font-medium text-gray-800">{spec.title}: </span>
                        {spec.text}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// 6b. ГАЛЕРЕЯ ПО — сетка скриншотов программ (опциональный блок)
// ─────────────────────────────────────────────
function SoftwareGallery({ heading, subheading, items }) {
  if (!items?.length) return null
  return (
    <div className="mb-16">
      {heading && (
        <div className="flex items-baseline gap-4 mb-10 border-b border-gray-100 pb-3 max-w-[900px]">
          <h2 className="text-[22px] md:text-[26px] font-bold text-[#173B73]">
            {heading}
          </h2>
          {subheading && (
            <p className="text-[14px] text-gray-400 hidden sm:block">{subheading}</p>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col">
            <div className="aspect-[4/3] rounded-lg overflow-hidden border border-gray-200 bg-gray-50 mb-3">
              <Image
                src={item.image || '/images/placeholder-4-3.jpg'}
                alt={item.title}
                width={420}
                height={315}
                className="w-full h-full object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <p className="text-[14px] text-gray-700 leading-snug">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// 7. CTA-блок
// ─────────────────────────────────────────────
function CTA({ title, desc, ctaLabel, email = 'info@baitech.kg' }) {
  return (
    <div className="border-t border-b border-gray-200 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-gray-50/50 px-6 rounded-lg">
      <div>
        <h4 className="font-bold text-[16px] md:text-[18px] text-[#173B73]">{title}</h4>
        <p className="text-gray-500 text-[14px] md:text-[14px] mt-1">{desc}</p>
      </div>
      <a
        href={`mailto:${email}`}
        className="whitespace-nowrap inline-flex items-center gap-2 px-6 py-3 border border-[#173B73] text-[#173B73] hover:bg-[#173B73] hover:text-white text-[14px] uppercase tracking-wider font-medium transition-colors duration-300"
      >
        {ctaLabel}
        <GoArrowUpRight />
      </a>
    </div>
  )
}

// ─────────────────────────────────────────────
// ГЛАВНЫЙ КОМПОНЕНТ
// ─────────────────────────────────────────────
export default function SolutionDetailBlock({ solution }) {
  const { i18n } = useTranslation()
  const lang = ['ru', 'kg', 'en'].includes(i18n.language) ? i18n.language : 'ru'
  const uiT = solutionTranslations[lang]

  if (!solution) return null

  return (
    <div className="w-full text-[#1f2937] mt-12 pt-12 border-t border-gray-200 animate-fadeIn">
      <Hero solution={solution} />

      <AdvantagesRow
        heading={solution.advantagesHeading}
        items={solution.advantages}
      />

      {solution.textBlocks?.map((block, i) => (
        <TextImageBlock key={i} block={block} reverse={i % 2 === 1} />
      ))}

      <StandardsList
        heading={solution.standardsHeading}
        items={solution.standards}
      />

      <ProductCards
        heading={solution.productsHeading}
        products={solution.products}
      />

      <SoftwareGallery
        heading={solution.softwareHeading}
        subheading={solution.softwareSubheading}
        items={solution.software}
      />

      <CTA
        title={solution.ctaTitle || uiT.heroTitle}
        desc={solution.ctaDesc || uiT.heroDesc}
        ctaLabel={uiT.requestEstimate}
      />
    </div>
  )
}
