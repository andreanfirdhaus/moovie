import { useDiscoverFilters } from '@/features/discover/hooks/useDiscoverFilters';
import DiscoverView from './components/discover-view';

interface DiscoverPageProps {
    mediaType?: string;
}

export default function DiscoverPage({ mediaType = 'movie' }: DiscoverPageProps = {}) {
    const {
        mediaType: activeMediaType,
        setMediaType,
        selectedGenres,
        selectedProviders,
        sortBy,
        fromYear,
        toYear,
        country,
        setSelectedGenres,
        toggleGenre,
        setSelectedProviders,
        toggleProvider,
        setSortBy,
        setFromYear,
        setToYear,
        setCountry,
        clearAllFilters,
    } = useDiscoverFilters({
        defaultMediaType: mediaType,
    });

    return (
        <DiscoverView
            mediaType={activeMediaType}
            onMediaTypeChange={setMediaType}
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
            onGenreToggle={toggleGenre}
            selectedProviders={selectedProviders}
            setSelectedProviders={setSelectedProviders}
            onProviderToggle={toggleProvider}
            sortBy={sortBy}
            setSortBy={setSortBy}
            fromYear={fromYear}
            setFromYear={setFromYear}
            toYear={toYear}
            setToYear={setToYear}
            country={country}
            setCountry={setCountry}
            onClearFilters={clearAllFilters}
        />
    );
}
