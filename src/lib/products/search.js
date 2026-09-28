import Fuse from "fuse.js";

const SEARCH_SYNONYMS = {
  камера: ["камера", "камеры", "камеру", "камерой", "camera", "cctv", "видеокамера", "видеокамеры"],
  видеонаблюдение: ["видеонаблюдение", "видеонаблюд", "cctv", "camera", "камеры", "камера"],
  регистратор: ["регистратор", "регистраторы", "видеорегистратор", "видеорегистраторы", "nvr", "dvr"],
  домофон: ["домофон", "домофоны", "видеодомофон", "видеодомофоны", "intercom"],
  монитор: ["монитор", "мониторы", "monitor", "display"],
  компьютер: ["компьютер", "компьютеры", "computer", "pc"],
  ноутбук: ["ноутбук", "ноутбуки", "laptop", "notebook"],
  телефон: ["телефон", "телефоны", "смартфон", "смартфоны", "phone", "smartphone"],
  сеть: ["сеть", "сетевое", "сетевой", "network", "wifi", "wi-fi"],
  роутер: ["роутер", "роутеры", "router", "маршрутизатор"],
  коммутатор: ["коммутатор", "коммутаторы", "switch", "сетевой коммутатор"],
  точка_доступа: ["точка доступа", "точки доступа", "ap", "access point"],
  видеокарта: ["видеокарта", "видеокарты", "видюха", "gpu", "graphics card"],
  шкаф: ["шкаф", "шкафы", "серверный шкаф", "server rack", "rack"],
  dahua: ["dahua", "дахуа", "даха"],
  hikvision: ["hikvision", "хиквижн", "хиквизион", "хик"],
  tplink: ["tp-link", "tplink", "тп линк", "тплинк"],
  ajax: ["ajax", "аджакс", "аякс"],
  baitech: ["baitech", "байтек", "байтех"],
};

const normalizeText = (value) => {
  return String(value || "")
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/[^a-zа-я0-9]+/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
};

// ─── Разбор ценового намерения ───────────────────────────────────────────────

const NUMBER_TOKEN = "[\\d]+(?:[.,]\\d+)?\\s*(?:к|k|тыс\\.?)?";

const toNumber = (str) => {
  let s = String(str || "").toLowerCase().replace(/\s+/g, "").replace(",", ".");
  let mult = 1;
  if (/тыс\.?$/i.test(s)) { mult = 1000; s = s.replace(/тыс\.?$/i, ""); }
  else if (/[кk]$/i.test(s)) { mult = 1000; s = s.replace(/[кk]$/i, ""); }
  const num = parseFloat(s);
  return Number.isFinite(num) ? Math.round(num * mult) : null;
};

export const parsePriceIntent = (rawQuery) => {
  let text = String(rawQuery || "").toLowerCase().replace(/ё/g, "е");
  text = text.replace(/(\d)\s+(?=\d{3}(\D|$))/g, "$1");

  let minPrice = null;
  let maxPrice = null;

  const rangeRe = new RegExp(`от\\s*(${NUMBER_TOKEN})\\s*до\\s*(${NUMBER_TOKEN})`, "i");
  const rangeMatch = text.match(rangeRe);

  if (rangeMatch) {
    minPrice = toNumber(rangeMatch[1]);
    maxPrice = toNumber(rangeMatch[2]);
    text = text.replace(rangeMatch[0], " ");
  } else {
    const maxPatterns = [
      new RegExp(`не\\s*дороже\\s*(${NUMBER_TOKEN})`, "i"),
      new RegExp(`дешевле\\s*(${NUMBER_TOKEN})`, "i"),
      new RegExp(`менее\\s*(${NUMBER_TOKEN})`, "i"),
      new RegExp(`до\\s*(${NUMBER_TOKEN})`, "i"),
      new RegExp(`за\\s*(${NUMBER_TOKEN})`, "i"),
    ];
    for (const re of maxPatterns) {
      const m = text.match(re);
      if (m) { maxPrice = toNumber(m[1]); text = text.replace(m[0], " "); break; }
    }

    const minPatterns = [
      new RegExp(`дороже\\s*(${NUMBER_TOKEN})`, "i"),
      new RegExp(`более\\s*(${NUMBER_TOKEN})`, "i"),
      new RegExp(`от\\s*(${NUMBER_TOKEN})`, "i"),
    ];
    for (const re of minPatterns) {
      const m = text.match(re);
      if (m) { minPrice = toNumber(m[1]); text = text.replace(m[0], " "); break; }
    }
  }

  text = text.replace(/\b(сом|сомов|som|kgs|руб|рублей|₽)\b/gi, " ");
  text = text.replace(/\s+/g, " ").trim();

  if (minPrice !== null && maxPrice !== null && minPrice > maxPrice) {
    [minPrice, maxPrice] = [maxPrice, minPrice];
  }

  return { keywords: text, minPrice, maxPrice };
};

