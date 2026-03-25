import { motion } from 'framer-motion';
import { getRatingPercentage, getRatingColor } from '@/utils/media';

interface RatingCircleProps {
    rating: number;
    size?: 'sm' | 'md' | 'lg';
    strokeWidth?: number;
    showPercentage?: boolean;
    animationDelay?: number;
}

export default function RatingCircle({
    rating,
    size = 'md',
    strokeWidth = 3.5,
    showPercentage = true,
    animationDelay = 0.2,
}: RatingCircleProps) {
    const sizeMap = {
        sm: 48,
        md: 56,
        lg: 64,
    };

    const dimensions = sizeMap[size];
    const radius = 20;

    return (
        <div className='relative shrink-0' style={{ width: dimensions, height: dimensions }}>
            <svg className='absolute inset-0 -rotate-90' viewBox='0 0 48 48'>
                <circle cx='24' cy='24' r={radius} className='stroke-surface-4' strokeWidth={strokeWidth} fill='none' />
            </svg>

            <svg className='absolute inset-0 -rotate-90' viewBox='0 0 48 48'>
                <motion.circle
                    cx='24'
                    cy='24'
                    r={radius}
                    className={getRatingColor(rating)}
                    strokeWidth={strokeWidth}
                    fill='none'
                    strokeLinecap='round'
                    strokeDasharray={2 * Math.PI * radius}
                    initial={{ strokeDashoffset: 2 * Math.PI * radius }}
                    animate={{
                        strokeDashoffset: 2 * Math.PI * radius * (1 - rating / 10),
                    }}
                    transition={{
                        duration: 1.5,
                        ease: 'easeOut',
                        delay: animationDelay,
                    }}
                />
            </svg>

            {showPercentage && (
                <div className='absolute inset-0 flex items-center justify-center'>
                    <motion.span
                        className='text-sm font-bold text-zinc-100'
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: animationDelay + 0.6 }}>
                        {getRatingPercentage(rating)}
                        <sup className='text-[8px]'>%</sup>
                    </motion.span>
                </div>
            )}
        </div>
    );
}
