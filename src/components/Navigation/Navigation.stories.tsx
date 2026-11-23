import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Navigation } from "./Navigation";

const description = `
Навігація — пункти меню сайту в хедері: About, Works, Contacts. Активний пункт показує, на якій сторінці чи в якому розділі людина зараз.

### Параметри
| Проп | Тип | За замовчуванням | Що робить |
| --- | --- | --- | --- |
| \`items\` | масив \`{ label, href }\` | About / Works / Contacts (\`#about\`, \`#works\`, \`#contacts\`) | пункти меню зліва направо |
| \`activeHref\` | текст | — | \`href\` активного пункту; йому ставиться \`aria-current="page"\` |
| \`menuLabel\` | текст | \`Menu\` | підпис кнопки меню на вузькому екрані |
| \`closeLabel\` | текст | \`Close\` | підпис тієї ж кнопки, коли меню відкрите |
| \`ariaLabel\` | текст | \`Main\` | назва навігації для скрінрідера |

### Варіанти
Один компонент, що сам змінює вигляд за шириною екрана:
- **широкий екран** (від брейкпоінта \`md\`) — рядок посилань;
- **вузький екран** — кнопка «Menu» (компонент Button, варіант \`secondary\`). Вона відкриває список пунктів поверх контенту: панель лежить над сторінкою і не зсуває її вниз.

Вузький екран дивіться кнопкою **Viewport** у тулбарі Storybook (іконка монітора), наприклад «Small mobile».

### Стани пункту
- **default** — текст \`ink\` (14:1 до \`canvas\`).
- **hover** — текст \`accent\` (5,83:1) і підкреслення товщиною 2.
- **focus** (лише з клавіатури, \`focus-visible\`) — контур \`ink\` товщиною 2 з відступом 4 і кутами \`rounded-control\`, на фоні \`canvas\` (14:1).
- **активний** — текст \`ink\` з постійним підкресленням \`accent\` товщиною 2; \`aria-current="page"\`, тож скрінрідер каже «поточна сторінка». Активний пункт відрізняється не лише кольором.

### Поведінка меню на вузькому екрані
- Кнопка має \`aria-expanded\` і \`aria-controls\`: скрінрідер знає, чи меню відкрите.
- **Escape** закриває меню й повертає фокус на кнопку.
- Клік поза меню або по пункту теж закриває меню.

### Токени
\`ink\`, \`accent\`, \`canvas\` (фон панелі), \`line\` (рамка панелі — декоративна), \`text-nav\`, \`rounded-control\` (контур фокусу), \`rounded-card\` (панель); відступи кроками 2, 6 і 8; брейкпоінт \`md\`. Кнопка меню — токени компонента Button.

### Коли використовувати
- Головне меню в хедері кожної сторінки.
- 3–5 коротких пунктів.

### Коли не використовувати
- Для перемикача мов EN / DE: це окремий елемент, не пункт меню.
- Для дій (відправити, завантажити): пункти — це завжди посилання.
- Не робіть більше п'яти пунктів: на вузькому екрані список стане задовгим.

### Як брати в код
\`\`\`tsx
import { Navigation } from "@/components/Navigation/Navigation";

<header className="flex items-center justify-between">
  <span className="text-heading">Liudmyla Khlystun</span>
  <Navigation activeHref="#works" />
</header>
\`\`\`
`;

const meta = {
  title: "Components/Navigation",
  component: Navigation,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: description } },
  },
  argTypes: {
    activeHref: {
      name: "active",
      description: "Активний пункт меню",
      control: { type: "select", labels: { "": "none", "#about": "About", "#works": "Works", "#contacts": "Contacts" } },
      options: ["", "#about", "#works", "#contacts"],
    },
    items: { control: false },
    menuLabel: { control: "text" },
    closeLabel: { control: "text" },
    ariaLabel: { control: false },
  },
  args: {
    activeHref: "#works",
    menuLabel: "Menu",
    closeLabel: "Close",
  },
  // A header row with page content below, to show that the open menu lies over the content.
  decorators: [
    (Story) => (
      <div className="flex flex-col gap-8 text-ink">
        <div className="flex items-center justify-between gap-6">
          <span className="text-heading">Liudmyla Khlystun</span>
          <Story />
        </div>
        <p className="text-lead">
          Контент сторінки. Відкрите меню на вузькому екрані лягає поверх цього тексту і не зсуває його вниз.
        </p>
      </div>
    ),
  ],
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