// ─── Разбор намерения сортировки ────────────────────────────────────────────

const SORT_ASC_PATTERNS = [
  /самы[йх]?\s+дешев\w*/i, /самая\s+дешев\w*/i, /подешевле/i,
  /дешевле\s+всех/i, /дешев\w*/i, /недорог\w*/i, /бюджетн\w*/i,
];

const SORT_DESC_PATTERNS = [
  /самы[йх]?\s+дорог\w*/i, /самая\s+дорог\w*/i, /подороже/i,
  /дороже\s+всех/i, /дорог\w*/i, /топов\w*/i, /премиум\w*/i,
  /флагман\w*/i, /лучш\w*/i,
];

export const parseSortIntent = (text) => {
  let remaining = String(text || "");
  let sort = null;

  for (const re of SORT_ASC_PATTERNS) {
    const m = remaining.match(re);
    if (m) { sort = "price_asc"; remaining = remaining.replace(m[0], " "); break; }
  }
  if (!sort) {
    for (const re of SORT_DESC_PATTERNS) {
      const m = remaining.match(re);
      if (m) { sort = "price_desc"; remaining = remaining.replace(m[0], " "); break; }
    }
  }

  remaining = remaining.replace(/\s+/g, " ").trim();
  return { keywords: remaining, sort };
};

// ─── Карты id → название ─────────────────────────────────────────────────────

export const buildCategoryNameMap = (categories) => {
  const map = {};
  const walk = (items) => {
    (items || []).forEach((cat) => {
      if (cat?.id != null && cat?.name) map[cat.id] = cat.name;
      if (Array.isArray(cat.subcategories) && cat.subcategories.length > 0) {
        walk(cat.subcategories);
      }
    });
  };
  walk(categories);
  return map;
};

export const buildBrandNameMap = (brands) => {
  const map = {};
  (brands || []).forEach((brand) => {
    if (brand?.id != null && brand?.name) map[brand.id] = brand.name;
  });
  return map;
};

// ─── Fuse: индекс и извлечение полей ────────────────────────────────────────

const pickLangVariants = (product, baseField) => [
  product?.[baseField],
  product?.[`${baseField}_ru`],
  product?.[`${baseField}_ky`],
  product?.[`${baseField}_en`],
].filter(Boolean);

const getBrandName = (product, brandsById) => {
  if (product?.brand && typeof product.brand === "object") return product.brand.name || "";
  return brandsById[product?.brand] || "";
};

const getCategoryName = (product, categoriesById) => {
  if (product?.category && typeof product.category === "object") return product.category.name || "";
  return categoriesById[product?.category] || "";
};

const buildFuseKeys = (categoriesById, brandsById) => [
  { name: "name", weight: 0.35, getFn: (p) => pickLangVariants(p, "name") },
  { name: "article", weight: 0.25 },
  { name: "brandName", weight: 0.15, getFn: (p) => getBrandName(p, brandsById) },
  { name: "categoryName", weight: 0.1, getFn: (p) => getCategoryName(p, categoriesById) },
  { name: "characteristics", weight: 0.1, getFn: (p) => pickLangVariants(p, "characteristics") },
  { name: "description", weight: 0.05, getFn: (p) => pickLangVariants(p, "description") },
];

const FUSE_OPTIONS_BASE = {
  includeScore: true,
  useExtendedSearch: true,
  ignoreLocation: false,
  threshold: 0.3,
  distance: 60,
  minMatchCharLength: 3,
};

// Кэшируем Fuse-индекс по ссылке на массив товаров, чтобы не пересобирать
// его на каждый рендер/нажатие клавиши, если данные не изменились.
const fuseCache = new WeakMap();

const getOrBuildFuse = (products, categoriesById, brandsById) => {
  const cached = fuseCache.get(products);
  if (cached && cached.categoriesById === categoriesById && cached.brandsById === brandsById) {
    return cached.fuse;
  }

  const fuse = new Fuse(products, {
    ...FUSE_OPTIONS_BASE,
    keys: buildFuseKeys(categoriesById, brandsById),
  });

  fuseCache.set(products, { fuse, categoriesById, brandsById });
  return fuse;
};

