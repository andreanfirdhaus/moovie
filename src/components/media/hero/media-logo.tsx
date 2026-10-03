/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMediaImages } from '@/features/home/hooks/useMovieImages.query';
import { getMediaTitle, getMediaType } from '@/utils/media';
import { TMDB_IMG_500 } from '@/config/images';

interface MediaLogoProps {
    movie: any;
    logoUrl?: string | null;
    title?: string;
}

export const MediaLogo = ({ movie }: MediaLogoProps) => {
    const mediaType = getMediaType(movie);
    const { data } = useMediaImages(movie?.id, mediaType);

    const logos = (data as any)?.logos || [];
    const chosen = logos.find((logo: any) => logo.iso_639_1 === 'en') || logos[0];
    const logoUrl = chosen ? TMDB_IMG_500 + chosen.file_path : undefined;
    const title = getMediaTitle(movie);

    if (!logoUrl) {
        return (
            <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground drop-shadow-md max-w-2xl text-pretty'>
                {title}
            </h1>
        );
    }

    return (
        <img
            src={logoUrl}
            alt={title}
            className='h-auto w-auto max-h-16 lg:max-h-24 xl:max-h-28 object-contain drop-shadow-md'
            loading='lazy'
            draggable={false}
        />
    );
};
