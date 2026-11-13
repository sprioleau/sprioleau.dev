"use client";

import Image from "next/image";
import { type PointerEvent, type ReactNode, useRef, useState } from "react";

const PREVIEW_WIDTH = 325;
const PREVIEW_HEIGHT = 182;

export default function ProjectTablePreview({ children }: { children: ReactNode }) {
  const [imageUrl, setImageUrl] = useState<string>();
  const previewRef = useRef<HTMLDivElement>(null);

  function updatePreview(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || !window.matchMedia("(min-width: 601px)").matches) return;

    const target = event.target instanceof Element ? event.target : null;
    const row = target?.closest<HTMLTableRowElement>("tr");
    const nextImage = row?.dataset.previewImage;

    if (nextImage !== imageUrl) setImageUrl(nextImage);
    if (!previewRef.current) return;

    const isNearRightEdge = event.clientX + PREVIEW_WIDTH + 10 > window.innerWidth;
    previewRef.current.style.left = `${isNearRightEdge ? event.clientX - PREVIEW_WIDTH - 10 : event.clientX + 10}px`;
    previewRef.current.style.top = `${Math.min(event.clientY + 20, window.innerHeight - PREVIEW_HEIGHT - 20)}px`;
  }

  return (
    <div onPointerMove={updatePreview} onPointerLeave={() => setImageUrl(undefined)}>
      {children}
      <div className="other-work__image" ref={previewRef} hidden={!imageUrl} aria-hidden>
        {imageUrl && <Image src={imageUrl} alt="" width={PREVIEW_WIDTH} height={PREVIEW_HEIGHT} />}
      </div>
    </div>
  );
}
