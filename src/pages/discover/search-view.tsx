import Card from '@/components/ui/card';
import Loading from '@/components/ui/spinner';
import Pagination from '@/features/controls/pagination';
import FilterTabs from '@/features/controls/filter-tabs';
import { useSearchMulti } from '@/utils/hooks/queries/useSearch';
import { MediaFilter } from './hooks/useState';
import EmptyState from './empty-state';
import { Link } from 'react-router-dom';
import { getDetailUrl } from '@/utils/helper/tmdb-helpers';

interface SearchViewProps {
    searchQuery: string;
    currentPage: number;
    activeFilter: MediaFilter;
    setActiveFilter: (filter: MediaFilter) => void;
    onPageChange: (page: number) => void;
}

export default function SearchView({
    searchQuery,
    currentPage,
    activeFilter,
    setActiveFilter,
    onPageChange,
}: SearchViewProps) {
    const { data: searchData, isLoading: isSearching } = useSearchMulti(searchQuery, currentPage);
    const searchResults = searchData?.results || [];
    const searchTotalPages = searchData?.total_pages || 0;

    // filter
    const filteredResults =
        activeFilter === 'all' ? searchResults : searchResults.filter((item: any) => item.media_type === activeFilter);

    const filterCounts = {
        all: searchResults.length,
        movie: searchResults.filter((item: any) => item.media_type === 'movie').length,
        tv: searchResults.filter((item: any) => item.media_type === 'tv').length,
    };

    const getEmptyMessage = () => {
        if (activeFilter === 'all') return `We couldn't find any results for "${searchQuery}". Try different keywords.`;

        const typeLabel = activeFilter === 'movie' ? 'movies' : 'TV series';
        return `No ${typeLabel} found for "${searchQuery}". Try a different filter.`;
    };

    return (
        <main className='min-h-screen pt-20 md:pt-28 lg:pt-32 pb-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-9xl mx-auto lg:mx-16'>
                <header className='mb-4'>
                    <h1 className='text-2xl font-semibold text-zinc-200 mb-2'>Search Results for {searchQuery}</h1>
                </header>

                <FilterTabs
                    filters={[
                        { value: 'all', label: 'All', count: filterCounts.all },
                        { value: 'movie', label: 'Movies', count: filterCounts.movie },
                        { value: 'tv', label: 'TV Series', count: filterCounts.tv },
                    ]}
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                />

                {isSearching ?
                    <Loading />
                : filteredResults.length > 0 ?
                    <>
                        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-6 sm:gap-x-5 sm:gap-y-8'>
                            {filteredResults.map((result: any) => (
                                <Link
                                    key={result.id}
                                    to={getDetailUrl(result)}
                                    className='text-sm sm:text-base font-semibold text-gray-100 line-clamp-2 group-hover:text-white transition-colors mb-0.5'>
                                    <Card type={result} />
                                </Link>
                            ))}
                        </div>

                        {activeFilter === 'all' && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={searchTotalPages}
                                onPageChange={onPageChange}
                            />
                        )}
                    </>
                :   <EmptyState message={getEmptyMessage()} />}
            </div>
        </main>
    );
}
