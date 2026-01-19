import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Movie } from '@/types/tmdb/movie';
import { TMDB_IMG_300, FALLBACK_POSTER } from '@/utils/tmdb-image';
import { getMovieTitle, getReleaseYear } from '@/utils/tmdb-helpers';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface CardProps {
    type: Movie;
    delayTime?: number;
    scaleOnHover?: number;
}

export default function Card({ type, delayTime = 300, scaleOnHover = 1.05 }: CardProps) {
    return (
        <div className='mx-0.5'>
            <motion.div
                whileHover={{ scale: scaleOnHover }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
                <LazyLoadImage
                    effect='blur'
                    src={type.poster_path ? TMDB_IMG_300 + type.poster_path : FALLBACK_POSTER}
                    alt={`${getMovieTitle(type)} poster`}
                    className='bg-contain bg-center rounded-md sm:rounded-lg w-full'
                    delayTime={delayTime}
                />
            </motion.div>
            <div className='mt-1.5 sm:mt-2'>
                <p className='text-zinc-200 font-semibold text-sm truncate'>{getMovieTitle(type)}</p>
                {getReleaseYear(type) && (
                    <span className='text-zinc-400 text-sm font-medium'>{getReleaseYear(type)}</span>
                )}
            </div>
        </div>
    );
}
