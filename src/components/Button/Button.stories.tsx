import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./Button";

const description = `
Кнопка — одна дія на сторінці: перейти до кейсів, завантажити CV, написати мені.
На першому екрані стоять дві поруч: основна і другорядна.

Без \`href\` це \`<button>\` — дія на місці (відкрити меню, відправити форму). З \`href\` — посилання \`<a>\` з тим самим виглядом: перейти на сторінку, до розділу чи на файл.

### Параметри
| Проп | Тип | За замовчуванням | Що робить |
| --- | --- | --- | --- |
| \`children\` | текст | — | підпис кнопки, дієсловом |
| \`variant\` | \`primary\` \\| \`secondary\` | \`primary\` | основна або другорядна |
| \`size\` | \`md\` \\| \`lg\` | \`md\` | звичайна або велика |
| \`href\` | текст | — | робить кнопку посиланням \`<a>\`: сторінка, розділ (\`#works\`) або файл |
| \`download\` | boolean \\| текст | — | лише з \`href\`: завантажити файл (атрибут \`download\`); рядок — назва файлу |
| \`disabled\` | boolean | \`false\` | вимикає кнопку через \`aria-disabled\`; вимкнена кнопка завжди \`<button>\`, навіть із \`href\` |
| \`disabledReason\` | текст | — | пояснення під вимкненою кнопкою, зв'язане через \`aria-describedby\` |
| \`type\` | \`button\` \\| \`submit\` \\| \`reset\` | \`button\` | тип кнопки у формі |

Решта атрибутів (\`onClick\`, \`aria-label\`, \`name\` тощо) передаються як є.

### Варіанти
За елементом:
- **кнопка** (без \`href\`) — \`<button>\`, дія на місці;
- **посилання** (з \`href\`) — \`<a>\` з тим самим виглядом і станами. Сторінки й розділи відкриваються через \`next/link\`, файли з \`download\` — звичайним \`<a download>\`. Скрінрідер називає його «посилання», а не «кнопка».

За виглядом:
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
- **з \`href\`** — коли кнопка кудись веде: «Подивитись кейси» (\`href="#works"\`), «Завантажити CV» (\`href="/cv.pdf" download\`).

### Коли не використовувати
- Без \`href\` для переходу кудись: перехід — це завжди посилання, додайте \`href\`.
- З \`href\` для дії на місці (відкрити меню, відправити форму): тут потрібен \`<button>\`.
- Для посилань усередині тексту.
- Не вимикайте кнопку без \`disabledReason\`: людина має розуміти, чому дія недоступна.

### Як брати в код
\`\`\`tsx
import { Button } from "@/components/Button/Button";

<Button href="#works">Подивитись кейси</Button>
<Button variant="secondary" href="/cv.pdf" download>Завантажити CV</Button>
<Button onClick={sendForm} type="submit">Надіслати</Button>
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
    href: { control: "text", description: "Порожньо — `<button>`; з адресою — посилання `<a>`." },
    download: { control: "boolean" },
  },
  args: {
    children: "Подивитись кейси",
    variant: "primary",
    size: "md",
    disabled: false,
    disabledReason: "CV з'явиться найближчим часом",
    href: "",
    download: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
