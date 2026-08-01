'use client'
import { useState, useEffect } from "react";
import { IoCartOutline, IoCart, IoClose } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import './ProductCard.scss';
import { productApi } from "@/lib/products/api/useProducts";
import { useTranslation } from "react-i18next";
import { useCart, useCreateCartItem, useDeleteCartItem } from "@/lib/cart/hooks/hooks";
import { useSiteSettings } from "@/lib/settings/hook";

const HIGH_PRICE_LIMIT = 100000;
const PRODUCT_PLACEHOLDER = "/product-placeholder.svg";

const buildWhatsAppLink = (whatsapp, phone, message) => {
  const encodedMessage = encodeURIComponent(message);
  const raw = String(whatsapp || "").trim();

  if (raw) {
    if (/^https?:\/\//i.test(raw)) {
      try {
        const url = new URL(raw);
        url.searchParams.set("text", message);
        return url.toString();
      } catch {
        const separator = raw.includes("?") ? "&" : "?";
        return `${raw}${separator}text=${encodedMessage}`;
      }
    }

    const digits = raw.replace(/\D/g, "");
    if (digits) return `https://wa.me/${digits}?text=${encodedMessage}`;
  }

  const phoneDigits = String(phone || "").replace(/\D/g, "");
  if (phoneDigits) return `https://wa.me/${phoneDigits}?text=${encodedMessage}`;

  return null;
};

