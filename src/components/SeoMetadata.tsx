import { useEffect } from 'react';
import { menuItems, topEmail, topPhones } from '../data/navigation';
import { pageContent } from '../data/siteContent';
import type { MenuChild, MenuItem } from '../types';

const SITE_NAME = 'Aleph Group y Asociados';
const SITE_URL = 'https://www.alephsac.com';
const DEFAULT_DESCRIPTION =
  'Soluciones especializadas en protección radiológica, dosimetría, calibración e instrumentación nuclear para industria, minería, medicina y medioambiente en Perú.';
const DEFAULT_IMAGE = `${SITE_URL}/legacy/banner5-scaled.jpg`;
const ORGANIZATION_ID = `${SITE_URL}/#organization`;

const legacyCanonicalPaths: Record<string, string> = {
  '/calibraciones-dosimetricas/': '/servicios/calibraciones-dosimetricas/',
  '/dosimetria-individual-tld/': '/servicios/dosimetria-individual-externa/',
  '/prueba-de-hermeticidad-2/': '/servicios/prueba-de-hermeticidad/',
  '/mapeo-tasa-dosis/': '/servicios/mapeo-de-tasa-de-dosis/',
  '/mantenimiento-de-medidores-nucleares/': '/servicios/mantenimiento-preventivo-y-calibracion-a-densimetros/',
  '/almacenamieno-gestion-desechos-radiactivos/': '/servicios/almacenamiento-y-gestion-de-desechos-radiactivos/',
  '/monitoreo-ambiental-2/': '/servicios/monitoreo-ambiental/',
  '/asesoria-proteccion-radiologica/': '/servicios/asesoria-en-proteccion-radiologica/',
  '/transporte-de-material-radiactivo-2/': '/servicios/transporte-de-material-radiactivo/',
};

type NavigationEntry = MenuItem | MenuChild;

const routeDescriptions: Record<string, string> = {
  '/': DEFAULT_DESCRIPTION,
  '/servicios/': 'Servicios de protección radiológica, dosimetría, calibración, monitoreo, capacitación y gestión de materiales radiactivos en Perú.',
  '/productos/': 'Blindajes, detectores, equipos de medición e instrumentos para protección radiológica en aplicaciones industriales y médicas.',
  '/laboratorios/': 'Laboratorios especializados en dosimetría, radioquímica, radiometría ambiental, metrología, calibración e instrumentación nuclear.',
  '/nosotros/': 'Conoce a Aleph Group y Asociados, empresa peruana especializada en aplicaciones seguras de las radiaciones ionizantes.',
  '/contactenos/': 'Contacta a Aleph Group y Asociados en San Miguel, Lima, para solicitar información, asesoría o una cotización.',
  '/proyectos/': 'Proyectos de investigación, desarrollo e innovación de Aleph Group y Asociados en tecnología y protección radiológica.',
  '/servicios/calibraciones-dosimetricas/': 'Calibración dosimétrica de monitores y detectores de radiación para obtener mediciones confiables y trazables en Perú.',
  '/servicios/dosimetria-individual-externa/': 'Dosimetría individual externa para evaluar la exposición ocupacional a radiación ionizante con dosímetros personales.',
  '/servicios/prueba-de-hermeticidad/': 'Pruebas de hermeticidad y fuga para fuentes selladas de radiación ionizante, con análisis especializado en laboratorio.',
  '/servicios/mapeo-de-tasa-de-dosis/': 'Mapeo de tasa de dosis y monitoreo de radiación en instalaciones industriales, médicas y mineras.',
  '/servicios/mantenimiento-preventivo-y-calibracion-a-densimetros/': 'Mantenimiento preventivo, verificación y calibración de densímetros y medidores nucleares para una operación segura.',
  '/servicios/almacenamiento-y-gestion-de-desechos-radiactivos/': 'Almacenamiento, recolección, acondicionamiento y gestión segura de fuentes y desechos radiactivos en Perú.',
  '/servicios/monitoreo-ambiental/': 'Monitoreo radiológico ambiental para determinar y controlar niveles de radiactividad en aire, agua, suelo e instalaciones.',
  '/servicios/consultoria-especializada/': 'Consultoría especializada para el cumplimiento normativo, la seguridad radiológica y el uso responsable de radiaciones ionizantes.',
  '/servicios/direccion-de-capacitacion-nuclear/': 'Cursos y capacitación nuclear en protección radiológica, radiodiagnóstico y tecnologías radiológicas para profesionales.',
  '/servicios/asesoria-en-proteccion-radiologica/': 'Asesoría en protección radiológica, licenciamiento, seguridad y cumplimiento de requisitos aplicables ante el IPEN.',
  '/servicios/control-de-calidad-en-rx/': 'Control de calidad de equipos de rayos X para verificar su desempeño, seguridad y calidad de imagen en radiodiagnóstico.',
  '/servicios/transporte-de-material-radiactivo/': 'Transporte autorizado de material y residuos radiactivos con planificación de seguridad física y respuesta ante emergencias.',
};

