"use client";

import { useEffect, useRef } from "react";
import styles from "./styles.module.scss";

export default function Spotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spotlight = spotlightRef.current;
    if (!spotlight) return;

    const pointerMedia = window.matchMedia("(min-width: 601px) and (hover: hover) and (pointer: fine)");

    function updatePosition({ clientX, clientY }: PointerEvent) {
      if (!pointerMedia.matches || !spotlight) return;

      spotlight.style.setProperty("--spotlight-x", `${clientX}px`);
      spotlight.style.setProperty("--spotlight-y", `${clientY}px`);
      spotlight.style.setProperty("--spotlight-opacity", "1");
    }

    window.addEventListener("pointermove", updatePosition, { passive: true });
    return () => window.removeEventListener("pointermove", updatePosition);
  }, []);

  return <div className={styles.spotlight} ref={spotlightRef} aria-hidden />;
}
