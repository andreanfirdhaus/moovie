import NotFound from '@/not-found';
import SearchView from '@/features/search/components/search-view';
import { useSearchPageState } from '@/features/search/hooks/useSearchPageState';

export default function SearchPage() {
    const { searchQuery, currentPage, activeFilter, setActiveFilter, setCurrentPage } = useSearchPageState();

    if (!searchQuery) return <NotFound />;

    return (
        <SearchView
            searchQuery={searchQuery}
            currentPage={currentPage}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            onPageChange={setCurrentPage}
        />
    );
}
