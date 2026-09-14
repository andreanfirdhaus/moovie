/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getBackdropUrl } from '@/utils/media';
import { getDetailUrl } from '@/utils/url';
import { getYear } from '@/utils/date';
import { Button } from '@/components/ui/button';
import { MediaLogo } from './media-logo';
import { useMediaHero, type HeroMediaType, type HeroTimeWindow } from './useMediaHero';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export interface MediaHeroProps {
    mediaType?: HeroMediaType;
    timeWindow?: HeroTimeWindow;
    items?: any[];
    badgeText?: string;
}

interface BadgeProps {
    mediaType: string;
    mediaList: any[];
    activeIndex: number;
}

const SwiperParams = {
    loop: true,
    speed: 900,
    allowTouchMove: true,
    autoplay: {
        delay: 8000,
        disableOnInteraction: false,
    },
};

const MediaHeroSkeleton = () => {
    return (
        <section className='relative h-[85svh] min-h-[600px] max-h-[760px] w-full bg-surface-base overflow-hidden animate-pulse'>
            <div className='absolute inset-0 bg-gradient-to-b from-black/70 via-black/15 to-black' />
            <div className='absolute bottom-20 md:bottom-28 left-0 right-0 px-4 sm:px-6 md:px-10 max-w-xl md:max-w-2xl'>
                <div className='mb-2 h-7 w-36 rounded-full bg-surface-raised/80' />
                <div className='my-3 md:my-4 h-12 sm:h-16 md:h-24 lg:h-32 w-3/4 max-w-md rounded-xl bg-surface-raised/80' />
                <div className='mb-2 md:mb-4 flex items-center gap-2'>
                    <div className='h-4 w-12 rounded bg-surface-raised/80' />
                    <span className='text-surface-raised/80'>·</span>
                    <div className='h-4 w-10 rounded bg-surface-raised/80' />
                    <span className='text-surface-raised/80'>·</span>
                    <div className='h-4 w-32 rounded bg-surface-raised/80' />
                </div>
                <div className='mb-4 md:mb-6 space-y-2'>
                    <div className='h-4 w-full rounded bg-surface-raised/80' />
                    <div className='h-4 w-4/5 rounded bg-surface-raised/80' />
                </div>
                <div className='h-11 w-36 rounded-lg bg-surface-raised/80' />
            </div>
        </section>
    );
};

const Badge = ({ mediaType, mediaList, activeIndex }: BadgeProps) => {
    const { t } = useTranslation();

    if (mediaType !== 'all' || !mediaList[activeIndex]) {
        return null;
    }

    const currentMedia = mediaList[activeIndex];
    const isTv = currentMedia?.media_type === 'tv';

    const sameTypeItems = mediaList
        .slice(0, 7)
        .filter((item: any) => (isTv ? item.media_type === 'tv' : item.media_type !== 'tv'));

    const rank = sameTypeItems.findIndex((item: any) => item.id === currentMedia.id) + 1;

    if (rank <= 0) return null;
    return (
        <div className='inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 backdrop-blur-md border border-white/10 shadow-lg'>
            <img src='/assets/top10.svg' alt='Top 10' className='h-5 w-auto object-contain' />
            <span className='text-xs font-bold text-white tracking-wide'>
                #{rank} in {isTv ? t('hero.tvShows', 'TV shows') : t('hero.movies', 'movies')}
            </span>
        </div>
    );
};

