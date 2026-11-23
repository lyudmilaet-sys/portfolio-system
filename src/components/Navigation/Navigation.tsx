"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/Button/Button";

export type NavigationItem = {
  /** Текст пункту меню. */
  label: string;
  /** Адреса сторінки або якір розділу (`/about`, `#works`). */
  href: string;
};

export type NavigationProps = {
  /** Пункти меню зліва направо. За замовчуванням — About, Works, Contacts. */
  items?: NavigationItem[];
  /** `href` активного пункту (поточна сторінка). Йому ставиться `aria-current="page"`. */
  activeHref?: string;
  /** Підпис кнопки меню на вузькому екрані, коли меню закрите. */
  menuLabel?: string;
  /** Підпис кнопки меню, коли меню відкрите. */
  closeLabel?: string;
  /** Назва навігації для скрінрідера (`aria-label`). */
  ariaLabel?: string;
};

export const defaultNavigationItems: NavigationItem[] = [
  { label: "About", href: "#about" },
  { label: "Works", href: "#works" },
  { label: "Contacts", href: "#contacts" },
];

// outline-ink stays on all the time (invisible without a width), so transition-colors
// doesn't animate the focus ring colour.
const linkBase =
  "rounded-control text-nav outline-ink transition-colors " +
  "focus-visible:outline-2 focus-visible:outline-offset-4";

const linkState = (active: boolean) =>
  active ? "text-ink link-underline decoration-accent" : "text-ink hover:text-accent hover:link-underline";

/**
 * Навігація сайту: пункти меню.
 * На широкому екрані (від `md`) — рядок посилань; на вузькому — кнопка «Menu»,
 * що відкриває список поверх контенту. Escape закриває меню й повертає фокус на кнопку.
 */
export function Navigation({
  items = defaultNavigationItems,
  activeHref,
  menuLabel = "Menu",
  closeLabel = "Close",
  ariaLabel = "Main",
}: NavigationProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    // Clicking anywhere outside the navigation closes the menu too.
    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const renderLinks = (onNavigate?: () => void) =>
    items.map((item) => {
      const active = item.href === activeHref;
      return (
        <li key={item.href}>
          <Link
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`${linkBase} ${linkState(active)}`}
            onClick={onNavigate}
          >
            {item.label}
          </Link>
        </li>
      );
    });

  return (
    <nav ref={rootRef} aria-label={ariaLabel} className="relative font-sans">
      {/* Wide screen: a row of links. */}
      <ul className="hidden items-center gap-8 md:flex">{renderLinks()}</ul>

      {/* Narrow screen: a toggle button and a panel over the content. */}
      <div className="md:hidden">
        <Button
          ref={toggleRef}
          variant="secondary"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? closeLabel : menuLabel}
        </Button>
        <ul
          id={panelId}
          hidden={!open}
          className="absolute right-0 top-full z-10 mt-2 flex flex-col gap-6 rounded-card border border-line bg-canvas p-8"
        >
          {renderLinks(() => setOpen(false))}
        </ul>
      </div>
    </nav>
  );
}
