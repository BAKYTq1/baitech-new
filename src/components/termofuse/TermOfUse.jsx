"use client";

import React from "react";
import "./TermsOfUse.scss";
import { useTranslation } from "react-i18next";
import Breadcrumb from "../product/ui/Breadcrumb/Breadcrumb.jsx";

const TermsOfUse = () => {
  const { t } = useTranslation();

  return (
    <section className="terms-page">
      <div className="container-1220">
        <Breadcrumb
          items={[
            { label: t("termsOfUse.breadcrumbs.home"), path: "/" },
            { label: t("termsOfUse.breadcrumbs.current"), path: "" },
          ]}
        />

        {/* Башкы заголовок */}
        <h1 className="title-h1">{t("termsOfUse.title")}</h1>

        {/* Киришүү текст */}
        <p className="desc-intro">{t("termsOfUse.intro")}</p>

        {/* Эки колонкалуу тизмелер */}
        <div className="terms-grid">
          <div className="terms-col">
            <h2 className="title-h2">{t("termsOfUse.administration.title")}</h2>
            <ul className="terms-list">
              {t("termsOfUse.administration.list", { returnObjects: true }).map(
                (item, index) => (
                  <li key={index}>{item}</li>
                ),
              )}
            </ul>
          </div>

          <div className="terms-col">
            <h2 className="title-h2">{t("termsOfUse.users.title")}</h2>
            <ul className="terms-list">
              {t("termsOfUse.users.list", { returnObjects: true }).map(
                (item, index) => (
                  <li key={index}>{item}</li>
                ),
              )}
            </ul>
          </div>
        </div>

        {/* Корутунду эскертүүлөр */}
        <div className="footer-notice">
          {t("termsOfUse.footer", { returnObjects: true }).map(
            (paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default TermsOfUse;
