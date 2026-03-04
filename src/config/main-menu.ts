import type { MenuItem } from '@/types/menu';

export const menu: MenuItem[] = [
    {
        page: 'movies',
        hasDropdown: true,
        mediaType: 'movie',
        categories: [
            { value: 'popular', label: 'Popular', sortBy: 'popularity.desc' },
            { value: 'upcoming', label: 'Upcoming', sortBy: 'popularity.desc' },
            { value: 'toprated', label: 'Top Rated', sortBy: 'vote_average.desc' },
        ],
    },
    {
        page: 'Tv Shows',
        hasDropdown: true,
        mediaType: 'tv',
        categories: [
            { value: 'popular', label: 'Popular', sortBy: 'popularity.desc' },
            { value: 'toprated', label: 'Top Rated', sortBy: 'vote_average.desc' },
        ],
    },
    {
        page: 'streaming',
        hasDropdown: false,
        link: '/streaming',
    },
];
