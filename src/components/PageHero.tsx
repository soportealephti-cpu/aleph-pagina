import type { PageContent } from '../types';

export function PageHero({ content }: { content: PageContent }) {
  return (
    <section className="border-b border-slate-200 bg-[#f7fafc] py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.86fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#0f5ea8]">
              {content.overline}
            </p>
            <h1 className="mt-4 text-4xl font-bold uppercase text-[#25364f] md:text-5xl">
              {content.title}
            </h1>
            {content.intro ? (
              <p className="mt-6 max-w-3xl text-sm leading-8 text-slate-600 md:text-base">
                {content.intro}
              </p>
            ) : null}
          </div>

          {content.image ? (
            <div className="overflow-hidden border border-slate-200 bg-white shadow-sm">
              <img src={content.image} alt={content.title} className="w-full object-cover" />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
