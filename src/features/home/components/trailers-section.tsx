import { Swiper, SwiperSlide } from 'swiper/react';
import { TrailerModal } from '@/components/composed/trailer-modal';
import { TrailerCard } from './trailer-card';
import type { Trailer } from '@/features/home/hooks/use-trailers';

interface TrailersSectionProps {
    trailers: Trailer[];
    isLoading: boolean;
    onPlayClick: (id: number, type: string) => void;

    // modal props
    selectedTrailer: { id: number; type: string } | null;
    isModalOpen: boolean;
    onCloseModal: () => void;
}

export const TrailersSection = ({
    trailers,
    onPlayClick,
    selectedTrailer,
    isLoading,
    isModalOpen,
    onCloseModal,
}: TrailersSectionProps) => {
    const trailersSwiperParams = {
        slidesPerView: 1,
        spaceBetween: 18,
        centeredSlides: false,
        slidesPerGroupSkip: 1,
        grabCursor: true,
        breakpoints: {
            320: { slidesPerView: 1.5, spaceBetween: 12 },
            640: { slidesPerView: 2, spaceBetween: 14 },
            768: { slidesPerView: 2.5, spaceBetween: 16 },
            1024: { slidesPerView: 3, spaceBetween: 18 },
            1280: { slidesPerView: 3.5, spaceBetween: 20 },
        },
    };

    return (
        <section className='max-w-9xl mx-auto lg:mx-16 pt-12 pb-8'>
            <header className='flex flex-row items-center gap-6 px-4 sm:px-6 lg:px-8 mb-2 sm:mb-3 w-full justify-between'>
                <h2 className='text-left text-2xl font-semibold text-zinc-100 mb-0 sm:mb-1.5'>Latest Trailers</h2>
            </header>

            {isLoading ?
                <div className='px-4 sm:px-6 lg:px-8 animate-pulse py-4 flex gap-4 overflow-hidden'>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className='block shrink-0 w-[280px] sm:w-[320px]'>
                            <div className='relative w-full aspect-video rounded-lg overflow-hidden mb-3.5 bg-surface-2'>
                                <div className='absolute inset-0 flex items-center justify-center'></div>
                            </div>

                            <div className='space-y-1.5 mb-0.5'>
                                <div className='h-4 sm:h-5 bg-surface-3 rounded w-4/5' />
                            </div>

                            <div className='h-3 sm:h-3.5 bg-surface-3 rounded w-1/3 mt-1.5' />
                        </div>
                    ))}
                </div>
            : trailers.length > 0 ?
                <Swiper {...trailersSwiperParams} className='mySwiper px-4 sm:px-6 lg:px-8 py-4'>
                    {trailers.map((trailer, index) => (
                        <SwiperSlide key={`${trailer.movieId}-${index}`}>
                            <TrailerCard trailer={trailer} onPlayClick={onPlayClick} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            :   <div className='px-4 sm:px-6 lg:px-8 py-12 text-center'>
                    <p className='text-zinc-400'>No trailers available</p>
                </div>
            }

            {selectedTrailer && (
                <TrailerModal
                    isOpen={isModalOpen}
                    onClose={onCloseModal}
                    movieId={selectedTrailer.id}
                    mediaType={selectedTrailer.type}
                />
            )}
        </section>
    );
};
