"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Camera,
  Bell,
  Wifi,
  Cpu,
  Keyboard,
  Printer,
  Zap,
  Home,
  Monitor,
  HardDrive,
  LayoutGrid,
} from "lucide-react";
import styles from "./ProductCategories.module.scss";
import { productCategories } from "./categoriesList";

const ICONS = {
  camera: Camera,
  bell: Bell,
  wifi: Wifi,
  cpu: Cpu,
  keyboard: Keyboard,
  printer: Printer,
  zap: Zap,
  home: Home,
  monitor: Monitor,
  disk: HardDrive,
};

export default function ProductCategories({ items = productCategories }) {
  const { t } = useTranslation();

  if (!items.length) return null;

  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <div>
          <h2 className={styles.title}>
            {t("productCategories.title", "Категории товаров")}
          </h2>  
        </div>

        <Link href="/catalog" className={styles.all}>
          {t("productCategories.all", "Смотреть все")}
          <ArrowRight size={18} />
        </Link>
      </div>

      <div className={styles.grid}>
        {items.map((item) => {
          const Icon = ICONS[item.icon] || LayoutGrid;
          return (
            <Link
              key={item.category}
              href={`/catalog?category=${encodeURIComponent(item.category)}`}
              className={styles.card}
              style={
                item.image
                  ? {
                      backgroundImage: `url("${item.image.src ?? item.image}")`,
                    }
                  : undefined
              }
            >
              <span className={styles.icon}>
                <Icon size={22} />
              </span>
              <span className={styles.info}>
                <span className={styles.name}>
                  {t(
                    `productCategories.names.${item.key}`,
                    item.title || item.category,
                  )}
                </span>
                {item.count != null && (
                  <span className={styles.count}>
                    {item.count} {t("productCategories.items", "товаров")}
                  </span>
                )}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
