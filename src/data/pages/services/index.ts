import type { PageContent } from '../../../types';
import { calibracionesDosimetricasPage } from './calibracionesDosimetricas';
import { dosimetriaIndividualPage } from './dosimetriaIndividual';
import { mantenimientoCalibracionPage } from './mantenimientoCalibracion';
import { mapeoTasaDosisPage } from './mapeoTasaDosis';
import { pruebaHermeticidadPage } from './pruebaHermeticidad';
import { serviciosPage } from './servicios';

export const servicePages: Record<string, PageContent> = {
  '/servicios/': serviciosPage,
  '/servicios/calibraciones-dosimetricas/': calibracionesDosimetricasPage,
  '/servicios/dosimetria-individual-externa/': dosimetriaIndividualPage,
  '/servicios/prueba-de-hermeticidad/': pruebaHermeticidadPage,
  '/servicios/mapeo-de-tasa-de-dosis/': mapeoTasaDosisPage,
  '/servicios/mantenimiento-y-calibracion/': mantenimientoCalibracionPage,
};
