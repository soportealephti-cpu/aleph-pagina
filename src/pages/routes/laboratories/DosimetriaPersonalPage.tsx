import Lottie from 'lottie-react';
import { Factory, HandHelping, KeyRound, TreePine } from 'lucide-react';
import dosimetriaAnimation from '../../../assets/lf20_ecklnf1e.json';

const sectors = [
  {
    label: 'Médico',
    icon: HandHelping,
  },
  {
    label: 'Industrial',
    icon: Factory,
  },
  {
    label: 'Ambiental',
    icon: TreePine,
  },
  {
    label: 'Seguridad',
    icon: KeyRound,
  },
];

export function DosimetriaPersonalPage() {
  return (
    <main className="bg-white text-[#222]">
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-center text-4xl font-medium text-[#2f466d] md:text-5xl">
            Dosimetría Personal y Ambiental
          </h1>
          <div className="mx-auto mt-5 h-px w-full max-w-3xl bg-slate-300" />

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <p className="text-[16px] leading-8 text-slate-700">
                Ofrecemos dosímetros Personales, dosímetros Ambientales, dosímetros de
                neutrones y servicios de dosimetría para determinar la exposición
                ocupacional a la radiación ionizante. Las aplicaciones comunes de nuestros
                dosímetros se encuentran en los diferentes ámbitos laborales que incluyen
                los siguientes sectores:
              </p>

              <div className="mt-10 space-y-6">
                {sectors.map(({ label, icon: Icon }, index) => (
                  <div
                    key={label}
                    className="flex items-center gap-5"
                  >
                    <div className="relative flex items-center">
                      {index < sectors.length - 1 ? (
                        <span className="absolute left-[27px] top-14 h-10 w-px bg-slate-300" />
                      ) : null}
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1f2bbd] text-white">
                        <Icon size={24} strokeWidth={2.2} />
                      </div>
                    </div>
                    <h2 className="text-2xl font-medium text-[#2f466d]">{label}</h2>
                  </div>
                ))}
              </div>

              <p className="mt-10 text-[16px] leading-8 text-slate-700">
                Contamos con equipos de alta tecnología tal como, el Lector TLD automático
                UD-7900, el buque insignia de las operaciones modernas de lectura TLD. Esta
                máquina puede leer por ciclo 500 TLDs a la vez, y se ha configurado para la
                captura de datos a un ordenador de mesa. En combinación con nuestro
                software, la lectura de TLD se simplifica a sólo unos pasos.
              </p>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-[520px] overflow-hidden bg-white">
                <Lottie
                  animationData={dosimetriaAnimation}
                  loop
                  autoplay
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
