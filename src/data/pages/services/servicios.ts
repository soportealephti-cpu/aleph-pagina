import type { PageContent } from '../../../types';
import { menuItems } from '../../navigation';

export const serviciosPage: PageContent = {
  overline: 'Servicios',
  title: 'Servicios',
  intro:
    'Catalogo de servicios tecnicos, de consultoria, calibracion y soporte operativo del sitio institucional anterior.',
  sections: [
    {
      links: menuItems[4].children,
    },
  ],
};
