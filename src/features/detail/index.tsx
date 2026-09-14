import { Link } from 'react-router-dom';
import { getDetailUrl } from '@/utils/url';
import { TrailerModal } from '@/components/media/trailer-modal';
import DetailHero from '@/features/detail/components/detail-hero';
import { useDetail } from '@/features/detail/hooks/useDetail';
import { MediaCard } from '@/components/media/card/media-card';
import { CastCard } from '@/components/media/card/cast-card';
import { useDetailStreaming } from './hooks/useDetailStreaming';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';

const SwiperParams = {
    slidesPerView: 'auto' as const,
    grabCursor: true,
    breakpoints: {
        320: { spaceBetween: 8 },
        640: { spaceBetween: 12 },
    },
};

const MediaHeroSkeleton = () => {
    return (
        <section className='relative h-[420px] md:h-[500px] lg:h-[560px] w-full bg-surface-base overflow-hidden animate-pulse'>
            <div className='absolute inset-0 bg-gradient-to-b from-black/70 via-black/15 to-black' />
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                <div className='size-12 sm:size-16 md:size-20 rounded-full bg-surface-raised/80' />
            </div>
            <div className='absolute bottom-4 md:bottom-6 left-0 right-0 px-4 sm:px-6 max-w-xl md:max-w-2xl'>
                <div className='my-3 md:my-4 h-12 sm:h-16 md:h-24 lg:h-32 w-3/4 max-w-md rounded-xl bg-surface-raised/80' />
                <div className='mb-2 md:mb-4 flex items-center gap-2'>
                    <div className='h-4 w-12 rounded bg-surface-raised/80' />
                    <span className='text-surface-raised/80'>·</span>
                    <div className='h-4 w-10 rounded bg-surface-raised/80' />
                    <span className='text-surface-raised/80'>·</span>
                    <div className='h-4 w-32 rounded bg-surface-raised/80' />
                </div>
                <div className='flex space-x-2.5'>
                    <div className='h-11 w-28 rounded-lg bg-surface-raised/80' />
                    <div className='h-11 w-28 rounded-lg bg-surface-raised/80' />
                </div>
            </div>
        </section>
    );
};

export default function DetailPage() {
    const {
        type,
        id,
        detail,
        credits,
        recommendations,
        allSeasons,
        isLoading,
        isTrailerOpen,
        selectedMovie,
        handleTrailerClick,
        handleCloseTrailer,
        handleCastClick,
    } = useDetail();

    const streaming = useDetailStreaming(type, detail?.id?.toString(), allSeasons);

    const handleWatchNow = () => streaming.setIsPlaying(true);

    if (isLoading) return <MediaHeroSkeleton />;

    if (!type || !id) {
        return (
            <div className='flex items-center justify-center h-dvh'>
                <p className='text-foreground-muted text-lg'>Invalid movie/series ID</p>
            </div>
        );
    }

    if (!detail) {
        return (
            <div className='flex items-center justify-center h-dvh'>
                <p className='text-foreground-muted text-lg'>No detail available</p>
            </div>
        );
    }

    return (
        <main>
            <DetailHero
                detail={detail}
                onTrailerClick={handleTrailerClick}
                onWatchNow={handleWatchNow}
                {...streaming}
                onServerChange={streaming.setActiveServerId}
                onSeasonChange={streaming.handleSeasonChange}
                onEpisodeChange={streaming.setActiveEpisode}
                seasons={allSeasons}
            />

            {selectedMovie && (
                <TrailerModal
                    isOpen={isTrailerOpen}
                    onClose={handleCloseTrailer}
                    movieId={selectedMovie.id}
                    mediaType={selectedMovie.type}
                />
            )}

            {/* grid layout */}
            <section className='px-4 sm:px-6 pt-8 pb-8'>
                <div className='max-sm:space-y-10'>
                    <div className='md:col-span-3 space-y-12'>
                        {/* cast */}
                        {credits?.cast?.length > 0 && (
                            <section>
                                <header className='mb-4'>
                                    <h2 className='text-lg sm:text-xl font-semibold text-foreground'>Cast</h2>
                                </header>

                                <Swiper {...SwiperParams} freeMode={true} modules={[FreeMode]}>
                                    {credits?.cast?.map((cast) => (
                                        <SwiperSlide key={cast.id} className='!w-[112px] sm:!w-[140px]'>
                                            <button
                                                className='w-full text-left'
                                                onClick={() => handleCastClick(cast.id)}>
                                                <CastCard cast={cast} />
                                            </button>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </section>
                        )}

                        {/* season */}
                        {allSeasons?.length > 0 && !(type === 'tv' && streaming.isPlaying) && (
                            <section>
                                <header className='mb-4'>
                                    <h2 className='text-lg sm:text-xl font-semibold text-foreground'>Seasons</h2>
                                </header>

                                <Swiper
                                    {...SwiperParams}
                                    freeMode={true}
                                    modules={[FreeMode]}
                                    className='mySwiper py-2.5'>
                                    {allSeasons.map((seasons) => (
                                        <SwiperSlide
                                            key={seasons.id}
                                            className='!w-[140px] sm:!w-[160px] md:!w-[180px] lg:!w-[196px]'>
                                            <MediaCard type={seasons} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </section>
                        )}

                        {/* recommendation */}
                        {recommendations?.length > 0 && (
                            <section>
                                <header className='mb-4'>
                                    <h2 className='text-lg sm:text-xl font-semibold text-foreground'>Recommendation</h2>
                                </header>

                                <Swiper
                                    {...SwiperParams}
                                    freeMode={true}
                                    modules={[FreeMode]}
                                    className='mySwiper py-2.5'>
                                    {recommendations.map((recommendation) => (
                                        <SwiperSlide
                                            key={recommendation.id}
                                            className='!w-[140px] sm:!w-[160px] md:!w-[180px] lg:!w-[196px]'>
                                            <Link to={getDetailUrl(recommendation)}>
                                                <MediaCard type={recommendation} />
                                            </Link>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </section>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