const routeTitles: Record<string, string> = {
  '/libro-de-reclamaciones/': 'Libro de reclamaciones',
};

function flattenEntries(entries: NavigationEntry[]): NavigationEntry[] {
  return entries.flatMap((entry) => [entry, ...flattenEntries(entry.children ?? [])]);
}

function findSection(label: string) {
  return menuItems.find((item) => item.label === label)?.children ?? [];
}

const allEntries = flattenEntries(menuItems);
const commercialEntries = flattenEntries([
  ...findSection('SERVICIOS'),
  ...findSection('PRODUCTOS'),
]);

export const commercialKeywords = commercialEntries.map((entry) =>
  entry.label.toLocaleLowerCase('es-PE'),
);

function findEntryByPath(pathname: string) {
  return allEntries.find((entry) => entry.href === pathname);
}

function findNavigationTrail(pathname: string, entries: NavigationEntry[] = menuItems, trail: NavigationEntry[] = []): NavigationEntry[] {
  for (const entry of entries) {
    const nextTrail = [...trail, entry];
    if (entry.href === pathname) return nextTrail;
    const childTrail = findNavigationTrail(pathname, entry.children ?? [], nextTrail);
    if (childTrail.length) return childTrail;
  }
  return [];
}

function toDisplayCase(value: string) {
  return value
    .toLocaleLowerCase('es-PE')
    .replace(/(^|\s)\p{L}/gu, (letter) => letter.toLocaleUpperCase('es-PE'));
}

function setMeta(name: string, content: string, attribute: 'name' | 'property' = 'name') {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  element.content = content;
}

function setLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`;
  let element = document.head.querySelector<HTMLLinkElement>(selector);
  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    if (hreflang) element.hreflang = hreflang;
    document.head.appendChild(element);
  }
  element.href = href;
}

function setStructuredData(data: object) {
  const id = 'aleph-structured-data';
  let element = document.head.querySelector<HTMLScriptElement>(`#${id}`);
  if (!element) {
    element = document.createElement('script');
    element.id = id;
    element.type = 'application/ld+json';
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(data);
}

