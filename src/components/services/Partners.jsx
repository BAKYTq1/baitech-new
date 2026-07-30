'use client'
import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import styles from "./Partners.module.css";

// Logos copied into ./logos — swap the imports (or the `logos` prop) for your own.
import logo01 from "../../../assets/svg/1partner.svg";
import logo02 from "../../../assets/svg/2partner.svg";
import logo03 from "../../../assets/svg/3.svg";
import logo04 from "../../../assets/svg/4.svg";
import logo05 from "../../../assets/svg/5.svg";
import logo06 from "../../../assets/svg/6.svg";
import logo07 from "../../../assets/svg/7.svg";
import logo08 from "../../../assets/svg/8.svg";
import logo09 from "../../../assets/svg/9.svg";
import logo10 from "../../../assets/svg/10.svg";
import logo11 from "../../../assets/svg/11.svg";
import logo12 from "../../../assets/svg/12.svg";
import logo13 from "../../../assets/svg/13.svg";
import logo14 from "../../../assets/svg/14.svg";
import logo15 from "../../../assets/svg/15.svg";
import logo16 from "../../../assets/svg/16.svg";
import logo17 from "../../../assets/svg/17.svg";
import logo18 from "../../../assets/svg/18.svg";
import logo19 from "../../../assets/svg/19.svg";
import { useTranslation } from "react-i18next";

const DEFAULT_PARTNERS = [
  { src: logo01, name: "Партнёр 1" },
  { src: logo02, name: "Партнёр 2" },
  { src: logo03, name: "Партнёр 3" },
  { src: logo04, name: "Партнёр 4" },
  { src: logo05, name: "Партнёр 5" },
  { src: logo06, name: "Партнёр 6" },
  { src: logo07, name: "Партнёр 7" },
  { src: logo08, name: "Партнёр 8" },
  { src: logo09, name: "Партнёр 9" },
  { src: logo10, name: "Партнёр 10" },
  { src: logo11, name: "Партнёр 11" },
  { src: logo12, name: "Партнёр 12" },
  { src: logo13, name: "Партнёр 13" },
  { src: logo14, name: "Партнёр 14" },
  { src: logo15, name: "Партнёр 15" },
  { src: logo16, name: "Партнёр 16" },
  { src: logo17, name: "Партнёр 17" },
  { src: logo18, name: "Партнёр 18" },
  { src: logo19, name: "Партнёр 19" },
];

const AUTOPLAY_MS = 3000;

/**
 * Partners — left-aligned "our partners" heading over an infinite,
 * draggable logo carousel that auto-advances every 3 seconds.
 *
 * Props:
 *  - title     {string}  heading text
 *  - partners  {Array<{src, name, href?}>}  defaults to the 19 bundled logos
 */
export default function Partners({ partners = DEFAULT_PARTNERS }) {
  const count = partners.length;
  const {t} = useTranslation();

  // Render the list 3x so we can scroll indefinitely in either direction
  // and silently "rewind" once we drift into the outer copies.
  const loopItems = useMemo(() => {
    const copies = [0, 1, 2];
    return copies.flatMap((copyIndex) =>
      partners.map((partner, i) => ({
        ...partner,
        key: `${copyIndex}-${i}`,
        hidden: copyIndex !== 1, // only the middle copy is exposed to a11y tree
      }))
    );
  }, [partners]);

  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const firstItemRef = useRef(null);

  const [step, setStep] = useState(0); // px width of one item, incl. gap
  const [offset, setOffset] = useState(0);
  const [transitionOn, setTransitionOn] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const startXRef = useRef(0);
  const startOffsetRef = useRef(0);
  const pausedRef = useRef(false);
  const reducedMotionRef = useRef(false);

  // Measure tile width (+ gap) so the carousel adapts to any breakpoint.
  useEffect(() => {
    function measure() {
      if (!firstItemRef.current || !trackRef.current) return;
      const width = firstItemRef.current.getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(trackRef.current).columnGap || "0") || 0;
      setStep(width + gap);
    }
    measure();
    const ro = new ResizeObserver(measure);
    if (firstItemRef.current) ro.observe(firstItemRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [count]);

  // Start centred on the middle copy whenever the measured step changes.
  useEffect(() => {
    if (step > 0) {
      setTransitionOn(false);
      setOffset(-(step * count));
    }
  }, [step, count]);

  useEffect(() => {
    reducedMotionRef.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Autoplay: shift by one tile every 3s unless paused (hover) or dragging.
  useEffect(() => {
    if (step === 0 || reducedMotionRef.current) return;
    const id = setInterval(() => {
      if (draggingRef.current || pausedRef.current) return;
      setTransitionOn(true);
      setOffset((prev) => prev - step);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [step]);

  // After a move (auto or drag) finishes, snap invisibly back into the
  // middle copy's range so the carousel can keep scrolling forever.
  function rewindIfNeeded(value) {
    const setWidth = step * count;
    if (setWidth === 0) return value;
    if (value <= -2 * setWidth || value > 0) {
      setTransitionOn(false);
      const corrected = value <= -2 * setWidth ? value + setWidth : value - setWidth;
      requestAnimationFrame(() => requestAnimationFrame(() => setTransitionOn(true)));
      return corrected;
    }
    return value;
  }

  function handleTransitionEnd() {
    setOffset((prev) => rewindIfNeeded(prev));
  }

  // --- Drag to scroll (mouse or touch) ---
  function handlePointerDown(e) {
    draggingRef.current = true;
    movedRef.current = false;
    startXRef.current = e.clientX;
    startOffsetRef.current = offset;
    setTransitionOn(false);
    setIsDragging(true);
    viewportRef.current?.setPointerCapture?.(e.pointerId);
  }

  function handlePointerMove(e) {
    if (!draggingRef.current) return;
    const dx = e.clientX - startXRef.current;
    if (Math.abs(dx) > 3) movedRef.current = true;
    setOffset(startOffsetRef.current + dx);
  }

  function handlePointerUp() {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setIsDragging(false);
    setTransitionOn(true);
    setOffset((prev) => rewindIfNeeded(prev));
  }

  // Ignore the click a drag ends on, so dragging past a logo doesn't
  // also trigger its link.
  function handleLinkClick(e) {
    if (movedRef.current) e.preventDefault();
  }

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h2 className={styles.title}>{t("OurPartners")}</h2>
      </header>

      {count === 0 ? (
        <p className={styles.empty}>Список партнёров скоро появится.</p>
      ) : (
        <div
          className={`${styles.viewport} ${isDragging ? styles.dragging : ""}`}
          ref={viewportRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onMouseEnter={() => (pausedRef.current = true)}
          onMouseLeave={() => (pausedRef.current = false)}
        >
          <ul
            className={`${styles.track} ${transitionOn ? styles.animate : styles.noTransition}`}
            ref={trackRef}
            style={{ transform: `translateX(${offset}px)` }}
            onTransitionEnd={handleTransitionEnd}
          >
            {loopItems.map((partner, idx) => (
              <li
                className={styles.item}
                key={partner.key}
                ref={idx === 0 ? firstItemRef : null}
                aria-hidden={partner.hidden || undefined}
              >
                {partner.href ? (
                  <a
                    className={styles.link}
                    href={partner.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={partner.name}
                    tabIndex={partner.hidden ? -1 : undefined}
                    onClick={handleLinkClick}
                    draggable={false}
                  />
                ) : null}
                <Image
                  className={styles.logo}
                  src={partner.src}
                  alt={partner.name}
                  fill
                  sizes="(max-width: 600px) 40vw, (max-width: 1000px) 22vw, 190px"
                  draggable={false}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}