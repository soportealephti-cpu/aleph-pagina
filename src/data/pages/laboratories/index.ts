import type { PageContent } from '../../../types';
import { calibracionDosimetricaPage } from './calibracionDosimetrica';
import { dosimetriaPersonalPage } from './dosimetriaPersonal';
import { instrumentacionRadonPage } from './instrumentacionRadon';
import { laboratoriosPage } from './laboratorios';
import { metrologiaPage } from './metrologia';
import { radioquimicaPage } from './radioquimica';

export const laboratoryPages: Record<string, PageContent> = {
  '/laboratorios/': laboratoriosPage,
  '/dosimetria-personal-y-ambiental/': dosimetriaPersonalPage,
  '/radioquimica-y-radiometria-ambiental/': radioquimicaPage,
  '/metrologia-y-control-de-calidad/': metrologiaPage,
  '/laboratorio-de-calibracion-dosimetrica/': calibracionDosimetricaPage,
  '/instrumentacion-nuclear-y-radon/': instrumentacionRadonPage,
};
