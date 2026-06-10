export type MenuChild = {
  label: string;
  href: string;
  children?: MenuChild[];
};

export type MenuItem = {
  label: string;
  href: string;
  children?: MenuChild[];
};

export type HeroSlide = {
  image: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
};

export type PageSection = {
  title?: string;
  paragraphs?: string[];
  bullets?: string[];
  image?: string;
  video?: string;
  links?: MenuChild[];
  table?: Array<{ label: string; code: string }>;
};

export type PageContent = {
  overline: string;
  title: string;
  intro?: string;
  image?: string;
  sections: PageSection[];
};
