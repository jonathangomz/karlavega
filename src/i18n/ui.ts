/**
 * All localized text for the site.
 * English is the default; Spanish lives under `/es/...`.
 * Language-independent data (name, email, social links) is in src/data/site.ts.
 */
export const languages = {
  en: 'EN',
  es: 'ES',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';
export const langCodes = Object.keys(languages) as Lang[];

export const ui = {
  en: {
    'site.tagline': 'Visual artist',

    'nav.works': 'Works',
    'nav.about': 'About',
    'nav.cv': 'CV',
    'nav.contact': 'Contact',
    'nav.language': 'Language',

    'home.recent': 'Recent works',
    'home.viewAll': 'View all works',

    'works.title': 'Works',
    'works.empty': 'New work will be published here soon.',
    'work.medium': 'Medium',
    'work.size': 'Size',
    'work.year': 'Year',
    'work.summary': 'Summary',
    'work.back': 'Back to works',

    'pagination.label': 'Pagination',
    'pagination.prev': 'Previous',
    'pagination.next': 'Next',

    'about.title': 'About',
    'about.portraitAlt': 'Portrait of the artist',
    'about.bio': [
      'Karla Vega draws on a deeply human sensibility, rooted in the constant transformation that has shaped her life from an early age. Taking art as a way to embrace transition and cultivate empathy, she explores the emotional complexity of being human. Through her work, the artist seeks to create physical and symbolic spaces that become refuges, where the viewer can confront, recognise and honour their own inner world.',
    ],

    'cv.title': 'CV',
    'cv.empty': 'The CV will be published here soon.',
    'cv.solo': 'Solo exhibitions',
    'cv.group': 'Group exhibitions',
    'cv.residencies': 'Residencies',
    'cv.education': 'Education',
    'cv.recognition': 'Recognition',
    'cv.experience': 'Experience',

    'contact.title': 'Contact',
    'contact.intro':
      'For enquiries about available works, exhibitions or commissions, please get in touch by email.',
  },
  es: {
    'site.tagline': 'Artista visual',

    'nav.works': 'Obra',
    'nav.about': 'Sobre mí',
    'nav.cv': 'CV',
    'nav.contact': 'Contacto',
    'nav.language': 'Idioma',

    'home.recent': 'Obras recientes',
    'home.viewAll': 'Ver toda la obra',

    'works.title': 'Obra',
    'works.empty': 'Pronto se publicará obra nueva aquí.',
    'work.medium': 'Técnica',
    'work.size': 'Medidas',
    'work.year': 'Año',
    'work.summary': 'Descripción',
    'work.back': 'Volver a la obra',

    'pagination.label': 'Paginación',
    'pagination.prev': 'Anterior',
    'pagination.next': 'Siguiente',

    'about.title': 'Sobre mí',
    'about.portraitAlt': 'Retrato de la artista',
    'about.bio': [
      'Karla Vega nutre su obra de una sensibilidad profundamente humana, arraigada en la transformación constante que ha definido su vida desde temprana edad. Tomando el arte como una vía para abrazar la transición y cultivar la empatía, explora la complejidad emocional del ser humano. A través de sus obras, la artista busca crear espacios físicos y simbólicos que se conviertan en refugios, en los cuales el espectador pueda confrontar, reconocer y honrar su propio mundo interior.',
    ],

    'cv.title': 'CV',
    'cv.empty': 'El CV se publicará aquí próximamente.',
    'cv.solo': 'Exposiciones individuales',
    'cv.group': 'Exposiciones colectivas',
    'cv.residencies': 'Residencias',
    'cv.education': 'Formación',
    'cv.recognition': 'Reconocimientos',
    'cv.experience': 'Experiencia profesional',

    'contact.title': 'Contacto',
    'contact.intro':
      'Para consultas sobre obra disponible, exposiciones o encargos, escríbeme por correo electrónico.',
  },
} as const;

type UiKey = keyof (typeof ui)[typeof defaultLang];

/**
 * The site may be deployed under a subpath (e.g. GitHub Pages project sites:
 * `/karlavega/`) or at the root of a custom domain. `import.meta.env.BASE_URL`
 * carries whichever is configured in astro.config.mjs, so every internal URL
 * is built through these two helpers instead of being hand-written.
 */
function currentBase(): string {
  return import.meta.env.BASE_URL.replace(/\/$/, '');
}

/** `/works` → `/karlavega/works` (or `/works` unchanged with no base configured). */
export function withBase(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${currentBase()}${clean}`;
}

/** The inverse of `withBase` — strips the deployment base off a pathname. */
function withoutBase(pathname: string): string {
  const base = currentBase();
  if (!base || !pathname.startsWith(base)) return pathname;
  const rest = pathname.slice(base.length);
  return rest.startsWith('/') ? rest : `/${rest}`;
}

/** Returns a `t(key)` bound to one language, falling back to English. */
export function useTranslations(lang: Lang) {
  return function t<K extends UiKey>(key: K): (typeof ui)[typeof defaultLang][K] {
    const dict = ui[lang] as (typeof ui)[typeof defaultLang];
    return (dict[key] ?? ui[defaultLang][key]) as (typeof ui)[typeof defaultLang][K];
  };
}

/** `undefined` (the `[...lang]` param on English routes) resolves to `en`. */
export function toLang(value: string | undefined): Lang {
  return langCodes.includes(value as Lang) ? (value as Lang) : defaultLang;
}

/** Reads the language out of a pathname, e.g. `/es/works` → `es`. */
export function getLangFromUrl(url: URL): Lang {
  const [, first] = withoutBase(url.pathname).split('/');
  return toLang(first);
}

/** `/works` + `es` → `/es/works` (or `/karlavega/es/works` under a base path). */
export function localizePath(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const localized = lang === defaultLang ? clean : clean === '/' ? `/${lang}` : `/${lang}${clean}`;
  return withBase(localized);
}

/**
 * `/es/works/2` → `/works/2`, so a path can be re-prefixed for another
 * language. Pass `Astro.url.pathname` directly — the deployment base (if any)
 * is stripped first.
 */
export function stripLang(pathname: string): string {
  const segments = withoutBase(pathname).split('/').filter(Boolean);
  if (langCodes.includes(segments[0] as Lang) && segments[0] !== defaultLang) {
    segments.shift();
  }
  const path = `/${segments.join('/')}`;
  // Drop the trailing slash Astro adds, but keep the root as "/".
  return path.length > 1 ? path.replace(/\/$/, '') : '/';
}

/**
 * The `[...lang]` param for each language: `undefined` for English (so the
 * route has no prefix) and `'es'` for Spanish. Used by every page's
 * `getStaticPaths`.
 */
export function langParams(): { lang: string | undefined }[] {
  return langCodes.map((code) => ({ lang: code === defaultLang ? undefined : code }));
}
