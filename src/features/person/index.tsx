import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';
import { MediaCard } from '@/components/composed/card/media-card';
import { usePersonDetail, usePersonKnownFor } from '@/features/person/hooks/usePerson.query';
import { getDetailUrl } from '@/utils/url';
import { TMDB_IMG_300 } from '@/config/images';

export default function PersonDetailPage() {
    const { id } = useParams();
    const [isBiographyExpanded, setIsBiographyExpanded] = useState(false);
    const personId = id ? Number(id) : undefined;

    const { data: person, isLoading: isLoadingPerson } = usePersonDetail(personId);
    const { data: knownFor = [], isLoading: isLoadingKnownFor } = usePersonKnownFor(personId);
    const movies = knownFor.filter((item: any) => item.media_type === 'movie');
    const tvSeries = knownFor.filter((item: any) => item.media_type === 'tv');
    const hasBiography = person?.biography && person.biography.trim().length > 0;

    if (!personId) {
        return (
            <div className='flex items-center justify-center h-dvh'>
                <p className='text-foreground-muted text-lg'>Invalid person ID</p>
            </div>
        );
    }

    if (isLoadingPerson) {
        return (
            <div className='flex items-center justify-center h-dvh'>
                <LoaderCircle className='animate-spin text-primary' size={48} />
            </div>
        );
    }

    if (!person) {
        return (
            <div className='flex items-center justify-center h-dvh'>
                <p className='text-foreground-muted text-lg'>No data available.</p>
            </div>
        );
    }

    return (
        <main className='px-4 sm:px-6 pt-20 lg:pt-28 space-y-10'>
            {/* profile */}
            <section>
                <div className='flex items-center gap-5 sm:gap-6'>
                    {person.profile_path && (
                        <img
                            src={TMDB_IMG_300 + person.profile_path}
                            alt={person.name}
                            draggable={false}
                            className='size-28 sm:size-36 rounded-full object-cover flex-shrink-0'
                        />
                    )}

                    <div className='min-w-0'>
                        <h1 className='text-xl sm:text-2xl font-bold text-foreground'>{person.name}</h1>

                        {person.birthday && (
                            <p className='mt-1 text-sm font-medium text-foreground-muted'>
                                Born:{' '}
                                <span className='text-foreground-secondary'>
                                    {new Date(person.birthday).toLocaleDateString('en-US', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </span>
                                {person.place_of_birth && (
                                    <span className='text-foreground-muted'> · {person.place_of_birth}</span>
                                )}
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {/* biography */}
            {hasBiography && (
                <section>
                    <h2 className='text-lg sm:text-xl font-semibold text-foreground mb-2.5 sm:mb-3.5'>Biography</h2>

                    <div className='max-w-4xl'>
                        <p
                            className={`text-sm sm:text-[15px] text-foreground-muted leading-relaxed font-medium ${!isBiographyExpanded ? 'line-clamp-4' : ''}`}>
                            {person.biography}
                        </p>

                        <button
                            type='button'
                            onClick={() => setIsBiographyExpanded((prev) => !prev)}
                            className='mt-2 text-sm font-semibold text-primary-accent hover:underline transition-colors'>
                            {isBiographyExpanded ? 'Show less' : 'Read more'}
                        </button>
                    </div>
                </section>
            )}

            {/* movies */}
            {!isLoadingKnownFor && movies.length > 0 && (
                <section>
                    <header className='mb-2.5 sm:mb-3.5'>
                        <h2 className='text-lg sm:text-xl font-semibold text-foreground'> Movies</h2>
                    </header>

                    <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-3 gap-y-6 sm:gap-x-4'>
                        {movies.map((item) => (
                            <Link key={item.id} to={getDetailUrl(item)}>
                                <MediaCard type={item} />
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* tv series */}
            {!isLoadingKnownFor && tvSeries.length > 0 && (
                <section>
                    <header className='mb-2.5 sm:mb-3.5'>
                        <h2 className='text-lg sm:text-xl font-semibold text-foreground'>TV Series</h2>
                    </header>

                    <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-3 gap-y-6 sm:gap-x-4'>
                        {tvSeries.map((item) => (
                            <Link key={item.id} to={getDetailUrl(item)}>
                                <MediaCard type={item} />
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}
