import TermsOfUse from '@/components/termofuse/TermOfUse'
import React from 'react'

export const metadata = {
  title: 'Условия использования Baitech',
  description: 'Ознакомьтесь с условиями использования сайта Baitech.kg, правилами работы с каталогом и покупками.',
  alternates: { canonical: 'https://baitech.kg/terms' },
}

function page() {
  return (
    <>
      <TermsOfUse />
    </>
  )
}

export default page

