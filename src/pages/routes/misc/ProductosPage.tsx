import { PageHero } from '../../../components/PageHero';

export function ProductosPage() {
  const fixedProtection = ['Vidrio plomado', 'Puertas blindadas', 'Campanas blindadas', 'Baritrón'];
  const mobileProtection = [
    'Detectores de radiación',
    'Inmovilizadores',
    'Mandiles plomados',
    'Gafas y collarines plomados',
    'Tachos plomados',
    'Biombos',
    'Blindaje para viales y jeringas',
  ];

  return (
    <>
      <PageHero
        content={{
          overline: 'Productos',
          title: 'Productos',
          intro:
            'Productos, equipos de medición e instrumentos para protección radiológica en aplicaciones industriales y médicas.',
          sections: [],
        }}
      />

      <section className="bg-white py-16" aria-labelledby="catalogo-productos">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 id="catalogo-productos" className="text-3xl font-semibold text-[#2f466d]">
              Blindaje y equipos para protección radiológica
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-700">
              Proveemos soluciones de protección frente a radiaciones ionizantes para instalaciones,
              profesionales e instituciones de los sectores médico e industrial. Nuestro catálogo
              comprende blindajes fijos, elementos móviles y equipos de medición radiológica.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <article className="rounded-sm border border-slate-200 p-8 shadow-sm">
              <h3 className="text-2xl font-semibold text-[#2f466d]">
                Blindaje para la protección radiológica
              </h3>
              <p className="mt-4 leading-7 text-slate-700">
                Materiales y soluciones para salas de rayos X, búnkeres de aceleradores lineales y
                otros recintos que requieren control de radiación.
              </p>
              <ul className="mt-6 grid gap-3 text-slate-700 sm:grid-cols-2">
                {fixedProtection.map((product) => <li key={product}>• {product}</li>)}
              </ul>
            </article>

            <article className="rounded-sm border border-slate-200 p-8 shadow-sm">
              <h3 className="text-2xl font-semibold text-[#2f466d]">
                Equipos de medición e instrumentos para protección radiológica
              </h3>
              <p className="mt-4 leading-7 text-slate-700">
                Equipamiento y accesorios para monitoreo, seguridad ocupacional y trabajo con
                fuentes de radiación en campo o instalaciones especializadas.
              </p>
              <ul className="mt-6 grid gap-3 text-slate-700 sm:grid-cols-2">
                {mobileProtection.map((product) => <li key={product}>• {product}</li>)}
              </ul>
            </article>
          </div>

          <div className="mt-10 text-center">
            <a
              href="/contactenos/"
              className="inline-flex rounded-sm bg-[#0f5ea8] px-7 py-3 font-semibold text-white transition-colors hover:bg-[#0b4b86]"
            >
              Solicitar información o cotización
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
