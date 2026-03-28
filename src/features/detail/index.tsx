import { Link, useNavigate } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { getDetailUrl } from '@/utils/url';
import { TrailerModal } from '@/components/composed/trailer-modal';
import DetailHero from '@/features/detail/components/detail-hero';
import ProductionCompany from '@/features/detail/components/production-company';
import Loading from '@/components/ui/spinner';
import { useDetail } from '@/features/detail/hooks/useDetail';
import { MediaCard } from '@/components/composed/card/media-card';
import { CastCard } from '@/components/composed/card/cast-card';
import { CastModal } from '@/components/composed/cast-modal';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';

const SwiperParams = {
    slidesPerView: 1,
    spaceBetween: 18,
    centeredSlides: false,
    slidesPerGroupSkip: 1,
    grabCursor: true,
    breakpoints: {
        320: {
            slidesPerView: 2.5,
            spaceBetween: 8,
        },
        640: {
            slidesPerView: 4,
            spaceBetween: 8,
        },
        1024: {
            slidesPerView: 5,
            spaceBetween: 10,
        },
    },
};

export default function DetailPage() {
    const {
        type,
        id,
        detail,
        credits,
        recommendations,
        keywords,
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

    const navigate = useNavigate();
    const title = detail?.title || detail?.name || '';
    const year = detail?.release_date?.slice(0, 4) || detail?.first_air_date?.slice(0, 4) || '';

    const handleWatchNow = () => {
        navigate(`/${type}/watch/${id}`, {
            state: {
                title,
                year,
                type,
                id,
                tmdbId: detail?.id?.toString(),
                ...(type === 'tv' && allSeasons.length > 0 ? { tmdbSeasons: allSeasons } : {}),
            },
        });
    };

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
                isLoadingWatch={false}
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
            <div className='max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-8'>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-6 max-sm:space-y-10'>
                    <div className='md:col-span-3 space-y-12'>
                        {/* cast */}
                        {credits?.length > 0 && (
                            <section>
                                <header className='mb-2.5 sm:mb-3.5'>
                                    <h2 className='text-lg sm:text-xl font-semibold text-zinc-100'>Cast</h2>
                                </header>

                                <Swiper {...SwiperParams} freeMode={true} modules={[FreeMode]}>
                                    {credits.map((cast) => (
                                        <SwiperSlide key={cast.id}>
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
                        {allSeasons?.length > 0 && (
                            <section>
                                <header className='mb-2.5 sm:mb-3.5'>
                                    <h2 className='text-lg sm:text-xl font-semibold text-zinc-100'>Seasons</h2>
                                </header>

                                <Swiper {...SwiperParams} freeMode={true} modules={[FreeMode]}>
                                    {allSeasons.map((seasons) => (
                                        <SwiperSlide key={seasons.id}>
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

                                <Swiper {...SwiperParams} freeMode={true} modules={[FreeMode]}>
                                    {recommendations.map((recommendation) => (
                                        <SwiperSlide key={recommendation.id}>
                                            <Link to={getDetailUrl(recommendation)}>
                                                <MediaCard type={recommendation} />
                                            </Link>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </section>
                        )}
                    </div>

                    <aside className='md:col-span-1 md:self-start space-y-12 sm:space-y-6'>
                        {/* production companies */}
                        {detail.production_companies?.length > 0 && (
                            <div className='lg:p-4'>
                                <h2 className='text-lg sm:text-xl font-semibold text-zinc-100 mb-2.5 sm:mb-3'>
                                    Production
                                </h2>

                                <div className='space-y-3'>
                                    {detail.production_companies.map((company) => (
                                        <ProductionCompany key={company.id} company={company} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* official links */}
                        {detail.homepage && (
                            <div className='lg:p-4'>
                                <h2 className='text-lg sm:text-xl font-semibold text-zinc-100 mb-2.5 sm:mb-3'>
                                    Official Links
                                </h2>

                                <a
                                    href={detail.homepage}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='flex items-center gap-2 text-brand-light hover:text-brand-light/80 transition-colors'>
                                    <ExternalLink size={16} />
                                    <span className='text-sm'>Visit Homepage</span>
                                </a>
                            </div>
                        )}

                        {/* keywords */}
                        {keywords?.length > 0 && (
                            <div className='lg:p-4'>
                                <h2 className='text-lg sm:text-xl font-semibold text-zinc-100 mb-2.5 sm:mb-3'>
                                    Keywords
                                </h2>

                                <div className='flex flex-wrap gap-2'>
                                    {keywords.slice(0, 12).map((keyword) => (
                                        <span
                                            key={keyword.id}
                                            className='px-3 py-1.5 truncate bg-surface-3 hover:bg-surface-4 text-zinc-300 text-sm rounded-full transition-colors cursor-default'>
                                            {keyword.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </aside>
                </div>
            </div>
        </main>
    );
}
