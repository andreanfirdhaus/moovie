/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import { ChevronRight } from 'lucide-react';
import { getDiscoverMovies } from '@/services/tmdb/movie.service';
import { getDiscoverSeries } from '@/services/tmdb/series.service';
import { MediaCard } from '@/components/media/card/media-card';
import { getDetailUrl } from '@/utils/url';

export interface MediaCollectionProps {
    title: string;
    mediaType: 'movie' | 'tv';
    genreId?: number;
    genreIds?: number[];
    country?: string;
    watchProvider?: number;
    sortBy?: string;
    limit?: number;
}

const SwiperParams = {
    slidesPerView: 'auto' as const,
    grabCursor: true,
    breakpoints: {
        320: { spaceBetween: 8 },
        640: { spaceBetween: 12 },
    },
};

export default function MediaCollection({
    title,
    mediaType = 'movie',
    genreId,
    genreIds,
    country,
    watchProvider,
    sortBy = 'popularity.desc',
    limit = 20,
}: MediaCollectionProps) {
    const displayTitle = title || 'Featured Collection';
    const effectiveGenres =
        genreIds && genreIds.length > 0 ? genreIds
        : genreId ? [genreId]
        : [];

    const { data: items = [], isLoading } = useQuery({
        queryKey: ['mediaCollection', mediaType, effectiveGenres, country, watchProvider, sortBy],
        queryFn: async () => {
            const payload: Record<string, unknown> = {
                sort_by: sortBy,
            };
            if (effectiveGenres.length > 0) {
                payload.with_genres = effectiveGenres.join(',');
            }
            if (country && country !== 'ALL') {
                payload.with_origin_country = country;
            }
            if (watchProvider) {
                payload.with_watch_providers = watchProvider;
                payload.watch_region = country && country !== 'ALL' ? country : 'US';
            }

            const response =
                mediaType === 'movie' ? await getDiscoverMovies(1, payload) : await getDiscoverSeries(1, payload);
            return (response.data.results || []).slice(0, limit);
        },
        staleTime: 1000 * 60 * 15,
    });

    const getTargetHref = () => {
        const params = new URLSearchParams();
        if (mediaType && mediaType !== 'movie') {
            params.set('type', mediaType);
        }
        if (effectiveGenres.length > 0) {
            params.set('genres', effectiveGenres.join(','));
        }
        if (country && country !== 'ALL') {
            params.set('country', country);
        }
        if (watchProvider) {
            params.set('provider', watchProvider.toString());
        }
        if (sortBy && sortBy !== 'popularity.desc') {
            params.set('sort', sortBy);
        }
        const queryString = params.toString();
        return queryString ? `/discover?${queryString}` : '/discover';
    };

    return (
        <section className='px-4 sm:px-6 py-6 sm:py-8'>
            <header className='flex justify-between items-center mb-4'>
                <h2 className='text-lg sm:text-xl font-semibold text-foreground'>{displayTitle}</h2>

                <Link
                    to={getTargetHref()}
                    className='flex items-center gap-1 text-xs sm:text-sm font-medium text-foreground-muted hover:text-foreground-secondary transition-colors group'>
                    <span>View All</span>
                    <ChevronRight size={16} className='transition-transform group-hover:translate-x-0.5' />
                </Link>
            </header>

            <div className='relative group'>
                {isLoading ?
                    <div className='flex overflow-hidden gap-2 sm:gap-3'>
                        {Array.from({ length: 8 }).map((_, index) => (
                            <div
                                key={index}
                                className='w-[140px] sm:w-[160px] md:w-[180px] lg:w-[196px] flex-shrink-0 animate-pulse'>
                                <div className='mx-0.5'>
                                    <div className='aspect-[2/3] w-full rounded-md bg-surface-raised' />
                                    <div className='mt-1.5 space-y-1.5 sm:mt-2'>
                                        <div className='h-[15px] w-4/5 rounded bg-surface-elevated/70' />
                                        <div className='h-[14px] w-1/3 rounded bg-surface-elevated/70' />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                : items.length > 0 ?
                    <Swiper {...SwiperParams} freeMode={true} modules={[FreeMode]} className='mySwiper py-2.5'>
                        {items.map((item: any) => (
                            <SwiperSlide key={item.id} className='!w-[140px] sm:!w-[160px] md:!w-[180px] lg:!w-[196px]'>
                                <Link to={getDetailUrl(item)}>
                                    <MediaCard type={item} />
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                :   <div className='py-8 text-center'>
                        <p className='text-sm text-foreground-muted'>No {displayTitle.toLowerCase()} available.</p>
                    </div>
                }
            </div>
        </section>
    );
}
