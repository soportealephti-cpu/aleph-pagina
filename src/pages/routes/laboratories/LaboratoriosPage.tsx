import { menuItems } from '../../../data/siteContent';

export function LaboratoriosPage() {
  const children = menuItems[2].children ?? [];

  return (
    <main className="bg-white text-[#222]">
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-center text-4xl font-medium text-[#2f466d] md:text-5xl">
            Laboratorios
          </h1>
          <div className="mx-auto mt-5 h-px w-full max-w-3xl bg-slate-300" />

          <p className="mx-auto mt-10 max-w-4xl text-center text-[16px] leading-8 text-slate-700">
            ALEPH SAC cuenta con laboratorios especializados para dosimetría,
            radioquímica, radiometría ambiental, metrología, calibración dosimétrica
            e instrumentación nuclear y radón.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {children.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="border border-slate-200 bg-white px-6 py-6 text-center text-sm font-semibold uppercase leading-7 text-[#324059] transition-colors hover:border-[#0f5ea8] hover:text-[#0f5ea8]"
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
