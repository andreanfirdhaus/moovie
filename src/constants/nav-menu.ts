import type { NavMenuItem } from '@/types/menu';
import { SORT_BY } from '@/constants/sort-options';

export const menu: NavMenuItem[] = [
    {
        page: 'home',
        hasDropdown: false,
        link: '/',
    },
    {
        page: 'movies',
        hasDropdown: true,
        mediaType: 'movie',
        categories: [
            { value: 'popular', label: 'Popular', sortBy: SORT_BY.POPULARITY_DESC },
            { value: 'upcoming', label: 'Upcoming', sortBy: SORT_BY.POPULARITY_DESC },
            { value: 'toprated', label: 'Top Rated', sortBy: SORT_BY.RATING_DESC },
        ],
    },
    {
        page: 'Tv Shows',
        hasDropdown: true,
        mediaType: 'tv',
        categories: [
            { value: 'popular', label: 'Popular', sortBy: SORT_BY.POPULARITY_DESC },
            { value: 'toprated', label: 'Top Rated', sortBy: SORT_BY.RATING_DESC },
        ],
    },
];