function buildStructuredData(pathname: string, title: string, description: string, canonicalUrl: string) {
  const trail = findNavigationTrail(pathname).filter((item, index, items) =>
    index === items.findIndex((candidate) => candidate.href === item.href),
  );
  const graph: object[] = [
    {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': ORGANIZATION_ID,
      name: SITE_NAME,
      alternateName: 'Aleph SAC',
      url: SITE_URL,
      logo: `${SITE_URL}/legacy/azul-1.png`,
      image: DEFAULT_IMAGE,
      email: topEmail,
      telephone: topPhones[0],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Av. Rafael Escardó 154',
        addressLocality: 'San Miguel',
        addressRegion: 'Lima',
        postalCode: '15087',
        addressCountry: 'PE',
      },
      geo: { '@type': 'GeoCoordinates', latitude: -12.0822565, longitude: -77.0961764 },
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '13:00' },
      ],
      areaServed: { '@type': 'Country', name: 'Perú' },
      sameAs: [
        'https://es-la.facebook.com/AlephGroupSAC/',
        'https://twitter.com/alephgroup',
        'https://pe.linkedin.com/company/aleph-group-asociados',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      alternateName: ['Aleph Group', 'Aleph SAC'],
      inLanguage: 'es-PE',
      publisher: { '@id': ORGANIZATION_ID },
    },
    {
      '@type': pathname === '/productos/' || pathname === '/servicios/' ? 'CollectionPage' : 'WebPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: title,
      description,
      inLanguage: 'es-PE',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': ORGANIZATION_ID },
    },
  ];

  if (pathname.startsWith('/servicios/') && pathname !== '/servicios/') {
    graph.push({
      '@type': 'Service',
      '@id': `${canonicalUrl}#service`,
      name: title.split(' | ')[0],
      description,
      url: canonicalUrl,
      provider: { '@id': ORGANIZATION_ID },
      areaServed: { '@type': 'Country', name: 'Perú' },
      serviceType: title.split(' | ')[0],
    });
  }

  if (pathname === '/servicios/' || pathname === '/productos/') {
    const prefix = pathname === '/servicios/' ? '/servicios/' : '/productos/';
    const entries = commercialEntries.filter((entry, index, items) =>
      entry.href.startsWith(prefix) && index === items.findIndex((candidate) => candidate.label === entry.label),
    );
    graph.push({
      '@type': 'ItemList',
      '@id': `${canonicalUrl}#itemlist`,
      name: pathname === '/servicios/' ? 'Servicios de Aleph Group' : 'Productos de Aleph Group',
      numberOfItems: entries.length,
      itemListElement: entries.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: toDisplayCase(item.label),
        url: `${SITE_URL}${item.href}`,
      })),
    });
  }

  if (pathname !== '/') {
    const items = [
      { name: 'Inicio', url: `${SITE_URL}/` },
      ...trail.map((item) => ({ name: toDisplayCase(item.label), url: `${SITE_URL}${item.href}` })),
    ].filter((item, index, items) => index === items.findIndex((candidate) => candidate.url === item.url));
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${canonicalUrl}#breadcrumb`,
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

export function SeoMetadata({ pathname }: { pathname: string }) {
  useEffect(() => {
    const canonicalPath = legacyCanonicalPaths[pathname] ?? pathname;
    const entry = findEntryByPath(canonicalPath);
    const content = pageContent[canonicalPath];
    const isKnownPage = canonicalPath === '/' || Boolean(entry) || Boolean(content) || canonicalPath === '/libro-de-reclamaciones/';
    const pageName = routeTitles[canonicalPath] ?? (entry
      ? toDisplayCase(entry.label)
      : content?.title ?? (canonicalPath === '/' ? SITE_NAME : 'Página no encontrada'));
    const title = canonicalPath === '/'
      ? 'Aleph Group | Protección radiológica y dosimetría en Perú'
      : `${pageName} | Aleph Group`;
    const description = routeDescriptions[canonicalPath] ?? content?.intro ?? (entry
      ? `${pageName} de Aleph Group y Asociados. Servicio especializado en protección radiológica y tecnología nuclear en Perú.`
      : DEFAULT_DESCRIPTION);
    const routeKeywords = entry ? [entry.label.toLocaleLowerCase('es-PE')] : [];
    const keywords = [...new Set([...routeKeywords, ...commercialKeywords])].join(', ');
    const canonicalUrl = `${SITE_URL}${canonicalPath}`;

    document.title = title;
    setMeta('description', description);
    setMeta('keywords', keywords);
    setMeta('robots', isKnownPage ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' : 'noindex, nofollow');
    setMeta('googlebot', isKnownPage ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' : 'noindex, nofollow');
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:type', 'website', 'property');
    setMeta('og:url', canonicalUrl, 'property');
    setMeta('og:site_name', SITE_NAME, 'property');
    setMeta('og:locale', 'es_PE', 'property');
    setMeta('og:image', DEFAULT_IMAGE, 'property');
    setMeta('og:image:alt', 'Aleph Group y Asociados - protección radiológica', 'property');
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', DEFAULT_IMAGE);
    setLink('canonical', canonicalUrl);
    setLink('alternate', canonicalUrl, 'es-PE');
    setStructuredData(buildStructuredData(canonicalPath, title, description, canonicalUrl));
  }, [pathname]);

  return null;
}
