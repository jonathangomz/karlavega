import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLang, withBase, type Lang } from '../i18n/ui';

export type Work = CollectionEntry<'works'>;
export type CvEntry = CollectionEntry<'cv'>;

/**
 * Builds the image URL for a work.
 * If the frontmatter has no `image`, a placehold.co placeholder is generated
 * from the work's dimensions and title. Swap the body of this function to
 * change the placeholder service in one go.
 */
export function workImage(work: Work, lang: Lang = defaultLang): string {
  if (work.data.image) return withBase(work.data.image);
  const { imageWidth, imageHeight } = work.data;
  const text = encodeURIComponent(localizeWork(work, lang).title);
  return `https://placehold.co/${imageWidth}x${imageHeight}/efefef/1a1a1a?text=${text}`;
}

/** Portrait/other placeholders use the same service. */
export function placeholder(width: number, height: number, text: string): string {
  return `https://placehold.co/${width}x${height}/efefef/1a1a1a?text=${encodeURIComponent(text)}`;
}

/** All published works, newest first. */
export async function getWorks(): Promise<Work[]> {
  const works = await getCollection('works', ({ data }) => !data.draft);
  return works.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** All CV entries, newest first. */
export async function getCvEntries(): Promise<CvEntry[]> {
  const entries = await getCollection('cv');
  return entries.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** English fields with the `es:` block layered on top when viewing in Spanish. */
export function localizeWork(work: Work, lang: Lang) {
  const { title, medium, size, summary, es } = work.data;
  const t = lang === defaultLang ? undefined : es;
  return {
    title: t?.title ?? title,
    medium: t?.medium ?? medium,
    size: t?.size ?? size,
    summary: t?.summary ?? summary,
    year: work.data.year,
  };
}

export function localizeCvEntry(entry: CvEntry, lang: Lang) {
  const { title, venue, location, description, es } = entry.data;
  const t = lang === defaultLang ? undefined : es;
  return {
    title: t?.title ?? title,
    venue: t?.venue ?? venue,
    location: t?.location ?? location,
    description: t?.description ?? description,
    year: entry.data.year,
  };
}

/** "Oil on linen, 2024" */
export function workCaption(work: Work, lang: Lang): string {
  const { medium, year } = localizeWork(work, lang);
  return `${medium}, ${year}`;
}
