import { Link } from 'react-router-dom';
import { getDetailUrl } from '@/utils/url';
import { TrailerModal } from '@/components/composed/trailer-modal';
import DetailHero from '@/features/detail/components/detail-hero';
import Loading from '@/components/ui/spinner';
import { useDetail } from '@/features/detail/hooks/useDetail';
import { MediaCard } from '@/components/composed/card/media-card';
import { CastCard } from '@/components/composed/card/cast-card';
import { CastModal } from '@/components/composed/cast-modal';
import { useDetailStreaming } from './hooks/useDetailStreaming';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';

const SwiperParams = {
    slidesPerView: 'auto' as const,
    grabCursor: true,
    breakpoints: {
        320: { spaceBetween: 8 },
        640: { spaceBetween: 16 },
        1024: { spaceBetween: 18.5 },
    },
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
        selectedPersonId,
        isCastModalOpen,
        handleTrailerClick,
        handleCloseTrailer,
        handleCastClick,
        handleCloseCastModal,
    } = useDetail();

    const streaming = useDetailStreaming(type, detail?.id?.toString(), allSeasons);

    const handleWatchNow = () => streaming.setIsPlaying(true);

    if (isLoading) return <Loading />;

    if (!type || !id) {
        return (
            <div className='flex items-center justify-center h-dvh'>
                <p className='text-zinc-400 text-lg'>Invalid movie/series ID</p>
            </div>
        );
    }

    if (!detail) {
        return (
            <div className='flex items-center justify-center h-dvh'>
                <p className='text-zinc-400 text-lg'>No detail available</p>
            </div>
        );
    }

    return (
        <main>
            {/* hero section */}
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

            {selectedPersonId && (
                <CastModal isOpen={isCastModalOpen} onClose={handleCloseCastModal} personId={selectedPersonId} />
            )}

            {/* grid layout */}
            <div className='px-4 sm:px-6 lg:px-12 xl:px-24 pt-8 sm:pt-12 pb-8'>
                <div className='max-sm:space-y-10'>
                    <div className='md:col-span-3 space-y-12'>
                        {/* cast */}
                        {credits?.cast?.length > 0 && (
                            <section>
                                <header className='mb-2.5 sm:mb-3.5'>
                                    <h2 className='text-lg sm:text-xl font-semibold text-zinc-100'>Cast</h2>
                                </header>

                                <Swiper {...SwiperParams} freeMode={true} modules={[FreeMode]}>
                                    {credits?.cast?.map((cast) => (
                                        <SwiperSlide key={cast.id} className='!w-[112px] sm:!w-[140px] md:!w-[170px]'>
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
                                <header className='mb-2.5 sm:mb-3.5'>
                                    <h2 className='text-lg sm:text-xl font-semibold text-zinc-100'>Seasons</h2>
                                </header>

                                <Swiper
                                    {...SwiperParams}
                                    freeMode={true}
                                    modules={[FreeMode]}
                                    className='mySwiper py-2.5'>
                                    {allSeasons.map((seasons) => (
                                        <SwiperSlide
                                            key={seasons.id}
                                            className='!w-[140px] sm:!w-[160px] md:!w-[180px] lg:!w-[200px]'>
                                            <MediaCard type={seasons} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </section>
                        )}

                        {/* recommendation */}
                        {recommendations?.length > 0 && (
                            <section>
                                <header className='mb-2.5 sm:mb-3.5'>
                                    <h2 className='text-lg sm:text-xl font-semibold text-zinc-100'>Recommendation</h2>
                                </header>

                                <Swiper
                                    {...SwiperParams}
                                    freeMode={true}
                                    modules={[FreeMode]}
                                    className='mySwiper py-2.5'>
                                    {recommendations.map((recommendation) => (
                                        <SwiperSlide
                                            key={recommendation.id}
                                            className='!w-[140px] sm:!w-[160px] md:!w-[180px] lg:!w-[200px]'>
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
            </div>
        </main>
    );
}
