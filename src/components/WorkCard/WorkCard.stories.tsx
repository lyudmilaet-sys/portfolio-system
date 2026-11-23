import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import cover from "@/assets/work-cover-sample.png";
import { WorkCard } from "./WorkCard";

const description = `
Картка роботи — вхід у кейс: обкладинка-«кишеня», назва й короткий опис. На головній три картки стоять у ряд одразу під першим екраном.
Уся картка — одне посилання на сторінку кейсу.

Обкладинка — «кишеня» з трьох шарів: задня стінка, аркуш із мокапом кейсу і передня стінка поверх аркуша. При наведенні аркуш трохи висувається з кишені.

### Параметри
| Проп | Тип | За замовчуванням | Що робить |
| --- | --- | --- | --- |
| \`title\` | текст | — (обов'язковий) | назва роботи; це й текст посилання |
| \`description\` | текст | — (обов'язковий) | короткий опис: тип продукту · період |
| \`href\` | текст | — (обов'язковий) | адреса сторінки кейсу |
| \`image\` | імпортована картинка | — | мокап кейсу з \`src/assets\` на аркуші в кишені; видно верхню частину. Без нього аркуш порожній (\`canvas\`), як у макеті |
| \`imageAlt\` | текст | \`""\` | опис мокапу; порожній — обкладинка декоративна |
| \`sizes\` | текст | \`(min-width: 1024px) 33vw, 100vw\` | яку ширину займає картка, щоб браузер обрав розмір картинки |

### Варіанти
Один варіант: обкладинка зверху, під нею назва й опис. Ширину задає контейнер (сітка на сторінці).

### Стани
- **default** — назва \`ink\` (14:1 до \`canvas\`), опис \`ink-muted\` (5,84:1); аркуш із мокапом сидить у кишені.
- **hover** — назва стає \`accent\` (5,83:1) і підкреслюється: видно, що картка — посилання; аркуш висувається вгору на крок 3.
- **focus** (лише з клавіатури, \`focus-visible\`) — контур \`ink\` товщиною 2 з відступом 4 навколо всієї картки, з кутами \`rounded-card\`, на фоні \`canvas\` (14:1); аркуш висувається, як при наведенні.
- Якщо в системі вимкнено анімацію (prefers-reduced-motion), аркуш не рухається; зміна назви лишається.

### Токени
- Кишеня: \`aspect-cover\`, \`rounded-card\`; задня стінка \`line\`; аркуш \`canvas\`, \`rounded-sheet\`, відступи \`sheet-inset\` з боків і крок 4 зверху й знизу; передня стінка \`surface\`, \`rounded-pocket\` зверху, висота \`pocket-front\`.
- Текст: \`text-lead\` + \`font-semibold\` (назва, \`ink\`, при наведенні \`accent\`), \`text-caption\` (опис, \`ink-muted\`).
- Контур фокусу: \`ink\`. Відступи кроками 2 і 6.

### Коли використовувати
- Список робіт: на головній (блок «Вибрані роботи») і в майбутньому розділі Works.
- Одна картка — один кейс, з власною сторінкою.

### Коли не використовувати
- Для робіт без сторінки кейсу: картка завжди посилання.
- Не кладіть у картку кнопки чи інші посилання: уся картка вже одне посилання.
- Не пишіть в описі довгий текст: один рядок «тип продукту · період».

### Як брати в код
\`\`\`tsx
import { WorkCard } from "@/components/WorkCard/WorkCard";
import oldLionCover from "@/assets/old-lion-cover.png";

<WorkCard
  title="Old Lion | Book Mobile App"
  description="Мобільний e-commerce застосунок · Жовтень – листопад 2026"
  href="/works/old-lion"
  image={oldLionCover}
/>
\`\`\`
Картинку кладіть у \`src/assets\` і імпортуйте; з теки \`public\` у Storybook її не видно.
`;

const meta = {
  title: "Components/WorkCard",
  component: WorkCard,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: description } },
  },
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    href: { control: "text" },
    imageAlt: { control: "text" },
    image: {
      description: "Мокап на аркуші; без нього аркуш порожній",
      control: { type: "select", labels: { mockup: "мокап-приклад", none: "без картинки" } },
      options: ["mockup", "none"],
      mapping: { mockup: cover, none: undefined },
    },
    sizes: { control: false },
  },
  args: {
    title: "Old Lion | Book Mobile App",
    description: "Мобільний e-commerce застосунок · Жовтень – листопад 2026",
    href: "/works/old-lion",
    image: "mockup" as unknown as typeof cover,
    imageAlt: "",
  },
  // A three-column grid like on the home page, so the card has its real width.
  decorators: [
    (Story) => (
      <div className="grid grid-cols-3 gap-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof WorkCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
