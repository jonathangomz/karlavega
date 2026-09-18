/**
 * Language-independent details: who the artist is and how to reach them.
 * All translatable text lives in src/i18n/ui.ts.
 */
export const site = {
  /** Shown in the header (logo) and used in page titles. */
  name: 'Karla Vega',
  logo: 'KARLA VEGA',
  /** The mark shown beside the name in the header and in the footer.
   *  File lives in `public/`; set to '' to show the name on its own. */
  mark: '/logo.png',
  markWidth: 362,
  markHeight: 346,

  /** Contact page. */
  email: 'karlavegaya@gmail.com',

  /** About page portrait: the file lives in `public/`.
   *  Set to '' to fall back to a placehold.co placeholder.
   *  Keep `portraitWidth`/`portraitHeight` in step with the real image so the
   *  browser reserves the right space while it loads. */
  portrait: '/karla-vega.jpg',
  portraitWidth: 1400,
  portraitHeight: 2100,

  /** Footer and contact page. */
  social: [
    { label: 'Instagram', href: 'https://instagram.com/karlavvega__' },
    { label: 'Substack', href: 'https://substack.com/@karlavvega' },
  ],

  /** Navigation — order matters. `key` is looked up in src/i18n/ui.ts. */
  nav: [
    { key: 'nav.works', href: '/works' },
    { key: 'nav.about', href: '/about' },
    { key: 'nav.cv', href: '/cv' },
    { key: 'nav.contact', href: '/contact' },
  ],
} as const;

export const WORKS_PER_PAGE = 9;
