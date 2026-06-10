import type { PageContent } from '../../../types';
import { menuItems } from '../../navigation';

export const laboratoriosPage: PageContent = {
  overline: 'Laboratorios',
  title: 'Laboratorios',
  intro:
    'ALEPH SAC cuenta con laboratorios especializados para dosimetria, radiometria, metrologia, calibracion e instrumentacion.',
  sections: [
    {
      links: menuItems[2].children,
    },
  ],
};
