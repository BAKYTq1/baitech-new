import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "../../QueryProvider";
import I18nProvider from "../provider/I18nProvider/I18nProvider";
import ToastProvider from "../provider/toastProvider/ToastProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://baitech.kg"),
  applicationName: "Baitech",
  icons: {
    icon: [{ url: "/icon.png", type: "image/svg+xml" }],
    shortcut: ["/icon.png"],
    apple: ["/icon.png"],
  },
  title: {
    default: "Baitech.kg — камеры, видеонаблюдение и системы безопасности в Бишкеке",
    template: "%s | Baitech.kg",
  },
  description:
    "Baitech.kg — продажа камер видеонаблюдения, IP-камер, систем безопасности, СКУД и оборудования для бизнеса и дома в Бишкеке. Установка под ключ и консультация специалистов.",
  keywords: [
    "камеры видеонаблюдения Бишкек",
    "камеры Бишкек",
    "видеонаблюдение Бишкек",
    "ip камера Бишкек",
    "установка видеонаблюдения Бишкек",
    "системы безопасности Бишкек",
    "СКУД Бишкек",
    "охранная сигнализация Бишкек",
    "интернет-магазин техники Бишкек",
    "baitech",
    "baitech.kg",
  ],
  openGraph: {
    title: "Baitech.kg — камеры и видеонаблюдение в Бишкеке",
    description: "Байтех — это современный магазин и шоурум, где вы можете купить системы безопасности, видеонаблюдение, СКУД, умные замки и оборудование для бизнеса с профессиональной установкой. У нас есть всё: от готовых комплектов до сложных решений под ключ, включая кибербезопасность для бизнеса.",
    url: "https://baitech.kg",
    siteName: "Baitech",
    locale: "ru_KG",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Baitech.kg — камеры и видеонаблюдение в Бишкеке",
    description: "Байтех — это современный магазин и шоурум, где вы можете купить системы безопасности, видеонаблюдение, СКУД, умные замки и оборудование для бизнеса с профессиональной установкой. У нас есть всё: от готовых комплектов до сложных решений под ключ, включая кибербезопасность для бизнеса.",
    images: ["/og-image.jpg"],
  },
  alternates: { canonical: "https://baitech.kg" },
  robots: { index: true, follow: true },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "SecurityService",
  name: "Baitech",
  url: "https://baitech.kg",
  logo: "https://baitech.kg/icon.svg",
  image: "https://baitech.kg/og-image.jpg",
  telephone: "+996500000000",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Бишкек",
    addressCountry: "KG",
  },
  areaServed: {
    "@type": "Country",
    name: "Кыргызстан",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "120",
  },
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Установка видеонаблюдения в Бишкеке",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Пультовая охрана",
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <I18nProvider>
          <QueryProvider>
            <ToastProvider />
            {children}
          </QueryProvider>
        </I18nProvider>

      </body>
    </html>
  );
}
