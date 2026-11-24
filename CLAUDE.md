@AGENTS.md

# portfolio-system

Сайт-портфоліо Liudmyla Khlystun, зібраний на дизайн-системі: спершу токени й компоненти, потім сторінки. Зараз готовий перший екран (`src/app/page.tsx`).

## Проєкт і стек

- Next.js (App Router), TypeScript, Tailwind CSS v4, Storybook 10 (`@storybook/nextjs-vite`, аддони docs і a11y).
- Публікація: Vercel, проєкт `portfolio-system`, підключений до GitHub-репозиторію `lyudmilaet-sys/portfolio-system`.
- Скрипти: `npm run dev` (сайт, localhost:3000), `npm run build` (спершу Storybook у `public/storybook`, потім сайт), `npm run lint`, `npm run storybook` (localhost:6006), `npm run build-storybook`. Storybook публікується разом із сайтом за адресою `/storybook` (редирект на `/storybook/index.html` у `next.config.ts`).
- Токени — блок `@theme` у [src/app/globals.css](src/app/globals.css); це єдине джерело значень. Стандартні кольори (`--color-*`) і розміри тексту (`--text-*`) Tailwind скинуто.
- Шрифт — Inter (латиниця й кирилиця) у [src/app/fonts.ts](src/app/fonts.ts), насиченості `font-normal` (400), `font-medium` (500), `font-semibold` (600). Клас `font-sans`.

## Робота з Git

- Уся робота йде в гілці `main`.
- Нових гілок не створюй, поки я прямо не попрошу.
- Пуш у `main` публікує сайт (Vercel деплоїть кожен пуш автоматично), тому перед кожним пушем питай мене.

## Кольори

Сім токенів, назви — за роллю. Класи: `bg-*`, `text-*`, `border-*`, `ring-*`, `outline-*`, `decoration-*`.

| Токен | Для чого | Приклад |
| --- | --- | --- |
| `canvas` | фон сторінки; аркуш у кишені; текст на акцентній кнопці | `bg-canvas`, `text-canvas` |
| `surface` | передня стінка кишені, фон фото, наведення на кнопку без заливки, вимкнені кнопки й поля | `bg-surface` |
| `line` | лише декор: рамки карток і панелі меню, задня стінка кишені; не для тексту й не для меж полів | `bg-line`, `border-line` |
| `accent` | головна кнопка, текст другорядної кнопки, наведення на посилання, стрілки | `bg-accent`, `text-accent`, `decoration-accent` |
| `ink` | основний текст; наведення на головну кнопку; контур фокусу | `text-ink`, `bg-ink`, `outline-ink` |
| `ink-muted` | другорядний текст, підказка в полі; межа поля й кнопки без заливки | `text-ink-muted`, `border-ink-muted`, `ring-ink-muted` |
| `danger` | помилка в полі форми: текст, іконка й межа | `text-danger`, `border-danger` |

У Figma `ink` і `ink-muted` поки звуться `color/text` і `color/text-muted`.

## Типографіка

Вісім стилів; висота рядка, трекінг і жирність задані в `@theme` разом із розміром.

| Клас | Розмір / рядок | Жирність | Де |
| --- | --- | --- | --- |
| `text-caption` | 14 / 1.5 | — | опис кейсу, підпис поля, текст помилки, пояснення під кнопкою |
| `text-body` | 18 / 1.5 | — | значення поля, підпис під фото (+ `font-medium`), текст на телефоні |
| `text-lead` | 20 / 1.5 | — | лід першого екрана; назва кейсу (+ `font-semibold`); кнопка `lg` (+ `font-medium`) |
| `text-heading` | 32 / 1.2 | 500 | ім'я в хедері, заголовок на телефоні |
| `text-display` | 56 / 1.15, −0.01em | 600 | головний заголовок (від `xl`) |
| `text-display-tablet` | 44 / 1.15, −0.01em | 600 | головний заголовок (`md`–`lg`) |
| `text-nav` | 24 / 1.2 | 500 | пункти меню, EN / DE |
| `text-button` | 16 / 1 | 500 | кнопка `md` |

## Відступи, радіуси й пропорції

