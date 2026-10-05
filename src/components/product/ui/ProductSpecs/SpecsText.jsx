import React from "react";

// Метка = текст до первого двоеточия (не длиннее 40 символов, не просто число)
const splitLabel = (line) => {
  const idx = line.indexOf(":");
  if (idx <= 0 || idx > 40) return null;
  const label = line.slice(0, idx).trim();
  if (!label || /^\d+$/.test(label)) return null;
  return { label, value: line.slice(idx + 1) };
};

export default function SpecsText({ text }) {
  const lines = String(text || "").split(/\r\n|\n/);

  return (
    <>
      {lines.map((line, i) => {
        // Ручная разметка из админки: **Модель**: FF-Q24A
        const md = line.match(/^\s*\*\*(.+?)\*\*\s*:?\s*(.*)$/);
        const parts = md
          ? { label: md[1], value: ` ${md[2]}` }
          : splitLabel(line);

        return (
          <span key={i}>
            {parts ? (
              <>
                <strong className="spec-label">{parts.label}:</strong>
                {parts.value}
              </>
            ) : (
              line
            )}
            <br />
          </span>
        );
      })}
    </>
  );
}
