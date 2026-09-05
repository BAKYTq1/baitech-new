import Link from 'next/link';

export const metadata = {
  title: 'Видеонаблюдение в Бишкеке — камеры для дома и бизнеса',
  description: 'Купить видеонаблюдение в Бишкеке: уличные и внутренние камеры, IP-системы, установка под ключ и обслуживание для дома, офиса и бизнеса.',
  keywords: [
    'видеонаблюдение Бишкек',
    'камеры видеонаблюдения Бишкек',
    'установка видеонаблюдения Бишкек',
    'IP камера Бишкек',
    'видеонаблюдение для дома Бишкек',
  ],
  alternates: { canonical: 'https://baitech.kg/videonablyudenie' },
  openGraph: {
    title: 'Видеонаблюдение в Бишкеке',
    description: 'Купить системы видеонаблюдения для дома, офиса и бизнеса с установкой под ключ в Бишкеке.',
    url: 'https://baitech.kg/videonablyudenie',
    siteName: 'Baitech',
    locale: 'ru_KG',
    type: 'website',
  },
};

export default function VideoSurveillanceLandingPage() {
  return (
    <main style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 20px 80px' }}>
      <nav style={{ marginBottom: 24, color: '#475569', fontSize: 14 }}>
        <Link href="/">Главная</Link>
        {' / '}
        <span>Видеонаблюдение</span>
      </nav>

      <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1, marginBottom: 20, color: '#0f172a' }}>
        Видеонаблюдение в Бишкеке для дома, офиса и бизнеса
      </h1>

      <p style={{ fontSize: 18, lineHeight: 1.7, color: '#334155', marginBottom: 28 }}>
        Установка видеонаблюдения в Бишкеке под ключ — от выбора камер до настройки записи,
        удалённого доступа и интеграции с системами безопасности. Мы помогаем подобрать решение под
        ваши задачи: домашняя безопасность, офис, склад, производство и коммерческие объекты.
      </p>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
        <Link href="/catalog/cameras" style={{ background: '#0E2E5B', color: '#fff', padding: '12px 18px', borderRadius: 10, textDecoration: 'none' }}>
          Смотреть камеры
        </Link>
        <Link href="/solution" style={{ background: '#e2e8f0', color: '#0f172a', padding: '12px 18px', borderRadius: 10, textDecoration: 'none' }}>
          Все решения
        </Link>
      </div>

      <section style={{ marginBottom: 36 }}>
        <h2 style={{ fontSize: 28, marginBottom: 14, color: '#0f172a' }}>Что включает система видеонаблюдения</h2>
        <ul style={{ fontSize: 18, lineHeight: 1.8, color: '#334155', paddingLeft: 20 }}>
          <li>IP-камеры и уличные камеры для наружного наблюдения;</li>
          <li>видеорегистраторы и хранение данных в облаке или локально;</li>
          <li>удалённый доступ через смартфон и компьютер;</li>
          <li>детекторы движения, архивация и уведомления по событиям.</li>
        </ul>
      </section>

      <section>
        <h2 style={{ fontSize: 28, marginBottom: 14, color: '#0f172a' }}>Почему выбирают Baitech</h2>
        <p style={{ fontSize: 18, lineHeight: 1.7, color: '#334155' }}>
          Мы подбираем камеры видеонаблюдения с учётом объекта, уровня освещения, зоны покрытия и
          бюджета. Поддерживаем установку, настройку и дальнейшее обслуживание систем безопасности.
        </p>
      </section>
    </main>
  );
}
