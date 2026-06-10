export function RadioquimicaPage() {
  return (
    <main className="bg-white text-[#222]">
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-center text-4xl font-medium text-[#2f466d] md:text-5xl">
            Radioquímica y Radiometría Ambiental
          </h1>
          <div className="mx-auto mt-5 h-px w-full max-w-3xl bg-slate-300" />

          <div className="mt-10 space-y-6 text-[16px] leading-8 text-slate-700">
            <p>
              Nuestro Laboratorio se centra en cubrir las necesidades existentes a nivel
              nacional en el ámbito de la determinación y control de los niveles de
              radiactividad ambiental. Hemos desarrollado nuevas metodologías y sistemas de
              medición acreditados con el ISO 17025 convirtiéndonos en la única empresa con
              servicios acreditados en calidad.
            </p>

            <p>
              El Laboratorio de Radiometría de la empresa cuenta con vasta experiencia en
              análisis ambiéntales y desarrollo de metodologías analíticas de vanguardia,
              empleando para ello equipamiento de última generación.
            </p>

            <p className="font-semibold text-[#2f466d]">Enfoque de Capacidades y Tecnología:</p>

            <p>Análisis radiométrico de radón ambiental</p>

            <p>
              El gas radón (222Rn), es un gas radioactivo de origen natural que emana del
              suelo y de cuya exposición al mismo puede derivar en problemas importantes de
              salud.
            </p>

            <p>
              Ofrecemos un servicio de medición de la concentración del gas radón en el
              interior de edificios, tanto para usuarios particulares, como para empresas u
              organismos públicos y privados, empleando diferentes métodos de medida en
              función de las necesidades de cada usuario:
            </p>

            <ul className="list-disc space-y-3 pl-8 text-[16px] leading-8 marker:text-slate-700">
              <li>Servicios de radiometría del radón de corto plazo (7 días)</li>
              <li>Servicios de radiometría del radón de mediano plazo (3 meses)</li>
              <li>Servicios de radiometría del radón de largo plazo (12 meses)</li>
            </ul>

            <p className="font-semibold text-[#2f466d]">Espectroscopia Gamma</p>

            <ul className="list-disc space-y-3 pl-8 text-[16px] leading-8 marker:text-slate-700">
              <li>Análisis de uranio en muestras de aguas, suelos, rocas y vegetales</li>
              <li>
                Aplicación de técnicas de espectrometría de rayos gamma en la prospección
                de U y otros metales (Cu, Au, etc.)
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
