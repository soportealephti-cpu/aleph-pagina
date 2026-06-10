import type { PageContent } from '../../../types';
import { productosPage } from './productos';
import { proyectosPage } from './proyectos';

export const miscPages: Record<string, PageContent> = {
  '/productos/': productosPage,
  '/proyectos/': proyectosPage,
};
