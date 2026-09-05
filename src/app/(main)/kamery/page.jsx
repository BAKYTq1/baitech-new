import Link from 'next/link';

export const metadata = {
  title: 'Купить камеры видеонаблюдения в Бишкеке',
  description: 'Купить камеры для дома, офиса и бизнеса в Бишкеке: IP-камеры, уличные камеры, внутренние модели и комплектующие для видеонаблюдения.',
  keywords: [
    'камеры видеонаблюдения Бишкек',
    'камеры Бишкек',
    'IP камера Бишкек',
    'уличная камера видеонаблюдения',
    'внутренняя камера видеонаблюдения',
  ],
  alternates: { canonical: 'https://baitech.kg/kamery' },
  openGraph: {
    title: 'Купить камеры видеонаблюдения в Бишкеке',
    description: 'Широкий выбор камер для дома, офиса и бизнеса с установкой под ключ.',
    url: 'https://baitech.kg/kamery',
    siteName: 'Baitech',
    locale: 'ru_KG',
    type: 'website',
  },
};

export default function CamerasLandingPage() {
  return (
    <main style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 20px 80px' }}>
      <nav style={{ marginBottom: 24, color: '#475569', fontSize: 14 }}>
        <Link href="/">Главная</Link>
        {' / '}
        <span>Камеры</span>
      </nav>

      <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1, marginBottom: 20, color: '#0f172a' }}>
        Камеры видеонаблюдения в Бишкеке
      </h1>

      <p style={{ fontSize: 18, lineHeight: 1.7, color: '#334155', marginBottom: 28 }}>
        Подбор и продажа камер видеонаблюдения для дома, офиса, склада, улицы и коммерческих объектов.
        Мы предлагаем IP-камеры, уличные и внутренние модели, а также решения под ключ с установкой и настройкой.
      </p>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
        <Link href="/catalog/cameras" style={{ background: '#0E2E5B', color: '#fff', padding: '12px 18px', borderRadius: 10, textDecoration: 'none' }}>
          Каталог камер
        </Link>
        <Link href="/videonablyudenie" style={{ background: '#e2e8f0', color: '#0f172a', padding: '12px 18px', borderRadius: 10, textDecoration: 'none' }}>
          Видеонаблюдение
        </Link>
      </div>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        <div style={{ background: '#f8fafc', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: 20, marginBottom: 10 }}>Уличные камеры</h2>
          <p style={{ color: '#475569', lineHeight: 1.6 }}>Для входных групп, дворов, парковок, производственных территорий.</p>
        </div>
        <div style={{ background: '#f8fafc', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: 20, marginBottom: 10 }}>Внутренние камеры</h2>
          <p style={{ color: '#475569', lineHeight: 1.6 }}>Для офисов, магазинов, кабинетов и жилых помещений.</p>
        </div>
        <div style={{ background: '#f8fafc', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: 20, marginBottom: 10 }}>IP-камеры</h2>
          <p style={{ color: '#475569', lineHeight: 1.6 }}>Высокое качество изображения, удалённый доступ, масштабируемость.</p>
        </div>
      </section>
    </main>
  );
}
