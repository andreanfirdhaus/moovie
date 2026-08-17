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
            <figure className='relative mx-auto size-[88px] overflow-hidden rounded-full bg-surface-2 ring-1 ring-white/10 sm:size-[104px] md:size-[120px]'>
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
            <p className='mt-2 truncate text-[13px] font-semibold leading-5 text-zinc-100 sm:text-sm'>{name}</p>

            {/* Character */}
            {cast.character && (
                <p className='truncate text-[11px] leading-4 text-zinc-400 sm:text-xs'>{cast.character}</p>
            )}
        </div>
    );
}
