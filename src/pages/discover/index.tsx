import NotFound from '@/not-found';
import { useDiscoverState } from '@/features/discover/hooks/use-discover-state';
import SearchView from '@/features/discover/components/search-view';

export default function Discover() {
    const { searchQuery, currentPage, activeFilter, setActiveFilter, setCurrentPage } = useDiscoverState();

    if (searchQuery) {
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

    return <NotFound />;
}