- **Відступи в компонентах:** кроки 2, 3, 4, 6, 8 у класах = 8, 12, 16, 24, 32 px (`gap-2`, `px-6`, `py-3`, `p-8`).
- **Розкладка сторінки** (лише в `src/app/*`): ширини `max-w-content` (1280), `max-w-headline` (660), `max-w-lead` (640), `w-photo` / `max-w-photo` (320); секційні відступи `section-40`, `section-48`, `section-64`, `section-80`, `section-96`, `section-120` (`pt-section-64`, `gap-section-96`, `px-section-80`). Брейкпоінти — стандартні `md`, `lg`, `xl`.
- **Радіуси:** `rounded-control` (пігулка: кнопки, поля, контур фокусу посилань), `rounded-card` (24: картки, фото, панель меню).
- **Форма кишені** (лише WorkCard): `rounded-sheet` (12, аркуш), `rounded-t-pocket` (48, верх передньої стінки), `inset-x-sheet-inset` (12%), `h-pocket-front` (58%).
- **Пропорції:** `aspect-cover` (2:1, обкладинка кейсу), `aspect-portrait` (5:6, фото).
- **Підкреслення посилань:** утиліта `link-underline` у `globals.css` (2 px, відступ 8 px), колір через `decoration-*`.

## Компоненти

Лежать у `src/components/<Назва>/`: компонент + одна історія `<Назва>.stories.tsx` (Playground з Controls) з документацією на сторінці Docs. Перш ніж брати компонент, читай його Docs.

| Компонент | Варіанти | Стани |
| --- | --- | --- |
| **Button** | `primary` / `secondary`; `md` / `lg`; без `href` — `<button>`, з `href` — `<a>` (`download` для файлу) | default, hover, focus, disabled (`aria-disabled` + `disabledReason`) |
| **FormField** | один: поле з підписом над ним | default, hover, focus, заповнене, помилка (`error` + `errorMessage`, іконка, `aria-invalid`), disabled (атрибут `disabled`) |
| **Navigation** | від `md` — рядок посилань; нижче — кнопка Menu і панель поверх контенту (Escape закриває) | default, hover, focus, активний (`activeHref`, `aria-current="page"`) |
| **LanguageSwitch** | EN / DE через скісну риску | поточна (`current`, `aria-current`), інша, hover, focus |
| **WorkCard** | обкладинка-кишеня (`image` з `src/assets` або порожній аркуш), назва, опис; уся картка — посилання | default, hover і focus (аркуш висувається, назва `accent`) |

Сторінка токенів у Storybook: `Foundations/Tokens` ([src/foundations/Tokens.mdx](src/foundations/Tokens.mdx)).

## Правила

- **Кольори, розміри тексту, радіуси й пропорції — тільки з токенів `@theme`.** Нових кольорів не додавати.
- **Класи, яких немає в `@theme`, не використовувати:** `text-white`, `bg-white`, `bg-black`, `text-sm`, `rounded-md`, `bg-blue-600` тощо. Tailwind не повідомляє про невідомий клас — вони мовчки не працюють.
- **Довільні значення в квадратних дужках заборонені:** `p-[13px]`, `h-[150px]`, `text-[#2B4BDB]`, `rounded-[10px]`. Також без hex і rgb у компонентах та історіях.
- **Відступи в компонентах — тільки кроки 8, 12, 16, 24, 32 px** (числа 2, 3, 4, 6, 8 у класах). Токени розкладки (`section-*`, `max-w-content`, `max-w-headline`, `max-w-lead`, `w-photo`) — тільки на сторінках.
- **Готові компоненти замість нових.** Якщо потрібного елемента в системі немає — не вигадувати, а перелічити, чого бракує, і запитати.
- **Стани:** кожен інтерактивний елемент має default, hover, focus і disabled (якщо дію можна вимкнути); поле форми — ще й помилку. Вимкнена кнопка — через `aria-disabled` з поясненням `disabledReason`, не атрибут `disabled`.
- **Контур фокусу:** `outline-ink` стоїть постійно, при фокусі вмикається лише товщина `outline-2`. Відступ `outline-offset-2` для кнопок і полів, `outline-offset-4` для текстових посилань і карток. Кнопки й посилання — `focus-visible:`, поля — `focus:`.
- **Межі:** декоративна `border-line` — 1 px; межа контролів `ink-muted` — 2 px (`border-2` або `ring-2 ring-inset`).
- **Дозволений виняток без токена:** `z-10` для панелі меню.
- **Картинки** лежать у `src/assets` і імпортуються (`import cover from "@/assets/cover-old-lion.png"`); не з `public`. Перевіряти справжній формат файлу.
- **Посилання на сторінки, яких ще немає,** — якорі на секції (`#cases`), без 404.
- **Після змін у компоненті** в тому ж кроці оновлювати його історію (`argTypes`, `args`) і Docs; після змін `@theme` — сторінку `Foundations/Tokens`. Якщо Storybook не бачить нових класів — повторно зберегти `src/app/globals.css`.

## Посилання

- План сайту: [docs/plan.md](docs/plan.md)
- Чернетка токенів з макета першого екрана: [docs/tokens.md](docs/tokens.md)
- Storybook: https://portfolio-system-psi.vercel.app/storybook (локально — `npm run storybook` → http://localhost:6006)
- Живий сайт: https://portfolio-system-psi.vercel.app
