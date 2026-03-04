import NotFound from '@/not-found';
import { useDiscoverState } from '@/features/discover/hooks/use-discover-state';
import SearchView from '@/features/discover/components/search-view';
import BrowseView from '@/features/discover/components/browse-view';

export default function Discover() {
    const {
        searchQuery,
        mediaType,
        category,
        activeFilter,
        currentPage,
        selectedGenres,
        sortBy,
        setActiveFilter,
        setCurrentPage,
        setSelectedGenres,
        setSortBy,
    } = useDiscoverState();

    // Mode 1: Search Query Exists
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

    // Mode 2: Browse Mode (Movies/TV with Category)
    if (mediaType && category) {
        return (
            <BrowseView
                mediaType={mediaType}
                category={category}
                currentPage={currentPage}
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                sortBy={sortBy}
                setSortBy={setSortBy}
                onPageChange={setCurrentPage}
            />
        );
    }

    // Mode 3: Fallback
    return <NotFound />;
}
