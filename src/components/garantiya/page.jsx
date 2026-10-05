"use client";
import { useTranslation } from "react-i18next";
import Breadcrumb from "../product/ui/Breadcrumb/Breadcrumb.jsx";
import styles from "./Warranty.module.scss";
import { warranty } from "./warrantyContent";

export default function WarrantyPage() {
  const { t } = useTranslation();

  const crumbs = [
    { label: t("aboutCompany.breadcrumbs.home"), path: "/" },
    { label: t("footer.information.warranty", "Гарантия"), path: "" },
  ];
  return (
    <div className={styles.page}>
      <Breadcrumb items={crumbs} />
      <article className={styles.card}>
        <h1 className={styles.title}>{warranty.title}</h1>
        <h2 className={styles.subtitle}>{warranty.subtitle}</h2>

        <p className={styles.intro}>{warranty.intro}</p>

        <ol className={styles.list}>
          {warranty.terms.map((term, i) =>
            term.heading ? (
              <li key={i} className={styles.headingBlock}>
                <h3 className={styles.sectionHeading}>
                  {i + 1}. {term.text}
                </h3>
                <ol className={styles.subList}>
                  {term.sub.map((s, j) => (
                    <li key={j} className={styles.item}>
                      <span className={styles.num}>
                        {i + 1}.{j + 1}.
                      </span>
                      <p>{s}</p>
                    </li>
                  ))}
                </ol>
              </li>
            ) : (
              <li key={i} className={styles.item}>
                <span className={styles.num}>{i + 1}.</span>
                <div className={styles.body}>
                  <p>{term.text}</p>
                </div>
              </li>
            ),
          )}
        </ol>

        <h2 className={styles.subtitle}>{warranty.excludedTitle}</h2>
        <ol className={styles.list}>
          {warranty.excluded.map((text, i) => (
            <li key={i} className={styles.item}>
              <span className={styles.num}>{i + 1}.</span>
              <p>{text}</p>
            </li>
          ))}
        </ol>

        <div className={styles.notice}>
          <h3>{warranty.noticeTitle}</h3>
          <p>{warranty.notice}</p>
        </div>
      </article>
    </div>
  );
}
