import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { useStreamCategory } from '@/features/home/hooks/useStream.query';
import { getStreamDetail } from '@/services/stream';
import type { StreamSearchItem } from '@/types/stream';

import 'swiper/css';
import { streamCategories } from '@/constants/stream-categories';
import { FreeMode } from 'swiper/modules';
import { Button } from '@/components/ui/button';
import { StreamCard } from '@/components/composed/card/stream-card';

const SwiperParams = {
    slidesPerView: 'auto' as const,
    grabCursor: true,
    breakpoints: {
        320: { spaceBetween: 8 },
        640: { spaceBetween: 16 },
        1024: { spaceBetween: 18.5 },
    },
};

export function StreamSection() {
    const navigate = useNavigate();
    const swiperRef = useRef<SwiperType | null>(null);

    const [activeAction, setActiveAction] = useState(() => {
        return sessionStorage.getItem('streamCategory') || 'trending';
    });
    const [loadingDetailPath, setLoadingDetailPath] = useState<string | null>(null);
    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useStreamCategory(activeAction);
    const items = data?.pages.flatMap((page) => page.items) || [];

    const handleCategoryChange = (action: string) => {
        setActiveAction(action);
        sessionStorage.setItem('streamCategory', action);
        sessionStorage.setItem('streamSlideIndex', '0');
        if (swiperRef.current) {
            swiperRef.current.slideTo(0, 0);
        }
    };

    async function handleCardClick(item: StreamSearchItem) {
        try {
            setLoadingDetailPath(item.detailPath);
            const detail = await getStreamDetail(item.detailPath);
            const mediaType = item.type === 'Series' || item.type === 'tv' ? 'tv' : 'movie';

            navigate(`/${mediaType}/watch/${encodeURIComponent(item.detailPath)}`, {
                state: {
                    title: item.title,
                    year: item.year,
                    type: mediaType,
                    id: item.detailPath,
                    playerUrl: detail.playerUrl,
                    seasons: detail.seasons,
                },
            });
        } catch (err) {
            console.error('Failed to fetch streaming detail:', err);
        } finally {
            setLoadingDetailPath(null);
        }
    }

    return (
        <section className='py-8 sm:py-12 lg:mx-4 px-4 sm:px-6 lg:px-8 xl:px-20'>
            <header className='mb-4 md:mb-5'>
                <h3 className='text-left text-xl sm:text-2xl font-semibold text-zinc-100 mb-0.5 sm:mb-1'>On Fire</h3>
                <p className='text-base font-medium text-zinc-400 mb-4'>Find your next favorite watch.</p>

                <div className='flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
                    {streamCategories.map((menuItem) => (
                        <Button
                            key={menuItem.action}
                            as={Button}
                            variant={activeAction === menuItem.action ? 'secondary' : 'ghost'}
                            onClick={() => handleCategoryChange(menuItem.action)}
                            className='px-4 py-2'>
                            {menuItem.label}
                        </Button>
                    ))}
                </div>
            </header>

            <div className='relative group'>
                {isLoading ?
                    <div className='flex gap-3 sm:gap-4 md:gap-5 overflow-hidden'>
                        {Array.from({ length: 7 }).map((_, index) => (
                            <div
                                key={index}
                                className='w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px] flex-shrink-0 animate-pulse'>
                                <div className='mx-0.5'>
                                    <div className='w-full aspect-[2/3] bg-surface-2 rounded-[6px] sm:rounded-[8px]' />
                                    <div className='mt-1.5 sm:mt-2 space-y-1.5'>
                                        <div className='h-[15px] bg-surface-4 rounded w-4/5' />
                                        <div className='h-[14px] bg-surface-3 rounded w-1/3' />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                : items.length > 0 ?
                    <Swiper
                        {...SwiperParams}
                        freeMode={true}
                        modules={[FreeMode]}
                        initialSlide={parseInt(sessionStorage.getItem('streamSlideIndex') || '0', 10)}
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        onSlideChange={(swiper) => {
                            sessionStorage.setItem('streamSlideIndex', swiper.activeIndex.toString());
                        }}
                        onReachEnd={() => {
                            if (hasNextPage && !isFetchingNextPage) {
                                fetchNextPage();
                            }
                        }}
                        className='mySwiper py-2.5'>
                        {items.map((item, index) => (
                            <SwiperSlide
                                key={`${activeAction}-${item.id}-${index}`}
                                className='!w-[140px] sm:!w-[160px] md:!w-[180px] lg:!w-[200px]'>
                                <button
                                    onClick={() => handleCardClick(item)}
                                    disabled={loadingDetailPath === item.detailPath}
                                    className={`w-full text-left transition-opacity ${loadingDetailPath === item.detailPath ? 'opacity-50 pointer-events-none' : ''}`}>
                                    <StreamCard item={item} />
                                </button>
                            </SwiperSlide>
                        ))}

                        {isFetchingNextPage && (
                            <SwiperSlide className='!w-[140px] sm:!w-[160px] md:!w-[180px] lg:!w-[200px]'>
                                <div className='w-full aspect-[2/3] bg-surface-2 rounded-[8px] animate-pulse flex items-center justify-center'>
                                    <div className='w-8 h-8 rounded-full border-2 border-zinc-800 border-t-zinc-300 animate-spin'></div>
                                </div>
                            </SwiperSlide>
                        )}
                    </Swiper>
                :   <div className='px-4 sm:px-6 lg:px-8 py-12 text-center'>
                        <p className='text-zinc-400'>No content available in this category.</p>
                    </div>
                }
            </div>
        </section>
    );
}
