import { useDiscoverFilters } from '@/features/discover/hooks/useDiscoverFilters';
import DiscoverView from './discover-view';

interface DiscoverPageProps {
    mediaType: string;
    category: string;
}

export default function DiscoverPage({ mediaType, category }: DiscoverPageProps) {
    const { currentPage, selectedGenres, sortBy, setCurrentPage, setSelectedGenres, setSortBy } = useDiscoverFilters({
        mediaType,
        category,
    });

    return (
        <DiscoverView
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
