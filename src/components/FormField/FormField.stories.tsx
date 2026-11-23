import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FormField } from "./FormField";

const description = `
Поле форми — текстове поле з підписом над ним. Для контактної форми: ім'я, email, тема повідомлення.

### Параметри
| Проп | Тип | За замовчуванням | Що робить |
| --- | --- | --- | --- |
| \`label\` | текст | — (обов'язковий) | підпис над полем, зв'язаний з полем через \`for\` / \`id\` |
| \`defaultValue\` / \`value\` | текст | — | значення поля; з ним поле в стані «заповнене» |
| \`placeholder\` | текст | — | підказка всередині порожнього поля (не замінює підпис) |
| \`error\` | boolean | \`false\` | стан помилки, \`aria-invalid\` |
| \`errorMessage\` | текст | — | текст помилки під полем, з іконкою; зв'язаний через \`aria-describedby\` |
| \`disabled\` | boolean | \`false\` | вимикає поле |
| \`type\` | \`text\` \\| \`email\` \\| \`tel\` … | \`text\` | тип поля |
| \`id\` | текст | автоматично | власний \`id\` поля |

Решта атрибутів \`<input>\` (\`name\`, \`required\`, \`autoComplete\`, \`onChange\` тощо) передаються як є.

### Варіанти
Один варіант: однорядкове текстове поле, підпис завжди над полем.

### Стани
- **default** — фон \`canvas\`, межа \`ink-muted\` (5,84:1 до \`canvas\`), текст \`ink\`, підказка \`ink-muted\`.
- **hover** — межа \`ink\` (14:1).
- **focus** — контур \`ink\` товщиною 2 з відступом 2 від поля, на фоні \`canvas\` (14:1). Показується і з клавіатури, і після кліку.
- **заповнене** — значення текстом \`ink\` (14:1), межа як у default.
- **помилка** — межа \`danger\` (6,48:1), під полем іконка й текст помилки \`danger\` (6,48:1); полю ставиться \`aria-invalid\`, текст помилки зачитується разом із полем.
- **disabled** — фон \`surface\`, текст і підпис \`ink-muted\` (4,87:1), курсор «заборонено». Поле не фокусується і не відправляється з формою. Помилка у вимкненому полі не показується.

### Токени
\`canvas\`, \`surface\`, \`ink\`, \`ink-muted\`, \`danger\`, \`rounded-control\`, \`text-body\` (значення), \`text-caption\` (підпис і помилка), \`font-medium\` (підпис), \`font-sans\`; відступи кроками 2, 3, 6. Межа — \`ink-muted\`, ніколи не \`line\`.

### Коли використовувати
- Однорядкове введення тексту: ім'я, email, телефон, тема.
- Завжди з підписом. Підказка в полі — лише приклад формату.
- Помилку показуйте після спроби відправити форму або коли людина вийшла з поля, і пишіть, як виправити: «Введіть email у форматі name@example.com».

### Коли не використовувати
- Для довгого тексту повідомлення: потрібне багаторядкове поле (\`textarea\`), його поки немає.
- Для вибору з варіантів: потрібні перемикачі чи список.
- Не вмикайте \`error\` без \`errorMessage\`: сама червона межа не пояснює, що не так.

### Як брати в код
\`\`\`tsx
import { FormField } from "@/components/FormField/FormField";

<FormField label="Ім'я" name="name" autoComplete="name" />
<FormField
  label="Email"
  name="email"
  type="email"
  placeholder="name@example.com"
  error={emailInvalid}
  errorMessage="Введіть email у форматі name@example.com"
/>
\`\`\`
`;

const meta = {
  title: "Components/FormField",
  component: FormField,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: description } },
  },
  argTypes: {
    label: { control: "text" },
    defaultValue: { control: "text", description: "Значення поля. Непорожнє — стан «заповнене»." },
    placeholder: { control: "text" },
    error: { control: "boolean" },
    errorMessage: { control: "text" },
    disabled: { control: "boolean" },
  },
  args: {
    label: "Email",
    defaultValue: "",
    placeholder: "name@example.com",
    error: false,
    errorMessage: "Введіть email у форматі name@example.com",
    disabled: false,
  },
  // key makes the field re-render when the value changes in Controls.
  render: (args) => <FormField key={String(args.defaultValue)} {...args} />,
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
