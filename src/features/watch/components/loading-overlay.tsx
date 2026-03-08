import { motion } from 'framer-motion';

interface LoadingOverlayProps {
    progress: number;
}

export default function LoadingOverlay({ progress }: LoadingOverlayProps) {
    return (
        <motion.div
            key='overlay'
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className='absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#111111] rounded-lg'>
            {/* percent label */}
            <motion.span
                className='text-zinc-400 text-base font-mono tabular-nums mb-3'
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}>
                {Math.round(progress)}%
            </motion.span>

            {/* progress bar track */}
            <div className='w-40 h-[3px] bg-white/5 rounded-full overflow-hidden'>
                <motion.div
                    className='h-full rounded-full bg-gradient-to-r from-[#2563eb] to-[#60a5fa]'
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.15, ease: 'linear' }}
                />
            </div>
        </motion.div>
    );
}
