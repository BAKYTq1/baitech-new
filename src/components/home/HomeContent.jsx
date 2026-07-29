// components/HomeContent/HomeContent.jsx
'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Banner } from '../banner/Banner';
import Features from '../features/Features';
import CatalogButton from '../catalogbutton/CatalogButton';
import { Recommendations } from '../recomendation/Recommendations';
import { News } from '../News/News';
import Partners from '../services/Partners';

function HomeInner() {
  const searchParams = useSearchParams();
  const categoryName = searchParams.get('category');
  const hasCategoryPreview = Boolean(categoryName);

  return (
    <div>
      <Banner categoryName={categoryName} />
      <CatalogButton />
      <Features categoryName={hasCategoryPreview ? categoryName : null} />
      <Recommendations categoryName={hasCategoryPreview ? categoryName : null} />
      <News />
      <Partners/>
    </div>
  );
}
export default function HomeContent() {
  return (
    <Suspense fallback={null}>
      <HomeInner />
    </Suspense>
  );
}