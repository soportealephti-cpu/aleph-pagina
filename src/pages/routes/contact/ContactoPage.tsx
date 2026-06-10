import { PageHero } from '../../../components/PageHero';
import { officeAddress, topEmail, topPhones } from '../../../data/siteContent';

export function ContactoPage() {
  return (
    <>
      <PageHero
        content={{
          overline: 'Contacto',
          title: 'Contactenos',
          intro: 'Canales directos de atencion, ubicacion y horarios de atencion de ALEPH Group & Asociados.',
          sections: [],
        }}
      />

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-sm border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold uppercase text-[#25364f]">Informacion de contacto</h2>
            <div className="mt-6 space-y-4 text-sm leading-7 text-slate-700">
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

          <div className="rounded-sm border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold uppercase text-[#25364f]">Atencion al cliente</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <a href="/solicitud-de-quejas/" className="border border-slate-200 bg-[#f8fbff] px-6 py-5 text-center text-sm font-semibold uppercase text-[#324059]">
                Solicitud de quejas
              </a>
              <a href="/flujograma-de-quejas/" className="border border-slate-200 bg-[#f8fbff] px-6 py-5 text-center text-sm font-semibold uppercase text-[#324059]">
                Flujograma de quejas
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
