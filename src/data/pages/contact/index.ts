import type { PageContent } from '../../../types';
import { contactoPage } from './contacto';
import { contactenosPage } from './contactenos';
import { flujogramaQuejasPage } from './flujogramaQuejas';
import { solicitudQuejasPage } from './solicitudQuejas';

export const contactPages: Record<string, PageContent> = {
  '/contacto/': contactoPage,
  '/contactenos/': contactenosPage,
  '/solicitud-de-quejas/': solicitudQuejasPage,
  '/flujograma-de-quejas/': flujogramaQuejasPage,
};
