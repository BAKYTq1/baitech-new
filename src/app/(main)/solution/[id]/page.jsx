'use client'
import Link from 'next/link'
import Image from 'next/image'
import { use } from 'react'
import { useTranslation } from 'react-i18next'
import { GoArrowUpRight, GoArrowDown } from 'react-icons/go'
import Under from '@/components/ui/under/Under'
import { solutionsData, solutionTranslations } from '@/lib/solution/data'
import { icons } from '@/lib/solution/icons'
import imgPult    from '../../../../../assets/png/Gemini_Generated_Image_zdz8h1zdz8h1zdz8.png'
import imgDevice  from '../../../../../assets/png/Gemini_Generated_Image_yrlhwfyrlhwfyrlh.png'
import imgSpeaker from '../../../../../assets/png/Gemini_Generated_Image_9zd4g29zd4g29zd4.png'



function SvgIcon({ name, size = 64 }) {
  return (
    <div style={{ width: size, height: size }} className="mx-auto mb-4 text-current">
      {icons[name] || (
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
          <rect x="8" y="8" width="48" height="48" rx="6" stroke="currentColor" strokeWidth="2.5" />
        </svg>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────
// 1. HERO-БАННЕР: градиент + заголовок + описание + список подразделов
// ─────────────────────────────────────────────
function SectionHeroBanner({ section, lang, description }) {
  return (
    <div
      className="w-full relative overflow-hidden mb-[60px]"
      style={{ background: 'linear-gradient(135deg, rgb(2, 13, 48) 0%, #0e2e5b 58%, #000000 100%)' }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,121,65,0.28),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_28%)]" />

      <div className="container mx-auto px-4 xl:px-0 max-w-[1280px] py-[48px] md:py-[60px] relative z-10">
        <h1 className="text-[28px] md:text-[38px] font-bold text-white mb-3 leading-tight">
          {section.title[lang] || section.title.ru}
        </h1>

        {description && (
          <p className="text-[14px] md:text-[15px] text-white/70 max-w-[640px] mb-6 leading-relaxed">
            {description}
          </p>
        )}

        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {section.items.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className="text-[14px] md:text-[15px] text-white/80 hover:text-white underline-offset-2 hover:underline transition-colors"
              >
                {item.title[lang] || item.title.ru}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// 2. Сетка подразделов с иконками
// ─────────────────────────────────────────────
function SectionGrid({ section, lang }) {
  const count = section.items.length
  return (
    <div className={
      count === 5
        ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10 mb-20"
        : "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 mb-20"
    }>
      {section.items.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className="group flex flex-col items-center text-center text-[#173B73]"
        >
          <SvgIcon name={item.icon} size={72} />
          <span className="text-[14px] md:text-[15px] text-[#1f2937] group-hover:text-[#172B99] transition-colors leading-snug flex items-center gap-1">
            {item.title[lang] || item.title.ru}
            <GoArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </span>
        </Link>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────
// 3. Тезис: заголовок + описание
// ─────────────────────────────────────────────
function SectionPitch({ pitch }) {
  if (!pitch) return null
  return (
    <div className="mb-16">
      <h2 className="text-[24px] md:text-[30px] font-bold text-[#173B73] mb-4 leading-snug max-w-[700px]">
        {pitch.title}
      </h2>
      <p className="text-[15px] md:text-[16px] text-gray-600 leading-relaxed max-w-[760px]">
        {pitch.desc}
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────
// 3b. Цитата-стандарт (бордер-рамка, центрированный текст)
// ─────────────────────────────────────────────
function QuoteBox({ text }) {
  if (!text) return null
  return (
    <div className="mb-16 border border-[#173B73]/30 rounded-lg px-8 py-6 text-center">
      <p className="text-[14px] md:text-[15px] text-gray-600 leading-relaxed max-w-[760px] mx-auto">
        {text}
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────
// 3c. Чек-лист с треугольными маркерами (риски/контроль)
// ─────────────────────────────────────────────
function ChecklistText({ heading, subheading, items }) {
  if (!items?.length) return null
  return (
    <div className="mb-16">
      <div className="flex items-baseline gap-4 mb-6 border-b border-gray-100 pb-3">
        <h2 className="text-[22px] md:text-[26px] font-bold text-[#173B73]">{heading}</h2>
        {subheading && <p className="text-[14px] text-gray-400 hidden sm:block">{subheading}</p>}
      </div>
      <ul className="space-y-4">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="text-[#D97941] text-[14px] mt-1 flex-shrink-0">▲</span>
            <div>
              <span className="font-semibold text-[#173B73] text-[14px] md:text-[15px]">{item.title}: </span>
              <span className="text-[14px] md:text-[15px] text-gray-600 leading-relaxed">{item.text}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─────────────────────────────────────────────
// 4. Сетка карточек (универсальная): НОМЕР карточки + заголовок + описание
//    (иконки заменены на цифры 1, 2, 3, 4 по просьбе — см. i + 1 ниже)
// ─────────────────────────────────────────────
function StatCardsGrid({ heading, subheading, items, columns = 3 }) {
  if (!items?.length) return null
  const colsClass = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  }[columns] || 'sm:grid-cols-2 lg:grid-cols-3'

  return (
    <div className="mb-16">
      {heading && (
        <div className="flex items-baseline gap-4 mb-8 border-b border-gray-100 pb-3 max-w-[760px]">
          <h2 className="text-[22px] md:text-[26px] font-bold text-[#173B73]">{heading}</h2>
          {subheading && <p className="text-[14px] text-gray-400 hidden sm:block">{subheading}</p>}
        </div>
      )}
      <div className={`grid grid-cols-1 ${colsClass} gap-4`}>
        {items.map((item, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-lg p-6 hover:border-[#173B73] transition-colors duration-300"
          >
            <div className="w-9 h-9 mb-4 rounded-full bg-[#173B73]/10 text-[#173B73] flex items-center justify-center font-bold text-[16px]">
              {i + 1}
            </div>
            <h4 className="text-[15px] font-semibold text-[#173B73] mb-2">{item.title}</h4>
            {item.desc && (
              <p className="text-[14px] text-gray-500 leading-relaxed">{item.desc}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// 5. Связанные карточки (с линией-коннектором между ними)
// ─────────────────────────────────────────────
function ConnectedCardsRow({ heading, items }) {
  if (!items?.length) return null
  return (
    <div className="mb-16">
      {heading && (
        <h2 className="text-[22px] md:text-[26px] font-bold text-[#173B73] mb-10 max-w-[700px]">
          {heading}
        </h2>
      )}
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* линия-коннектор только на десктопе между парами карточек */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-[#D97941]/40 -translate-y-1/2 z-0" />
        {items.map((item, i) => (
          <div
            key={i}
            className="relative z-10 bg-white border border-[#173B73]/30 rounded-lg p-6"
          >
            {item.icon && (
              <div className="w-9 h-9 mb-4 text-[#173B73]">
                <SvgIcon name={item.icon} size={36} />
              </div>
            )}
            <h4 className="text-[15px] font-semibold text-[#173B73] mb-2">{item.title}</h4>
            {item.desc && (
              <p className="text-[14px] text-gray-500 leading-relaxed">{item.desc}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// 6. "Реализуем сразу несколько систем" — фото + стрелка вниз + подпись
// ─────────────────────────────────────────────
function SectionFeatureCards({ heading, cards }) {
  if (!cards?.length) return null
  return (
    <div className="mb-20">
      {heading && (
        <h2 className="text-[22px] md:text-[28px] font-bold text-[#173B73] mb-10 max-w-[640px]">
          {heading}
        </h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, i) => (
          <div key={i} className="flex flex-col items-center text-center">
            <div className="w-full aspect-square bg-gray-50 rounded-lg mb-3 border border-gray-100 relative overflow-hidden">
              <Image
                src={card.image || '/images/placeholder-square.jpg'}
                alt={card.title}
                fill
                className="object-contain p-6"
              />
            </div>
            <GoArrowDown className="text-[#D97941] text-[22px] mb-3" />
            <p className="text-[14px] md:text-[15px] font-medium text-[#173B73] leading-snug">
              {card.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// 7. Преимущества — 4 иконки в карточках-рамках
// ─────────────────────────────────────────────
function SectionAdvantages({ heading, items }) {
  if (!items?.length) return null
  return (
    <div className="mb-20">
      {heading && (
        <h2 className="text-[22px] md:text-[28px] font-bold text-[#173B73] mb-10 max-w-[640px]">
          {heading}
        </h2>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((adv, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center border border-gray-200 rounded-lg p-6 hover:border-[#173B73] transition-colors duration-300"
          >
            <div className="w-12 h-12 mb-4 text-[#172B99]">
              <SvgIcon name={adv.icon} size={48} />
            </div>
            <p className="text-[14px] text-gray-700 leading-snug">{adv.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// 8. CTA-блок
// ─────────────────────────────────────────────
function SectionCTA({ title, desc, ctaLabel, email = 'info@baitech.kg' }) {
  const {t} = useTranslation()
  return (
    <div className="border-t border-b border-gray-200 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6  px-6 rounded-lg mb-16">
        <section className="mb-[100px] mt-24">
          <div className="border-t border-[#173B73] pt-6 flex flex-col md:flex-row justify-between items-start gap-4">
            <h3 className="text-xl md:text-2xl font-bold text-slate-800 leading-tight">
              {t('controlMonitoring.footer.title')}
            </h3>
            <p className="text-[14px] ml-30 text-slate-400 max-w-xs md:text-right font-light leading-relaxed">
              {t('controlMonitoring.footer.subtitle')}
            </p>
          </div>
        </section>
    </div>
  )
}

// ─────────────────────────────────────────────
// ДОПОЛНИТЕЛЬНЫЙ КОНТЕНТ ПО КАЖДОМУ РАЗДЕЛУ
// Каждое текстовое поле — объект { ru, ky, en }.
// Локализация применяется один раз через localizeExtra() ниже,
// поэтому сами компоненты-секции (SectionPitch, ChecklistText и т.д.)
// продолжают получать обычные строки и их менять не нужно.
// ─────────────────────────────────────────────
const sectionExtras = {
  // ─── 1. ПРОМЫШЛЕННАЯ СВЯЗЬ И ОПОВЕЩЕНИЕ ───
  'promyshlennaya-svyaz': {
    bannerDescription: {
      ru: 'Обеспечиваем мгновенный обмен критически важной информацией на всех уровнях предприятия',
      ky: 'Ишкананын бардык деңгээлинде өзгөчө маанилүү маалыматтын дароо алмашуусун камсыз кылабыз',
      en: 'We ensure instant exchange of mission-critical information at every level of the enterprise',
    },
    pitch: {
      title: {
        ru: 'Предприятие всегда на связи',
        ky: 'Ишкана дайыма байланышта',
        en: 'The enterprise is always connected',
      },
      desc: {
        ru: 'Обеспечиваем связь и оповещение между руководством и сотрудниками, технологическими участками, которые зависят друг от друга. Оповещение при потенциальных и реальных ЧС.',
        ky: 'Жетекчилик менен кызматкерлердин, бири-бирине көз каранды технологиялык бөлүмдөрдүн ортосунда байланыш жана кабарлоо системасын камсыз кылабыз. Потенциалдуу жана чыныгы өзгөчө кырдаалдарда кабарлоо жүргүзүлөт.',
        en: 'We provide communication and notification between management and employees, and between interdependent process areas. Alerts are issued for both potential and actual emergencies.',
      },
    },
    featureCardsHeading: {
      ru: 'Реализуем сразу несколько систем на базе одного оборудования',
      ky: 'Бир эле жабдыктын негизинде бир нече системаны бир мезгилде ишке ашырабыз',
      en: 'We deploy several systems at once on a single set of equipment',
    },
    featureCards: [
      { title: { ru: 'Диспетчерский пульт связи', ky: 'Диспетчерлик байланыш пульту', en: 'Dispatcher communication console' }, image: imgPult },
      { title: { ru: 'Переговорное устройство', ky: 'Сүйлөшүү түзмөгү', en: 'Intercom unit' }, image: imgDevice },
      { title: { ru: 'Громкоговоритель', ky: 'Үн күчөткүч (динамик)', en: 'Loudspeaker' }, image: imgSpeaker },
    ],
    advantagesHeading: {
      ru: 'Система Armtel устойчива к жёстким промышленным условиям',
      ky: 'Armtel системасы катаал өндүрүштүк шарттарга туруктуу',
      en: 'The Armtel system is resistant to harsh industrial conditions',
    },
    advantages: [
      { icon: 'shield-loc', text: {
        ru: 'Взрывозащищённое исполнение для зон 1 и 2',
        ky: '1- жана 2-зоналар үчүн жарылуудан корголгон аткарылыш',
        en: 'Explosion-proof design for Zones 1 and 2',
      }},
      { icon: 'shield-check', text: {
        ru: 'Корпуса, устойчивые к химии и абразивам',
        ky: 'Химиялык жана абразивдик таасирлерге туруктуу корпустар',
        en: 'Housings resistant to chemicals and abrasives',
      }},
      { icon: 'lock', text: {
        ru: 'Высокая степень защиты оболочки',
        ky: 'Корпустун жогорку даражадагы коргоосу (IP)',
        en: 'High degree of enclosure protection',
      }},
      { icon: 'bell', text: {
        ru: 'Активное и пассивное шумоподавление',
        ky: 'Активдүү жана пассивдүү шумду басуу',
        en: 'Active and passive noise suppression',
      }},
    ],
    cta: {
      title: {
        ru: 'Переходите от разрозненных устройств к единой экосистеме связи',
        ky: 'Чачкын түзмөктөрдөн бирдиктүү байланыш экосистемасына өтүңүз',
        en: 'Move from scattered devices to a unified communication ecosystem',
      },
      desc: {
        ru: 'Рассчитаем стоимость проекта и подключимся на любом этапе реализации',
        ky: 'Долбоордун наркын эсептеп беребиз жана ишке ашыруунун каалаган этабында кошулабыз',
        en: 'We will calculate the project cost and can join at any stage of implementation',
      },
    },
  },

  // ─── 2. КОМПЛЕКСНЫЕ СИСТЕМЫ БЕЗОПАСНОСТИ ───
  'sistemy-bezopasnosti': {
    bannerDescription: {
      ru: 'Системы для защиты объекта от потенциальных угроз: криминальных, террористических, противоправных действий, аварий и стихийных бедствий',
      ky: 'Объектти потенциалдуу коркунучтардан коргоо системалары: кылмыштуулук, террористтик, мыйзамсыз аракеттер, кырсыктар жана табигый кырсыктар',
      en: 'Systems to protect a facility from potential threats: criminal, terrorist, and unlawful acts, accidents, and natural disasters',
    },
    pitch: {
      title: {
        ru: 'Комплексная защита от угроз вместо точечного устранения уязвимостей',
        ky: 'Алсыз жерлерди жекелеп жоюунун ордуна коркунучтардан комплекстүү коргоо',
        en: 'Comprehensive threat protection instead of fixing vulnerabilities one by one',
      },
      desc: {
        ru: 'Комплексная система безопасности (КСБ) — это набор технических средств для защиты объекта от угроз. Обеспечиваем согласованную работу всех компонентов систем для комплексной защиты от угроз.',
        ky: 'Комплекстүү коопсуздук системасы (ККС) — объектти коркунучтардан коргоо үчүн техникалык каражаттардын жыйындысы. Коркунучтардан комплекстүү коргоо үчүн системанын бардык компоненттеринин макулдашылган иштешин камсыз кылабыз.',
        en: 'An integrated security system (ISS) is a set of technical tools for protecting a facility from threats. We ensure the coordinated operation of all system components for comprehensive threat protection.',
      },
    },
    quote: {
      ru: 'Создание КСБ регламентировано ГОСТ Р 53704-2009 — национальным стандартом Российской Федерации «Системы безопасности комплексные и интегрированные»',
      ky: 'ККСти түзүү ГОСТ Р 53704-2009 — Россия Федерациясынын «Комплекстүү жана интеграцияланган коопсуздук системалары» улуттук стандарты менен жөнгө салынат',
      en: 'The creation of an ISS is governed by GOST R 53704-2009 — the Russian national standard "Comprehensive and Integrated Security Systems"',
    },
    checklistHeading: {
      ru: 'Контроль рисков и безопасность бизнеса',
      ky: 'Тобокелдиктерди контролдоо жана бизнестин коопсуздугу',
      en: 'Risk control and business security',
    },
    checklistSubheading: {
      ru: 'предиктивная защита ключевых активов бизнеса и исполнение регламентов',
      ky: 'бизнестин негизги активдерин алдын ала коргоо жана регламенттерди аткаруу',
      en: 'predictive protection of key business assets and regulatory compliance',
    },
    checklist: [
      {
        title: {
          ru: 'Защита от сбоев в операционной деятельности',
          ky: 'Операциялык иштин үзгүлтүктөрүнөн коргоо',
          en: 'Protection against operational disruptions',
        },
        text: {
          ru: 'система предиктивно сообщает о рисках, которые могут прервать непрерывность производства и привести к потерям',
          ky: 'система өндүрүштүн үзгүлтүксүздүгүн бузуп, чыгымга алып келе турган тобокелдиктер жөнүндө алдын ала кабарлайт',
          en: 'the system predictively flags risks that could interrupt production continuity and lead to losses',
        },
      },
      {
        title: {
          ru: 'Выполнение требований для безопасности персонала',
          ky: 'Кызматкерлердин коопсуздугуна койгон талаптарды аткаруу',
          en: 'Meeting personnel safety requirements',
        },
        text: {
          ru: 'помогаем контролировать соблюдение норм охраны труда (ОТ) и пожарной безопасности (ПБ), защищаем от несанкционированного доступа',
          ky: 'эмгекти коргоо (ЭК) жана өрт коопсуздугу (ӨК) нормаларынын сакталышын контролдоого жардам беребиз, уруксатсыз кирүүдөн коргойбуз',
          en: 'we help monitor compliance with labor protection and fire safety regulations, and guard against unauthorized access',
        },
      },
      {
        title: {
          ru: 'Прозрачное администрирование систем и быстрое выявление инцидентов',
          ky: 'Системаларды ачык-айкын башкаруу жана инциденттерди тез аныктоо',
          en: 'Transparent system administration and fast incident detection',
        },
        text: {
          ru: 'выявляем уязвимости и реагируем для их устранения, создаём единые регламенты, обеспечиваем совместимость оборудования для контроля и администрирования критически важных систем',
          ky: 'алсыз жерлерди аныктап, аларды жоюуга чара көрөбүз, бирдиктүү регламенттерди түзөбүз, маанилүү системаларды контролдоо жана башкаруу үчүн жабдыктардын ылайыкташтыгын камсыз кылабыз',
          en: 'we identify vulnerabilities and act to eliminate them, build unified regulations, and ensure equipment compatibility for monitoring and administering mission-critical systems',
        },
      },
      {
        title: {
          ru: 'Защита от правовых рисков',
          ky: 'Укуктук тобокелдиктерден коргоо',
          en: 'Protection against legal risks',
        },
        text: {
          ru: 'полное соответствие ваших объектов требованиям регуляторов, минимизация риска правовой ответственности и проверок',
          ky: 'сиздин объекттериңиздин жөнгө салуучу органдардын талаптарына толук ылайык келиши, укуктук жоопкерчилик жана текшерүү тобокелин азайтуу',
          en: 'full compliance of your facilities with regulatory requirements, minimizing the risk of legal liability and inspections',
        },
      },
      {
        title: {
          ru: 'Оптимизация организационных процессов',
          ky: 'Уюштуруу процесстерин оптималдаштыруу',
          en: 'Optimization of organizational processes',
        },
        text: {
          ru: 'меры для предотвращения аварий, инцидентов, контроль качества персонала',
          ky: 'кырсыктардын, инциденттердин алдын алуу чаралары, кызматкерлердин сапатын контролдоо',
          en: 'measures to prevent accidents and incidents, and quality control of personnel',
        },
      },
    ],
    statCardsHeading: {
      ru: 'Единая система с потенциалом для масштабирования',
      ky: 'Кеңейтүү потенциалы бар бирдиктүү система',
      en: 'A unified system with scaling potential',
    },
    statCardsSubheading: {
      ru: 'развиваем систему безопасности под задачи бизнеса',
      ky: 'коопсуздук системасын бизнестин милдеттерине ылайык өркүндөтөбүз',
      en: 'we evolve the security system to match your business needs',
    },
    statCards: [
      {
        icon: 'topology-star',
        title: {
          ru: 'Реализуем несколько систем на базе одного оборудования',
          ky: 'Бир жабдыктын негизинде бир нече системаны ишке ашырабыз',
          en: 'We implement multiple systems on a single set of equipment',
        },
        desc: {
          ru: 'Системы связи, локальная система оповещения, СОУЭ и СО УСТА на базе оборудования Armtel',
          ky: 'Armtel жабдыгынын негизинде байланыш системалары, жергиликтүү кабарлоо системасы, СОУЭ жана СО УСТА',
          en: 'Communication systems, local alarm system, fire evacuation alert (SOUE) and emergency shutdown automation (SO USTA), all based on Armtel equipment',
        },
      },
      {
        icon: 'tools',
        title: {
          ru: 'Масштабируем систему по мере роста бизнеса',
          ky: 'Бизнес өскөн сайын системаны кеңейтебиз',
          en: 'We scale the system as your business grows',
        },
        desc: {
          ru: 'Добавляем новое оборудование по мере роста объекта, внедряем дополнительные функции при изменении требований',
          ky: 'Объект өсүшүнө жараша жаңы жабдыктарды кошобуз, талаптар өзгөргөндө кошумча функцияларды киргизебиз',
          en: 'We add new equipment as the facility grows and roll out additional features when requirements change',
        },
      },
      {
        icon: 'device-laptop',
        title: {
          ru: 'Модернизируем без полной замены оборудования',
          ky: 'Жабдыктарды толугу менен алмаштырбай эле модернизациялайбыз',
          en: 'We upgrade without fully replacing equipment',
        },
        desc: {
          ru: 'Обеспечиваем преемственность между разными поколениями оборудования Armtel',
          ky: 'Armtel жабдыгынын ар кандай муундарынын ортосунда уланмалуулукту камсыз кылабыз',
          en: 'We ensure continuity between different generations of Armtel equipment',
        },
      },
    ],
    cta: {
      title: {
        ru: 'Переходите от разрозненных устройств к единой экосистеме безопасности',
        ky: 'Чачкын түзмөктөрдөн бирдиктүү коопсуздук экосистемасына өтүңүз',
        en: 'Move from scattered devices to a unified security ecosystem',
      },
      desc: {
        ru: 'Рассчитаем стоимость проекта и подключимся на любом этапе реализации',
        ky: 'Долбоордун наркын эсептеп беребиз жана ишке ашыруунун каалаган этабында кошулабыз',
        en: 'We will calculate the project cost and can join at any stage of implementation',
      },
    },
  },

  // ─── 3. ЭЛЕКТРООБОРУДОВАНИЕ ───
  'elektrooborudovanie': {
    bannerDescription: {
      ru: 'Создаём решения для надёжного электроснабжения и инженерной инфраструктуры',
      ky: 'Ишенимдүү электрмен жабдуу жана инженердик инфраструктура үчүн чечимдерди түзөбүз',
      en: 'We create solutions for reliable power supply and engineering infrastructure',
    },
    pitch: {
      title: {
        ru: 'Собственная торговая марка оборудования',
        ky: 'Жабдыктардын өзүбүздүн соода маркасы',
        en: 'Our own equipment brand',
      },
      desc: {
        ru: 'Для построения надёжных систем связи и безопасности: громкоговорящей, диспетчерской, оперативно-технологической связи, оповещения и других сопутствующих инженерных сетей.',
        ky: 'Ишенимдүү байланыш жана коопсуздук системаларын курууга арналган: үн күчөтүү, диспетчерлик, оперативдик-технологиялык байланыш, кабарлоо жана башка тиешелүү инженердик тармактар.',
        en: 'For building reliable communication and security systems: public-address, dispatcher, operational-process communication, alerting, and other related engineering networks.',
      },
    },
    statCardsHeading: {
      ru: 'Создаём интегрированные системы, которые:',
      ky: 'Биз төмөнкүдөй интеграцияланган системаларды түзөбүз:',
      en: 'We build integrated systems that:',
    },
    statCards: [
      {
        icon: 'plug',
        title: { ru: 'гарантируют', ky: 'камсыздайт', en: 'guarantee' },
        desc: {
          ru: 'стабильное электропитание оборудования',
          ky: 'жабдыктардын туруктуу электр менен жабдылышын',
          en: 'stable power supply to equipment',
        },
      },
      {
        icon: 'tools',
        title: { ru: 'организуют', ky: 'уюштурат', en: 'organize' },
        desc: {
          ru: 'надёжную кабельную инфраструктуру',
          ky: 'ишенимдүү кабелдик инфраструктураны',
          en: 'reliable cabling infrastructure',
        },
      },
      {
        icon: 'bulb',
        title: { ru: 'обеспечивают', ky: 'камсыз кылат', en: 'provide' },
        desc: {
          ru: 'эффективное промышленное освещение',
          ky: 'натыйжалуу өндүрүштүк жарыктандырууну',
          en: 'efficient industrial lighting',
        },
      },
      {
        icon: 'device-laptop',
        title: { ru: 'помогают', ky: 'жардам берет', en: 'help' },
        desc: {
          ru: 'контролировать и управлять системами в режиме реального времени',
          ky: 'системаларды чыныгы убакыт режиминде контролдоого жана башкарууга',
          en: 'monitor and control systems in real time',
        },
      },
    ],
    connectedHeading: {
      ru: 'Нам доверяет более 70% российских промышленных предприятий',
      ky: 'Россиялык өндүрүштүк ишканалардын 70%дан ашыгы бизге ишенет',
      en: 'We are trusted by more than 70% of Russian industrial enterprises',
    },
    connectedCards: [
      {
        icon: 'tools',
        title: {
          ru: 'Разрабатываем и проектируем оборудование',
          ky: 'Жабдыктарды иштеп чыгабыз жана долбоорлойбуз',
          en: 'We develop and design the equipment',
        },
        desc: {
          ru: 'Полностью управляем жизненным циклом продуктов Armtel. Поддерживаем разные поколения систем, оказываем сервисную поддержку.',
          ky: 'Armtel продукциясынын жашоо циклин толугу менен башкарабыз. Системанын ар кандай муундарын колдойбуз, тейлөө кызматын көрсөтөбүз.',
          en: 'We fully manage the life cycle of Armtel products. We support different generations of systems and provide service support.',
        },
      },
      {
        icon: 'shield-check',
        title: {
          ru: 'Гарантируем совместимость',
          ky: 'Ылайыкташтыкка кепилдик беребиз',
          en: 'We guarantee compatibility',
        },
        desc: {
          ru: 'Оборудование на базе Armtel бесшовно интегрируется друг с другом. Берём ответственность за работоспособность всей системы.',
          ky: 'Armtel негизиндеги жабдыктар бири-бири менен үзгүлтүксүз интеграцияланат. Бүт системанын иштешине жоопкерчилик алабыз.',
          en: 'Armtel-based equipment integrates seamlessly with each other. We take responsibility for the performance of the entire system.',
        },
      },
    ],
    cta: {
      title: {
        ru: 'Подберём оборудование под ваши задачи',
        ky: 'Сиздин милдеттериңизге жабдык тандап беребиз',
        en: 'We will select equipment to fit your needs',
      },
      desc: {
        ru: 'Рассчитаем стоимость проекта и подключимся на любом этапе реализации',
        ky: 'Долбоордун наркын эсептеп беребиз жана ишке ашыруунун каалаган этабында кошулабыз',
        en: 'We will calculate the project cost and can join at any stage of implementation',
      },
    },
  },

  // ─── 4. ИНФРАСТРУКТУРА ───
  'infrastruktura': {
    bannerDescription: {
      ru: 'Создаём надёжную цифровую инфраструктуру, которая работает на ваш бизнес',
      ky: 'Сиздин бизнесиңиз үчүн иштей турган ишенимдүү санариптик инфраструктураны түзөбүз',
      en: 'We build reliable digital infrastructure that works for your business',
    },
    statCardsHeading: {
      ru: 'Создаём надёжный ИТ-фундамент',
      ky: 'Ишенимдүү ИТ-фундаментти түзөбүз',
      en: 'We build a reliable IT foundation',
    },
    statCardsSubheading: {
      ru: 'для развития бизнеса и комфортной работы пользователей',
      ky: 'бизнести өнүктүрүү жана колдонуучулардын ыңгайлуу иштеши үчүн',
      en: 'for business growth and a comfortable user experience',
    },
    statCards: [
      {
        icon: 'device-tv',
        title: {
          ru: 'высокая скорость передачи информации',
          ky: 'маалымат берүүнүн жогорку ылдамдыгы',
          en: 'high-speed data transmission',
        },
      },
      {
        icon: 'router',
        title: {
          ru: 'бесперебойный доступ к данным',
          ky: 'маалыматтарга үзгүлтүксүз жетки',
          en: 'uninterrupted access to data',
        },
      },
      {
        icon: 'shield-lock',
        title: {
          ru: 'защита критически важных процессов',
          ky: 'өзгөчө маанилүү процесстерди коргоо',
          en: 'protection of mission-critical processes',
        },
      },
    ],
    connectedHeading: {
      ru: 'Нам доверяет более 70% российских промышленных предприятий',
      ky: 'Россиялык өндүрүштүк ишканалардын 70%дан ашыгы бизге ишенет',
      en: 'We are trusted by more than 70% of Russian industrial enterprises',
    },
    connectedCards: [
      {
        icon: 'tools',
        title: {
          ru: 'Разрабатываем и проектируем оборудование',
          ky: 'Жабдыктарды иштеп чыгабыз жана долбоорлойбуз',
          en: 'We develop and design the equipment',
        },
        desc: {
          ru: 'Полностью управляем жизненным циклом продуктов Armtel. Поддерживаем разные поколения систем, оказываем сервисную поддержку.',
          ky: 'Armtel продукциясынын жашоо циклин толугу менен башкарабыз. Системанын ар кандай муундарын колдойбуз, тейлөө кызматын көрсөтөбүз.',
          en: 'We fully manage the life cycle of Armtel products. We support different generations of systems and provide service support.',
        },
      },
      {
        icon: 'user-shield',
        title: {
          ru: 'Осуществляем индивидуальный подход',
          ky: 'Жекелештирилген мамилени колдонобуз',
          en: 'We take an individual approach',
        },
        desc: {
          ru: 'Разрабатываем архитектуры под специфику вашего бизнеса и задачи.',
          ky: 'Бизнесиңиздин өзгөчөлүгүнө жана милдеттерине ылайык архитектураларды иштеп чыгабыз.',
          en: 'We design architectures tailored to the specifics of your business and tasks.',
        },
      },
      {
        icon: 'wifi',
        title: {
          ru: 'Круглосуточная поддержка',
          ky: 'Күн-түн тейлөө',
          en: 'Round-the-clock support',
        },
        desc: {
          ru: 'Обеспечиваем непрерывную техническую поддержку на всех этапах эксплуатации.',
          ky: 'Пайдалануунун бардык этабында үзгүлтүксүз техникалык колдоо көрсөтөбүз.',
          en: 'We provide continuous technical support at every stage of operation.',
        },
      },
      {
        icon: 'server',
        title: {
          ru: 'Опираемся на опыт более 25 лет',
          ky: '25 жылдан ашык тажрыйбага таянабыз',
          en: 'We draw on more than 25 years of experience',
        },
        desc: {
          ru: 'Разрабатываем и производим оборудование с учётом многолетнего опыта внедрений.',
          ky: 'Көп жылдык ишке ашыруу тажрыйбасын эске алып жабдыктарды иштеп чыгабыз жана өндүрөбүз.',
          en: 'We design and manufacture equipment based on many years of implementation experience.',
        },
      },
    ],
    cta: {
      title: {
        ru: 'Подберём ИТ-решение под ваши задачи',
        ky: 'Сиздин милдеттериңизге ИТ-чечим тандап беребиз',
        en: 'We will select an IT solution to fit your needs',
      },
      desc: {
        ru: 'Рассчитаем стоимость проекта и подключимся на любом этапе реализации',
        ky: 'Долбоордун наркын эсептеп беребиз жана ишке ашыруунун каалаган этабында кошулабыз',
        en: 'We will calculate the project cost and can join at any stage of implementation',
      },
    },
  },
}

const defaultExtra = {
  bannerDescription: null,
  pitch: null,
  quote: null,
  checklist: [],
  statCards: [],
  connectedCards: [],
  featureCards: [],
  advantages: [],
  cta: {
    title: {
      ru: 'Подберём решение под ваши задачи',
      ky: 'Сиздин милдеттериңизге чечим тандап беребиз',
      en: 'We will select a solution to fit your needs',
    },
    desc: {
      ru: 'Рассчитаем стоимость проекта и подключимся на любом этапе реализации',
      ky: 'Долбоордун наркын эсептеп беребиз жана ишке ашыруунун каалаган этабында кошулабыз',
      en: 'We will calculate the project cost and can join at any stage of implementation',
    },
  },
}

// ─────────────────────────────────────────────
// Локализация: подставляет нужный язык в каждое поле,
// с фоллбэком на ru, если перевода нет
// ─────────────────────────────────────────────
function pick(field, lang) {
  if (!field) return field
  if (typeof field === 'string') return field
  return field[lang] || field.ru || ''
}

function localizeExtra(extra, lang) {
  return {
    bannerDescription: pick(extra.bannerDescription, lang),
    pitch: extra.pitch
      ? { title: pick(extra.pitch.title, lang), desc: pick(extra.pitch.desc, lang) }
      : null,
    quote: pick(extra.quote, lang),
    checklistHeading: pick(extra.checklistHeading, lang),
    checklistSubheading: pick(extra.checklistSubheading, lang),
    checklist: (extra.checklist || []).map((item) => ({
      title: pick(item.title, lang),
      text: pick(item.text, lang),
    })),
    statCardsHeading: pick(extra.statCardsHeading, lang),
    statCardsSubheading: pick(extra.statCardsSubheading, lang),
    statCards: (extra.statCards || []).map((item) => ({
      icon: item.icon,
      title: pick(item.title, lang),
      desc: pick(item.desc, lang),
    })),
    connectedHeading: pick(extra.connectedHeading, lang),
    connectedCards: (extra.connectedCards || []).map((item) => ({
      icon: item.icon,
      title: pick(item.title, lang),
      desc: pick(item.desc, lang),
    })),
    featureCardsHeading: pick(extra.featureCardsHeading, lang),
    featureCards: (extra.featureCards || []).map((card) => ({
      image: card.image,
      title: pick(card.title, lang),
    })),
    advantagesHeading: pick(extra.advantagesHeading, lang),
    advantages: (extra.advantages || []).map((adv) => ({
      icon: adv.icon,
      text: pick(adv.text, lang),
    })),
    cta: {
      title: pick(extra.cta.title, lang),
      desc: pick(extra.cta.desc, lang),
    },
  }
}

export default function SectionPage({ params }) {
  const { id } = use(params)
  const { i18n } = useTranslation()
  const lang = ['ru', 'ky', 'en'].includes(i18n.language) ? i18n.language : 'ru'
  const uiT = solutionTranslations[lang] || solutionTranslations.ru

  const section = solutionsData.find((s) => s.id === id)
  if (!section) {
    return <div className="text-center py-20">{uiT.sectionNotFound}</div>
  }

  const extraRaw = { ...defaultExtra, ...(sectionExtras[section.id] || {}) }
  const extra = localizeExtra(extraRaw, lang)

  return (
    <section className="w-full">
      <div className="mx-auto px-4 xl:px-0 max-w-[1280px] pt-4">
        <Under
          text={uiT.breadcrumbHome}
          link="/"
          text1={uiT.breadcrumbSolutions}
          link1="/solution"
          text2={section.title[lang] || section.title.ru}
        />
      </div>

      <SectionHeroBanner section={section} lang={lang} description={extra.bannerDescription} />

      <div className="container mx-auto px-4 xl:px-0 max-w-[1280px]">
        <SectionGrid section={section} lang={lang} />
        <SectionPitch pitch={extra.pitch} />
        <QuoteBox text={extra.quote} />
        <ChecklistText
          heading={extra.checklistHeading}
          subheading={extra.checklistSubheading}
          items={extra.checklist}
        />
        <StatCardsGrid
          heading={extra.statCardsHeading}
          subheading={extra.statCardsSubheading}
          items={extra.statCards}
          columns={extra.statCards?.length === 4 ? 4 : 3}
        />
        <ConnectedCardsRow heading={extra.connectedHeading} items={extra.connectedCards} />
        <SectionFeatureCards heading={extra.featureCardsHeading} cards={extra.featureCards} />
        <SectionAdvantages heading={extra.advantagesHeading} items={extra.advantages} />
        <SectionCTA title={extra.cta.title} desc={extra.cta.desc} ctaLabel={uiT.requestEstimate} />
      </div>
    </section>
  )
}