// ─── Поиск по словам запроса с ручным пересечением (AND) ───────────────────
//
// Раньше здесь использовался встроенный логический синтаксис Fuse
// ($and/$or/$path/$val) — но в сочетании с полями на основе getFn
// (brandName, categoryName) он вёл себя непредсказуемо и иногда возвращал
// пустой результат. Поэтому логика AND между словами запроса и OR между
// синонимами одного слова теперь реализована вручную:
//
//  1. Каждое слово запроса (+ его синонимы) ищется через Fuse ОТДЕЛЬНО,
//     синонимы объединяются в одну OR-строку через " | " (это штатный,
//     надёжно работающий синтаксис extended search Fuse).
//  2. Результаты по каждому слову пересекаются (AND) в обычном JS-коде —
//     товар должен встретиться во всех наборах, чтобы попасть в финальный
//     результат.
//
// Опечатки по-прежнему прощаются, потому что каждый отдельный вариант
// ищется через штатный fuzzy-алгоритм Fuse (threshold в FUSE_OPTIONS_BASE).

const searchByTokens = (fuse, tokens) => {
  const matchedSets = tokens.map((token) => {
    const synonymGroup = Object.values(SEARCH_SYNONYMS).find((synonyms) =>
      synonyms.map(normalizeText).includes(token)
    );
    const variants = synonymGroup
      ? Array.from(new Set([token, ...synonymGroup.map(normalizeText)]))
      : [token];

    const pattern = variants.join(" | ");
    const found = fuse.search(pattern);
    return new Set(found.map((r) => r.item));
  });

  if (matchedSets.length === 0) return [];

  let intersection = matchedSets[0];
  for (let i = 1; i < matchedSets.length; i++) {
    const nextSet = matchedSets[i];
    intersection = new Set([...intersection].filter((item) => nextSet.has(item)));
  }

  return Array.from(intersection);
};

// ─── Цена / сортировка (фильтруются уже поверх результата Fuse) ────────────

const matchesPriceRange = (product, minPrice, maxPrice) => {
  if (minPrice === null && maxPrice === null) return true;
  const price = Number(product?.price);
  if (!Number.isFinite(price)) return false;
  if (minPrice !== null && price < minPrice) return false;
  if (maxPrice !== null && price > maxPrice) return false;
  return true;
};

const sortByPrice = (products, direction) => {
  return [...products].sort((a, b) => {
    const priceA = Number(a?.price);
    const priceB = Number(b?.price);
    const validA = Number.isFinite(priceA);
    const validB = Number.isFinite(priceB);
    if (!validA && !validB) return 0;
    if (!validA) return 1;
    if (!validB) return -1;
    return direction === "price_asc" ? priceA - priceB : priceB - priceA;
  });
};

// ─── Публичное API (сигнатуры не изменились) ────────────────────────────────

/**
 * options:
 *  - categoriesById: { [id]: name } — из buildCategoryNameMap(categories)
 *  - brandsById: { [id]: name } — из buildBrandNameMap(brands)
 */
export const searchProducts = (products, query, options = {}) => {
  const list = products || [];
  const { categoriesById = {}, brandsById = {} } = options;

  const { keywords: afterPrice, minPrice, maxPrice } = parsePriceIntent(query);
  const { keywords, sort } = parseSortIntent(afterPrice);
  const normalizedKeywords = normalizeText(keywords);

  let result;

  if (!normalizedKeywords) {
    result = list.slice();
  } else {
    const fuse = getOrBuildFuse(list, categoriesById, brandsById);
    const tokens = normalizedKeywords.split(" ").filter(Boolean);
    result = searchByTokens(fuse, tokens);
  }

  if (minPrice !== null || maxPrice !== null) {
    result = result.filter((product) => matchesPriceRange(product, minPrice, maxPrice));
  }

  if (sort === "price_asc" || sort === "price_desc") {
    result = sortByPrice(result, sort);
  }

  return result;
};

export const productMatchesSearch = (product, query, options = {}) => {
  return searchProducts([product], query, options).length > 0;
};

export const getSearchIntent = (query) => {
  const { keywords: afterPrice, minPrice, maxPrice } = parsePriceIntent(query);
  const { keywords, sort } = parseSortIntent(afterPrice);
  return { keywords, minPrice, maxPrice, sort };
};

export { normalizeText };