"use client";
import React, { useMemo } from "react";
import Image from "next/image";
import styles from "./Partners.module.css";
import { useTranslation } from "react-i18next";

import logo03 from "../../../assets/svg/3.svg";
import logo04 from "../../../assets/svg/4.svg";
import logo05 from "../../../assets/svg/5.svg";
import logo06 from "../../../assets/svg/6.svg";
import logo07 from "../../../assets/svg/7.svg";
import logo08 from "../../../assets/svg/8.svg";
import logo10 from "../../../assets/svg/10.svg";
import logo11 from "../../../assets/svg/11.jpg";
import logo12 from "../../../assets/svg/12.svg";
import logo14 from "../../../assets/svg/14.jpg";
import logo15 from "../../../assets/svg/15.jpg";
import logo16 from "../../../assets/svg/16.svg";
import logo17 from "../../../assets/svg/17.svg";
import logo19 from "../../../assets/svg/19.svg";
import Customers1 from "../../../assets/png/Customers1.jpg";
import Customers2 from "../../../assets/png/Customers2.jpg";
import Customers3 from "../../../assets/png/Customers3.jpg";
import Customers4 from "../../../assets/png/Customers4.jpg";
import Customers6 from "../../../assets/png/Customers6.jpg";
import Customers7 from "../../../assets/png/Customers7.jpg";
import Customers10 from "../../../assets/png/Customers10.jpg";
import Customers11 from "../../../assets/png/Customers11.jpg";
import Customers12 from "../../../assets/png/Customers12.jpg";
import Customers13 from "../../../assets/png/Customers13.png";
import Customers14 from "../../../assets/png/Customers14.jpg";
import Customers15 from "../../../assets/png/Customers15.jpg";
import Customers16 from "../../../assets/png/Customers16.jpg";
import Customers17 from "../../../assets/png/Customers17.png";
import Customers18 from "../../../assets/png/Customers18.jpg";
import Customers19 from "../../../assets/png/Customers19.png";
import Customers20 from "../../../assets/png/Customers20.jpg";
import Customers21 from "../../../assets/png/Customers21.png";
import Customers22 from "../../../assets/png/Customers22.jpg";
import Customers23 from "../../../assets/png/Customers23.png";
import Customers24 from "../../../assets/png/Customers24.jpg";
import Customers25 from "../../../assets/png/Customers25.webp";
import Customers26 from "../../../assets/png/Customers26.png";

const CUSTOMER_LOGO_SCALE = 1;

const DEFAULT_PARTNERS = [
  // ---- Партнёры с логотипами ----
  { src: logo03, name: "ЭЛ АРАЛЫК кувейт университети", scale: 2.1 },
  { src: logo04, name: "Детский сад ЛУНТИК", scale: 2.0 },
  { src: logo05, name: "Металлопрокатный завод им. Фрунзе", scale: 1.8 },
  { src: logo06, name: "MAGNAT FITNESS", scale: 2.1 },
  { src: logo07, name: "LOGA роботов", scale: 2.3 },
  { src: logo08, name: "OLOLO creative hubs", scale: 3.3 },
  { src: logo10, name: "UNITED WORLD INTERNATIONAL SCHOOL", scale: 2.7 },
  { src: logo11, name: "ГАЗПРОМ школа свабодный", scale: 1.2 },
  { src: logo12, name: "БШЗ Бишкекский штамповочный завод", scale: 3.5 },
  { src: logo14, name: "NOVA Билим беруу мекемеси", scale: 1.4 },
  { src: logo15, name: "Международный аэропорт «Манас»" },
  { src: logo16, name: "MD Центр косметологии и оброзавания", scale: 2.5 },
  { src: logo17, name: "Dasmia", scale: 1.9 },
  { src: logo19, name: "Impulse", scale: 2.3 },

  // ---- Заказчики ----
  {
    src: Customers4,
    scale: CUSTOMER_LOGO_SCALE,
    name: "БМ Групп",
    kind: "Офис",
  },
  {
    src: Customers3,
    scale: CUSTOMER_LOGO_SCALE,
    name: "Бишкек Арена Фитнес",
    kind: "Спорт",
  },
  {
    src: Customers6,
    scale: CUSTOMER_LOGO_SCALE,
    name: "Президентский лицей «Акылман»",
    kind: "Образование",
  },
  { src: Customers12, name: "ЖК «Сандык»", kind: "Жилой комплекс" },
  { src: Customers13, name: "ЖК «Чырак»", kind: "Жилой комплекс" },
  { src: Customers25, name: "Бетонный завод", kind: "Балыкчы" },
  { src: Customers26, name: "Мечеть Сарахси", kind: "Религиозный объект" },
  { src: Customers14, name: "Хостел «Тамга»", kind: "Гостиница" },
  { src: Customers15, name: "Пансионат «Кооператор»", kind: "Отдых", scale: 1.2 },
  { src: Customers16, name: "Пансионат «Alpha White»", kind: "Иссык-Куль" },
  { src: Customers17, name: "Adal Resort", kind: "Курорт" },
  { name: "Uzbek Resort", kind: "Курорт" },
  { src: Customers19, name: "Ala-Too Resort", kind: "Курорт", scale: 1.8 },
  { src: logo12, name: "БШЗ Бишкекский штамповочный завод", kind: "Производство", scale: 3.5 },
  { src: Customers13, name: "ЖК «Елисейские поля»", kind: "Жилой комплекс" },
  { src: Customers18, name: "Школа MIT-2", kind: "Образование" },
  {
    src: Customers2,
    scale: CUSTOMER_LOGO_SCALE,
    name: "Дом Правительства",
    kind: "Госучреждение",
    scale: 1.2,
  },
  { src: Customers20, name: "КЭМП Ала-Тоо", kind: "Отдых", scale: 1.1 },
  { src: logo15, name: "Международный аэропорт «Манас»", kind: "Аэропорт" },
  { src: Customers21, name: "Аэропорт Джалал-Абад", kind: "Аэропорт" },
  {
    src: Customers10,
    scale: CUSTOMER_LOGO_SCALE,
    name: "Международный аэропорт «Ош»",
    kind: "Аэропорт",
    scale: 1.4,
  },
  { src: Customers22, name: "Фитнес-клуб «Импульс-1»", kind: "Спорт" },
  { src: Customers22, name: "Фитнес-клуб «Импульс-2»", kind: "Спорт" },
  { src: Customers23, name: "Вилла «Салкын-Тор»", kind: "Частный объект" },
  { src: Customers25, name: "Аттракцион", kind: "Балыкчы" },
  { src: Customers24, name: "Колледж «Интеллект»", kind: "Образование" },
  {
    src: Customers11,
    scale: CUSTOMER_LOGO_SCALE,
    name: "Генпрокуратура",
    kind: "Госучреждение",
  },
  {
    src: Customers1,
    scale: CUSTOMER_LOGO_SCALE,
    name: "Школа им. Ломоносова",
    kind: "Образование",
  },
  { src: Customers7, scale: CUSTOMER_LOGO_SCALE, name: "МИД", kind: "Бишкек" },
];

