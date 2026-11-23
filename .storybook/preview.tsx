import type { Preview } from "@storybook/nextjs-vite";
import { inter } from "../src/app/fonts";
import "../src/app/globals.css";

// Storybook doesn't render the Next.js layout, which puts the font variable
// on <html>. It must sit on <html> here too: @theme resolves --font-sans from
// --font-inter at :root, so a class on an inner wrapper isn't enough.
// This also covers MDX docs pages (e.g. Foundations/Tokens).
document.documentElement.classList.add(inter.variable);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="font-sans">
        <Story />
      </div>
    ),
  ],
};

export default preview;
