import type { PageContent } from '../../../types';
import { aboutBullets } from './shared';

export const nosotrosPage: PageContent = {
  overline: 'Nosotros',
  title: 'Nosotros',
  intro:
    'Especializada en facilitar soluciones integrales con garantia total para las aplicaciones de las radiaciones ionizantes en la industria, mineria, medioambiente y medicina.',
  image: '/legacy/slider-1.jpg',
  sections: [
    {
      title: 'Nuestra empresa',
      bullets: aboutBullets,
    },
    {
      title: 'Politica institucional',
      paragraphs: [
        'Asegurar el cumplimiento de la etica profesional, confidencialidad, imparcialidad e independencia del personal para garantizar la calidad del servicio, analizando y minimizando de forma continua los riesgos que puedan comprometer la imparcialidad.',
        'Esta Politica de Calidad forma parte de la cultura general de ALEPH SAC y es comprendida por todo el personal, los que estan involucrados y familiarizados con todos los documentos para conseguir un funcionamiento eficaz del Sistema de Gestion integrado establecido.',
      ],
    },
    {
      title: 'Subpaginas',
      links: [
        { label: 'Presentacion', href: '/presentacion/' },
        { label: 'Politica de calidad', href: '/politica-de-calidad/' },
        { label: 'Acreditaciones', href: '/acreditaciones/' },
      ],
    },
  ],
};