const ROWS = 3;
const MIN_PER_ROW = 6; // чтобы ряд всегда был шире экрана
const SECONDS_PER_ITEM = 9; // больше = медленнее

// Делим партнёров на 3 ряда по очереди: 1-й → ряд 1, 2-й → ряд 2, ...
function splitIntoRows(list, rows) {
  const result = Array.from({ length: rows }, () => []);
  list.forEach((p, i) => result[i % rows].push(p));
  return result.filter((r) => r.length > 0);
}

// Повторяем короткий ряд, пока не станет достаточно элементов
function fillRow(row) {
  if (row.length === 0) return row;
  const out = [...row];
  while (out.length < MIN_PER_ROW) out.push(...row);
  return out;
}

function PartnerItem({ partner, hidden }) {
  const content = (
    <>
      {partner.src ? (
        <span className={styles.logoBox}>
          <Image
            className={styles.logo}
            src={partner.src}
            alt=""
            width={320}
            height={200}
            quality={90}
            draggable={false}
            style={{
              objectFit: partner.fit || "contain",
              transform:
                partner.scale && partner.scale !== 1
                  ? `scale(${partner.scale})`
                  : undefined,
            }}
          />
        </span>
      ) : null}
      <span className={styles.text}>
        {partner.kind ? (
          <span className={styles.kind}>{partner.kind}</span>
        ) : null}
        <span className={styles.name}>{partner.name}</span>
      </span>
    </>
  );

  return (
    <li className={styles.item} aria-hidden={hidden || undefined}>
      <span className={styles.dot} aria-hidden="true" />
      {partner.href ? (
        <a
          className={styles.link}
          href={partner.href}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={hidden ? -1 : undefined}
        >
          {content}
        </a>
      ) : (
        content
      )}
    </li>
  );
}

export default function Partners({ partners = DEFAULT_PARTNERS }) {
  const { t } = useTranslation();

  const rows = useMemo(
    () => splitIntoRows(partners, ROWS).map(fillRow),
    [partners],
  );

  if (partners.length === 0) {
    return (
      <section className={styles.section}>
        <h2 className={styles.title}>
          {t("ClientsAndPartners", "Заказчики и партнёры")}
        </h2>
        <p className={styles.empty}>Список партнёров скоро появится.</p>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        {t("ClientsAndPartners", "Заказчики и партнёры")}
      </h2>

      <div className={styles.rows}>
        {rows.map((row, rowIndex) => {
          // ряд 1 — влево, ряд 2 — вправо, ряд 3 — влево
          const reverse = rowIndex % 2 === 1;
          const duration = row.length * SECONDS_PER_ITEM;

          return (
            <div className={styles.row} key={rowIndex}>
              <ul
                className={`${styles.track} ${reverse ? styles.toRight : styles.toLeft}`}
                style={{ animationDuration: `${duration}s` }}
              >
                {/* Две одинаковые копии: анимация сдвигает на -50%,
                    и вторая копия бесшовно занимает место первой */}
                {[0, 1].map((copy) =>
                  row.map((partner, i) => (
                    <PartnerItem
                      key={`${copy}-${i}`}
                      partner={partner}
                      hidden={copy === 1 || i >= partners.length}
                    />
                  )),
                )}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
