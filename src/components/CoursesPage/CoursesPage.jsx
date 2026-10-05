"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { ArrowLeft, Check, X, Plus, Phone, Mail } from "lucide-react";
import styles from "./CoursesPage.module.scss";
import team from "./img/team.jpeg";
import Azamat from "./img/Azamat.png";
import eldar from "./img/eldar.png";
import kairat from "./img/kairat.png";
import alex from "./img/alex.png";
import img1 from "./img/img1.png";
import img2 from "./img/img2.png";
import { useSheetConfig, safeLink } from "./useSheetConfig";

const WHATSAPP_LINK_1 = "https://wa.me/996505406805";
const WHATSAPP_LINK_2 = "https://wa.me/996558000222";
const INSTAGRAM_LINK = "https://www.instagram.com/baitech.kg/";

// Аватарки — привязаны к индексу отзыва в JSON (0: Азамат, 1: Эльдар, 2: Кайрат, 3: Алекс)
const REVIEW_AVATARS = [Azamat, eldar, kairat, alex];

export default function CoursesPage() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { config: sheet, loaded } = useSheetConfig();
  const lang = (i18n.language || "ru").slice(0, 2);

  const heroBtn = {
    text: sheet.herobutton?.[lang] || t("coursesPage.ctaButtonUpper"),
    link: safeLink(sheet.herobutton?.link, WHATSAPP_LINK_1),
  };
  const topicsBtn = {
    text: sheet.topicsbutton?.[lang] || t("coursesPage.ctaButton"),
    link: safeLink(sheet.topicsbutton?.link, WHATSAPP_LINK_1),
  };
  const [openModules, setOpenModules] = useState(new Set([0]));
  const [isStoryOpen, setIsStoryOpen] = useState(false);

  const asArray = (value) => (Array.isArray(value) ? value : []);

  const topics = asArray(t("coursesPage.topics", { returnObjects: true }));
  const formatItems = asArray(
    t("coursesPage.formatItems", { returnObjects: true }),
  );
  const resultItems = asArray(
    t("coursesPage.resultItems", { returnObjects: true }),
  );
  const features = asArray(t("coursesPage.features", { returnObjects: true }));
  const modules = asArray(t("coursesPage.modules", { returnObjects: true }));
  const reviews = asArray(t("coursesPage.reviews", { returnObjects: true }));

  const toggleModule = (index) => {
    setOpenModules((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  useEffect(() => {
    if (!isStoryOpen) return;
    const handleEscape = (e) => {
      if (e.key === "Escape") setIsStoryOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isStoryOpen]);

  return (
    <div className={styles.page}>
      {/* Hero-блок */}
      <section className={styles.heroSection}>
        <Image src={img1} alt="" fill priority className={styles.heroBgImage} />
        <div className={`${styles.heroBackWrapper} container`}>
          <button
            type="button"
            className={styles.heroBackBtn}
            onClick={() => router.back()}
          >
            <ArrowLeft size={18} />
            <span>{t("coursesPage.back")}</span>
          </button>
        </div>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContainer}>
          <div className={styles.heroBadge}>{t("coursesPage.badge")}</div>
          <h1 className={styles.heroTitle}>
            {t("coursesPage.heroTitleStart")}{" "}
            <span className={styles.heroGreenText}>
              {t("coursesPage.heroTitleGreen")}
            </span>
            <br />
            <span>{t("coursesPage.heroTitleHighlight")}</span>
            <br />
            {t("coursesPage.heroTitleEnd")}
          </h1>
          <p className={styles.heroSubtitle}>{t("coursesPage.heroSubtitle")}</p>
          {loaded ? (
            <a
              href={heroBtn.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.greenBtn}
            >
              {heroBtn.text}
            </a>
          ) : (
            <span
              className={`${styles.greenBtn} ${styles.btnSkeleton}`}
              aria-hidden="true"
            >
              <i />
              <i />
              <i />
            </span>
          )}
        </div>
      </section>

      {/* Темы курса */}
      <section className={styles.topicsSection}>
        <div className={styles.sectionInner}>
          <div className={styles.topicsLayout}>
            <div className={styles.topicsWhiteCard}>
              <h2 className={styles.mainTitle}>
                {t("coursesPage.topicsTitleLine1")}
                <br />
                {t("coursesPage.topicsTitleLine2")}
              </h2>

              <div className={styles.topicsList}>
                {topics.map((topic) => (
                  <div key={topic.title} className={styles.topicItem}>
                    <h3 className={styles.topicTitle}>{topic.title}</h3>
                    <p className={styles.topicText}>{topic.text}</p>
                  </div>
                ))}
              </div>

              <div className={styles.topicsCta}>
                {loaded ? (
                  <a
                    href={topicsBtn.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.greenBtn}
                  >
                    {topicsBtn.text}
                  </a>
                ) : (
                  <span
                    className={`${styles.greenBtn} ${styles.btnSkeleton}`}
                    aria-hidden="true"
                  >
                    <i />
                    <i />
                    <i />
                  </span>
                )}
              </div>
            </div>

            <div className={styles.topicsRight}>
              <div className={styles.imageWrapper}>
                <Image
                  src={team}
                  alt="Практические занятия"
                  fill
                  className={styles.groupImage}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Карточки */}
      <section className={styles.cardsSection}>
        <div className={styles.sectionInner}>
          <div className={styles.bottomCardsGrid}>
            <div className={styles.infoCard}>
              <div className={styles.cardHeader}>
                <div className={styles.iconCap}>🎓</div>
                <h3 className={styles.cardTitle}>
                  {t("coursesPage.formatCardTitle")}
                </h3>
              </div>
              <ul className={styles.checkList}>
                {formatItems.map((item) => (
                  <li key={item}>
                    <span className={styles.dot}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.cardHeader}>
                <div className={styles.iconBulb}>💡</div>
                <h3 className={styles.cardTitle}>
                  {t("coursesPage.resultCardTitle")}
                </h3>
              </div>
              <ul className={styles.checkList}>
                {resultItems.map((item) => (
                  <li key={item}>
                    <span className={styles.dot}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* История */}
      <section className={styles.storySection}>
        <Image
          src={img2}
          alt="История ученика"
          fill
          className={styles.storyBgImage}
          unoptimized
        />

        <div className={styles.storyOverlay}></div>

        <div className={styles.storyContent}>
          <h2 className={styles.storyTitle}>
            {t("coursesPage.storyTitleLine1")}
            <br />
            {t("coursesPage.storyTitleLine2")}
          </h2>

          <button
            type="button"
            onClick={() => setIsStoryOpen(true)}
            className={styles.openBtn}
          >
            <span>{t("coursesPage.storyOpenBtn")}</span>
          </button>
        </div>
      </section>

      {/* Что вы получите */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionCenterTitle}>
            {t("coursesPage.featuresSectionTitle")}
          </h2>
          <div className={styles.featuresGrid}>
            {features.map((feat) => (
              <div key={feat.title} className={styles.featureCard}>
                <div className={styles.checkIconWrapper}>
                  <Check size={28} strokeWidth={3} />
                </div>
                <h3 className={styles.featureTitle}>{feat.title}</h3>
                <p className={styles.featureText}>{feat.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Программа курса */}
      <section className={styles.programSection}>
        <div className={styles.sectionInner}>
          <h2 className={styles.programTitle}>
            {t("coursesPage.programSectionTitle")}
          </h2>
          <div className={styles.accordionContainer}>
            {modules.map((moduleItem, index) => {
              const isOpen = openModules.has(index);
              return (
                <div
                  key={moduleItem.title}
                  className={`${styles.accordionItem} ${isOpen ? styles.itemOpen : ""}`}
                >
                  <button
                    type="button"
                    className={styles.accordionHeader}
                    onClick={() => toggleModule(index)}
                  >
                    <span className={styles.accordionTitle}>
                      {moduleItem.title}
                    </span>
                    <span className={styles.accordionIcon}>
                      <X size={20} className={styles.iconX} />
                      <Plus size={20} className={styles.iconPlus} />
                    </span>
                  </button>

                  <div className={styles.accordionBody}>
                    <div className={styles.accordionInner}>
                      {moduleItem.lessons.map((lesson, lessonIndex) => (
                        <p key={lesson} className={styles.lessonRow}>
                          <span className={styles.lessonLabel}>
                            {t("coursesPage.lessonLabel")} {lessonIndex + 1}.
                          </span>{" "}
                          <span className={styles.lessonName}>{lesson}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Отзывы */}
      <section className={styles.reviewsSection}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionCenterTitle}>
            {t("coursesPage.reviewsSectionTitle")}
          </h2>
          <div className={styles.reviewsGrid}>
            {reviews.map((rev, index) => (
              <div key={rev.name} className={styles.reviewCard}>
                <div className={styles.reviewAvatarWrapper}>
                  <Image
                    src={REVIEW_AVATARS[index]}
                    alt={rev.name}
                    width={64}
                    height={64}
                    className={styles.reviewAvatar}
                    unoptimized
                  />
                </div>
                <div className={styles.reviewBody}>
                  <p className={styles.reviewText}>{rev.text}</p>
                  <h4 className={styles.reviewName}>{rev.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Блок с контактами */}
      <section className={styles.footerSection}>
        <div className={styles.sectionInner}>
          <div className={styles.footerContent}>
            <div className={styles.footerSocials}>
              <a
                href={WHATSAPP_LINK_1}
                target="_blank"
                rel="noreferrer"
                className={styles.socialCircle}
                title="WhatsApp 1"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.099 4.017 4.017-1.099z" />
                </svg>
              </a>

              <a
                href={WHATSAPP_LINK_2}
                target="_blank"
                rel="noreferrer"
                className={styles.socialCircle}
                title="WhatsApp 2"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.099 4.017 4.017-1.099z" />
                </svg>
              </a>

              <a
                href={INSTAGRAM_LINK}
                target="_blank"
                rel="noreferrer"
                className={styles.socialCircle}
                title="Instagram"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>

            <div className={styles.footerContacts}>
              <div className={styles.phonesGroup}>
                <a href="tel:+996505406805" className={styles.contactLink}>
                  <Phone size={15} /> +996 505 406 805
                </a>
                <a href="tel:+996503406805" className={styles.contactLink}>
                  <Phone size={15} /> +996 503 406 805
                </a>
              </div>

              <a
                href="mailto:baitech.kg@gmail.com"
                className={styles.emailLink}
              >
                <Mail size={15} /> baitech.kg@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {isStoryOpen && (
        <div
          className={styles.storyModalOverlay}
          onClick={() => setIsStoryOpen(false)}
        >
          <div
            className={styles.storyModalBox}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={styles.storyModalClose}
              aria-label="Закрыть"
              onClick={() => setIsStoryOpen(false)}
            >
              <X size={20} />
            </button>
            <h3 className={styles.storyModalTitle}>
              {t("coursesPage.storyModalTitle")}
            </h3>
            <p className={styles.storyModalText}>
              {t("coursesPage.storyModalText")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
