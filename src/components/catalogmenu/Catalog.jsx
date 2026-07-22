'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import styles from './CatalogMenu.module.scss';
import { ChevronRight, Loader2 } from 'lucide-react';
import { useProducts } from '@/lib/products/hooks/hooks';
import { productApi } from '@/lib/products/api/useProducts';
import { CATEGORY_ICONS, DEFAULT_CATEGORY_ICON } from './Categoryicons';

export default function Catalog({ onClose }) {
  const router = useRouter();
  const { categories, brands: allBrands, isLoading } = useProducts();

  const [activeCategory, setActiveCategory] = useState(null);
  // hoveredSub теперь может быть как подкатегорией (уровень 2), так и под-подкатегорией (уровень 3)
  const [hoveredSub, setHoveredSub] = useState(null);
  const [subBrands, setSubBrands] = useState([]);
  const [brandsBySubId, setBrandsBySubId] = useState({});
  const [isBrandsLoading, setIsBrandsLoading] = useState(false);

  const hideTimer = useRef(null);
  const currentCategory = activeCategory ?? categories?.[0] ?? null;

  const fetchBrandsForSub = useCallback(async (sub) => {
    try {
      const data = await productApi.getByCategory(sub.name);
      const products = data.results || data;
      const brandIds = [...new Set(products.map((p) => p.brand))];
      return (allBrands || []).filter((brand) => brandIds.includes(brand.id));
    } catch (error) {
      console.error(error);
      return [];
    }
  }, [allBrands]);

  // Предзагружаем бренды только для "листовых" элементов:
  // — подкатегорий (уровень 2) БЕЗ своих детей
  // — всех под-подкатегорий (уровень 3), т.к. у них дальше вложенности нет
  useEffect(() => {
    const preloadBrands = async () => {
      const subcategories = currentCategory?.subcategories || [];
      const leafSubs = subcategories.filter((sub) => !sub.subcategories?.length);
      const allChildren = subcategories.flatMap((sub) => sub.subcategories || []);
      const allItems = [...leafSubs, ...allChildren];
      const missingSubs = allItems.filter((item) => !(item.id in brandsBySubId));

      if (missingSubs.length === 0) return;

      const loadedEntries = await Promise.all(
        missingSubs.map(async (item) => [item.id, await fetchBrandsForSub(item)])
      );

      setBrandsBySubId((prev) => ({
        ...prev,
        ...Object.fromEntries(loadedEntries),
      }));
    };

    preloadBrands();
  }, [brandsBySubId, currentCategory, fetchBrandsForSub]);

  // Универсальный обработчик — работает и для подкатегории, и для под-подкатегории
  const handleSubMouseEnter = async (item) => {
    clearTimeout(hideTimer.current);

    const cachedBrands = brandsBySubId[item.id];
    if (cachedBrands) {
      if (cachedBrands.length === 0) {
        setHoveredSub(null);
        setSubBrands([]);
        return;
      }
      setHoveredSub(item);
      setSubBrands(cachedBrands);
      return;
    }

    setIsBrandsLoading(true);
    const brands = await fetchBrandsForSub(item);
    setBrandsBySubId((prev) => ({ ...prev, [item.id]: brands }));
    setIsBrandsLoading(false);

    if (brands.length === 0) {
      setHoveredSub(null);
      setSubBrands([]);
      return;
    }
    setHoveredSub(item);
    setSubBrands(brands);
  };

  const handleSubMouseLeave = () => {
    hideTimer.current = setTimeout(() => {
      setHoveredSub(null);
      setSubBrands([]);
    }, 150);
  };

  const handlePopupMouseEnter = () => clearTimeout(hideTimer.current);

  const handlePopupMouseLeave = () => {
    hideTimer.current = setTimeout(() => {
      setHoveredSub(null);
      setSubBrands([]);
    }, 150);
  };

  const handleCategoryClick = (category) => {
    onClose();
    router.push(`/catalog?category=${encodeURIComponent(category.name)}`);
  };

  const handleSubcategoryClick = (subcategory) => {
    onClose();
    router.push(`/catalog?category=${encodeURIComponent(subcategory.name)}`);
  };

  const handleBrandClick = (sub, brandId) => {
    onClose();
    router.push(`/catalog?category=${encodeURIComponent(sub.name)}&brand=${brandId}`);
  };

  if (isLoading) {
    return (
      <div className={styles.overlay}>
        <Loader2 className={styles.spinner} />
      </div>
    );
  }

  const subcategories = currentCategory?.subcategories || [];
  const half = Math.ceil(subcategories.length / 2);
  const col1 = subcategories.slice(0, half);
  const col2 = subcategories.slice(half);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${styles.catalogContainer} container`}
      >
        <aside className={styles.sidebar}>
          {categories?.map((category) => (
            <button
              key={category.id}
              className={`${styles.navButton} ${currentCategory?.id === category.id ? styles.active : ''}`}
              onMouseEnter={() => setActiveCategory(category)}
              onClick={() => handleCategoryClick(category)}
            >
              <div className={styles.navLeft}>
                <span className={styles.icon}>
                  {CATEGORY_ICONS[category.id] ?? DEFAULT_CATEGORY_ICON}
                </span>
                <span className={styles.label}>{category.name}</span>
              </div>
              <ChevronRight size={14} className={styles.chevron} />
            </button>
          ))}
        </aside>

        {currentCategory && (
          <main className={styles.content}>
            {subcategories.length > 0 ? (
              <div className={styles.columnsWrap}>
                {[col1, col2].map((col, colIdx) => (
                  <div key={colIdx} className={styles.subColumn}>
                    {col.map((sub) => {
                      const hasChildren = sub.subcategories?.length > 0;
                      // Попап брендов у уровня 2 показываем только если у sub НЕТ своих детей —
                      // иначе за бренды отвечают уже дочерние под-подкатегории
                      const hasBrands = !hasChildren && (brandsBySubId[sub.id] || []).length > 0;

                      return (
                        <div key={sub.id} className={styles.subGroup}>
                          <button
                            className={`${styles.subTitle} ${hoveredSub?.id === sub.id ? styles.subTitleActive : ''}`}
                            onMouseEnter={() => {
                              if (!hasChildren) handleSubMouseEnter(sub);
                            }}
                            onMouseLeave={handleSubMouseLeave}
                            onClick={() => handleSubcategoryClick(sub)}
                          >
                            {sub.name}
                            {hasBrands && (
                              <ChevronRight size={13} className={styles.subChevron} />
                            )}

                            {hoveredSub?.id === sub.id && hasBrands && (
                              <div
                                className={styles.brandsPopup}
                                onMouseEnter={handlePopupMouseEnter}
                                onMouseLeave={handlePopupMouseLeave}
                                onClick={(e) => e.stopPropagation()}
                              >
                                {isBrandsLoading ? (
                                  <div className={styles.popupLoader}>
                                    <Loader2 size={16} className={styles.spinner} />
                                  </div>
                                ) : (
                                  <ul className={styles.brandsList}>
                                    {subBrands.map((brand) => (
                                      <li key={brand.id}>
                                        <button
                                          className={styles.brandItem}
                                          onClick={() => handleBrandClick(hoveredSub, brand.id)}
                                        >
                                          {brand.name}
                                        </button>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            )}
                          </button>

                          {sub.subcategories?.length > 0 && (
                            <ul className={styles.subList}>
                              {sub.subcategories.map((child) => {
                                const childHasBrands = (brandsBySubId[child.id] || []).length > 0;

                                return (
                                  <li key={child.id} className={styles.subGroup1}>
                                    <button
                                      className={`${styles.subItem} ${hoveredSub?.id === child.id ? styles.subItemActive : ''}`}
                                      onMouseEnter={() => handleSubMouseEnter(child)}
                                      onMouseLeave={handleSubMouseLeave}
                                      onClick={() => handleSubcategoryClick(child)}
                                    >
                                      {child.name}
                                      {childHasBrands && (
                                        <ChevronRight size={12} className={styles.subChevron} />
                                      )}

                                      {hoveredSub?.id === child.id && childHasBrands && (
                                        <div
                                          className={styles.brandsPopup}
                                          onMouseEnter={handlePopupMouseEnter}
                                          onMouseLeave={handlePopupMouseLeave}
                                          onClick={(e) => e.stopPropagation()}
                                        >
                                          {isBrandsLoading ? (
                                            <div className={styles.popupLoader}>
                                              <Loader2 size={16} className={styles.spinner} />
                                            </div>
                                          ) : (
                                            <ul className={styles.brandsList}>
                                              {subBrands.map((brand) => (
                                                <li key={brand.id}>
                                                  <button
                                                    className={styles.brandItem}
                                                    onClick={() => handleBrandClick(hoveredSub, brand.id)}
                                                  >
                                                    {brand.name}
                                                  </button>
                                                </li>
                                              ))}
                                            </ul>
                                          )}
                                        </div>
                                      )}
                                    </button>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles.empty}>Нет подкатегорий</p>
            )}
          </main>
        )}
      </div>
    </div>
  );
}