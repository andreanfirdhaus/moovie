import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import type { Trailer } from '@/features/home/hooks/use-trailers';

interface TrailerCardProps {
    trailer: Trailer;
    onPlayClick?: (id: number, type: string) => void;
}

export const TrailerCard = ({ trailer, onPlayClick }: TrailerCardProps) => {
    const thumbnailUrl = `https://img.youtube.com/vi/${trailer.key}/hqdefault.jpg`;

    const handlePlayClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (onPlayClick) {
            onPlayClick(trailer.movieId, trailer.mediaType);
        }
    };

    return (
        <div className='group block'>
            <div className='relative w-full aspect-video rounded-lg overflow-hidden mb-3.5'>
                <img
                    src={thumbnailUrl}
                    alt={trailer.name}
                    className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
                />

                <div
                    className='absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center'
                    onClick={handlePlayClick}>
                    <Play className='size-6 sm:size-10 text-zinc-100 fill-gray-100 hover:cursor-pointer' />
                </div>
            </div>

            <Link
                to={`/${trailer.mediaType}/${trailer.movieId}`}
                className='text-sm sm:text-base font-semibold text-zinc-100 line-clamp-2 group-hover:text-white transition-colors mb-0.5'>
                {trailer.movieTitle}
            </Link>

            <p className='text-xs sm:text-sm text-zinc-400 font-medium line-clamp-1'>{trailer.name}</p>
        </div>
    );
};
