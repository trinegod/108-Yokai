import type { MartyrsEditorial as MartyrsEditorialRecord } from "@/content/martyrs-editorials";

export function MartyrsEditorial({ editorial }: { editorial: MartyrsEditorialRecord }) {
  const stem = `/assets/editorials/martyrs/${editorial.imageStem}`;

  return (
    <main
      className={`martyrs-editorial martyrs-editorial--${editorial.slug} martyrs-editorial--${editorial.layout}`}
      id="editorial-content"
    >
      <a className="skip-link" href="#editorial-statement">Skip to editorial statement</a>

      <header className="martyrs-editorial__masthead">
        <a href="/martyrs" className="martyrs-editorial__return" aria-label="Return to the MART¥RS cover">
          MART¥RS
        </a>
        <p>Private edition / {editorial.issue}</p>
        <a href="/portal-lab" className="martyrs-editorial__portal" aria-label="Return to the 108 Yōkai gate index">
          108Y
        </a>
      </header>

      <article className="martyrs-editorial__spread">
        <header className="martyrs-editorial__title-block">
          <p className="martyrs-editorial__issue">Editorial / {editorial.issue}</p>
          <h1>{editorial.title}</h1>
          <p className="martyrs-editorial__kicker">{editorial.kicker}</p>
        </header>

        <figure className="martyrs-editorial__art">
          <picture>
            <source
              media="(max-width: 699px)"
              type="image/avif"
              srcSet={`${stem}-mobile-480.avif 480w, ${stem}-mobile-720.avif 720w, ${stem}-mobile-1080.avif 1080w, ${stem}-mobile-1440.avif 1440w`}
              sizes="100vw"
            />
            <source
              media="(max-width: 699px)"
              type="image/webp"
              srcSet={`${stem}-mobile-480.webp 480w, ${stem}-mobile-720.webp 720w, ${stem}-mobile-1080.webp 1080w, ${stem}-mobile-1440.webp 1440w`}
              sizes="100vw"
            />
            <source
              media="(min-width: 700px)"
              type="image/avif"
              srcSet={`${stem}-desktop-960.avif 960w, ${stem}-desktop-1440.avif 1440w, ${stem}-desktop-1920.avif 1920w`}
              sizes="(min-width: 1400px) 62vw, 58vw"
            />
            <source
              media="(min-width: 700px)"
              type="image/webp"
              srcSet={`${stem}-desktop-960.webp 960w, ${stem}-desktop-1440.webp 1440w, ${stem}-desktop-1920.webp 1920w`}
              sizes="(min-width: 1400px) 62vw, 58vw"
            />
            <img
              src={`${stem}-desktop-1440.webp`}
              alt={editorial.alt}
              width="2400"
              height="3000"
              fetchPriority="high"
            />
          </picture>
          <span className="martyrs-editorial__aperture martyrs-editorial__aperture--left" aria-hidden="true" />
          <span className="martyrs-editorial__aperture martyrs-editorial__aperture--right" aria-hidden="true" />
          <figcaption>MART¥RS / Image {editorial.issue}</figcaption>
        </figure>

        <section className="martyrs-editorial__statement" id="editorial-statement" aria-label={`${editorial.title} editorial statement`}>
          <p>{editorial.statement}</p>
          <p>{editorial.continuation}</p>
          <div className="martyrs-editorial__folio" aria-hidden="true">
            <span>{editorial.issue}</span>
            <i />
            <span>MART¥RS</span>
          </div>

          <nav className="martyrs-editorial__next" aria-label="Next MART¥RS editorial">
            <p>Next editorial</p>
            <a href={`/martyrs/${editorial.nextSlug}`}>
              <span>{editorial.nextTitle}</span>
              <i aria-hidden="true">↗</i>
            </a>
          </nav>
        </section>
      </article>
    </main>
  );
}
