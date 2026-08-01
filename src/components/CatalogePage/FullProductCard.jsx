'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './FullProductCard.module.scss';
import { IoCartOutline, IoCart, IoEyeOutline, IoClose } from 'react-icons/io5';
import { FaWhatsapp } from 'react-icons/fa';
import { useCart, useCreateCartItem, useDeleteCartItem } from '@/lib/cart/hooks/hooks';
import { useTranslation } from 'react-i18next';
import { useSiteSettings } from '@/lib/settings/hook';

const HIGH_PRICE_LIMIT = 100000;
const PRODUCT_PLACEHOLDER = '/product-placeholder.svg';

const buildWhatsAppLink = (whatsapp, phone, message) => {
  const encodedMessage = encodeURIComponent(message);
  const raw = String(whatsapp || '').trim();

  if (raw) {
    if (/^https?:\/\//i.test(raw)) {
      try {
        const url = new URL(raw);
        url.searchParams.set('text', message);
        return url.toString();
      } catch {
        const separator = raw.includes('?') ? '&' : '?';
        return `${raw}${separator}text=${encodedMessage}`;
      }
    }

    const digits = raw.replace(/\D/g, '');
    if (digits) return `https://wa.me/${digits}?text=${encodedMessage}`;
  }

  const phoneDigits = String(phone || '').replace(/\D/g, '');
  if (phoneDigits) return `https://wa.me/${phoneDigits}?text=${encodedMessage}`;

  return null;
};

export default function FullProductCard({ product }) {
  const { t } = useTranslation();
  const imageUrl = product.existing_images?.[0]?.image || PRODUCT_PLACEHOLDER;
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const productId = product?.id ?? product?.pk ?? product?.product_id ?? product?.product?.id;
  const productDetailPath = productId
    ? `/productdetail/${encodeURIComponent(String(productId))}`
    : "#";
  const { settings } = useSiteSettings();

  const { data: cartItems } = useCart();
  const { mutate: addToCart, isPending: isAdding } = useCreateCartItem();
  const { mutate: deleteFromCart, isPending: isDeleting } = useDeleteCartItem();

  const cartItem = cartItems?.find(
    (item) => item.product?.id === productId || item.product_id === productId
  );
  const isInCart = !!cartItem;
  const isAvailable = product?.is_available;
const numericPrice =
  product?.price === null || product?.price === undefined || product?.price === ''
    ? null
    : Number(product.price);
const formattedPrice = Number.isFinite(numericPrice)
  ? numericPrice.toLocaleString('ru-RU')
  : '-';
const isHighPrice = Number.isFinite(numericPrice) && numericPrice >= HIGH_PRICE_LIMIT;
const isBonusOnly = !(numericPrice > 0);
  const whatsappMessage = isHighPrice
    ? `Здравствуйте! Интересует товар: ${product?.name || '-'}, артикул: ${product?.article || '-'}.`
    : `Здравствуйте! Интересует товар: ${product?.name || '-'}, артикул: ${product?.article || '-'}, цена: ${formattedPrice} сом.`;
  const whatsappLink = buildWhatsAppLink(settings?.whatsapp, settings?.phone, whatsappMessage);

  const handleCartClick = (e) => {
    e.preventDefault();
    if (!productId) return;

    if (isInCart) {
      deleteFromCart(cartItem.id);
    } else {
      addToCart({ product_id: productId, quantity: 1 });
    }
  };

  return (
    <div className={styles.card}>
      <div className={`${styles.badge} ${product.is_available ? styles.available : styles.waiting}`}>
        {product.is_available ? t('card.inStock') : t('card.outOfStock')}
      </div>

      <Link href={productDetailPath} className={styles.wrapper}>
        <div className={styles.imageSection}>
          <button
            type="button"
            className={styles.previewBtn}
            aria-label="Просмотр фото"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setIsPreviewOpen(true);
            }}
          >
            <IoEyeOutline size={18} />
          </button>
          <Image
            src={imageUrl}
            alt={product.name}
            width={280}
            height={240}
            className={styles.image}
            sizes="(max-width: 900px) 80vw, 280px"
          />
        </div>

        <div className={styles.content}>
          <div className={styles.header}>
            <span className={styles.article}>
              {t('card.article')}: {product.article}
            </span>
            <h3 className={styles.title} title={product.name}>
              {product.name}
            </h3>
          </div>

          <p className={styles.description} title={product.description}>
            {product.description?.slice(0, 420) || t('description.notAvailable')}
          </p>

          <div className={styles.footer}>
            {isHighPrice ? (
              <div className={styles.contactPrice}>
                <p className={styles.contactTitle}>{t('card.contactForPrice')}</p>
                {whatsappLink && (
                  <button
                    type="button"
                    className={styles.whatsappBtn}
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      window.open(whatsappLink, '_blank', 'noopener,noreferrer');
                    }}
                  >
                    <FaWhatsapp size={16} />
                    <span>{t('card.writeToWhatsApp')}</span>
                  </button>
                )}
              </div>
            ) : isAvailable ? (
              <>
                <div className={styles.meta}>
                  <div className={styles.bonus}>
                    {product.bonus || 0} {t('card.bonuses')}
                  </div>
                <div className={styles.price}>
    {isBonusOnly
      ? `${product.bonus_price ?? 0} ${t('ball')}`
      : `${formattedPrice} ${t('card.currency')}`}
  </div>
                </div>

                <button
                  className={styles.cartBtn}
                  onClick={handleCartClick}
                  disabled={isAdding || isDeleting}
                  style={{
                    backgroundColor: isInCart ? '#0E2E5B' : '',
                    color: isInCart ? '#fff' : '',
                    borderColor: isInCart ? '#0E2E5B' : '',
                  }}
                >
                  {isInCart ? <IoCart size={20} /> : <IoCartOutline size={20} />}
                  <span>{t('productCard.addToCart')}</span>
                </button>
              </>
            ) : (
              <div className={styles.contactPrice}>
                <button
                  type="button"
                  className={styles.availabilityBtn}
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    const fallbackLink = whatsappLink ?? settings?.whatsapp ?? `tel:${settings?.phone}`;
                    window.open(fallbackLink, '_blank', 'noopener,noreferrer');
                  }}
                >
                  {t('card.checkAvailability')}
                </button>
                {whatsappLink && (
                  <button
                    type="button"
                    className={styles.whatsappBtn}
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      window.open(whatsappLink, '_blank', 'noopener,noreferrer');
                    }}
                  >
                    <FaWhatsapp size={16} />
                    <span>{t('card.whatsapp')}</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>

      {isPreviewOpen && (
        <div className={styles.previewOverlay} onClick={() => setIsPreviewOpen(false)}>
          <div className={styles.previewModal} onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className={styles.previewClose}
              aria-label="Close preview"
              onClick={() => setIsPreviewOpen(false)}
            >
              <IoClose size={20} />
            </button>
            <Image
              src={imageUrl}
              alt={product.name}
              width={860}
              height={640}
              className={styles.previewImage}
              sizes="min(860px, 100vw)"
            />
          </div>
        </div>
      )}
    </div>
  );
}
