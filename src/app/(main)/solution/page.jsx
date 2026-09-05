import CorporateBlock from '@/components/solution/CorporateBlock'
import React from 'react'

export const metadata = {
  title: "Решения по безопасности для дома и бизнеса в Бишкеке",
  description:
    "Комплексные решения по безопасности: видеонаблюдение, СКУД, системы контроля доступа, охранная сигнализация и техническая поддержка в Бишкеке.",
  keywords: [
    "решения по безопасности Бишкек",
    "системы безопасности Бишкек",
    "видеонаблюдение Бишкек",
    "СКУД Бишкек",
    "охранная сигнализация Бишкек",
  ],
  alternates: { canonical: "https://baitech.kg/solution" },
  openGraph: {
    title: "Решения по безопасности для дома и бизнеса",
    description: "Системы видеонаблюдения, контроля доступа и охраны под ключ в Бишкеке.",
    url: "https://baitech.kg/solution",
    siteName: "Baitech",
    locale: "ru_KG",
    type: "website",
  },
}

function page() {
  return (
    <>
      <CorporateBlock/>
    </>
  )
}

export default page