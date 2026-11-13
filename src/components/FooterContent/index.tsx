"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import formatNumber from "@/utils/formatNumber";
import ClapButton from "../ClapButton";
import icons from "../Icons";

type Props = {
  children: ReactNode;
  contributions: number;
  serverClapCount: number;
};

export default function FooterContent({ children, contributions, serverClapCount }: Props) {
  const [clientClapCount, setClientClapCount] = useState(0);
  const totalClaps = serverClapCount + clientClapCount;

  const stats = [
    { label: "Page claps", value: totalClaps, icon: icons.clap },
    { label: "GitHub contributions in past year", value: contributions, icon: icons.commit },
  ].filter(({ value }) => value > 0);

  return (
    <>
      <ClapButton
        serverClapCount={serverClapCount}
        clientClapCount={clientClapCount}
        setClientClapCount={setClientClapCount}
      />
      {children}
      {stats.length > 0 && (
        <ul className="footer__stats">
          {stats.map(({ label, value, icon }) => (
            <li key={label} className="footer__stat tooltip" data-tooltip={label}>
              <p className="footer__stat-wrapper">
                <span aria-label={`${formatNumber(value)} ${label.toLowerCase()}`}>{formatNumber(value)}</span>
                <span className="icon" aria-hidden>{icon}</span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
