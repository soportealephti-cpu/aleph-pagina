import { menuItems } from '../data/siteContent';
import { PageHero } from '../components/PageHero';
import { PageSections } from '../components/PageSections';

export function FallbackPage() {
  const content = {
    overline: 'Pagina',
    title: 'Contenido en reconstruccion',
    intro:
      'Esta ruta aun no tiene su contenido final cargado desde el legado, pero ya conserva la estructura de navegacion del sitio anterior.',
    sections: [
      {
        links: menuItems.flatMap((item) => [item, ...(item.children ?? [])]).map((item) => ({
          label: item.label,
          href: item.href,
        })),
      },
    ],
  };

  return (
    <>
      <PageHero content={content} />
      <PageSections content={content} />
    </>
  );
}
