import { motion } from 'framer-motion';
import { Popcorn } from 'lucide-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const SPRING = { type: 'spring', stiffness: 260, damping: 20 } as const;

interface CardProps {
    poster?: string;
    title: string;
    subtitle?: string;
    subtitleAs?: 'time' | 'p';

    titleClassName?: string;
    subtitleClassName?: string;
}

export default function Card({
    poster,
    title,
    subtitle,
    subtitleAs = 'p',
    titleClassName,
    subtitleClassName,
}: CardProps) {
    return (
        <div className='mx-0.5'>
            <figure className='relative w-full aspect-[2/3] overflow-hidden rounded-[6px] sm:rounded-[8px] bg-surface-2'>
                <motion.div
                    whileHover={{ scale: 1.06 }}
                    transition={SPRING}
                    className={`w-full h-full relative  ${poster ? 'after:absolute after:inset-0 after:bg-surface-2/20 after:mix-blend-normal' : ''}`}>
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
                    :   <div className='w-full h-full flex items-center justify-center bg-surface-2'>
                            <Popcorn className='text-zinc-500 size-10' />
                        </div>
                    }
                </motion.div>
            </figure>

            <div className='mt-1.5 sm:mt-2'>
                <p className={`text-zinc-100 font-medium text-[15px] truncate ${titleClassName}`}>{title}</p>

                {subtitle &&
                    (subtitleAs === 'time' ?
                        <time dateTime={subtitle} className={`text-zinc-400 text-sm font-medium ${subtitleClassName}`}>
                            {subtitle}
                        </time>
                    :   <p className={`text-zinc-400 text-sm font-medium line-clamp-1 ${subtitleClassName}`}>
                            {subtitle}
                        </p>)}
            </div>
        </div>
    );
}
