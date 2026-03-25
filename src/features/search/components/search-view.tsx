import { Film } from 'lucide-react';
import { Link } from 'react-router-dom';
import Loading from '@/components/ui/spinner';
import Pagination from '@/components/composed/pagination';
import FilterTabs from '@/components/composed/filter-tabs';
import { useSearchMulti } from '@/features/search/hooks/useSearch.query';
import type { MediaType } from '@/features/search/hooks/useSearchPageState';
import { getDetailUrl } from '@/utils/url';
import { MediaCard } from '@/components/composed/card/media-card';

interface SearchViewProps {
    searchQuery: string;
    currentPage: number;
    activeFilter: MediaType;
    setActiveFilter: (filter: MediaType) => void;
    onPageChange: (page: number) => void;
}

export default function SearchView({
    searchQuery,
    currentPage,
    activeFilter,
    setActiveFilter,
    onPageChange,
}: SearchViewProps) {
    const { data, isLoading } = useSearchMulti(searchQuery, currentPage);
    const results = data?.results || [];
    const totalPages = data?.total_pages || 0;

    const filteredResults =
        activeFilter === 'all' ? results : results.filter((item: any) => item.media_type === activeFilter);

    const counts: Record<MediaType, number> = {
        all: results.length,
        movie: results.filter((item: any) => item.media_type === 'movie').length,
        tv: results.filter((item: any) => item.media_type === 'tv').length,
    };

    const emptyMessage =
        activeFilter === 'all' ?
            `No results found for "${searchQuery}". Try different keywords.`
        :   `No ${activeFilter === 'movie' ? 'movies' : 'TV series'} found for "${searchQuery}".`;

    if (!isLoading && filteredResults.length === 0) {
        return (
            <div className='flex flex-col items-center justify-center h-dvh'>
                <Film size={56} className='text-zinc-400 mb-4' />
                <h2 className='text-xl font-semibold text-zinc-100 mb-2'>No results found</h2>
                <p className='text-zinc-400 text-center'>{emptyMessage}</p>
            </div>
        );
    }

    return (
        <main className='min-h-screen pt-20 md:pt-28 lg:pt-32 pb-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-9xl mx-auto lg:mx-16'>
                <header className='mb-4'>
                    <h1 className='text-2xl font-semibold text-zinc-100 mb-2'>Search Results for {searchQuery}</h1>
                </header>

                <FilterTabs
                    filterOptions={[
                        { value: 'all', label: 'All', count: counts.all },
                        { value: 'movie', label: 'Movies', count: counts.movie },
                        { value: 'tv', label: 'Series', count: counts.tv },
                    ]}
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                />

                {isLoading ?
                    <Loading />
                :   <>
                        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-3 gap-y-6 sm:gap-x-4 sm:gap-y-8'>
                            {filteredResults.map((result: any) => (
                                <Link key={result.id} to={getDetailUrl(result)}>
                                    <MediaCard type={result} />
                                </Link>
                            ))}
                        </div>

                        {activeFilter === 'all' && (
                            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
                        )}
                    </>
                }
            </div>
        </main>
    );
}
