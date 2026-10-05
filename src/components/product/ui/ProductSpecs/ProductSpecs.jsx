"use client";
import { productApi } from "@/lib/products/api/useProducts";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import SpecsText from "./SpecsText";
import "./ProductSpecs.scss";

const ProductSpecs = ({ productId }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);

  const { data: product, isLoading: loading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => productApi.getById(productId),
    enabled: !!productId,
  });

  return (
    <div className="specs">
      <button
        className="specs__header"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <div className="specs__header-content">
          <span className="specs__header-text">{t("productSpecs.title")}</span>
        </div>
        <div className={`specs__arrow ${open ? "specs__arrow--open" : ""}`}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>

      <div
        className={`specs__content ${open ? "specs__content--open" : "specs__content--closed"}`}
      >
        {loading ? (
          <p>{t("productSpecs.loading")}</p>
        ) : product?.characteristics ? (
          <div style={{ whiteSpace: "pre-line" }}>
            <p>
              <SpecsText text={product.characteristics} />
            </p>
          </div>
        ) : (
          <p>{t("productSpecs.notAvailable")}</p>
        )}
      </div>
    </div>
  );
};

export default ProductSpecs;
