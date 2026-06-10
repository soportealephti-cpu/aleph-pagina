import { PageHero } from '../../../components/PageHero';

export function FlujogramaQuejasPage() {
  return (
    <>
      <PageHero
        content={{
          overline: 'Contacto',
          title: 'Flujograma de quejas',
          intro:
            'Seccion institucional destinada a mostrar el flujo de atencion y tratamiento de quejas del cliente.',
          sections: [],
        }}
      />

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl rounded-sm border border-slate-200 bg-white px-8 py-10 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <a href="/contacto/" className="border border-slate-200 bg-[#f8fbff] px-6 py-5 text-center text-sm font-semibold uppercase text-[#324059]">
              Volver a Contactenos
            </a>
            <a href="/solicitud-de-quejas/" className="border border-slate-200 bg-[#f8fbff] px-6 py-5 text-center text-sm font-semibold uppercase text-[#324059]">
              Ver solicitud de quejas
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
