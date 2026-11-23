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
- Пропорції: `aspect-cover` (2:1), `aspect-portrait` (5:6).
- Відступи: кроки 2, 3, 4, 6, 8 у класах (8, 12, 16, 24, 32 px). Секційні відступи 40–120 px поки не оформлені токенами.
- Шрифт: Inter (латиниця й кирилиця), підключення в [src/app/fonts.ts](src/app/fonts.ts).
- Без hex, rgb і значень у квадратних дужках у компонентах та історіях.

## Компоненти

Заповнимо далі.

## Правила

Заповнимо далі.

## Посилання

- План сайту: [docs/plan.md](docs/plan.md)
- Чернетка токенів з макета першого екрана: [docs/tokens.md](docs/tokens.md)
