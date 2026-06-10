const accreditationRows = [
  { label: 'Dosimetría personal externa', code: 'S0167-E6' },
  {
    label:
      'Mantenimiento y reparación de fuentes de radiación ionizante (Aceleradores lineales de uso médico)',
    code: 'S0107-E1',
  },
  { label: 'Control de calidad de rayos X de diagnóstico médico y dental', code: 'S0009-E3' },
  {
    label:
      'Control Operativo de Instalaciones Radiactivas (Diagnóstico Médico con Rayos X, Medicina Nuclear, Braquiterapia de Alta y Baja Tasa de Dosis y Teleterapia)',
    code: 'S0183-E2',
  },
  { label: 'Calibración de haces de radiaciones ionizantes en teleterapia', code: 'S0045-E4' },
  {
    label:
      'Control Operativo de Instalaciones Radiactivas relacionadas con la minería de uranio y pararrayos radiactivos',
    code: 'S0144-E2',
  },
  { label: 'Control de calidad en equipos de medicina nuclear', code: 'S0197-E3' },
  {
    label:
      'Instalaciones, mantenimiento y reparación de fuentes de radiación ionizante (Equipos de rayos X médico dental)',
    code: 'S0225-E1',
  },
  { label: 'Análisis radiométrico de muestras mediante espectrometría gamma', code: 'R0003-E5' },
  { label: 'Análisis radiométrico de radón ambiental', code: 'S0022-E5' },
  { label: 'Análisis radiométrico', code: 'S0003-E5' },
  { label: 'Importación y/o comercialización de fuentes de radiación ionizante', code: 'S0336-E7' },
  { label: 'Almacenamiento de material radiactivo', code: '4623.B5' },
  { label: 'Almacenamiento de material radiactivo (Chiclayo)', code: '4346.B5' },
];

export function AcreditacionesPage() {
  return (
    <main className="bg-white text-[#222]">
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-center text-4xl font-medium text-[#2f466d] md:text-5xl">
            Acreditaciones
          </h1>
          <div className="mx-auto mt-5 h-px w-full max-w-3xl bg-slate-300" />

          <p className="mx-auto mt-8 max-w-5xl text-center text-[16px] leading-8 text-slate-700">
            ALEPH SAC, cuenta con autorizaciones de servicios emitidas por la Oficina
            Técnica de la Autoridad Nacional(OTAN) del Instituto Peruano de Energía
            Nuclear(IPEN) las cuales nos permiten brindar servicios en los diferentes
            sectores productivos en donde se hace uso de las radiaciones ionizantes y en
            cumplimiento de la normativa nacional vigente.
          </p>

          <div className="mt-12 overflow-x-auto border border-slate-200">
            <table className="min-w-full border-collapse text-left text-[15px] text-slate-700">
              <thead className="bg-slate-50">
                <tr>
                  <th className="border border-slate-200 px-4 py-3 font-semibold">Descripción</th>
                  <th className="border border-slate-200 px-4 py-3 font-semibold">Acreditación</th>
                </tr>
              </thead>
              <tbody>
                {accreditationRows.map((row) => (
                  <tr key={`${row.code}-${row.label}`}>
                    <td className="border border-slate-200 px-4 py-3">{row.label}</td>
                    <td className="border border-slate-200 px-4 py-3 font-semibold text-[#2f466d]">
                      {row.code}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-12 text-center text-[24px] font-medium leading-10 text-[#2f466d] md:text-[30px]">
            ACREDITACIÓN SEGÚN ISO/IEC 17025:2006 POR LA DA – INSTITUTO NACIONAL DE LA
            CALIDAD (DA – INACAL)
          </p>
        </div>
      </section>
    </main>
  );
}
