export function NosotrosPage() {
  return (
    <>
      <main className="bg-white text-[#222]">
        <section className="relative overflow-hidden bg-[#f5f7fa] py-20 md:py-28">
          <div className="absolute inset-0 bg-white/30" />
          <div className="relative mx-auto max-w-6xl px-4 text-center">
            <h1 className="text-4xl font-semibold text-[#2f466d] md:text-6xl">
              Acerca de Nosotros
            </h1>
          </div>
        </section>

        <section className="bg-white py-10 md:py-14">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-medium text-[#2f466d]">Misión</h2>
              <div className="mt-4 h-px w-full bg-slate-300" />
              <p className="mt-6 text-[16px] text-justify leading-8 text-slate-700">
                Brindar a nuestros clientes soluciones Integrales en Seguridad
                Radiológica, a cargo de profesionales altamente cualificados y
                competentes en el rubro. Con soporte e innovación tecnológica.
              </p>
            </div>

            <div className="flex justify-center lg:justify-end">
              <img
                src="/legacy/Nosotros_files/mision-1536x1024.jpg"
                alt="Misión"
                className="h-auto max-w-full object-contain"
              />
            </div>
          </div>
        </section>

        <section className="bg-white py-10 md:py-14">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-2 lg:items-center">
            <div className="order-2 flex justify-center lg:order-1 lg:justify-start">
              <img
                src="/legacy/Nosotros_files/Vision-scaled.jpg"
                alt="Visión"
                className="h-auto max-w-full object-contain"
              />
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-medium text-[#2f466d]">Visión</h2>
              <div className="mt-4 h-px w-full bg-slate-300" />
              <p className="mt-6 text-[16px] text-justify leading-8 text-slate-700">
                Ser reconocidos como la empresa líder en el Perú en proporcionar
                soluciones integrales en el uso de radiaciones ionizantes,
                económicamente rentables para nuestros clientes y buscando la
                satisfacción de sus necesidades.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="text-center text-4xl font-medium text-[#2f2bb8] md:text-5xl">
              Nuestros Valores
            </h2>

            <ul className="mt-12 space-y-6 text-[18px] leading-8 text-black md:text-[19px]">
              <li className="flex items-start gap-4">
                <span className="text-[22px] text-[#1f2bbd]">✓</span>
                <span>Orientación al servicio con calidad.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[22px] text-[#1f2bbd]">✓</span>
                <span>Confidencialidad e imparcialidad.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[22px] text-[#1f2bbd]">✓</span>
                <span>Creatividad e innovación.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[22px] text-[#1f2bbd]">✓</span>
                <span>Identidad corporativa.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[22px] text-[#1f2bbd]">✓</span>
                <span>Honestidad.</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-center text-5xl font-medium text-[#2f2bb8] md:text-6xl">
              Nuestros Clientes
            </h2>

            <div className="mt-8 space-y-10">
              <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
                <a
                  href="https://www.antapaccay.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-[150px] items-center justify-center"
                >
                  <img
                    src="/legacy/Nosotros_files/logo.jpg"
                    alt="Antapaccay"
                    className="max-h-[120px] w-auto object-contain"
                  />
                </a>

                <a
                  href="https://www.minerabateas.com/es/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-[150px] items-center justify-center"
                >
                  <img
                    src="/legacy/Nosotros_files/minerabateas.png"
                    alt="Minera Bateas"
                    className="max-h-[88px] w-auto object-contain"
                  />
                </a>

                <a
                  href="https://www.chinalco.com.pe/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-[150px] items-center justify-center"
                >
                  <img
                    src="/legacy/Nosotros_files/chinalco.png"
                    alt="Chinalco"
                    className="max-h-[120px] w-auto object-contain"
                  />
                </a>

                <a
                  href="https://www.antamina.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-[150px] items-center justify-center"
                >
                  <img
                    src="/legacy/Nosotros_files/antamina.jpg"
                    alt="Antamina"
                    className="max-h-[110px] w-auto object-contain"
                  />
                </a>
              </div>

              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-3">
                <a
                  href="https://hudbayminerals.com/peru/default.aspx"
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-[120px] items-center justify-center"
                >
                  <img
                    src="/legacy/Nosotros_files/hudbay.png"
                    alt="Hudbay"
                    className="max-h-[88px] w-auto object-contain"
                  />
                </a>

                <a
                  href="https://www.facebook.com/LABYCONST/?locale=es_LA"
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-[120px] items-center justify-center"
                >
                  <img
                    src="/legacy/Nosotros_files/labycost.png"
                    alt="Labycost"
                    className="max-h-[68px] w-auto object-contain"
                  />
                </a>

                <a
                  href="https://www.cerroverde.pe/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-[120px] items-center justify-center"
                >
                  <img
                    src="/legacy/Nosotros_files/cerro-verde.png"
                    alt="Cerro Verde"
                    className="max-h-[68px] w-auto object-contain"
                  />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
