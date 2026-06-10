import type { PageContent } from '../../../types';
import { policyPoints } from './shared';

export const politicaCalidadPage: PageContent = {
  overline: 'Nosotros',
  title: 'Politica de calidad',
  intro:
    'La politica de calidad de ALEPH SAC se encuentra orientada a garantizar la confiabilidad tecnica, la imparcialidad y el cumplimiento de los requisitos del cliente.',
  sections: [
    {
      title: 'Compromiso institucional',
      paragraphs: [
        'Asegurar el cumplimiento de la etica profesional, confidencialidad, imparcialidad e independencia del personal para garantizar la calidad del servicio, analizando y minimizando de forma continua los riesgos que puedan comprometer la imparcialidad.',
        'Esta Politica de Calidad forma parte de la cultura general de ALEPH SAC y es comprendida por todo el personal, los que estan involucrados y familiarizados con todos los documentos para conseguir un funcionamiento eficaz del Sistema de Gestion integrado establecido.',
      ],
      bullets: policyPoints,
    },
    {
      title: 'Temas vinculados',
      links: [
        { label: 'Orientacion al servicio con calidad', href: '/orientacion-al-servicio-con-calidad/' },
        { label: 'Honestidad', href: '/honestidad/' },
        { label: 'Confidencialidad e imparcialidad', href: '/confidencialidad-e-imparcialidad/' },
        { label: 'Compromiso', href: '/compromiso/' },
      ],
    },
  ],
};
