import { useBrowseState } from '@/features/discover/hooks/use-browse-state';
import BrowseView from './browse-view';

interface BrowsePageProps {
    mediaType: string;
    category: string;
}

export default function BrowsePage({ mediaType, category }: BrowsePageProps) {
    const { currentPage, selectedGenres, sortBy, setCurrentPage, setSelectedGenres, setSortBy } = useBrowseState({
        mediaType,
        category,
    });

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
