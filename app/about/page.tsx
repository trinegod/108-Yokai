import type { Metadata } from "next";
import Link from "next/link";
import { ArchiveShell } from "../_components/ArchiveShell";

export const metadata: Metadata = {
  title: "Project, Method & Sources",
  description: "The creative direction, editorial method, rights posture, and roadmap behind ASHIGARA — The Living Archive.",
};

const principles = [
  ["World", "An authored, multiplane 32-bit-inspired landscape—not generic fantasy terrain."],
  ["Relic", "A crisp 2D Hōju identity gains shallow light, phase, and hover without becoming glossy CGI."],
  ["Knowledge", "Records separate source-backed tradition, variants, and original ASHIGARA interpretation."],
  ["Growth", "Content, sources, locales, assets, and exhibitions expand through versioned manifests."],
];

export default function AboutPage() {
  return (
    <ArchiveShell
      eyebrow="Project record · 04"
      title="Project, Method & Sources"
      introduction="A real evolving archive and an employer-facing case study in creative direction, interaction design, frontend architecture, and source-conscious cultural systems."
    >
      <section className="about-statement">
        <p>ASHIGARA — The Living Archive begins at one permanent threshold: Kintarō, an independently planted axe, Mount Ashigara, and a dimensional Hōju. The archive expands behind that gate without replacing the composition that gives the project its identity.</p>
        <blockquote>“A lost 32-bit action world, recovered as an interactive museum.”</blockquote>
      </section>

      <section className="principle-grid" aria-label="Design principles">
        {principles.map(([title, copy], index) => (
          <article key={title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{title}</h2>
            <p>{copy}</p>
          </article>
        ))}
      </section>

      <section className="process-plates">
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
      </section>

      <section className="method-grid">
        <article>
          <p className="eyebrow">Editorial method</p>
          <h2>Source before synthesis</h2>
          <p>Phase One uses a small registry of institutional collection and exhibition records. Claims stay narrow; uncertainty and variant settings are visible. Japanese localization remains provisional until human editorial review.</p>
          <Link href="/archive" prefetch={false}>Inspect the sample records</Link>
        </article>
        <article>
          <p className="eyebrow">Asset method</p>
          <h2>Originals stay untouched</h2>
          <p>Six supplied PNG masters are preserved byte-for-byte in a source-art directory. The site loads separate AVIF/WebP derivatives. Opaque reference sheets are not misrepresented as production-ready transparent sprite atlases.</p>
          <Link href="/atlas" prefetch={false}>Inspect the spatial model</Link>
        </article>
        <article>
          <p className="eyebrow">Authorship & assistance</p>
          <h2>Directed by Steven</h2>
          <p>Steven defined the product, story world, approved visual references, composition locks, interaction goals, and portfolio intent. AI-assisted implementation supported code, documentation, optimization, and structured-content drafting under those constraints; institutional links remain the factual sources.</p>
        </article>
        <article>
          <p className="eyebrow">Current status</p>
          <h2>Phase One vertical slice</h2>
          <p>The threshold, five-route shell, search and detail pattern, narrative atlas, first chronicle, reduced-motion behavior, optional procedural impact sound, and content pipeline are implemented locally. Deployment, Japanese review, a CMS, final layered art, and expanded records are planned—not complete.</p>
        </article>
      </section>
    </ArchiveShell>
  );
}
