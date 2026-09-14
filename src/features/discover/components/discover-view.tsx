import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Film, RotateCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { TopFilterBar } from './top-filter-bar';
import { useInfiniteDiscoverMedia } from '@/features/discover/hooks/useDiscover.query';
import { useMovieGenres, useTVGenres } from '@/features/discover/hooks/useGenre.query';
import { getDetailUrl } from '@/utils/url';
import { MediaCard } from '@/components/media/card/media-card';
import { MediaHubHeroBanner } from '@/components/media/banner';
import { Button } from '@/components/ui/button';

interface DiscoverViewProps {
    mediaType: 'movie' | 'tv';
    onMediaTypeChange: (type: 'movie' | 'tv') => void;
    selectedGenres: number[];
    setSelectedGenres: React.Dispatch<React.SetStateAction<number[]>>;
    onGenreToggle: (genreId: number) => void;
    selectedProviders: number[];
    setSelectedProviders: React.Dispatch<React.SetStateAction<number[]>>;
    onProviderToggle: (providerId: number) => void;
    sortBy: string;
    setSortBy: (sort: string) => void;
    fromYear: string;
    setFromYear: (year: string) => void;
    toYear: string;
    setToYear: (year: string) => void;
    country: string;
    setCountry: (countryCode: string) => void;
    onClearFilters: () => void;
}

