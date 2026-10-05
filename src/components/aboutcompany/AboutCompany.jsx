"use client";
import React from "react";
import "./AboutCompany.scss";
import img1 from "../../../assets/png/reklama.png";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Breadcrumb from "../product/ui/Breadcrumb/Breadcrumb.jsx";

const AboutCompany = () => {
  const { t } = useTranslation();

  return (
    <section className="about-company">
      <div className="content-wrapper">
        <Breadcrumb
          items={[
            { label: t("aboutCompany.breadcrumbs.home"), path: "/" },
            { label: t("aboutCompany.breadcrumbs.current"), path: "" },
          ]}
        />

        <h1 className="main-title">{t("aboutCompany.title")}</h1>

        <div className="intro-text">
          <p>{t("aboutCompany.intro")}</p>
        </div>

        <div className="media-section">
          <div className="image-container">
            <div className="image-placeholder">
              <Image
                src={img1}
                alt={t("aboutCompany.imageAlt")}
                className="w-full"
              />
            </div>
          </div>

          <div className="specialization">
            <h2>{t("aboutCompany.specializationTitle")}</h2>
            <ul>
              {t("aboutCompany.specializations", { returnObjects: true }).map(
                (item, index) => (
                  <li key={index}>
                    <span className="bullet">•</span> {item}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        <div className="goal-section">
          <h2 className="goal-title">{t("aboutCompany.goalTitle")}</h2>
          <p className="goal-highlight">{t("aboutCompany.goalText")}</p>
        </div>

        <div className="footer-description">
          {t("aboutCompany.footer", { returnObjects: true }).map(
            (paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutCompany;
