const radonServices = [
  'Mediciones de radón en viviendas.',
  'Mediciones de radón en minas subterraneas.',
  'Mediciones de radón en espacios abiertos.',
  'Mediciones de radón en yacimientos uraniferos.',
  'Mediciones de radón en yacimientos de fosfatos.',
  'Mediciones de radón en balnearios de fuentes minero medicinales.',
  'Dosimetría de área de radón.',
  'Consultoria en protección radiológica contra el radón.',
  'Capacitación en protección radiológica sobre el radón.',
  'Servicios de radiometría del radón de corto plazo (7 días)',
  'Servicios de radiometría del radón de mediano plazo (3 meses)',
  'Servicios de radiometría del radón de largo plazo (12 meses)',
];

export function InstrumentacionRadonPage() {
  return (
    <main className="bg-white text-[#222]">
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="space-y-2 text-center">
            <h1 className="text-4xl font-medium text-[#2f466d] md:text-5xl">
              Instrumentación Nuclear y Radón
            </h1>
          </div>

          <div className="mx-auto mt-5 h-px w-full max-w-3xl bg-slate-300" />

          <div className="mt-10 space-y-6 text-[16px] leading-8 text-slate-700">
            <p>
              Nuestro Laboratorios cuentan con los equipamientos e instrumentos para
              realizar mediciones de radiación alfa, beta, gamma y neutrones.
            </p>

            <p>
              Asimismo, somos los pioneros en el país en mediciones de radón con
              métodos activos y pasivos con procedimientos ISO 17025. Así como
              también somos expertos en, dosimetría, consultoría, capacitación y
              entre otros servicios referidos al análisis Radiométrico de Radón
              Ambiental.
            </p>

            <p className="font-semibold text-[#2f466d]">
              LICENCIA IPEN-0TAN – Nº S0022
            </p>

            <div className="space-y-4">
              <p className="font-semibold text-[#2f466d]">
                Servicio de medición de gas radón:
              </p>

              <ul className="list-disc space-y-2 pl-6">
                {radonServices.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </div>

            <p className="font-semibold text-[#2f466d]">
              Conteo proporcional para detección de partículas alfa y beta
            </p>

            <p>
              La empresa ALEPH GROUP ofrece servicios analíticos que cubren diversas
              matrices como los son la aguas superficiales, efluentes industriales
              líquidos, aguas subterráneas, aguas de lluvia y sedimentos.
            </p>

            <p>
              El laboratorio cuenta Programa de Aseguramiento de la Calidad Analítica
              documentado en un Manual de Control de Calidad Analítico donde se
              detallan todos los aspectos técnicos que permiten definir la
              selectividad y especificidad, precisión y exactitud, rango de
              medición, linealidad, límite de detección y cuantificación, robustez,
              construcción de gráficos de control para cada metodología.
            </p>

            <p>
              Adicionalmente se asegura la trazabilidad metrológica de las
              mediciones, ya que el Sistema de Gestión de la Calidad incluye el
              Programa de Calibración de Equipos – Mantenimiento preventivo y
              correctivo. Todos los equipos de medición son verificados utilizando
              patrones que fueron comparados con patrones estándares nacionales o
              internacionales basados en las unidades fundamentales del Sistema
              Internacional (SI).Se asegura que la cadena de comparaciones de la
              medición entre los patrones y los dispositivos de medición no sea
              interrumpida.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