export default function DiscoverView({
    mediaType,
    onMediaTypeChange,
    selectedGenres,
    onGenreToggle,
    selectedProviders,
    setSelectedProviders,
    sortBy,
    setSortBy,
    fromYear,
    setFromYear,
    toYear,
    setToYear,
    country,
    setCountry,
    onClearFilters,
}: DiscoverViewProps) {
    const { t } = useTranslation();
    const filterBarRef = useRef<HTMLDivElement>(null);

    const { data: movieGenres = [], isLoading: isLoadingMovieGenres } = useMovieGenres();
    const { data: tvGenres = [], isLoading: isLoadingTVGenres } = useTVGenres();

    const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteDiscoverMedia({
        mediaType,
        genreIds: selectedGenres,
        providerIds: selectedProviders,
        sortBy,
        fromYear,
        toYear,
        country,
    });

    const allMedia = data?.pages.flatMap((page) => page.results) || [];
    const totalResults = data?.pages[0]?.total_results || 0;

    const hasActiveFilters =
        selectedGenres.length > 0 ||
        selectedProviders.length > 0 ||
        sortBy !== 'popularity.desc' ||
        Boolean(fromYear) ||
        Boolean(toYear) ||
        (Boolean(country) && country !== 'ALL');

    return (
        <main className='min-h-screen pb-20'>
            {/* hero */}
            <MediaHubHeroBanner
                title={mediaType === 'tv' ? t('discover.discoverTv') : t('discover.discoverMovies')}
                subtitle={t('hero.discoverSubtitle')}
                gradientVariant='discover'
            />

            <div className='px-4 sm:px-6 mt-6'>
                {/* top filter bar */}
                <div ref={filterBarRef}>
                    <TopFilterBar
                        mediaType={mediaType}
                        onMediaTypeChange={onMediaTypeChange}
                        selectedProviders={selectedProviders}
                        onProviderChange={(providerId) => {
                            if (providerId) {
                                setSelectedProviders([providerId]);
                            } else {
                                setSelectedProviders([]);
                            }
                        }}
                        sortBy={sortBy}
                        onSortChange={setSortBy}
                        fromYear={fromYear}
                        onFromYearChange={setFromYear}
                        toYear={toYear}
                        onToYearChange={setToYear}
                        country={country}
                        onCountryChange={setCountry}
                        genres={mediaType === 'movie' ? movieGenres : tvGenres}
                        selectedGenres={selectedGenres}
                        onGenreToggle={onGenreToggle}
                        isLoadingGenres={mediaType === 'movie' ? isLoadingMovieGenres : isLoadingTVGenres}
                        onClearFilters={onClearFilters}
                        hasActiveFilters={hasActiveFilters}
                    />
                </div>

                {/* result header count */}
                <div className='mb-4 flex items-center justify-between'>
                    {!isLoading && totalResults > 0 && (
                        <p className='text-xs sm:text-sm font-medium text-foreground-muted'>
                            {t('discover.showing', {
                                count: allMedia.length,
                                total: totalResults.toLocaleString(),
                            })}
                        </p>
                    )}

                    {hasActiveFilters && (
                        <Button
                            type='button'
                            variant='ghost'
                            size='sm'
                            onClick={onClearFilters}
                            className='flex lg:hidden items-center gap-1.5 h-auto py-1 px-2.5 text-xs font-semibold text-primary-accent hover:text-primary-accent/80 hover:bg-primary-accent/10 transition-colors ml-auto'>
                            <RotateCcw size={13} />
                            <span>{t('discover.reset')}</span>
                        </Button>
                    )}
                </div>

                {/* grid content */}
                <section className='w-full'>
                    {isLoading ?
                        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-3.5'>
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className='animate-pulse'>
                                    <div className='w-full aspect-[2/3] overflow-hidden rounded-md bg-surface-raised' />
                                    <div className='mt-2 space-y-1.5'>
                                        <div className='h-3.5 bg-surface-elevated/70 rounded w-4/5' />
                                        <div className='h-3 bg-surface-elevated/70 rounded w-1/3' />
                                    </div>
                                </div>
                            ))}
                        </div>
                    : allMedia.length > 0 ?
                        <>
                            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3'>
                                {allMedia.map((item, idx) => (
                                    <Link key={`${item.id}-${idx}`} to={getDetailUrl(item)}>
                                        <MediaCard type={item} />
                                    </Link>
                                ))}
                            </div>

                            {/* loading Skeleton when fetching next page */}
                            {isFetchingNextPage && (
                                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 mt-3 sm:mt-3.5'>
                                    {Array.from({ length: 6 }).map((_, i) => (
                                        <div key={`loading-next-${i}`} className='animate-pulse'>
                                            <div className='w-full aspect-[2/3] overflow-hidden rounded-md bg-surface-raised' />
                                            <div className='mt-2 space-y-1.5'>
                                                <div className='h-3.5 bg-surface-elevated/70 rounded w-4/5' />
                                                <div className='h-3 bg-surface-elevated/70 rounded w-1/3' />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* load more */}
                            {hasNextPage ?
                                <div className='mt-10 mb-6 flex justify-center'>
                                    <Button
                                        variant='surface'
                                        size='md'
                                        rounded='full'
                                        onClick={() => void fetchNextPage()}
                                        isLoading={isFetchingNextPage}
                                        className='h-11 shadow-md bg-surface-raised border border-border-subtle text-foreground-secondary hover:bg-surface-hover hover:text-foreground font-medium'>
                                        {t('common.loadMore')}
                                    </Button>
                                </div>
                            :   <div className='py-8 flex justify-center'>
                                    <p className='text-xs font-medium text-foreground-disabled tracking-wide'>
                                        You have reached the end of the list.
                                    </p>
                                </div>
                            }
                        </>
                    :   <div className='flex flex-col items-center justify-center py-20 bg-surface-raised/30 border border-border-subtle/50 rounded-2xl'>
                            <div className='text-5xl mb-3 text-foreground-muted'>
                                <Film size={48} strokeWidth={1.5} />
                            </div>

                            <h3 className='text-lg font-semibold text-foreground mb-1'>{t('discover.noResults')}</h3>

                            <p className='text-sm text-foreground-muted text-center max-w-sm px-4'>
                                {t('discover.noResultsDesc')}
                            </p>

                            {hasActiveFilters && (
                                <button
                                    type='button'
                                    onClick={onClearFilters}
                                    className='mt-4 px-4 py-2 text-xs font-semibold text-primary-accent border border-primary-accent/30 hover:bg-primary-accent/10 rounded-full transition-colors'>
                                    {t('discover.reset')}
                                </button>
                            )}
                        </div>
                    }
                </section>
            </div>
        </main>
    );
}
