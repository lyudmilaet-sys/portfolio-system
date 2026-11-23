import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

export type WorkCardProps = {
  /** Назва роботи, наприклад «Old Lion | Book Mobile App». Це й текст посилання. */
  title: string;
  /** Короткий опис одним рядком: тип продукту · період. */
  description: string;
  /** Куди веде картка: сторінка кейсу. */
  href: string;
  /**
   * Мокап кейсу, що лежить на аркуші в «кишені»: картинка, імпортована з `src/assets`
   * (`import cover from "@/assets/…"`). Показується верхня частина, обрізана по ширині аркуша.
   */
  image: StaticImageData;
  /**
   * Опис обкладинки для скрінрідера. За замовчуванням порожній: назва вже стоїть під картинкою,
   * тож обкладинку вважаємо декоративною. Заповнюйте, лише якщо на ній є важлива інформація.
   */
  imageAlt?: string;
  /** Підказка браузеру, яку ширину займає картка, щоб він обрав розмір картинки. */
  sizes?: string;
};

/**
 * Картка роботи: обкладинка-«кишеня» (`aspect-cover`, `rounded-card`), назва й короткий опис.
 * Кишеня: задня стінка `line`, аркуш `canvas` з мокапом (`rounded-sheet`, відступи `sheet-inset`),
 * передня стінка `surface` (`rounded-pocket` зверху, висота `pocket-front`). При наведенні аркуш висувається.
 * Уся картка — одне посилання на сторінку кейсу.
 */
export function WorkCard({
  title,
  description,
  href,
  image,
  imageAlt = "",
  sizes = "(min-width: 1024px) 33vw, 100vw",
}: WorkCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-6 rounded-card focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
    >
      {/* Pocket: back wall → sheet with the mockup → front wall on top. */}
      <div className="relative aspect-cover overflow-hidden rounded-card bg-line">
        <div className="absolute inset-x-sheet-inset top-4 bottom-4 overflow-hidden rounded-sheet bg-canvas transition-transform motion-safe:group-hover:-translate-y-3 motion-safe:group-focus-visible:-translate-y-3">
          <Image src={image} alt={imageAlt} fill sizes={sizes} className="object-cover object-top" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-pocket-front rounded-t-pocket rounded-b-card bg-surface" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-lead font-semibold text-ink transition-colors group-hover:text-accent group-hover:underline">
          {title}
        </span>
        <span className="text-caption text-ink-muted">{description}</span>
      </div>
    </Link>
  );
}