const ProductCard = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(null);
  const [count, setCount] = useState(1);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { t } = useTranslation();
  const { settings } = useSiteSettings();

  const { data: cartItems } = useCart();
  const { mutate: addToCart, isPending: isAdding } = useCreateCartItem();
  const { mutate: deleteFromCart, isPending: isDeleting } = useDeleteCartItem();

  const cartItem = cartItems?.find(
    (item) => item.product?.id === product?.id || item.product_id === product?.id
  );
  const isInCart = !!cartItem;
  const isAvailable = product?.is_available;

  useEffect(() => {
    if (cartItem?.quantity) {
      setCount(cartItem.quantity);
    }
  }, [cartItem]);

  useEffect(() => {
    let isMounted = true;

    const fetchProduct = async () => {
      try {
        const data = await productApi.getById(productId);
        if (!isMounted) return;

        setProduct(data);
        const images = data.existing_images?.map((img) => img.image).filter(Boolean) || [];
        setActiveImage(images[0] || PRODUCT_PLACEHOLDER);
      } catch (err) {
        console.error("Ошибка загрузки товара:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (productId) fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [productId]);

  const images = product?.existing_images?.map((img) => img.image).filter(Boolean) || [];
  const displayImages = images.length > 0 ? images : [PRODUCT_PLACEHOLDER];
  const currentImage = activeImage || displayImages[0];

  const increment = () => setCount((c) => c + 1);
  const decrement = () => count > 1 && setCount((c) => c - 1);
  const productName = product?.name || t("productCard.notFound");
  const productDescription = product?.description || "";
  const shortDescription =
    productDescription.length > 150
      ? `${productDescription.slice(0, 150)}...`
      : productDescription;
  const parsedPrice = Number(product?.price);
  const formattedPrice = Number.isFinite(parsedPrice)
    ? parsedPrice.toLocaleString()
    : product?.price || "0";
  const isHighPrice = Number.isFinite(parsedPrice) && parsedPrice >= HIGH_PRICE_LIMIT;
  // Товар без цены (или с ценой 0) продаётся только за бонусные баллы
  const isBonusOnly = !(parsedPrice > 0);
  const whatsappMessage = isHighPrice
    ? `Здравствуйте! Интересует товар: ${product?.name || "-"}, артикул: ${product?.article || "-"}.`
    : `Здравствуйте! Интересует товар: ${product?.name || "-"}, артикул: ${product?.article || "-"}, цена: ${formattedPrice} сом.`;
  const whatsappLink = buildWhatsAppLink(settings?.whatsapp, settings?.phone, whatsappMessage);

  const handleCartClick = () => {
    if (!product?.id) return;

    const token =
      localStorage.getItem("access_token") ||
      localStorage.getItem("accessToken") ||
      localStorage.getItem("accesToken") ||
      localStorage.getItem("acces_token");
    if (!token) {
      setShowAuthModal(true);
      return;
    }

    if (isInCart) {
      deleteFromCart(cartItem.id);
    } else {
      addToCart({ product_id: product.id, quantity: count });
    }
  };

  if (loading) return <div className="loader"></div>;
  if (!product) return <div className="product text-center">{t('productCard.notFound')}</div>;

  return (
    <>
      <div className="product">
        <div className="product__gallery">
          <div className="product__thumbs">
            {displayImages.map((img) => (
              <button
                key={img}
                className={`product__thumb ${currentImage === img ? "active" : ""}`}
                onClick={() => setActiveImage(img)}
                type="button"
              >
                <Image src={img} alt={`${productName} preview`} width={82} height={82} />
              </button>
            ))}
          </div>

          <div className="product__image">
            <Image src={currentImage} alt={productName} width={471} height={471} />
          </div>
        </div>

        <div className="product__info">
          <h1>{t('productCard.article')}: {product.article || "-"}</h1>
          <p className="product__desc">{productName}</p>
          <p className="product__descip line-clamp-3" title={productDescription}>
            {shortDescription}
          </p>
          {isHighPrice ? (
            <div className="product__contact-title">{t("card.contactForPrice")}</div>
          ) : isBonusOnly ? (
            <div className="product__price product__price--bonus">
              {product.bonus_price || 0} {t('productCard.bonusPoints', t('ball'))}
            </div>
          ) : (
            <>
              <div className="product__price">{formattedPrice} {t('productCard.currency')}</div>
              <div className="product__bonus">{product.bonus || 0} {t('productCard.bonuses')}</div>
            </>
          )}

          <div className="product__actions">
            {isHighPrice ? (
              whatsappLink ? (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="product-card__whatsapp"
                >
                  <FaWhatsapp size={16} />
                  {t("card.writeToWhatsApp")}
                </a>
              ) : null
            ) : isAvailable ? (
              <>
                <div className="counter">
                  <button onClick={decrement} type="button">-</button>
                  <span>{count}</span>
                  <button onClick={increment} type="button">+</button>
                </div>

                <button
                  className="add-to-cart"
                  onClick={handleCartClick}
                  disabled={isAdding || isDeleting}
                  style={{ backgroundColor: isInCart ? '#0E2E5B' : '', color: isInCart ? '#FFFFFF' : '' }}
                >
                  {isInCart ? <IoCart size={20} /> : <IoCartOutline size={20} />}
                  {t('productCard.addToCart')}
                </button>
              </>
            ) : (
              <a
                href={whatsappLink ?? settings?.whatsapp ?? `tel:${settings?.phone ?? ""}`}
                target="_blank"
                rel="noreferrer"
                className="product-card__availability-btn"
              >
                {t("card.checkAvailability")}
              </a>
            )}
          </div>

          {!isAvailable && !isHighPrice && (
            <a
              href={whatsappLink ?? settings?.whatsapp ?? `tel:${settings?.phone ?? ""}`}
              target="_blank"
              rel="noreferrer"
              className="product-card__whatsapp"
            >
              <FaWhatsapp size={16} />
              {t("card.whatsapp")}
            </a>
          )}
        </div>
      </div>

      {showAuthModal && (
        <div
          className="auth-modal__overlay"
          onClick={() => setShowAuthModal(false)}
        >
          <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="auth-modal__close"
              onClick={() => setShowAuthModal(false)}
              aria-label="Закрыть"
            >
              <IoClose size={20} />
            </button>

            <div className="auth-modal__icon">
              <IoCartOutline size={48} />
            </div>

            <h3 className="auth-modal__title">{t("auth.modal.title")}</h3>
            <p className="auth-modal__text">{t("auth.modal.description")}</p>

            <div className="auth-modal__actions">
              <Link
                href="/register"
                className="auth-modal__btn auth-modal__btn--primary"
                onClick={() => setShowAuthModal(false)}
              >
                {t("auth.modal.register")}
              </Link>
              <Link
                href="/login"
                className="auth-modal__btn auth-modal__btn--secondary"
                onClick={() => setShowAuthModal(false)}
              >
                {t("auth.modal.login")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;