import { Loader2 } from 'lucide-react';

interface Genre {
    id: number;
    name: string;
}

interface GenreFilterProps {
    genres: Genre[];
    selectedGenres: number[];
    onGenreToggle: (genreId: number) => void;
    isLoading?: boolean;
    variant?: 'horizontal' | 'vertical';
}

export default function GenreFilter({
    genres,
    selectedGenres,
    onGenreToggle,
    isLoading,
    variant = 'horizontal',
}: GenreFilterProps) {
    if (isLoading) {
        return (
            <div className='flex items-center gap-2 py-2'>
                <Loader2 className='animate-spin text-zinc-400' size={16} />
                <span className='text-sm text-zinc-400'>Loading genres...</span>
            </div>
        );
    }

    if (!genres || genres.length === 0) {
        return null;
    }

    if (variant === 'vertical') {
        return (
            <div className='flex flex-wrap gap-2'>
                {genres.map((genre) => {
                    const isSelected = selectedGenres.includes(genre.id);
                    return (
                        <button
                            key={genre.id}
                            onClick={() => onGenreToggle(genre.id)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                                isSelected ?
                                    'bg-brand text-white shadow-lg shadow-brand/20'
                                :   'bg-surface-3 text-zinc-300 hover:bg-surface-4 hover:text-zinc-200'
                            }`}>
                            {genre.name}
                        </button>
                    );
                })}
            </div>
        );
    }

    return (
        <div className='flex flex-wrap md:flex-wrap gap-2 overflow-x-auto md:overflow-x-visible pb-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent md:scrollbar-none'>
            <div className='flex md:flex-wrap gap-2 md:w-full'>
                {genres.map((genre) => {
                    const isSelected = selectedGenres.includes(genre.id);
                    return (
                        <button
                            key={genre.id}
                            onClick={() => onGenreToggle(genre.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 
                                ${
                                    isSelected ?
                                        'bg-brand text-zinc-200 shadow-lg shadow-brand/20'
                                    :   'bg-surface-2 text-zinc-300 hover:bg-surface-3 hover:text-zinc-200'
                                }`}>
                            {genre.name}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
