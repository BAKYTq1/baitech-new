import AboutCompany from '@/components/aboutcompany/AboutCompany'
import React from 'react'

export const metadata = {
  title: 'О компании Baitech',
  description: 'Baitech — магазин систем безопасности и видеонаблюдения в Бишкеке. Узнайте о нашей компании, опыте, установке и поддержке оборудования.',
  alternates: { canonical: 'https://baitech.kg/about' },
  openGraph: {
    title: 'О компании Baitech',
    description: 'Магазин систем безопасности и видеонаблюдения в Бишкеке. Установка и настройка оборудования для дома и бизнеса.',
    url: 'https://baitech.kg/about',
    siteName: 'Baitech',
    locale: 'ru_KG',
    type: 'website',
  },
}

function About() {
  return (
    <>
      <AboutCompany />
    </>
  )
}

export default About
