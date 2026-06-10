import type { PageContent } from '../../../types';
import { accreditationRows } from './shared';

export const acreditacionesPage: PageContent = {
  overline: 'Nosotros',
  title: 'Acreditaciones',
  intro:
    'Tenemos todas las Autorizaciones del IPEN que nos permiten trabajar con las reglamentaciones vigentes y en cumplimiento de la LEY 28028.',
  sections: [
    {
      title: 'Autorizaciones',
      table: accreditationRows,
    },
    {
      title: 'Acreditacion de laboratorio',
      paragraphs: ['Acreditacion segun ISO/IEC 17025:2006 por la DA - Instituto Nacional de la Calidad (DA - INACAL).'],
      image: '/legacy/acreditaciones-1536x248.png',
    },
  ],
};
