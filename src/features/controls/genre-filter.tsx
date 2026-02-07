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
}

export default function GenreFilter({ genres, selectedGenres, onGenreToggle, isLoading }: GenreFilterProps) {
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

    return (
        <div className='flex flex-wrap md:flex-wrap gap-2 overflow-x-auto md:overflow-x-visible pb-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent md:scrollbar-none'>
            <div className='flex md:flex-wrap gap-2 md:w-full'>
                {genres.map((genre) => {
                    const isSelected = selectedGenres.includes(genre.id);
                    return (
                        <button
                            key={genre.id}
                            onClick={() => onGenreToggle(genre.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                                isSelected ?
                                    'bg-[#0957e1] text-zinc-200 shadow-lg shadow-[#0957e1]/20'
                                :   'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-200'
                            }`}>
                            {genre.name}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