export const MediaHero = ({ mediaType = 'all', timeWindow = 'day', items: manualItems }: MediaHeroProps) => {
    const { t } = useTranslation();
    const swiperRef = useRef<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const { items: fetchedItems, isLoading } = useMediaHero(mediaType, timeWindow);

    const mediaList = manualItems || fetchedItems;
    const totalSlides = Math.min(mediaList.length, 7);

    if (isLoading && mediaList.length === 0) {
        return <MediaHeroSkeleton />;
    }

    if (mediaList.length === 0) {
        return null;
    }

    return (
        <section className='relative h-[85svh] min-h-[600px] max-h-[760px]'>
            <Swiper
                key={`${mediaType}-${mediaList.length}`}
                {...SwiperParams}
                modules={[Pagination, Navigation, Autoplay, EffectFade]}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className='h-full w-full'>
                {mediaList.slice(0, 7).map((media, idx) => (
                    <SwiperSlide key={media.id || idx}>
                        <div className='relative h-full w-full'>
                            <img
                                src={getBackdropUrl(media)}
                                alt=''
                                draggable='false'
                                fetchPriority={idx === 0 ? 'high' : 'low'}
                                loading={idx === 0 ? 'eager' : 'lazy'}
                                decoding={idx === 0 ? 'sync' : 'async'}
                                className='h-full w-full object-cover object-top'
                            />

                            {/* Gradient overlay */}
                            <div className='absolute inset-0 bg-gradient-to-b from-black/20 via-black/15 to-black' />
                            <div
                                className='absolute inset-0 pointer-events-none'
                                style={{
                                    background:
                                        'radial-gradient(circle at 0% 100%, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.75) 35%, rgba(0, 0, 0, 0.2) 65%, transparent 85%)',
                                }}
                            />

                            <div className='absolute bottom-20 md:bottom-28 left-0 right-0 px-4 sm:px-6 md:px-10'>
                                <Badge mediaType={mediaType} mediaList={mediaList} activeIndex={activeIndex} />

                                <div className='my-3 md:my-4'>
                                    <MediaLogo movie={media} />
                                </div>

                                <div className='mb-2 md:mb-4 flex flex-wrap items-center gap-x-1 md:gap-x-2 gap-y-1 text-sm font-medium text-foreground sm:font-semibold'>
                                    {Number(media.vote_average) > 0 && (
                                        <span className='inline-flex items-center gap-1.5 text-warning-text'>
                                            <Star size={18} className='fill-warning-text' />
                                            {Number(media.vote_average).toFixed(1)}
                                        </span>
                                    )}

                                    {getYear(media) && (
                                        <>
                                            {Number(media.vote_average) > 0 && <span>·</span>}
                                            <span>{getYear(media)}</span>
                                        </>
                                    )}

                                    {media.genres?.length > 0 && (
                                        <>
                                            {(Number(media.vote_average) > 0 || getYear(media)) && <span>·</span>}

                                            <span>
                                                {media.genres.map((genre: any, index: number) => (
                                                    <span key={genre.id || index}>
                                                        {index > 0 && ', '}
                                                        {genre.name}
                                                    </span>
                                                ))}
                                            </span>
                                        </>
                                    )}
                                </div>

                                <p className='text-sm md:text-base font-medium text-foreground mb-4 md:mb-6 line-clamp-2 sm:line-clamp-2 max-w-xl md:max-w-2xl text-pretty'>
                                    {media.overview}
                                </p>

                                <Button
                                    as={Link}
                                    to={getDetailUrl(media)}
                                    size='lg'
                                    variant='ghost'
                                    className='bg-white/90 text-black backdrop-blur-sm hover:bg-white hover:text-black'>
                                    {t('hero.watchNow')}
                                </Button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* indicator bars */}
            <div
                className='absolute bottom-6 left-6 sm:bottom-4 sm:left-1/2 sm:-translate-x-1/2 md:bottom-16 md:left-auto md:translate-x-0 md:right-8 lg:right-12 xl:right-20 z-10 flex items-center gap-2'
                role='tablist'
                aria-label='Slide pagination'>
                {Array.from({ length: totalSlides }).map((_, i) => {
                    const isActive = i === activeIndex;
                    const AUTOPLAY_DELAY = 8000;

                    return (
                        <motion.button
                            key={i}
                            role='tab'
                            aria-selected={isActive}
                            aria-label={`Go to slide ${i + 1}`}
                            onClick={() => swiperRef.current?.slideToLoop(i)}
                            className='relative h-1.5 overflow-hidden rounded-full bg-white/30 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
                            animate={{
                                width: isActive ? 44 : 16,
                            }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}>
                            {isActive ?
                                <motion.span
                                    key={`active-${i}`}
                                    className='absolute inset-0 bg-white rounded-full origin-left block h-full'
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{
                                        duration: AUTOPLAY_DELAY / 1000,
                                        ease: 'linear',
                                    }}
                                />
                            :   <span className='absolute inset-0 bg-white/40 rounded-full hover:bg-white/70 transition-colors' />
                            }
                        </motion.button>
                    );
                })}
            </div>
        </section>
    );
};
