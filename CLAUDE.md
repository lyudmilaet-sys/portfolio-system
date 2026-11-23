@AGENTS.md

# portfolio-system

Сайт-портфоліо Liudmyla Khlystun, зібраний на дизайн-системі: спершу токени й компоненти, потім сторінки.

## Стек

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Публікація: Vercel, проєкт `portfolio-system`, підключений до GitHub-репозиторію `lyudmilaet-sys/portfolio-system`

## Робота з Git

- Уся робота йде в гілці `main`.
- Нових гілок не створюй, поки я прямо не попрошу.
- Пуш у `main` публікує сайт (Vercel деплоїть кожен пуш автоматично), тому перед кожним пушем питай мене.

## Токени

Єдине джерело значень — блок `@theme` у [src/app/globals.css](src/app/globals.css). Стандартні кольори й розміри тексту Tailwind скинуто: класи на кшталт `text-white`, `bg-black`, `text-sm` мовчки не працюють. Перегляд — Storybook, сторінка Foundations/Tokens ([src/foundations/Tokens.mdx](src/foundations/Tokens.mdx)).

- Кольори: `canvas`, `surface`, `line`, `accent`, `ink`, `ink-muted`, `danger` (`bg-canvas`, `text-ink`, `border-ink-muted`, `text-danger` …). У Figma ці ролі ще звуться `color/text` і `color/text-muted`; у коді — `ink` і `ink-muted`.
- `line` — лише декор; рамка полів і кнопок без заливки — `ink-muted`.
- Текст: `text-caption`, `text-body`, `text-lead`, `text-heading`, `text-display`, `text-display-tablet`, `text-nav`, `text-button` (висота рядка, трекінг і жирність задані в `@theme`).
- Радіуси: `rounded-control` (пігулка), `rounded-card`.
- Форма кишені (обкладинка кейсу): `rounded-sheet` (аркуш), `rounded-pocket` (верхні кути передньої стінки), `sheet-inset` (бічний відступ аркуша, `inset-x-sheet-inset`), `pocket-front` (висота передньої стінки, `h-pocket-front`).
- Пропорції: `aspect-cover` (2:1), `aspect-portrait` (5:6).
- Відступи: кроки 2, 3, 4, 6, 8 у класах (8, 12, 16, 24, 32 px). Секційні відступи 40–120 px поки не оформлені токенами.
- Шрифт: Inter (латиниця й кирилиця), підключення в [src/app/fonts.ts](src/app/fonts.ts).
- Без hex, rgb і значень у квадратних дужках у компонентах та історіях.

## Компоненти

Лежать у `src/components/<Назва>/`: компонент і поруч одна історія Storybook (`<Назва>.stories.tsx`, Playground з Controls) з повною документацією на сторінці Docs. Перш ніж брати компонент у код, читай його Docs.

- **Button** — [src/components/Button/Button.tsx](src/components/Button/Button.tsx), Storybook `Components/Button`. Варіанти `primary` / `secondary`, розміри `md` / `lg`. Вимкнений стан через `aria-disabled` (лишається у фокусі), пояснення `disabledReason` під кнопкою. Без `href` — `<button>` (дія на місці); з `href` — посилання `<a>` з тим самим виглядом (`download` — завантажити файл).
- **FormField** — [src/components/FormField/FormField.tsx](src/components/FormField/FormField.tsx), Storybook `Components/FormField`. Однорядкове поле з підписом над ним; стани помилки (`error`, `errorMessage`) і `disabled` (атрибут `disabled`). Багаторядкового поля поки немає.
- **Navigation** — [src/components/Navigation/Navigation.tsx](src/components/Navigation/Navigation.tsx), Storybook `Components/Navigation`. Пункти меню (`items`, за замовчуванням About / Works / Contacts), активний — `activeHref` (`aria-current="page"`). Від `md` — рядок посилань; на вузькому екрані — кнопка Menu (Button secondary) і панель поверх контенту, Escape закриває. Перемикач мов — окремий компонент LanguageSwitch.
- **LanguageSwitch** — [src/components/LanguageSwitch/LanguageSwitch.tsx](src/components/LanguageSwitch/LanguageSwitch.tsx), Storybook `Components/LanguageSwitch`. EN / DE через скісну риску; поточна мова (`current`) — `ink` з `aria-current`, інша — `ink-muted`. Посилання з `lang` / `hrefLang` і повною назвою мови для скрінрідера.
- **WorkCard** — [src/components/WorkCard/WorkCard.tsx](src/components/WorkCard/WorkCard.tsx), Storybook `Components/WorkCard`. Картка кейсу: обкладинка-«кишеня» з мокапом (`image` з `src/assets`), назва, опис; уся картка — посилання `href`.

## Правила

Заповнимо далі.

## Посилання

- План сайту: [docs/plan.md](docs/plan.md)
- Чернетка токенів з макета першого екрана: [docs/tokens.md](docs/tokens.md)
