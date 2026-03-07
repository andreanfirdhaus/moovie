import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Movie } from '@/types/tmdb/movie';
import { TMDB_IMG_300, FALLBACK_POSTER } from '@/lib/tmdb-image';
import { getMovieTitle, getReleaseYear } from '@/lib/tmdb-helpers';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { MovieDetail } from '@/types/tmdb/movie-detail';

type Seasons = {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
};

interface CardProps {
    type: Movie | MovieDetail | Seasons;
}

export default function Card({ type }: CardProps) {
    return (
        <div className='mx-0.5'>
            <div className='relative w-full aspect-[2/3] overflow-hidden rounded-[6px] sm:rounded-[8px] bg-surface-2'>
                <motion.div
                    whileHover={{ scale: 1.06 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className='w-full h-full'>
                    <LazyLoadImage
                        src={type.poster_path ? TMDB_IMG_300 + type.poster_path : FALLBACK_POSTER}
                        alt={`${getMovieTitle(type)} poster`}
                        draggable={false}
                        effect='blur'
                        wrapperClassName='w-full h-full'
                        delayTime={300}
                        className='w-full h-full object-cover'
                    />
                </motion.div>
            </div>

            <div className='mt-1.5 sm:mt-2.5'>
                <p className='text-zinc-100 font-semibold text-base truncate mb-0.5 md:mb-1'>{getMovieTitle(type)}</p>

                {getReleaseYear(type) && (
                    <span className='text-zinc-400 text-sm font-medium'>{getReleaseYear(type)}</span>
                )}
            </div>
        </div>
    );
}
