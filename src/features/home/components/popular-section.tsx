import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';

import { Button } from '@/components/ui/button';
import { MediaCard } from '@/components/media/card/media-card';
import { getDetailUrl } from '@/utils/url';
import {
    useStreaming,
    useOnTVSeries,
    useInTheatersMovies,
    type PopularFilter,
} from '@/features/home/hooks/usePopular.query';

const filters: { value: PopularFilter; label: string }[] = [
    { value: 'streaming', label: 'Streaming' },
    { value: 'on-tv', label: 'On TV' },
    { value: 'in-theaters', label: 'In Theaters' },
];

const SwiperParams = {
    slidesPerView: 'auto' as const,
    grabCursor: true,
    breakpoints: {
        320: { spaceBetween: 8 },
        640: { spaceBetween: 12 },
    },
};

export function PopularSection() {
    const [activeFilter, setActiveFilter] = useState<PopularFilter>('streaming');

    const { data: streaming = [], isLoading: loadingStreaming } = useStreaming();
    const { data: onTV = [], isLoading: loadingOnTV } = useOnTVSeries();
    const { data: inTheaters = [], isLoading: loadingInTheaters } = useInTheatersMovies();

    const dataMap: Record<PopularFilter, { items: any[]; isLoading: boolean }> = {
        streaming: { items: streaming, isLoading: loadingStreaming },
        'on-tv': { items: onTV, isLoading: loadingOnTV },
        'in-theaters': { items: inTheaters, isLoading: loadingInTheaters },
    };

    const { items, isLoading } = dataMap[activeFilter];

    return (
        <section className='px-4 sm:px-6 py-6 sm:py-8'>
            <header className='flex justify-between items-center mb-4'>
                <h2 className='text-lg sm:text-xl font-semibold text-foreground'>What&apos;s Popular</h2>

                <div className='inline-flex items-center gap-1 rounded-full bg-surface-base border border-border-subtle p-1'>
                    {filters.map((index) => (
                        <Button
                            key={index.value}
                            onClick={() => setActiveFilter(index.value)}
                            size='sm'
                            rounded='full'
                            className={
                                activeFilter === index.value ?
                                    'bg-surface-elevated hover:bg-surface-elevated text-foreground font-semibold px-4 py-2'
                                :   'bg-transparent text-foreground-muted hover:bg-surface-raised hover:text-foreground px-4 py-2'
                            }>
                            {index.label}
                        </Button>
                    ))}
                </div>
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
                        {items.map((item) => (
                            <SwiperSlide key={item.id} className='!w-[140px] sm:!w-[160px] md:!w-[180px] lg:!w-[196px]'>
                                <Link to={getDetailUrl(item)}>
                                    <MediaCard type={item} />
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                :   <div className='px-4 sm:px-6 lg:px-8 py-12 text-center'>
                        <p className='text-foreground-muted'>No content available.</p>
                    </div>
                }
            </div>
        </section>
    );
}
