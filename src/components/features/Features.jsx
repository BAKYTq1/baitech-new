'use client';
import React from 'react';
import './style.scss';
import { useRouter } from 'next/navigation';
import { useProducts } from '@/lib/products/hooks/hooks';
import { useTranslation } from 'react-i18next';

import HivideoImg from '../../../assets/png/HIVIDEO.png';
import LinkffImg from '../../../assets/png/LinkFF.png';
import HikvisionImg from '../../../assets/png/HIKVISION.png';
import TplinkImg from '../../../assets/png/tp-link.png';
import DahuaImg from '../../../assets/png/dahua.png';
import AjaxImg from '../../../assets/png/ajax.png';
import PantumImg from '../../../assets/png/PANTUM.png';
import MsiImg from '../../../assets/png/msi.png';
import CanonImg from '../../../assets/png/canon.png';
import Image from 'next/image';

// Какие бренды показывать для каждой категории
const CATEGORY_BRANDS = {
  all:   ['ajax', 'dahua', 'hikvision', 'pantum', 'linkff'], // главная
  video: ['ajax', 'dahua', 'hikvision', 'hivideo ', 'linkff'],   // Видеонаблюдение
  pc:    ['tplink', 'canon', 'msi', 'pantum', 'linkff'],                  // Комплектующие ПК
};

const VIDEO_MATCHERS = ['видеонаблюд', 'камер', 'cctv'];
const PC_MATCHERS = ['комплектующ', 'компьютер', 'пк'];

const BRAND_META = {
  hivideo:   { image: HivideoImg },
  linkff:    { image: LinkffImg },
  hikvision: { image: HikvisionImg },
  tplink:    { image: TplinkImg },
  dahua:     { image: DahuaImg },
  ajax:      { image: AjaxImg },
  pantum:    { image: PantumImg },
  msi:       { image: MsiImg },
  canon:     { image: CanonImg },
};

function Features({ categoryName }) {
  const { brands, isInitialLoading } = useProducts();
  const router = useRouter();

  const getCategoryBrands = () => {
    if (!categoryName) return CATEGORY_BRANDS.all;
    const lower = categoryName.toLowerCase();
    if (VIDEO_MATCHERS.some((m) => lower.includes(m))) return CATEGORY_BRANDS.video;
    if (PC_MATCHERS.some((m) => lower.includes(m))) return CATEGORY_BRANDS.pc;
    return CATEGORY_BRANDS.all;
  };

  const allowedKeys = getCategoryBrands();

  if (isInitialLoading) {
    return (
      <div className="features">
        <div className="features__container container">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="feature-card feature-card--skeleton" />
          ))}
        </div>
      </div>
    );
  }

  const filteredBrands = brands
    .filter((brand) => {
      const key = brand.name?.toLowerCase().replace(/[\s-]/g, '');
      return allowedKeys.some((k) => key?.includes(k) || k.includes(key));
    });

  if (filteredBrands.length === 0) return null;

  
  return (
    <div className="features">
      <div className="features__container">
        {filteredBrands.map((brand) => {
          const key = Object.keys(BRAND_META).find((k) =>
            brand.name?.toLowerCase().replace(/[\s-]/g, '').includes(k) ||
            k.includes(brand.name?.toLowerCase().replace(/[\s-]/g, ''))
          );
          const meta = BRAND_META[key];
          if (!meta) return null;

          return (
            <div
              key={brand.id}
              className="feature-card"
              onClick={() => router.push(`/catalog/?brand=${brand.id}`)}
            >
              <Image
                className="feature-card__full-img"
                src={meta.image.src ?? meta.image}
                alt={brand.name}
                draggable={false}
                fill
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Features;