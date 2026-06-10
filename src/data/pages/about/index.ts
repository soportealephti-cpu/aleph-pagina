import type { PageContent } from '../../../types';
import { acreditacionesPage } from './acreditaciones';
import { compromisoPage } from './compromiso';
import { confidencialidadPage } from './confidencialidad';
import { honestidadPage } from './honestidad';
import { nosotrosPage } from './nosotros';
import { orientacionServicioPage } from './orientacionServicio';
import { politicaCalidadPage } from './politicaCalidad';
import { presentacionPage } from './presentacion';

export const aboutPages: Record<string, PageContent> = {
  '/nosotros/': nosotrosPage,
  '/presentacion/': presentacionPage,
  '/politica-de-calidad/': politicaCalidadPage,
  '/orientacion-al-servicio-con-calidad/': orientacionServicioPage,
  '/honestidad/': honestidadPage,
  '/confidencialidad-e-imparcialidad/': confidencialidadPage,
  '/compromiso/': compromisoPage,
  '/acreditaciones/': acreditacionesPage,
};
