import type { PageContent } from '../../../types';
import { presentationBullets } from './shared';

export const presentacionPage: PageContent = {
  overline: 'Nosotros',
  title: 'Presentacion',
  intro:
    'A continuacion presentamos nuestro video de presentacion para que vea y conozca un poco mas sobre nosotros. Estamos atentos y siempre listos para ayudarlo y atenderlo siempre. Somos su mejor opcion en Soluciones Integrales en Seguridad Radiologica.',
  sections: [
    {
      video: '/legacy/VideoCorporativoAleph.mp4',
    },
    {
      title: 'Autorizaciones y alcances',
      paragraphs: [
        'ALEPH SAC cuenta con autorizaciones de servicios emitidas por la Oficina Tecnica de la Autoridad Nacional del Instituto Peruano de Energia Nuclear, las cuales nos permiten brindar servicios en los diferentes sectores productivos en donde se hace uso de las radiaciones ionizantes y en cumplimiento de la normativa nacional vigente.',
      ],
      bullets: presentationBullets,
    },
  ],
};
