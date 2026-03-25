import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getMediaTitle, getPosterUrl } from '@/utils/media';

interface Props {
    results: any[];
    isLoading: boolean;
    query: string;
    onResultClick: (result: any) => void;
    maxResults?: number;
    viewAllLink?: string;
    onViewAll?: () => void;
    className?: string;
}

export function SearchResults({
    results,
    isLoading,
    query,
    onResultClick,
    maxResults = 8,
    viewAllLink,
    onViewAll,
    className,
}: Props) {
    if (isLoading)
        return (
            <div className='p-4 text-center text-zinc-400'>
                <Loader2 className='animate-spin mx-auto mb-2' size={24} />
                <p className='text-sm'>Searching...</p>
            </div>
        );

    if (!results.length)
        return (
            <div className='p-4 text-center text-zinc-400'>
                <p className='text-sm'>No results found for &quot;{query}&quot;</p>
            </div>
        );

    const displayed = results.slice(0, maxResults);
    const hasMore = viewAllLink && results.length > maxResults;

    return (
        <div className={`py-2 ${className}`}>
            {displayed.map((result: any) => (
                <button
                    key={result.id}
                    onClick={() => onResultClick(result)}
                    className='w-full flex items-center gap-3 px-4 py-2.5 hover:bg-surface-3 transition-colors text-left'>
                    <LazyLoadImage
                        src={getPosterUrl(result)}
                        alt={getMediaTitle(result)}
                        className='w-14 h-20 object-cover rounded-sm'
                        effect='blur'
                    />
                    <div className='flex-1 min-w-0'>
                        <p className='text-zinc-100 font-medium text-[15px] truncate'>{getMediaTitle(result)}</p>
                        <p className='text-zinc-400 text-[13px]'>
                            {result.media_type === 'movie' ? 'Movies' : 'TV Series'}
                            {(result.release_date || result.first_air_date) && (
                                <span className='ml-1'>
                                    • {new Date(result.release_date || result.first_air_date).getFullYear()}
                                </span>
                            )}
                        </p>
                    </div>
                </button>
            ))}

            {hasMore && (
                <Link
                    to={viewAllLink!}
                    onClick={onViewAll}
                    className='block px-4 py-3 text-center text-brand hover:bg-surface-3 text-sm font-medium'>
                    View all {results.length} results
                </Link>
            )}
        </div>
    );
}
