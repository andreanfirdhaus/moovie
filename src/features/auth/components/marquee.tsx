import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getBackdropUrl } from '@/utils/media';
import { getDetailUrl } from '@/utils/url';

type MarqueeProps = {
    movies: any[];
};

const COLUMN_COUNT = 4;

const COLUMN_DIRECTIONS = ['forward', 'reverse', 'forward', 'reverse'] as const;

const ROW_GAP = 14;
const COLUMN_GAP = 18;

const COLUMN_DURATIONS = [50, 58, 46, 54];

const BACKDROP_WIDTH = 250;
const BACKDROP_HEIGHT = 145;

const ITEMS_PER_COLUMN = 5;
const COPY_COUNT = 4;

export function Marquee({ movies }: MarqueeProps) {
    const items = movies.filter((movie) => movie.backdrop_path);

    if (!items.length) {
        return null;
    }

    const columns = Array.from({ length: COLUMN_COUNT }, (_, columnIndex) => {
        const columnItems = Array.from({ length: ITEMS_PER_COLUMN }, (_, itemIndex) => {
            const index = (itemIndex * COLUMN_COUNT + columnIndex) % items.length;

            return items[index];
        });

        return Array.from({ length: COPY_COUNT }, () => columnItems).flat();
    });

    return (
        <div className='absolute inset-0 overflow-hidden bg-black'>
            <div
                className='pointer-events-none absolute inset-[-30%] overflow-hidden'
                style={{
                    perspective: '1200px',
                }}>
                <div
                    className='absolute left-1/2 top-1/2 flex origin-center'
                    style={{
                        gap: `${COLUMN_GAP}px`,
                        transform: 'translate(-50%, -50%) rotateX(8deg) rotateZ(-10deg) rotateY(2deg)',
                        transformStyle: 'preserve-3d',
                    }}>
                    {columns.map((column, columnIndex) => {
                        const duration = COLUMN_DURATIONS[columnIndex % COLUMN_DURATIONS.length];
                        const direction = COLUMN_DIRECTIONS[columnIndex % COLUMN_DIRECTIONS.length];

                        return (
                            <div
                                key={columnIndex}
                                style={{ width: `${BACKDROP_WIDTH}px` }}
                                className='relative shrink-0'>
                                <motion.div
                                    animate={{ y: direction === 'forward' ? ['0%', '-25%'] : ['-25%', '0%'] }}
                                    transition={{ duration, ease: 'linear', repeat: Infinity }}
                                    style={{
                                        gap: `${ROW_GAP}px`,
                                        willChange: 'transform',
                                    }}
                                    className='flex flex-col'>
                                    {column.map((movie, itemIndex) => (
                                        <Link
                                            key={`${movie.id}-${columnIndex}-${itemIndex}`}
                                            to={getDetailUrl(movie)}
                                            aria-label={`View ${movie.title || movie.name}`}
                                            className='pointer-events-auto group relative z-10 block shrink-0 cursor-pointer'>
                                            <div
                                                className='relative overflow-hidden rounded-lg bg-zinc-900 shadow-2xl'
                                                style={{
                                                    width: `${BACKDROP_WIDTH}px`,
                                                    height: `${BACKDROP_HEIGHT}px`,
                                                }}>
                                                <img
                                                    src={getBackdropUrl(movie)}
                                                    alt=''
                                                    loading='lazy'
                                                    draggable='false'
                                                    className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                                                />

                                                <div className='pointer-events-none absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-transparent' />
                                                <div className='pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-border transition-all duration-300 group-hover:ring-primary' />
                                            </div>
                                        </Link>
                                    ))}
                                </motion.div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className='pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,transparent_5%,rgba(0,0,0,0.18)_45%,rgba(0,0,0,0.88)_100%)]' />
            <div className='pointer-events-none absolute inset-y-0 right-0 z-30 w-[45%] bg-gradient-to-l from-black via-black/70 to-transparent' />
            <div className='pointer-events-none absolute inset-x-0 top-0 z-30 h-40 bg-gradient-to-b from-black/80 to-transparent' />
            <div className='pointer-events-none absolute inset-x-0 bottom-0 z-30 h-48 bg-gradient-to-t from-black via-black/70 to-transparent' />
        </div>
    );
}
