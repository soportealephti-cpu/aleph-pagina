import { useEffect, useState } from 'react';
import { SectionTitle } from '../components/SectionTitle';
import { heroSlides, officeAddress, topEmail, topPhones } from '../data/siteContent';

export function HomePage() {
  const [slideIndex, setSlideIndex] = useState(0);
  const currentSlide = heroSlides[slideIndex];

  function goToPreviousSlide() {
    setSlideIndex((value) => (value === 0 ? heroSlides.length - 1 : value - 1));
  }

  function goToNextSlide() {
    setSlideIndex((value) => (value + 1) % heroSlides.length);
  }

  useEffect(() => {
    const timer = window.setInterval(() => {
      goToNextSlide();
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <section className="relative border-b border-slate-200 bg-slate-900">
        <div className="absolute inset-0">
          <img
            src={currentSlide.image}
            alt={currentSlide.title}
            className="h-full w-full object-cover object-center opacity-80"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,19,35,0.34),rgba(9,19,35,0.08))]" />

        <button
          type="button"
          onClick={goToPreviousSlide}
          className="absolute left-0 top-1/2 z-10 flex h-24 w-16 -translate-y-1/2 items-center justify-center text-white transition hover:opacity-80 md:h-32 md:w-24"
          aria-label="Imagen anterior"
        >
          <svg viewBox="0 0 283.4 512" className="h-14 w-8 fill-current md:h-20 md:w-12" aria-hidden="true">
            <g>
              <polygon points="54.5,256.3 283.4,485.1 256.1,512.5 0,256.3 0,256.3 27.2,229 256.1,0 283.4,27.4" />
            </g>
          </svg>
        </button>
        <button
          type="button"
          onClick={goToNextSlide}
          className="absolute right-0 top-1/2 z-10 flex h-24 w-16 -translate-y-1/2 items-center justify-center text-white transition hover:opacity-80 md:h-32 md:w-24"
          aria-label="Imagen siguiente"
        >
          <svg viewBox="0 0 283.4 512" className="h-14 w-8 rotate-180 fill-current md:h-20 md:w-12" aria-hidden="true">
            <g>
              <polygon points="54.5,256.3 283.4,485.1 256.1,512.5 0,256.3 0,256.3 27.2,229 256.1,0 283.4,27.4" />
            </g>
          </svg>
        </button>

        <div className="relative mx-auto grid min-h-[620px] max-w-7xl items-center px-4 py-24 md:min-h-[720px]">
          <div className="max-w-3xl text-white">
            <p className="text-sm font-bold uppercase tracking-[0.34em] text-[#7ec7fc]">
              {currentSlide.eyebrow}
            </p>
            <h1 className="mt-6 text-4xl font-black uppercase leading-tight md:text-6xl">
              {currentSlide.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-100 md:text-xl">
              {currentSlide.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={currentSlide.href}
                className="inline-flex border border-white bg-[#0f5ea8] px-6 py-3 text-sm font-bold uppercase tracking-[0.1em] text-white"
              >
                Ver mas
              </a>
              <a
                href="/contactenos/"
                className="inline-flex border border-white px-6 py-3 text-sm font-bold uppercase tracking-[0.1em] text-white"
              >
                Contactenos
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4">
          <img
            src="/legacy/acreditaciones-1536x248.png"
            alt="Acreditaciones"
            className="w-full object-contain"
          />
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle overline="" title="Presentacion" />
          <div className="mt-12 overflow-hidden border border-slate-200 bg-black shadow-sm">
            <video
              src="/legacy/VideoCorporativoAleph.mp4"
              poster="/legacy/slider-1.jpg"
              controls
              playsInline
              className="aula-video h-auto w-full"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#f8f9fb] py-16 md:py-20">
        <div className="mx-auto max-w-[1360px] px-4">
          <div className="text-center">
            <h2 className="text-[38px] font-semibold tracking-[0.01em] text-[#334b73] md:text-[44px]">
              Somos una empresa
            </h2>
            <p className="mx-auto mt-10 max-w-[900px] text-[18px] leading-[1.6] text-black md:text-[21px]">
              Especializada en facilitar soluciones integrales con garantia total para las aplicaciones de las radiaciones ionizantes en la industria, mineria, medioambiente y medicina.
            </p>
          </div>

          <div className="mt-8 rounded-[2rem] bg-[#f3f3f3] px-10 py-12 md:px-14 md:py-12 lg:px-16">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
              <div>
                <h3 className="text-[34px] font-normal text-[#58749a] md:text-[36px]">Nosotros</h3>
                <ul className="mt-8 space-y-4 text-[18px] leading-[1.55] text-black md:text-[19px]">
                  <li className="flex items-start gap-4">
                    <span className="mt-[2px] text-[28px] leading-none text-[#1f2bbd]">+</span>
                    <span>Buscando continuamente la confiabilidad y eficiencia en su servicio.</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="mt-[2px] text-[28px] leading-none text-[#1f2bbd]">+</span>
                    <span>Adoptando una politica en materia de calidad que apunte a la satisfaccion de los requisitos del cliente</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="mt-[2px] text-[28px] leading-none text-[#1f2bbd]">+</span>
                    <span>Para ello nuestra Gerencia se compromete a mejorar continuamente la eficacia del sistema de Gestion integrado</span>
                  </li>
                </ul>
                <a
                  href="/nosotros/"
                  className="mt-8 inline-flex bg-[#1f27b8] px-9 py-3 text-[16px] font-normal text-white"
                >
                  Mas Informacion
                </a>
              </div>

              <div className="text-[18px] leading-[1.72] text-black md:text-[19px] lg:pt-2">
                <p className="text-justify">
                  Asegurar el cumplimiento de la etica profesional, confidencialidad, imparcialidad e independencia del personal para garantizar la calidad del servicio, analizando y minimizando de forma continua los riesgos que puedan comprometer la imparcialidad. Esta Politica de Calidad forma parte de la cultura general de ALEPH SAC y es comprendida por todo el personal, los que estan involucrados y familiarizados con todos los documentos para conseguir un funcionamiento eficaz del Sistema de Gestion integrado establecido.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f7fa] py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#0f5ea8]">Representacion</p>
            <h2 className="mt-4 text-4xl font-bold uppercase text-[#2e3d55]">Somos Representantes</h2>
          </div>

          <div className="mt-16 flex flex-col items-center justify-between gap-12 md:flex-row md:gap-20">
            <div className="flex flex-1 items-center justify-center">
              <img
                src="/legacy/temasinergie.png"
                alt="Tema Sinergie"
                className="max-h-[80px] w-auto object-contain md:max-h-[90px]"
              />
            </div>
            <div className="flex flex-1 items-center justify-center">
              <img
                src="/legacy/instrotek.png"
                alt="InstroTek"
                className="max-h-[110px] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7fafc] py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle overline="Contacto" title="Contactenos" />
          <div className="mt-12 grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="border border-slate-200 bg-white p-8 shadow-sm">
              <div className="space-y-5 text-sm leading-7 text-slate-700">
                <p>{officeAddress}</p>
                <p>
                  Informes: {topPhones[0]}
                  <br />
                  Informes: {topPhones[1]}
                  <br />
                  Informes: {topPhones[2]}
                </p>
                <p>Correo: {topEmail}</p>
                <p>
                  Lun. a Vie. de 9:00 AM a 6:00 PM
                  <br />
                  Sabados de 9:00 AM a 1:00 PM
                </p>
              </div>
            </div>

            <div className="overflow-hidden border border-slate-200 bg-white shadow-sm">
              <iframe
                title="Mapa Aleph"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d975.3590710332325!2d-77.09617637078325!3d-12.082256499465199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c97be44e839b%3A0x2a93b50c6df7df5e!2sAv.%20Rafael%20Escardo%20154%2C%20San%20Miguel%2015087%2C%20Peru!5e0!3m2!1ses!2spe!4v1495034685956"
                className="h-[420px] w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
