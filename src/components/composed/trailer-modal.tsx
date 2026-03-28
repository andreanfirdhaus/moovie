import { useEffect, useState } from 'react';
import { getTrailers } from '@/services/tmdb/media.service';
import { motion, AnimatePresence } from 'framer-motion';

interface TrailerModalProps {
    isOpen: boolean;
    onClose: () => void;
    movieId: number;
    mediaType: string;
}

interface TMDBVideo {
    key: string;
    site: string;
    type: string;
}

export const TrailerModal = ({ isOpen, onClose, movieId, mediaType }: TrailerModalProps) => {
    const [trailerKey, setTrailerKey] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchTrailer = async () => {
        try {
            setIsLoading(true);

            const { data } = await getTrailers(mediaType, movieId.toString());
            const videos: TMDBVideo[] = data.results;

            const trailer = videos.find((video) => video.type === 'Trailer' && video.site === 'YouTube') ?? videos[0];

            setTrailerKey(trailer?.key || null);
        } catch (err) {
            console.error('Error fetching trailer:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!isOpen || !movieId) return;

        fetchTrailer();
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, movieId]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={onClose}
                    className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md'>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className='relative w-full max-w-5xl mx-4'
                        onClick={(e) => e.stopPropagation()}>
                        <div
                            className='relative bg-surface-1 rounded-lg md:rounded-2xl border border-white/15 shadow-2xl overflow-hidden'
                            style={{ paddingBottom: '56.25%' }}>
                            {isLoading ?
                                <div className='absolute inset-0 flex items-center justify-center'>
                                    <div className='text-white'>Loading trailer...</div>
                                </div>
                            : trailerKey ?
                                <iframe
                                    className='absolute inset-0 w-full h-full'
                                    src={`https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1&controls=1&modestbranding=1&rel=0&showinfo=0&fs=1&color=white&playsinline=1&iv_load_policy=3&vq=hd1080&cc_load_policy=0&disablekb=0`}
                                    title='Trailer'
                                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                    allowFullScreen
                                />
                            :   <div className='absolute inset-0 flex items-center justify-center'>
                                    <div className='text-white'>No trailer available</div>
                                </div>
                            }
                        </div>
                    </motion.div>
                </motion.section>
            )}
        </AnimatePresence>
    );
};
