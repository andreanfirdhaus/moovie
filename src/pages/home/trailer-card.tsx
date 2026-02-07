import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { Trailer } from './hooks/useTrailers';

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
            <div className='relative w-full aspect-video rounded-lg overflow-hidden bg-zinc-800'>
                <img
                    src={thumbnailUrl}
                    alt={trailer.name}
                    className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
                />

                <div
                    className='absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center'
                    onClick={handlePlayClick}>
                    <Play className='size-6 sm:size-10 text-zinc-200 fill-zinc-200' />
                </div>
            </div>
            <Link
                to={`/${trailer.mediaType}/detail/${trailer.movieId}`}
                className='mt-2 text-sm sm:text-base font-medium text-zinc-200 line-clamp-2 group-hover:text-white transition-colors'>
                {trailer.movieTitle}
            </Link>
            <p className='text-xs sm:text-sm text-zinc-400 mt-1 line-clamp-1'>{trailer.name}</p>
        </div>
    );
};
