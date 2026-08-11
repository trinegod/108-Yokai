"use client";
import en from "@/content/locales/en.json";
import ja from "@/content/locales/ja.json";
import { ArchiveShell } from "./ArchiveShell";
import { useLocale } from "./LocaleProvider";

const technologies = [
  "React",
  "TypeScript",
  "Vinext",
  "Vite",
  "Responsive AVIF / WebP",
  "CSS / DOM compositing",
  "JSON content manifests",
  "Persistent locale state",
  "Node test runner",
  "ESLint",
];

export function AboutContent() {
  const { locale, dictionary } = useLocale();
  const copy = dictionary.about;

  return (
    <ArchiveShell
      eyebrow={{ en: en.about.eyebrow, ja: ja.about.eyebrow }}
      title={{ en: en.about.title, ja: ja.about.title }}
      introduction={{ en: en.about.introduction, ja: ja.about.introduction }}
    >
      <section className="case-study-summary" aria-labelledby="case-study-synopsis">
        <div className="case-study-summary__lead">
          <p className="eyebrow">{copy.synopsisEyebrow}</p>
          <h2 id="case-study-synopsis">{copy.synopsisTitle}</h2>
          <p>{copy.synopsisCopy}</p>
          <blockquote>“{copy.quote}”</blockquote>
        </div>
        <dl className="case-study-facts" aria-label={copy.factsLabel}>
          {copy.facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="case-study-section" aria-labelledby="case-study-focus">
        <header className="case-study-section__header">
          <p className="eyebrow">{copy.briefEyebrow}</p>
          <h2 id="case-study-focus">{copy.briefTitle}</h2>
          <p>{copy.briefCopy}</p>
        </header>
        <div className="case-study-focus">
          {copy.focusAreas.map((area) => (
            <article key={area.number}>
              <span aria-hidden="true">{area.number}</span>
              <h3>{area.title}</h3>
              <p>{area.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="case-study-section case-study-section--visual" aria-labelledby="visual-authorities">
        <header className="case-study-section__header">
          <p className="eyebrow">{copy.visualEyebrow}</p>
          <h2 id="visual-authorities">{copy.visualTitle}</h2>
          <p>{copy.visualCopy}</p>
        </header>
        <div className="process-plates">
          <figure>
            <picture>
              <source type="image/avif" srcSet="/assets/relics/hoju-concept-480.avif 480w, /assets/relics/hoju-concept-720.avif 720w" sizes="(max-width: 700px) 82vw, 34vw" />
              <img src="/assets/relics/hoju-concept-720.webp" alt={locale === "ja" ? "赤、黒、骨色の波と炎に囲まれた淡い宝珠" : "Approved Hōju concept with a pale sacred jewel encircled by red, black, and bone wave and flame calligraphy"} width="720" height="1279" loading="lazy" />
            </picture>
            <figcaption><span>{copy.visualHojuTitle}</span> {copy.visualHojuCopy}</figcaption>
          </figure>
          <figure>
            <picture>
              <source type="image/avif" srcSet="/assets/sprites/characters/kintaro-character-480.avif 480w, /assets/sprites/characters/kintaro-character-720.avif 720w" sizes="(max-width: 700px) 82vw, 34vw" />
              <img src="/assets/sprites/characters/kintaro-character-720.webp" alt={locale === "ja" ? "黒髪、市松模様の衣、数珠、伝説の斧を持つ金太郎" : "Approved Kintarō identity reference with black hair, checkered garments, beadwork, and legendary axe"} width="720" height="1279" loading="lazy" />
            </picture>
            <figcaption><span>{copy.visualKintaroTitle}</span> {copy.visualKintaroCopy}</figcaption>
          </figure>
        </div>
      </section>

      <section className="technology-panel" aria-labelledby="technology-title">
        <div className="technology-panel__copy">
          <p className="eyebrow">{copy.implementationEyebrow}</p>
          <h2 id="technology-title">{copy.implementationTitle}</h2>
          <p>{copy.implementationCopyOne}</p>
          <p>{copy.implementationCopyTwo}</p>
        </div>
        <ul className="technology-stack" aria-label={copy.technologyLabel}>
          {technologies.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
      </section>

      <section className="project-status" aria-labelledby="project-status-title">
        <header className="case-study-section__header">
          <p className="eyebrow">{copy.statusEyebrow}</p>
          <h2 id="project-status-title">{copy.statusTitle}</h2>
          <p>{copy.statusCopy}</p>
        </header>
        <div className="project-status__grid">
          <article>
            <p className="eyebrow">{copy.implementedLabel}</p>
            <ul>
              {copy.implemented.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <a href="/archive">{copy.inspectIndex}</a>
          </article>
          <article>
            <p className="eyebrow">{copy.plannedLabel}</p>
            <ul>
              {copy.planned.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <a href="/chronicles">{copy.enterChronicle}</a>
          </article>
        </div>
      </section>

      <section className="case-study-closing" aria-labelledby="authorship-title">
        <div>
          <p className="eyebrow">{copy.authorshipEyebrow}</p>
          <h2 id="authorship-title">{copy.authorshipTitle}</h2>
        </div>
        <div>
          <p>{copy.authorshipCopyOne}</p>
          <p>{copy.authorshipCopyTwo}</p>
        </div>
      </section>
    </ArchiveShell>
  );
}
