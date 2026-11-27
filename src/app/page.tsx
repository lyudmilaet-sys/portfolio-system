import Image, { type StaticImageData } from "next/image";
import coverFluentia from "@/assets/cover-fluentia.png";
import coverHealthMate from "@/assets/cover-healthmate.png";
import coverHotelNostalgia from "@/assets/cover-hotel-nostalgia.webp";
import coverOldLion from "@/assets/cover-old-lion.png";
import portrait from "@/assets/portrait.png";
import { Button } from "@/components/Button/Button";
import { LanguageSwitch } from "@/components/LanguageSwitch/LanguageSwitch";
import { Navigation } from "@/components/Navigation/Navigation";
import { WorkCard } from "@/components/WorkCard/WorkCard";

// Pages that don't exist yet are anchors to sections, so no link leads to a 404.
const navItems = [
  { label: "About", href: "#about" },
  { label: "Works", href: "#cases" },
  { label: "Contacts", href: "#contacts" },
];

// No EN / DE versions yet: both stay on this page until translations exist.
const languages = [
  { code: "en", label: "EN", name: "English", href: "/" },
  { code: "de", label: "DE", name: "Deutsch", href: "/" },
];

// Order and texts: docs/plan.md, block 5. Case pages don't exist yet, so cards point to #cases.
// Covers from the case files in Figma (src/assets/cover-*.png); Hotel Nostalgia's from its Behance project.
const cases: { title: string; description: string; image: StaticImageData }[] = [
  {
    title: "Old Lion: One App for Every Book",
    // Word joiners and no-break spaces (here and below) keep the period on one line when the text wraps.
    description: "Mobile app · IT School Go IT internship for Old Lion Publishing House · Sep⁠–⁠Nov 2026",
    image: coverOldLion,
  },
  { title: "Fluentia: Learn by Live Practice", description: "Mobile app · IT School Go IT course project · Aug⁠–⁠Sep 2026", image: coverFluentia },
  { title: "HealthMate: Simple Health Tracking", description: "Web service · IT School Go IT course project · Jun⁠–⁠Jul 2026", image: coverHealthMate },
  {
    title: "Hotel Nostalgia: A Clearer, Warmer Website",
    description: "Website redesign · IT School Go IT course project · May 2026",
    image: coverHotelNostalgia,
  },
];

const path = ["20 years of teaching", "UX/UI", "AI"];

export default function Home() {
  return (
    <div id="top" className="bg-canvas px-4 font-sans text-ink lg:px-8 xl:px-section-80">
      <div className="mx-auto max-w-content">
        <header className="flex flex-wrap items-center justify-between gap-6 pt-6 xl:pt-section-40">
          <a
            href="#top"
            className="rounded-control text-heading outline-ink transition-colors hover:text-accent hover:link-underline focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            Liudmyla Khlystun
          </a>
          <div className="flex items-center gap-6 xl:gap-section-96">
            <Navigation items={navItems} />
            <LanguageSwitch current="en" languages={languages} />
          </div>
        </header>

        <main className="flex flex-col gap-section-48 pt-8 pb-section-64 xl:pt-section-64 xl:pb-section-120">
          {/* Hero: text on the left, photo with the path caption on the right (photo first on narrow screens). */}
          <section aria-labelledby="hero-title" className="flex flex-col gap-8 lg:flex-row lg:gap-section-96">
            <div className="flex flex-1 flex-col gap-8 lg:justify-between lg:gap-section-48">
              <div className="flex flex-col gap-8">
                <h1 id="hero-title" className="max-w-headline text-heading md:text-display-tablet xl:text-display">
                  I make complex things <span className="text-accent">clear</span> through design and AI.
                </h1>
                <p className="max-w-lead text-body md:text-lead">
                  UX/UI Designer and AI UX/UI Engineer with a teaching background, turning complex information into
                  intuitive digital products at the intersection of technology, design and AI.
                </p>
              </div>
              <div className="flex flex-wrap items-start gap-6">
                <Button href="#cases">View case studies</Button>
                <Button variant="secondary" disabled disabledReason="CV coming soon">
                  Download CV
                </Button>
              </div>
            </div>

            <div className="order-first flex w-full max-w-photo shrink-0 flex-col gap-6 lg:order-none lg:w-photo">
              <div className="relative aspect-portrait w-full overflow-hidden rounded-card bg-surface">
                <Image
                  src={portrait}
                  alt="Liudmyla Khlystun"
                  fill
                  preload
                  sizes="(min-width: 1024px) 320px, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="flex items-center justify-between whitespace-nowrap text-body font-medium">
                {path.map((step, index) => (
                  <span key={step} className="contents">
                    {index > 0 && (
                      <>
                        <span aria-hidden="true" className="text-accent">
                          →
                        </span>
                        <span className="sr-only">, then </span>
                      </>
                    )}
                    <span>{step}</span>
                  </span>
                ))}
              </p>
            </div>
          </section>

          {/* Selected works: right under the hero, titles visible without scrolling on 1440×900. */}
          <section id="cases" aria-labelledby="cases-title">
            <h2 id="cases-title" className="sr-only">
              Selected works
            </h2>
            <ul className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
              {cases.map((item) => (
                <li key={item.title}>
                  <WorkCard
                    title={item.title}
                    description={item.description}
                    href="#cases"
                    image={item.image}
                    sizes="(min-width: 1280px) 296px, (min-width: 768px) 50vw, 100vw"
                  />
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}
