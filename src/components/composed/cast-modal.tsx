import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, LoaderCircle, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';

import { TMDB_IMG_300 } from '@/config/images';
import { MediaCard } from '@/components/composed/card/media-card';
import { getDetailUrl } from '@/utils/url';
import { usePersonDetail, usePersonKnownFor } from '@/features/detail/hooks/usePerson.query';
import { useRef } from 'react';

interface CastModalProps {
    isOpen: boolean;
    onClose: () => void;
    personId: number | null;
}

const SwiperParams = {
    slidesPerView: 'auto' as const,
    grabCursor: true,
    breakpoints: {
        320: { spaceBetween: 8 },
        640: { spaceBetween: 12 },
    },
};

export function CastModal({ isOpen, onClose, personId }: CastModalProps) {
    const { data: person, isLoading: isLoadingPerson } = usePersonDetail(personId ?? undefined);
    const { data: knownFor = [], isLoading: isLoadingKnownFor } = usePersonKnownFor(personId ?? undefined);

    const hasBiography = person?.biography && person.biography.trim().length > 0;
    const hasKnownFor = knownFor.length > 0;

    const knownForSwiperRef = useRef<SwiperType | null>(null);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={onClose}
                    className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4'>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        onClick={(e) => e.stopPropagation()}
                        className='relative w-full max-w-4xl max-h-[85vh] overflow-y-auto scrollbar-hide bg-surface-1 rounded-xl border border-zinc-800 shadow-2xl'>
                        {/* close */}
                        <button
                            onClick={onClose}
                            className='absolute top-4 right-4 z-10 p-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 transition-colors'>
                            <X size={16} />
                        </button>

                        {isLoadingPerson ?
                            <div className='flex items-center justify-center h-64'>
                                <LoaderCircle className='animate-spin text-brand mx-auto mb-2' size={48} />
                            </div>
                        : person ?
                            <div className='p-6 sm:p-8'>
                                <div className='flex flex-col sm:flex-row gap-6 mb-8'>
                                    {/* profile */}
                                    {person.profile_path && (
                                        <img
                                            src={TMDB_IMG_300 + person.profile_path}
                                            alt={person.name}
                                            draggable={false}
                                            className='w-28 h-auto sm:w-36 rounded-md object-cover flex-shrink-0'
                                        />
                                    )}

                                    <div className='min-w-0'>
                                        {/* name */}
                                        <h2 className='text-xl sm:text-2xl font-bold text-zinc-100 mb-1'>
                                            {person.name}
                                        </h2>

                                        {/* born */}
                                        {person.birthday && (
                                            <p className='text-sm font-medium text-zinc-400'>
                                                Born:{' '}
                                                <span className='text-zinc-200'>
                                                    {new Date(person.birthday).toLocaleDateString('en-US', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric',
                                                    })}
                                                </span>
                                                {person.place_of_birth && (
                                                    <span className='text-zinc-400'> · {person.place_of_birth}</span>
                                                )}
                                            </p>
                                        )}

                                        {/* biography */}
                                        {hasBiography && (
                                            <div className='mt-4'>
                                                <h3 className='text-base font-semibold text-zinc-200 mb-1'>
                                                    Biography
                                                </h3>
                                                <p className='text-sm text-zinc-400 leading-relaxed line-clamp-5 font-medium'>
                                                    {person.biography}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* known for */}
                                {!isLoadingKnownFor && hasKnownFor && (
                                    <div>
                                        <div className='flex items-center justify-between mb-3'>
                                            <h3 className='text-base font-semibold text-zinc-200'>Known For</h3>

                                            <div className='flex gap-1.5'>
                                                <button
                                                    onClick={() => knownForSwiperRef.current?.slidePrev()}
                                                    className='p-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 transition-colors'>
                                                    <ChevronLeft size={16} />
                                                </button>
                                                <button
                                                    onClick={() => knownForSwiperRef.current?.slideNext()}
                                                    className='p-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 transition-colors'>
                                                    <ChevronRight size={16} />
                                                </button>
                                            </div>
                                        </div>

                                        <Swiper
                                            {...SwiperParams}
                                            onSwiper={(swiper) => {
                                                knownForSwiperRef.current = swiper;
                                            }}
                                            freeMode
                                            modules={[FreeMode]}
                                            className='py-1'>
                                            {knownFor.map((item: any) => (
                                                <SwiperSlide key={item.id} className='!w-[100px] sm:!w-[120px]'>
                                                    <Link to={getDetailUrl(item)} onClick={onClose}>
                                                        <MediaCard
                                                            type={item}
                                                            titleClassName='text-zinc-300 font-medium text-xs truncate'
                                                            subtitleClassName='text-zinc-500 text-xs font-medium'
                                                        />
                                                    </Link>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </div>
                                )}
                            </div>
                        :   <div className='flex items-center justify-center h-64'>
                                <p className='text-zinc-400'>No data available.</p>
                            </div>
                        }
                    </motion.div>
                </motion.section>
            )}
        </AnimatePresence>
    );
}
