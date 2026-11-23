import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LanguageSwitch } from "./LanguageSwitch";

const description = `
Перемикач мов — EN / DE у хедері праворуч від меню. Показує, якою мовою зараз сторінка, і веде на ту саму сторінку іншою мовою.

### Параметри
| Проп | Тип | За замовчуванням | Що робить |
| --- | --- | --- | --- |
| \`current\` | текст | — (обов'язковий) | \`code\` поточної мови: \`en\` або \`de\` |
| \`languages\` | масив \`{ code, label, name, href }\` | EN (\`/en\`) і DE (\`/de\`) | мови в порядку показу; \`name\` — повна назва для скрінрідера |
| \`ariaLabel\` | текст | \`Language\` | назва блоку для скрінрідера |

### Варіанти
Один варіант: короткі підписи мов через скісну риску, як у макеті. На вузькому екрані вигляд той самий — він короткий і вміщається поруч із кнопкою меню.

### Стани пункту
- **поточна мова** — текст \`ink\` (14:1 до \`canvas\`), \`aria-current\`; скрінрідер каже «поточна».
- **інша мова, default** — текст \`ink-muted\` (5,84:1).
- **інша мова, hover** — текст \`accent\` (5,83:1) і підкреслення товщиною 2.
- **focus** (лише з клавіатури, \`focus-visible\`) — контур \`ink\` товщиною 2 з відступом 4 і кутами \`rounded-control\`, на фоні \`canvas\` (14:1).

Кожне посилання має \`lang\` і \`hrefLang\` своєї мови, а скрінрідер чує повну назву: «DE — Deutsch». Скісна риска декоративна й не зачитується.

### Токени
\`ink\`, \`ink-muted\`, \`accent\`, \`text-nav\`, \`rounded-control\` (контур фокусу); відступ між елементами — крок 2.

### Коли використовувати
- У хедері кожної сторінки, поруч із навігацією.
- Коли сайт має дві-три мови.

### Коли не використовувати
- Як пункт головного меню: перемикач — окремий блок.
- Для більше ніж трьох мов: тоді потрібен список, що розкривається.
- Не показуйте мову, для якої ще немає перекладу сторінки.

### Як брати в код
\`\`\`tsx
import { LanguageSwitch } from "@/components/LanguageSwitch/LanguageSwitch";

<LanguageSwitch current="en" />
<LanguageSwitch
  current="de"
  languages={[
    { code: "en", label: "EN", name: "English", href: "/en/works" },
    { code: "de", label: "DE", name: "Deutsch", href: "/de/works" },
  ]}
/>
\`\`\`
`;

const meta = {
  title: "Components/LanguageSwitch",
  component: LanguageSwitch,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: description } },
  },
  argTypes: {
    current: {
      description: "Поточна мова",
      control: { type: "select", labels: { en: "EN", de: "DE" } },
      options: ["en", "de"],
    },
    languages: { control: false },
    ariaLabel: { control: false },
  },
  args: {
    current: "en",
  },
} satisfies Meta<typeof LanguageSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
