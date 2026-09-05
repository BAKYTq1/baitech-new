"use client";

import Link from 'next/link';
import './Privacy.scss';
import { useTranslation } from 'react-i18next';

const PrivacyClient = () => {
  const { t } = useTranslation();

  return (
    <div className="privacy-container">
      <div className="wrapper-1220">
        <nav className="breadcrumb">
          <Link href="/">{t('privacy.breadcrumbs.home')}</Link> / <span>{t('privacy.breadcrumbs.current')}</span>
        </nav>

        <h1 className="page-title">{t('privacy.title')}</h1>

        <p className="intro">{t('privacy.intro')}</p>

        <h3 className="sub-heading">
          {t('privacy.subHeading')}
        </h3>

        <ul className="privacy-list">
          {t('privacy.list', { returnObjects: true }).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <div className="privacy-footer">
          {t('privacy.footer', { returnObjects: true }).map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyClient;
