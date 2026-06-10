export function PresentacionPage() {
  return (
    <main className="bg-white text-[#222]">
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-center text-4xl font-medium text-[#2f466d] md:text-5xl">
            Presentación
          </h1>
          <div className="mx-auto mt-5 h-px w-full max-w-3xl bg-slate-300" />

          <p className="mx-auto mt-8 max-w-4xl text-center text-[16px] leading-8 text-slate-700">
            A continuación presentamos nuestro video de presentación para que vea y conozca
            un poco más sobre nosotros. Estamos atentos y siempre listos para ayudarlo y
            atenderlo siempre. Somos su mejor opción en Soluciones Integrales en Seguridad
            Radiológica.
          </p>

          <div className="mt-12 overflow-hidden border border-slate-200 bg-black shadow-sm">
            <div className="aspect-video w-full">
              <iframe
                src="https://www.youtube.com/embed/a2MGrGd5EgE"
                title="Video corporativo Aleph"
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-6 pb-20 md:pb-24">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-medium text-[#2f466d]">Autorizaciones y alcances</h2>
          <div className="mt-4 h-px w-full bg-slate-300" />

          <p className="mt-8 text-[16px] leading-8 text-slate-700">
            Nuestro personal cuenta con licencias otorgadas por el Instituto Peruano de
            Energía Nuclear (IPEN) para trabajar con radiaciones ionizantes con las cuales
            pueden desempeñar las siguientes actividades autorizadas:
          </p>

          <ul className="mt-8 list-disc space-y-4 pl-8 text-[16px] leading-8 text-slate-700 marker:text-slate-700">
            <li>Físico Médico de Radioterapia.</li>
            <li>Supervisor en Teleterapia y Braquiterapia.</li>
            <li>Investigación y Enseñanza con Fuentes Radioactivas.</li>
            <li>Físico Médico en Medicina Nuclear.</li>
            <li>Físico Médico en Radiodiagnóstico Médico y Dental.</li>
            <li>Control de Calidad en Medicina Nuclear.</li>
            <li>Oficial de Protección Radiológica en Medicina Nuclear.</li>
            <li>Oficial de Protección Radiológica en Investigación con Fuentes.</li>
            <li>Exploración de Uranio.</li>
            <li>Control de Calidad de Equipos de Rayos X Médico y Dental.</li>
            <li>Oficial protección radiológica en radioterapia.</li>
            <li>Supervisión y Control de Calidad de Equipos de Rayos X Médico.</li>
            <li>Dosimetrista.</li>
            <li>Oficial de Protección Radiológica en Investigación con Fuentes Radioactivas.</li>
            <li>Mantenimiento de Equipos de RX.</li>
            <li>Control de Calidad de Equipos de Rayos X Médico y Dental.</li>
            <li>Control de Calidad de Equipos de Rayos X Médico.</li>
            <li>Control de Calidad en Medicina Nuclear.</li>
            <li>Operación de Medidores Nucleares Portátiles.</li>
            <li>Investigación y enseñanza con Fuentes Radioactivas.</li>
            <li>Operación de perfilaje de pozos petroleros.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
