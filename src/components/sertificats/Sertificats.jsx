"use client";

import React, { useState } from "react";
import "./Certificates.scss";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { useCertificat } from "@/lib/sertificats/hooks/hooks";
import Breadcrumb from "../product/ui/Breadcrumb/Breadcrumb.jsx";

const Certificates = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useCertificat();
  const [lightboxImage, setLightboxImage] = useState(null);

  const certificates = data ?? [];

  if (isLoading) return <div className="loader"></div>;

  return (
    <section className="certificates-page">
      <div className="container-1220">
        <Breadcrumb
          items={[
            { label: t("certificates.breadcrumbs.home"), path: "/" },
            { label: t("certificates.breadcrumbs.current"), path: "" },
          ]}
        />

        <h1 className="title-h1">{t("certificates.title")}</h1>
        <p className="desc-main">{t("certificates.description")}</p>
        <h2 className="title-h2">{t("certificates.subtitle")}</h2>

        <div className="cert-grid">
          {certificates.map((card, index) => {
            const imageSrc = card.existing_images?.[0]?.image;

            return (
              <div key={card.id ?? index} className="cert-card">
                {(card.title || card.description) && (
                  <div className="cert-card-text">
                    {card.title && (
                      <h3 className="cert-card-title">{card.title}</h3>
                    )}
                    {card.description && (
                      <p className="cert-card-description">
                        {card.description}
                      </p>
                    )}
                  </div>
                )}
                <div
                  className="img-wrapper"
                  onClick={() =>
                    imageSrc &&
                    setLightboxImage({
                      src: imageSrc,
                      alt: card.title || `certificate-${index + 1}`,
                    })
                  }
                >
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={card.title || `certificate-${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 585px"
                      style={{ objectFit: "contain" }}
                    />
                  ) : (
                    <div className="placeholder-img">585 x 335</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="cert-footer-text">
          {t("certificates.footer", { returnObjects: true }).map(
            (paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ),
          )}
        </div>
      </div>

      {lightboxImage && (
        <div
          className="cert-lightbox-overlay"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="cert-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="cert-lightbox-close"
              onClick={() => setLightboxImage(null)}
              aria-label="Close"
            >
              ×
            </button>
            <img src={lightboxImage.src} alt={lightboxImage.alt} />
          </div>
        </div>
      )}
    </section>
  );
};

export default Certificates;
