"use client";

import Link from "next/link";
import {
  useId,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type MouseEvent,
  type ReactNode,
  type Ref,
} from "react";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "md" | "lg";

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> & {
  /** Текст кнопки. Коротка дія дієсловом: «Подивитись кейси», «Завантажити CV». */
  children: ReactNode;
  /** `primary` — головна дія (заливка `accent`); `secondary` — другорядна (без заливки, межа `ink-muted`). */
  variant?: ButtonVariant;
  /** `md` — звичайна (текст `text-button`); `lg` — велика (текст `text-lead`). */
  size?: ButtonSize;
  /**
   * Адреса, куди веде кнопка. З нею кнопка стає посиланням (`<a>`) з тим самим виглядом:
   * для переходу на сторінку, до розділу (`#works`) чи на файл. Без неї — `<button>` для дії на місці.
   */
  href?: string;
  /**
   * Лише разом із `href`: завантажити файл замість відкрити його (атрибут `download`).
   * `true` — з назвою файлу з адреси; рядок — з цією назвою.
   */
  download?: boolean | string;
  /**
   * Вимикає кнопку. Кнопка лишається у фокусі й читається скрінрідером:
   * ставиться `aria-disabled="true"`, а не атрибут `disabled`; натискання ігнорується.
   * Вимкнена кнопка завжди `<button>`, навіть якщо передано `href`.
   */
  disabled?: boolean;
  /**
   * Пояснення, чому кнопка вимкнена. Показується під кнопкою лише коли `disabled`
   * і зв'язане з нею через `aria-describedby`.
   */
  disabledReason?: string;
  /** Посилання на сам елемент (`<button>` або `<a>`), наприклад щоб повернути на нього фокус. */
  ref?: Ref<HTMLButtonElement>;
};

// outline-ink stays on all the time (invisible without a width), so transition-colors
// doesn't animate the focus ring colour.
const base =
  "inline-flex items-center justify-center rounded-control font-sans outline-ink transition-colors " +
  "focus-visible:outline-2 focus-visible:outline-offset-2";

const sizes: Record<ButtonSize, string> = {
  md: "px-6 py-4 text-button",
  lg: "px-8 py-3 text-lead font-medium",
};

// The secondary border is an inset ring, so it doesn't change the button size:
// both variants have the same height.
const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-canvas hover:bg-ink cursor-pointer",
  secondary: "ring-2 ring-inset ring-ink-muted text-accent hover:bg-surface cursor-pointer",
};

const disabledVariants: Record<ButtonVariant, string> = {
  primary: "bg-surface text-ink-muted cursor-not-allowed",
  secondary: "bg-surface text-ink-muted cursor-not-allowed",
};

/**
 * Кнопка дизайн-системи: одна дія на сайті-портфоліо.
 * Два варіанти (`primary`, `secondary`), два розміри (`md`, `lg`), кути `rounded-control`.
 * З `href` — посилання з виглядом кнопки. Вимкнений стан — через `aria-disabled`, з поясненням під кнопкою.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  download,
  disabled = false,
  disabledReason,
  type = "button",
  className,
  onClick,
  ref,
  "aria-describedby": describedBy,
  ...rest
}: ButtonProps) {
  const reasonId = useId();
  const showReason = disabled && Boolean(disabledReason);
  const describedByIds = [describedBy, showReason ? reasonId : undefined].filter(Boolean).join(" ") || undefined;

  const classes = [base, sizes[size], disabled ? disabledVariants[variant] : variants[variant], className]
    .filter(Boolean)
    .join(" ");

  // Link mode: same look, but an <a>. A download or a file goes through a plain <a>,
  // pages and sections through next/link.
  if (href && !disabled) {
    const anchorProps = {
      ...(rest as AnchorHTMLAttributes<HTMLAnchorElement>),
      className: classes,
      "aria-describedby": describedByIds,
      onClick: onClick as unknown as AnchorHTMLAttributes<HTMLAnchorElement>["onClick"],
      ref: ref as unknown as Ref<HTMLAnchorElement>,
    };
    return download ? (
      <a {...anchorProps} href={href} download={download}>
        {children}
      </a>
    ) : (
      <Link {...anchorProps} href={href}>
        {children}
      </Link>
    );
  }

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      // aria-disabled doesn't block clicks or form submits by itself.
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  const button = (
    <button
      {...rest}
      ref={ref}
      type={type}
      className={classes}
      aria-disabled={disabled || undefined}
      aria-describedby={describedByIds}
      onClick={handleClick}
    >
      {children}
    </button>
  );

  if (!showReason) return button;

  return (
    <span className="inline-flex flex-col items-start gap-2">
      {button}
      <span id={reasonId} className="text-caption text-ink-muted">
        {disabledReason}
      </span>
    </span>
  );
}
