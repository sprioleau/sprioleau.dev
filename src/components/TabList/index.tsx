"use client";

import { type KeyboardEvent, type ReactNode, useId, useState } from "react";

type Tab = {
  id: string;
  label: ReactNode;
  details: ReactNode;
};

export default function TabList({ tabs }: { tabs: Tab[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const listId = useId();

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number;

    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        nextIndex = (index + 1) % tabs.length;
        break;
      case "ArrowUp":
      case "ArrowLeft":
        nextIndex = (index + tabs.length - 1) % tabs.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    setCurrentIndex(nextIndex);
    document.getElementById(`${listId}-tab-${nextIndex}`)?.focus();
  }

  return (
    <div className="tab-list">
      <div
        className="tab-list__labels"
        role="tablist"
        aria-label="Work experience"
      >
        {tabs.map(({ id, label }, index) => (
          <button
            key={id}
            id={`${listId}-tab-${index}`}
            className="tab-list__label no-frame"
            type="button"
            role="tab"
            aria-selected={index === currentIndex}
            aria-controls={`${listId}-panel-${index}`}
            tabIndex={index === currentIndex ? 0 : -1}
            onClick={() => setCurrentIndex(index)}
            onKeyDown={(event) => handleTabKeyDown(event, index)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="tab-list__panels">
        {tabs.map(({ id, details }, index) => (
          <div
            key={id}
            id={`${listId}-panel-${index}`}
            className="tab-list__details"
            role="tabpanel"
            aria-labelledby={`${listId}-tab-${index}`}
            hidden={index !== currentIndex}
          >
            {details}
          </div>
        ))}
      </div>
    </div>
  );
}
