'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './ProductCard.module.scss';
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

export default function ProductCard({ product, viewMode }) {
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
  const discount = Number(product?.discount || 0);
  const hasDiscount = discount > 0;
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
    <>
      <div className={`${styles.card} ${styles[viewMode]}`}>
        <div className={`${styles.badge} ${product.is_available ? styles.available : styles.waiting}`}>
          {product.is_available ? t('card.inStock') : t('card.outOfStock')}
        </div>
        {hasDiscount && (
          <div className={styles.discount}>-{discount}%</div>
        )}

        <div className={styles.mainWrapper}>
          <Link href={productDetailPath}>
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
                width={260}
                height={220}
                className={styles.cardImage}
                sizes={viewMode === 'grid' ? '(max-width: 768px) 80vw, 260px' : '240px'}
              />
              {viewMode === 'grid' && (
                <div className={styles.dots}>
                  <span className={styles.active}></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              )}
            </div>
          </Link>

          <div className={styles.infoSection}>
            <div className={styles.topInfo}>
              <span className={styles.article}>
                {t('card.article')}: {product.article}
              </span>
              <h3 className={styles.title} title={product.name}>{product.name}</h3>
            </div>

            <div className={styles.middleInfo}>
              {(viewMode === 'list' || viewMode === 'full') && (
                <p className={styles.description}>
                  {product.description?.slice(0, 220) || t('description.notAvailable')}
                </p>
              )}
            </div>

            <div className={styles.purchaseSection}>
              {isHighPrice ? (
                <div className={styles.contactPrice}>
                  <p className={styles.contactTitle}>{t('card.contactForPrice')}</p>
                  {whatsappLink && (
                    <a href={whatsappLink} target="_blank" rel="noreferrer" className={styles.whatsappBtn}>
                      <FaWhatsapp size={16} />
                      <span>{t('card.writeToWhatsApp')}</span>
                    </a>
                  )}
                </div>
              ) : isAvailable ? (
                <>
                  <div className={styles.bonus}>
                    {product.bonus || 0} {t('card.bonuses')}
                  </div>
                  <div className={styles.priceRow}>
      <span className={styles.price}>
    {isBonusOnly
      ? `${product.bonus_price ?? 0} ${t('ball')}`
      : `${formattedPrice} ${t('card.currency')}`}
  </span>
                    <button
                      className={styles.cartBtn}
                      onClick={handleCartClick}
                      disabled={isAdding || isDeleting}
                      style={{
                        backgroundColor: isInCart ? '#0E2E5B' : '',
                        color: isInCart ? 'white' : '',
                        borderColor: isInCart ? '#0E2E5B' : '',
                      }}
                    >
                      {isInCart ? <IoCart size={20} /> : <IoCartOutline size={20} />}
                      {viewMode !== 'grid' && <span>{t('productCard.addToCart')}</span>}
                    </button>
                  </div>
                </>
              ) : (
                <div className={styles.contactPrice}>
                  <a
                    href={whatsappLink ?? settings?.whatsapp ?? `tel:${settings?.phone}`}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.availabilityBtn}
                  >
                    {t('card.checkAvailability')}
                  </a>
                  {whatsappLink && (
                    <a href={whatsappLink} target="_blank" rel="noreferrer" className={styles.whatsappBtn}>
                      <FaWhatsapp size={16} />
                      <span>{t('card.whatsapp')}</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isPreviewOpen && (
        <div className={styles.previewOverlay} onClick={() => setIsPreviewOpen(false)}>
          <div className={styles.previewModal} onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className={styles.previewClose}
              aria-label="Закрыть просмотр"
              onClick={() => setIsPreviewOpen(false)}
            >
              <IoClose size={20} />
            </button>
            <Image
              src={imageUrl}
              alt={product.name}
              width={820}
              height={620}
              className={styles.previewImage}
              sizes="min(820px, 100vw)"
            />
          </div>
        </div>
      )}
    </>
  );
}
