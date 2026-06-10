import { PageHero } from '../components/PageHero';
import { PageSections } from '../components/PageSections';
import type { PageContent } from '../types';

export function ContentPage({ content }: { content: PageContent }) {
  return (
    <>
      <PageHero content={content} />
      <PageSections content={content} />
    </>
  );
}
