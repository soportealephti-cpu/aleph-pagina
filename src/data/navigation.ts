import type { HeroSlide, MenuItem } from '../types';

export const topPhones = ['+51 960 549 465', '+51 960 617 157', '+51 984 123 230'];
export const topEmail = 'informes@alephsac.com';
export const officeAddress = 'Av. Rafael Escardo 154, San Miguel 15087, Lima';

export const heroSlides: HeroSlide[] = [
  {
    image: '/legacy/3.png',
    eyebrow: 'Contamos con',
    title: 'Profesionales nucleares altamente capacitados',
    description: 'Autorizados por el Instituto Peruano de Energia Nuclear.',
    href: '/presentacion/',
  },
  {
    image: '/legacy/banner5-scaled.jpg',
    eyebrow: 'Suministro de equipos e',
    title: 'Instrumentos de proteccion radiologica',
    description: 'Con garantia de nuestros laboratorios de calibraciones dosimetricas.',
    href: '/laboratorio-de-calibracion-dosimetrica/',
  },
  {
    image: '/legacy/banner4-scaled.jpg',
    eyebrow: 'Realizamos',
    title: 'Muestreo y analisis radiologico',
    description: 'Calibracion y ensayos.',
    href: '/radioquimica-y-radiometria-ambiental/',
  },
  {
    image: '/legacy/banner3-scaled.jpg',
    eyebrow: 'Efectuamos',
    title: 'Consultoria, capacitacion y asesoria en seguridad radiologica',
    description: 'Servicios especializados para mineria, industria, medioambiente y medicina.',
    href: '/servicios/',
  },
];

export const menuItems: MenuItem[] = [
  { label: 'INICIO', href: '/' },
  {
    label: 'NOSOTROS',
    href: '/nosotros/',
    children: [
      { label: 'PRESENTACION', href: '/presentacion/' },
      { label: 'POLITICA DE CALIDAD', href: '/politica-de-calidad/' },
      { label: 'ACREDITACIONES', href: '/acreditaciones/' },
    ],
  },
  {
    label: 'LABORATORIOS',
    href: '/laboratorios/',
    children: [
      { label: 'DOSIMETRIA PERSONAL Y AMBIENTAL', href: '/dosimetria-personal-y-ambiental/' },
      {
        label: 'RADIOQUIMICA Y RADIOMETRIA AMBIENTAL',
        href: '/radioquimica-y-radiometria-ambiental/',
      },
      { label: 'METROLOGIA Y CONTROL DE CALIDAD', href: '/metrologia-y-control-de-calidad/' },
      {
        label: 'CALIBRACION DOSIMETRICA',
        href: '/laboratorio-de-calibracion-dosimetrica/',
      },
      { label: 'INSTRUMENTACION NUCLEAR Y RADON', href: '/instrumentacion-nuclear-y-radon/' },
    ],
  },
  { label: 'I+D+i', href: '/proyectos/' },
  {
    label: 'SERVICIOS',
    href: '/servicios/',
    children: [
      { label: 'CALIBRACIONES DOSIMETRICAS', href: '/servicios/calibraciones-dosimetricas/' },
      { label: 'DOSIMETRIA INDIVIDUAL EXTERNA', href: '/servicios/dosimetria-individual-externa/' },
      { label: 'PRUEBA DE HERMETICIDAD', href: '/servicios/prueba-de-hermeticidad/' },
      { label: 'MAPEO DE TASA DE DOSIS', href: '/servicios/mapeo-de-tasa-de-dosis/' },
      {
        label: 'MANTENIMIENTO PREVENTIVO Y CALIBRACION A DENSIMETROS',
        href: '/servicios/mantenimiento-preventivo-y-calibracion-a-densimetros/',
      },
      {
        label: 'ALMACENAMIENTO Y GESTION DE DESECHOS RADIACTIVOS',
        href: '/servicios/almacenamiento-y-gestion-de-desechos-radiactivos/',
      },
      { label: 'MONITOREO AMBIENTAL', href: '/servicios/monitoreo-ambiental/' },
      {
        label: 'CONSULTORIA ESPECIALIZADA',
        href: '/servicios/consultoria-especializada/',
        children: [
          {
            label: 'DIRECCION DE CAPACITACION NUCLEAR',
            href: '/servicios/direccion-de-capacitacion-nuclear/',
          },
          {
            label: 'ASESORIA EN PROTECCION RADIOLOGICA',
            href: '/servicios/asesoria-en-proteccion-radiologica/',
          },
        ],
      },
      { label: 'CONTROL DE CALIDAD EN RX', href: '/servicios/control-de-calidad-en-rx/' },
      {
        label: 'TRANSPORTE DE MATERIAL RADIACTIVO',
        href: '/servicios/transporte-de-material-radiactivo/',
      },
    ],
  },
  {
    label: 'PRODUCTOS',
    href: '/productos/',
    children: [
      {
        label: 'BLINDAJE PARA LA PROTECCION RADIOLOGICA',
        href: '/productos/',
      },
      {
        label: 'EQUIPOS DE MEDICION E INSTRUMENTOS PARA LA PROTECCION RADIOLOGICA',
        href: '/productos/',
      },
    ],
  },
  {
    label: 'CONTACTO',
    href: '/contactenos/',
    children: [
      { label: 'CONTACTENOS', href: '/contactenos/' },
      { label: 'SOLICITUD DE QUEJAS', href: '/solicitud-de-quejas/' },
      { label: 'FLUJOGRAMA DE QUEJAS', href: '/flujograma-de-quejas/' },
    ],
  },
];
