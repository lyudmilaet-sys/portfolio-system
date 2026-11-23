import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./Button";

const description = `
Кнопка — одна дія на сторінці: перейти до кейсів, завантажити CV, написати мені.
На першому екрані стоять дві поруч: основна і другорядна.

### Параметри
| Проп | Тип | За замовчуванням | Що робить |
| --- | --- | --- | --- |
| \`children\` | текст | — | підпис кнопки, дієсловом |
| \`variant\` | \`primary\` \\| \`secondary\` | \`primary\` | основна або другорядна |
| \`size\` | \`md\` \\| \`lg\` | \`md\` | звичайна або велика |
| \`disabled\` | boolean | \`false\` | вимикає кнопку через \`aria-disabled\` |
| \`disabledReason\` | текст | — | пояснення під вимкненою кнопкою, зв'язане через \`aria-describedby\` |
| \`type\` | \`button\` \\| \`submit\` \\| \`reset\` | \`button\` | тип кнопки у формі |

Решта атрибутів \`<button>\` (\`onClick\`, \`aria-label\`, \`name\` тощо) передаються як є.

### Варіанти
- **primary** — заливка \`accent\`, текст \`canvas\` (контраст 5,83:1).
- **secondary** — без заливки, межа \`ink-muted\` (5,84:1 до \`canvas\`), текст \`accent\` (5,83:1).

### Розміри
- **md** — текст \`text-button\`, відступи \`px-6 py-4\`. Розмір макета першого екрана.
- **lg** — текст \`text-lead\` + \`font-medium\`, відступи \`px-8 py-3\`.

### Стани
- **default** — як у варіантах вище.
- **hover** — primary: фон \`ink\`, текст \`canvas\` (14:1); secondary: фон \`surface\`, текст \`accent\` (4,86:1), межа \`ink-muted\` (4,87:1).
- **focus** (лише з клавіатури, \`focus-visible\`) — контур \`ink\` товщиною 2 з відступом 2 від кнопки, лежить на фоні \`canvas\` (14:1).
- **disabled** — фон \`surface\`, текст \`ink-muted\` (4,87:1), курсор «заборонено», без hover. Кнопка лишається в порядку Tab і озвучується як вимкнена; натискання ігнорується. Якщо передано \`disabledReason\`, під кнопкою з'являється пояснення (\`text-caption\`, \`ink-muted\`).

### Токени
\`accent\`, \`canvas\`, \`ink\`, \`ink-muted\`, \`surface\`, \`rounded-control\`, \`text-button\`, \`text-lead\`, \`text-caption\`, \`font-sans\`; відступи кроками 2, 3, 4, 6, 8.

### Коли використовувати
- **primary** — одна головна дія в блоці («Подивитись кейси», «Написати мені»). Не більше однієї primary поруч.
- **secondary** — другорядна дія поруч із головною («Завантажити CV»).
- **lg** — фінальний заклик унизу сторінки, де кнопка стоїть сама.

### Коли не використовувати
- Для переходу на іншу сторінку чи файл, коли потрібне справжнє посилання (\`<a href>\`): ця кнопка — \`<button>\`, посилання-кнопки поки немає.
- Для посилань усередині тексту.
- Не вимикайте кнопку без \`disabledReason\`: людина має розуміти, чому дія недоступна.

### Як брати в код
\`\`\`tsx
import { Button } from "@/components/Button/Button";

<Button onClick={openCases}>Подивитись кейси</Button>
<Button variant="secondary">Завантажити CV</Button>
<Button size="lg" disabled disabledReason="CV з'явиться найближчим часом">
  Завантажити CV
</Button>
\`\`\`
`;

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: description } },
  },
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary"] },
    size: { control: "select", options: ["md", "lg"] },
    disabled: { control: "boolean" },
    disabledReason: { control: "text" },
    children: { control: "text" },
  },
  args: {
    children: "Подивитись кейси",
    variant: "primary",
    size: "md",
    disabled: false,
    disabledReason: "CV з'явиться найближчим часом",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
