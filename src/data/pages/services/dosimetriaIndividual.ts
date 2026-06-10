import type { PageContent } from '../../../types';

export const dosimetriaIndividualPage: PageContent = {
  overline: 'Servicios',
  title: 'Dosimetria individual externa',
  intro:
    'El Grupo ALEPH es especialista en brindar servicio de dosimetria de radiaciones, con personal altamente calificado y preparado para garantizar calidad y precision en cada servicio realizado.',
  sections: [
    {
      title: 'Requisitos generales',
      bullets: [
        'El servicio de dosimetria de radiacion externa debe poseer una autorizacion emitida por la OTAN.',
        'Disponer del certificado de pruebas de desempeno dosimetrica de un laboratorio secundario de aprobacion para casos de fotones y de accidentes.',
        'Nuestro dosimetro es TLD Panasonic y tiene relectura de la informacion dosimetrica y su reanalisis y reevaluacion correspondiente.',
      ],
    },
    {
      title: 'Requisitos tecnicos',
      bullets: [
        'Medida de las dosis equivalentes personales profunda Hp(10) y superficial Hp(0,07).',
        'Discriminacion del tipo de energia de la radiacion incidente.',
        'Codigo de identificacion para la lectura automatica.',
        'Sistema de medicion de dosimetria automatica.',
        'Porta dosimetro con estanqueidad para evitar manipulacion por personal no autorizado.',
      ],
    },
  ],
};
