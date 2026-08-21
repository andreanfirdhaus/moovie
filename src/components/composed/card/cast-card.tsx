import { Popcorn } from 'lucide-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import type { MediaCredits } from '@/types/tmdb/media-credits';
import { TMDB_IMG_300 } from '@/config/images';
import { getCreditsName } from '@/utils/media';

interface CastCardProps {
    cast: MediaCredits;
}

export function CastCard({ cast }: CastCardProps) {
    const name = getCreditsName(cast);

    return (
        <div className='w-full min-w-0 text-center group'>
            {/* Avatar */}
            <figure className='relative mx-auto size-[88px] overflow-hidden rounded-full bg-surface-raised sm:size-[104px] md:size-[120px]'>
                {cast.profile_path ?
                    <LazyLoadImage
                        src={TMDB_IMG_300 + cast.profile_path}
                        alt={name}
                        effect='blur'
                        wrapperClassName='block size-full'
                        className='size-full object-cover'
                        draggable={false}
                    />
                :   <div className='flex size-full items-center justify-center'>
                        <Popcorn className='size-7 text-zinc-500' />
                    </div>
                }

                <div className='pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20' />
            </figure>

            {/* Actor */}
            <p className='mt-2 truncate text-sm font-semibold leading-5 text-zinc-100'>{name}</p>

            {/* Character */}
            {cast.character && <p className='truncate text-xs leading-4 text-zinc-400'>{cast.character}</p>}
        </div>
    );
}
