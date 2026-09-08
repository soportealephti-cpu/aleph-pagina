import type { ComponentType } from 'react';
import { AulaVirtualPage } from './routes/AulaVirtualPage';
import { AcreditacionesPage } from './routes/about/AcreditacionesPage';
import { NosotrosPage } from './routes/about/NosotrosPage';
import { PoliticaCalidadPage } from './routes/about/PoliticaCalidadPage';
import { PresentacionPage } from './routes/about/PresentacionPage';
import { ContactenosPage } from './routes/contact/ContactenosPage';
import { ContactoPage } from './routes/contact/ContactoPage';
import { FlujogramaQuejasPage } from './routes/contact/FlujogramaQuejasPage';
import { LibroReclamacionesPage } from './routes/contact/LibroReclamacionesPage';
import { SolicitudQuejasPage } from './routes/contact/SolicitudQuejasPage';
import { CalibracionDosimetricaPage } from './routes/laboratories/CalibracionDosimetricaPage';
import { DosimetriaPersonalPage } from './routes/laboratories/DosimetriaPersonalPage';
import { InstrumentacionRadonPage } from './routes/laboratories/InstrumentacionRadonPage';
import { LaboratoriosPage } from './routes/laboratories/LaboratoriosPage';
import { MetrologiaPage } from './routes/laboratories/MetrologiaPage';
import { RadioquimicaPage } from './routes/laboratories/RadioquimicaPage';
import { ProductosPage } from './routes/misc/ProductosPage';
import { ProyectosPage } from './routes/misc/ProyectosPage';
import { AlmacenamientoDesechosPage } from './routes/services/AlmacenamientoDesechosPage';
import { AsesoriaProteccionRadiologicaPage } from './routes/services/AsesoriaProteccionRadiologicaPage';
import { CalibracionesDosimetricasPage } from './routes/services/CalibracionesDosimetricasPage';
import { ConsultoriaEspecializadaPage } from './routes/services/ConsultoriaEspecializadaPage';
import { ControlCalidadRxPage } from './routes/services/ControlCalidadRxPage';
import { DireccionCapacitacionNuclearPage } from './routes/services/DireccionCapacitacionNuclearPage';
import { DosimetriaIndividualPage } from './routes/services/DosimetriaIndividualPage';
import { MantenimientoCalibracionPage } from './routes/services/MantenimientoCalibracionPage';
import { MapeoTasaDosisPage } from './routes/services/MapeoTasaDosisPage';
import { MonitoreoAmbientalPage } from './routes/services/MonitoreoAmbientalPage';
import { PruebaHermeticidadPage } from './routes/services/PruebaHermeticidadPage';
import { ServiciosPage } from './routes/services/ServiciosPage';
import { TransporteMaterialPage } from './routes/services/TransporteMaterialPage';

export const routeRegistry: Record<string, ComponentType> = {
  '/aula-virtual/': AulaVirtualPage,
  '/nosotros/': NosotrosPage,
  '/presentacion/': PresentacionPage,
  '/politica-de-calidad/': PoliticaCalidadPage,
  '/acreditaciones/': AcreditacionesPage,
  '/laboratorios/': LaboratoriosPage,
  '/dosimetria-personal-y-ambiental/': DosimetriaPersonalPage,
  '/radioquimica-y-radiometria-ambiental/': RadioquimicaPage,
  '/metrologia-y-control-de-calidad/': MetrologiaPage,
  '/laboratorio-de-calibracion-dosimetrica/': CalibracionDosimetricaPage,
  '/instrumentacion-nuclear-y-radon/': InstrumentacionRadonPage,
  '/servicios/': ServiciosPage,
  '/servicios/calibraciones-dosimetricas/': CalibracionesDosimetricasPage,
  '/servicios/dosimetria-individual-externa/': DosimetriaIndividualPage,
  '/servicios/prueba-de-hermeticidad/': PruebaHermeticidadPage,
  '/servicios/mapeo-de-tasa-de-dosis/': MapeoTasaDosisPage,
  '/servicios/mantenimiento-y-calibracion/': MantenimientoCalibracionPage,
  '/servicios/mantenimiento-preventivo-y-calibracion-a-densimetros/': MantenimientoCalibracionPage,
  '/servicios/almacenamiento-y-gestion-de-desechos-radiactivos/': AlmacenamientoDesechosPage,
  '/servicios/monitoreo-ambiental/': MonitoreoAmbientalPage,
  '/servicios/consultoria-especializada/': ConsultoriaEspecializadaPage,
  '/servicios/direccion-de-capacitacion-nuclear/': DireccionCapacitacionNuclearPage,
  '/servicios/asesoria-en-proteccion-radiologica/': AsesoriaProteccionRadiologicaPage,
  '/servicios/control-de-calidad-en-rx/': ControlCalidadRxPage,
  '/servicios/transporte-de-material-radiactivo/': TransporteMaterialPage,
  // Compatibilidad con URLs históricas que Google aún tiene indexadas.
  '/calibraciones-dosimetricas/': CalibracionesDosimetricasPage,
  '/dosimetria-individual-tld/': DosimetriaIndividualPage,
  '/prueba-de-hermeticidad-2/': PruebaHermeticidadPage,
  '/mapeo-tasa-dosis/': MapeoTasaDosisPage,
  '/mantenimiento-de-medidores-nucleares/': MantenimientoCalibracionPage,
  '/almacenamieno-gestion-desechos-radiactivos/': AlmacenamientoDesechosPage,
  '/monitoreo-ambiental-2/': MonitoreoAmbientalPage,
  '/asesoria-proteccion-radiologica/': AsesoriaProteccionRadiologicaPage,
  '/transporte-de-material-radiactivo-2/': TransporteMaterialPage,
  '/contacto/': ContactoPage,
  '/contactenos/': ContactenosPage,
  '/libro-de-reclamaciones/': LibroReclamacionesPage,
  '/solicitud-de-quejas/': SolicitudQuejasPage,
  '/flujograma-de-quejas/': FlujogramaQuejasPage,
  '/productos/': ProductosPage,
  '/proyectos/': ProyectosPage,
};
