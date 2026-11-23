import Link from "next/link";
import { Fragment } from "react";

export type Language = {
  /** Код мови для атрибутів `lang` і `hrefLang`: `en`, `de`. */
  code: string;
  /** Короткий видимий підпис: `EN`, `DE`. */
  label: string;
  /** Повна назва мовою цієї ж мови, для скрінрідера: `English`, `Deutsch`. */
  name: string;
  /** Адреса цієї сторінки іншою мовою. */
  href: string;
};

export type LanguageSwitchProps = {
  /** Мови в порядку показу. За замовчуванням — EN і DE. */
  languages?: Language[];
  /** `code` поточної мови сторінки. */
  current: string;
  /** Назва блоку для скрінрідера (`aria-label`). */
  ariaLabel?: string;
};

export const defaultLanguages: Language[] = [
  { code: "en", label: "EN", name: "English", href: "/en" },
  { code: "de", label: "DE", name: "Deutsch", href: "/de" },
];

// outline-ink stays on all the time (invisible without a width), so transition-colors
// doesn't animate the focus ring colour.
const linkBase =
  "rounded-control text-nav outline-ink transition-colors " +
  "focus-visible:outline-2 focus-visible:outline-offset-4";

/**
 * Перемикач мов сайту: EN / DE.
 * Поточна мова — `ink` з `aria-current`, інша — `ink-muted`; між ними скісна риска.
 * Кожен пункт — посилання на ту саму сторінку іншою мовою.
 */
export function LanguageSwitch({ languages = defaultLanguages, current, ariaLabel = "Language" }: LanguageSwitchProps) {
  return (
    <nav aria-label={ariaLabel} className="font-sans">
      <ul className="flex items-center gap-2 text-nav">
        {languages.map((language, index) => {
          const active = language.code === current;
          return (
            <Fragment key={language.code}>
              {index > 0 && (
                <li aria-hidden="true" className="text-ink">
                  /
                </li>
              )}
              <li>
                <Link
                  href={language.href}
                  hrefLang={language.code}
                  lang={language.code}
                  aria-current={active ? "true" : undefined}
                  className={`${linkBase} ${
                    active ? "text-ink" : "text-ink-muted hover:text-accent hover:link-underline"
                  }`}
                >
                  {language.label}
                  <span className="sr-only"> — {language.name}</span>
                </Link>
              </li>
            </Fragment>
          );
        })}
      </ul>
    </nav>
  );
}
