import type { Metadata } from "next";
import Link from "next/link";
import { ArchiveShell } from "../_components/ArchiveShell";

export const metadata: Metadata = {
  title: "Direction, System & Method",
  description: "The creative direction, experience design, technical system, authorship, and current status of ASHIGARA — The Living Archive.",
};

const focusAreas = [
  {
    number: "01",
    title: "Creative direction",
    copy: "Steven Adkins established the ASHIGARA concept, Gate system, approved visual authorities, composition locks, interaction goals, and portfolio direction. The visual language joins a recovered 32-bit action world with a restrained contemporary archive.",
  },
  {
    number: "02",
    title: "Experience design",
    copy: "Visitors cross a cinematic threshold, then move through four clear modes: records, place, narrative, and method. Motion, depth, and sound build atmosphere without becoming requirements for navigation or understanding.",
  },
  {
    number: "03",
    title: "Archive system",
    copy: "Folklore records, institutional sources, places, chronicles, locales, and assets live in versioned manifests. The archive can expand continuously without rebuilding the permanent entrance that gives Gate 01 its identity.",
  },
];

const technologies = [
  "React",
  "TypeScript",
  "Vinext",
  "Vite",
  "Responsive AVIF / WebP",
  "CSS / DOM compositing",
  "JSON content manifests",
  "Node test runner",
  "ESLint",
];

const implemented = [
  "Independent desktop and mobile threshold compositions",
  "Gesture-controlled entry, optional sound, and reduced-motion behavior",
  "Searchable, source-linked record index and detail chambers",
  "Narrative atlas, first chronicle, and five-route structural shell",
  "Nondestructive source-art and optimized derivative workflow",
];

const planned = [
  "Expanded batches of reviewed records and production artwork",
  "Fluent Japanese editorial review and broader accessibility testing",
  "Final transparent character layers and approved animation sets",
  "A separate 108 Yōkai portal connecting future independent gates",
  "A CMS only if the archive's scale proves one is warranted",
];

export default function AboutPage() {
  return (
    <ArchiveShell
      eyebrow="Gate dossier · 04"
      title="Direction, System & Method"
      introduction="A concise case study of how Gate 01 turns an illustrated folklore world into an accessible, expandable digital archive."
    >
      <section className="case-study-summary" aria-labelledby="case-study-synopsis">
        <div className="case-study-summary__lead">
          <p className="eyebrow">Synopsis</p>
          <h2 id="case-study-synopsis">A folklore archive entered like a lost game world.</h2>
          <p>ASHIGARA — The Living Archive is Gate 01 of the planned 108 Yōkai collection. Built around Mount Ashigara and the evolving traditions of Kintarō and Sakata no Kintoki, it combines a cinematic permanent threshold with source-linked records, a narrative atlas, curated chronicles, and a modular content system.</p>
          <blockquote>“A lost 32-bit action world, recovered as an interactive museum.”</blockquote>
        </div>
        <dl className="case-study-facts" aria-label="Project facts">
          <div>
            <dt>Format</dt>
            <dd>Interactive folklore archive</dd>
          </div>
          <div>
            <dt>Direction</dt>
            <dd>Steven Adkins</dd>
          </div>
          <div>
            <dt>Current release</dt>
            <dd>Phase One vertical slice</dd>
          </div>
          <div>
            <dt>Collection</dt>
            <dd>108 Yōkai · Gate 01</dd>
          </div>
        </dl>
      </section>

      <section className="case-study-section" aria-labelledby="case-study-focus">
        <header className="case-study-section__header">
          <p className="eyebrow">The brief</p>
          <h2 id="case-study-focus">Atmosphere with a system beneath it.</h2>
          <p>The work is held to three responsibilities: protect the authored world, make the experience legible, and let the archive grow without erasing its identity.</p>
        </header>
        <div className="case-study-focus">
          {focusAreas.map((area) => (
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
          <p className="eyebrow">Visual authorities</p>
          <h2 id="visual-authorities">One world, tightly held.</h2>
          <p>The supplied masters establish character identity, palette, materials, silhouette, and composition. Runtime derivatives are optimized separately; the originals remain untouched.</p>
        </header>
        <div className="process-plates">
          <figure>
            <picture>
              <source type="image/avif" srcSet="/assets/relics/hoju-concept-480.avif 480w, /assets/relics/hoju-concept-720.avif 720w" sizes="(max-width: 700px) 82vw, 34vw" />
              <img src="/assets/relics/hoju-concept-720.webp" alt="Approved Hōju concept: a pale sacred jewel encircled by red, black, and bone wave-flame calligraphy" width="720" height="1279" loading="lazy" />
            </picture>
            <figcaption><span>Locked relic reference</span> Hōju silhouette, material, palette, and water/flame/ink behavior.</figcaption>
          </figure>
          <figure>
            <picture>
              <source type="image/avif" srcSet="/assets/sprites/characters/kintaro-character-480.avif 480w, /assets/sprites/characters/kintaro-character-720.avif 720w" sizes="(max-width: 700px) 82vw, 34vw" />
              <img src="/assets/sprites/characters/kintaro-character-720.webp" alt="Approved Kintarō identity reference with black hair, checkered garments, beadwork, and legendary axe" width="720" height="1279" loading="lazy" />
            </picture>
            <figcaption><span>Identity reference</span> Anatomy, costume, material, and facial authority—not the threshold pose.</figcaption>
          </figure>
        </div>
      </section>

      <section className="technology-panel" aria-labelledby="technology-title">
        <div className="technology-panel__copy">
          <p className="eyebrow">Implementation</p>
          <h2 id="technology-title">Built for atmosphere. Structured for growth.</h2>
          <p>React and TypeScript components run through Vinext and Vite. Content stays separate from the views in JSON and TypeScript manifests. CSS masks, compositing, and shallow DOM planes create dimensional response without making WebGL a requirement.</p>
          <p>A Sharp-based asset pipeline generates responsive AVIF and WebP derivatives without overwriting the source artwork. Route rendering, content references, accessibility rules, and types are checked through the project&apos;s validation suite.</p>
        </div>
        <ul className="technology-stack" aria-label="Technology used">
          {technologies.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
      </section>

      <section className="project-status" aria-labelledby="project-status-title">
        <header className="case-study-section__header">
          <p className="eyebrow">Current status</p>
          <h2 id="project-status-title">A working first gate—not a finished mythology.</h2>
          <p>Implemented work and future intent stay visibly separate. No unfinished feature is presented as complete.</p>
        </header>
        <div className="project-status__grid">
          <article>
            <p className="eyebrow">Implemented</p>
            <ul>
              {implemented.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <Link href="/archive" prefetch={false}>Inspect the living index</Link>
          </article>
          <article>
            <p className="eyebrow">In progress / planned</p>
            <ul>
              {planned.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <Link href="/chronicles" prefetch={false}>Enter the first chronicle</Link>
          </article>
        </div>
      </section>

      <section className="case-study-closing" aria-labelledby="authorship-title">
        <div>
          <p className="eyebrow">Authorship & assistance</p>
          <h2 id="authorship-title">Directed by Steven Adkins.</h2>
        </div>
        <div>
          <p>Steven defined the product, story world, approved visual references, interaction goals, composition locks, and portfolio intent.</p>
          <p>AI-assisted implementation supported frontend engineering, responsive styling, asset optimization, documentation, and structured-content drafting under those constraints. AI output is not treated as a folklore source; factual records link to institutional references and remain subject to human editorial review.</p>
        </div>
      </section>
    </ArchiveShell>
  );
}
