import { menuItems } from '../../../data/siteContent';

export function ServiciosPage() {
  const children = menuItems[4].children ?? [];

  return (
    <main className="bg-white text-[#222]">
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-center text-4xl font-bold uppercase tracking-[0.04em] text-[#2f466d] md:text-5xl">
            SERVICIOS
          </h1>
          <p className="mx-auto mt-5 max-w-4xl text-center text-base leading-8 text-slate-700">
            Aleph Group y Asociados cuenta con una gran variedad de servicios con
            respecto al analisis, estudio e impacto a la emision de radiacion
            ionizante, con mas de 20 años de experiencia garantizamos el trabajo que
            realizamos asegurando maxima satisfaccion con todos nuestros clientes.
          </p>
          <div className="mx-auto mt-5 h-px w-full max-w-3xl bg-slate-300" />

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {children.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="border border-slate-200 bg-white px-6 py-6 text-center text-sm font-semibold uppercase leading-7 text-[#324059] shadow-sm transition-colors hover:bg-slate-50"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
