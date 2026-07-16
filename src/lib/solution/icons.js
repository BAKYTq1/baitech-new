// ─── ИМПОРТЫ ВСЕХ ИКОНОК (те же файлы, что и в CorporateBlock.jsx) ───
// ВАЖНО: если у алиаса "@/assets/..." не настроен, замени на относительный
// путь от этого файла (lib/solution/icons.js) до папки assets, например
import IconTopologyStar from '../../../assets/svg/icon_prom_sv_blue (1).svg';
import IconBell        from '../../../assets/svg/icon_sis_opov_evak_blue.svg';
import IconBell2       from '../../../assets/svg/ChatGPT_Image_14_июл._2026_г.__16_45_51-removebg-preview.png';
import IconDeviceTv    from '../../../assets/svg/icon_t_sv_blue.svg';
import IconWifi        from '../../../assets/svg/ChatGPT_Image_14_июл._2026_г.__17_05_10-removebg-preview.png';
import IconCamera      from '../../../assets/svg/icon_sis_video_tele_nabl_blue.svg';
import IconShieldLock  from '../../../assets/svg/icon_sis_ohr_sign_blue.svg';
import IconDoor        from '../../../assets/svg/icon_skud_blue.svg';
// import IconUserShield  from '../../../assets/svg/иконка16-blue-mirrored.svg';
import IconBellEvac    from '../../../assets/svg/ико23-blue-mirrored.svg';
import IconTools       from '../../../assets/svg/ChatGPT_Image_14_июл._2026_г.__17_00_25-removebg-preview.png';
import IconPlug        from '../../../assets/svg/icon_sis_elektropit-blue-mirrored.svg';
import IconBulb        from '../../../assets/svg/icon_prom_osv-blue-mirrored.svg';
import IconLaptop      from '../../../assets/svg/icon_monitor_kontrol-blue-mirrored.svg';
import IconRouter      from '../../../assets/svg/icon_seti_sis_pered_dann-blue-mirrored.svg';
import IconServer      from '../../../assets/svg/icon_sis_obr_hran_dann-blue-mirrored (1).svg';
import IconClock       from '../../../assets/svg/icon_sis_chas-blue-mirrored.svg';
import IconTopology    from '../../../assets/svg/иконка11-blue-mirrored.svg';
import IconShieldCheck from '../../../assets/svg/shield-check-blue.svg';
import IconUserShield  from '../../../assets/svg/icon-ksb-sopriusta_blue.svg';
import IconSistemaChasogikasii  from '../../../assets/svg/icon_besp_shir_dost-blue-mirrored.svg';
import IconBesprovonyeradiolinia    from '../../../assets/svg/icon_sis_chas-blue-mirrored.svg';


// ─── ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ: рендерит импортированную картинку как <img> ───
// next/image-импорт svg/png — это объект вида { src, width, height } либо строка,
// поэтому вытаскиваем .src, если он есть.
function img(source, alt = '') {
  const url = source?.src || source;
  return <img src={url} alt={alt} className="w-full h-full object-contain" />;
}

// ─── МАППИНГ ИКОНОК (зеркало ICON_MAP из CorporateBlock.jsx) ───
const icons = {
  'topology-star':   img(IconTopologyStar),
  'bell':            img(IconBell),
  'bell2':           img(IconBell2),
  'device-tv':       img(IconDeviceTv),
  'wifi':            img(IconWifi),
  'camera':          img(IconCamera),
  'shield-lock':     img(IconShieldLock),
  'door':            img(IconDoor),
  'user-shield':     img(IconUserShield),
  'bell-evac':       img(IconBellEvac),
  'tools':           img(IconTools),
  'plug':            img(IconPlug),
  'bulb':            img(IconBulb),
  'device-laptop':   img(IconLaptop),
  'router':          img(IconRouter),
  'server':          img(IconServer),
  'shield-check':    img(IconShieldCheck),
  'wireless-access': img(IconSistemaChasogikasii),
  'wireless-line':   img(IconBesprovonyeradiolinia),

  // ─── старые ручные SVG-иконки, которых нет среди файлов выше ───
  // (оставлены на случай, если где-то используются другие ключи)
  'building-store': <svg viewBox="0 0 64 64" fill="none"><path d="M8 24l6-14h36l6 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><path d="M8 24a8 8 0 0016 0 8 8 0 0016 0 8 8 0 0016 0" stroke="currentColor" strokeWidth="2.5"/><path d="M8 32v22h48V32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><rect x="24" y="38" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2.5"/></svg>,
  home: <svg viewBox="0 0 64 64" fill="none"><path d="M6 30L32 8l26 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 26v26h40V26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><rect x="24" y="36" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2.5"/></svg>,
  car: <svg viewBox="0 0 64 64" fill="none"><path d="M10 34l8-16h28l8 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><rect x="4" y="34" width="56" height="14" rx="4" stroke="currentColor" strokeWidth="2.5"/><circle cx="16" cy="52" r="6" stroke="currentColor" strokeWidth="2.5"/><circle cx="48" cy="52" r="6" stroke="currentColor" strokeWidth="2.5"/><path d="M4 42h56" stroke="currentColor" strokeWidth="2.5"/></svg>,
  lock: <svg viewBox="0 0 64 64" fill="none"><rect x="10" y="28" width="44" height="30" rx="4" stroke="currentColor" strokeWidth="2.5"/><path d="M20 28V20a12 12 0 0124 0v8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><circle cx="32" cy="44" r="4" stroke="currentColor" strokeWidth="2.5"/><line x1="32" y1="48" x2="32" y2="54" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>,
}

export { icons }