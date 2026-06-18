import { PageHero } from '../../../components/PageHero';

const flujogramaPdfUrl = '/F-SGI-059%20Flujograma%20de%20Quejas%20Vs.00.pdf';

export function FlujogramaQuejasPage() {
  return (
    <>
      <PageHero
        content={{
          overline: 'Contacto',
          title: 'Flujograma de quejas',
          intro:
            'Seccion institucional destinada a mostrar el flujograma oficial de atencion y tratamiento de quejas del cliente.',
          sections: [],
        }}
      />

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-4">
          <div className="rounded-sm border border-slate-200 bg-white px-6 py-5 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Documento institucional
                </p>
                <h2 className="mt-2 text-2xl font-semibold uppercase text-[#324059]">
                  F-SGI-059 Flujograma de Quejas
                </h2>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={flujogramaPdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-[#0f5ea8] px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.05em] text-[#0f5ea8]"
                >
                  Abrir PDF
                </a>
                <a
                  href={flujogramaPdfUrl}
                  download
                  className="bg-[#0f5ea8] px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.05em] text-white"
                >
                  Descargar
                </a>
              </div>
            </div>
          </div>

          <div className="overflow-hidden border border-slate-200 bg-slate-50 shadow-sm">
            <iframe
              title="Flujograma de quejas PDF"
              src={flujogramaPdfUrl}
              className="h-[85vh] w-full"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <a
              href="/contacto/"
              className="border border-slate-200 bg-[#f8fbff] px-6 py-5 text-center text-sm font-semibold uppercase text-[#324059]"
            >
              Volver a Contactenos
            </a>
            <a
              href="/solicitud-de-quejas/"
              className="border border-slate-200 bg-[#f8fbff] px-6 py-5 text-center text-sm font-semibold uppercase text-[#324059]"
            >
              Ver solicitud de quejas
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
