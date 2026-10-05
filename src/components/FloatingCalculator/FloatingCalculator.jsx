"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

const CALCULATOR_URL = "/calculator"; // ← адрес вашей страницы калькулятора

export default function FloatingCalculator({ href = CALCULATOR_URL }) {
  const router = useRouter();
  const [pressed, setPressed] = useState(false);
  const [ripples, setRipples] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((p) => [
      ...p,
      { x: e.clientX - rect.left, y: e.clientY - rect.top, id },
    ]);
    setTimeout(() => setRipples((p) => p.filter((r) => r.id !== id)), 700);
    setPressed(true);
    setTimeout(() => setPressed(false), 180);

    // небольшая задержка, чтобы успел показаться эффект нажатия
    setTimeout(() => router.push(href), 160);
  };

  // на сервере и до монтирования ничего не рисуем
  if (!mounted) return null;

  return createPortal(
    <>
      <style>{`
        .calc-root {
          position: fixed;
          bottom: calc(24px + env(safe-area-inset-bottom, 0px));
          right: 90px;
          z-index: 9997;
          pointer-events: none;
        }

        @media (min-width: 480px) {
          .calc-root {
            bottom: calc(32px + env(safe-area-inset-bottom, 0px));
            right: 106px;
          }
        }

        .calc-btn {
          position: relative;
          width: 58px;
          height: 58px;
          border-radius: 18px;
          border: none;
          cursor: pointer;
          outline: none;
          overflow: visible;
          flex-shrink: 0;
          background: linear-gradient(140deg, #2b7bff 0%, #005bff 100%);
          box-shadow:
            0 6px 24px rgba(0, 91, 255, 0.45),
            0 0 0 1px rgba(255, 255, 255, 0.1) inset;
          transition: transform 0.15s cubic-bezier(.34,1.56,.64,1), box-shadow 0.15s ease;
          touch-action: manipulation;
          user-select: none;
          -webkit-user-select: none;
          -webkit-tap-highlight-color: transparent;
          pointer-events: auto;
        }

        @media (min-width: 480px) {
          .calc-btn {
            width: 62px;
            height: 62px;
            border-radius: 20px;
          }
        }

        @media (hover: hover) {
          .calc-btn:hover {
            transform: scale(1.07) translateY(-2px);
            box-shadow:
              0 14px 40px rgba(0, 91, 255, 0.6),
              0 0 0 1px rgba(255, 255, 255, 0.15) inset;
          }
        }

        .calc-btn.pressed {
          transform: scale(0.91) !important;
          box-shadow: 0 3px 12px rgba(0, 91, 255, 0.3) !important;
        }

        .calc-clip {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          overflow: hidden;
        }

        .calc-inner {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .calc-ripple {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.4);
          transform: translate(-50%, -50%) scale(0);
          animation: calc-rip 0.6s ease-out forwards;
          pointer-events: none;
          z-index: 1;
        }
        @keyframes calc-rip {
          to { transform: translate(-50%, -50%) scale(18); opacity: 0; }
        }

        .calc-tooltip {
          position: absolute;
          right: calc(100% + 12px);
          top: 50%;
          transform: translateY(-50%);
          background: rgba(18, 22, 30, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: rgba(255, 255, 255, 0.75);
          font-size: 12px;
          font-weight: 500;
          padding: 5px 10px;
          border-radius: 8px;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .calc-btn:hover .calc-tooltip {
          opacity: 1;
        }
      `}</style>

      <div className="calc-root">
        <button
          className={`calc-btn ${pressed ? "pressed" : ""}`}
          onClick={handleClick}
          aria-label="Открыть калькулятор"
        >
          <div className="calc-clip">
            {ripples.map((r) => (
              <span
                key={r.id}
                className="calc-ripple"
                style={{ left: r.x, top: r.y }}
              />
            ))}
          </div>

          <span className="calc-tooltip">Калькулятор</span>

          <div className="calc-inner">
            <svg width="27" height="27" viewBox="0 0 24 24" fill="white">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5.97 4.06L14.09 6l1.41 1.41L16.91 6l1.06 1.06-1.41 1.41 1.41 1.41-1.06 1.06-1.41-1.4-1.41 1.41-1.06-1.06 1.41-1.41-1.41-1.42zm-6.78.66h5v1.5h-5v-1.5zM11.5 16h-2v2H8v-2H6v-1.5h2v-2h1.5v2h2V16zm6.5 1.25h-5v-1.5h5v1.5zm0-2.5h-5v-1.5h5v1.5z" />
            </svg>
          </div>
        </button>
      </div>
    </>,
    document.body,
  );
}
