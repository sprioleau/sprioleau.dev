"use client";

import { useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import composeClasses from "@/utils/composeClasses";
import toastMessage from "@/utils/toastMessage";
import Clap from "../Icons/Clap";

type Props = {
  serverClapCount: number;
  clientClapCount: number;
  setClientClapCount: React.Dispatch<React.SetStateAction<number>>;
};

const MAX_CLAP_COUNT = 15;

export default function ClapButton({ serverClapCount, clientClapCount, setClientClapCount }: Props) {
  const countRef = useRef<HTMLDivElement>(null);
  const [hasSeenToast, setHasSeenToast] = useState(false);
  const persistClaps = useDebouncedCallback(async (newClapsTotal: number) => {
    try {
      const response = await fetch("/claps", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ newClapsTotal }),
        keepalive: true,
      });
      if (!response.ok) throw new Error("Could not save claps");
    } catch {
      toastMessage("Could not save your claps. Please try again.", "claps");
    }
  }, 1500);

  function updateClapCount(event: React.MouseEvent<HTMLButtonElement>) {
    const nextCount = clientClapCount + (event.altKey ? -1 : 1);

    if (nextCount < 0 || nextCount > MAX_CLAP_COUNT) return;

    if (nextCount === MAX_CLAP_COUNT && !hasSeenToast) {
      toastMessage("Thanks for the claps!");
      setHasSeenToast(true);
    }

    const count = countRef.current;
    if (count && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      count.getAnimations().forEach((animation) => animation.cancel());
      count.animate(
        [
          { transform: "translate(-50%, 0) scale(0.05)", opacity: 0 },
          { transform: "translate(-50%, -40px)", opacity: 1, offset: 0.55 },
          { transform: "translate(-50%, -40px)", opacity: 1, offset: 0.8 },
          { transform: "translate(-50%, -40px)", opacity: 0 },
        ],
        { duration: 850, easing: "ease-out" },
      );
    }

    setClientClapCount(nextCount);
    persistClaps(serverClapCount + nextCount);
  }

  return (
    <div className={composeClasses({ "clap-button": true, pulse: clientClapCount < MAX_CLAP_COUNT })}>
      <div className="clap-button__wrapper">
        <button
          type="button"
          className="clap-button__button clap no-frame"
          aria-label="Clap for this site"
          onClick={updateClapCount}
        >
          <Clap />
          <span
            className="clap-button__fill"
            style={{ transform: `scaleY(${clientClapCount / MAX_CLAP_COUNT})` }}
          />
        </button>
        <div className="clap-button__count" ref={countRef} aria-hidden>{clientClapCount}</div>
        <span className="clap-button__status" aria-live="polite">
          {clientClapCount > 0 ? `${clientClapCount} of ${MAX_CLAP_COUNT} claps added` : ""}
        </span>
      </div>
    </div>
  );
}
