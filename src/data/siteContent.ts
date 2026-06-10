import type { PageContent } from '../types';
import { heroSlides, menuItems, officeAddress, topEmail, topPhones } from './navigation';
import { team } from './home';
import { aboutPages } from './pages/about';
import { contactPages } from './pages/contact';
import { laboratoryPages } from './pages/laboratories';
import { miscPages } from './pages/misc';
import { servicePages } from './pages/services';

export { heroSlides, menuItems, officeAddress, team, topEmail, topPhones };

export const pageContent: Record<string, PageContent> = {
  ...aboutPages,
  ...laboratoryPages,
  ...servicePages,
  ...contactPages,
  ...miscPages,
};

export function normalizePath(pathname: string) {
  if (!pathname || pathname === '') {
    return '/';
  }

  const clean = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return clean === '//' ? '/' : clean.toLowerCase();
}
