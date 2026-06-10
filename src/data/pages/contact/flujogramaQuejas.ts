import type { PageContent } from '../../../types';

export const flujogramaQuejasPage: PageContent = {
  overline: 'Contacto',
  title: 'Flujograma de quejas',
  intro:
    'Seccion institucional destinada a mostrar el flujo de atencion y tratamiento de quejas del cliente.',
  sections: [
    {
      links: [
        { label: 'Volver a Contactenos', href: '/contacto/' },
        { label: 'Ver solicitud de quejas', href: '/solicitud-de-quejas/' },
      ],
    },
  ],
};
