// app/productdetail/[id]/page.jsx
"use client";
import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Breadcrumb from "./ui/Breadcrumb/Breadcrumb.jsx";
import ProductCard from "./ui/product-card/ProductCard.jsx";
import Description from "./ui/description/Description.jsx";
import ProductSpecs from "./ui/ProductSpecs/ProductSpecs.jsx";
import { PopularCard } from "../popularcard/PopularCard.jsx";
import { useTranslation } from "react-i18next";
import { useProducts } from "@/lib/products/hooks/hooks";
import { productApi } from "@/lib/products/api/useProducts";

// Ищет путь от корня дерева до нужной категории
function findCategoryPath(tree, matcher, trail = []) {
  for (const node of tree || []) {
    const next = [...trail, node];
    if (matcher(node)) return next;
    const found = findCategoryPath(node.subcategories, matcher, next);
    if (found) return found;
  }
  return null;
}

function ProductDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { categories } = useProducts();

  // ВАЖНО: ключ и функция должны совпадать с теми, что использует ProductCard,
  // тогда react-query возьмёт данные из кэша без второго запроса
  const { data: product } = useQuery({
    queryKey: ["product", id],
    queryFn: () => productApi.getById(id),
    enabled: !!id,
  });

  const items = useMemo(() => {
    const crumbs = [
      { label: t("aboutCompany.breadcrumbs.home"), path: "/" },
      { label: t("navbar.catalog"), path: "/catalog" },
    ];

    if (!product) return crumbs;

    // category может быть id, названием или объектом
    const cat = product.category;
    const catId = typeof cat === "object" ? cat?.id : cat;
    const catName = typeof cat === "object" ? cat?.name : cat;

    const trail = findCategoryPath(
      categories,
      (c) => c.id === catId || (catName && c.name === catName),
    );

    (trail || []).forEach((c) => {
      crumbs.push({
        label: c.name,
        path: `/catalog?category=${encodeURIComponent(c.name)}`,
      });
    });

    // последний пункт — текущий товар, без ссылки
    crumbs.push({ label: product.name, path: "" });
    return crumbs;
  }, [product, categories, t]);

  return (
    <div
      className="xl:p-[0px] p-[20px]"
      style={{ maxWidth: "1279px", margin: "0 auto", marginBottom: "50px" }}
    >
      <Breadcrumb items={items} />
      <ProductCard productId={id} />
      <Description productId={id} />
      <ProductSpecs productId={id} />
      <PopularCard productId={id} />
    </div>
  );
}

export default ProductDetail;
