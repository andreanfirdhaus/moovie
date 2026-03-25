import { getMediaType } from '@/utils/media';

const toSlug = (text: string): string =>
    text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

export const getDetailUrl = (movie: any): string => {
    const type = getMediaType(movie);
    const id: number = movie.id;
    const slug = toSlug(movie.title || movie.name || '');
    return `/${type}/${id}-${slug}`;
};

export const parseDetailId = (idParam: string): string => idParam.split('-')[0];
