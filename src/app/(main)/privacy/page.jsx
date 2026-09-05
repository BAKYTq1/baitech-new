import PrivacyClient from '@/components/privacy/PrivacyClient';

export const metadata = {
  title: 'Политика конфиденциальности Baitech',
  description: 'Политика обработки персональных данных Baitech.kg для покупателей, клиентов и пользователей сайта.',
  alternates: { canonical: 'https://baitech.kg/privacy' },
};

const Privacy = () => {
  return <PrivacyClient />;
};

export default Privacy;