/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from 'framer-motion';
import { Popcorn, Star } from 'lucide-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Badge } from '@/components/ui/badge';
import 'react-lazy-load-image-component/src/effects/blur.css';

const SPRING = { type: 'spring', stiffness: 260, damping: 20 } as const;

interface CardProps {
    poster?: string;
    title: string;
    subtitle?: string;
    subtitleAs?: 'time' | 'p';
    rating?: any;

    titleClassName?: string;
    subtitleClassName?: string;
}

export default function Card({
    poster,
    title,
    subtitle,
    subtitleAs = 'p',
    rating,
    titleClassName,
    subtitleClassName,
}: CardProps) {
    return (
        <div className='mx-0.5'>
            <figure className='relative w-full aspect-[2/3] overflow-hidden rounded-lg md:rounded-xl bg-surface-raised'>
                <motion.div
                    whileHover={{ scale: 1.06 }}
                    transition={SPRING}
                    className={`w-full h-full relative ${poster ? 'after:absolute after:inset-0 after:bg-surface-raised/20 after:mix-blend-normal' : ''}`}>
                    {poster ?
                        <LazyLoadImage
                            src={poster}
                            alt={`${title} poster`}
                            draggable={false}
                            effect='blur'
                            wrapperClassName='w-full h-full'
                            delayTime={300}
                            className='w-full h-full object-cover'
                        />
                    :   <div className='w-full h-full flex items-center justify-center bg-surface-raised'>
                            <Popcorn className='text-zinc-500 size-10' />
                        </div>
                    }
                </motion.div>

                {typeof rating === 'number' && rating > 0 && (
                    <Badge variant='rating' className='absolute bottom-2 left-2 z-10 backdrop-blur-lg'>
                        <Star size={13} className='fill-yellow-400' />
                        <span className='text-xs font-semibold'>{rating.toFixed(1)}</span>
                    </Badge>
                )}
            </figure>

            <div className='mt-1.5 sm:mt-2'>
                <p className={`truncate text-sm font-medium text-zinc-100 ${titleClassName}`}>{title}</p>

                {subtitle &&
                    (subtitleAs === 'time' ?
                        <time dateTime={subtitle} className={`text-xs font-medium text-zinc-400 ${subtitleClassName}`}>
                            {subtitle}
                        </time>
                    :   <p className={`line-clamp-1 text-xs font-medium text-zinc-400 ${subtitleClassName}`}>
                            {subtitle}
                        </p>)}
            </div>
        </div>
    );
}
