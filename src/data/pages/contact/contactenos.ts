import type { PageContent } from '../../../types';
import { officeAddress } from '../../navigation';

export const contactenosPage: PageContent = {
  overline: 'Contacto',
  title: 'Contactenos',
  intro: 'Canales directos de atencion, ubicacion y horarios de atencion de ALEPH Group & Asociados.',
  sections: [
    {
      title: 'Informacion de contacto',
      bullets: [
        officeAddress,
        'Informes: +51 960 549 465',
        'Informes: +51 960 617 157',
        'Informes: +51 984 123 230',
        'Correo: informes@alephsac.com',
        'Lun. a Vie. de 9:00 AM a 6:00 PM',
        'Sabados de 9:00 AM a 1:00 PM',
      ],
    },
  ],
};
