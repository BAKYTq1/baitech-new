"use client";

import React from "react";
import "./BrandsPage.scss";
import { useTranslation } from "react-i18next";
import Breadcrumb from "../product/ui/Breadcrumb/Breadcrumb.jsx";

const BrandsPage = () => {
  const { t } = useTranslation();

  return (
    <section className="brands-page">
      <div className="content-1220">
        <Breadcrumb
          items={[
            { label: t("brandsPage.breadcrumbs.home"), path: "/" },
            { label: t("brandsPage.breadcrumbs.current"), path: "" },
          ]}
        />

        <h1 className="title-h1">{t("brandsPage.title")}</h1>

        <p className="description-text">{t("brandsPage.description")}</p>

        <h2 className="title-h2">{t("brandsPage.subtitle")}</h2>

        <div className="brands-grid">
          {/* 1-Колонна */}
          <div className="column">
            <div className="category">
              <h3>{t("brandsPage.categories.ledScreens.title")}</h3>
              <ul>
                {t("brandsPage.categories.ledScreens.brands", {
                  returnObjects: true,
                }).map((brand, index) => (
                  <li key={index}>- {brand}</li>
                ))}
              </ul>
            </div>
            <div className="category">
              <h3>{t("brandsPage.categories.interactivePanels.title")}</h3>
              <ul>
                {t("brandsPage.categories.interactivePanels.brands", {
                  returnObjects: true,
                }).map((brand, index) => (
                  <li key={index}>- {brand}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* 2-Колонна */}
          <div className="column">
            <div className="category">
              <h3>{t("brandsPage.categories.surveillance.title")}</h3>
              <ul>
                {t("brandsPage.categories.surveillance.brands", {
                  returnObjects: true,
                }).map((brand, index) => (
                  <li key={index}>- {brand}</li>
                ))}
              </ul>
            </div>
            <div className="category">
              <h3>{t("brandsPage.categories.networking.title")}</h3>
              <ul>
                {t("brandsPage.categories.networking.brands", {
                  returnObjects: true,
                }).map((brand, index) => (
                  <li key={index}>- {brand}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* 3-Колонна */}
          <div className="column">
            <div className="category">
              <h3>{t("brandsPage.categories.accessControl.title")}</h3>
              <ul>
                {t("brandsPage.categories.accessControl.brands", {
                  returnObjects: true,
                }).map((brand, index) => (
                  <li key={index}>- {brand}</li>
                ))}
              </ul>
            </div>
            <div className="category">
              <h3>{t("brandsPage.categories.smartLocks.title")}</h3>
              <ul>
                {t("brandsPage.categories.smartLocks.brands", {
                  returnObjects: true,
                }).map((brand, index) => (
                  <li key={index}>- {brand}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="conclusion-section">
          <p>{t("brandsPage.conclusion")}</p>
        </div>
      </div>
    </section>
  );
};

export default BrandsPage;
