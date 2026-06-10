import type { PageContent } from '../types';

export function PageSections({ content }: { content: PageContent }) {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="space-y-8">
          {content.sections.map((section, index) => (
            <article key={`${content.title}-${index}`} className="border border-slate-200 bg-white p-8 shadow-sm">
              {section.title ? (
                <h2 className="text-2xl font-semibold uppercase text-[#324059]">{section.title}</h2>
              ) : null}

              {section.paragraphs?.map((paragraph) => (
                <p
                  key={paragraph}
                  className={`${section.title ? 'mt-5' : ''} text-sm leading-8 text-slate-700`}
                >
                  {paragraph}
                </p>
              ))}

              {section.bullets ? (
                <ul className={`${section.title || section.paragraphs ? 'mt-5' : ''} space-y-3 text-sm leading-7 text-slate-700`}>
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="border-b border-slate-200 pb-3 last:border-b-0 last:pb-0">
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}

              {section.links ? (
                <div className={`${section.title || section.paragraphs || section.bullets ? 'mt-6' : ''} grid gap-4 md:grid-cols-2 xl:grid-cols-3`}>
                  {section.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="border border-slate-200 bg-[#f8fbff] px-5 py-4 text-sm font-semibold uppercase tracking-[0.05em] text-[#324059]"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              ) : null}

              {section.video ? (
                <div className={`${section.title || section.paragraphs || section.bullets ? 'mt-6' : ''} overflow-hidden border border-slate-200 bg-black`}>
                  <video
                    src={section.video}
                    poster="/legacy/slider-1.jpg"
                    controls
                    playsInline
                    className="aula-video h-auto w-full"
                  />
                </div>
              ) : null}

              {section.image ? (
                <div className={`${section.title || section.paragraphs || section.bullets ? 'mt-6' : ''}`}>
                  <img src={section.image} alt={section.title ?? content.title} className="w-full object-contain" />
                </div>
              ) : null}

              {section.table ? (
                <div className={`${section.title ? 'mt-6' : ''} overflow-hidden border border-slate-200`}>
                  <table className="w-full border-collapse text-sm text-slate-700">
                    <thead>
                      <tr className="bg-[#eaeaea] text-left text-[#25364f]">
                        <th className="border border-slate-300 px-4 py-3">Descripcion</th>
                        <th className="border border-slate-300 px-4 py-3 text-center">Acreditacion</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.map((row) => (
                        <tr key={`${row.label}-${row.code}`}>
                          <td className="border border-slate-300 px-4 py-3 align-top">{row.label}</td>
                          <td className="border border-slate-300 px-4 py-3 text-center align-top">{row.code}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
