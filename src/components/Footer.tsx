import type { ReactNode } from 'react';
import { Facebook, Linkedin, Twitter } from 'lucide-react';

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition hover:border-[#0f5ea8] hover:text-[#0f5ea8]"
    >
      {children}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-700">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 md:grid-cols-3 md:items-start">
        <div className="flex flex-col items-center md:items-start">
          <img
            src="/legacy/Nosotros_files/azul-1-300x110.png"
            alt="Aleph Group"
            className="h-auto w-full max-w-[300px] object-contain"
          />
          <div className="mt-6 flex items-center gap-4">
            <SocialLink href="https://es-la.facebook.com/AlephGroupSAC/" label="Facebook">
              <Facebook size={18} strokeWidth={2.2} />
            </SocialLink>
            <SocialLink href="https://twitter.com/alephgroup" label="Twitter">
              <Twitter size={18} strokeWidth={2.2} />
            </SocialLink>
            <SocialLink
              href="https://pe.linkedin.com/company/aleph-group-asociados"
              label="LinkedIn"
            >
              <Linkedin size={18} strokeWidth={2.2} />
            </SocialLink>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-semibold text-slate-900">Contáctenos</h2>
          <p className="mt-6 text-base font-bold text-slate-900">Atención al cliente</p>
          <div className="mt-3 space-y-1 text-base leading-8 text-slate-700">
            <p>+51 960 649 465</p>
            <p>+51 960 617 157</p>
            <p>+ 51 984 123 230</p>
            <p className="pt-2">Lun. a Vie. de 9:00 AM a 6:00 PM</p>
            <p>Sábados de 9:00 AM a 1:00 PM</p>
            <p className="pt-2">Correo: Informes@alephsac.com</p>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <a href="/libro-de-reclamaciones/" className="block">
            <img
              src="/legacy/Nosotros_files/libro-300x189.jpg"
              alt="Libro de reclamaciones"
              className="h-auto w-full max-w-[300px] object-contain"
            />
          </a>
          <a
            href="/solicitud-de-quejas/"
            className="mt-5 inline-flex border border-slate-300 bg-white px-6 py-3 text-center text-base text-slate-700 transition hover:border-[#0f5ea8] hover:text-[#0f5ea8]"
          >
            Consultas quejas &amp; sugerencias
          </a>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-4 text-center text-xs text-slate-500">
          ©Derechos reservados a Aleph Group &amp; Asociados 2023
        </div>
      </div>
    </footer>
  );
}
