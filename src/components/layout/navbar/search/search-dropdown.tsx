/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { TMDB_IMG_300 } from '@/config/images';
import { getDetailUrl } from '@/utils/url';

interface SearchDropdownProps {
    results: any[];
    isLoading: boolean;
    query: string;
    onClose: () => void;
}

export function SearchDropdown({ results, isLoading, query, onClose }: SearchDropdownProps) {
    if (isLoading) {
        return (
            <div className='rounded-2xl border border-white/10 bg-surface-raised backdrop-blur-xl p-3 shadow-2xl'>
                <div className='space-y-2'>
                    {[1, 2, 3].map((i) => (
                        <div key={i} className='flex gap-3 p-2 rounded-xl animate-pulse'>
                            <div className='w-10 h-14 rounded-md bg-surface-hover flex-shrink-0' />
                            <div className='flex-1 space-y-2 py-1'>
                                <div className='h-4 bg-surface-hover rounded w-3/4' />
                                <div className='h-3 bg-surface-hover rounded w-1/3' />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (results.length === 0) {
        return (
            <div className='rounded-2xl border border-white/10 bg-surface-raised backdrop-blur-xl p-6 text-center shadow-2xl'>
                <p className='text-sm text-foreground-muted'>
                    No results found for &ldquo;<span className='text-foreground font-medium'>{query}</span>&rdquo;
                </p>
            </div>
        );
    }

    return (
        <div className='rounded-2xl border border-white/10 bg-surface-raised backdrop-blur-xl p-2 shadow-xl overflow-hidden max-h-[80vh] overflow-y-auto'>
            <div className='space-y-1'>
                {results.map((item) => {
                    const isMovie = item.media_type === 'movie';
                    const title = item.title || item.name;
                    const date = item.release_date || item.first_air_date;
                    const year = date ? new Date(date).getFullYear() : null;
                    const imagePath = item.poster_path || item.profile_path;
                    const imageUrl =
                        imagePath ?
                            `${TMDB_IMG_300}${imagePath}`
                        :   'https://images.unsplash.com/photo-1483080009570-cc240a305916?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=4f3037fa369b09ed98e9e5bcc6760a2d';

                    return (
                        <Link
                            key={`${item.media_type}-${item.id}`}
                            to={getDetailUrl(item)}
                            onClick={onClose}
                            className='flex items-center gap-3 p-2 rounded-xl hover:bg-surface-hover transition-colors group'>
                            <img
                                src={imageUrl}
                                className='w-10 h-14 object-cover rounded-md flex-shrink-0 bg-surface-base'
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src =
                                        'https://images.unsplash.com/photo-1483080009570-cc240a305916?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=4f3037fa369b09ed98e9e5bcc6760a2d';
                                }}
                            />

                            <div className='flex-1 min-w-0'>
                                <p className='text-sm font-medium text-foreground truncate transition-colors'>
                                    {title} {year && `(${year})`}
                                </p>

                                <div className='flex items-center gap-2 mt-1 text-xs text-foreground-muted'>
                                    {item.vote_average > 0 && (
                                        <span className='inline-flex items-center gap-0.5  font-medium'>
                                            <Star size={11} fill='currentColor' className='text-amber-400' />
                                            {Number(item.vote_average).toFixed(1)}
                                        </span>
                                    )}

                                    <span className='inline-flex items-center gap-1 font-medium capitalize'>
                                        {isMovie ? 'Movie' : 'TV Series'}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
