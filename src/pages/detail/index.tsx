import { Link } from 'react-router-dom';
import { ExternalLink, X } from 'lucide-react';
import { getCreditsName, getDetailUrl } from '@/lib/tmdb-helpers';
import { TrailerModal } from '@/components/composed/trailer-modal';
import HeroSection from '@/features/detail/components/hero-section';
import ProductionCompany from '@/features/detail/components/production-company';
import Card from '@/components/ui/card';
import Loading from '@/components/ui/spinner';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FALLBACK_CAST, TMDB_IMG_300 } from '@/lib/tmdb-image';
import { useDetail } from '@/features/detail/hooks/use-detail';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
        handleTrailerClick,
        handleCloseTrailer,
        handleWatchNow,
        isLoadingWatch,
        watchError,
        setWatchError,
    } = useDetail();

    if (isLoading) {
        return <Loading />;
    }

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

    const moviesSwiperParams = {
        slidesPerView: 1,
        spaceBetween: 18,
        centeredSlides: false,
        slidesPerGroupSkip: 1,
        grabCursor: true,
        breakpoints: {
            320: {
                slidesPerView: 3,
                spaceBetween: 6,
            },
            768: {
                slidesPerView: 5,
            },
            1024: {
                slidesPerView: 6,
                spaceBetween: 10,
            },
        },
    };

    return (
        <main>
            {watchError && (
                <div className='fixed inset-0 z-50 flex items-start justify-center px-4 pt-4 sm:pt-16 bg-black/40 backdrop-blur-sm'>
                    <div className='w-full max-w-md bg-red-500/10 border border-red-500 text-red-400 px-4 md:px-6 py-3 rounded-xl shadow-lg backdrop-blur-lg flex items-center gap-4'>
                        <span className='flex-1 text-sm sm:text-base'>{watchError}</span>
                        <button
                            onClick={() => setWatchError(null)}
                            className='shrink-0 hover:text-red-300 transition-colors'>
                            <X size={24} />
                        </button>
                    </div>
                </div>
            )}

            {/* hero section */}
            <HeroSection
                detail={detail}
                onTrailerClick={handleTrailerClick}
                onWatchNow={handleWatchNow}
                isLoadingWatch={isLoadingWatch}
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
            <div className='max-w-9xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-24 pt-12 pb-8'>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8'>
                    <div className='md:col-span-3 space-y-8'>
                        {/* cast */}
                        {credits?.length > 0 && (
                            <section>
                                <header className='mb-1 sm:mb-2.5'>
                                    <h1 className='text-left text-xl sm:text-2xl font-semibold text-zinc-100'>Cast</h1>
                                </header>

                                <Swiper {...moviesSwiperParams} modules={[Autoplay]} className='mySwiper py-4'>
                                    {credits.map((cast) => (
                                        <SwiperSlide key={cast.id}>
                                            <div className='mx-0.5'>
                                                <LazyLoadImage
                                                    effect='blur'
                                                    src={
                                                        cast.profile_path ?
                                                            TMDB_IMG_300 + cast.profile_path
                                                        :   FALLBACK_CAST
                                                    }
                                                    alt={`${getCreditsName(cast)} poster`}
                                                    wrapperClassName='w-full h-full'
                                                    className='bg-contain bg-center rounded-[6px] sm:rounded-[8px] w-full h-full'
                                                    delayTime={300}
                                                />

                                                <div className='mt-1.5 sm:mt-2'>
                                                    <h3 className='text-zinc-200 font-semibold text-base mb-0.5 truncate'>
                                                        {getCreditsName(cast)}
                                                    </h3>
                                                    <p className='text-zinc-400 text-sm font-medium'>
                                                        {cast.character}
                                                    </p>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </section>
                        )}

                        {/* season */}
                        {allSeasons?.length > 0 && (
                            <section>
                                <header className='mb-1 sm:mb-2.5'>
                                    <h2 className='text-left text-xl sm:text-2xl font-semibold text-zinc-100'>
                                        All Season
                                    </h2>
                                </header>

                                <Swiper {...moviesSwiperParams} modules={[Autoplay]} className='mySwiper py-4'>
                                    {allSeasons.map((seasons) => (
                                        <SwiperSlide key={seasons.id}>
                                            <Card type={seasons} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </section>
                        )}

                        {/* recomendation */}
                        {recommendations?.length > 0 && (
                            <section>
                                <header className='mb-1 sm:mb-2.5'>
                                    <h3 className='text-left text-xl sm:text-2xl font-semibold text-zinc-100'>
                                        You Might Also Like
                                    </h3>
                                </header>

                                <Swiper {...moviesSwiperParams} modules={[Autoplay]} className='mySwiper py-4'>
                                    {recommendations.map((recommendation) => (
                                        <SwiperSlide key={recommendation.id}>
                                            <Link to={getDetailUrl(recommendation)}>
                                                <Card type={recommendation} />
                                            </Link>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </section>
                        )}
                    </div>

                    <aside className='md:col-span-1 md:self-start space-y-10 sm:space-y-6'>
                        {/* production companies */}
                        {detail.production_companies?.length > 0 && (
                            <div className='sm:p-4'>
                                <h3 className='text-xl sm:text-lg font-semibold text-zinc-100 mb-6 sm:mb-4'>
                                    Production
                                </h3>

                                <div className='space-y-3'>
                                    {detail.production_companies.map((company) => (
                                        <ProductionCompany key={company.id} company={company} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* official links */}
                        {detail.homepage && (
                            <div className='sm:p-4'>
                                <h3 className='text-xl sm:text-lg font-semibold text-zinc-100 mb-6 sm:mb-4'>
                                    Official Links
                                </h3>

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
                            <div className='sm:p-4'>
                                <h3 className='text-xl sm:text-lg font-semibold text-zinc-100 mb-6 sm:mb-4'>
                                    Keywords
                                </h3>

                                <div className='flex flex-wrap gap-2'>
                                    {keywords.map((keyword) => (
                                        <span
                                            key={keyword.id}
                                            className='px-3 py-1.5 bg-surface-3 text-zinc-300 text-sm rounded-full hover:bg-zinc-800 transition-colors cursor-default'>
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
