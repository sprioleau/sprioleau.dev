"use client";

import { useEffect, useState, type MouseEvent } from "react";
import FocusTrap from "focus-trap-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../Logo";
import { portfolioSections } from "@/portfolio/routes";
import type { NavLink } from "@/schemas/types";
import icons from "../Icons";
import composeClasses from "@/utils/composeClasses";

type Props = {
  navLinks: NavLink[];
};

export default function NavClient({ navLinks }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  function open() {
    setIsExpanded(true);
  }

  function close() {
    setIsExpanded(false);
  }

  useEffect(() => {
    if (!isExpanded) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isExpanded]);

  function handleSectionClick(event: MouseEvent<HTMLAnchorElement>, slug: string) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    close();
    if (!isHomePage || !document.getElementById(slug)) return;

    event.preventDefault();
    window.location.assign(`#${slug}`);
  }

  function handleLogoClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    close();
    if (!isHomePage) return;

    event.preventDefault();
    if (window.location.hash) window.history.pushState(null, "", pathname);
    window.scrollTo(0, 0);
  }

  return (
    <nav
      className={composeClasses({ nav: true, "nav-expanded": isExpanded })}
      aria-label="main navigation"
    >
      <div className="nav__logo">
        <Link
          href="/"
          className="nav__logo-link"
          aria-label="Homepage"
          prefetch={false}
          onClick={handleLogoClick}
        >
          <Logo />
        </Link>
      </div>
      <div className="nav__main-content">
        <FocusTrap
          active={isExpanded}
          focusTrapOptions={{ onDeactivate: close, allowOutsideClick: true }}
        >
          <div className="nav__focus-trap">
            <div
              className="nav__links-wrapper"
              id="site-navigation"
            >
              <ul className="nav__links">
                {navLinks.map(({ _id, navLabel, sectionSlug }) => {
                  const sectionPage = portfolioSections.find(({ slug }) => slug === sectionSlug);
                  const href = sectionPage?.path ?? `/#${sectionSlug}`;

                  return (
                    <li
                      className="nav__link"
                      key={_id}
                    >
                      <Link
                        href={href}
                        prefetch={false}
                        aria-current={pathname === href ? "page" : undefined}
                        className="nav__link__link shadow-link"
                        data-title={navLabel}
                        onClick={(event) => handleSectionClick(event, sectionSlug)}
                      >
                        {navLabel}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              {isExpanded && (
                <button
                  id="close"
                  className="nav__icon nav__icon--close no-frame"
                  type="button"
                  aria-label="Close menu"
                  onClick={close}
                >
                  {icons.close}
                </button>
              )}
            </div>
            <button
              id="open"
              className="nav__icon nav__icon--menu no-frame"
              type="button"
              onClick={open}
              aria-label="Open menu"
              aria-expanded={isExpanded}
              aria-controls="site-navigation"
            >
              {icons.menu}
            </button>
            <div
              className="nav__dismiss"
              onClick={close}
              aria-hidden="true"
            />
          </div>
        </FocusTrap>
      </div>
    </nav>
  );
}
