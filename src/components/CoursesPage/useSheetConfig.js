import { useEffect, useState } from "react";

const SHEET_URL = process.env.NEXT_PUBLIC_COURSES_SHEET_URL;

// Разбор CSV с поддержкой кавычек, запятых и переносов строк внутри ячеек
function parseCSV(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          cell += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cell += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(cell);
      cell = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += ch;
    }
  }
  if (cell !== "" || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

// Пропускаем только безопасные ссылки
export function safeLink(url, fallback) {
  const value = (url || "").trim();
  return /^(https?:\/\/|tel:|mailto:)/i.test(value) ? value : fallback;
}

export function useSheetConfig() {
  const [config, setConfig] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // если ссылки на таблицу нет, сразу показываем тексты по умолчанию
    if (!SHEET_URL) {
      setLoaded(true);
      return;
    }

    let cancelled = false;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000); // ждём максимум 5 сек

    fetch(SHEET_URL, { signal: controller.signal })
      .then((r) => (r.ok ? r.text() : Promise.reject()))
      .then((text) => {
        const [header, ...rows] = parseCSV(text);
        if (!header) return;
        const cols = header.map((h) => h.trim().toLowerCase());
        const result = {};

        rows.forEach((r) => {
          const key = (r[0] || "").trim().toLowerCase(); // ключи без учёта регистра
          if (!key) return;
          result[key] = {};
          cols.forEach((col, i) => {
            if (i > 0) result[key][col] = (r[i] || "").trim();
          });
        });

        if (!cancelled) setConfig(result);
      })
      .catch(() => {})
      .finally(() => {
        clearTimeout(timer);
        if (!cancelled) setLoaded(true);
      });

    return () => {
      cancelled = true;
      clearTimeout(timer);
      controller.abort();
    };
  }, []);

  return { config, loaded };
}
