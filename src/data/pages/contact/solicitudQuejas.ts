import type { PageContent } from '../../../types';

export const solicitudQuejasPage: PageContent = {
  overline: 'Contacto',
  title: 'Solicitud de quejas',
  intro:
    'Seccion institucional destinada al registro y seguimiento de quejas del cliente, segun el flujo de atencion de ALEPH SAC.',
  sections: [
    {
      links: [
        { label: 'Volver a Contactenos', href: '/contacto/' },
        { label: 'Ver flujograma de quejas', href: '/flujograma-de-quejas/' },
      ],
    },
  ],
};
