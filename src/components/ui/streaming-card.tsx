import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import type { StreamingSearchItem } from '@/types/streaming';

const FALLBACK_POSTER = '/assets/poster-placeholder.png';

interface StreamingCardProps {
    item: StreamingSearchItem;
}

export default function StreamingCard({ item }: StreamingCardProps) {
    return (
        <div className='mx-0.5'>
            <div className='relative w-full aspect-[2/3] overflow-hidden rounded-[6px] sm:rounded-[8px] bg-[#121212]'>
                <motion.div
                    whileHover={{ scale: 1.06 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className='w-full h-full'>
                    <LazyLoadImage
                        src={item.poster || FALLBACK_POSTER}
                        alt={`${item.title} poster`}
                        draggable={false}
                        effect='blur'
                        wrapperClassName='w-full h-full'
                        delayTime={300}
                        className='w-full h-full object-cover'
                    />
                </motion.div>
            </div>

            <div className='mt-1.5 sm:mt-2.5'>
                <p className='text-gray-100 font-semibold text-base truncate mb-0.5 md:mb-1'>{item.title}</p>

                {item.year && <span className='text-gray-400 text-sm font-medium'>{item.year}</span>}
            </div>
        </div>
    );
}
